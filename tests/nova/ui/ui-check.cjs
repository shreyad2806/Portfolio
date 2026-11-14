// Manual browser check (Playwright). Start `NOVA_DISABLE_LLM=1 npx next dev -p 3111`, then: NODE_PATH=$(npm root -g) node tests/nova/ui/<file>
const { chromium, devices } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const out = {};
  for (const [name, ctxOpts] of [['mob', { ...devices['iPhone 13'] }], ['desk', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }]]) {
    const ctx = await b.newContext(ctxOpts); const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('http://localhost:3111/', { waitUntil: 'networkidle', timeout: 90000 }); await p.waitForTimeout(1200);
    await p.click('.nv-launcher'); await p.waitForTimeout(400);
    // 1. failed request keeps the draft
    await p.route('**/api/nova/chat', r => r.abort());
    await p.fill('#nova-input', 'Explain Kavach'); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
    out[name + '_draft_after_fail'] = await p.inputValue('#nova-input');
    out[name + '_error_bubble'] = await p.locator('.nv-msg--error').count();
    out[name + '_user_bubbles_after_fail'] = await p.locator('.nv-msg--user').count();
    await p.unroute('**/api/nova/chat');
    // 2. success clears the draft
    await p.keyboard.press('Enter'); await p.waitForTimeout(1500);
    out[name + '_draft_after_ok'] = await p.inputValue('#nova-input');
    out[name + '_details'] = await p.locator('.nv-more').count();
    // 3. conversation
    for (const q of ['Why does it use two agents?', 'What happens if authorization fails?', 'Compare CloseLoop and Kavach']) { await p.fill('#nova-input', q); await p.keyboard.press('Enter'); await p.waitForTimeout(900); }
    await p.screenshot({ path: `/tmp/claude-0/v2-${name}-chat.png` });
    // 4. expand details + sources
    const more = p.locator('.nv-more summary').last(); if (await more.count()) await more.click();
    const src = p.locator('.nv-sources summary').last(); if (await src.count()) await src.click(); await p.waitForTimeout(300);
    await p.screenshot({ path: `/tmp/claude-0/v2-${name}-expanded.png` });
    // 5. abort on close: slow stream
    await p.route('**/api/nova/chat', async r => { await new Promise(x => setTimeout(x, 3000)); r.continue(); });
    await p.fill('#nova-input', 'Tell me about VisionGuard'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
    await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    out[name + '_launcher_back'] = await p.locator('.nv-launcher').count();
    await p.click('.nv-launcher'); await p.waitForTimeout(300);
    out[name + '_busy_after_reopen'] = await p.locator('.nv-typing').count();
    out[name + '_errors'] = errs.slice(0, 3);
    await ctx.close();
  }
  console.log(JSON.stringify(out, null, 1)); await b.close();
})();

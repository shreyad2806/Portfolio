// Manual browser check (Playwright). Start `NOVA_DISABLE_LLM=1 npx next dev -p 3111`, then: NODE_PATH=$(npm root -g) node tests/nova/ui/<file>
const { chromium, devices } = require('playwright');
(async () => {
  const b = await chromium.launch(); const out = {};
  const ctx = await b.newContext({ ...devices['iPhone 13'] }); const p = await ctx.newPage();
  await p.goto('http://localhost:3111/', { waitUntil: 'networkidle', timeout: 90000 }); await p.waitForTimeout(1000);
  await p.click('.nv-launcher'); await p.waitForTimeout(400);
  await p.fill('#nova-input', 'Explain Kavach'); await p.keyboard.press('Enter'); await p.waitForTimeout(3500);
  out.draft_after_ok = await p.inputValue('#nova-input');
  // typing with dashes / smart punctuation chars
  await p.fill('#nova-input', '-'); out.dash_value = await p.inputValue('#nova-input'); out.send_disabled_with_dash_only = await p.locator('.nv-input button').isDisabled();
  await p.fill('#nova-input', '');
  // simulate keyboard: visualViewport shrinks by 300px
  await p.evaluate(() => { const vv = window.visualViewport; Object.defineProperty(vv, 'height', { value: window.innerHeight - 300, configurable: true }); vv.dispatchEvent(new Event('resize')); });
  await p.waitForTimeout(200);
  const r = await p.evaluate(() => { const w = document.querySelector('.nv-window'); const cs = getComputedStyle(w); const b = w.getBoundingClientRect(); const inp = document.querySelector('.nv-input').getBoundingClientRect(); const h = document.querySelector('.nv-head').getBoundingClientRect(); return { kb: w.style.getPropertyValue('--nv-kb'), bottom: Math.round(b.bottom), innerH: innerHeight, inputBottom: Math.round(inp.bottom), headTop: Math.round(h.top), top: Math.round(b.top) }; });
  out.keyboard = r; await p.screenshot({ path: '/tmp/claude-0/v2-mob-keyboard.png' });
  console.log(JSON.stringify(out, null, 1)); await b.close();
})();

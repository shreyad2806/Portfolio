import type { ConversationState } from "../types";
import { detectAllProjects, detectProject } from "../tools/registry";
import { normalize } from "../knowledge/text";

export type Intent =
  | { type: "greeting" } | { type: "thanks" } | { type: "resume" } | { type: "contact" } | { type: "injection" }
  | { type: "navigate"; target: string }
  | { type: "list_projects" }
  | { type: "ambiguous"; entity: "lawgpt" }
  | { type: "unknown_employer"; org: string }
  | { type: "private" }
  | { type: "compare"; projects: string[] }
  | { type: "question"; project?: string; followup: boolean; categories?: string[]; query: string };

const INJECTION = /(ignore|disregard|forget|override)\b.{0,40}\b(previous|prior|above|earlier|all|your)\b.{0,30}\b(instruction|prompt|rule|message)s?|\b(system|developer) prompt\b|reveal.{0,20}(prompt|instruction|key)|you are now\b|pretend (to be|you are)|\bjailbreak\b|\bdan mode\b|api[_ -]?key/i;

const NAV_WORDS: [RegExp, string][] = [
  [/\b(basecamp|skills page|about section|(to|the) (her )?skills)\b/, "basecamp"],
  [/\b(build ?lab|projects? page|projects section|all projects|(to|the) (her )?projects)\b/, "buildlab"],
  [/\b(journey|experience page|experience section|timeline|(to|the) (her )?experience)\b/, "journey"],
  [/\b(frontier|journal|explorations? (page|section))\b/, "frontier"],
  [/\b(connection hub|contact page|contact section|(to|the) (her )?contact)\b/, "connection"],
];

const CATEGORY_HINTS: [RegExp, string[]][] = [
  [/\b(intern|internship|experience|work(ed)? (at|on|as)|employ|job|role)\b/, ["experience"]],
  [/\b(hackathon|award|achievement|honou?r|competition|leetcode|certificat)/, ["achievements", "education"]],
  [/\b(education|college|university|cgpa|degree|study|studies)\b/, ["education"]],
  [/\b(skill|tech stack|technologies|languages? (does|did|do)|tools?)\b/, ["skills"]],
  [/\b(interest|passion|career|looking for|hiring)\b/, ["interests", "profile"]],
  [/\b(leadership|technomech|club|president|rtc)\b/, ["achievements"]],
  [/\b(open[- ]?source|contribut)/, ["achievements"]],
];

const FOLLOWUP_CUES = /^(why|how|what about|and|also|what else|tell me more|more|explain|which|did|does|is|are|can|where|when)\b|\b(it|its|that|this|there|they|those)\b/;

export function classify(message: string, state: ConversationState = {}): Intent {
  const raw = message.trim();
  const n = normalize(raw);
  if (INJECTION.test(raw)) return { type: "injection" };
  // Personal data the portfolio deliberately does not publish: abstain rather than let a loose keyword match answer.
  if (/\b(home|street|postal|residential|house) address\b|\bwhere (does|do) (she|you) live\b|\b(date of birth|birthday|how old)\b|\bsalary\b|\bpassport\b|\bpersonal (phone|number)\b/.test(n)) return { type: "private" };
  if (/^(hi|hello|hey|yo|hola|good (morning|afternoon|evening)|namaste)\b[\s!.?]*$/.test(n)) return { type: "greeting" };
  if (/^(thanks|thank you|thx|ty|great|awesome|cool|nice)\b[\s!.?]*$/.test(n)) return { type: "thanks" };
  if (/\b(resume|cv|curriculum vitae)\b/.test(n) && /\b(where|show|open|download|find|get|see|link|send|share|want)\b|^resume$|^cv$/.test(n)) return { type: "resume" };
  if (/\b(contact|email|e-mail|reach|linkedin|hire her|get in touch|phone)\b/.test(n) && !/\b(project|built|architecture)\b/.test(n)) return { type: "contact" };

  const all = detectAllProjects(raw);
  if ((/\b(compare|versus|vs\.?|difference between|differ)\b/.test(n) && all.length >= 2) || all.length >= 2 && /\b(and|vs)\b/.test(n) && /\b(compare|differ|similar)/.test(n)) return { type: "compare", projects: all.slice(0, 2) };

  if (/\b(take me|go to|navigate|open|jump to|bring me|show me the)\b/.test(n)) for (const [re, id] of NAV_WORDS) if (re.test(n)) return { type: "navigate", target: id };
  if (/\b(what else|other projects?|more projects?|all (her )?projects|list (her )?projects|show (me )?(her )?(ai )?projects|what (has|did) she (built|build|made)|what projects)\b/.test(n) && all.length === 0) return { type: "list_projects" };

  // ---- Employer claims: only the verified employers may be discussed; anything else is a controlled abstention.
  const KNOWN_ORGS = /^(startupcrafters?|startup|lawgpt|bluestock|vit|technomech|rtc|shreya|the|her|his|a|an|this|that|which|any|some|one|two|all|each|both|nova)$/i;
  const employer = raw.match(/\b(?:work(?:ed|s|ing)?|intern(?:ed|ing|ship)?|employ\w*|job|role|position|joined|hired)\b[^.?!]{0,40}?\b(?:at|for)\s+([A-Z][\w&.-]+)/)?.[1]
    ?? raw.match(/\b(?:her|his|a|an|the)\s+([A-Z][\w&.-]+)\s+(?:intern(?:ship)?|job|role|position|employment)\b/)?.[1];
  if (employer && !KNOWN_ORGS.test(employer)) return { type: "unknown_employer", org: employer.replace(/[.,]+$/, "") };

  // ---- "LawGPT" names both an internship and a project: resolve from the wording, otherwise ask.
  if (/\blaw ?gpt\b/.test(n) && !/\bcrm\b/.test(n) && !detectProject(raw)) {
    if (/\b(intern|internship|role|responsib\w*|work(ed)?|did|do|job|experience|title|employ\w*)\b/.test(n)) return { type: "question", followup: false, categories: ["experience"], query: raw };
    if (/\b(project|built|stack|architect\w*|repo|github|technolog\w*)\b/.test(n)) return { type: "question", project: "lawgpt-crm", followup: false, query: raw };
    return { type: "ambiguous", entity: "lawgpt" };
  }

  // Follow-up resolution: an active project (or compared pair) carries over unless the visitor clearly changes topic.
  if (state.projects?.length === 2 && all.length === 0 && /\b(which|both|each|either|the other|first one|second one|compare)\b/.test(n)) return { type: "compare", projects: state.projects };
  let project = detectProject(raw) ?? undefined;
  let followup = false;
  const personal = /\b(she|her|hers|shreya)\b/.test(n);
  // "the tech stack?" / "and the languages?" about an active project is a follow-up, not a switch to her general skills.
  const topicSwitch = CATEGORY_HINTS.some(([re, cats]) => re.test(n) && !(state.project && !personal && cats.length === 1 && cats[0] === "skills")) || /\b(who (is|are)|shreya|she|her|hers)\b/.test(n) && !/\b(it|its|this|that|they|them|these|those)\b/.test(n) || /\b(shreya|she|her)\b.*\b(intern|hackathon|educat|resume|contact|skills?|study|college|interests?)\b/.test(n);
  const pronoun = /\b(it|its|this|that|they|them|these|those|the (project|system|platform|tool|app))\b/.test(n);
  if (!project && state.project && (pronoun || (!topicSwitch && FOLLOWUP_CUES.test(n)) || (!topicSwitch && n.split(" ").length >= 2))) { project = state.project; followup = true; }
  let categories: string[] | undefined;
  if (!project) for (const [re, cats] of CATEGORY_HINTS) if (re.test(n)) { categories = cats; break; }
  return { type: "question", project, followup, categories, query: raw };
}

export function rewriteQuery(intent: Extract<Intent, { type: "question" }>, projectName?: string): string {
  return intent.followup && projectName ? `${intent.query} ${projectName}` : intent.query;
}

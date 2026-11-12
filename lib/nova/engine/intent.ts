import type { ConversationState } from "../types";
import { detectAllProjects, detectProject } from "../tools/registry";
import { normalize } from "../knowledge/text";

export type Intent =
  | { type: "greeting" } | { type: "thanks" } | { type: "resume" } | { type: "contact" } | { type: "injection" }
  | { type: "navigate"; target: string }
  | { type: "list_projects" }
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
  if (/^(hi|hello|hey|yo|hola|good (morning|afternoon|evening)|namaste)\b[\s!.?]*$/.test(n)) return { type: "greeting" };
  if (/^(thanks|thank you|thx|ty|great|awesome|cool|nice)\b[\s!.?]*$/.test(n)) return { type: "thanks" };
  if (/\b(resume|cv|curriculum vitae)\b/.test(n) && /\b(where|show|open|download|find|get|see|link|send|share|want)\b|^resume$|^cv$/.test(n)) return { type: "resume" };
  if (/\b(contact|email|e-mail|reach|linkedin|hire her|get in touch|phone)\b/.test(n) && !/\b(project|built|architecture)\b/.test(n)) return { type: "contact" };

  const all = detectAllProjects(raw);
  if ((/\b(compare|versus|vs\.?|difference between|differ)\b/.test(n) && all.length >= 2) || all.length >= 2 && /\b(and|vs)\b/.test(n) && /\b(compare|differ|similar)/.test(n)) return { type: "compare", projects: all.slice(0, 2) };

  if (/\b(take me|go to|navigate|open|jump to|bring me|show me the)\b/.test(n)) for (const [re, id] of NAV_WORDS) if (re.test(n)) return { type: "navigate", target: id };
  if (/\b(what else|other projects?|more projects?|all (her )?projects|list (her )?projects|show (me )?(her )?(ai )?projects|what (has|did) she (built|build|made)|what projects)\b/.test(n) && all.length === 0) return { type: "list_projects" };

  let project = detectProject(raw) ?? undefined;
  let followup = false;
  if (!project && state.project && FOLLOWUP_CUES.test(n) && !/\b(shreya|she|her)\b.*\b(intern|hackathon|educat|resume|contact)/.test(n)) { project = state.project; followup = true; }
  let categories: string[] | undefined;
  if (!project) for (const [re, cats] of CATEGORY_HINTS) if (re.test(n)) { categories = cats; break; }
  return { type: "question", project, followup, categories, query: raw };
}

export function rewriteQuery(intent: Extract<Intent, { type: "question" }>, projectName?: string): string {
  return intent.followup && projectName ? `${intent.query} ${projectName}` : intent.query;
}

"use client";
import { FormEvent,useEffect,useRef,useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { ArrowRight,ArrowUpRight,Bot,ChevronDown,LoaderCircle,MessageCircle,Minus,Send,Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
export interface NovaDestination{id:string;n:string;title:string;sub:string;target:string;color:string;icon:LucideIcon;reply:string}
type Message={id:string;role:"assistant"|"user";content:string};
type Props={destinations:NovaDestination[];onNavigate:(id:string)=>void};
const starters=["What makes CloseLoop interesting?","Tell me about Kavach","What is Shreya exploring now?","How can I contact Shreya?"];
const welcome="Hey Explorer! 👋 I'm Nova, Shreya's portfolio guide. Ask me about her projects, engineering experience, skills, or what she's exploring. I can also take you straight to any destination.";
export default function NovaAssistant({destinations,onNavigate}:Props){
 const [messages,setMessages]=useState<Message[]>([{id:"welcome",role:"assistant",content:welcome}]);
 const [draft,setDraft]=useState("");const [busy,setBusy]=useState(false);const [expanded,setExpanded]=useState(true);const [notice,setNotice]=useState("");
 const listRef=useRef<HTMLDivElement>(null);const inputRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{listRef.current?.scrollTo({top:listRef.current.scrollHeight,behavior:"smooth"});},[messages,busy]);
 async function sendQuestion(value:string){
  const question=value.trim();if(!question||busy)return;
  const next=[...messages,{id:crypto.randomUUID(),role:"user" as const,content:question}];
  setMessages(next);setDraft("");setBusy(true);setNotice("");
  try{
   const response=await fetch("/api/nova",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question,history:next.slice(0,-1).slice(-6).map(({role,content})=>({role,content}))})});
   if(!response.ok)throw new Error("Nova could not reach her knowledge base.");
   const data=await response.json() as {reply:string;mode?:string};
   setMessages(current=>[...current,{id:crypto.randomUUID(),role:"assistant",content:data.reply}]);
   if(data.mode==="guide")setNotice("Portfolio-grounded guide");
  }catch{
   setMessages(current=>[...current,{id:crypto.randomUUID(),role:"assistant",content:"I hit a connection issue. You can still explore Shreya's projects, experience and contact details using the shortcuts below."}]);
   setNotice("Connection issue · shortcuts still work");
  }finally{setBusy(false);inputRef.current?.focus();}
 }
 function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();void sendQuestion(draft);}
 return <motion.aside initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:.65,delay:.12}} className={`hero-nova-panel nova-assistant mx-auto w-full max-w-[470px] ${expanded?"is-expanded":"is-collapsed"}`} aria-label="Nova AI portfolio assistant">
  <header className="nova-header"><div className="flex min-w-0 items-center gap-2.5"><span className="nova-brand-icon"><Sparkles size={18}/></span><div className="min-w-0"><div className="flex items-center gap-2"><h2 className="text-lg font-semibold text-white">Nova</h2><span className="nova-status"><i/>Ready</span></div><p className="text-[9px] font-mono uppercase tracking-[.16em] text-slate-500">Shreya&apos;s portfolio guide</p></div></div><button type="button" className="nova-icon-button" aria-label={expanded?"Minimize Nova":"Expand Nova"} onClick={()=>setExpanded(v=>!v)}>{expanded?<Minus size={15}/>:<ChevronDown size={15}/>}</button></header>
  <AnimatePresence initial={false}>{expanded&&<motion.div key="nova-content" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:.24}} className="nova-content">
   <div className="nova-intro !grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] !min-h-[164px] !p-2"><div className="nova-character-wrap !min-h-[150px] !overflow-hidden"><div className="nova-character-aura"/><motion.img src="/images/nova-guide.webp" alt="Nova, Shreya's AI companion" className="nova-character !h-[158px] !w-full !rounded-xl !object-contain !object-center" animate={{y:[0,-4,0],scale:[1,1.012,1]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}/><span className="nova-character-spark"><Sparkles size={13}/></span></div><div className="nova-intro-copy"><span className="nova-kicker"><span/> NOVA SAYS</span><p>Hey Explorer! 👋 I&apos;m Nova, Shreya&apos;s AI companion. What would you like to discover?</p><span className="nova-intro-foot">Ask me anything about her work</span></div></div>
   <div className="nova-chat-heading"><div><MessageCircle size={14}/><span>Conversation</span></div><span className="nova-chat-count">{messages.filter(m=>m.role==="user").length} questions</span></div>
   <div ref={listRef} className="nova-message-list" aria-live="polite" aria-relevant="additions text">{messages.map(message=><motion.div key={message.id} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}} className={`nova-message nova-message--${message.role}`}>{message.role==="assistant"&&<span className="nova-message-avatar"><Sparkles size={11}/></span>}<p>{message.content}</p></motion.div>)}{busy&&<div className="nova-message nova-message--assistant"><span className="nova-message-avatar"><Sparkles size={11}/></span><p className="nova-thinking"><i/><i/><i/><span>Nova is thinking</span></p></div>}</div>
   <div className="nova-prompts" aria-label="Suggested questions">{starters.map(item=><button key={item} type="button" disabled={busy} onClick={()=>void sendQuestion(item)}>{item}<ArrowUpRight size={11}/></button>)}</div>
   {notice&&<p className="nova-notice"><span/>{notice}</p>}
   <form onSubmit={submit} className="nova-composer"><input ref={inputRef} value={draft} onChange={e=>setDraft(e.target.value)} maxLength={600} placeholder="Ask Nova about Shreya's work..." aria-label="Message Nova"/><button type="submit" disabled={!draft.trim()||busy} aria-label="Send message">{busy?<LoaderCircle size={17} className="animate-spin"/>:<Send size={16}/>}</button></form>
   <div className="nova-destinations-label"><span>EXPLORE DIRECTLY</span><span>5 DESTINATIONS</span></div>
   <div className="nova-destinations">{destinations.map(destination=>{const Icon=destination.icon;return <button key={destination.id} type="button" onClick={()=>onNavigate(destination.id)} className="nova-destination" style={{"--nova-accent":destination.color} as React.CSSProperties}><span className="nova-destination-icon"><Icon size={15}/></span><span className="nova-destination-copy"><b>{destination.title}</b><small>{destination.sub}</small></span><ArrowRight size={14} className="nova-destination-arrow"/></button>;})}</div>
   <p className="nova-disclaimer"><Bot size={11}/> Answers are based on information published in this portfolio.</p>
  </motion.div>}</AnimatePresence>
 </motion.aside>;
}
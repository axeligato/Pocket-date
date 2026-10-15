import React,{useState} from "react";
import {CARE_COLORS} from "./careTheme.js";

// Original writing and attributed paraphrases: no fabricated direct quotations.
export const FEELINGS=[
 {id:"sad",label:"I feel sad",responses:[
  {text:"I'm sorry today feels heavy. You don't have to turn that feeling into a lesson. Would it help to name what happened, or would you rather have a quiet minute first?",prompt:"Try: describe one thing that made today difficult, without judging your reaction.",source:"Inspired by the practice of naming emotions"},
  {text:"Sometimes sadness is about something we lost; sometimes it's about something we needed and didn't get. Neither makes you weak. Is there a person, place, or small comfort that would make the next hour gentler?",prompt:"Try: choose one comforting action you can actually do in the next ten minutes.",source:"Inspired by the poetry of Mary Oliver — paraphrased, not quoted"},
  {text:"You don't have to feel better on my schedule. Even on difficult days, you deserve ordinary kindness: food, rest, a message to someone safe. Which of those sounds possible?",prompt:"Try: send someone you trust a simple 'Could we talk sometime?'",source:"A reflection on everyday care"}
 ]},
 {id:"anxious",label:"I feel anxious",responses:[
  {text:"Anxiety can make every possibility feel urgent. Let's separate what is happening right now from what your mind is predicting. What's one fact you know for sure?",prompt:"Try: notice five things you can see and let your feet rest on the floor.",source:"Grounding practice"},
  {text:"You don't have to solve the whole week tonight. The Stoic writer Epictetus explored the difference between what we can influence and what we cannot. What's one small part of this that's actually yours to act on?",prompt:"Try: write down one controllable next step; leave the rest for later.",source:"Epictetus, Enchiridion — paraphrase"},
  {text:"If your thoughts are racing, we can make this smaller. What would 'good enough for now' look like instead of 'perfect'?",prompt:"Try: take one unhurried breath and choose the next manageable task.",source:"A practical reflection"}
 ]},
 {id:"lonely",label:"I feel lonely",responses:[
  {text:"Feeling lonely doesn't mean you've failed at connecting. Sometimes what we miss is being understood, not simply having people nearby. Who makes you feel a little more like yourself?",prompt:"Try: reach out to someone with one honest, low-pressure message.",source:"Inspired by themes of belonging in literature"},
  {text:"You can enjoy being on your own and still wish someone would notice you. Both can be true. Is there a familiar place or community you might like to visit this week?",prompt:"Try: plan one real-world moment of connection, even a short one.",source:"A reflection on connection"},
  {text:"I'm glad you told me. And you deserve care beyond this screen too. Would reaching out to a friend, relative, or community group feel possible?",prompt:"Try: think of one person you'd like to hear from.",source:"A reminder that relationships matter"}
 ]},
 {id:"overwhelmed",label:"I'm overwhelmed",responses:[
  {text:"When everything is demanding your attention, even deciding where to start is work. Let's pick the smallest task that would make the next hour easier—not the most impressive one.",prompt:"Try: list three things, then circle only one for now.",source:"Inspired by practical prioritization methods"},
  {text:"You aren't required to carry every problem at once. In The Lord of the Rings, friendship and shared burdens matter as much as individual courage. Who could share one piece of this with you?",prompt:"Try: ask for specific help with one thing.",source:"J. R. R. Tolkien, The Lord of the Rings — thematic paraphrase"},
  {text:"What can wait? Not forever—just until tomorrow. Rest isn't a reward you have to earn by finishing everything.",prompt:"Try: choose one task to postpone intentionally.",source:"A reflection on rest"}
 ]},
 {id:"insecure",label:"I don't feel good enough",responses:[
  {text:"It sounds like you're measuring yourself against a demanding standard. Whose voice does that standard sound like? You can take feedback seriously without letting it define your worth.",prompt:"Try: name one effort you're proud of, even if the result wasn't perfect.",source:"A reflection on self-criticism"},
  {text:"Maya Angelou wrote often about dignity and finding one's voice. You don't need to be flawless to deserve respect or take up space. What would you say to a friend who felt this way?",prompt:"Try: offer yourself the same fairness you'd give that friend.",source:"Maya Angelou's writing — thematic paraphrase"},
  {text:"A difficult outcome is information, not a verdict on who you are. What's one thing you've learned or handled better than you could a year ago?",prompt:"Try: remember one small sign of growth.",source:"A reflection on growth"}
 ]},
 {id:"unmotivated",label:"I can't find motivation",responses:[
  {text:"Sometimes 'unmotivated' means tired, discouraged, or unsure where to begin. Which sounds closest today? You don't have to force an answer.",prompt:"Try: choose a two-minute version of one task—or rest if that's what you need.",source:"A practical reflection"},
  {text:"Starting small isn't cheating. A single page, a short walk, or opening the document counts as a beginning. What would make starting feel less intimidating?",prompt:"Try: set a two-minute timer for one gentle first step.",source:"Inspired by habit-building principles"},
  {text:"If nothing feels appealing lately, that's worth taking seriously, not criticizing yourself for. If it persists or affects daily life, talking with a qualified professional may help.",prompt:"Try: tell someone you trust how long you've been feeling this way.",source:"Supportive, non-diagnostic guidance"}
 ]}
];
const btn={padding:"11px 12px",border:"2px solid "+CARE_COLORS.ink,borderRadius:12,background:CARE_COLORS.paper,color:CARE_COLORS.ink,fontWeight:800,cursor:"pointer",textAlign:"left"};
export default function FeelingCheckIn(){
 const [topic,setTopic]=useState(null);
 const [variant,setVariant]=useState({});
 const [showPrompt,setShowPrompt]=useState(false);
 const current=FEELINGS.find(t=>t.id===topic);
 const index=topic?(variant[topic]??0):0;
 const response=current?.responses[index];
 const next=()=>{setVariant(v=>({...v,[topic]:((v[topic]??0)+1)%current.responses.length}));setShowPrompt(false);};
 return <section aria-label="Talk about how you feel" style={{background:CARE_COLORS.surface,border:"3px solid "+CARE_COLORS.ink,borderRadius:18,padding:16,marginBottom:20}}>
  <h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:21,margin:"0 0 6px"}}>What's weighing on you?</h3>
  <p style={{fontSize:12,lineHeight:1.6,color:CARE_COLORS.muted,margin:"0 0 14px"}}>Pick what feels closest. Kai offers a few thoughtful reflections, not a diagnosis. You can skip anything that doesn't fit.</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:8}}>
   {FEELINGS.map(t=><button type="button" key={t.id} aria-pressed={topic===t.id} onClick={()=>{setTopic(t.id);setShowPrompt(false);}} style={{...btn,background:topic===t.id?CARE_COLORS.rose:CARE_COLORS.paper,fontSize:12}}>{t.label}</button>)}
  </div>
  {response&&<div aria-live="polite" style={{marginTop:14,padding:13,borderRadius:12,background:CARE_COLORS.paper,border:"2px solid "+CARE_COLORS.ink}}>
    <strong style={{fontSize:12}}>💌 Kai</strong>
    <p style={{fontSize:14,lineHeight:1.75,margin:"8px 0"}}>{response.text}</p>
    <p style={{fontSize:11,color:CARE_COLORS.muted,margin:"0 0 12px"}}>{response.source}</p>
    {showPrompt&&<p style={{fontSize:13,lineHeight:1.6,fontWeight:800}}>{response.prompt}</p>}
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      <button type="button" onClick={()=>setShowPrompt(x=>!x)} style={{...btn,fontSize:12}}>{showPrompt?"Hide suggestion":"A small next step"}</button>
      <button type="button" onClick={next} style={{...btn,background:CARE_COLORS.rose,fontSize:12}}>Another perspective ↻</button>
    </div>
  </div>}
  <p style={{fontSize:11,lineHeight:1.6,color:CARE_COLORS.muted,margin:"14px 0 0"}}>These are authored reflections, not live counseling. If you're in immediate danger, contact local emergency services. For persistent distress, consider reaching out to someone you trust or a mental health professional.</p>
 </section>;
}

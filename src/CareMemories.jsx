import {CARE_COLORS} from "./careTheme.js";
import React,{useState} from "react";
const INK=CARE_COLORS.ink,KEY="pocket-date-care-memories-v1";
const SCENES=[
 {id:"quiet",icon:"🌙",title:"A quiet moment",prompt:"Long day? We don't have to do anything exciting. I just wanted to be here with you.",choices:[
  {label:"Stay here with me",reply:"Always. I'll put my phone away. You have my full attention. ♡",memory:"The evening we chose to slow down together."},
  {label:"Tell me something silly",reply:"Okay, confession: I practiced saying 'good morning' to you in the mirror. Don't laugh!",memory:"Kai's ridiculous little confession."}]},
 {id:"encourage",icon:"✨",title:"A little encouragement",prompt:"I know you've been trying your best. Want a pep talk, or should I just sit with you?",choices:[
  {label:"Give me a pep talk",reply:"You don't have to be perfect to be someone I'm proud of. I'm already cheering for you.",memory:"Kai cheering me on, exactly as I am."},
  {label:"Just sit with me",reply:"Then let's be quiet together. You can lean on me for a minute.",memory:"A comfortable silence with Kai."}]},
 {id:"playful",icon:"💌",title:"Something sweet",prompt:"I was going to play it cool, but... seeing you is my favorite part of the day.",choices:[
  {label:"You're blushing!",reply:"I am not! ...Okay, maybe a little. It's your fault.",memory:"The time I made Kai blush."},
  {label:"You're my favorite too",reply:"Wait. Really? ...You can't just say that and expect me to act normal. ♡",memory:"The moment we admitted we're each other's favorite."}]}
];
const read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||"null");return Array.isArray(v)?v.filter(x=>SCENES.some(s=>s.choices.some((c,i)=>s.id+":"+i===x))).slice(0,6):[];}catch{return [];}};
const button={border:"2px solid "+INK,borderRadius:12,padding:"10px 12px",color:INK,fontWeight:900,fontFamily:"'Nunito',sans-serif",cursor:"pointer"};
export default function CareMemories(){
 const [scene,setScene]=useState(null);
 const [choice,setChoice]=useState(null);
 const [saved,setSaved]=useState(read);
 const [remember,setRemember]=useState(false);
 const active=SCENES.find(s=>s.id===scene);
 const selected=active?.choices[choice];
 const key=selected?scene+":"+choice:null;
 const persist=(next)=>{setSaved(next);try{if(next.length)localStorage.setItem(KEY,JSON.stringify(next));else localStorage.removeItem(KEY);}catch{/* storage may be unavailable */}};
 const save=()=>{if(!key)return;persist([...saved.filter(x=>x!==key),key].slice(-6));setRemember(true);};
 const reset=()=>{setScene(null);setChoice(null);setRemember(false);};
 const memoryLabel=(id)=>{const [s,c]=id.split(":");return SCENES.find(x=>x.id===s)?.choices[Number(c)]?.memory||"";};
 return <section aria-label="Kai's little moments" style={{marginTop:22,background:CARE_COLORS.surface,border:"3px solid "+INK,borderRadius:19,padding:17,boxShadow:"4px 5px 0 "+INK}}>
  <span style={{display:"inline-block",background:CARE_COLORS.rose,border:"2px solid "+INK,borderRadius:8,padding:"4px 9px",fontSize:10,fontWeight:900,letterSpacing:1}}>💌 LITTLE MOMENTS</span>
  <h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:20,margin:"12px 0 6px",color:INK}}>Just you & Kai ♡</h3>
  <p style={{fontSize:12,lineHeight:1.6,color:CARE_COLORS.muted,margin:"0 0 14px"}}>Pick a moment together. Kai reacts to what you say. Saving a happy memory is always your choice.</p>
  {!active?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,175px),1fr))",gap:10}}>
    {SCENES.map(s=><button type="button" key={s.id} onClick={()=>{setScene(s.id);setChoice(null);setRemember(false);}} style={{...button,background:CARE_COLORS.paper,textAlign:"left",minHeight:73}}><span style={{fontSize:22}}>{s.icon}</span><span style={{display:"block",marginTop:6,fontSize:12}}>{s.title} ↗</span></button>)}
  </div>:<div style={{background:CARE_COLORS.paper,border:"2px solid "+INK,borderRadius:14,padding:14}}>
    <strong style={{fontSize:11,letterSpacing:1,color:INK}}>♡ KAI SAYS</strong>
    <p aria-live="polite" style={{fontFamily:"'Fredoka One',cursive",fontSize:17,lineHeight:1.5,color:INK,margin:"9px 0 14px"}}>{selected?selected.reply:active.prompt}</p>
    {!selected?<div style={{display:"grid",gap:8}}>{active.choices.map((c,i)=><button key={i} type="button" onClick={()=>setChoice(i)} style={{...button,background:"white",textAlign:"left"}}>{c.label}</button>)}</div>:<>
      {!saved.includes(key)&&!remember&&<button type="button" onClick={save} style={{...button,background:CARE_COLORS.gold}}>♡ Save this happy memory</button>}
      {(saved.includes(key)||remember)&&<p role="status" style={{fontSize:12,fontWeight:900,color:INK}}>♡ A moment to remember</p>}
    </>}
    <button type="button" onClick={reset} style={{...button,background:"white",marginTop:11}}>Back to little moments</button>
  </div>}
  {saved.length>0&&<div style={{marginTop:19}}>
    <h4 style={{fontFamily:"'Fredoka One',cursive",fontSize:16,margin:"0 0 10px",color:INK}}>Our scrapbook ({saved.length}/6)</h4>
    <div style={{display:"grid",gap:8}}>{saved.map(id=><div key={id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:9,padding:"9px 10px",background:CARE_COLORS.rose,border:"2px solid "+INK,borderRadius:11}}>
      <span style={{fontSize:12,fontWeight:800,color:INK}}>💗 {memoryLabel(id)}</span>
      <button type="button" aria-label={"Delete memory: "+memoryLabel(id)} onClick={()=>persist(saved.filter(x=>x!==id))} style={{...button,background:"white",padding:"7px 9px",flexShrink:0}}>Delete</button>
    </div>)}</div>
    <button type="button" onClick={()=>{persist([]);setRemember(false);}} style={{...button,background:"white",marginTop:12}}>Clear all memories</button>
  </div>}
  <p style={{fontSize:11,lineHeight:1.55,color:CARE_COLORS.muted,margin:"16px 0 0"}}>Only memories you explicitly save are stored locally in this browser, using short fictional scene IDs. You can delete any or all of them. Feelings shared in the private Comfort Corner are never included. This feature doesn't send notifications or change affection, XP, or coins.</p>
 </section>;
}

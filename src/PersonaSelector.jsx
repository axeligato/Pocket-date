import React,{useState} from "react";
import {CARE_COLORS as C} from "./careTheme.js";

export const PERSONA_KEY="pocket-date-persona-v1";
export const PERSONAS={
 kai:{id:"kai",name:"Kai",icon:"🏃",subtitle:"The thoughtful neighbor",tone:"Playful, energetic and a little awkward when flirting.",preview:"Hey, you. Want to grab ramen? I promise not to call it a date. Unless you want me to."},
 jenny:{id:"jenny",name:"Jenny",icon:"🌷",subtitle:"The creative confidante",tone:"Warm, witty and observant, with a quietly bold streak.",preview:"I saved you a seat by the window. No reason. Okay, maybe one reason."}
};
export function getPersona(){try{return localStorage.getItem(PERSONA_KEY)==="jenny"?"jenny":"kai";}catch{return "kai";}}
export default function PersonaSelector(){
 const [selected,setSelected]=useState(getPersona);
 const [notice,setNotice]=useState("");
 const choose=id=>{setSelected(id);try{localStorage.setItem(PERSONA_KEY,id);setNotice(id==="jenny"?"Jenny's preview is selected. Her full storyline and dialogue are coming later.":"Kai is selected.");}catch{setNotice("Selection could not be saved on this device.");}};
 return <section aria-label="Choose your companion" className="pd-settings-card" style={{background:C.surface,borderRadius:20,padding:18,margin:"16px 16px 20px",color:C.ink}}>
  <h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:22,margin:"0 0 7px"}}>Who are we talking to? ♡</h2>
  <p style={{fontSize:12,lineHeight:1.6,color:C.muted,margin:"0 0 14px"}}>Choose your companion. Both will share the same Care tools and app features. Jenny is an early character preview for now.</p>
  <div role="group" aria-label="Companion selection" style={{display:"grid",gap:10}}>
   {Object.values(PERSONAS).map(p=><button key={p.id} type="button" aria-pressed={selected===p.id} onClick={()=>choose(p.id)} style={{display:"flex",gap:12,textAlign:"left",alignItems:"flex-start",background:selected===p.id?"rgba(169,214,229,.3)":C.paper,border:"2px solid "+(selected===p.id?C.ink:"rgba(7,59,76,.2)"),borderRadius:16,padding:13,minHeight:70,color:C.ink,cursor:"pointer"}}>
    <span aria-hidden="true" style={{fontSize:29}}>{p.icon}</span>
    <span style={{display:"grid",gap:3,flex:1}}><strong style={{fontSize:16}}>{p.name} {selected===p.id?"✓":""}</strong><span style={{fontSize:12,fontWeight:700}}>{p.subtitle}</span><span style={{fontSize:12,color:C.muted}}>{p.tone}</span><span style={{fontSize:12,fontStyle:"italic",marginTop:5}}>“{p.preview}”</span>{p.id==="jenny"&&<span style={{fontSize:11,fontWeight:800}}>Story preview · Coming soon</span>}</span>
   </button>)}
  </div>
  <p aria-live="polite" style={{fontSize:12,color:C.muted,margin:"12px 0 0"}}>{notice||"Character-specific story progress is not separated yet. Kai's current storyline remains available."}</p>
 </section>;
}

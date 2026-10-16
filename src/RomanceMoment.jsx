import React,{useState} from "react";
import {ROMANCE_SCENES,getRomanceScene,getRomanceMemoryLine,getRomanceChoiceCallback,readRomanceProgress,saveRomanceProgress} from "./romanceInteractions.js";
import {CARE_COLORS} from "./careTheme.js";
export default function RomanceMoment({affection,jogMemory,onChoose}){
 const [scene,setScene]=useState(null);
 const [answer,setAnswer]=useState(null);
 const [choices,setChoices]=useState(readRomanceProgress);
 const [earned,setEarned]=useState(0);
 const available=ROMANCE_SCENES.filter(s=>affection>=s.min);
 const completed=available.filter(s=>choices[s.id]).length;
 const callback=getRomanceChoiceCallback(choices);
 const begin=()=>{setScene(getRomanceScene(affection,choices));setAnswer(null);setEarned(0);};
 const choose=option=>{if(answer)return;const reward=choices[scene.id]?0:option.affection;const updated={...choices,[scene.id]:choices[scene.id]||option.id};setChoices(updated);saveRomanceProgress(updated);setAnswer(option);setEarned(reward);if(reward)onChoose(reward);};
 return <section className="pd-romance" aria-label="Romantic moment with Kai" style={{width:"100%",padding:"2px 16px 12px",color:CARE_COLORS.ink}}>
  {!scene?<div style={{display:"grid",gap:8}}><button type="button" onClick={begin} style={{border:"none",borderRadius:999,background:CARE_COLORS.rose,color:CARE_COLORS.ink,padding:"11px 17px",fontWeight:900,cursor:"pointer"}}>♡ {completed<available.length?"Spend a moment with Kai":"Revisit a moment with Kai"}</button><span style={{fontSize:12,color:CARE_COLORS.muted}}>{completed} of {available.length} moments shared · More unlock with affection</span>{callback&&<p style={{fontSize:13,lineHeight:1.6,margin:"3px 0"}}>♡ {callback}</p>}</div>:<div className="pd-conversation" style={{padding:"15px 17px",background:CARE_COLORS.paper,borderRadius:22}}>
   <strong style={{fontSize:12}}>♡ {choices[scene.id]?"A familiar moment":"A new little moment"}</strong>
   {!answer?<><p style={{fontSize:14,lineHeight:1.7,margin:"10px 0 15px"}}>{scene.prompt}</p><div className="pd-choice-group" role="group" aria-label="Choose your reply" style={{display:"flex",flexWrap:"wrap",gap:8}}>{scene.choices.map(c=><button className="pd-choice" key={c.id} type="button" onClick={()=>choose(c)} style={{border:"1px solid "+CARE_COLORS.ink,borderRadius:999,padding:"10px 13px",background:CARE_COLORS.surface,color:CARE_COLORS.ink,cursor:"pointer",fontWeight:750}}>{c.label}</button>)}</div></>:<>
    <p aria-live="polite" style={{fontSize:15,lineHeight:1.75,margin:"12px 0"}}>{answer.reply}</p>
    {jogMemory&&<p style={{fontSize:13,lineHeight:1.6,color:CARE_COLORS.muted}}>{getRomanceMemoryLine(jogMemory)}</p>}
    <p style={{fontSize:12,fontWeight:800,color:CARE_COLORS.muted}}>{earned?`♡ +${earned} affection · First-time moment`:"♡ Replayed · No additional affection"}</p>
    <button type="button" onClick={()=>{setScene(null);setAnswer(null);}} style={{border:0,background:"transparent",padding:"8px 0",color:CARE_COLORS.ink,fontWeight:900,cursor:"pointer",textDecoration:"underline"}}>Back to hanging out →</button>
   </>}
  </div>}
 </section>;
}

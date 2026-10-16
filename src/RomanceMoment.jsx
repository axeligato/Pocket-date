import React,{useState} from "react";
import {getRomanceScene,getRomanceMemoryLine} from "./romanceInteractions.js";
import {CARE_COLORS} from "./careTheme.js";
export default function RomanceMoment({affection,jogMemory,onChoose}){
 const [scene,setScene]=useState(null);
 const [answer,setAnswer]=useState(null);
 const [lastId,setLastId]=useState(null);
 const begin=()=>{setScene(getRomanceScene(affection,lastId));setAnswer(null);};
 const choose=option=>{setAnswer(option);setLastId(scene.id);onChoose(option.affection);};
 return <section aria-label="Romantic moment with Kai" style={{width:"100%",padding:"2px 16px 12px",color:CARE_COLORS.ink}}>
  {!scene?<button type="button" onClick={begin} style={{border:"none",borderRadius:999,background:CARE_COLORS.rose,color:CARE_COLORS.ink,padding:"11px 17px",fontWeight:900,cursor:"pointer"}}>♡ Flirt with Kai</button>:<div style={{padding:"15px 17px",background:CARE_COLORS.paper,borderRadius:22}}>
   <strong style={{fontSize:12}}>♡ A little moment</strong>
   {!answer?<><p style={{fontSize:14,lineHeight:1.7,margin:"10px 0 15px"}}>{scene.prompt}</p><div role="group" aria-label="Choose your reply" style={{display:"flex",flexWrap:"wrap",gap:8}}>{scene.choices.map(c=><button key={c.id} type="button" onClick={()=>choose(c)} style={{border:"1px solid "+CARE_COLORS.ink,borderRadius:999,padding:"10px 13px",background:CARE_COLORS.surface,color:CARE_COLORS.ink,cursor:"pointer",fontWeight:750}}>{c.label}</button>)}</div></>:<>
    <p aria-live="polite" style={{fontSize:15,lineHeight:1.75,margin:"12px 0"}}>{answer.reply}</p>
    {jogMemory&&<p style={{fontSize:13,lineHeight:1.6,color:CARE_COLORS.muted}}>{getRomanceMemoryLine(jogMemory)}</p>}
    <p style={{fontSize:12,fontWeight:800,color:CARE_COLORS.muted}}>♡ +{answer.affection} affection</p>
    <button type="button" onClick={()=>{setScene(null);setAnswer(null);}} style={{border:0,background:"transparent",padding:"8px 0",color:CARE_COLORS.ink,fontWeight:900,cursor:"pointer",textDecoration:"underline"}}>Back to hanging out →</button>
   </>}
  </div>}
 </section>;
}

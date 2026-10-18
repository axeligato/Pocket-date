import React,{useState} from "react";
import {CARE_COLORS as C} from "./careTheme.js";

const KEY="pocket-date-wellness-routine-v1";
const ROUTINES=[
 {id:"morning",icon:"☀️",name:"Gentle morning",description:"A little grounding before the day begins.",tool:"ground"},
 {id:"reset",icon:"🌿",name:"Midday reset",description:"One minute to breathe between things.",tool:"breathe"},
 {id:"evening",icon:"🌙",name:"Evening wind-down",description:"A short guided pause before resting.",tool:"unwind"}
];
function load(){try{const value=JSON.parse(localStorage.getItem(KEY)||"null");return ROUTINES.some(r=>r.id===value)?value:null;}catch{return null;}}
export default function CareRoutine({onStart}){
 const [selected,setSelected]=useState(load);
 const choose=id=>{const next=id===selected?null:id;setSelected(next);try{if(next)localStorage.setItem(KEY,JSON.stringify(next));else localStorage.removeItem(KEY);}catch{/* Optional preference */}};
 return <section aria-label="Your gentle routine" style={{margin:"24px 0",color:C.ink}}>
  <h3 style={{fontSize:21,margin:"0 0 8px"}}>Your little routine ♡</h3>
  <p style={{fontSize:13,color:C.muted,margin:"0 0 12px",lineHeight:1.6}}>Pick a favorite moment to return to. No streaks, deadlines or notifications.</p>
  <div style={{display:"grid",gap:9}}>
   {ROUTINES.map(r=><div key={r.id} style={{display:"flex",gap:10,alignItems:"center",padding:12,background:selected===r.id?"rgba(169,214,229,.28)":C.surface,border:"1px solid rgba(7,59,76,.2)",borderRadius:16}}>
    <span aria-hidden="true" style={{fontSize:24}}>{r.icon}</span>
    <div style={{flex:1,minWidth:0}}><strong style={{fontSize:13}}>{r.name}</strong><p style={{fontSize:11,color:C.muted,margin:"4px 0 0"}}>{r.description}</p></div>
    <button type="button" aria-pressed={selected===r.id} onClick={()=>choose(r.id)} style={{border:"1px solid "+C.ink,borderRadius:12,padding:"9px",minHeight:44,background:selected===r.id?C.rose:"white",fontSize:11,fontWeight:800,color:C.ink,cursor:"pointer"}}>{selected===r.id?"Saved ✓":"Save"}</button>
   </div>)}
  </div>
  {selected&&<p style={{fontSize:12,color:C.muted,margin:"10px 0 0"}}>♡ Kai will keep your favorite here. Start it whenever you want.</p>}
 </section>;
}

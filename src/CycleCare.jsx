import {CARE_COLORS} from "./careTheme.js";
import React,{useState} from "react";
const INK=CARE_COLORS.ink;
const FEELINGS=[
 {id:"cramps",emoji:"🌷",label:"I have cramps",reply:"Oh, sweetheart. Want to take it easy? I can keep you company while you rest. ♡"},
 {id:"tired",emoji:"🌙",label:"I'm feeling tired",reply:"You don't have to push through everything. Let's have a quiet moment together."},
 {id:"emotional",emoji:"💗",label:"I'm feeling sensitive",reply:"Whatever you're feeling is okay. You don't need to explain it to me. I'm here."},
 {id:"okay",emoji:"☀️",label:"I'm doing okay",reply:"I'm glad. Want to hang out for a while? No agenda, just us."}
];
const button={border:"2px solid "+INK,borderRadius:12,padding:"11px 13px",color:INK,fontWeight:900,fontFamily:"'Nunito',sans-serif",cursor:"pointer"};
export default function CycleCare(){
 const [open,setOpen]=useState(false);
 const [feeling,setFeeling]=useState(null);
 const [ack,setAck]=useState(false);
 const clear=()=>{setOpen(false);setFeeling(null);setAck(false);};
 const selected=FEELINGS.find(f=>f.id===feeling);
 return <section aria-label="Optional cycle support" style={{marginTop:0,background:"transparent",border:0,borderRadius:0,padding:"0 4px 4px",boxShadow:"none"}}>
  <h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:20,margin:"12px 0 6px",color:INK}}>A little extra care ♡</h3>
  <p style={{fontSize:12,lineHeight:1.65,color:CARE_COLORS.muted,margin:"0 0 13px"}}>If you're on your period or simply want some comfort, Kai can listen. You never have to share anything. This feature doesn't track or predict your cycle.</p>
  {!open?<button type="button" onClick={()=>setOpen(true)} style={{...button,background:CARE_COLORS.rose,width:"100%"}}>♡ Talk to Kai privately</button>:<>
    <div style={{background:CARE_COLORS.paper,border:"2px dashed "+INK,borderRadius:13,padding:12,marginBottom:13}}>
      <strong style={{fontSize:12,color:INK}}>Private for this visit</strong>
      <p style={{fontSize:11,color:CARE_COLORS.muted,lineHeight:1.55,margin:"5px 0 0"}}>Your choice and Kai's response are kept only in temporary on-screen state. Nothing is added to your saved preferences, history, or notifications. Closing this panel clears the response; leaving or refreshing the page clears it too.</p>
    </div>
    {!selected?<><p style={{fontSize:13,fontWeight:900,color:INK}}>How are you feeling?</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,180px),1fr))",gap:9,marginBottom:12}}>
        {FEELINGS.map(f=><button key={f.id} type="button" onClick={()=>{setFeeling(f.id);setAck(false);}} style={{...button,background:CARE_COLORS.paper,textAlign:"left",minHeight:55}}>{f.emoji} {f.label}</button>)}
      </div>
    </>:<div aria-live="polite" style={{background:CARE_COLORS.rose,border:"2px solid "+INK,borderRadius:14,padding:14,marginBottom:12}}>
      <div style={{fontSize:11,fontWeight:900,letterSpacing:1,color:INK,marginBottom:6}}>💌 KAI SAYS</div>
      <p style={{fontFamily:"'Fredoka One',cursive",fontSize:17,lineHeight:1.5,margin:"0 0 12px",color:INK}}>{ack?"I'm right here if you need me. Take your time. ♡":selected.reply}</p>
      {!ack&&<button type="button" onClick={()=>setAck(true)} style={{...button,background:CARE_COLORS.gold}}>♡ Thanks, Kai</button>}
    </div>}
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {selected&&<button type="button" onClick={()=>{setFeeling(null);setAck(false);}} style={{...button,background:"white"}}>Choose another feeling</button>}
      <button type="button" onClick={clear} style={{...button,background:"white"}}>Close & clear</button>
    </div>
  </>}
  <p style={{fontSize:11,color:CARE_COLORS.muted,lineHeight:1.55,margin:"13px 0 0"}}>Kai offers fictional emotional support, not medical advice. For severe or unusual symptoms, seek advice from a healthcare professional.</p>
 </section>;
}

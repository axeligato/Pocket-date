import React,{useEffect,useState} from "react";
import {CARE_COLORS as C} from "./careTheme.js";

const TOOLS=[
 {id:"breathe",icon:"🌬️",title:"Breathe with Kai",subtitle:"A gentle breathing rhythm",seconds:60},
 {id:"unwind",icon:"🌙",title:"Unwind",subtitle:"A short guided pause",seconds:120},
 {id:"ground",icon:"🌿",title:"Ground myself",subtitle:"Notice what's around you",seconds:90}
];
const STEPS={
 unwind:["Find a comfortable position. You can keep your eyes open.","Notice where your body is supported. Let your shoulders settle.","Take a natural breath. There's nothing you need to achieve.","Notice a sound around you. Let it come and go.","When you're ready, gently return your attention to the room."],
 ground:["Look around and notice five things you can see.","Notice four things you can feel, like the chair or floor.","Listen for three sounds around you.","Notice two scents, if any are present.","Notice one taste, or simply how your mouth feels. You're here."]
};
const button={minHeight:44,border:"1.5px solid "+C.ink,borderRadius:14,background:C.surface,color:C.ink,fontWeight:800,padding:"10px 13px",cursor:"pointer"};
export default function WellnessToolkit({onComplete}){
 const [active,setActive]=useState(null);
 const [seconds,setSeconds]=useState(0);
 const [running,setRunning]=useState(false);
 const [finished,setFinished]=useState(false);
 const [breathDuration,setBreathDuration]=useState(60);
 const [reflection,setReflection]=useState(null);
 useEffect(()=>{if(!running||!active)return;const id=setInterval(()=>setSeconds(v=>v+1),1000);return()=>clearInterval(id);},[running,active]);
 useEffect(()=>{if(active&&seconds>=active.seconds&&running){setRunning(false);setFinished(true);onComplete?.(active.id,active.seconds);}},[seconds,active,running,onComplete]);
 const start=tool=>{setReflection(null);setActive(tool.id==="breathe"?{...tool,seconds:breathDuration}:tool);setSeconds(0);setFinished(false);setRunning(true);};
 const close=()=>{setRunning(false);setActive(null);setSeconds(0);setFinished(false);};
 const remaining=active?Math.max(0,active.seconds-seconds):0;
 const inhale=seconds%10<4;
 const stepIndex=active&&active.id!=="breathe"?Math.min(STEPS[active.id].length-1,Math.floor(seconds/(active.seconds/STEPS[active.id].length))):0;
 const step=active&&active.id!=="breathe"?STEPS[active.id][stepIndex]:null;
 return <section className="pd-wellness" aria-label="Wellness exercises" style={{color:C.ink}}>
  {!active?<div style={{display:"grid",gap:10}}>
   <p style={{fontSize:13,margin:"0 0 3px",color:C.muted}}>Choose a small moment that feels right. You can stop at any time.</p>
   <div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap",fontSize:12}}><label htmlFor="breath-duration" style={{fontWeight:800}}>Breathing duration</label><select id="breath-duration" value={breathDuration} onChange={e=>setBreathDuration(Number(e.target.value))} style={{...button,minHeight:40}}><option value={60}>1 minute</option><option value={120}>2 minutes</option><option value={180}>3 minutes</option></select></div>
   <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,145px),1fr))",gap:10}}>
    {TOOLS.map(tool=><button type="button" key={tool.id} onClick={()=>start(tool)} style={{...button,textAlign:"left",display:"grid",gap:6,padding:15}}>
     <span aria-hidden="true" style={{fontSize:24}}>{tool.icon}</span><strong style={{fontSize:14}}>{tool.title}</strong>
     <span style={{fontSize:12,fontWeight:500,color:C.muted}}>{tool.subtitle}</span>
     <span style={{fontSize:11,fontWeight:800}}>{tool.id==="breathe"?breathDuration/60:tool.seconds/60} min →</span>
    </button>)}
   </div>
  </div>:<div role="dialog" aria-modal="true" aria-label={active.title} className="pd-wellness-session" style={{background:C.paper,border:"1px solid rgba(7,59,76,.2)",borderRadius:22,padding:18,display:"grid",gap:15,textAlign:"center"}}>
   <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center"}}>
    <strong>{active.title}</strong><button type="button" onClick={close} style={{...button,minHeight:40}}>Close ✕</button>
   </div>
   {finished?<><strong style={{fontSize:22}}>A little moment for yourself ♡</strong><p style={{margin:0,fontSize:14}}>Kai says: "Thanks for spending this minute with me. No pressure to feel any particular way."</p><p style={{fontSize:13,margin:0}}>How do you feel right now?</p><div role="group" aria-label="How you feel after this session" style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap"}}>{["A little calmer","About the same","Not sure"].map(label=><button key={label} type="button" aria-pressed={reflection===label} onClick={()=>setReflection(label)} style={{...button,background:reflection===label?C.rose:C.surface,fontSize:12}}>{label}</button>)}</div>{reflection&&<p aria-live="polite" style={{fontSize:12,color:C.muted,margin:0}}>Thanks for checking in. You do not need to feel different for this to count.</p>}</>:<>
    {active.id==="breathe"?<>
     <div aria-hidden="true" style={{width:148,height:148,margin:"8px auto",borderRadius:"50%",display:"grid",placeItems:"center",background:C.rose,animation:running?"pd-breathe 10s ease-in-out infinite":"none",transform:running?undefined:"scale(.85)",boxShadow:"0 0 0 10px rgba(169,214,229,.22)"}}><span style={{fontSize:27}}>♡</span></div>
     <strong aria-live="off" style={{fontSize:21}}>{running?(inhale?"Breathe in gently":"Breathe out slowly"):"Paused"}</strong>
     <p style={{margin:0,fontSize:12,color:C.muted}}>Follow at a comfortable pace. Breathe normally if this rhythm doesn't suit you.</p>
    </>:<>
     <div className={"pd-guided-visual pd-guided-visual--"+active.id} aria-hidden="true">
      {active.id==="unwind"?<><span className="pd-guided-halo"/><span className="pd-guided-orbit" style={{animationPlayState:running?"running":"paused"}}><span className="pd-guided-orb"/></span><span className="pd-guided-center">✦</span></>:<><span className="pd-ground-path"/><span className="pd-ground-traveler" style={{left:(10+stepIndex*20)+"%",animationPlayState:running?"running":"paused"}}/><div className="pd-ground-stops">{STEPS.ground.map((_,i)=><span key={i} className={i<=stepIndex?"is-active":""}/>)}</div><span className="pd-guided-center">🌿</span></>}
     </div>
     <div className="pd-guided-step-count" aria-label={"Step "+(stepIndex+1)+" of "+STEPS[active.id].length}>STEP {stepIndex+1} OF {STEPS[active.id].length}</div>
     <p aria-live="polite" aria-atomic="true" style={{fontSize:17,lineHeight:1.65,minHeight:70,margin:0}}>{step}</p>
     <p style={{fontSize:12,color:C.muted,margin:0}}>{running?"Follow the gentle movement while you take your time with each thought.":"Movement paused. Continue whenever you feel ready."}</p>
    </>}
    <strong style={{fontVariantNumeric:"tabular-nums"}}>{Math.floor(remaining/60)}:{String(remaining%60).padStart(2,"0")} remaining</strong>
    <button type="button" onClick={()=>setRunning(v=>!v)} style={{...button,background:C.rose}}>{running?"Pause":"Resume"}</button>
   </>}
   <p style={{fontSize:11,color:C.muted,margin:0}}>Optional relaxation exercise, not a medical treatment. Stop if you feel uncomfortable.</p>
  </div>}
 </section>;
}

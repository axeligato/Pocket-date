import FeelingCheckIn from "./FeelingCheckIn.jsx";
import {getPersona} from "./PersonaSelector.jsx";
import WellnessToolkit from "./WellnessToolkit.jsx";
import CareRoutine from "./CareRoutine.jsx";
import CareActivityDashboard,{readActivity,recordActivity,ACTIVITY_KEY} from "./CareActivityDashboard.jsx";
import {careSectionStyle,careSummaryStyle} from "./careTheme.js";
import {CARE_COLORS} from "./careTheme.js";
import CycleCare from "./CycleCare.jsx";
import Milestones from "./Milestones.jsx";
import React, {useEffect,useState} from "react";

const INK=CARE_COLORS.ink;
const CARE_KEY="pocket-date-care-v1";
const RHYTHMS=[{id:"off",label:"Only when I ask"},{id:"morning",label:"Morning"},{id:"afternoon",label:"Afternoon"},{id:"evening",label:"Evening"},{id:"every4h",label:"Every 4 hours while I use the app"},{id:"every2h",label:"Every 2 hours while I use the app"}];
const TODAY=()=>new Date().toLocaleDateString("en-CA");
const DAYPART=()=>{const h=new Date().getHours();return h<12?"morning":h<17?"afternoon":"evening";};
const TOPICS=[
  {id:"water",icon:"💧",title:"Drink some water",hint:"A little hydration break",line:"Hey, have you had some water? I'll grab a glass too. ♡",reply:"Nice. Proud of you for looking after yourself."},
  {id:"food",icon:"🍓",title:"Eat something",hint:"A gentle meal check-in",line:"Have you eaten today? No pressure. I just want you feeling okay.",reply:"That sounds good. Let's make time for a proper break."},
  {id:"rest",icon:"🌙",title:"Take a breather",hint:"Rest and recharge",line:"You've been doing a lot. Want to rest with me for a minute?",reply:"We can just hang out quietly. You don't have to do anything."},
  {id:"move",icon:"🌷",title:"Stretch a little",hint:"Move at your own pace",line:"My shoulders are stiff. Want to stretch with me? Only if you feel like it.",reply:"There we go. Slow and easy."}
];
function loadCare(){
  try{
    const data=JSON.parse(localStorage.getItem(CARE_KEY)||"null");
    if(data?.version!==1||!data.enabled)return {enabled:false,topics:[],last:null,rhythm:"off",dismissed:"",snoozed:"",lastCheck:0};
    return {enabled:true,topics:TOPICS.filter(t=>data.topics?.includes(t.id)).map(t=>t.id),last:null,rhythm:RHYTHMS.some(r=>r.id===data.rhythm)?data.rhythm:"off",dismissed:typeof data.dismissed==="string"?data.dismissed:"",snoozed:typeof data.snoozed==="string"?data.snoozed:"",lastCheck:Number.isFinite(data.lastCheck)?data.lastCheck:0};
  }catch{return {enabled:false,topics:[],last:null};}
}
export default function CareMode({mode="home",onOpenPreferences}){
  const [care,setCare]=useState(loadCare);
  const [selected,setSelected]=useState(()=>{const saved=loadCare();return saved.enabled?saved.topics:["water","food","rest"];});
  const [response,setResponse]=useState(null);
  const [activity,setActivity]=useState(readActivity);
  const onSessionComplete=React.useCallback((type,duration)=>setActivity(recordActivity(type,duration)),[]);
  const clearActivity=()=>{try{localStorage.removeItem(ACTIVITY_KEY);}catch{}setActivity([]);};
  const [rhythm,setRhythm]=useState(()=>loadCare().rhythm);
  const [clock,setClock]=useState(()=>Date.now());
  useEffect(()=>{const timer=setInterval(()=>setClock(Date.now()),60000);return()=>clearInterval(timer);},[]);
  const persist=(next)=>{
    setCare(next);
    try{
      if(next.enabled)localStorage.setItem(CARE_KEY,JSON.stringify({version:1,enabled:true,topics:next.topics,rhythm:next.rhythm,dismissed:next.dismissed||"",snoozed:next.snoozed||"",lastCheck:next.lastCheck||0}));
      else localStorage.removeItem(CARE_KEY);
    }catch{/* Local storage may be unavailable. */}
  };
  const toggle=(id)=>setSelected(items=>items.includes(id)?items.filter(x=>x!==id):[...items,id]);
  const start=()=>{persist({enabled:true,topics:selected,last:null,rhythm,dismissed:care.dismissed||"",snoozed:care.snoozed||"",lastCheck:care.lastCheck||0});setResponse(null);};
  const stop=()=>{persist({enabled:false,topics:[],last:null,rhythm:"off",dismissed:"",snoozed:""});setRhythm("off");setResponse(null);};
  const active=TOPICS.filter(t=>care.topics.includes(t.id));
  const today=TODAY();
  const intervalHours=care.rhythm==="every2h"?2:care.rhythm==="every4h"?4:0;
  const due=care.enabled&&care.rhythm!=="off"&&(intervalHours?clock-(care.lastCheck||0)>=intervalHours*3600000:care.rhythm===DAYPART()&&care.dismissed!==today)&&(!care.snoozed||Number(care.snoozed)<=clock);
  const checkIn=active[(new Date().getDate()-1)%Math.max(active.length,1)];
  const snooze=()=>{persist({...care,snoozed:String(Date.now()+60*60*1000)});setClock(Date.now());};
  const dismiss=()=>persist({...care,dismissed:today,snoozed:"",lastCheck:Date.now()});
  return <section className="pocket-care pd-care" aria-label="Care Mode" style={{padding:"22px 16px 36px",maxWidth:740,margin:"0 auto",width:"100%",color:INK}}>
    <h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:28,margin:"15px 0 7px"}}>{mode==="home"?"Care ♡":"Reminder settings"}</h2>
    {mode==="home"&&<div className="pd-care-home">
      <div className="pd-care-hero"><span className="pd-care-eyebrow">A MOMENT FOR YOU ♡</span><p>{getPersona()==="jenny"?"Jenny says: I saved us a quiet moment. What sounds good?":"Kai says: Hey, you. We can take things slow today. What would help?"}</p><span className="pd-care-hero-footer">No pressure. Just a little care, together.</span></div>

      <div className="pd-care-activities"><div className="pd-care-section-heading"><div><span className="pd-care-eyebrow">QUICK START</span><h3>What would help right now?</h3></div></div><WellnessToolkit onComplete={onSessionComplete}/></div>
      <div className="pd-care-feeling"><CycleCare/></div>
      <div className="pd-care-feeling"><div className="pd-care-section-heading"><div><span className="pd-care-eyebrow">CHECK IN</span><h3>Talk about your day</h3></div></div><FeelingCheckIn/></div>
    </div>}
    {mode==="preferences"&&<>
      <div className="pd-settings-card" style={{background:"white",border:"3px solid "+INK,borderRadius:20,padding:17,boxShadow:"5px 6px 0 "+INK,marginBottom:18}}>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:19,marginBottom:6}}>{care.enabled?"Your care preferences":"Want me to look after you?"}</div>
        <p style={{fontSize:12,lineHeight:1.65,margin:"0 0 15px",color:CARE_COLORS.muted}}>Choose what Kai checks in about.</p>
        <div style={{display:"grid",gap:9}}>
          {TOPICS.map(t=><label className="pd-setting-option" key={t.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 12px",border:"2px solid "+INK,borderRadius:13,background:selected.includes(t.id)?CARE_COLORS.paper:CARE_COLORS.paper,cursor:"pointer"}}>
            <input type="checkbox" checked={selected.includes(t.id)} onChange={()=>toggle(t.id)} style={{width:19,height:19,accentColor:INK,flexShrink:0}}/>
            <span aria-hidden="true" style={{fontSize:23}}>{t.icon}</span>
            <span><strong style={{display:"block",fontSize:13}}>{t.title}</strong><span style={{fontSize:11,color:CARE_COLORS.muted}}>{t.hint}</span></span>
          </label>)}
        </div>
        <div style={{marginTop:16}}>
          <label htmlFor="care-rhythm" style={{display:"block",fontSize:12,fontWeight:900,marginBottom:7}}>When should Kai check in?</label>
          <select id="care-rhythm" value={rhythm} onChange={e=>setRhythm(e.target.value)} style={{width:"100%",minHeight:46,border:"2px solid "+INK,borderRadius:11,background:"white",color:INK,padding:"8px 10px",fontSize:13,fontWeight:800}}>
            {RHYTHMS.map(r=><option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          <p style={{fontSize:11,color:CARE_COLORS.muted,lineHeight:1.5,margin:"7px 0 0"}}>Only in-app reminders; no push notifications.</p>
        </div>
        <button type="button" onClick={start} disabled={!selected.length} style={{marginTop:17,width:"100%",minHeight:48,background:CARE_COLORS.gold,border:"3px solid "+INK,borderRadius:14,boxShadow:"3px 4px 0 "+INK,color:INK,fontSize:14,fontWeight:900,cursor:selected.length?"pointer":"not-allowed",opacity:selected.length?1:.5}}>{care.enabled?"Save preferences ♡":"Turn on Care Mode ♡"}</button>
        {care.enabled&&<button type="button" onClick={stop} style={{marginTop:12,width:"100%",padding:12,border:"2px solid "+INK,borderRadius:12,background:"transparent",color:INK,fontWeight:900,cursor:"pointer"}}>Turn off & clear Care Mode</button>}

      </div>
    </>}
    {mode==="home"&&care.enabled&&<>
      {response&&<div className="pd-conversation" style={{background:CARE_COLORS.rose,border:"3px solid "+INK,borderRadius:19,padding:17,boxShadow:"5px 6px 0 "+INK,marginBottom:20}}>
        <div style={{fontSize:12,fontWeight:900,letterSpacing:1,marginBottom:9}}>💌 A NOTE FROM KAI</div>
        <p aria-live="polite" style={{fontFamily:"'Fredoka One',cursive",fontSize:19,lineHeight:1.5,margin:0}}>{response||"Hey, you. I'm here if you need a little encouragement today. ♡"}</p>
      </div>}
      {due&&checkIn&&<div className="pd-conversation" style={{background:CARE_COLORS.paper,border:"3px solid "+INK,borderRadius:18,padding:15,boxShadow:"4px 5px 0 "+INK,marginBottom:20}}>
        <strong style={{fontSize:11,letterSpacing:1}}>♡ YOUR {care.rhythm.toUpperCase()} CHECK-IN</strong>
        <p style={{fontSize:14,lineHeight:1.6,fontWeight:800,margin:"10px 0"}}>{checkIn.line}</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button type="button" onClick={()=>{setResponse(checkIn.reply);dismiss();}} style={{background:CARE_COLORS.gold,border:"2px solid "+INK,borderRadius:10,padding:"9px 12px",color:INK,fontWeight:900,cursor:"pointer"}}>♡ Thanks, Kai</button>
          <button type="button" onClick={snooze} style={{background:"white",border:"2px solid "+INK,borderRadius:10,padding:"9px 12px",color:INK,fontWeight:900,cursor:"pointer"}}>Later (1 hour)</button>
          <button type="button" onClick={dismiss} style={{background:"transparent",border:"none",padding:"9px 12px",color:INK,fontWeight:900,cursor:"pointer"}}>Not today</button>
        </div>
      </div>}
      <section className="pd-care-encouragement"><h3>♡ A little encouragement</h3><p>Choose a gentle reminder whenever you need it.</p><div className="pd-care-encouragement-grid">{active.map(t=><button className="pd-care-topic" key={t.id} type="button" onClick={()=>setResponse(t.line)}><span aria-hidden="true">{t.icon}</span><strong>{t.title}</strong></button>)}</div></section>
      {response&&<button type="button" onClick={()=>setResponse("I'm glad we got a little moment together. Take it at your own pace. ♡")} style={{background:CARE_COLORS.gold,border:"2px solid "+INK,borderRadius:12,padding:"10px 14px",fontWeight:900,color:INK,cursor:"pointer",marginBottom:16}}>♡ Thanks, Kai</button>}

    </>}
    {mode==="preferences"&&<CareRoutine/>}
    {mode==="preferences"&&<details style={careSectionStyle}>
      <summary style={careSummaryStyle}><span>🎂 Special days</span><span aria-hidden="true">＋</span></summary>
      <div style={{padding:"0 12px 15px"}}><Milestones/></div>
    </details>}
    {mode==="home"&&<details className="pd-care-stats-details" style={careSectionStyle}>
      <summary style={careSummaryStyle}><span>Activity statistics</span><span aria-hidden="true">＋</span></summary>
      <div className="pd-care-stats-body"><CareActivityDashboard entries={activity} onClear={clearActivity}/></div>
    </details>}
    {mode==="preferences"&&<p style={{margin:"23px 0 0",fontSize:11,lineHeight:1.65,color:CARE_COLORS.muted}}>♡ Privacy: Only your selected everyday care topics, preferred check-in time, and dismissal/snooze state are saved in this browser's local storage, not sent to an account or server by this feature. You can clear them at any time. Shared devices and browser backups may expose locally stored preferences. Birthday and personal dates are separately optional and deletable; cycle-related feelings are only used temporarily on screen and are not saved. This is friendly encouragement, not medical guidance.</p>}
  </section>;
}

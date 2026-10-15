import React, {useState} from "react";

const INK="#073B4C";
const CARE_KEY="pocket-date-care-v1";
const RHYTHMS=[{id:"off",label:"Only when I ask"},{id:"morning",label:"Morning"},{id:"afternoon",label:"Afternoon"},{id:"evening",label:"Evening"}];
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
    if(data?.version!==1||!data.enabled)return {enabled:false,topics:[],last:null,rhythm:"off",dismissed:"",snoozed:""};
    return {enabled:true,topics:TOPICS.filter(t=>data.topics?.includes(t.id)).map(t=>t.id),last:null,rhythm:RHYTHMS.some(r=>r.id===data.rhythm)?data.rhythm:"off",dismissed:typeof data.dismissed==="string"?data.dismissed:"",snoozed:typeof data.snoozed==="string"?data.snoozed:""};
  }catch{return {enabled:false,topics:[],last:null};}
}
export default function CareMode(){
  const [care,setCare]=useState(loadCare);
  const [selected,setSelected]=useState(["water","food","rest"]);
  const [response,setResponse]=useState(null);
  const [editing,setEditing]=useState(false);
  const [rhythm,setRhythm]=useState(()=>loadCare().rhythm);
  const [clock,setClock]=useState(()=>Date.now());
  const persist=(next)=>{
    setCare(next);
    try{
      if(next.enabled)localStorage.setItem(CARE_KEY,JSON.stringify({version:1,enabled:true,topics:next.topics,rhythm:next.rhythm,dismissed:next.dismissed||"",snoozed:next.snoozed||""}));
      else localStorage.removeItem(CARE_KEY);
    }catch{/* Local storage may be unavailable. */}
  };
  const toggle=(id)=>setSelected(items=>items.includes(id)?items.filter(x=>x!==id):[...items,id]);
  const start=()=>{persist({enabled:true,topics:selected,last:null,rhythm,dismissed:care.dismissed||"",snoozed:care.snoozed||""});setResponse(null);setEditing(false);};
  const stop=()=>{persist({enabled:false,topics:[],last:null,rhythm:"off",dismissed:"",snoozed:""});setRhythm("off");setResponse(null);setEditing(false);};
  const active=TOPICS.filter(t=>care.topics.includes(t.id));
  const today=TODAY();
  const due=care.enabled&&care.rhythm!=="off"&&care.rhythm===DAYPART()&&care.dismissed!==today&&(!care.snoozed||Number(care.snoozed)<=clock);
  const checkIn=active[(new Date().getDate()-1)%Math.max(active.length,1)];
  const snooze=()=>{persist({...care,snoozed:String(Date.now()+60*60*1000)});setClock(Date.now());};
  const dismiss=()=>persist({...care,dismissed:today,snoozed:""});
  return <section className="pocket-care" aria-label="Care Mode" style={{padding:"22px 16px 36px",maxWidth:740,margin:"0 auto",width:"100%",color:INK}}>
    <span style={{display:"inline-block",padding:"5px 11px",background:"#FFD166",border:"2px solid "+INK,borderRadius:9,boxShadow:"3px 3px 0 "+INK,fontSize:10,fontWeight:900,letterSpacing:1,transform:"rotate(-2deg)"}}>✦ A LITTLE EXTRA LOVE</span>
    <h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:28,margin:"15px 0 7px"}}>Kai's Care Corner ♡</h2>
    <p style={{fontSize:13,lineHeight:1.65,color:"#526773",fontWeight:700,margin:"0 0 20px"}}>A cozy space for gentle check-ins. You set the pace, always.</p>
    {!care.enabled||editing?<>
      <div style={{background:"white",border:"3px solid "+INK,borderRadius:20,padding:17,boxShadow:"5px 6px 0 "+INK,marginBottom:18}}>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:19,marginBottom:6}}>{editing?"Your care preferences":"Want me to look after you?"}</div>
        <p style={{fontSize:12,lineHeight:1.65,margin:"0 0 15px",color:"#526773"}}>Choose any topics you enjoy. All check-ins happen only when you open this page; there are no background reminders or notifications yet.</p>
        <div style={{display:"grid",gap:9}}>
          {TOPICS.map(t=><label key={t.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 12px",border:"2px solid "+INK,borderRadius:13,background:selected.includes(t.id)?"#fff3c9":"#fffaf2",cursor:"pointer"}}>
            <input type="checkbox" checked={selected.includes(t.id)} onChange={()=>toggle(t.id)} style={{width:19,height:19,accentColor:INK,flexShrink:0}}/>
            <span aria-hidden="true" style={{fontSize:23}}>{t.icon}</span>
            <span><strong style={{display:"block",fontSize:13}}>{t.title}</strong><span style={{fontSize:11,color:"#526773"}}>{t.hint}</span></span>
          </label>)}
        </div>
        <div style={{marginTop:16}}>
          <label htmlFor="care-rhythm" style={{display:"block",fontSize:12,fontWeight:900,marginBottom:7}}>When should Kai check in?</label>
          <select id="care-rhythm" value={rhythm} onChange={e=>setRhythm(e.target.value)} style={{width:"100%",minHeight:46,border:"2px solid "+INK,borderRadius:11,background:"white",color:INK,padding:"8px 10px",fontSize:13,fontWeight:800}}>
            {RHYTHMS.map(r=><option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          <p style={{fontSize:11,color:"#526773",lineHeight:1.5,margin:"7px 0 0"}}>Check-ins only appear while you're visiting Care Mode during your chosen time of day. Nothing is sent outside the game.</p>
        </div>
        <button type="button" onClick={start} disabled={!selected.length} style={{marginTop:17,width:"100%",minHeight:48,background:"#06D6A0",border:"3px solid "+INK,borderRadius:14,boxShadow:"3px 4px 0 "+INK,color:INK,fontSize:14,fontWeight:900,cursor:selected.length?"pointer":"not-allowed",opacity:selected.length?1:.5}}>{editing?"Save preferences ♡":"Turn on Care Mode ♡"}</button>
        {editing&&<button type="button" onClick={()=>setEditing(false)} style={{marginTop:10,width:"100%",background:"transparent",border:0,color:INK,fontWeight:900,cursor:"pointer",padding:10}}>Cancel</button>}
      </div>
    </>:<>
      <div style={{background:"#ffe1e9",border:"3px solid "+INK,borderRadius:19,padding:17,boxShadow:"5px 6px 0 "+INK,marginBottom:20}}>
        <div style={{fontSize:12,fontWeight:900,letterSpacing:1,marginBottom:9}}>💌 A NOTE FROM KAI</div>
        <p aria-live="polite" style={{fontFamily:"'Fredoka One',cursive",fontSize:19,lineHeight:1.5,margin:0}}>{response||"Hey, you. I'm here if you need a little encouragement today. ♡"}</p>
      </div>
      {due&&checkIn&&<div style={{background:"#fff3c9",border:"3px solid "+INK,borderRadius:18,padding:15,boxShadow:"4px 5px 0 "+INK,marginBottom:20}}>
        <strong style={{fontSize:11,letterSpacing:1}}>♡ YOUR {care.rhythm.toUpperCase()} CHECK-IN</strong>
        <p style={{fontSize:14,lineHeight:1.6,fontWeight:800,margin:"10px 0"}}>{checkIn.line}</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button type="button" onClick={()=>{setResponse(checkIn.reply);dismiss();}} style={{background:"#06D6A0",border:"2px solid "+INK,borderRadius:10,padding:"9px 12px",color:INK,fontWeight:900,cursor:"pointer"}}>♡ Thanks, Kai</button>
          <button type="button" onClick={snooze} style={{background:"white",border:"2px solid "+INK,borderRadius:10,padding:"9px 12px",color:INK,fontWeight:900,cursor:"pointer"}}>Later (1 hour)</button>
          <button type="button" onClick={dismiss} style={{background:"transparent",border:"none",padding:"9px 12px",color:INK,fontWeight:900,cursor:"pointer"}}>Not today</button>
        </div>
      </div>}
      <h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:19,margin:"0 0 12px"}}>What sounds good right now?</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,210px),1fr))",gap:13,marginBottom:20}}>
        {active.map(t=><button key={t.id} type="button" onClick={()=>setResponse(t.line)} style={{background:"white",border:"2.5px solid "+INK,borderRadius:16,padding:"15px 13px",boxShadow:"3px 4px 0 "+INK,cursor:"pointer",textAlign:"left",color:INK,fontFamily:"'Nunito',sans-serif"}}>
          <span aria-hidden="true" style={{fontSize:29}}>{t.icon}</span>
          <strong style={{display:"block",fontSize:14,marginTop:7}}>{t.title}</strong>
          <span style={{display:"block",fontSize:11,color:"#526773",marginTop:5}}>{t.hint}</span>
          <span style={{display:"block",fontSize:10,fontWeight:900,marginTop:12}}>HEAR KAI'S NOTE ↗</span>
        </button>)}
      </div>
      {response&&<button type="button" onClick={()=>setResponse("I'm glad we got a little moment together. Take it at your own pace. ♡")} style={{background:"#FFD166",border:"2px solid "+INK,borderRadius:12,padding:"10px 14px",fontWeight:900,color:INK,cursor:"pointer",marginBottom:16}}>♡ Thanks, Kai</button>}
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <button type="button" onClick={()=>{setSelected(care.topics);setRhythm(care.rhythm);setEditing(true);setResponse(null);}} style={{border:"2px solid "+INK,borderRadius:12,background:"white",padding:"10px 13px",fontWeight:900,color:INK,cursor:"pointer"}}>Edit preferences</button>
        <button type="button" onClick={stop} style={{border:"2px solid #b7a9a9",borderRadius:12,background:"transparent",padding:"10px 13px",fontWeight:900,color:"#675e5e",cursor:"pointer"}}>Turn off & clear Care Mode</button>
      </div>
    </>}
    <p style={{margin:"23px 0 0",fontSize:11,lineHeight:1.65,color:"#526773"}}>♡ Privacy: Only your selected everyday care topics, preferred check-in time, and dismissal/snooze state are saved in this browser's local storage, not sent to an account or server by this feature. You can clear them at any time. Shared devices and browser backups may expose locally stored preferences. Birthday and menstrual-cycle information are not collected in this version. This is friendly encouragement, not medical guidance.</p>
  </section>;
}

import {CARE_COLORS} from "./careTheme.js";
import React,{useState} from "react";
const KEY="pocket-date-milestones-v1";
const INK=CARE_COLORS.ink;
const valid=(s)=>{if(!/^\d{2}-\d{2}$/.test(s||""))return false;const [m,d]=s.split("-").map(Number);return m>=1&&m<=12&&d>=1&&d<=new Date(2024,m,0).getDate();};
const read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||"{}");return {birthday:valid(v.birthday)?v.birthday:"",special:valid(v.special)?v.special:"",label:typeof v.label==="string"?v.label.slice(0,36):""};}catch{return {birthday:"",special:"",label:""};}};
const format=(date)=>{if(!valid(date))return "";const [m,d]=date.split("-").map(Number);return new Date(2024,m-1,d).toLocaleDateString(undefined,{month:"long",day:"numeric"});};
const today=()=>{const d=new Date();return String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
const btn={border:"2px solid "+INK,borderRadius:11,padding:"9px 13px",background:"white",fontWeight:900,color:INK,cursor:"pointer",fontFamily:"'Nunito',sans-serif"};
export default function Milestones(){
 const [dates,setDates]=useState(read);
 const [birthday,setBirthday]=useState(dates.birthday);
 const [special,setSpecial]=useState(dates.special);
 const [label,setLabel]=useState(dates.label);
 const [editing,setEditing]=useState(false);
 const [message,setMessage]=useState("");
 const save=(next)=>{setDates(next);try{if(next.birthday||next.special)localStorage.setItem(KEY,JSON.stringify(next));else localStorage.removeItem(KEY);}catch{/* unavailable storage */}};
 const update=()=>{if((birthday&&!valid(birthday))||(special&&!valid(special)))return;save({birthday,special,label:special?(label.trim().slice(0,36)||"Our special day"):""});setEditing(false);setMessage("");};
 const clear=(field)=>{const next={...dates,[field]:""};if(field==="special")next.label="";save(next);if(field==="birthday")setBirthday("");else{setSpecial("");setLabel("");}setMessage("");};
 const celebration=dates.birthday===today()?"birthday":dates.special===today()?"special":null;
 return <section aria-label="Special Days" style={{marginTop:0,background:"transparent",border:0,borderRadius:0,padding:"0 4px 4px",boxShadow:"none"}}>
  <div style={{display:"inline-block",background:CARE_COLORS.rose,border:"2px solid "+INK,borderRadius:8,padding:"4px 9px",fontSize:10,fontWeight:900,letterSpacing:1}}>🎂 SPECIAL DAYS</div>
  <h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:20,margin:"12px 0 6px",color:INK}}>Dates worth remembering ♡</h3>
  <p style={{fontSize:12,lineHeight:1.6,color:CARE_COLORS.muted,margin:"0 0 13px"}}>Only if you want to share. Kai remembers the month and day, never your birth year.</p>
  {celebration&&<div style={{background:CARE_COLORS.paper,border:"2px solid "+INK,borderRadius:12,padding:13,marginBottom:13}}>
    <strong style={{fontSize:12,color:INK}}>✦ TODAY IS SPECIAL ✦</strong>
    <p style={{fontSize:15,fontWeight:900,lineHeight:1.5,color:INK,margin:"7px 0"}}>{celebration==="birthday"?"Happy birthday! I saved the biggest smile just for you. Let's make today yours. ♡":"I remembered! "+(dates.label||"Our special day")+" is today. I'm really glad we have this to celebrate together. ♡"}</p>
  </div>}
  {message&&<p role="status" style={{background:CARE_COLORS.paper,borderRadius:10,padding:11,fontWeight:800,fontSize:12,color:INK}}>{message}</p>}
  {!editing?<div style={{display:"grid",gap:10}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
      <span style={{fontSize:13,color:INK,fontWeight:800}}>🎂 Birthday: {dates.birthday?format(dates.birthday):"Not shared"}</span>
      {dates.birthday&&<button type="button" onClick={()=>clear("birthday")} style={btn}>Delete</button>}
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
      <span style={{fontSize:13,color:INK,fontWeight:800}}>💌 {dates.special?(dates.label+": "+format(dates.special)):"Personal date: Not shared"}</span>
      {dates.special&&<button type="button" onClick={()=>clear("special")} style={btn}>Delete</button>}
    </div>
    <button type="button" onClick={()=>{setBirthday(dates.birthday);setSpecial(dates.special);setLabel(dates.label);setEditing(true);}} style={{...btn,background:CARE_COLORS.gold,marginTop:5}}>♡ {dates.birthday||dates.special?"Edit special days":"Add a special day"}</button>
  </div>:<div style={{display:"grid",gap:13}}>
    <label style={{fontSize:12,fontWeight:900,color:INK}}>Your birthday (optional)
      <input type="text" inputMode="numeric" placeholder="MM-DD" maxLength={5} value={birthday} onChange={e=>setBirthday(e.target.value)} aria-describedby="milestone-format" style={{display:"block",marginTop:5,width:"100%",border:"2px solid "+INK,borderRadius:10,padding:11,fontSize:15,color:INK}}/>
    </label>
    <label style={{fontSize:12,fontWeight:900,color:INK}}>Personal date (optional)
      <input type="text" inputMode="numeric" placeholder="MM-DD" maxLength={5} value={special} onChange={e=>setSpecial(e.target.value)} aria-describedby="milestone-format" style={{display:"block",marginTop:5,width:"100%",border:"2px solid "+INK,borderRadius:10,padding:11,fontSize:15,color:INK}}/>
    </label>
    <label style={{fontSize:12,fontWeight:900,color:INK}}>What should Kai call it?
      <input type="text" maxLength={36} placeholder="Our first date" value={label} onChange={e=>setLabel(e.target.value)} disabled={!special} style={{display:"block",marginTop:5,width:"100%",border:"2px solid "+INK,borderRadius:10,padding:11,fontSize:14,color:INK}}/>
    </label>
    <span id="milestone-format" style={{fontSize:11,color:CARE_COLORS.muted}}>Use MM-DD (for example 04-21). No year or account required.</span>
    {((birthday&&!valid(birthday))||(special&&!valid(special)))&&<span role="alert" style={{fontSize:12,color:CARE_COLORS.ink,fontWeight:800}}>Enter a valid MM-DD date or leave the field empty.</span>}
    <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
      <button type="button" disabled={(birthday&&!valid(birthday))||(special&&!valid(special))} onClick={update} style={{...btn,background:CARE_COLORS.gold,opacity:((birthday&&!valid(birthday))||(special&&!valid(special)))?0.5:1}}>Save dates ♡</button>
      <button type="button" onClick={()=>setEditing(false)} style={btn}>Cancel</button>
    </div>
  </div>}
  <p style={{fontSize:11,lineHeight:1.55,color:CARE_COLORS.muted,margin:"16px 0 0"}}>These dates stay in this browser's local storage and can be deleted separately. Shared devices and browser backups may expose them. No notifications are sent. Birthday reactions appear only when you visit this page.</p>
 </section>;
}

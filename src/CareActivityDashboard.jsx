import React,{useState} from "react";
import {CARE_COLORS as C} from "./careTheme.js";

export const ACTIVITY_KEY="pocket-date-care-activity-v1";
const MAX_RECORDS=180;
export function readActivity(){try{const value=JSON.parse(localStorage.getItem(ACTIVITY_KEY)||"[]");return Array.isArray(value)?value.filter(v=>v&&["breathe","unwind","ground"].includes(v.type)&&Number.isFinite(v.duration)&&v.duration>0&&Number.isFinite(v.at)).slice(-MAX_RECORDS):[];}catch{return [];}}
export function recordActivity(type,duration){if(!["breathe","unwind","ground"].includes(type)||!Number.isFinite(duration)||duration<=0)return readActivity();const next=[...readActivity(),{type,duration,at:Date.now()}].slice(-MAX_RECORDS);try{localStorage.setItem(ACTIVITY_KEY,JSON.stringify(next));}catch{/* Activity history is optional. */}return next;}
const localDay=date=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");
const dayName=date=>date.toLocaleDateString(undefined,{weekday:"short"});
export default function CareActivityDashboard({entries=[],onClear}){
 const [selected,setSelected]=useState(null);
 const now=new Date(),days=Array.from({length:7},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-6+i);const key=localDay(d);const items=entries.filter(e=>localDay(new Date(e.at))===key);return {key,label:dayName(d),count:items.length,seconds:items.reduce((a,e)=>a+e.duration,0)};});
 const today=days[6],week=days.reduce((a,d)=>a+d.count,0),minutes=Math.round(days.reduce((a,d)=>a+d.seconds,0)/60),max=Math.max(1,...days.map(d=>d.count));
 const chosen=days.find(d=>d.key===selected);
 return <section className="pd-care-dashboard" aria-label="Your Care activity" style={{color:C.ink}}>
  <div className="pd-care-section-heading"><div><span className="pd-care-eyebrow">YOUR CARE SNAPSHOT</span><h3>Little moments add up</h3></div><span aria-hidden="true">✦</span></div>
  <div className="pd-care-stats">
   <div><strong>{today.count}</strong><span>sessions today</span></div>
   <div><strong>{week}</strong><span>this week</span></div>
   <div><strong>{minutes}</strong><span>minutes this week</span></div>
  </div>
  <div className="pd-care-trend">
   <div className="pd-care-trend-head"><strong>Past 7 days</strong><span>Completed sessions</span></div>
   <div className="pd-care-bars" role="group" aria-label="Select a day to see completed sessions">
    {days.map(d=><button type="button" key={d.key} className="pd-care-day" aria-pressed={selected===d.key} aria-label={d.label+", "+d.count+" completed sessions"} onClick={()=>setSelected(d.key===selected?null:d.key)}>
     <span className="pd-care-bar-track"><span className="pd-care-bar-fill" style={{height:(d.count?Math.max(12,100*d.count/max):0)+"%"}}/></span>
     <span>{d.label}</span>
    </button>)}
   </div>
   <p aria-live="polite" className="pd-care-trend-note">{chosen?chosen.label+": "+chosen.count+" session"+(chosen.count===1?"":"s")+" · "+Math.round(chosen.seconds/60)+" min":week?"Tap a day to explore your activity.":"No sessions yet. Your first moment will appear here."}</p>
  </div>
  <div className="pd-care-history-footer"><span>Only completed in-app exercises are counted. No health metrics or streaks.</span>{entries.length>0&&<button type="button" onClick={onClear}>Clear history</button>}</div>
 </section>;
}

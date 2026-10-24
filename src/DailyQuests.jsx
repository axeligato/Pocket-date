import React,{useEffect,useState} from "react";
import {DAILY_QUESTS,localQuestDay,readQuests,claimQuest} from "./dailyQuests.js";
export default function DailyQuests({onEarnXp}){
const [day,setDay]=useState(localQuestDay);
const [completed,setCompleted]=useState(()=>readQuests().completed);
const [reaction,setReaction]=useState("");
const [recentSticker,setRecentSticker]=useState(null);
const [pendingRecap,setPendingRecap]=useState(null);
const dismissReaction=()=>{setReaction("");setPendingRecap(null);setRecentSticker(null);};
useEffect(()=>{if(!reaction)return;const onKeyDown=e=>{if(e.key==="Escape")dismissReaction();};window.addEventListener("keydown",onKeyDown);return()=>window.removeEventListener("keydown",onKeyDown);},[reaction]);
const [saveError,setSaveError]=useState(false);
useEffect(()=>{const sync=()=>{const today=localQuestDay();const latest=readQuests(today).completed;if(today!==day){setDay(today);setReaction("");setRecentSticker(null);setPendingRecap(null);setSaveError(false);}setCompleted(latest);};const timer=setInterval(sync,60000);window.addEventListener("focus",sync);window.addEventListener("storage",sync);return()=>{clearInterval(timer);window.removeEventListener("focus",sync);window.removeEventListener("storage",sync);};},[day]);
function finish(id){const today=localQuestDay();if(today!==day){setDay(today);setCompleted(readQuests(today).completed);setReaction("");setRecentSticker(null);setPendingRecap(null);return;}const result=claimQuest(id,today);if(!result.claimed){setSaveError(true);return;}setSaveError(false);setCompleted(result.completed);setReaction(result.quest.reaction);setRecentSticker(result.quest);setPendingRecap(result.quest.id);onEarnXp?.(result.quest.xp);}
const recapCompleted=completed.filter(id=>id!==pendingRecap);
const earned=DAILY_QUESTS.reduce((sum,q)=>sum+(completed.includes(q.id)?q.xp:0),0);
return <section className="pd-daily-quests" aria-labelledby="pd-daily-heading">
<div className="pd-daily-heading"><div><span className="pd-daily-eyebrow">DAILY ACTIVITIES</span><h2 id="pd-daily-heading">Daily activities</h2></div><span className="pd-daily-xp" aria-label={earned+" experience points earned today"}>✦ {earned} XP</span></div>
<p className="pd-daily-intro">Choose what feels useful today. Every activity is optional.</p>
<div className="pd-daily-list" role="group" aria-label="Optional daily activities">
{DAILY_QUESTS.map(q=>{const done=completed.includes(q.id);return <button key={q.id} type="button" className="pd-daily-quest" aria-pressed={done} disabled={done} aria-label={q.title+(done?", completed":", earn "+q.xp+" XP")} onClick={()=>finish(q.id)}><span className="pd-daily-emoji" aria-hidden="true">{q.emoji}</span><span className="pd-daily-copy"><strong>{q.title}</strong><small>{q.hint}</small></span><span className="pd-daily-reward">{done?<span className="pd-daily-done"><span aria-hidden="true">✦</span> Done</span>:"+"+q.xp+" XP"}</span></button>;})}
</div>
{saveError&&<p className="pd-daily-error" role="alert">This activity couldn’t be saved on this device. Please check browser storage and try again.</p>}
{reaction&&<div className="pd-daily-reaction-overlay" role="presentation">
  <div className="pd-daily-reaction-dialog" role="dialog" aria-modal="true" aria-labelledby="pd-daily-reaction-title" aria-describedby="pd-daily-reaction-message">
    <div className="pd-daily-reaction-illustration" aria-hidden="true">{recentSticker?.emoji||"✦"}</div>
    <span className="pd-daily-reaction-eyebrow">Activity completed</span>
    <h3 id="pd-daily-reaction-title">A note from Kai</h3>
    <p id="pd-daily-reaction-message">{reaction}</p>
    <span className="pd-daily-reaction-reward">+{recentSticker?.xp||0} XP</span>
    <button type="button" className="pd-daily-reaction-dismiss" onClick={dismissReaction} autoFocus>Continue to today's recap</button>
  </div>
</div>}
<div className="pd-daily-scrapbook" aria-label="Completed activities today"><span className="pd-daily-scrapbook-title">Today's activities</span><div className="pd-daily-stickers">{recapCompleted.length?DAILY_QUESTS.filter(q=>recapCompleted.includes(q.id)).map(q=><span key={q.id} className="pd-daily-sticker-mini" title={q.title} aria-label={q.title}>{q.emoji}</span>):<span className="pd-daily-scrapbook-empty">Nothing completed yet — that's fine.</span>}</div></div><p className="pd-daily-footer">No streaks or deadlines. Choose what works for you.</p>
</section>;
}

import React,{useEffect,useState} from "react";
import {DAILY_QUESTS,localQuestDay,readQuests,claimQuest} from "./dailyQuests.js";
export default function DailyQuests({onEarnXp}){
const [day,setDay]=useState(localQuestDay);
const [completed,setCompleted]=useState(()=>readQuests().completed);
const [reaction,setReaction]=useState("");
useEffect(()=>{const sync=()=>{const today=localQuestDay();if(today!==day){setDay(today);setCompleted(readQuests(today).completed);setReaction("");}};const timer=setInterval(sync,60000);window.addEventListener("focus",sync);return()=>{clearInterval(timer);window.removeEventListener("focus",sync);};},[day]);
function finish(id){const result=claimQuest(id,day);if(!result.claimed)return;setCompleted(result.completed);setReaction(result.quest.reaction);onEarnXp?.(result.quest.xp);}
const earned=DAILY_QUESTS.reduce((sum,q)=>sum+(completed.includes(q.id)?q.xp:0),0);
return <section className="pd-daily-quests" aria-labelledby="pd-daily-heading">
<div className="pd-daily-heading"><div><span className="pd-daily-eyebrow">YOUR DAY TOGETHER</span><h2 id="pd-daily-heading">Little things ♡</h2></div><span className="pd-daily-xp">+{earned} XP today</span></div>
<p className="pd-daily-intro">Little things count. Try any that feel right — no streaks, no deadlines, no pressure.</p>
<div className="pd-daily-list">
{DAILY_QUESTS.map(q=>{const done=completed.includes(q.id);return <button key={q.id} type="button" className="pd-daily-quest" aria-pressed={done} disabled={done} onClick={()=>finish(q.id)}><span className="pd-daily-emoji" aria-hidden="true">{q.emoji}</span><span className="pd-daily-copy"><strong>{q.title}</strong><small>{q.hint}</small></span><span className="pd-daily-reward">{done?"✓ Together":"+"+q.xp+" XP"}</span></button>;})}
</div>
{reaction&&<div className="pd-daily-reaction" role="status"><strong>Kai ♡</strong><p>{reaction}</p></div>}
<p className="pd-daily-footer">{completed.length} of {DAILY_QUESTS.length} shared moments today. Everything resets gently tomorrow.</p>
</section>;
}

import React,{useEffect,useState} from "react";
import {DAILY_QUESTS,localQuestDay,readQuests,claimQuest} from "./dailyQuests.js";
export default function DailyQuests({onEarnXp}){
const [day,setDay]=useState(localQuestDay);
const [completed,setCompleted]=useState(()=>readQuests().completed);
const [reaction,setReaction]=useState("");
const [recentSticker,setRecentSticker]=useState(null);
useEffect(()=>{const sync=()=>{const today=localQuestDay();if(today!==day){setDay(today);setCompleted(readQuests(today).completed);setReaction("");setRecentSticker(null);}};const timer=setInterval(sync,60000);window.addEventListener("focus",sync);return()=>{clearInterval(timer);window.removeEventListener("focus",sync);};},[day]);
function finish(id){const result=claimQuest(id,day);if(!result.claimed)return;setCompleted(result.completed);setReaction(result.quest.reaction);setRecentSticker(result.quest);onEarnXp?.(result.quest.xp);}
const earned=DAILY_QUESTS.reduce((sum,q)=>sum+(completed.includes(q.id)?q.xp:0),0);
return <section className="pd-daily-quests" aria-labelledby="pd-daily-heading">
<div className="pd-daily-heading"><div><span className="pd-daily-eyebrow">YOUR DAY TOGETHER</span><h2 id="pd-daily-heading">Little things ♡</h2></div><span className="pd-daily-xp" aria-label={earned+" experience points earned today"}>✦ {earned} XP</span></div>
<p className="pd-daily-intro">Pick a little moment for yourself. I’ll be cheering you on. — Kai</p>
<div className="pd-daily-list" aria-label="Optional little things">
{DAILY_QUESTS.map(q=>{const done=completed.includes(q.id);return <button key={q.id} type="button" className="pd-daily-quest" aria-pressed={done} disabled={done} onClick={()=>finish(q.id)}><span className="pd-daily-emoji" aria-hidden="true">{q.emoji}</span><span className="pd-daily-copy"><strong>{q.title}</strong><small>{q.hint}</small></span><span className="pd-daily-reward">{done?<span className="pd-daily-done"><span aria-hidden="true">✦</span> Together</span>:"+"+q.xp+" XP"}</span></button>;})}
</div>
{reaction&&<div className="pd-daily-reaction" role="status"><div className="pd-daily-sticker" aria-hidden="true">{recentSticker?.emoji||"♡"}<span>✦</span></div><div><strong>A little moment together · Kai ♡</strong><p>{reaction}</p><small>+{recentSticker?.xp||0} XP · Added to today’s moments</small></div></div>}
<div className="pd-daily-scrapbook" aria-label="Today’s shared moments"><span className="pd-daily-scrapbook-title">Our little scrapbook</span><div className="pd-daily-stickers">{completed.length?DAILY_QUESTS.filter(q=>completed.includes(q.id)).map(q=><span key={q.id} className="pd-daily-sticker-mini" title={q.title} aria-label={q.title}>{q.emoji}</span>):<span className="pd-daily-scrapbook-empty">A blank page is okay, too. ♡</span>}</div></div><p className="pd-daily-footer">No streaks, no catching up. Just today, at your pace.</p>
</section>;
}

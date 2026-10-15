import React,{useState} from "react";
import {CARE_COLORS} from "./careTheme.js";

const MOVES=[
  {id:"rock",icon:"✊",label:"Rock",beats:"scissors"},
  {id:"paper",icon:"✋",label:"Paper",beats:"rock"},
  {id:"scissors",icon:"✌️",label:"Scissors",beats:"paper"}
];
const REACTIONS={
  win:["Okay, that was impressive. Rematch?","You're getting suspiciously good at this.","I lost fair and square. Don't look so smug!"],
  lose:["Yes! ...Sorry, I got a little excited.","Don't worry, I'll teach you my secret technique. It's luck.","You almost had me! One more?"],
  tie:["We're thinking the same thing again.","Great minds, huh?","That's actually kind of cute."]
};
const KEY="pocket-date-rps-v1";
function today(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");}
function readClaim(){try{const data=JSON.parse(localStorage.getItem(KEY)||"null");return data?.day===today()?data.day:null;}catch{return null;}}
export default function KaiMiniGame({onReward}){
 const [player,setPlayer]=useState(null);
 const [kai,setKai]=useState(null);
 const [result,setResult]=useState(null);
 const [round,setRound]=useState(0);
 const [wins,setWins]=useState(0);
 const [claimed,setClaimed]=useState(readClaim);
 const [dialogue,setDialogue]=useState("Best of luck! Or should I say, best of three? ♡");
 const eligible=claimed!==today();
 const play=(move)=>{
   const opponent=MOVES[Math.floor(Math.random()*MOVES.length)];
   const outcome=move.id===opponent.id?"tie":move.beats===opponent.id?"win":"lose";
   const nextRound=round+1;
   const nextWins=wins+(outcome==="win"?1:0);
   setPlayer(move);setKai(opponent);setResult(outcome);setRound(nextRound);setWins(nextWins);
   const options=REACTIONS[outcome];
   setDialogue(options[(nextRound-1)%options.length]);
   // First completed round each local calendar day awards a small, optional bonus.
   if(eligible){
     setClaimed(today());
     try{localStorage.setItem(KEY,JSON.stringify({day:today()}));}catch{/* unavailable storage */}
     onReward?.(3);
   }
 };
 const reset=()=>{setPlayer(null);setKai(null);setResult(null);};
 const btn={border:"2px solid "+CARE_COLORS.ink,borderRadius:13,background:CARE_COLORS.paper,color:CARE_COLORS.ink,fontWeight:900,padding:"12px 9px",cursor:"pointer",minHeight:60};
 return <section aria-label="Rock paper scissors with Kai" style={{marginTop:22,padding:16,border:"3px solid "+CARE_COLORS.ink,borderRadius:19,background:CARE_COLORS.surface,boxShadow:"4px 5px 0 "+CARE_COLORS.ink}}>
   <div style={{display:"inline-block",background:CARE_COLORS.rose,border:"2px solid "+CARE_COLORS.ink,borderRadius:8,padding:"4px 9px",fontSize:10,fontWeight:900,letterSpacing:1}}>✦ JUST FOR FUN</div>
   <h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:22,margin:"12px 0 6px",color:CARE_COLORS.ink}}>Rock, Paper, Kai! ✊</h3>
   <p style={{fontSize:13,lineHeight:1.6,color:CARE_COLORS.muted,margin:"0 0 12px"}}>A quick game together. No cost, no penalties, and unlimited rematches.</p>
   <div aria-live="polite" style={{padding:13,border:"2px solid "+CARE_COLORS.ink,borderRadius:12,background:CARE_COLORS.paper,marginBottom:12}}>
     <div style={{fontWeight:900,fontSize:11,color:CARE_COLORS.muted,marginBottom:5}}>💌 KAI</div>
     <p style={{fontSize:15,fontWeight:800,color:CARE_COLORS.ink,lineHeight:1.5,margin:0}}>{dialogue}</p>
   </div>
   {result&&<div role="status" style={{textAlign:"center",padding:"8px 0 14px",color:CARE_COLORS.ink}}>
     <div style={{fontSize:32}}>{player.icon} <span style={{fontSize:16}}>vs</span> {kai.icon}</div>
     <strong style={{fontSize:14}}>{result==="win"?"You win! ♡":result==="lose"?"Kai wins this round!":"It's a tie!"}</strong>
   </div>}
   {!result?<div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:8}}>
     {MOVES.map(m=><button key={m.id} type="button" onClick={()=>play(m)} style={btn}><span aria-hidden="true" style={{display:"block",fontSize:27}}>{m.icon}</span>{m.label}</button>)}
   </div>:<button type="button" onClick={reset} style={{...btn,width:"100%",background:CARE_COLORS.rose}}>Play again ♡</button>}
   <div style={{display:"flex",justifyContent:"space-between",gap:8,marginTop:12,fontSize:11,color:CARE_COLORS.muted,fontWeight:800,flexWrap:"wrap"}}>
     <span>Rounds {round} · Wins {wins}</span>
     <span>{eligible?"+3 flowers for your first round today":"Today's +3 flowers collected ♡"}</span>
   </div>
 </section>;
}

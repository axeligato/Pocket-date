import React,{useEffect,useRef,useState} from "react";
import {CARE_COLORS} from "./careTheme.js";
import {rpsResult,isDailyBonusEligible} from "./gameRules.js";

const MOVES=[
  {id:"rock",icon:"✊",label:"Rock",beats:"scissors"},
  {id:"paper",icon:"✋",label:"Paper",beats:"rock"},
  {id:"scissors",icon:"✌️",label:"Scissors",beats:"paper"}
];
const REACTIONS={
  win:["Okay, that was impressive!","You're getting suspiciously good at this.","You won fair and square!"],
  lose:["Yes, I got a little excited!","My secret technique is pure luck.","You almost had me!"],
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
 const [dialogue,setDialogue]=useState("Bet you can't beat me at rock, paper, scissors! ♡");
 const [popup,setPopup]=useState(null);
 const [started,setStarted]=useState(false);
 const dialogRef=useRef(null);
 useEffect(()=>{if(popup&&!dialogRef.current.open)dialogRef.current.showModal();},[popup]);
 const closePopup=()=>{dialogRef.current.close();setPopup(null);};
 const eligible=isDailyBonusEligible(claimed,today());
 const play=(move)=>{
   const opponent=MOVES[Math.floor(Math.random()*MOVES.length)];
   const outcome=rpsResult(move.id,opponent.id);
   const nextRound=round+1;
   const nextWins=wins+(outcome==="win"?1:0);
   setPlayer(move);setKai(opponent);setResult(outcome);setRound(nextRound);setWins(nextWins);
   const options=REACTIONS[outcome];
   setDialogue(options[(nextRound-1)%options.length]);
   setPopup("after");
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
   <h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:22,margin:"0 0 12px",color:CARE_COLORS.ink}}>Rock, paper, scissors ✊</h3>
   <dialog ref={dialogRef} className="pd-rps-dialog" aria-label={popup==="after"?"Round result":"A challenge from Kai"} onCancel={()=>setPopup(null)} onClose={()=>setPopup(null)}>
     {popup==="after"&&<div style={{textAlign:"center",marginBottom:12}}><div style={{fontSize:32}} aria-label={`You chose ${player?.label}; Kai chose ${kai?.label}`}>{player?.icon} · {kai?.icon}</div><strong>{result==="win"?"You win!":result==="lose"?"Kai wins!":"It's a tie!"}</strong></div>}
     <p>{dialogue}</p>
     <button type="button" autoFocus onClick={()=>{if(popup==="before")setStarted(true);closePopup();}} style={{...btn,width:"100%"}}>{popup==="before"?"Let's play":"Done"}</button>
   </dialog>
   {!started?<button type="button" onClick={()=>setPopup("before")} style={{...btn,width:"100%"}}>Play</button>:!result?<div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:8}}>
     {MOVES.map(m=><button key={m.id} type="button" onClick={()=>play(m)} style={btn}><span aria-hidden="true" style={{display:"block",fontSize:27}}>{m.icon}</span>{m.label}</button>)}
   </div>:<button type="button" onClick={reset} style={{...btn,width:"100%",background:CARE_COLORS.rose}}>Play again ♡</button>}
   <div style={{display:"flex",justifyContent:"space-between",gap:8,marginTop:12,fontSize:11,color:CARE_COLORS.muted,fontWeight:800,flexWrap:"wrap"}}>
     <span>Rounds {round} · Wins {wins}</span>
     <span>{eligible?"+3 flowers for your first round today":"Today's +3 flowers collected ♡"}</span>
   </div>
 </section>;
}

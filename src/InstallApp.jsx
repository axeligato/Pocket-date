import React,{useEffect,useState} from "react";
import {CARE_COLORS} from "./careTheme.js";
export default function InstallApp(){
 const [deferred,setDeferred]=useState(null);
 const [installed,setInstalled]=useState(false);
 const [help,setHelp]=useState(false);
 useEffect(()=>{
  const check=()=>setInstalled(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true);
  check();
  const onPrompt=e=>{e.preventDefault();setDeferred(e);};
  const onInstalled=()=>{setInstalled(true);setDeferred(null);};
  window.addEventListener("beforeinstallprompt",onPrompt);
  window.addEventListener("appinstalled",onInstalled);
  return ()=>{window.removeEventListener("beforeinstallprompt",onPrompt);window.removeEventListener("appinstalled",onInstalled);};
 },[]);
 const install=async()=>{
  if(deferred){const event=deferred;setDeferred(null);await event.prompt();await event.userChoice;return;}
  setHelp(true);
 };
 return <section aria-label="Install Pocket Date" style={{margin:"20px 0",padding:"18px",background:CARE_COLORS.paper,borderRadius:20}}>
  <h3 style={{margin:"0 0 6px",fontSize:19}}>📱 Keep Pocket Date close</h3>
  <p style={{fontSize:13,lineHeight:1.6,color:CARE_COLORS.muted,margin:"0 0 12px"}}>Add Pocket Date to your home screen for quick access.</p>
  {installed?<p role="status" style={{fontSize:13,fontWeight:800}}>✓ Pocket Date is already open as an installed app.</p>:<>
   <button type="button" onClick={install} style={{border:"none",borderRadius:999,background:CARE_COLORS.rose,color:CARE_COLORS.ink,padding:"12px 17px",fontWeight:900,cursor:"pointer"}}>＋ Add to Home Screen</button>
   {help&&<div style={{fontSize:13,lineHeight:1.7,marginTop:13}}>
    <p style={{margin:"0 0 7px"}}><strong>iPhone / iPad:</strong> Open this page in Safari, tap Share, then choose <strong>Add to Home Screen</strong> (or Open as Web App if shown).</p>
    <p style={{margin:0}}><strong>Android / desktop:</strong> Open the browser menu and select <strong>Install app</strong> or <strong>Add to Home screen</strong>. The option depends on your browser.</p>
   </div>}
  </>}
 </section>;
}

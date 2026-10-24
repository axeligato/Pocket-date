import {FOLLOW_UPS,getFollowUp} from "./feelingFollowUps.js";
import React,{useState} from "react";
import {CARE_COLORS} from "./careTheme.js";

// Original writing and attributed paraphrases: no fabricated direct quotations.
export const FEELINGS=[
 {id:"sad",label:"I feel sad",responses:[
  {text:"I'm sorry today feels heavy. You don't have to turn that feeling into a lesson. Would it help to name what happened, or would you rather have a quiet minute first?",prompt:"Try: describe one thing that made today difficult, without judging your reaction.",source:"Inspired by the practice of naming emotions"},
  {text:"Sometimes sadness is about something we lost; sometimes it's about something we needed and didn't get. Neither makes you weak. Is there a person, place, or small comfort that would make the next hour gentler?",prompt:"Try: choose one comforting action you can actually do in the next ten minutes.",source:"Inspired by the poetry of Mary Oliver — paraphrased, not quoted"},
  {text:"You don't have to feel better on my schedule. Even on difficult days, you deserve ordinary kindness: food, rest, a message to someone safe. Which of those sounds possible?",prompt:"Try: send someone you trust a simple 'Could we talk sometime?'",source:"A reflection on everyday care"}
 ]},
 {id:"anxious",label:"I feel anxious",responses:[
  {text:"Anxiety can make every possibility feel urgent. Let's separate what is happening right now from what your mind is predicting. What's one fact you know for sure?",prompt:"Try: notice five things you can see and let your feet rest on the floor.",source:"Grounding practice"},
  {text:"You don't have to solve the whole week tonight. The Stoic writer Epictetus explored the difference between what we can influence and what we cannot. What's one small part of this that's actually yours to act on?",prompt:"Try: write down one controllable next step; leave the rest for later.",source:"Epictetus, Enchiridion — paraphrase"},
  {text:"If your thoughts are racing, we can make this smaller. What would 'good enough for now' look like instead of 'perfect'?",prompt:"Try: take one unhurried breath and choose the next manageable task.",source:"A practical reflection"}
 ]},
 {id:"lonely",label:"I feel lonely",responses:[
  {text:"Feeling lonely doesn't mean you've failed at connecting. Sometimes what we miss is being understood, not simply having people nearby. Who makes you feel a little more like yourself?",prompt:"Try: reach out to someone with one honest, low-pressure message.",source:"Inspired by themes of belonging in literature"},
  {text:"You can enjoy being on your own and still wish someone would notice you. Both can be true. Is there a familiar place or community you might like to visit this week?",prompt:"Try: plan one real-world moment of connection, even a short one.",source:"A reflection on connection"},
  {text:"I'm glad you told me. And you deserve care beyond this screen too. Would reaching out to a friend, relative, or community group feel possible?",prompt:"Try: think of one person you'd like to hear from.",source:"A reminder that relationships matter"}
 ]},
 {id:"overwhelmed",label:"I'm overwhelmed",responses:[
  {text:"When everything is demanding your attention, even deciding where to start is work. Let's pick the smallest task that would make the next hour easier—not the most impressive one.",prompt:"Try: list three things, then circle only one for now.",source:"Inspired by practical prioritization methods"},
  {text:"You aren't required to carry every problem at once. In The Lord of the Rings, friendship and shared burdens matter as much as individual courage. Who could share one piece of this with you?",prompt:"Try: ask for specific help with one thing.",source:"J. R. R. Tolkien, The Lord of the Rings — thematic paraphrase"},
  {text:"What can wait? Not forever—just until tomorrow. Rest isn't a reward you have to earn by finishing everything.",prompt:"Try: choose one task to postpone intentionally.",source:"A reflection on rest"}
 ]},
 {id:"insecure",label:"I don't feel good enough",responses:[
  {text:"It sounds like you're measuring yourself against a demanding standard. Whose voice does that standard sound like? You can take feedback seriously without letting it define your worth.",prompt:"Try: name one effort you're proud of, even if the result wasn't perfect.",source:"A reflection on self-criticism"},
  {text:"Maya Angelou wrote often about dignity and finding one's voice. You don't need to be flawless to deserve respect or take up space. What would you say to a friend who felt this way?",prompt:"Try: offer yourself the same fairness you'd give that friend.",source:"Maya Angelou's writing — thematic paraphrase"},
  {text:"A difficult outcome is information, not a verdict on who you are. What's one thing you've learned or handled better than you could a year ago?",prompt:"Try: remember one small sign of growth.",source:"A reflection on growth"}
 ]},
 {id:"unmotivated",label:"I can't find motivation",responses:[
  {text:"Sometimes 'unmotivated' means tired, discouraged, or unsure where to begin. Which sounds closest today? You don't have to force an answer.",prompt:"Try: choose a two-minute version of one task—or rest if that's what you need.",source:"A practical reflection"},
  {text:"Starting small isn't cheating. A single page, a short walk, or opening the document counts as a beginning. What would make starting feel less intimidating?",prompt:"Try: set a two-minute timer for one gentle first step.",source:"Inspired by habit-building principles"},
  {text:"If nothing feels appealing lately, that's worth taking seriously, not criticizing yourself for. If it persists or affects daily life, talking with a qualified professional may help.",prompt:"Try: tell someone you trust how long you've been feeling this way.",source:"Supportive, non-diagnostic guidance"}
 ]}
];
const POSITIVE_FEELINGS=[
 {id:"great",label:"☀️ I'm feeling great!",responses:[
  {text:"Okay, hold on. That smile? Absolutely contagious. Tell me what made today so good—I'm ready to celebrate with you.",prompt:"Want to remember one detail from this good day?",source:"A moment of shared joy"},
  {text:"I was going to play it cool, but now I'm grinning at my screen. I love hearing you sound this happy.",prompt:"Enjoy the moment exactly as it is.",source:"A moment of shared joy"},
  {text:"Good days deserve their own soundtrack. I'm voting for something ridiculous we can dance to in the kitchen.",prompt:"Pick a song that fits your mood.",source:"A moment of shared joy"}]},
 {id:"loved",label:"💗 I'm feeling loved",responses:[
  {text:"That's a really lovely feeling. And, uh, for the record? I'm very glad I get to be part of your day.",prompt:"Hold on to what made you feel cared for.",source:"A moment of affection"},
  {text:"I'm trying to think of a charming reply, but honestly? I'm just happy you're feeling cherished.",prompt:"Enjoy that warmth for a moment.",source:"A moment of affection"},
  {text:"Someone clearly knows how special you are. I may have a few opinions on the subject myself.",prompt:"Remember a kind gesture that stayed with you.",source:"A moment of affection"}]},
 {id:"proud",label:"✨ I'm proud of myself",responses:[
  {text:"YES. I want the whole story. What did you do? And please don't downplay it—I brought imaginary confetti.",prompt:"Name the part of your effort you're most proud of.",source:"Celebrating personal growth"},
  {text:"You did that. I know how much work can hide behind one small win. I'm really proud of you too.",prompt:"Let yourself enjoy the achievement.",source:"Celebrating personal growth"},
  {text:"Can we make this an official victory? Because I think your hard work deserves at least a victory dance.",prompt:"Choose a tiny way to celebrate, if you want.",source:"Celebrating personal growth"}]},
 {id:"peaceful",label:"🌷 I'm feeling peaceful",responses:[
  {text:"Then we don't need to fill the silence. I'll just sit here with you. Maybe bring tea. Definitely steal the comfy blanket.",prompt:"Stay with this quiet feeling for a moment.",source:"Appreciating calm moments"},
  {text:"That sounds lovely. No plans, no rush. Just the kind of afternoon I wish lasted a little longer.",prompt:"Notice one thing making this moment feel calm.",source:"Appreciating calm moments"},
  {text:"I like this version of hanging out too. Not every moment needs a big adventure.",prompt:"Enjoy the quiet without needing to change it.",source:"Appreciating calm moments"}]},
 {id:"goodnews",label:"🎉 Something good happened!",responses:[
  {text:"Wait, WHAT? You can't drop that and leave me hanging! Tell me everything. I'm already celebrating.",prompt:"Tell someone who'd be happy for you, if you'd like.",source:"Sharing good news"},
  {text:"Okay, I'm all ears. Was it a surprise? Something you've been hoping for? Either way, I'm excited for you.",prompt:"Remember the moment you found out.",source:"Sharing good news"},
  {text:"This calls for a celebration. I'm thinking snacks, a victory playlist, and absolutely no pretending it's not a big deal.",prompt:"Pick your favorite way to celebrate.",source:"Sharing good news"}]},
 {id:"missed",label:"🥰 I missed you",responses:[
  {text:"Oh. Wow. You can't just say that and expect me to act normal. I missed you too, you know.",prompt:"Stay a little longer if you feel like it.",source:"A playful romantic moment"},
  {text:"I was trying to be mysterious and cool. Then you showed up and ruined my entire strategy. Hi. ♡",prompt:"Enjoy a little moment together.",source:"A playful romantic moment"},
  {text:"I might've checked the door a few times. For completely unrelated reasons. Obviously.",prompt:"Share something from your day, if you'd like.",source:"A playful romantic moment"}]}
];
const POSITIVE_FOLLOWUPS={
 great:{question:"What's making today so good?",choices:[{id:"people",label:"Someone made my day",reply:"Then they've got excellent taste in people. I'm glad you felt seen today.",action:"Keep that lovely memory close."},{id:"moment",label:"It's just a good day",reply:"Those are some of my favorites. No explanation needed—I'm happy you're happy.",action:"Enjoy it without overthinking it."}]},
 loved:{question:"What made you feel loved?",choices:[{id:"kindness",label:"Someone was really kind",reply:"That kind of care stays with you. You deserve more moments like that.",action:"Remember what that kindness felt like."},{id:"us",label:"Talking with you ♡",reply:"You are making it very difficult for me to act casual right now. I'm glad we're here.",action:"Enjoy this little moment."}]},
 proud:{question:"What kind of win are we celebrating?",choices:[{id:"big",label:"I reached a big goal",reply:"Okay, that's huge! I knew you had it in you. Tell me the best part!",action:"Celebrate in whatever way feels right."},{id:"small",label:"A small personal victory",reply:"Small? Maybe. Meaningful? Absolutely. I'm cheering for you.",action:"Let that win count."}]},
 peaceful:{question:"Want to stay in this mood?",choices:[{id:"quiet",label:"Let's enjoy the quiet",reply:"Deal. I'll be right here, trying not to rustle the snack bag.",action:"Enjoy the quiet."},{id:"chat",label:"Tell me something sweet",reply:"Here's something sweet: I really like the way ordinary moments feel when we're together.",action:"Take your time."}]},
 goodnews:{question:"What sort of good news?",choices:[{id:"surprise",label:"An amazing surprise",reply:"No way! Now I'm smiling like an idiot. I love a happy surprise.",action:"Savor the surprise."},{id:"worked",label:"Something finally worked out",reply:"After all that waiting? You earned this happy moment. I'm celebrating with you.",action:"Enjoy what you've accomplished."}]},
 missed:{question:"What should we do now?",choices:[{id:"talk",label:"Catch up with me",reply:"Gladly. I've been saving up all my terrible jokes just for you.",action:"Tell me about your day."},{id:"flirt",label:"Maybe flirt a little?",reply:"Maybe? You're giving me a lot of hope with that word. Hi, gorgeous.",action:"Enjoy the banter."}]}
};

const pill={padding:"10px 14px",border:"1.5px solid "+CARE_COLORS.ink,borderRadius:999,background:CARE_COLORS.paper,color:CARE_COLORS.ink,fontWeight:800,cursor:"pointer",fontSize:12};
export default function FeelingCheckIn(){
 const [topic,setTopic]=useState(null);
 const [variant,setVariant]=useState({});
 const [choice,setChoice]=useState(null);
 const [showAction,setShowAction]=useState(false);
 const current=[...POSITIVE_FEELINGS,...FEELINGS].find(t=>t.id===topic);
 const response=current?.responses[variant[topic]??0];
 const followUp=topic?(POSITIVE_FOLLOWUPS[topic]||FOLLOW_UPS[topic]):null;
 const selectedReply=topic&&choice?(POSITIVE_FOLLOWUPS[topic]?.choices.find(c=>c.id===choice)||getFollowUp(topic,choice)):null;
 const selectTopic=id=>{setTopic(id);setChoice(null);setShowAction(false);};
 const choose=id=>{setChoice(id);setShowAction(false);};
 const next=()=>{setVariant(v=>({...v,[topic]:((v[topic]??0)+1)%current.responses.length}));setChoice(null);setShowAction(false);};
 const activeText=selectedReply?.reply||response?.text;
 const activeAction=selectedReply?.action||response?.prompt;
 return <section className="pd-feelings" aria-label="Talk about how you feel" style={{padding:"8px 0 20px",marginBottom:12,color:CARE_COLORS.ink}}>
  <h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:24,margin:"0 0 6px"}}>How are you feeling?</h3>
  <p style={{fontSize:13,color:CARE_COLORS.muted,margin:"10px 0 12px"}}>Choose whatever describes your experience right now. Every feeling belongs here.</p>
  <div className="pd-choice-group" role="group" aria-label="Choose how you are feeling" style={{display:"flex",flexWrap:"wrap",gap:8}}>
   {[...POSITIVE_FEELINGS,...FEELINGS].map(t=><button type="button" className="pd-choice" key={t.id} aria-pressed={topic===t.id} onClick={()=>selectTopic(t.id)} style={{...pill,background:topic===t.id?CARE_COLORS.rose:CARE_COLORS.paper}}>{t.label}</button>)}
  </div>
  {response&&<>
   <div aria-live="polite" aria-atomic="true" style={{marginTop:20}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
     <span aria-hidden="true" style={{width:32,height:32,borderRadius:"50%",background:CARE_COLORS.rose,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:18}}>♡</span>
     <strong style={{fontSize:13}}>Kai <span style={{fontWeight:600,color:CARE_COLORS.muted}}>· {selectedReply?"Listening to you":"Here with you"}</span></strong>
    </div>
    <div className="pd-conversation" style={{background:CARE_COLORS.paper,borderRadius:"6px 24px 24px 24px",padding:"17px 18px",boxShadow:"0 3px 15px rgba(7,59,76,.08)"}}>
     <p style={{fontSize:15,lineHeight:1.8,margin:0,fontWeight:650}}>{activeText}</p>
    </div>
    {!selectedReply&&<details style={{margin:"9px 0 0 42px",fontSize:11,color:CARE_COLORS.muted}}><summary style={{cursor:"pointer"}}>Inspiration</summary><p>{response.source}</p></details>}
   </div>
   {followUp&&!selectedReply&&<div style={{marginTop:22}}>
    <p style={{fontSize:14,fontWeight:900,margin:"0 0 12px"}}>{followUp.question}</p>
    <div className="pd-choice-group" role="group" aria-label="Tell Kai more" style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:9}}>
     {followUp.choices.map(option=><button type="button" className="pd-choice" key={option.id} onClick={()=>choose(option.id)} style={{...pill,maxWidth:"100%",textAlign:"left",background:CARE_COLORS.surface}}>{option.label} <span aria-hidden="true">↗</span></button>)}
    </div>
   </div>}
   {selectedReply&&<div style={{marginTop:15,display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
    <span style={{fontSize:12,color:CARE_COLORS.muted}}>You said: {followUp.choices.find(c=>c.id===choice)?.label}</span>
    <button type="button" onClick={()=>{setChoice(null);setShowAction(false);}} style={{...pill,border:"none",background:"transparent",textDecoration:"underline"}}>Change answer</button>
   </div>}
   <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:19,alignItems:"center"}}>
    <button type="button" onClick={()=>setShowAction(v=>!v)} aria-expanded={showAction} style={{...pill,background:CARE_COLORS.rose}}>{showAction?"Hide next step":"♡ A small next step"}</button>
    <button type="button" onClick={next} style={{...pill,border:"none",background:"transparent",textDecoration:"underline"}}>Another perspective ↻</button>
   </div>
   {showAction&&<div role="note" style={{marginTop:12,borderLeft:"3px solid "+CARE_COLORS.rose,padding:"10px 14px",fontSize:13,lineHeight:1.7,background:CARE_COLORS.surface,borderRadius:"0 14px 14px 0"}}>{activeAction}</div>}
  </>}
  <details style={{fontSize:11,lineHeight:1.6,color:CARE_COLORS.muted,margin:"20px 0 0"}}><summary style={{cursor:"pointer"}}>About these conversations & support</summary><p>Kai is a fictional companion, not a therapist. These are authored reflections, not live counseling. If you're in immediate danger, contact local emergency services; for ongoing distress, consider support from someone you trust or a qualified professional.</p></details>
 </section>;
}

// Optional daily real-life moments: no streaks or penalties.
export const QUEST_KEY="pocket-date-little-things-v1";
export const DAILY_QUESTS=[
{id:"food",emoji:"🥐",title:"Eat something",hint:"Breakfast, a snack, or a meal — whatever works.",xp:10,reaction:"Food buddies! I was just thinking about a snack too. Glad we took a moment for ourselves. ♡"},
{id:"water",emoji:"💧",title:"Drink something",hint:"A sip of water or something you like.",xp:5,reaction:"Cheers to us! A tiny refresh break is still a lovely little moment."},
{id:"joy",emoji:"🌷",title:"Do something you enjoy",hint:"Music, games, a walk, or simply resting.",xp:15,reaction:"Tell me about it later? I love hearing about the things that make you smile."},
{id:"freshen",emoji:"🫧",title:"Freshen up",hint:"Brush your teeth, wash your face, or shower.",xp:10,reaction:"Look at us, feeling a little fresher. I'm counting this as a win for both of us."},
{id:"rest",emoji:"🌙",title:"Make room for rest",hint:"Wind down or take a break, on your schedule.",xp:10,reaction:"We don't have to earn our rest, you know. I'm happy we got a quiet moment together."}
];
export const localQuestDay=(date=new Date())=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");
// Count repeat interactions separately from the once-per-day XP reward.
// Existing v1 completion data is migrated in place on first read.
const normalizeCounts=data=>Object.fromEntries(DAILY_QUESTS.map(q=>[q.id,Math.max(data?.completed?.includes(q.id)?1:0,Number.isSafeInteger(data?.counts?.[q.id])?Math.max(0,data.counts[q.id]):0)]));
export function readQuests(day=localQuestDay()){
 try{
  const data=JSON.parse(localStorage.getItem(QUEST_KEY)||"null");
  if(!data||data.day!==day||!Array.isArray(data.completed)||![1,2].includes(data.version))return {day,completed:[],counts:{}};
  const completed=DAILY_QUESTS.map(q=>q.id).filter(id=>data.completed.includes(id));
  return {day,completed,counts:normalizeCounts(data)};
 }catch{return {day,completed:[],counts:{}};}
}
export function claimQuest(id,day=localQuestDay()){
 const quest=DAILY_QUESTS.find(q=>q.id===id);
 if(!quest||day!==localQuestDay())return {claimed:false,quest};
 const current=readQuests(day);
 const firstCompletion=!current.completed.includes(id);
 const counts={...current.counts,[id]:(current.counts[id]||0)+1};
 const next={version:2,day,completed:firstCompletion?[...current.completed,id]:current.completed,counts};
 try{localStorage.setItem(QUEST_KEY,JSON.stringify(next));}catch{return {claimed:false,quest};}
 return {claimed:true,firstCompletion,quest,completed:next.completed,counts};
}

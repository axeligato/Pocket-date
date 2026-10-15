// Each branch is authored; choices are not inferred from private user data.
export const FOLLOW_UPS={
 sad:{question:"Does this sadness feel connected to something specific?",choices:[
  {id:"loss",label:"I miss someone or something",reply:"Missing something can show how much it mattered. You don't need to rush toward closure. Is there a memory you'd like to keep close, or someone you could share it with?",action:"If it feels right, write down one thing you want to remember."},
  {id:"disappointment",label:"Something didn't go how I hoped",reply:"Disappointment can hurt even when other people think it's small. What were you hoping would happen? Naming that hope might help you decide what matters next.",action:"Write down the hope underneath the disappointment, without trying to fix it yet."},
  {id:"unsure",label:"I don't really know why",reply:"Not knowing the reason doesn't make the feeling less real. We don't need to investigate it like a mystery. What would make this afternoon a little kinder to you?",action:"Pick one gentle comfort: water, a walk, music, or a message to someone safe."}
 ]},
 anxious:{question:"What part of the worry feels loudest?",choices:[
  {id:"future",label:"Something that might happen",reply:"Your mind is trying to prepare for every possibility. We can thank it for trying, then return to what you know today. What's one small action within your control?",action:"Write one fact, one uncertainty, and one next step."},
  {id:"people",label:"What other people think",reply:"It's hard when your mind starts filling in other people's thoughts. Have they actually told you something, or are you having to guess? You deserve room to be imperfect.",action:"Separate what someone said from what you fear they meant."},
  {id:"body",label:"I feel tense and restless",reply:"That sounds uncomfortable. You don't have to force yourself to calm down. If it feels okay, notice the support of your chair or the floor beneath you.",action:"Look around and name five things you can see. Stop if grounding feels unhelpful."}
 ]},
 lonely:{question:"What kind of connection are you missing?",choices:[
  {id:"understood",label:"I don't feel understood",reply:"Being around people isn't the same as feeling seen. Is there someone you can be a little more honest with, even about one small thing?",action:"Try sending a trusted person one specific, low-pressure message."},
  {id:"distance",label:"I miss someone",reply:"Distance can make ordinary moments feel precious. Would reaching out feel comforting, or would remembering a good moment be gentler today?",action:"Choose between a short message and a private memory."},
  {id:"isolated",label:"I haven't seen people lately",reply:"Connection doesn't have to begin with a big plan. A familiar café, a class, or a short walk with someone can be a start. What feels manageable?",action:"Choose one real-world place or person to reconnect with this week."}
 ]},
 overwhelmed:{question:"What's making everything feel like too much?",choices:[
  {id:"tasks",label:"Too many things to do",reply:"When every task looks equally urgent, it's hard to move. Let's choose one thing that would reduce pressure today and let the rest wait for a moment.",action:"List three tasks. Pick only the smallest useful one."},
  {id:"expectations",label:"People expect too much",reply:"You can care about people and still have limits. Is there a request you could renegotiate, delay, or decline without abandoning what matters to you?",action:"Practice a simple boundary: 'I can do X, but not Y today.'"},
  {id:"everything",label:"It's all tangled together",reply:"We don't need to untangle it all right now. Maybe start by naming what needs action, what needs support, and what just needs time.",action:"Put one concern in each of those three groups."}
 ]},
 insecure:{question:"When do you notice that 'not good enough' feeling?",choices:[
  {id:"comparison",label:"When I compare myself",reply:"Comparisons often hide the parts of other people's lives we can't see. What would progress look like if you measured it against your own past instead?",action:"Name one thing you can do now that used to be difficult."},
  {id:"mistake",label:"After I make a mistake",reply:"A mistake can deserve attention without becoming your whole identity. What would repairing it look like—and what would forgiving yourself look like?",action:"Write one lesson and one kind sentence to yourself."},
  {id:"rejection",label:"When I feel rejected",reply:"Rejection can sting because belonging matters. It doesn't tell the whole story about your value. What support would help you feel steadier today?",action:"Reach out to someone who knows you beyond this one experience."}
 ]},
 unmotivated:{question:"What does the lack of motivation feel like?",choices:[
  {id:"exhausted",label:"I'm exhausted",reply:"If you're running on empty, another productivity trick may not be the answer. What kind of rest have you actually had lately?",action:"Consider a genuine break, food, water, or sleep before deciding what comes next."},
  {id:"stuck",label:"I don't know where to start",reply:"Starting can feel bigger than doing. Let's make the first step almost comically small. What could you do in two minutes?",action:"Try a two-minute start, then decide freely whether to continue."},
  {id:"nothing",label:"Nothing feels interesting",reply:"That sounds draining, especially if it's been going on for a while. You deserve support, not pressure to perform. Have you been able to tell someone you trust?",action:"If this persists or affects daily life, consider speaking with a qualified health professional."}
 ]}
};
export function getFollowUp(topic,choice){
 const group=FOLLOW_UPS[topic];
 return group?.choices.find(c=>c.id===choice)||null;
}

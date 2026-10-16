export const ROMANCE_SCENES=[
 {id:"coffee",min:0,prompt:"Kai shows up with two coffees. 'I remembered your order. Don't make it weird.'",choices:[
  {id:"tease",label:"Make it a little weird",reply:"'Wow. I do one thoughtful thing and suddenly I'm the romantic lead?' He grins. '...I could get used to that.'",affection:2},
  {id:"sweet",label:"Tell him that's sweet",reply:"He looks at his cup instead of you. 'Well. You make it easy to remember things.'",affection:3},
  {id:"playful",label:"Offer to buy the next one",reply:"'Deal. But I'm choosing the café. I have a reputation to maintain.'",affection:2}
 ]},
 {id:"race",min:10,prompt:"Kai stretches after his run. 'Race you to the corner? Winner picks our next hangout.'",choices:[
  {id:"challenge",label:"You're on",reply:"'That's the confidence I like.' He starts running, then slows so you can catch up. 'Don't tell my coach.'",affection:3},
  {id:"flirt",label:"I'd rather walk with you",reply:"'Oh.' He forgets his stretch. 'Yeah. Actually, that's a much better plan.'",affection:3},
  {id:"joke",label:"Only if you carry me back",reply:"'Negotiating already? Fine. But I'm charging one pastry per kilometer.'",affection:2}
 ]},
 {id:"hoodie",min:30,prompt:"Kai notices you looking at his hoodie. 'You know, you could just ask.'",choices:[
  {id:"borrow",label:"Can I borrow it?",reply:"He hands it over immediately. 'I was going to say no. Just so we're clear.'",affection:3},
  {id:"flirt",label:"Looks better on me",reply:"'That's a bold claim.' He smiles. 'Unfortunately, you might be right.'",affection:3},
  {id:"soft",label:"I like that it's yours",reply:"His ears turn pink. 'Right. Cool. I'm going to need a second to recover from that.'",affection:3}
 ]},
 {id:"almost",min:60,prompt:"At the café door, Kai lingers. 'I keep finding reasons to spend another five minutes with you.'",choices:[
  {id:"stay",label:"Then stay five more",reply:"'Five?' He takes your hand, carefully. 'I was hoping you'd negotiate higher.'",affection:4},
  {id:"tease",label:"You're not subtle",reply:"'I know. I had a whole plan to be mysterious. Lasted about twelve seconds.'",affection:3},
  {id:"honest",label:"I do the same thing",reply:"For once, Kai has no comeback. Just a very real smile. 'Good. That's really good.'",affection:4}
 ]}
];
export function getRomanceScene(affection,previousId=null){
 const available=ROMANCE_SCENES.filter(s=>affection>=s.min);
 return available.find(s=>s.id!==previousId&&s.min===Math.max(...available.map(x=>x.min)))||available[0];
}
export function getRomanceMemoryLine(jogMemory){
 return {tease:"And yes, I was on time for our run. I'm keeping that victory forever.",sweet:"I still think about what you said on our morning run.",challenge:"One day I'll actually win that race. Maybe."}[jogMemory]||"";
}

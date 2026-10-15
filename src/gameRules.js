export const XP_PER_LEVEL=50;
export const MAX_LEVEL=10;
export function applyXpReward(currentLevel,currentXp,amount){
  const level=Math.max(1,Math.min(MAX_LEVEL,Math.floor(currentLevel)));
  if(level>=MAX_LEVEL)return {level:MAX_LEVEL,xp:0,levelsGained:0};
  const total=Math.max(0,currentXp)+Math.max(0,amount);
  const levelsGained=Math.min(MAX_LEVEL-level,Math.floor(total/XP_PER_LEVEL));
  const nextLevel=level+levelsGained;
  return {level:nextLevel,xp:nextLevel===MAX_LEVEL?0:total-levelsGained*XP_PER_LEVEL,levelsGained};
}
export function rpsResult(player,kai){
  const beats={rock:"scissors",paper:"rock",scissors:"paper"};
  if(!Object.hasOwn(beats,player)||!Object.hasOwn(beats,kai))throw new Error("Invalid move");
  return player===kai?"tie":beats[player]===kai?"win":"lose";
}
export function isDailyBonusEligible(claimedDay,currentDay){return claimedDay!==currentDay;}

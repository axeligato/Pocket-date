import test from "node:test";
import assert from "node:assert/strict";
import {applyXpReward,MAX_LEVEL,XP_PER_LEVEL,rpsResult,isDailyBonusEligible} from "../src/gameRules.js";
import {STORIES_CONTENT,STORY_EXPRESSIONS} from "../src/narrativeChapters.js";

test("XP below threshold stays on current level",()=>{
 assert.deepEqual(applyXpReward(2,10,15),{level:2,xp:25,levelsGained:0});
});
test("XP exactly at threshold levels once",()=>{
 assert.deepEqual(applyXpReward(1,45,5),{level:2,xp:0,levelsGained:1});
});
test("large XP rewards carry over multiple levels",()=>{
 assert.deepEqual(applyXpReward(1,40,115),{level:4,xp:5,levelsGained:3});
});
test("level cap discards overflow",()=>{
 assert.deepEqual(applyXpReward(9,45,120),{level:MAX_LEVEL,xp:0,levelsGained:1});
 assert.deepEqual(applyXpReward(MAX_LEVEL,0,100),{level:MAX_LEVEL,xp:0,levelsGained:0});
});
test("every rock paper scissors pairing has the expected outcome",()=>{
 const cases=[
 ["rock","rock","tie"],["rock","paper","lose"],["rock","scissors","win"],
 ["paper","rock","win"],["paper","paper","tie"],["paper","scissors","lose"],
 ["scissors","rock","lose"],["scissors","paper","win"],["scissors","scissors","tie"]
 ];
 for(const [a,b,expected] of cases)assert.equal(rpsResult(a,b),expected);
 assert.throws(()=>rpsResult("invalid","rock"));
});
test("daily reward eligibility changes on local day boundary",()=>{
 assert.equal(isDailyBonusEligible("2026-10-15","2026-10-15"),false);
 assert.equal(isDailyBonusEligible("2026-10-15","2026-10-16"),true);
 assert.equal(isDailyBonusEligible(null,"2026-10-15"),true);
});
test("all six advertised story chapters have full text and expression arrays",()=>{
 assert.equal(Object.keys(STORIES_CONTENT).length,6);
 for(let id=1;id<=6;id++){
  assert.ok(STORIES_CONTENT[id].length>=12,`Chapter ${id} is incomplete`);
  assert.equal(STORIES_CONTENT[id].length,STORY_EXPRESSIONS[id].length);
  assert.ok(STORIES_CONTENT[id].every(line=>typeof line.text==="string"&&line.text.trim()));
 }
});
test("XP threshold remains 50",()=>assert.equal(XP_PER_LEVEL,50));

import test from "node:test";
import assert from "node:assert/strict";
import {FOLLOW_UPS,getFollowUp} from "../src/feelingFollowUps.js";
test("six feelings each offer three distinct authored follow-ups",()=>{
 assert.equal(Object.keys(FOLLOW_UPS).length,6);
 for(const [id,topic] of Object.entries(FOLLOW_UPS)){
  assert.ok(topic.question.length>15,id);
  assert.equal(topic.choices.length,3,id);
  assert.equal(new Set(topic.choices.map(c=>c.id)).size,3,id);
  for(const c of topic.choices){
   assert.ok(c.label.length>4&&c.reply.length>80&&c.action.length>20,id+":"+c.id);
   assert.deepEqual(getFollowUp(id,c.id),c);
  }
 }
});
test("invalid choices do not return a fabricated response",()=>{
 assert.equal(getFollowUp("sad","unknown"),null);
 assert.equal(getFollowUp("unknown","loss"),null);
});

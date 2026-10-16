import test from "node:test";
import assert from "node:assert/strict";
import {ROMANCE_SCENES,getRomanceScene,getRomanceChoiceCallback} from "../src/romanceInteractions.js";

test("romance progression favors first unseen unlocked scene",()=>{
 assert.equal(getRomanceScene(100,{}).id,"coffee");
 assert.equal(getRomanceScene(100,{coffee:"sweet"}).id,"race");
 assert.equal(getRomanceScene(100,{coffee:"sweet",race:"flirt",hoodie:"borrow"}).id,"almost");
});
test("locked moments are never selected",()=>{
 assert.equal(getRomanceScene(0,{coffee:"sweet"}).id,"coffee");
 assert.equal(getRomanceScene(15,{coffee:"sweet"}).id,"race");
});
test("recorded romantic decisions generate distinct callbacks",()=>{
 assert.match(getRomanceChoiceCallback({coffee:"playful"}),/promised to buy/);
 assert.match(getRomanceChoiceCallback({coffee:"sweet"}),/sweet/);
 assert.equal(getRomanceChoiceCallback({}),"");
});
test("each scene has unique choices and positive first-time rewards",()=>{
 for(const scene of ROMANCE_SCENES){
  assert.equal(new Set(scene.choices.map(c=>c.id)).size,scene.choices.length);
  assert.ok(scene.choices.every(c=>c.affection>0));
 }
});

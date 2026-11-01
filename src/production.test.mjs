import test from 'node:test';
import assert from 'node:assert/strict';
export function validateBom(bom) {
 if (!bom?.id||!Number.isInteger(bom.version)||bom.version<1||!Array.isArray(bom.inputs)||!bom.inputs.length||!Array.isArray(bom.outputs)||!bom.outputs.length) throw new Error('BOM requires identity, version, inputs and outputs');
 for(const line of [...bom.inputs,...bom.outputs]) if(!line.itemId||!Number.isFinite(line.quantity)||line.quantity<=0) throw new Error('BOM lines require item and positive quantity');
 return true;
}
export function calculateYield(inputQuantity,goodOutputQuantity) {
 if (![inputQuantity,goodOutputQuantity].every(Number.isFinite)||inputQuantity<=0||goodOutputQuantity<0) throw new Error('Invalid production quantities');
 return goodOutputQuantity/inputQuantity*100;
}
export function materialVariance(planned,actual) {
 if (![planned,actual].every(Number.isFinite)||planned<0||actual<0) throw new Error('Invalid material quantities');
 return actual-planned;
}
test('BOM requires versioned input and output lines',()=>{
 assert.equal(validateBom({id:'B1',version:2,inputs:[{itemId:'RAW',quantity:10}],outputs:[{itemId:'PLY',quantity:8}]}),true);
 assert.throws(()=>validateBom({id:'B1',version:0,inputs:[],outputs:[]}));
});
test('yield and material variance are deterministic',()=>{
 assert.equal(calculateYield(100,82),82);
 assert.equal(materialVariance(50,54),4);
 assert.throws(()=>calculateYield(0,10));
});
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModule}=require('./module-loader.cjs');
class NextResponse extends Response {
 static json(value,init){return new NextResponse(JSON.stringify(value),init);}
}
test('retired attachment verification cannot read mail or call scanners',async()=>{
 let reads=0;
 const route=loadModule('src/app/api/internal/attachment-ingest-verify/route.ts',{
  'next/server':{NextResponse},
  '@/lib/api-error':{privateHeaders:{'Cache-Control':'no-store'}},
  '@/lib/mail':{getMail:()=>{reads++;throw Error('unexpected mailbox access');},listMail:()=>{reads++;throw Error('unexpected mailbox access');}}
 });
 for(const method of ['GET','POST']){
  for(const suffix of ['', '?run=latest-pdf-20261006', '?token=obsolete']){
   const response=await route[method](new Request('https://ai-mail.sovsi.xyz/api/internal/attachment-ingest-verify'+suffix,{method,headers:{Authorization:'Bearer obsolete'}}));
   assert.equal(response.status,410);
   assert.equal(response.headers.get('Cache-Control'),'no-store');
   assert.deepEqual(Object.keys(await response.json()),['error']);
  }
 }
 assert.equal(reads,0);
});

const fetch = require('node-fetch');
describe('API /posts', ()=>{

  let postId = -1;
  let _ts = new Date().valueOf();
  let postData = {
    title: "post on " + _ts,
    content : "post content ... " + _ts
  };
  it('can POST new posts to and returns status ok', async function(){

    expect.assertions(3);
 
    let json = await fetch('http://localhost:3000/posts', {
      method: 'post',
      body: JSON.stringify(postData),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      expect(res.ok).toBe(true);
      return res.json()
    });
    expect(typeof json.id == 'number').toBeTruthy();
    expect(json.id).toBeGreaterThan(1);

    postId = json.id;
  });

  it('can retrieve last added by post via GET /posts/:id',async function(){
    expect.assertions(3);
 
    let jsonGot = await fetch('http://localhost:3000/posts/'+postId, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      expect(res.ok).toBe(true);
      return res.json()
    });
    
    expect(jsonGot.title).toBe(postData.title);
    expect(jsonGot.content).toBe(postData.content);
  });
  
});
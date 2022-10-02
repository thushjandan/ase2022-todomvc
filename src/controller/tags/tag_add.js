import * as db from '../db.js';

export async function addTagHandler(ctx) {
    const newTag = ctx.request.body;
    if (!newTag.title) ctx.throw(400, {'error': '"title" is a required field'});
    const title = newTag.title;
    if (!typeof title === 'string' || !title.length) ctx.throw(400, {'error': '"title" must be a string with at least one character'});
  
    let docTag = await db.createTag(newTag);
    newTag['url'] = 'http://' + ctx.host + ctx.router.url('tag', docTag.id);
  
    ctx.status = 303;
    ctx.set('Location', newTag['url']);
}
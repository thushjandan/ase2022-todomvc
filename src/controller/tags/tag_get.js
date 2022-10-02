import * as db from '../db.js';

export async function showTagHandler(ctx) {
    const id = ctx.params.id;
    const result = await db.findTagById(id);
    if (!result) ctx.throw(404, {'error': 'Tag not found'});
    ctx.body = result;
}
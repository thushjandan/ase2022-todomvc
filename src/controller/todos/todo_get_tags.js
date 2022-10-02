import * as db from '../db.js';

export async function showTagsByTodoHandler(ctx) {
    const id = ctx.params.id;
    const result = await db.findTodoById(id);
    if (!result) ctx.throw(404, {'error': 'Todo not found'});
    ctx.body = result.tags;
}
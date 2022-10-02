import * as db from '../db.js';

export async function updateTodoHandler(ctx) {
    const id = ctx.params.id;
    
    const result = await db.updateTodo(id, ctx.request.body);

    ctx.body = result;
}
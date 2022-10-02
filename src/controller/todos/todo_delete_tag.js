import * as db from '../db.js';

export async function removeTagFromTodoHandler(ctx) {
    const todoId = ctx.params.id;
    const tagId = ctx.params.tag_id;
  
    const result = await db.deleteTagFromTodo(todoId, tagId);
    if (result == null) {
        ctx.throw(400, {'error': 'Todo id or Tag id cannot be found'});
    }
  
    ctx.status = 204;
  }
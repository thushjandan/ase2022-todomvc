import * as db from '../db.js';

export async function removeTodoHandler(ctx) {
    const id = ctx.params.id;
  
    const result = await db.deleteTodo(id);
    if (result.deletedCount == 0) {
        ctx.throw(404, {'error': 'Todo not found'})
    }
  
    ctx.status = 204;
  }
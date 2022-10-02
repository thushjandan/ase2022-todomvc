import * as db from '../db.js';

export async function clearTodoHandler(ctx) {
    await db.deleteAllTodos();
    ctx.status = 204;
}
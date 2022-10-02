import * as db from '../db.js';

export async function listTodosHandler(ctx) {
    const result = await db.listTodos()
    ctx.body = result;
}
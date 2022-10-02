import * as db from '../db.js';

export async function deleteAllTagsFromTodoHandler(ctx) {
    const todoId = ctx.params.id;

    await db.deleteAllTagsFromTodo(todoId);
    ctx.status = 204;
}
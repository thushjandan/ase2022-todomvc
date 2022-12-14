import * as db from '../db.js';
import { generateURLFieldForTodo, generateURLFieldForTag } from '../../utils/generateUrlField.js';

export async function showTodosByTagHandler(ctx) {
    const id = ctx.params.id;
    const result = await db.findTagById(id);
    if (!result) ctx.throw(404, {'error': 'Tag not found'});
    ctx.body = result.todos.map(aTodo => generateURLFieldForTodo(aTodo, ctx));
}
import { generateURLFieldForTodo, generateURLFieldForTag } from '../../utils/generateUrlField.js';
import * as db from '../db.js';

export async function showTagHandler(ctx) {
    const id = ctx.params.id;
    const result = await db.findTagById(id);
    if (!result) ctx.throw(404, {'error': 'Tag not found'});
    result.todos.map(aTodo => generateURLFieldForTodo(aTodo, ctx) );

    ctx.body = generateURLFieldForTag(result, ctx);
}
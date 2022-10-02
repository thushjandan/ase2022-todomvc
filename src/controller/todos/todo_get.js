import * as db from '../db.js';
import { generateURLFieldForTag, generateURLFieldForTodo } from '../../utils/generateUrlField.js';

export async function showTodoHandler(ctx) {
    const id = ctx.params.id;
    let result = await db.findTodoById(id);
    if (!result) ctx.throw(404, {'error': 'Todo not found'});
    result.tags.map(aTag => generateURLFieldForTag(aTag, ctx) );

    ctx.body = generateURLFieldForTodo(result, ctx);
}
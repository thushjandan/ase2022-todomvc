import * as db from '../db.js';
import { generateURLFieldForTag, generateURLFieldForTodo } from '../../utils/generateUrlField.js';

export async function listTodosHandler(ctx) {
    const result = await db.listTodos();

    ctx.body = result.map(aTodo => {
        aTodo.tags.map(aTag => generateURLFieldForTag(aTag, ctx) );
        return generateURLFieldForTodo(aTodo, ctx);
    });
}
import * as db from '../db.js';
import { generateURLFieldForTag, generateURLFieldForTodo } from '../../utils/generateUrlField.js';

export async function listTagsHandler(ctx) {
    const result = await db.listTags()
    ctx.body = result.map(aTag => {
        aTag.todos.map(aTodo => generateURLFieldForTodo(aTodo, ctx) );
        return generateURLFieldForTag(aTag, ctx);
    });;
}
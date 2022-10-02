import * as db from '../db.js';
import { generateURLFieldForTag } from '../../utils/generateUrlField.js';

export async function updateTagHandler(ctx) {
    const id = ctx.params.id;
    
    const result = await db.updateTag(id, ctx.request.body);

    ctx.body = generateURLFieldForTag(result, ctx);
}
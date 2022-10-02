import * as db from '../db.js';

export async function listTagsHandler(ctx) {
    const result = await db.listTags()
    ctx.body = result;
}
import * as db from '../db.js';

export async function clearTagsHandler(ctx) {
    await db.deleteAllTags();
    ctx.status = 204;
}
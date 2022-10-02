import * as db from '../db.js';

export async function removeTagHandler(ctx) {
    const id = ctx.params.id;
  
    const result = await db.deleteTag(id);
    if (result.deletedCount == 0) {
        ctx.throw(404, {'error': 'Tag not found'})
    }
  
    ctx.status = 204;
  }
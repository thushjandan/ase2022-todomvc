export function generateURLFieldForTodo(data, ctx) {
    if (!data.id) {
        return data;
    }
    
    return generateURLField(ctx, data, 'todo')
}

export function generateURLFieldForTag(data, ctx) {
    if (!data.id) {
        return data;
    }
    
    return generateURLField(ctx, data, 'tag')
}

function generateURLField(ctx, data, routeType) {
    data['url'] = 'http://' + ctx.host + ctx.router.url(routeType, data.id);
    return data;
}
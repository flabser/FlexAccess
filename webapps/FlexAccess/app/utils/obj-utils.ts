export function serializeObj(obj) {
    var result = [];

    for (var property in obj) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
    }

    return result.join('&');
}

export function parseResponseObjects(objects: any) {
    let result: any = [];

    for (let obj of objects) {
        if (obj.kind) {
            result[obj.kind] = obj;
        } else if (obj.list && obj.meta && obj.type) {
            result[obj.type] = obj;
        } else {
            result.push(obj);
        }
    }

    return result;
}

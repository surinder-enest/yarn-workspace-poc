export function toCamel(o: any) {
    var newO: any, origKey, newKey, value;
    if (o instanceof Array) {
        return o.map(function (value) {
            if (typeof value === 'object') {
                value = toCamel(value);
            }
            return value;
        });
    } else {
        newO = {};
        for (origKey in o) {
            if (o.hasOwnProperty(origKey)) {
                newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
                value = o[origKey];
                if (value instanceof Array || (value !== null && value.constructor === Object)) {
                    value = toCamel(value);
                }
                newO[newKey] = value;
            }
        }
    }
    return newO;
}

export function toPascal(o: any) {
    if (!o) {
        return;
    }

    var newO: any, origKey, newKey, value;
    if (o instanceof Array) {
        return o.map(function (value) {
            if (typeof value === 'object') {
                value = toPascal(value);
            }
            return value;
        });
    } else {
        newO = {};
        for (origKey in o) {
            if (o.hasOwnProperty(origKey)) {
                newKey = (origKey.charAt(0).toLocaleUpperCase() + origKey.slice(1) || origKey).toString();
                value = o[origKey];
                if (value instanceof Array || (value !== null && value.constructor === Object)) {
                    value = toPascal(value);
                }
                newO[newKey] = value;
            }
        }
    }
    return newO;
}

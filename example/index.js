var inflect = global.inflect = require("../src/index.js");


(function underscorify(obj, seen) {
    var underscore, key;

    for (key in obj) {
        var underscore = inflect.underscore(key);

        if (key === "location" || underscore === key) {
            continue;
        }

        value = obj[key];

        if (typeof(value) === "object" && !Array.isArray(value)) {
            seen.push(value);
            obj[underscore] = underscorify(value, seen);
        }

        if (key[0] === key[0].toUpperCase()) {
            continue;
        }

        obj[underscore] = value;
        if (value && value.prototype) value.prototype = underscorify(value.prototype, seen);
    }

    console.log(seen);
}(global, []));

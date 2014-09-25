var inflect = global.inflect = require("../src/index.js");


inflect.extendString();
inflect.extendNumber();

(function underscorify(obj, seen) {
    var underscore, key, value;

    for (key in obj) {
        underscore = inflect.underscore(key);

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
        if (value && value.prototype) {
            value.prototype.to_string = value.prototype.toString;
            value.prototype = underscorify(value.prototype, seen);
        }
        if (value && value.__proto__) {
            value.__proto__.to_string = value.__proto__.toString;
            value.__proto__ = underscorify(value.__proto__, seen);
        }
    }
}(global, []));

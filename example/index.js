var inflect = global.inflect = require("../src/index.js");


inflect.extendString();
inflect.extendNumber();

(function underscorify(obj, seen) {
    var underscore, key, value, proto;

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
        if (value && typeof(value) === "object" && (proto = Object.getPrototypeOf(value))) {
            proto.to_string = proto.toString;
            proto = underscorify(proto, seen);
        }
    }
}(global, []));

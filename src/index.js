var inflections = require("./inflections"),
    inflector = require("./inflector");


require("./languages/en");
require("./languages/es");
require("./languages/fr");


var inflect = module.exports,

    MATCHER = /[^A-Z-_ \.]+|[A-Z][^A-Z-_ \.]+|[^a-z-_ \.]+/g,

    NON_TITLE_CASED = [
        "and", "or", "nor", "a", "an", "the", "so", "but", "to", "of", "at", "is",
        "by", "from", "into", "on", "onto", "off", "out", "in", "over",
        "with", "for"
    ];


inflect.inflections = inflections;
inflect.inflector = inflector;

function capitalize(str) {

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

inflect.pluralize = function(word, locale) {

    return inflections(locale).pluralize(word);
};


inflect.isPlural = function(word, locale) {

    return inflections(locale).isPlural(word);
};

inflect.is_plural = inflect.isPlural;


inflect.singularize = function(word, locale) {

    return inflections(locale).singularize(word);
};


inflect.isSingular = function(word, locale) {

    return inflections(locale).isSingular(word);
};

inflect.is_singular = inflect.isSingular;


inflect.capitalize = function(word, allWords) {
    if (allWords !== false) {
        var parts = word.match(MATCHER),
            part, i = parts.length;

        while (i--) parts[i] = capitalize(parts[i]);
        return parts.join(" ");
    }

    return capitalize(word.match(MATCHER).join(" "));
};


inflect.camelize = function(word, lowFirstLetter) {
    var parts = word.match(MATCHER),
        part, i = parts.length;

    while (i--) parts[i] = capitalize(parts[i]);
    word = parts.join("");

    return lowFirstLetter !== false ? word[0].toLowerCase() + word.slice(1) : word;
};


inflect.underscore = function(word) {

    return word.match(MATCHER).join("_").toLowerCase();
};


inflect.dasherize = function(word) {

    return word.match(MATCHER).join("-").toLowerCase();
};


inflect.humanize = function(word, key, camelcase) {
    var foreignKeyRegex = key;

    if (!(key instanceof RegExp)) {
        foreignKeyRegex = new RegExp((camelcase !== false ? capitalize(key || "id") : "_" + (key || "id")) + "$");
    }

    return word.replace(foreignKeyRegex, "").match(MATCHER).join(" ");
};


inflect.titleize = function(word) {
    var parts = word.match(MATCHER),
        part, i = parts.length;

    while (i--) {
        part = parts[i].toLowerCase();
        if (NON_TITLE_CASED.indexOf(part) !== -1) continue;
        parts[i] = capitalize(part);
    }

    return parts.join(" ");
};


inflect.constize = function(word) {
    var parts = word.match(MATCHER),
        part, i = parts.length;

    while (i--) {
        part = parts[i];
        parts[i] = part.toUpperCase();
    }

    return parts.join("_");
};


inflect.tableize = function(word, camelcase, locale) {
    if (typeof(camelcase) === "string") {
        locale = camelcase;
        camelcase = true;
    }

    return camelcase !== false ? inflect.camelize(inflect.pluralize(word, locale)) : inflect.underscore(inflect.pluralize(word, locale));
};


inflect.classify = function(word, locale) {

    return inflect.camelize(inflect.singularize(word, locale), false);
};


inflect.foreignKey = function(word, key, camelized, lowFirstLetter) {
    if (typeof(key) === "boolean") {
        lowFirstLetter = camelized;
        camelized = key;
        key = "id";
    }
    key = typeof(key) === "string" ? key : "id";

    if (camelized !== false) return inflect.camelize(word + "_" + key, lowFirstLetter);

    return inflect.underscore(word + "_" + key);
};

inflect.foreign_key = inflect.foreignKey;


inflect.ordinal = function(num) {
    num = Math.abs(num % 100);

    if (num > 9 && num < 14) {
        return "th";
    }

    num = num % 10;

    if (num === 1) {
        return "st";
    } else if (num === 2) {
        return "nd";
    } else if (num === 3) {
        return "rd";
    } else {
        return "th";
    }
};


inflect.ordinalize = function(num) {

    return num + inflect.ordinal(num);
};


inflect.extendString = function() {
    each([
        "pluralize",
        "isPlural",
        "is_plural",
        "singularize",
        "isSingular",
        "is_singular",
        "capitalize",
        "camelize",
        "underscore",
        "dasherize",
        "humanize",
        "titleize",
        "constize",
        "tableize",
        "classify",
        "foreignKey",
        "foreign_key"
    ], function(key) {
        String.prototype[key] = function() {

            return inflect[key](this, arguments[0], arguments[1], arguments[2]);
        };
    });
};

inflect.extendNumber = function() {
    each([
        "ordinal",
        "ordinalize"
    ], function(key) {
        Number.prototype[key] = function() {

            return inflect[key](this);
        };
    });
};

function each(array, fn) {
    var i = -1,
        length = array.length - 1;

    while (i++ < length) {
        if (fn(array[i], i, array) === false) break;
    }

    return array;
}

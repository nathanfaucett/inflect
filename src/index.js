var inflections = require("./inflections"),
    inflector = require("./inflector");


require("./languages/en");
require("./languages/es");


var inflect = module.exports,

    SPILTER = /[ \_\-\.]+|(?=[A-Z][^A-Z])/g,
    MODULE_SPILTER = /[\. \/:]+/g,
    ID = /_id$/,
    UNDERSCORE = /([a-z\d])([A-Z])|\_/g,

    NON_TITLE_CASED = [
        "and", "or", "nor", "a", "an", "the", "so", "but", "to", "of", "at",
        "by", "from", "into", "on", "onto", "off", "out", "in", "over",
        "with", "for"
    ];


inflect.inflections = inflections;
inflect.inflector = inflector;


inflect.pluralize = function(word, locale) {

    return inflections(locale).pluralize(word);
};


inflect.isPlural = function(word, locale) {

    return inflections(locale).isPlural(word);
};


inflect.singularize = function(word, locale) {

    return inflections(locale).singularize(word);
};


inflect.isSingular = function(word, locale) {

    return inflections(locale).isSingular(word);
};


inflect.capitalize = function(word, allWords) {
    if (allWords) {
        var parts = word.split(SPILTER),
            part, i = parts.length;

        while (i--) {
            part = parts[i];
            parts[i] = part[0].toUpperCase() + part.slice(1).toLowerCase();
        }

        return parts.join("");
    }

    return word[0].toUpperCase() + word.slice(1).toLowerCase();
};


inflect.camelize = function(word, lowFirstLetter) {
    var parts = word.split(SPILTER),
        part, i = parts.length;

    while (i--) {
        part = parts[i];
        parts[i] = part[0].toUpperCase() + part.slice(1).toLowerCase();
    }
    parts = parts.join("");

    return lowFirstLetter ? parts[0].toLowerCase() + parts.slice(1) : parts;
};


inflect.underscore = function(word) {

    return word.replace(UNDERSCORE, "$1_$2").toLowerCase();
};


inflect.dasherize = function(word) {

    return word.replace(UNDERSCORE, "$1-$2").toLowerCase();
};


inflect.humanize = function(word, foreignKeyRegex) {

    return (word[0].toUpperCase() + word.slice(1).toLowerCase()).replace(foreignKeyRegex || ID, "").split(SPILTER).join(" ");
};


inflect.titleize = function(word) {
    var parts = word.split(SPILTER),
        part, i = parts.length;

    while (i--) {
        part = parts[i].toLowerCase();
        if (NON_TITLE_CASED.indexOf(part) !== -1) continue;
        parts[i] = part[0].toUpperCase() + part.slice(1);
    }

    return parts.join(" ");
};


inflect.constize = function(word) {
    var parts = word.split(SPILTER),
        part, i = parts.length;

    while (i--) {
        part = parts[i];
        parts[i] = part.toUpperCase();
    }

    return parts.join("_");
};


inflect.tableize = function(word, locale) {

    return inflect.underscore(inflect.pluralize(word, locale));
};


inflect.classify = function(word, locale) {

    return inflect.camelize(inflect.singularize(word, locale));
};


inflect.demodulize = function(word) {

    return word.split(MODULE_SPILTER).pop();
};


inflect.foreignKey = function(word, key, camelized, lowFirstLetter) {
    if (typeof(key) === "boolean") {
        lowFirstLetter = camelized;
        camelized = key;
        key = "id";
    }
    key = key != null ? key : "id";

    if (camelized) return inflect.camelize(word + "_" + key, lowFirstLetter);
    return inflect.underscore(word + "_" + key);
};


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

var inflections = require("./inflections"),
    inflector = require("./inflector");


require("./languages/en");
require("./languages/es");


var inflect = module.exports,

    SPILTER = /[ \_\-\.]+|(?=[A-Z][^A-Z])/g,
    MODULE_SPILTER = /[\. \/:]+/g,
    ID = /_id$/,
    UNDERSCORE = /([a-z\d])([A-Z])/g;


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


inflect.singularize = function(word, locale) {

    return inflections(locale).isSingular(word);
};


inflect.capitalize = function(word, allWords) {
    if (allWords) {
        var parts = word.split(SPILTER),
            string = "",
            part, i, il;

        for (i = 0, il = parts.length; i < il; i++) {
            part = parts[i];
            string += part[0].toUpperCase() + part.slice(1).toLowerCase();
        }

        return string;
    }

    return word[0].toUpperCase() + word.slice(1).toLowerCase();
};


inflect.camelize = function(word, lowFirstLetter) {
    var parts = word.split(SPILTER),
        string = "",
        part, i, il;

    for (i = 0, il = parts.length; i < il; i++) {
        part = parts[i];
        string += part[0].toUpperCase() + part.slice(1).toLowerCase();
    }

    return lowFirstLetter ? string[0].toLowerCase() + string.slice(1) : string;
};


inflect.underscore = function(word) {

    return word.replace(UNDERSCORE, "$1_$2").toLowerCase();
};


inflect.dasherize = function(word) {

    return word.replace("_", "-");
};


inflect.humanize = function(word, foreignKeyRegex) {

    return (word[0].toUpperCase() + word.slice(1).toLowerCase()).replace(foreignKeyRegex || ID, "").split(SPILTER).join(" ");
};


inflect.titleize = function(word) {
    var parts = word.split(SPILTER),
        part, i, il;

    for (i = 0, il = parts.length; i < il; i++) {
        part = parts[i];
        parts[i] = part[0].toUpperCase() + part.slice(1).toLowerCase();
    }

    return parts.join(" ");
};


inflect.tableize = function(word, locale) {

    return inflect.pluralize(inflect.underscore(word), locale);
};


inflect.classify = function(word, locale) {

    return inflect.camelize(inflect.singularize(word), locale);
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
    key = key == undefined ? "id" : key;
    lowFirstLetter = lowFirstLetter == undefined ? true : lowFirstLetter;

    if (camelized) return inflect.camelize(word + "_" + key, lowFirstLetter);
    return inflect.underscore(word + "_" + key);
};


inflect.ordinal = function(num) {
    num = Math.abs(num % 100) % 10;

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

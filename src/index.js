var inflections = require("./inflections"),
    
    SPILTER = /[ \_\-\.]+/g,
    MODULE_SPILTER = /[\. \/:]+/g,
    ID = /_id$/,
    UPPERCASE = /([A-Z])/g,
    UNDERSCORE_PREFIX = /^_/,
    DASH_PREFIX = /^-/,
    
    abs = Math.abs;


function pluralize(word, locale) {
    
    return inflections(locale).pluralize(word);
};
exports.pluralize = pluralize;


function singularize(word, locale) {
    
    return inflections(locale).singularize(word);
};
exports.singularize = singularize;


function camelize(word, lowFirstLetter) {
    var parts = word.split(SPILTER),
        string = "", part, i, il;
    
    for (i = 0, il = parts.length; i < il; i++) {
        part = parts[i];
        string += part[0].toUpperCase() + part.slice(1);
    }
    
    return lowFirstLetter ? string[0].toLowerCase() + string.slice(1) : string;
};
exports.camelize = camelize;


function underscore(word) {
    
    return word.replace(UPPERCASE, "_$1").toLowerCase().replace(UNDERSCORE_PREFIX, "");
};
exports.underscore = underscore;


function dasherize(word) {
    
    return word.replace("_", "-");
};
exports.dasherize = dasherize;


function humanize(word) {
    var string = word[0].toUpperCase() + word.slice(1);
    string = string.replace(ID, "");
    
    return string.split(SPILTER).join(" ");
};
exports.humanize = humanize;


function titleize(word) {
    var parts = word.split(SPILTER),
        part, i, il;
    
    for (i = 0, il = parts.length; i < il; i++) {
        part = parts[i];
        parts[i] = part[0].toUpperCase() + part.slice(1);
    }
    
    return parts.join(" ");
};
exports.titleize = titleize;


function tableize(word, locale) {
    
    return pluralize(underscore(word), locale);
};
exports.tableize = tableize;


function classify(word, locale) {
    
    return camelize(singularize(word), locale);
};
exports.classify = classify;


function demodulize(word) {
    
    return word.split(MODULE_SPILTER).pop();
};
exports.demodulize = demodulize;


function foreignKey(word, joinedId) {
    
    return underscore(word) + (joinedId ? "id" : "_id")
};
exports.foreignKey = foreignKey;


function constantize(word) {
    var name = demodulize(word),
        constant;
    
    if ((constant = global[name])) return constant;
    if ((constant = global[camelize(name)])) return constant;
    if ((constant = global[camelize(name, true)])) return constant;
    if ((constant = global[underscore(name)])) return constant;
    
    return undefined;
};
exports.constantize = constantize;


function ordinal(num) {
    num = abs(num % 100) % 10;
    
    switch(num){
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};
exports.ordinal = ordinal;


function ordinalize(num) {

    return num + ordinal(num);
};
exports.ordinalize = ordinalize;


exports.inflections = inflections;
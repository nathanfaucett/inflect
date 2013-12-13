var inflections = require("./inflections"),

    path = require("path"),
    diveSync = require("node-util").diveSync,
    cwd = process.cwd(),
    
    SPILTER = /[ \_\-\.]+|(?=[A-Z][^A-Z])/g,
    MODULE_SPILTER = /[\. \/:]+/g,
    ID = /_id$/,
    UNDERSCORE = /([a-z\d])([A-Z])/g,
    
    abs = Math.abs;


require("./languages/en");
require("./languages/es");


function pluralize(word, locale) {
    
    return inflections(locale).pluralize(word);
};
exports.pluralize = pluralize;


function isPlural(word, locale) {
    
    return inflections(locale).isPlural(word);
};
exports.isPlural = isPlural;


function singularize(word, locale) {
    
    return inflections(locale).singularize(word);
};
exports.singularize = singularize;


function isSingular(word, locale) {
    
    return inflections(locale).isSingular(word);
};
exports.isSingular = isSingular;


function capitalize(word, allWords) {
    if (allWords) {
        var parts = word.split(SPILTER),
            string = "", part, i, il;
        
        for (i = 0, il = parts.length; i < il; i++) {
            part = parts[i];
            string += part[0].toUpperCase() + part.slice(1).toLowerCase();
        }
        
        return string;
    }
    
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
exports.capitalize = capitalize;


function camelize(word, lowFirstLetter) {
    var parts = word.split(SPILTER),
        string = "", part, i, il;
    
    for (i = 0, il = parts.length; i < il; i++) {
        part = parts[i];
        string += part[0].toUpperCase() + part.slice(1).toLowerCase();
    }
    
    return lowFirstLetter ? string[0].toLowerCase() + string.slice(1) : string;
};
exports.camelize = camelize;


function underscore(word) {
    
    return word.replace(UNDERSCORE, "$1_$2").toLowerCase();
};
exports.underscore = underscore;


function dasherize(word) {
    
    return word.replace("_", "-");
};
exports.dasherize = dasherize;


function humanize(word) {
    
    return (word[0].toUpperCase() + word.slice(1).toLowerCase()).replace(ID, "").split(SPILTER).join(" ");
};
exports.humanize = humanize;


function titleize(word) {
    var parts = word.split(SPILTER),
        part, i, il;
    
    for (i = 0, il = parts.length; i < il; i++) {
        part = parts[i];
        parts[i] = part[0].toUpperCase() + part.slice(1).toLowerCase();
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


function foreignKey(word, key, camelized, lowFirstLetter) {
    if (typeof(key) === "boolean") {
        lowFirstLetter = camelized;
        camelized = key;
        key = "id";
    }
    key = key == undefined ? "id" : key;
    lowFirstLetter = lowFirstLetter == undefined ? true : lowFirstLetter;
    
    if (camelized) return camelize(word +"_"+ key, lowFirstLetter);
    return underscore(word +"_"+ key);
};
exports.foreignKey = foreignKey;


function constantize(word) {
    var name = demodulize(word),
        constant;
    
    diveSync(cwd, function(err, file) {
        if (file.substring(cwd.length).indexOf("node_modules") !== -1) return true;
        var ext = path.extname(file),
            fileName = path.basename(file, ext);
        
        if (ext !== ".js") return true;
        
        if (word === fileName) {
            try{
                constant = require(file);
            } catch(e) {}
            
            if (constant) return false;
        }
        
        return true;
    });
    
    return constant;
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
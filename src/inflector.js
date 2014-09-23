function Inflector(locale) {

    this.locale = locale;
    this.plurals = [];
    this.singulars = [];
    this.uncountables = [];
}

Inflector.prototype.clear = function() {

    this.plurals.length = 0;
    this.singulars.length = 0;
    this.uncountables.length = 0;

    return this;
};

Inflector.prototype.uncountable = function() {
    var uncountables = this.uncountables,
        length = arguments.length,
        i = -1;

    while (++i < length) uncountables.push(arguments[i].toLowerCase());
    return this;
};

Inflector.prototype.plural = function(rule, replacement) {

    this.plurals.push([rule, replacement]);
    return this;
};

Inflector.prototype.singular = function(rule, replacement) {

    this.singulars.push([rule, replacement]);
    return this;
};

Inflector.prototype.irregular = function(singular, plural) {

    singular = singular.toLowerCase();
    plural = plural.toLowerCase();

    this.plural(new RegExp("\\b" + singular + "\\b", "i"), plural);
    this.singular(new RegExp("\\b" + plural + "\\b", "i"), singular);

    return this;
};

Inflector.prototype.pluralize = function(word) {
    var plurals = this.plurals,
        result = word,
        i = plurals.length,
        pattern;

    if (this.uncountables.indexOf(word.toLowerCase()) !== -1) return word;

    while (i--) {
        pattern = plurals[i];

        if ((result = replace(word, pattern[0], pattern[1]))) return result;
    }

    return word;
};

Inflector.prototype.isPlural = function(word) {

    return this.singularize(word) !== word;
};

Inflector.prototype.is_plural = Inflector.prototype.isPlural;

Inflector.prototype.singularize = function(word) {
    var singulars = this.singulars,
        result = word,
        i = singulars.length,
        pattern;

    if (this.uncountables.indexOf(word.toLowerCase()) !== -1) return word;

    while (i--) {
        pattern = singulars[i];

        if ((result = replace(word, pattern[0], pattern[1]))) return result;
    }

    return word;
};

Inflector.prototype.isSingular = function(word) {

    return this.pluralize(word) !== word;
};

Inflector.prototype.is_singular = Inflector.prototype.isSingular;

Inflector.prototype.toJSON = function(json) {
    json || (json = {});
    var jsonPlurals = json.plurals || (json.plurals = []),
        jsonSingulars = json.singulars || (json.singulars = []),
        jsonUncountables = json.uncountables || (json.uncountables = []),
        i;

    json.locale = this.locale;

    for (i = this.plurals.length; i--;) jsonPlurals[i] = this.plurals[i].slice();
    for (i = this.singulars.length; i--;) jsonSingulars[i] = this.singulars[i].slice();
    for (i = this.uncountables.length; i--;) jsonUncountables[i] = this.uncountables[i];

    return json;
};

Inflector.prototype.to_json = Inflector.prototype.toJSON;

Inflector.prototype.fromJSON = function(json) {
    var jsonPlurals = json.plurals,
        jsonSingulars = json.singulars,
        jsonUncountables = json.uncountables,
        i;

    this.clear();
    this.locale = json.locale;

    for (i = jsonPlurals.length; i--;) this.plurals[i] = jsonPlurals[i].slice();
    for (i = jsonSingulars.length; i--;) this.singulars[i] = jsonSingulars[i].slice();
    for (i = jsonUncountables.length; i--;) this.uncountables[i] = jsonUncountables[i];

    return this;
};

Inflector.prototype.from_json = Inflector.prototype.fromJSON;

function replace(word, rule, replacement) {

    return rule.test(word) ? word.replace(rule, replacement) : false;
}


module.exports = Inflector;

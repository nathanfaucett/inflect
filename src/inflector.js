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

Inflector.prototype.uncountable = function(word) {

    this.uncountables.push(word)
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

    this.plural(new RegExp("\\b" + singular + "\\b"), plural);
    this.singular(new RegExp("\\b" + plural + "\\b"), singular);

    return this;
};

Inflector.prototype.pluralize = function(word) {
    if (this.uncountables.indexOf(word) !== -1) return word;
    var plurals = this.plurals,
        result = word,
        pattern,
        i;

    for (i = plurals.length; i--;) {
        pattern = plurals[i];

        if ((result = replace(word, pattern[0], pattern[1]))) return result;
    }

    return word;
};

Inflector.prototype.isPlural = function(word) {

    return this.singularize(word) !== word;
};

Inflector.prototype.singularize = function(word) {
    if (this.uncountables.indexOf(word) !== -1) return word;
    var singulars = this.singulars,
        result = word,
        pattern,
        i;

    for (i = singulars.length; i--;) {
        pattern = singulars[i];

        if ((result = replace(word, pattern[0], pattern[1]))) return result;
    }

    return word;
};

Inflector.prototype.isSingular = function(word) {

    return this.pluralize(word) !== word;
};

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

function replace(word, rule, replacement) {

    return rule.test(word) ? word.replace(rule, replacement) : false;
}


module.exports = Inflector;

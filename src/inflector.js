

function Inflector(locale){
	
	this.locale = locale;
	this.plurals = [];
	this.singulars = [];
	this.uncountables = [];
}


Inflector.prototype.uncountable = function(word) {

    return this.uncountables.push(word);
};


Inflector.prototype.plural = function(rule, replacement) {

    return this.plurals.push([rule, replacement]);
};


Inflector.prototype.singular = function(rule, replacement) {

    return this.singulars.push([rule, replacement]);
};


Inflector.prototype.irregular = function(singular, plural) {

    this.plural(new RegExp("\\b" + singular + "\\b"), plural);
    this.singular(new RegExp("\\b" + plural + "\\b"), singular);
};


Inflector.prototype.pluralize = function(word) {
    if (this.uncountables.indexOf(word) !== -1) return word;
    var plurals = this.plurals,
        result = word, pattern,
        i;

    for (i = plurals.length; i--;) {
        pattern = plurals[i];

        if ((result = replace(word, pattern[0], pattern[1]))) return result;
    }

    return word;
};


Inflector.prototype.isPlural = function(word) {
    if (this.uncountables.indexOf(word) !== -1) return false;
    var plurals = this.plurals,
        result, pattern,
        i;
	
    for (i = plurals.length; i--;) {
        pattern = plurals[i];

        if ((result = pattern[0].test(word))) return result;
    }

    return false;
};


Inflector.prototype.singularize = function(word) {
    if (this.uncountables.indexOf(word) !== -1) return word;
    var singulars = this.singulars,
        result = word, pattern,
        i;
	
    for (i = singulars.length; i--;) {
        pattern = singulars[i];

        if ((result = replace(word, pattern[0], pattern[1]))) return result;
    }

    return word;
};


Inflector.prototype.isSingular = function(word) {
    if (this.uncountables.indexOf(word) !== -1) return false;
    var singulars = this.singulars,
        result, pattern,
        i;
	
    for (i = singulars.length; i--;) {
        pattern = singulars[i];

        if ((result = pattern[0].test(word))) return result;
    }

    return false;
};


function replace(word, rule, replacement) {
	
    return rule.test(word) ? word.replace(rule, replacement) : false;
}


module.exports = Inflector;
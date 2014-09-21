var Inflector = require("./inflector");


function inflections(locale) {
    locale || (locale = inflections.defaultLocale);

    return inflections.locales[locale] || (inflections.locales[locale] = new Inflector(locale));
}


inflections.locales = {};
inflections.defaultLocale = "en";


module.exports = inflections;

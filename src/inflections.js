var Inflector = require("./inflector"),
	locales = {};


function inflections(locale){
	locale || (locale = inflections.defaultLocale);
	
	return locales[locale] || (locales[locale] = new Inflector(locale));
}


inflections.locales = locales;
inflections.defaultLocale = "en";


module.exports = inflections;
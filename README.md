inflect
=====

inflect.js is a port of the functionality from Ruby on Rails' Active Support inflection classes into Javascript


##Methods##

inflect.pluralize(String [, locale]) -> "box" -> "boxes"

inflect.singularize(String [, locale]) -> "boxes" -> "box"

inflect.camelize(String [, lowFirstLetter]) -> "hello_world" -> "HelloWorld"

inflect.underscore(String) -> "HelloWorld" -> "hello_world"

inflect.dasherize(String) -> "hello_world" -> "hello-world"

inflect.humanize(String) -> "box_id" -> "Box"

inflect.titleize(String) -> "title.of_the/app" -> "Title Of The App"

inflect.tableize(String [, locale]) -> "Box" -> "boxes"

inflect.classify(String [, locale]) -> "boxes" -> "Box"

inflect.demodulize(String) -> "Module::Name/file" -> file

inflect.foreignKey(String [, key] [, camelized] [, lowFirstLetter]) -> returns string_key || stringKey || StringKey

inflect.constantize(String) -> dives into directories looking for module, excludes node_modules in search

inflect.ordinal(Number) -> st, nd, rd, th

inflect.ordinalize(Number) -> 1st, 2nd, 3nd, ...th


##Inflections##

var en = inflect.inflections("en"); //returns "en" Inflector or creates new if not defined

en.plural(rule, replacement);

en.singular(rule, replacement);

en.irregular(singular, plural);

en.uncountable(word);
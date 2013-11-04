inflect
=====

inflect.js is a port of the functionality from Ruby on Rails' Active Support inflection classes into Javascript


##Methods##

pluralize(String, locale) -> "box" -> "boxes"

singularize(String, locale) -> "boxes" -> "box"

camelize(String, lowFirstLetter) -> "hello_world" -> "HelloWorld"

underscore(String) -> "HelloWorld" -> "hello_world"

dasherize(String) -> "hello_world" -> "hello-world"

humanize(String) -> "box_id" -> "Box"

titleize(String) -> "title.of_the/app" -> "Title Of The App"

tableize(String, locale) -> "Box" -> "boxes"

classify(String, locale) -> "Boxes" -> "box"

demodulize(String) -> "Module::Name/file" -> file

foreignKey(String [, joinedId]) -> returns word_id or wordid

ordinal(Number) -> st, nd, nd, th

ordinalize(Number) -> 1st, 2nd, 3nd, ...th

##Inflections##

var en = inflections("en"); //returns "en" Inflector or creates new if not defined

en.plural(rule, replacement);

en.singular(rule, replacement);

en.irregular(singular, plural);

en.uncountable(word);
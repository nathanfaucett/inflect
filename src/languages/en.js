var inflect = require("../inflections")("en");

inflect.plural(/$/, "s");
inflect.plural(/(ch|sh|ss|[sxz])$/i, "$1es");
inflect.plural(/([^aeiouy])y$/i, "$1ies");

inflect.singular(/s$/i, "");
inflect.singular(/(ch|sh|ss|[sxz])es$/i, "$1");
inflect.singular(/([^aeiouy])ies$/i, "$1y");

inflect.irregular("child", "children");
inflect.irregular("person", "people");
inflect.irregular("self", "selves");
inflect.irregular("man", "men");
inflect.irregular("woman", "women");

inflect.uncountable("equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "jeans", "police");

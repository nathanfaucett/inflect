var inflect = require("../inflections")("en");

inflect.plural(/$/, "s");
inflect.plural(/(ss)$/i, "$1es");
inflect.plural(/([xz]|[cs]h)$/i, "$1es");
inflect.plural(/([^aeiouy]o)$/i, "$1es");
inflect.plural(/([^aeiouy])y$/i, "$1ies");

inflect.singular(/s$/i, "");
inflect.singular(/(ss)$/i, "$1");
inflect.singular(/([sxz]|[cs]h)es$/i, "$1");
inflect.singular(/([^aeiouy]o)es$/i, "$1");
inflect.singular(/([^aeiouy])ies$/i, "$1y");

inflect.irregular("child", "children");
inflect.irregular("person", "people");
inflect.irregular("self", "selves");

inflect.uncountable("equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "jeans", "police");

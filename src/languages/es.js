var inflect = require("../inflections")("es");

inflect.plural(/$/, "s");
inflect.plural(/([^aeéiou])$/i, "$1es");
inflect.plural(/([aeiou]s)$/i, "$1");
inflect.plural(/z$/i, "ces");
inflect.plural(/á([sn])$/i, "a$1es");
inflect.plural(/é([sn])$/i, "e$1es");
inflect.plural(/í([sn])$/i, "i$1es");
inflect.plural(/ó([sn])$/i, "o$1es");
inflect.plural(/ú([sn])$/i, "u$1es");

inflect.singular(/s$/i, "");
inflect.singular(/es$/i, "");

inflect.irregular("el", "los");

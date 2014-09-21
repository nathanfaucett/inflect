var inflect = require("../inflections")("fr");

inflect.plural(/$/, "s");
inflect.singular(/s$/i, "");

inflect.plural(/(bijou|caillou|chou|genou|hibou|joujou|pou|au|eu|eau)$/i, "$1x");
inflect.singular(/(bijou|caillou|chou|genou|hibou|joujou|pou|au|eu|eau)x$/i, "$1");

inflect.plural(/(bleu|émeu|landau|lieu|pneu|sarrau)$/i, "$1s");
inflect.plural(/al$/i, "aux");
inflect.plural(/ail$/i, "ails");
inflect.singular(/(journ|chev)aux$/i, "$1al");
inflect.singular(/ails$/i, "ail");

inflect.plural(/(b|cor|ém|gemm|soupir|trav|vant|vitr)ail$/i, "$1aux");
inflect.singular(/(b|cor|ém|gemm|soupir|trav|vant|vitr)aux$/i, "$1ail");

inflect.plural(/(s|x|z)$/i, "$1");

inflect.irregular("monsieur", "messieurs");
inflect.irregular("madame", "mesdames");
inflect.irregular("mademoiselle", "mesdemoiselles");

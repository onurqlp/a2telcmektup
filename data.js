"use strict";

// AYDA A1-A2 ana gramer referansının tarayıcıda kullanılan veri katmanı.
// Bu dosya yalnız veri içerir; kontrol ve false-positive kararları script.js içindedir.
globalThis.AYDA_GRAMMAR_DATA = Object.freeze({
  version: "2.0",
  level: "A1-A2",
  confidence: Object.freeze({ HIGH: "high", MEDIUM: "medium", LOW: "low" }),
  severity: Object.freeze({ ERROR: "ERROR", IMPROVEMENT: "IMPROVEMENT", INFO: "INFO" }),

  verbForms: Object.freeze({
    sein: { ich: "bin", du: "bist", er: "ist", es: "ist", wir: "sind", ihr: "seid", Sie: "sind" },
    haben: { ich: "habe", du: "hast", er: "hat", es: "hat", wir: "haben", ihr: "habt", Sie: "haben" },
    werden: { ich: "werde", du: "wirst", er: "wird", es: "wird", wir: "werden", ihr: "werdet", Sie: "werden" },
    kommen: { ich: "komme", du: "kommst", er: "kommt", es: "kommt", wir: "kommen", ihr: "kommt", Sie: "kommen" },
    gehen: { ich: "gehe", du: "gehst", er: "geht", es: "geht", wir: "gehen", ihr: "geht", Sie: "gehen" },
    fahren: { ich: "fahre", du: "fährst", er: "fährt", es: "fährt", wir: "fahren", ihr: "fahrt", Sie: "fahren" },
    machen: { ich: "mache", du: "machst", er: "macht", es: "macht", wir: "machen", ihr: "macht", Sie: "machen" },
    lernen: { ich: "lerne", du: "lernst", er: "lernt", es: "lernt", wir: "lernen", ihr: "lernt", Sie: "lernen" },
    wohnen: { ich: "wohne", du: "wohnst", er: "wohnt", es: "wohnt", wir: "wohnen", ihr: "wohnt", Sie: "wohnen" },
    fragen: { ich: "frage", du: "fragst", er: "fragt", es: "fragt", wir: "fragen", ihr: "fragt", Sie: "fragen" },
    arbeiten: { ich: "arbeite", du: "arbeitest", er: "arbeitet", es: "arbeitet", wir: "arbeiten", ihr: "arbeitet", Sie: "arbeiten" },
    reden: { ich: "rede", du: "redest", er: "redet", es: "redet", wir: "reden", ihr: "redet", Sie: "reden" },
    warten: { ich: "warte", du: "wartest", er: "wartet", es: "wartet", wir: "warten", ihr: "wartet", Sie: "warten" },
    finden: { ich: "finde", du: "findest", er: "findet", es: "findet", wir: "finden", ihr: "findet", Sie: "finden" },
    reisen: { ich: "reise", du: "reist", er: "reist", es: "reist", wir: "reisen", ihr: "reist", Sie: "reisen" },
    heißen: { ich: "heiße", du: "heißt", er: "heißt", es: "heißt", wir: "heißen", ihr: "heißt", Sie: "heißen" },
    tanzen: { ich: "tanze", du: "tanzt", er: "tanzt", es: "tanzt", wir: "tanzen", ihr: "tanzt", Sie: "tanzen" },
    bringen: { ich: "bringe", du: "bringst", er: "bringt", es: "bringt", wir: "bringen", ihr: "bringt", Sie: "bringen" },
    helfen: { ich: "helfe", du: "hilfst", er: "hilft", es: "hilft", wir: "helfen", ihr: "helft", Sie: "helfen" },
    brauchen: { ich: "brauche", du: "brauchst", er: "braucht", es: "braucht", wir: "brauchen", ihr: "braucht", Sie: "brauchen" },
    möchten: { ich: "möchte", du: "möchtest", er: "möchte", es: "möchte", wir: "möchten", ihr: "möchtet", Sie: "möchten" },
    mögen: { ich: "mag", du: "magst", er: "mag", es: "mag", wir: "mögen", ihr: "mögt", Sie: "mögen" },
    wollen: { ich: "will", du: "willst", er: "will", es: "will", wir: "wollen", ihr: "wollt", Sie: "wollen" },
    können: { ich: "kann", du: "kannst", er: "kann", es: "kann", wir: "können", ihr: "könnt", Sie: "können" },
    müssen: { ich: "muss", du: "musst", er: "muss", es: "muss", wir: "müssen", ihr: "müsst", Sie: "müssen" },
    dürfen: { ich: "darf", du: "darfst", er: "darf", es: "darf", wir: "dürfen", ihr: "dürft", Sie: "dürfen" },
    sollen: { ich: "soll", du: "sollst", er: "soll", es: "soll", wir: "sollen", ihr: "sollt", Sie: "sollen" },
    wissen: { ich: "weiß", du: "weißt", er: "weiß", es: "weiß", wir: "wissen", ihr: "wisst", Sie: "wissen" },
    lesen: { ich: "lese", du: "liest", er: "liest", es: "liest", wir: "lesen", ihr: "lest", Sie: "lesen" },
    sehen: { ich: "sehe", du: "siehst", er: "sieht", es: "sieht", wir: "sehen", ihr: "seht", Sie: "sehen" },
    sprechen: { ich: "spreche", du: "sprichst", er: "spricht", es: "spricht", wir: "sprechen", ihr: "sprecht", Sie: "sprechen" },
    nehmen: { ich: "nehme", du: "nimmst", er: "nimmt", es: "nimmt", wir: "nehmen", ihr: "nehmt", Sie: "nehmen" },
    geben: { ich: "gebe", du: "gibst", er: "gibt", es: "gibt", wir: "geben", ihr: "gebt", Sie: "geben" },
    treffen: { ich: "treffe", du: "triffst", er: "trifft", es: "trifft", wir: "treffen", ihr: "trefft", Sie: "treffen" },
    essen: { ich: "esse", du: "isst", er: "isst", es: "isst", wir: "essen", ihr: "esst", Sie: "essen" },
    schlafen: { ich: "schlafe", du: "schläfst", er: "schläft", es: "schläft", wir: "schlafen", ihr: "schlaft", Sie: "schlafen" },
    laufen: { ich: "laufe", du: "läufst", er: "läuft", es: "läuft", wir: "laufen", ihr: "lauft", Sie: "laufen" },
    tragen: { ich: "trage", du: "trägst", er: "trägt", es: "trägt", wir: "tragen", ihr: "tragt", Sie: "tragen" },
    waschen: { ich: "wasche", du: "wäschst", er: "wäscht", es: "wäscht", wir: "waschen", ihr: "wascht", Sie: "waschen" },
    vergessen: { ich: "vergesse", du: "vergisst", er: "vergisst", es: "vergisst", wir: "vergessen", ihr: "vergesst", Sie: "vergessen" },
    schreiben: { ich: "schreibe", du: "schreibst", er: "schreibt", es: "schreibt", wir: "schreiben", ihr: "schreibt", Sie: "schreiben" },
    antworten: { ich: "antworte", du: "antwortest", er: "antwortet", es: "antwortet", wir: "antworten", ihr: "antwortet", Sie: "antworten" },
    besuchen: { ich: "besuche", du: "besuchst", er: "besucht", es: "besucht", wir: "besuchen", ihr: "besucht", Sie: "besuchen" },
    bleiben: { ich: "bleibe", du: "bleibst", er: "bleibt", es: "bleibt", wir: "bleiben", ihr: "bleibt", Sie: "bleiben" },
    übernachten: { ich: "übernachte", du: "übernachtest", er: "übernachtet", es: "übernachtet", wir: "übernachten", ihr: "übernachtet", Sie: "übernachten" },
    kaufen: { ich: "kaufe", du: "kaufst", er: "kauft", es: "kauft", wir: "kaufen", ihr: "kauft", Sie: "kaufen" },
    kosten: { ich: "koste", du: "kostest", er: "kostet", es: "kostet", wir: "kosten", ihr: "kostet", Sie: "kosten" },
    beginnen: { ich: "beginne", du: "beginnst", er: "beginnt", es: "beginnt", wir: "beginnen", ihr: "beginnt", Sie: "beginnen" },
    enden: { ich: "ende", du: "endest", er: "endet", es: "endet", wir: "enden", ihr: "endet", Sie: "enden" },
    verschieben: { ich: "verschiebe", du: "verschiebst", er: "verschiebt", es: "verschiebt", wir: "verschieben", ihr: "verschiebt", Sie: "verschieben" },
    feiern: { ich: "feiere", du: "feierst", er: "feiert", es: "feiert", wir: "feiern", ihr: "feiert", Sie: "feiern" },
    trinken: { ich: "trinke", du: "trinkst", er: "trinkt", es: "trinkt", wir: "trinken", ihr: "trinkt", Sie: "trinken" },
    lieben: { ich: "liebe", du: "liebst", er: "liebt", es: "liebt", wir: "lieben", ihr: "liebt", Sie: "lieben" },
    schicken: { ich: "schicke", du: "schickst", er: "schickt", es: "schickt", wir: "schicken", ihr: "schickt", Sie: "schicken" }
  }),

  separableVerbs: Object.freeze({
    mitbringen: { particle: "mit", forms: { ich: "bringe", du: "bringst", er: "bringt", es: "bringt", wir: "bringen", ihr: "bringt", Sie: "bringen" } },
    ankommen: { particle: "an", forms: { ich: "komme", du: "kommst", er: "kommt", es: "kommt", wir: "kommen", ihr: "kommt", Sie: "kommen" } },
    abholen: { particle: "ab", forms: { ich: "hole", du: "holst", er: "holt", es: "holt", wir: "holen", ihr: "holt", Sie: "holen" } },
    anrufen: { particle: "an", forms: { ich: "rufe", du: "rufst", er: "ruft", es: "ruft", wir: "rufen", ihr: "ruft", Sie: "rufen" } },
    einladen: { particle: "ein", forms: { ich: "lade", du: "lädst", er: "lädt", es: "lädt", wir: "laden", ihr: "ladet", Sie: "laden" } },
    aufstehen: { particle: "auf", forms: { ich: "stehe", du: "stehst", er: "steht", es: "steht", wir: "stehen", ihr: "steht", Sie: "stehen" } },
    mitkommen: { particle: "mit", forms: { ich: "komme", du: "kommst", er: "kommt", es: "kommt", wir: "kommen", ihr: "kommt", Sie: "kommen" } },
    zurückkommen: { particle: "zurück", forms: { ich: "komme", du: "kommst", er: "kommt", es: "kommt", wir: "kommen", ihr: "kommt", Sie: "kommen" } },
    vorbeikommen: { particle: "vorbei", forms: { ich: "komme", du: "kommst", er: "kommt", es: "kommt", wir: "kommen", ihr: "kommt", Sie: "kommen" } },
    aufmachen: { particle: "auf", forms: { ich: "mache", du: "machst", er: "macht", es: "macht", wir: "machen", ihr: "macht", Sie: "machen" } },
    zumachen: { particle: "zu", forms: { ich: "mache", du: "machst", er: "macht", es: "macht", wir: "machen", ihr: "macht", Sie: "machen" } },
    einkaufen: { particle: "ein", forms: { ich: "kaufe", du: "kaufst", er: "kauft", es: "kauft", wir: "kaufen", ihr: "kauft", Sie: "kaufen" }, semanticTailOptional: true }
  }),

  participles: Object.freeze({
    machen: { form: "gemacht", auxiliary: "haben" }, lernen: { form: "gelernt", auxiliary: "haben" }, arbeiten: { form: "gearbeitet", auxiliary: "haben" },
    fragen: { form: "gefragt", auxiliary: "haben" }, kaufen: { form: "gekauft", auxiliary: "haben" }, besuchen: { form: "besucht", auxiliary: "haben" },
    sagen: { form: "gesagt", auxiliary: "haben" }, wohnen: { form: "gewohnt", auxiliary: "haben" }, spielen: { form: "gespielt", auxiliary: "haben" },
    sehen: { form: "gesehen", auxiliary: "haben" }, lesen: { form: "gelesen", auxiliary: "haben" }, essen: { form: "gegessen", auxiliary: "haben" },
    trinken: { form: "getrunken", auxiliary: "haben" }, sprechen: { form: "gesprochen", auxiliary: "haben" }, helfen: { form: "geholfen", auxiliary: "haben" },
    nehmen: { form: "genommen", auxiliary: "haben" }, geben: { form: "gegeben", auxiliary: "haben" }, schreiben: { form: "geschrieben", auxiliary: "haben" },
    treffen: { form: "getroffen", auxiliary: "haben" }, finden: { form: "gefunden", auxiliary: "haben" }, bringen: { form: "gebracht", auxiliary: "haben" },
    denken: { form: "gedacht", auxiliary: "haben" }, wissen: { form: "gewusst", auxiliary: "haben" }, beginnen: { form: "begonnen", auxiliary: "haben" },
    schlafen: { form: "geschlafen", auxiliary: "haben" }, feiern: { form: "gefeiert", auxiliary: "haben" }, anrufen: { form: "angerufen", auxiliary: "haben" }, abholen: { form: "abgeholt", auxiliary: "haben" },
    mitbringen: { form: "mitgebracht", auxiliary: "haben" }, einladen: { form: "eingeladen", auxiliary: "haben" }, bekommen: { form: "bekommen", auxiliary: "haben" },
    verstehen: { form: "verstanden", auxiliary: "haben" }, erzählen: { form: "erzählt", auxiliary: "haben" }, verkaufen: { form: "verkauft", auxiliary: "haben" },
    gehen: { form: "gegangen", auxiliary: "sein" }, kommen: { form: "gekommen", auxiliary: "sein" }, bleiben: { form: "geblieben", auxiliary: "sein" },
    ankommen: { form: "angekommen", auxiliary: "sein" }, aufstehen: { form: "aufgestanden", auxiliary: "sein" },
    fahren: { form: "gefahren", auxiliary: "sein", confidence: "low", note: "Nesneyle kullanıldığında haben mümkün olabilir." }
  }),

  nounGender: Object.freeze({
    Kurs: "m", Termin: "m", Arzt: "m", Bahnhof: "m", Bus: "m", Freund: "m", Bruder: "m", Geburtstag: "m", Samstag: "m", Sonntag: "m", Montag: "m", Preis: "m", Urlaub: "m", Zug: "m", Lehrer: "m", Park: "m", Kaffee: "m", Kuchen: "m", Schrank: "m", Tisch: "m", Abend: "m", Morgen: "m", Monat: "m", Unterricht: "m", Salat: "m",
    Party: "f", Einladung: "f", Freundin: "f", Schwester: "f", Schule: "f", Reise: "f", Antwort: "f", Hilfe: "f", Wohnung: "f", Unterkunft: "f", Information: "f", Sprache: "f", Zeit: "f", Frage: "f", Lehrerin: "f", Familie: "f", Stadt: "f", Adresse: "f", "E-Mail": "f", Nachricht: "f", Prüfung: "f", Woche: "f", Anmeldung: "f", Mutter: "f", Medizin: "f",
    Geschenk: "n", Hotel: "n", Wochenende: "n", Auto: "n", Essen: "n", Problem: "n", Zimmer: "n", Treffen: "n", Wetter: "n", Fahrrad: "n", Buch: "n", Kind: "n", Geld: "n", Datum: "n", Formular: "n", Kino: "n", Café: "n"
  }),

  articleDeclension: Object.freeze({
    accusative: {
      m: { der: "den", ein: "einen", kein: "keinen" },
      f: { die: "die", eine: "eine", keine: "keine" },
      n: { das: "das", ein: "ein", kein: "kein" }
    },
    dative: {
      m: { der: "dem", ein: "einem", kein: "keinem" },
      f: { die: "der", eine: "einer", keine: "keiner" },
      n: { das: "dem", ein: "einem", kein: "keinem" },
      p: { die: "den", keine: "keinen" }
    }
  }),

  possessiveDeclension: Object.freeze({
    nominativeFeminine: { mein: "meine", dein: "deine", sein: "seine", ihr: "ihre", unser: "unsere", euer: "eure", Ihr: "Ihre" },
    accusativeMasculine: { mein: "meinen", meine: "meinen", dein: "deinen", deine: "deinen", sein: "seinen", seine: "seinen", ihr: "ihren", ihre: "ihren", unser: "unseren", unsere: "unseren", euer: "euren", eure: "euren", Ihr: "Ihren", Ihre: "Ihren" },
    dativeMasculineNeuter: { mein: "meinem", meine: "meinem", meinen: "meinem", dein: "deinem", deine: "deinem", deinen: "deinem", sein: "seinem", seine: "seinem", seinen: "seinem", ihr: "ihrem", ihre: "ihrem", ihren: "ihrem", unser: "unserem", unsere: "unserem", euer: "eurem", eure: "eurem", Ihr: "Ihrem", Ihre: "Ihrem" },
    dativeFeminine: { mein: "meiner", meine: "meiner", meinen: "meiner", dein: "deiner", deine: "deiner", deinen: "deiner", sein: "seiner", seine: "seiner", seinen: "seiner", ihr: "ihrer", ihre: "ihrer", ihren: "ihrer", unser: "unserer", unsere: "unserer", euer: "eurer", eure: "eurer", Ihr: "Ihrer", Ihre: "Ihrer" }
  }),

  pronouns: Object.freeze({
    nominative: ["ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "Sie"],
    accusative: ["mich", "dich", "ihn", "sie", "es", "uns", "euch", "sie", "Sie"],
    dative: ["mir", "dir", "ihm", "ihr", "ihm", "uns", "euch", "ihnen", "Ihnen"],
    accusativeToDative: { mich: "mir", dich: "dir", ihn: "ihm" },
    nominativeToDative: { ich: "mir", du: "dir", er: "ihm" }
  }),

  prepositionCases: Object.freeze({
    dative: ["aus", "bei", "mit", "nach", "seit", "von", "zu"],
    accusative: ["durch", "für", "gegen", "ohne", "um"],
    twoWay: ["an", "auf", "hinter", "in", "neben", "über", "unter", "vor", "zwischen"]
  }),
  dativeVerbs: Object.freeze(["helfen", "antworten", "schreiben", "danken"]),
  subordinateConjunctions: Object.freeze(["weil", "dass", "wenn"]),
  coordinatingConjunctions: Object.freeze(["denn", "aber", "und", "oder"]),

  spellingCorrections: Object.freeze({
    wonen: "wohnen", wohnnen: "wohnen", raisen: "reisen", apholen: "abholen", apfholen: "abholen", geshchenk: "Geschenk", geschenkck: "Geschenk", bannhof: "Bahnhof", fraage: "Frage", termien: "Termin", gesuntheit: "Gesundheit", krankeit: "Krankheit", shule: "Schule", wonung: "Wohnung", fraitag: "Freitag", samstagg: "Samstag", mondag: "Montag", dinstag: "Dienstag", kursse: "Kurse", proplem: "Problem", leidar: "leider", wieviel: "wie viel", bischen: "bisschen", vergesen: "vergessen", gelert: "gelernt", gearbeiten: "gearbeitet", gelearnt: "gelernt", angeruft: "angerufen", abgeholtet: "abgeholt", mitgebrachtet: "mitgebracht", eingeladet: "eingeladen", gefundet: "gefunden", gewusstet: "gewusst", genohmen: "genommen", gesprecht: "gesprochen", getrinkt: "getrunken", gelest: "gelesen", getrefft: "getroffen", ankekommen: "angekommen", aufgestehen: "aufgestanden", eimal: "einmal", einkaüfen: "einkaufen", nachrichtt: "Nachricht", prüfungg: "Prüfung", email: "E-Mail", e_mail: "E-Mail", formularr: "Formular", zimer: "Zimmer", weterr: "Wetter", gelt: "Geld", datumm: "Datum"
  }),

  registerRules: Object.freeze({
    formal: [
      { from: "Kannst du", to: "Können Sie" }, { from: "Hast du", to: "Haben Sie" }, { from: "Möchtest du", to: "Möchten Sie" },
      { from: "Schreibst du", to: "Schreiben Sie" }, { from: "deine E-Mail", to: "Ihre E-Mail" }, { from: "deine Nachricht", to: "Ihre Nachricht" }
    ],
    informal: [
      { from: "Können Sie", to: "Kannst du" }, { from: "Haben Sie", to: "Hast du" }, { from: "Möchten Sie", to: "Möchtest du" },
      { from: "Schreiben Sie", to: "Schreibst du" }, { from: "Ihre E-Mail", to: "deine E-Mail" }, { from: "Ihre Nachricht", to: "deine Nachricht" }
    ]
  })
});

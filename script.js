"use strict";

const STORAGE_KEY = "ayda_telc_a2_progress_v1";
const TASK_SECONDS = 15 * 60;
const grammarReference = globalThis.AYDA_GRAMMAR_DATA || {};

const phraseBank = {
  greetingInformal: [
    { id: "greet-liebe", text: "Liebe Anna,", tr: "Sevgili Anna," },
    { id: "greet-lieber", text: "Lieber Peter,", tr: "Sevgili Peter," },
    { id: "greet-hallo", text: "Hallo Lisa,", tr: "Merhaba Lisa," }
  ],
  greetingFormal: [
    { id: "greet-damen", text: "Sehr geehrte Damen und Herren,", tr: "Sayın Yetkili," },
    { id: "greet-frau", text: "Sehr geehrte Frau Müller,", tr: "Sayın Bayan Müller," },
    { id: "greet-herr", text: "Sehr geehrter Herr Weber,", tr: "Sayın Bay Weber," }
  ],
  thanks: [
    { id: "thanks-mail", text: "Vielen Dank für deine E-Mail.", tr: "E-mailin için çok teşekkürler." },
    { id: "thanks-invite", text: "Vielen Dank für deine Einladung.", tr: "Davetin için çok teşekkürler." },
    { id: "thanks-help", text: "Vielen Dank für deine Hilfe.", tr: "Yardımın için çok teşekkürler." }
  ],
  invitation: [
    { id: "invite-party", text: "Ich komme gern zu deiner Party.", tr: "Partine severek gelirim." },
    { id: "invite-friend", text: "Kann ich einen Freund mitbringen?", tr: "Bir arkadaş getirebilir miyim?" },
    { id: "invite-when", text: "Wann beginnt die Party?", tr: "Parti ne zaman başlıyor?" }
  ],
  acceptance: [
    { id: "accept-glad", text: "Ich komme sehr gern.", tr: "Severek gelirim." },
    { id: "accept-time", text: "Am Samstag um 14 Uhr habe ich Zeit.", tr: "Cumartesi saat 14'te vaktim var." },
    { id: "accept-join", text: "Ich möchte gern mitkommen.", tr: "Ben de gelmek isterim." }
  ],
  decline: [
    { id: "decline-sorry", text: "Leider kann ich nicht kommen.", tr: "Maalesef gelemiyorum." },
    { id: "decline-apology", text: "Es tut mir leid.", tr: "Üzgünüm." },
    { id: "decline-other", text: "Können wir uns an einem anderen Tag treffen?", tr: "Başka bir gün buluşabilir miyiz?" }
  ],
  reason: [
    { id: "reason-appointment", text: "Ich habe einen wichtigen Termin.", tr: "Önemli bir randevum var." },
    { id: "reason-work", text: "Ich muss leider arbeiten.", tr: "Maalesef çalışmam gerekiyor." },
    { id: "reason-sick", text: "Ich bin leider krank.", tr: "Maalesef hastayım." }
  ],
  meeting: [
    { id: "meet-where", text: "Wo wollen wir uns treffen?", tr: "Nerede buluşalım?" },
    { id: "meet-station", text: "Wir können uns am Bahnhof treffen.", tr: "Tren garında buluşabiliriz." },
    { id: "meet-time", text: "Passt dir Samstag um 15 Uhr?", tr: "Cumartesi saat 15 sana uyar mı?" }
  ],
  time: [
    { id: "time-saturday", text: "Ich komme am Samstag um 14 Uhr.", tr: "Cumartesi saat 14'te geliyorum." },
    { id: "time-until", text: "Ich kann bis 18 Uhr bleiben.", tr: "Saat 18'e kadar kalabilirim." },
    { id: "time-begin", text: "Um wie viel Uhr beginnt der Kurs?", tr: "Kurs saat kaçta başlıyor?" }
  ],
  travel: [
    { id: "travel-train", text: "Ich komme mit dem Zug.", tr: "Trenle geliyorum." },
    { id: "travel-arrive", text: "Ich komme um 17 Uhr an.", tr: "Saat 17'de varıyorum." },
    { id: "travel-pickup", text: "Kannst du mich am Bahnhof abholen?", tr: "Beni gardan alabilir misin?" },
    { id: "travel-overnight", text: "Kann ich bei dir übernachten?", tr: "Sende geceleyebilir miyim?" },
    { id: "travel-night", text: "Ich bleibe eine Nacht.", tr: "Bir gece kalıyorum." }
  ],
  help: [
    { id: "help-ask", text: "Kannst du mir bitte helfen?", tr: "Bana yardım edebilir misin?" },
    { id: "help-bring", text: "Ich bringe mein Auto mit.", tr: "Arabamı getiriyorum." },
    { id: "help-hours", text: "Ich kann drei Stunden helfen.", tr: "Üç saat yardım edebilirim." }
  ],
  doctor: [
    { id: "doctor-go", text: "Ich muss zum Arzt gehen.", tr: "Doktora gitmem gerekiyor." },
    { id: "doctor-appointment", text: "Ich habe morgen einen Arzttermin.", tr: "Yarın doktor randevum var." },
    { id: "doctor-medicine", text: "Kannst du bitte Medikamente kaufen?", tr: "İlaç alabilir misin?" }
  ],
  course: [
    { id: "course-interest", text: "Ich interessiere mich für Ihren Deutschkurs.", tr: "Almanca kursunuzla ilgileniyorum." },
    { id: "course-start", text: "Wann beginnt der Kurs?", tr: "Kurs ne zaman başlıyor?" },
    { id: "course-level", text: "Ist der Kurs für Anfänger?", tr: "Kurs yeni başlayanlar için mi?" }
  ],
  price: [
    { id: "price-course", text: "Wie viel kostet der Kurs?", tr: "Kurs ne kadar?" },
    { id: "price-material", text: "Sind die Bücher im Preis?", tr: "Kitaplar fiyata dahil mi?" },
    { id: "price-pay", text: "Kann ich monatlich bezahlen?", tr: "Aylık ödeme yapabilir miyim?" }
  ],
  request: [
    { id: "request-info", text: "Bitte schicken Sie mir weitere Informationen.", tr: "Lütfen bana daha fazla bilgi gönderin." },
    { id: "request-answer", text: "Bitte antworte mir.", tr: "Lütfen bana cevap ver." },
    { id: "request-call", text: "Ruf mich bitte an.", tr: "Lütfen beni ara." }
  ],
  question: [
    { id: "question-address", text: "Wie ist deine neue Adresse?", tr: "Yeni adresin nedir?" },
    { id: "question-bring", text: "Was soll ich mitbringen?", tr: "Ne getireyim?" },
    { id: "question-plan", text: "Was wollen wir zusammen machen?", tr: "Birlikte ne yapmak istiyoruz?" }
  ],
  food: [
    { id: "food-bring", text: "Ich bringe einen Salat mit.", tr: "Bir salata getiriyorum." },
    { id: "food-vegetarian", text: "Gibt es auch vegetarisches Essen?", tr: "Vejetaryen yemek de var mı?" },
    { id: "food-cook", text: "Ich möchte gern kochen lernen.", tr: "Yemek yapmayı öğrenmek istiyorum." }
  ],
  gift: [
    { id: "gift-buy", text: "Ich kaufe ein Geschenk.", tr: "Bir hediye alıyorum." },
    { id: "gift-idea", text: "Hast du eine Geschenkidee?", tr: "Hediye fikrin var mı?" },
    { id: "gift-together", text: "Wollen wir das Geschenk zusammen kaufen?", tr: "Hediyeyi birlikte alalım mı?" }
  ],
  closingInformal: [
    { id: "close-liebe", text: "Liebe Grüße", tr: "Sevgiler" },
    { id: "close-viele", text: "Viele Grüße", tr: "Selamlar" },
    { id: "close-bald", text: "Bis bald", tr: "Yakında görüşürüz" }
  ],
  closingFormal: [
    { id: "close-formal", text: "Mit freundlichen Grüßen", tr: "Saygılarımla" }
  ]
};

const phrasesById = Object.values(phraseBank)
  .flat()
  .reduce((map, phrase) => {
    map[phrase.id] = phrase;
    return map;
  }, {});

const phraseGuideGroups = [
  {
    id: "start",
    label: "Mektuba başlarken",
    purpose: "Hitap et, selam ver ve teşekkür et.",
    categories: ["greetingInformal", "greetingFormal", "thanks"]
  },
  {
    id: "accept",
    label: "Kabul ederken ve davete cevap verirken",
    purpose: "Geleceğini veya katılmak istediğini söyle.",
    categories: ["invitation", "acceptance"]
  },
  {
    id: "decline",
    label: "Gelemeyeceğini söylerken",
    purpose: "Kibarca reddet ve kısa bir neden ver.",
    categories: ["decline", "reason"]
  },
  {
    id: "plan",
    label: "Saat, gün ve buluşma yeri verirken",
    purpose: "Ne zaman ve nerede buluşacağınızı yaz.",
    categories: ["meeting", "time"]
  },
  {
    id: "travel",
    label: "Yolculuk ve varış hakkında yazarken",
    purpose: "Nasıl geleceğini, varış saatini ve karşılamayı anlat.",
    categories: ["travel"]
  },
  {
    id: "help",
    label: "Yardım ve hastalık hakkında yazarken",
    purpose: "Yardım iste, hastalığını veya doktor randevunu söyle.",
    categories: ["help", "doctor"]
  },
  {
    id: "course",
    label: "Kurs ve fiyat sorarken",
    purpose: "Kurs başlangıcını, seviyeyi, fiyatı ve kaydı sor.",
    categories: ["course", "price"]
  },
  {
    id: "question",
    label: "Soru sorarken ve rica ederken",
    purpose: "Bilgi iste veya karşı tarafın cevap vermesini rica et.",
    categories: ["question", "request"]
  },
  {
    id: "daily",
    label: "Yemek ve hediye hakkında yazarken",
    purpose: "Ne getireceğini veya hangi hediyeyi alacağını söyle.",
    categories: ["food", "gift"]
  },
  {
    id: "close",
    label: "Mektubu bitirirken",
    purpose: "Samimi veya resmî uygun bir kapanış seç.",
    categories: ["closingInformal", "closingFormal"]
  }
];

function point(id, label, keywords, phrases, intentPatterns, hint, example) {
  return { id, label, keywords, phrases, intentPatterns, hint, example };
}

const tasks = [
  {
    id: 1,
    title: "Aufgabe 01",
    topic: "Geburtstag / Einladung",
    situation: "Deine Freundin Julia feiert am Sonntag Geburtstag. Sie hat dich zu ihrer Party eingeladen.",
    instruction: "Schreibe Julia eine E-Mail.",
    points: [
      point("accept", "ob du zur Party kommst", ["komme", "kommen", "party", "dabei"], ["komme gern", "gern kommen"], ["ich (?:komme|bin)"], "Yönünü net söyle: geliyor musun?", "Ich komme sehr gern zu deiner Party."),
      point("time", "wann du kommen kannst", ["sonntag", "uhr", "mittag", "abend", "zeit"], ["am sonntag", "um 16 uhr"], ["(?:am|um) .{0,18}(?:uhr|sonntag)"], "Geleceğin günü veya saati yaz.", "Ich komme am Sonntag um 16 Uhr."),
      point("bring", "was du mitbringst", ["bringe", "mitbringen", "kuchen", "salat", "getränk", "geschenk"], ["ich bringe", "bringe einen"], ["bring(?:e|en).{0,20}(?:mit|kuchen|geschenk)"], "Yanında ne getireceğini yaz.", "Ich bringe einen Kuchen mit."),
      point("guest", "ob du jemanden mitbringen darfst", ["freund", "freundin", "jemand", "mitbringen"], ["einen freund mitbringen", "meine freundin mitbringen"], ["kann|darf.{0,25}mitbringen", "mitbringen\?"], "Bir arkadaş getirip getiremeyeceğini sor.", "Darf ich meine Freundin mitbringen?")
    ],
    recommendedPhraseIds: ["greet-liebe", "thanks-invite", "invite-party", "time-saturday", "invite-friend", "question-bring", "close-liebe"],
    sampleAnswer: "Liebe Julia,\n\nvielen Dank für deine Einladung. Ich komme sehr gern zu deiner Party. Am Sonntag kann ich um 16 Uhr kommen. Ich bringe einen Kuchen mit. Darf ich meine Freundin Elif mitbringen?\n\nLiebe Grüße\nMerve",
    difficulty: "A2"
  },
  {
    id: 2,
    title: "Aufgabe 02",
    topic: "Wochenende / Treffen",
    situation: "Dein Freund Leon möchte dich am Wochenende treffen und etwas zusammen machen.",
    instruction: "Antworte Leon mit einer E-Mail.",
    points: [
      point("day", "welcher Tag dir passt", ["samstag", "sonntag", "wochenende", "tag", "passt"], ["am samstag", "am sonntag"], ["(?:samstag|sonntag).{0,16}(?:zeit|passt)"], "Uygun olduğun günü yaz.", "Am Samstag habe ich Zeit."),
      point("activity", "was ihr machen könnt", ["kino", "park", "kaffee", "essen", "spazieren", "machen"], ["ins kino gehen", "kaffee trinken"], ["wir (?:können|könnten|wollen)"], "Birlikte yapacağınız etkinliği öner.", "Wir können im Park spazieren gehen."),
      point("meeting", "wo ihr euch trefft", ["treffen", "bahnhof", "café", "park", "kino"], ["uns am bahnhof treffen", "treffen wir uns"], ["wo.{0,15}treffen", "treffen.{0,20}(?:bahnhof|café|park)"], "Buluşma yerini yaz veya sor.", "Wir treffen uns vor dem Kino."),
      point("time", "um wie viel Uhr", ["uhr", "vormittag", "nachmittag", "abend"], ["um 15 uhr", "gegen 14 uhr"], ["(?:um|gegen) [0-9]{1,2}"], "Bir saat öner.", "Passt dir 15 Uhr?")
    ],
    recommendedPhraseIds: ["greet-lieber", "thanks-mail", "accept-time", "meet-where", "meet-station", "meet-time", "close-viele"],
    sampleAnswer: "Lieber Leon,\n\nam Samstag habe ich Zeit. Wir können zuerst im Park spazieren gehen und danach einen Kaffee trinken. Treffen wir uns um 15 Uhr vor dem Bahnhof? Bitte antworte mir kurz.\n\nViele Grüße\nEmre",
    difficulty: "A2"
  },
  {
    id: 3,
    title: "Aufgabe 03",
    topic: "Reise / Ankunft",
    situation: "Du besuchst deine Freundin Sophie in Hamburg. Sie möchte wissen, wie deine Reise ist.",
    instruction: "Schreibe Sophie eine E-Mail.",
    points: [
      point("transport", "wie du nach Hamburg kommst", ["zug", "bus", "auto", "flugzeug", "fahre", "komme"], ["mit dem zug", "mit dem bus"], ["mit (?:dem|der) .{0,15}(?:zug|bus|auto)"], "Ulaşım aracını yaz.", "Ich komme mit dem Zug."),
      point("arrival", "wann du ankommst", ["ankomme", "ankunft", "uhr", "freitag", "samstag"], ["komme um", "komme am"], ["komme.{0,20}(?:uhr|freitag|samstag).{0,8}an", "ankunft"], "Varış günü veya saatini yaz.", "Ich komme am Freitag um 18 Uhr an."),
      point("pickup", "ob Sophie dich abholen kann", ["abholen", "bahnhof", "warten"], ["mich abholen", "am bahnhof warten"], ["kannst du.{0,20}abholen", "holst du.{0,20}ab"], "Seni karşılayıp karşılayamayacağını sor.", "Kannst du mich am Bahnhof abholen?"),
      point("plan", "was ihr zusammen machen könnt", ["museum", "stadt", "hafen", "essen", "machen", "besuchen"], ["zusammen machen", "den hafen besuchen"], ["wir (?:können|wollen).{0,25}"], "Birlikte yapılacak kısa bir plan öner.", "Wir können am Samstag den Hafen besuchen.")
    ],
    recommendedPhraseIds: ["greet-liebe", "thanks-mail", "travel-train", "travel-arrive", "travel-pickup", "question-plan", "close-viele"],
    sampleAnswer: "Liebe Sophie,\n\nich komme am Freitag mit dem Zug nach Hamburg. Mein Zug kommt um 18 Uhr an. Kannst du mich bitte am Bahnhof abholen? Am Samstag können wir den Hafen besuchen und zusammen essen.\n\nViele Grüße\nDeniz",
    difficulty: "A2"
  },
  {
    id: 4,
    title: "Aufgabe 04",
    topic: "Krankheit / Arzt / Hilfe",
    situation: "Du bist krank und kannst heute nicht einkaufen. Dein Nachbar Paul kann dir vielleicht helfen.",
    instruction: "Schreibe Paul eine kurze E-Mail.",
    points: [
      point("illness", "warum du Hilfe brauchst", ["krank", "fieber", "husten", "schmerzen", "arzt"], ["bin krank", "habe fieber"], ["ich (?:bin|habe).{0,15}(?:krank|fieber|schmerzen)"], "Neden yardıma ihtiyacın olduğunu yaz.", "Ich bin krank und habe Fieber."),
      point("shopping", "was Paul kaufen soll", ["kaufen", "brot", "milch", "wasser", "medikament", "apotheke"], ["bitte kaufen", "medikamente kaufen"], ["(?:kannst|sollst).{0,25}kaufen"], "Alınacak bir veya iki şeyi yaz.", "Kannst du bitte Brot und Wasser kaufen?"),
      point("doctor", "wann du zum Arzt gehst", ["arzt", "arzttermin", "morgen", "uhr", "gehe"], ["zum arzt", "einen arzttermin"], ["(?:morgen|heute).{0,20}arzt", "gehe.{0,15}arzt"], "Doktor zamanını belirt.", "Morgen um 10 Uhr gehe ich zum Arzt."),
      point("key", "wie Paul in die Wohnung kommt", ["schlüssel", "tür", "nachbarin", "wohnung", "klingeln"], ["schlüssel liegt", "an der tür"], ["schlüssel.{0,30}(?:tür|nachbar|liegt)"], "Anahtar veya teslim şeklini açıkla.", "Der Schlüssel liegt bei Frau Klein.")
    ],
    recommendedPhraseIds: ["greet-lieber", "reason-sick", "help-ask", "doctor-go", "doctor-appointment", "doctor-medicine", "close-viele"],
    sampleAnswer: "Lieber Paul,\n\nich bin leider krank und habe Fieber. Kannst du bitte Brot, Wasser und Medikamente für mich kaufen? Morgen um 10 Uhr gehe ich zum Arzt. Der Wohnungsschlüssel liegt bei unserer Nachbarin Frau Klein.\n\nViele Grüße\nAli",
    difficulty: "A2"
  },
  {
    id: 5,
    title: "Aufgabe 05",
    topic: "Sprachkurs",
    situation: "Du möchtest im Herbst einen Deutschkurs bei der Sprachschule Aktiv besuchen.",
    instruction: "Schreibe eine E-Mail an die Sprachschule.",
    points: [
      point("start", "wann der Kurs beginnt", ["beginnt", "start", "anfang", "wann", "datum"], ["wann beginnt", "kursbeginn"], ["wann.{0,15}(?:kurs|beginnt)"], "Kursun başlangıç tarihini sor.", "Wann beginnt der Kurs?"),
      point("schedule", "an welchen Tagen der Kurs ist", ["tage", "montag", "dienstag", "wochenende", "uhr"], ["an welchen tagen", "wie oft"], ["welchen tagen", "(?:montag|dienstag|mittwoch).{0,20}kurs"], "Ders günlerini veya saatini sor.", "An welchen Tagen ist der Unterricht?"),
      point("level", "ob der Kurs für A2 ist", ["a2", "niveau", "stufe", "anfänger"], ["für a2", "niveau a2"], ["(?:kurs|niveau).{0,15}a2", "a2.{0,15}(?:kurs|niveau)"], "A2 seviyesini net yaz.", "Ist der Kurs für Niveau A2?"),
      point("price", "wie viel der Kurs kostet", ["kostet", "kosten", "preis", "euro", "bezahlen"], ["wie viel kostet", "was kostet"], ["(?:wie viel|was).{0,15}kostet"], "Kurs ücretini sor.", "Wie viel kostet der Kurs?")
    ],
    recommendedPhraseIds: ["greet-damen", "course-interest", "course-start", "time-begin", "course-level", "price-course", "close-formal"],
    sampleAnswer: "Sehr geehrte Damen und Herren,\n\nich interessiere mich für Ihren Deutschkurs im Herbst. Wann beginnt der Kurs? An welchen Tagen ist der Unterricht? Ich suche einen Kurs für Niveau A2. Wie viel kostet der Kurs?\n\nMit freundlichen Grüßen\nSelin Kaya",
    difficulty: "A2"
  },
  {
    id: 6,
    title: "Aufgabe 06",
    topic: "Kurs / Absage",
    situation: "Du kannst morgen nicht zum Deutschkurs kommen. Deine Lehrerin heißt Frau Berger.",
    instruction: "Schreibe Frau Berger eine E-Mail.",
    points: [
      point("absence", "dass du nicht kommen kannst", ["nicht kommen", "fehle", "kurs", "unterricht"], ["kann nicht kommen", "nicht zum kurs"], ["kann.{0,10}nicht.{0,10}kommen"], "Gelemeyeceğini açıkça yaz.", "Leider kann ich morgen nicht zum Kurs kommen."),
      point("reason", "warum du nicht kommst", ["krank", "termin", "arbeiten", "kind", "arzt"], ["bin krank", "wichtigen termin"], ["weil .{0,35}"], "Kısa bir neden ver.", "Ich habe einen wichtigen Arzttermin."),
      point("homework", "welche Hausaufgaben es gibt", ["hausaufgabe", "aufgabe", "seite", "übung"], ["welche hausaufgaben", "hausaufgaben machen"], ["(?:welche|was).{0,18}hausaufgab"], "Ödevi sor.", "Welche Hausaufgaben haben wir?"),
      point("return", "wann du wiederkommst", ["wieder", "nächste", "montag", "dienstag", "kurs"], ["komme wieder", "nächste woche"], ["(?:montag|dienstag|nächste woche).{0,20}(?:komme|kurs)"], "Ne zaman döneceğini yaz.", "Am Donnerstag komme ich wieder.")
    ],
    recommendedPhraseIds: ["greet-frau", "decline-sorry", "reason-appointment", "reason-sick", "request-answer", "close-formal"],
    sampleAnswer: "Sehr geehrte Frau Berger,\n\nleider kann ich morgen nicht zum Deutschkurs kommen, weil ich einen Arzttermin habe. Welche Hausaufgaben haben wir? Können Sie mir bitte die Seiten schicken? Am Donnerstag komme ich wieder.\n\nMit freundlichen Grüßen\nAyşe Demir",
    difficulty: "A2"
  },
  {
    id: 7,
    title: "Aufgabe 07",
    topic: "Termin verschieben",
    situation: "Du hast am Dienstag einen Termin bei Herrn Wolf. Du musst den Termin verschieben.",
    instruction: "Schreibe Herrn Wolf eine E-Mail.",
    points: [
      point("cancel", "welchen Termin du nicht schaffen kannst", ["termin", "dienstag", "nicht kommen", "verschieben"], ["termin am dienstag", "termin verschieben"], ["termin.{0,25}(?:dienstag|verschieben|nicht)"], "Hangi randevu olduğunu yaz.", "Ich kann am Dienstag leider nicht kommen."),
      point("reason", "warum du den Termin verschiebst", ["arbeiten", "krank", "reise", "kind", "wichtig"], ["muss arbeiten", "bin krank"], ["weil .{0,35}"], "Kısa bir neden ver.", "Ich muss länger arbeiten."),
      point("newday", "welcher neue Tag dir passt", ["mittwoch", "donnerstag", "freitag", "nächste woche", "passt"], ["am donnerstag", "nächste woche"], ["(?:mittwoch|donnerstag|freitag).{0,20}(?:zeit|passt|kann)"], "Yeni bir gün öner.", "Am Donnerstag habe ich Zeit."),
      point("confirm", "ob der neue Termin möglich ist", ["möglich", "passt", "antwort", "bestätigen"], ["ist das möglich", "passt ihnen"], ["(?:möglich|passt).{0,5}\?"], "Yeni saatin uygun olup olmadığını sor.", "Ist Donnerstag um 11 Uhr möglich?")
    ],
    recommendedPhraseIds: ["greet-herr", "decline-apology", "reason-work", "decline-other", "request-answer", "close-formal"],
    sampleAnswer: "Sehr geehrter Herr Wolf,\n\nmeinen Termin am Dienstag muss ich leider verschieben, weil ich länger arbeiten muss. Am Donnerstag habe ich ab 11 Uhr Zeit. Ist ein neuer Termin am Donnerstag möglich? Bitte antworten Sie mir.\n\nMit freundlichen Grüßen\nMehmet Yılmaz",
    difficulty: "A2"
  },
  {
    id: 8,
    title: "Aufgabe 08",
    topic: "Umzug / Transport",
    situation: "Deine Freundin Lisa zieht am Samstag in eine neue Wohnung. Sie bittet dich um Hilfe.",
    instruction: "Schreibe Lisa eine E-Mail.",
    points: [
      point("when", "wann du kommen kannst", ["samstag", "uhr", "morgen", "nachmittag", "komme"], ["am samstag", "um 10 uhr"], ["(?:samstag|uhr).{0,20}(?:komme|kann)"], "Geliş zamanını yaz.", "Ich komme am Samstag um 10 Uhr."),
      point("duration", "wie lange du helfen kannst", ["stunde", "stunden", "bis", "lange", "helfen"], ["stunden helfen", "bis 16 uhr"], ["(?:bis|stunden).{0,18}(?:helfen|bleiben)?"], "Ne kadar süre yardım edebileceğini yaz.", "Ich kann vier Stunden helfen."),
      point("bring", "was du mitbringst", ["auto", "karton", "werkzeug", "essen", "bringe"], ["auto mit", "kartons mit"], ["bring(?:e|en).{0,25}mit"], "Araç veya eşya olarak ne getireceğini yaz.", "Ich bringe mein Auto mit."),
      point("address", "Frage zur neuen Wohnung", ["adresse", "wohnung", "zimmer", "stock", "aufzug"], ["neue adresse", "wie viele zimmer"], ["(?:wie|wo|welche).{0,25}(?:wohnung|adresse|zimmer|stock|aufzug)"], "Yeni evle ilgili bir soru sor.", "Wie ist deine neue Adresse?")
    ],
    recommendedPhraseIds: ["greet-hallo", "thanks-mail", "time-saturday", "help-hours", "help-bring", "question-address", "close-liebe"],
    sampleAnswer: "Hallo Lisa,\n\nich komme am Samstag um 10 Uhr. Ich kann bis 16 Uhr helfen. Mein Auto und einige Kartons bringe ich mit. Wie ist deine neue Adresse? Gibt es im Haus einen Aufzug?\n\nLiebe Grüße\nCan",
    difficulty: "A2"
  },
  {
    id: 9,
    title: "Aufgabe 09",
    topic: "Fahrrad-Ausflug",
    situation: "Dein Freund Max plant am Sonntag einen Fahrrad-Ausflug zum See.",
    instruction: "Schreibe Max eine E-Mail.",
    points: [
      point("join", "ob du mitkommst", ["mitkommen", "dabei", "komme", "ausflug", "fahrrad"], ["möchte mitkommen", "komme gern mit"], ["ich .{0,12}(?:komme mit|möchte mitkommen)"], "Katılıp katılmayacağını yaz.", "Ich komme gern mit."),
      point("meeting", "wo ihr euch trefft", ["treffen", "treffpunkt", "bahnhof", "park", "see"], ["uns treffen", "treffpunkt ist"], ["wo.{0,15}treffen", "treffen.{0,20}(?:bahnhof|park)"], "Buluşma yeri öner veya sor.", "Treffen wir uns am Bahnhof?"),
      point("food", "was du zu essen mitbringst", ["essen", "brot", "obst", "wasser", "salat", "bringe"], ["zu essen", "wasser mit"], ["bring(?:e|en).{0,25}(?:essen|brot|obst|wasser|salat)"], "Yiyecek veya içecek yaz.", "Ich bringe Obst und Wasser mit."),
      point("weather", "was ihr bei Regen macht", ["regen", "regnet", "wetter", "kino", "verschieben"], ["wenn es regnet", "bei regen"], ["(?:regen|regnet).{0,30}(?:machen|kino|verschieben)"], "Yağmur için alternatif plan yaz veya sor.", "Was machen wir, wenn es regnet?")
    ],
    recommendedPhraseIds: ["greet-lieber", "accept-join", "meet-where", "meet-station", "food-bring", "question-plan", "close-viele"],
    sampleAnswer: "Lieber Max,\n\nich komme am Sonntag gern mit. Treffen wir uns um 9 Uhr am Bahnhof? Ich bringe Brot, Obst und Wasser mit. Was machen wir, wenn es regnet? Dann können wir ins Kino gehen.\n\nViele Grüße\nBurak",
    difficulty: "A2"
  },
  {
    id: 10,
    title: "Aufgabe 10",
    topic: "Essen / Kochkurs",
    situation: "Deine Freundin Nora besucht einen Kochkurs und lädt dich zu einer Probestunde ein.",
    instruction: "Antworte Nora mit einer E-Mail.",
    points: [
      point("interest", "ob du mitmachen möchtest", ["mitmachen", "mitkommen", "kochen", "kurs", "möchte"], ["möchte mitmachen", "gern mitkommen"], ["ich (?:möchte|komme).{0,20}(?:mit|kochen)"], "Katılmak isteyip istemediğini yaz.", "Ich möchte gern mitmachen."),
      point("dish", "was du kochen möchtest", ["suppe", "nudeln", "kuchen", "pizza", "gericht", "kochen"], ["möchte kochen", "pizza machen"], ["(?:kochen|machen).{0,20}(?:suppe|nudeln|kuchen|pizza)"], "Pişirmek istediğin bir yemek yaz.", "Ich möchte gern eine Suppe kochen."),
      point("date", "wann die Probestunde ist", ["wann", "tag", "datum", "uhr", "probestunde"], ["wann ist", "um wie viel uhr"], ["wann.{0,20}(?:stunde|kurs|probestunde)"], "Prova dersinin zamanını sor.", "Wann ist die Probestunde?"),
      point("cost", "ob die Probestunde etwas kostet", ["kostet", "kostenlos", "preis", "euro", "bezahlen"], ["was kostet", "ist kostenlos"], ["(?:kostet|kostenlos|preis).{0,10}\?"], "Ücretli olup olmadığını sor.", "Ist die Probestunde kostenlos?")
    ],
    recommendedPhraseIds: ["greet-liebe", "thanks-invite", "accept-join", "food-cook", "course-start", "price-course", "close-liebe"],
    sampleAnswer: "Liebe Nora,\n\nvielen Dank für deine Einladung. Ich möchte gern beim Kochkurs mitmachen. Wir können eine Gemüsesuppe oder Pizza kochen. Wann ist die Probestunde? Kostet die Stunde etwas? Bitte schreib mir bald.\n\nLiebe Grüße\nZeynep",
    difficulty: "A2"
  },
  {
    id: 11,
    title: "Aufgabe 11",
    topic: "Geschenk",
    situation: "Euer Kollege David hat bald Geburtstag. Deine Kollegin Emma möchte mit dir ein Geschenk kaufen.",
    instruction: "Schreibe Emma eine E-Mail.",
    points: [
      point("idea", "welches Geschenk du vorschlägst", ["geschenk", "buch", "gutschein", "kopfhörer", "kaufen"], ["ein buch kaufen", "geschenkidee"], ["(?:kaufe|kaufen|schenke|geschenk).{0,25}(?:buch|gutschein|kopfhörer)"], "Bir hediye öner.", "Wir können einen Buchgutschein kaufen."),
      point("money", "wie viel Geld du ausgeben möchtest", ["euro", "geld", "kosten", "bezahlen", "ausgeben"], ["20 euro", "geld ausgeben"], ["[0-9]{1,3} euro"], "Bir bütçe yaz.", "Ich möchte 20 Euro ausgeben."),
      point("shopping", "wann ihr einkaufen könnt", ["samstag", "freitag", "nachmittag", "uhr", "einkaufen"], ["am freitag", "einkaufen gehen"], ["(?:freitag|samstag|uhr).{0,20}einkaufen"], "Alışveriş zamanını öner.", "Am Freitag können wir einkaufen."),
      point("place", "wo ihr euch trefft", ["treffen", "kaufhaus", "zentrum", "bahnhof", "geschäft"], ["vor dem kaufhaus", "uns treffen"], ["treffen.{0,25}(?:kaufhaus|zentrum|bahnhof|geschäft)"], "Buluşma yerini yaz.", "Treffen wir uns vor dem Kaufhaus?")
    ],
    recommendedPhraseIds: ["greet-liebe", "gift-idea", "gift-together", "gift-buy", "accept-time", "meet-where", "close-viele"],
    sampleAnswer: "Liebe Emma,\n\nfür David können wir einen Buchgutschein kaufen. Ich möchte ungefähr 20 Euro ausgeben. Am Freitag nach der Arbeit habe ich Zeit. Treffen wir uns um 18 Uhr vor dem Kaufhaus?\n\nViele Grüße\nFatma",
    difficulty: "A2"
  },
  {
    id: 12,
    title: "Aufgabe 12",
    topic: "Übernachtung / Besuch",
    situation: "Du besuchst deinen Freund Jonas in Köln und möchtest eine Nacht bleiben.",
    instruction: "Schreibe Jonas eine E-Mail.",
    points: [
      point("date", "wann du kommst", ["freitag", "samstag", "wochenende", "komme", "uhr"], ["am freitag", "um 19 uhr"], ["(?:freitag|samstag|uhr).{0,20}komme"], "Geliş gününü veya saatini yaz.", "Ich komme am Freitag um 19 Uhr."),
      point("sleep", "ob du bei ihm schlafen kannst", ["schlafen", "übernachten", "bleiben", "bett", "sofa"], ["bei dir schlafen", "eine nacht bleiben"], ["kann ich.{0,22}(?:schlafen|übernachten|bleiben)"], "Bir gece kalıp kalamayacağını sor.", "Kann ich bei dir schlafen?"),
      point("bring", "was du mitbringst", ["schlafsack", "handtuch", "essen", "kuchen", "bringe"], ["schlafsack mit", "handtuch mit"], ["bring(?:e|en).{0,25}mit"], "Yanında getireceğin şeyi yaz.", "Ich bringe meinen Schlafsack mit."),
      point("plan", "was ihr am Abend macht", ["abend", "essen", "kino", "film", "stadt", "machen"], ["am abend", "einen film sehen"], ["abend.{0,25}(?:machen|essen|kino|film)"], "Akşam planı öner veya sor.", "Am Abend können wir zusammen kochen.")
    ],
    recommendedPhraseIds: ["greet-lieber", "travel-arrive", "question-bring", "food-bring", "question-plan", "close-viele"],
    sampleAnswer: "Lieber Jonas,\n\nich komme am Freitag um 19 Uhr in Köln an. Kann ich eine Nacht bei dir schlafen? Ich bringe meinen Schlafsack und ein Handtuch mit. Am Abend können wir zusammen kochen.\n\nViele Grüße\nOkan",
    difficulty: "A2"
  },
  {
    id: 13,
    title: "Aufgabe 13",
    topic: "Party / Freunde",
    situation: "Deine Freundin Mia macht am Freitag eine Gartenparty. Du möchtest kommen.",
    instruction: "Schreibe Mia eine E-Mail.",
    points: [
      point("arrival", "wann du kommst", ["freitag", "uhr", "abend", "komme"], ["am freitag", "um 18 uhr"], ["(?:freitag|uhr).{0,20}komme"], "Geliş zamanını yaz.", "Ich komme am Freitag um 18 Uhr."),
      point("friend", "ob du einen Freund mitbringen kannst", ["freund", "freundin", "mitbringen", "darf", "kann"], ["einen freund mitbringen", "meine freundin kommt"], ["(?:kann|darf).{0,25}mitbringen"], "Bir arkadaş getirip getiremeyeceğini sor.", "Darf ich meinen Freund mitbringen?"),
      point("food", "welches Essen du mitbringst", ["salat", "kuchen", "brot", "getränk", "essen", "bringe"], ["salat mit", "kuchen mit"], ["bring(?:e|en).{0,25}(?:salat|kuchen|brot|essen|getränk)"], "Getireceğin yiyeceği yaz.", "Ich bringe einen Salat mit."),
      point("weather", "ob die Party bei Regen stattfindet", ["regen", "regnet", "wetter", "drinnen", "party"], ["wenn es regnet", "bei regen"], ["(?:regen|regnet).{0,30}(?:party|drinnen|statt)"], "Yağmur durumunu sor.", "Ist die Party auch bei Regen?")
    ],
    recommendedPhraseIds: ["greet-liebe", "thanks-invite", "invite-party", "invite-friend", "food-bring", "request-answer", "close-liebe"],
    sampleAnswer: "Liebe Mia,\n\nich komme am Freitag gern zu deiner Gartenparty. Um 18 Uhr bin ich da. Darf ich meinen Freund Tom mitbringen? Wir bringen einen großen Salat mit. Ist die Party auch bei Regen draußen?\n\nLiebe Grüße\nEce",
    difficulty: "A2"
  },
  {
    id: 14,
    title: "Aufgabe 14",
    topic: "Informationen / Kurs / Preis",
    situation: "Du hast im Internet einen Wochenendkurs 'Deutsch im Alltag' gesehen und möchtest mehr wissen.",
    instruction: "Schreibe eine E-Mail an das Kursbüro.",
    points: [
      point("date", "wann der Kurs stattfindet", ["wann", "datum", "wochenende", "samstag", "sonntag", "statt"], ["wann findet", "welches wochenende"], ["wann.{0,20}(?:kurs|statt)"], "Tarih veya hafta sonunu sor.", "An welchem Wochenende findet der Kurs statt?"),
      point("hours", "wie lange der Unterricht dauert", ["lange", "dauer", "stunden", "uhr", "unterricht"], ["wie lange", "von wann bis wann"], ["(?:wie lange|von wann).{0,20}(?:unterricht|kurs)"], "Ders süresini sor.", "Wie lange dauert der Unterricht?"),
      point("price", "wie viel der Kurs kostet", ["kostet", "preis", "euro", "bezahlen"], ["wie viel kostet", "was kostet"], ["(?:wie viel|was).{0,15}kostet"], "Ücreti sor.", "Wie viel kostet der Wochenendkurs?"),
      point("registration", "wie du dich anmelden kannst", ["anmelden", "anmeldung", "formular", "online", "telefon"], ["mich anmelden", "anmeldung online"], ["wie.{0,18}anmelden", "anmeldung.{0,18}(?:online|formular)"], "Kayıt şeklini sor.", "Wie kann ich mich anmelden?")
    ],
    recommendedPhraseIds: ["greet-damen", "course-interest", "request-info", "course-start", "time-begin", "price-course", "close-formal"],
    sampleAnswer: "Sehr geehrte Damen und Herren,\n\nich interessiere mich für den Kurs „Deutsch im Alltag“. An welchem Wochenende findet er statt? Wie lange dauert der Unterricht? Was kostet der Kurs? Bitte schicken Sie mir auch Informationen zur Anmeldung.\n\nMit freundlichen Grüßen\nAylin Şen",
    difficulty: "A2"
  },
  {
    id: 15,
    title: "Aufgabe 15",
    topic: "Absage / Neuer Termin",
    situation: "Du willst dich morgen mit deiner Freundin Laura treffen, kannst aber nicht kommen.",
    instruction: "Schreibe Laura eine E-Mail.",
    points: [
      point("cancel", "dass du morgen nicht kommst", ["morgen", "nicht kommen", "absagen", "treffen"], ["kann morgen nicht", "treffen absagen"], ["morgen.{0,18}nicht.{0,12}kommen"], "Buluşmayı iptal ettiğini net yaz.", "Leider kann ich morgen nicht kommen."),
      point("reason", "warum du absagst", ["krank", "arbeiten", "termin", "familie", "arzt"], ["muss arbeiten", "bin krank"], ["weil .{0,35}"], "Kısa bir neden ver.", "Ich muss bis spät arbeiten."),
      point("newtime", "wann du stattdessen Zeit hast", ["freitag", "samstag", "sonntag", "uhr", "zeit"], ["am samstag zeit", "stattdessen"], ["(?:freitag|samstag|sonntag).{0,20}(?:zeit|kann)"], "Yeni bir zaman öner.", "Am Samstag habe ich Zeit."),
      point("activity", "was ihr dann machen könnt", ["kaffee", "kino", "essen", "spazieren", "machen"], ["kaffee trinken", "ins kino gehen"], ["wir (?:können|wollen).{0,25}"], "Yeni buluşma için etkinlik öner.", "Wir können zusammen einen Kaffee trinken.")
    ],
    recommendedPhraseIds: ["greet-liebe", "decline-apology", "decline-sorry", "reason-work", "decline-other", "meet-time", "close-liebe"],
    sampleAnswer: "Liebe Laura,\n\nes tut mir leid, aber morgen kann ich nicht kommen. Ich muss bis 20 Uhr arbeiten. Am Samstag habe ich Zeit. Wollen wir uns um 15 Uhr treffen und zusammen einen Kaffee trinken?\n\nLiebe Grüße\nDerya",
    difficulty: "A2"
  }
];

const localLanguageRules = [
  {
    id: "sein-participle",
    pattern: /\bich bin kommen\b/gi,
    replacement: "ich bin gekommen",
    type: "Perfekt",
    explanation: "‘kommen’ fiilinin Perfekt biçimi ‘ich bin gekommen’ olur."
  },
  {
    id: "gehen-auxiliary",
    pattern: /\bich habe gehen\b/gi,
    replacement: "ich bin gegangen",
    type: "Perfekt",
    explanation: "‘gehen’ hareket fiilidir; Perfekt'te ‘sein’ ve ‘gegangen’ kullanılır."
  },
  {
    id: "modal-order",
    pattern: /\bich komme nicht kann\b/gi,
    replacement: "ich kann nicht kommen",
    type: "Wortstellung / Modalverb",
    explanation: "Modal fiil ikinci yerde, ana fiil cümlenin sonunda olur."
  },
  {
    id: "formal-closing",
    pattern: /\bmit freundliche grüße\b/gi,
    replacement: "Mit freundlichen Grüßen",
    type: "Grußformel",
    explanation: "Resmî kapanış kalıbı ‘Mit freundlichen Grüßen’ şeklindedir."
  },
  {
    id: "gruesse-spelling",
    pattern: /\bviele gruße\b/gi,
    replacement: "Viele Grüße",
    type: "Rechtschreibung",
    explanation: "‘Grüße’ kelimesinde ‘ü’ ve ‘ß’ kullanılır."
  },
  {
    id: "time-order",
    pattern: /\bich möchte gehen morgen\b/gi,
    replacement: "Ich möchte morgen gehen",
    type: "Wortstellung",
    explanation: "Modal fiilli cümlede zaman ifadesi ortada, ana fiil sonda olur."
  },
  {
    id: "weil-sein",
    pattern: /\bweil ich bin krank\b/gi,
    replacement: "weil ich krank bin",
    type: "Nebensatz / weil",
    explanation: "‘weil’ ile kurulan yan cümlede çekimli fiil sona gider."
  },
  {
    id: "weil-modal",
    pattern: /\bweil ich muss arbeiten\b/gi,
    replacement: "weil ich arbeiten muss",
    type: "Nebensatz / weil",
    explanation: "‘weil’ cümlesinde modal fiil en sonda kullanılır."
  },
  {
    id: "saturday-preposition",
    pattern: /\bich komme (montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)\b/gi,
    replacement: "ich komme am $1",
    type: "Präposition",
    explanation: "Günlerden önce genellikle ‘am’ kullanılır: ich komme am Samstag.",
    severity: "IMPROVEMENT"
  },
  {
    id: "conjugation-and-day",
    pattern: /\bich kommen (montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)\b/gi,
    replacement: "ich komme am $1",
    type: "Grammatik / Präposition",
    explanation: "‘ich’ ile ‘komme’ kullanılır ve günden önce ‘am’ gelir."
  },
  {
    id: "akkusativ-brother",
    pattern: /\bmeine bruder\b/gi,
    replacement: "meinen Bruder",
    type: "Artikel / Akkusativ",
    explanation: "‘Bruder’ burada Akkusativ olduğu için ‘meinen’ kullanılır."
  },
  {
    id: "wir-kann",
    pattern: /\bwir kann\b/gi,
    replacement: "wir können",
    type: "Grammatik / Verb",
    explanation: "‘wir’ ile modal fiil çoğul çekilir: wir können."
  },
  {
    id: "du-kann",
    pattern: /\bdu kann\b/gi,
    replacement: "du kannst",
    type: "Grammatik / Verb",
    explanation: "‘du’ ile ‘können’ fiili ‘kannst’ olur."
  },
  {
    id: "modal-kann-komme",
    pattern: /\bich kann komme\b/gi,
    replacement: "ich kann kommen",
    type: "Grammatik / Modalverb",
    explanation: "Modal fiilden sonra ana fiil mastar hâlinde kullanılır: kann kommen."
  },
  {
    id: "modal-moechte-komme",
    pattern: /\bich möchte komme\b/gi,
    replacement: "ich möchte kommen",
    type: "Grammatik / Modalverb",
    explanation: "‘möchte’ ile ana fiil mastar hâlinde cümlenin sonunda olur: möchte kommen."
  },
  {
    id: "modal-muss-arbeite",
    pattern: /\bich muss arbeite\b/gi,
    replacement: "ich muss arbeiten",
    type: "Grammatik / Modalverb",
    explanation: "‘muss’ ile ana fiil mastar hâlinde kullanılır: muss arbeiten."
  },
  {
    id: "modal-will-gehe",
    pattern: /\bich will gehe\b/gi,
    replacement: "ich will gehen",
    type: "Grammatik / Modalverb",
    explanation: "‘will’ ile ana fiil mastar hâlinde kullanılır: will gehen."
  },
  {
    id: "dass-modal-order",
    pattern: /\bdass ich komme kann\b/gi,
    replacement: "dass ich kommen kann",
    type: "Wortstellung / Nebensatz",
    explanation: "‘dass’ yan cümlesinde modal fiil sona gelir: dass ich kommen kann."
  },
  {
    id: "akkusativ-termin",
    pattern: /\bich habe ein termin\b/gi,
    replacement: "ich habe einen Termin",
    type: "Artikel / Akkusativ",
    explanation: "‘Termin’ eril bir isimdir; Akkusativ biçimi ‘einen Termin’ olur."
  },
  {
    id: "akkusativ-kuchen",
    pattern: /\bich bringe ein kuchen\b/gi,
    replacement: "ich bringe einen Kuchen",
    type: "Artikel / Akkusativ",
    explanation: "‘Kuchen’ eril bir isimdir; burada ‘einen Kuchen’ kullanılır."
  },
  {
    id: "mit-freundin",
    pattern: /\bmit meine freundin\b/gi,
    replacement: "mit meiner Freundin",
    type: "Artikel / Dativ",
    explanation: "‘mit’ her zaman Dativ ister: mit meiner Freundin."
  },
  {
    id: "mit-freund",
    pattern: /\bmit mein freund\b/gi,
    replacement: "mit meinem Freund",
    type: "Artikel / Dativ",
    explanation: "‘mit’ her zaman Dativ ister: mit meinem Freund."
  },
  {
    id: "zu-party",
    pattern: /\bzu deine party\b/gi,
    replacement: "zu deiner Party",
    type: "Artikel / Dativ",
    explanation: "‘zu’ Dativ ister: zu deiner Party."
  },
  {
    id: "invitation-gender",
    pattern: /\bfür dein einladung\b/gi,
    replacement: "für deine Einladung",
    type: "Artikel",
    explanation: "‘Einladung’ dişil bir isimdir: deine Einladung."
  },
  {
    id: "time-am-uhr",
    pattern: /\bam\s+(\d{1,2}(?::\d{2})?)\s+uhr\b/gi,
    replacement: "um $1 Uhr",
    type: "Präposition / Uhrzeit",
    explanation: "Saatlerden önce ‘um’ kullanılır: um 15 Uhr."
  },
  {
    id: "day-um",
    pattern: /\bum\s+(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)\b/gi,
    replacement: "am $1",
    type: "Präposition / Tag",
    explanation: "Haftanın günlerinden önce ‘am’ kullanılır: am Samstag."
  },
  {
    id: "day-in",
    pattern: /\b(?:in|im)\s+(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)\b/gi,
    replacement: "am $1",
    type: "Präposition / Tag",
    explanation: "Haftanın günlerinden önce ‘am’ kullanılır."
  },
  {
    id: "freue-auf-reflexive",
    pattern: /\bich freue auf\b/gi,
    replacement: "ich freue mich auf",
    type: "Grammatik / Reflexivverb",
    explanation: "Bu kalıp dönüşlü kullanılır: ich freue mich auf."
  },
  {
    id: "freue-invitation",
    pattern: /\bich freue mich für (?:die|deine) einladung\b/gi,
    replacement: "ich freue mich über deine Einladung",
    type: "Präposition",
    explanation: "Alınan bir davet için ‘sich über etwas freuen’ kullanılır."
  },
  {
    id: "warten-fuer",
    pattern: /\bich warte für\b/gi,
    replacement: "ich warte auf",
    type: "Präposition",
    explanation: "‘warten’ fiili ‘auf’ ile kullanılır: ich warte auf."
  },
  {
    id: "es-tut-mir-leid",
    pattern: /\bes tut mich leid\b/gi,
    replacement: "es tut mir leid",
    type: "Grammatik / Dativ",
    explanation: "Doğru özür kalıbı ‘Es tut mir leid’ şeklindedir."
  },
  {
    id: "danke-einladung",
    pattern: /\bdanke deine einladung\b/gi,
    replacement: "danke für deine Einladung",
    type: "Präposition",
    explanation: "Teşekkür ederken ‘danke für …’ kalıbı kullanılır."
  },
  {
    id: "formal-greeting-ending",
    pattern: /\bsehr geehrte dame und herren\b/gi,
    replacement: "Sehr geehrte Damen und Herren",
    type: "Anrede",
    explanation: "Genel resmî hitap ‘Sehr geehrte Damen und Herren’ biçimindedir."
  },
  {
    id: "modal-muss-gehe",
    pattern: /\bich muss gehe\b/gi,
    replacement: "ich muss gehen",
    type: "Modalverb / Infinitiv",
    explanation: "Modal fiilden sonra ana fiil mastar hâlinde kullanılır: muss gehen."
  },
  {
    id: "help-mich-mir",
    pattern: /\b(kannst du|können sie) mich helfen\b/gi,
    replacement: "$1 mir helfen",
    type: "Personalpronomen / Dativ",
    explanation: "‘helfen’ fiili Dativ ister; bu nedenle ‘mir’ kullanılır."
  },
  {
    id: "help-dich-dir",
    pattern: /\bich helfe dich\b/gi,
    replacement: "ich helfe dir",
    type: "Personalpronomen / Dativ",
    explanation: "‘helfen’ fiili Dativ ister: ich helfe dir."
  },
  {
    id: "write-du-dir",
    pattern: /\bich schreibe du\b/gi,
    replacement: "ich schreibe dir",
    type: "Personalpronomen / Dativ",
    explanation: "Bir kişiye yazarken Dativ kullanılır: ich schreibe dir."
  },
  {
    id: "go-bei-arzt",
    pattern: /\bich gehe bei(?:m)? (?:dem )?arzt\b/gi,
    replacement: "ich gehe zum Arzt",
    type: "Präposition",
    explanation: "Bir hedefe giderken burada ‘zum Arzt’ kullanılır."
  },
  {
    id: "travel-zu-city",
    pattern: /\b(ich|wir) fahre(n)? zu (berlin|hamburg|münchen|köln|bonn|bremen|frankfurt|dresden|leipzig)\b/gi,
    replacement: "$1 fahre$2 nach $3",
    type: "Präposition / Ort",
    explanation: "Artikelsiz şehir adlarıyla yön bildirirken ‘nach’ kullanılır."
  },
  {
    id: "perfekt-habe-gegangen",
    pattern: /\bich habe gegangen\b/gi,
    replacement: "ich bin gegangen",
    type: "Perfekt / Hilfsverb",
    explanation: "‘gehen’ hareket fiilidir; Perfekt'te ‘sein’ kullanılır."
  },
  {
    id: "perfekt-habe-gekommen",
    pattern: /\bich habe gekommen\b/gi,
    replacement: "ich bin gekommen",
    type: "Perfekt / Hilfsverb",
    explanation: "‘kommen’ hareket fiilidir; Perfekt'te ‘sein’ kullanılır."
  },
  {
    id: "perfekt-bin-gemacht",
    pattern: /\bich bin gemacht\b/gi,
    replacement: "ich habe gemacht",
    type: "Perfekt / Hilfsverb",
    explanation: "‘machen’ fiilinin Perfekt biçiminde ‘haben’ kullanılır."
  },
  {
    id: "perfekt-bin-gekauft",
    pattern: /\bich bin gekauft\b/gi,
    replacement: "ich habe gekauft",
    type: "Perfekt / Hilfsverb",
    explanation: "‘kaufen’ fiilinin Perfekt biçiminde ‘haben’ kullanılır."
  },
  {
    id: "question-wann-order",
    pattern: /\bwann (der kurs|die party|der unterricht|das treffen) (beginnt|endet|ist)\b/gi,
    replacement: "wann $2 $1",
    type: "Fragesatz / Verbposition",
    explanation: "Soru kelimesinden sonra çekimli fiil, ardından özne gelir."
  },
  {
    id: "question-price-order",
    pattern: /\bwie viel (der kurs|das hotel|die übernachtung) kostet\b/gi,
    replacement: "wie viel kostet $1",
    type: "Fragesatz / Verbposition",
    explanation: "Soru kelimesinden sonra çekimli fiil ikinci konuma gelir."
  },
  {
    id: "question-modal-separable",
    pattern: /\b(kann|darf) ich mitbringen (meine schwester|meinen bruder|einen freund|eine freundin|etwas)\b/gi,
    replacement: "$1 ich $2 mitbringen",
    type: "Fragesatz / Modalverb",
    explanation: "Modal soruda nesne ortada, mastar fiil cümlenin sonunda olur."
  },
  {
    id: "separable-mitbringe",
    pattern: /\bich mitbringe (meine schwester|meinen bruder|einen freund|eine freundin|etwas)\b/gi,
    replacement: "ich bringe $1 mit",
    type: "Trennbares Verb",
    explanation: "Ana cümlede ‘mitbringen’ ayrılır: ich bringe … mit."
  },
  {
    id: "separable-bringe-mit-object",
    pattern: /\bich bringe mit (meine schwester|meinen bruder|einen freund|eine freundin|etwas)\b/gi,
    replacement: "ich bringe $1 mit",
    type: "Trennbares Verb / Verbposition",
    explanation: "Ayrılan ‘mit’ parçası ana cümlenin sonuna gider."
  },
  {
    id: "informal-peter",
    pattern: /^\s*liebe peter\b/gim,
    replacement: "Lieber Peter",
    type: "Anrede / Genus",
    explanation: "Peter erkek adıdır; samimi hitap ‘Lieber Peter’ olur."
  },
  {
    id: "informal-anna",
    pattern: /^\s*lieber anna\b/gim,
    replacement: "Liebe Anna",
    type: "Anrede / Genus",
    explanation: "Anna kadın adıdır; samimi hitap ‘Liebe Anna’ olur."
  },
  {
    id: "formal-herr",
    pattern: /^\s*sehr geehrte herr\b/gim,
    replacement: "Sehr geehrter Herr",
    type: "Anrede / Genus",
    explanation: "‘Herr’ ile resmî hitap ‘Sehr geehrter Herr …’ şeklindedir."
  },
  {
    id: "formal-frau",
    pattern: /^\s*sehr geehrter frau\b/gim,
    replacement: "Sehr geehrte Frau",
    type: "Anrede / Genus",
    explanation: "‘Frau’ ile resmî hitap ‘Sehr geehrte Frau …’ şeklindedir."
  },
  {
    id: "negation-time",
    pattern: /\bich habe nicht zeit\b/gi,
    replacement: "ich habe keine Zeit",
    type: "Negation / Artikel",
    explanation: "Bir ismi olumsuz yaparken burada ‘kein’ kullanılır: keine Zeit."
  },
  {
    id: "negation-termin",
    pattern: /\bich habe kein termin\b/gi,
    replacement: "ich habe keinen Termin",
    type: "Negation / Akkusativ",
    explanation: "‘Termin’ eril ve burada Akkusativ olduğu için ‘keinen’ kullanılır."
  },
  {
    id: "possessive-help",
    pattern: /\bich brauche dein hilfe\b/gi,
    replacement: "ich brauche deine Hilfe",
    type: "Possessivartikel / Genus",
    explanation: "‘Hilfe’ dişil bir isimdir; bu nedenle ‘deine Hilfe’ kullanılır."
  },
  {
    id: "run-on-ich",
    pattern: /\b(ich (?:bin|habe|komme|muss|kann|möchte)[^.!?,;\n]{1,45})\s+(ich (?:bin|habe|komme|muss|kann|möchte))\b/gi,
    replacement: "$1. $2",
    type: "Satzzeichen / Satzgrenze",
    explanation: "İki ana cümleyi nokta ile ayır; ikinci cümle büyük harfle başlar."
  }
];

const commonGermanNouns = Object.freeze({
  adresse: "Adresse",
  abend: "Abend",
  auto: "Auto",
  anmeldung: "Anmeldung",
  antwort: "Antwort",
  arzt: "Arzt",
  arzttermin: "Arzttermin",
  bahnhof: "Bahnhof",
  brief: "Brief",
  bruder: "Bruder",
  bus: "Bus",
  café: "Café",
  dank: "Dank",
  deutschkurs: "Deutschkurs",
  einladung: "Einladung",
  familie: "Familie",
  fahrrad: "Fahrrad",
  formular: "Formular",
  freund: "Freund",
  freundin: "Freundin",
  geburtstag: "Geburtstag",
  geschenk: "Geschenk",
  grüße: "Grüße",
  herr: "Herr",
  herren: "Herren",
  hilfe: "Hilfe",
  hotel: "Hotel",
  information: "Information",
  informationen: "Informationen",
  kaffee: "Kaffee",
  kino: "Kino",
  kuchen: "Kuchen",
  kurs: "Kurs",
  medizin: "Medizin",
  monat: "Monat",
  mutter: "Mutter",
  montag: "Montag",
  dienstag: "Dienstag",
  mittwoch: "Mittwoch",
  donnerstag: "Donnerstag",
  freitag: "Freitag",
  samstag: "Samstag",
  sonntag: "Sonntag",
  park: "Park",
  party: "Party",
  preis: "Preis",
  schule: "Schule",
  schwester: "Schwester",
  sommer: "Sommer",
  sprachkurs: "Sprachkurs",
  salat: "Salat",
  stunde: "Stunde",
  stunden: "Stunden",
  termin: "Termin",
  unterricht: "Unterricht",
  unterkunft: "Unterkunft",
  uhr: "Uhr",
  vormittag: "Vormittag",
  woche: "Woche",
  wochenende: "Wochenende",
  winter: "Winter",
  zeit: "Zeit",
  zug: "Zug",
  ...Object.fromEntries(
    Object.keys(grammarReference.nounGender || {})
      .filter((noun) => !["Morgen", "Essen", "Treffen"].includes(noun))
      .map((noun) => [noun.toLocaleLowerCase("de-DE"), noun])
  )
});

const commonSpellingCorrections = Object.freeze({
  grusse: "Grüße",
  grüsse: "Grüße",
  "gruße": "Grüße",
  gruse: "Grüße",
  geburstag: "Geburtstag",
  geburtztag: "Geburtstag",
  einlandung: "Einladung",
  einladun: "Einladung",
  einladüng: "Einladung",
  trefen: "Treffen",
  treffenn: "Treffen",
  wochende: "Wochenende",
  wochenede: "Wochenende",
  kome: "komme",
  komen: "kommen",
  komenn: "kommen",
  komt: "kommt",
  kan: "kann",
  kansst: "kannst",
  konen: "können",
  konnen: "können",
  könen: "können",
  musen: "müssen",
  mussen: "müssen",
  müsen: "müssen",
  naturlich: "natürlich",
  spater: "später",
  fruh: "früh",
  uber: "über",
  fur: "für",
  zuruck: "zurück",
  wunsche: "wünsche",
  wunschen: "wünschen",
  vieleicht: "vielleicht",
  warscheinlich: "wahrscheinlich",
  nachste: "nächste",
  nachsten: "nächsten",
  moglich: "möglich",
  moeglich: "möglich",
  gemuse: "Gemüse",
  kaffe: "Kaffee",
  kafe: "Kaffee",
  artzt: "Arzt",
  artz: "Arzt",
  kranck: "krank",
  arbieten: "arbeiten",
  arbeten: "arbeiten",
  terminn: "Termin",
  sprachkurz: "Sprachkurs",
  deutch: "Deutsch",
  deutsh: "Deutsch",
  deutschkurz: "Deutschkurs",
  anmeldun: "Anmeldung",
  informazion: "Information",
  informazionen: "Informationen",
  antword: "Antwort",
  antwortten: "antworten",
  schiken: "schicken",
  schikken: "schicken",
  bittte: "bitte",
  entschuldiung: "Entschuldigung",
  freudin: "Freundin",
  freundinn: "Freundin",
  fahrrat: "Fahrrad",
  farad: "Fahrrad",
  farrad: "Fahrrad",
  banhof: "Bahnhof",
  bahnof: "Bahnhof",
  ubernachten: "übernachten",
  uberachten: "übernachten",
  strasse: "Straße",
  haubtstrasse: "Hauptstraße",
  funf: "fünf",
  zwolf: "zwölf",
  dreisig: "dreißig",
  nachmitag: "Nachmittag",
  vormitag: "Vormittag",
  mitag: "Mittag",
  mitbrigen: "mitbringen",
  abhohlen: "abholen",
  helffen: "helfen",
  geholffen: "geholfen",
  kopfschmertzen: "Kopfschmerzen",
  gebacht: "gebracht",
  gekomt: "gekommen",
  gefahrt: "gefahren",
  gegengen: "gegangen",
  geschreibt: "geschrieben",
  geschriben: "geschrieben",
  weill: "weil",
  ferstehen: "verstehen",
  verstehn: "verstehen",
  kursgebuhr: "Kursgebühr",
  gebuhr: "Gebühr",
  offnungszeiten: "Öffnungszeiten",
  offnung: "Öffnung",
  geoffnet: "geöffnet",
  geschlosen: "geschlossen",
  antwroten: "antworten",
  anwtoren: "antworten",
  besuhen: "besuchen",
  bescuhen: "besuchen",
  geshenk: "Geschenk",
  geschnek: "Geschenk",
  sprachkusr: "Sprachkurs",
  sprachkus: "Sprachkurs",
  arzttermi: "Arzttermin",
  arztterminn: "Arzttermin",
  ubernachtung: "Übernachtung",
  übernachtun: "Übernachtung",
  unterkunf: "Unterkunft",
  unterkunftt: "Unterkunft",
  moegte: "möchte",
  möhte: "möchte",
  schone: "schöne",
  schoene: "schöne",
  moge: "möge",
  zurük: "zurück",
  zuruckkomen: "zurückkommen",
  zuruckkommen: "zurückkommen",
  gestren: "gestern",
  gestan: "gestern",
  heutte: "heute",
  morgenn: "morgen",
  nachte: "nächste",
  näste: "nächste",
  wocheende: "Wochenende",
  wochennende: "Wochenende",
  monttag: "Montag",
  dinstag: "Dienstag",
  dienstagk: "Dienstag",
  mitwoch: "Mittwoch",
  mittwochh: "Mittwoch",
  donerstag: "Donnerstag",
  donnersttag: "Donnerstag",
  freittag: "Freitag",
  sammstag: "Samstag",
  sontag: "Sonntag",
  sonnntag: "Sonntag",
  abent: "Abend",
  morggen: "Morgen",
  somer: "Sommer",
  wintter: "Winter",
  marz: "März",
  maerz: "März",
  fruling: "Frühling",
  fruehling: "Frühling",
  schuhle: "Schule",
  schulee: "Schule",
  hotle: "Hotel",
  hoteel: "Hotel",
  caffe: "Café",
  cafe: "Café",
  resturant: "Restaurant",
  restaurantt: "Restaurant",
  adrese: "Adresse",
  addresse: "Adresse",
  hausnumer: "Hausnummer",
  plazt: "Platz",
  flughafe: "Flughafen",
  flughaven: "Flughafen",
  haltestellee: "Haltestelle",
  uhrzeittt: "Uhrzeit",
  bekomen: "bekommen",
  bekomenn: "bekommen",
  brachen: "brauchen",
  brauchhen: "brauchen",
  fraggen: "fragen",
  lerhnen: "lernen",
  lernnen: "lernen",
  schriben: "schreiben",
  schreieben: "schreiben",
  sprehen: "sprechen",
  arbeitten: "arbeiten",
  machenn: "machen",
  bringenn: "bringen",
  bleipen: "bleiben",
  bleibenn: "bleiben",
  schlaffen: "schlafen",
  kauffen: "kaufen",
  kosttet: "kostet",
  beginen: "beginnen",
  begginen: "beginnen",
  enddet: "endet",
  anmellden: "anmelden",
  absaggen: "absagen",
  verschiben: "verschieben",
  verschiebben: "verschieben",
  feiren: "feiern",
  trienken: "trinken",
  esssen: "essen",
  faahren: "fahren",
  farhen: "fahren",
  gehenn: "gehen",
  sihen: "sehen",
  wisenn: "wissen",
  einfah: "einfach",
  wichitg: "wichtig",
  wichtigg: "wichtig",
  leideer: "leider",
  entschuldigungg: "Entschuldigung",
  vilen: "vielen",
  dankee: "danke",
  grus: "Gruß",
  grußse: "Grüße",
  liebegrüße: "Liebe Grüße",
  freundlischen: "freundlichen",
  mitt: "mit",
  bie: "bei",
  ohnee: "ohne",
  gegenn: "gegen",
  zwichen: "zwischen",
  neban: "neben",
  trozdem: "trotzdem",
  deshalp: "deshalb",
  danch: "danach",
  vileicht: "vielleicht",
  gemeinsamm: "gemeinsam",
  zusamen: "zusammen",
  pünktlish: "pünktlich",
  punktlich: "pünktlich",
  möglisch: "möglich",
  unbedinkt: "unbedingt",
  wircklich: "wirklich",
  glucklich: "glücklich",
  glüklich: "glücklich",
  hübschh: "hübsch",
  günstik: "günstig",
  gesunt: "gesund",
  kraank: "krank",
  kopfwehhe: "Kopfweh",
  medezin: "Medizin",
  apoteke: "Apotheke",
  terminbestatigung: "Terminbestätigung",
  bestatigung: "Bestätigung",
  bestättigung: "Bestätigung",
  gebueren: "Gebühren",
  offentlich: "öffentlich",
  öffentlisch: "öffentlich",
  verfükbar: "verfügbar",
  errecihbar: "erreichbar",
  erreichbahr: "erreichbar",
  ...(grammarReference.spellingCorrections || {})
});

const a2VerbForms = Object.freeze(grammarReference.verbForms || {});

const modalFiniteForms = new Set(
  ["können", "müssen", "möchten", "mögen", "wollen", "dürfen", "sollen"]
    .flatMap((lemma) => Object.values(a2VerbForms[lemma] || {}))
    .map((form) => form.toLocaleLowerCase("de-DE"))
);
const separableA2Verbs = Object.freeze(grammarReference.separableVerbs || {});
const masculineA2Nouns = new Set(Object.entries(grammarReference.nounGender || {}).filter(([, gender]) => gender === "m").map(([noun]) => noun.toLocaleLowerCase("de-DE")));
const feminineA2Nouns = new Set(Object.entries(grammarReference.nounGender || {}).filter(([, gender]) => gender === "f").map(([noun]) => noun.toLocaleLowerCase("de-DE")));
const neuterA2Nouns = new Set(Object.entries(grammarReference.nounGender || {}).filter(([, gender]) => gender === "n").map(([noun]) => noun.toLocaleLowerCase("de-DE")));
const issuePriorityOrder = Object.freeze({
  meaning: 110,
  verbposition: 100,
  conjugation: 90,
  case: 80,
  preposition: 70,
  modal: 60,
  perfekt: 55,
  spelling: 40,
  capitalization: 30,
  punctuation: 20,
  style: 10
});

const verbFormIndex = (() => {
  const index = new Map();
  Object.entries(a2VerbForms).forEach(([lemma, forms]) => {
    Object.values(forms).forEach((form) => {
      const key = form.toLocaleLowerCase("de-DE");
      if (!index.has(key)) index.set(key, new Set());
      index.get(key).add(lemma);
    });
    if (!index.has(lemma)) index.set(lemma, new Set());
    index.get(lemma).add(lemma);
  });
  return index;
})();

let state = {
  activeTask: 0,
  drafts: {},
  freeDraft: "",
  completed: {},
  lastScore: null,
  bestScore: 0,
  attempts: 0
};

let timerRemaining = TASK_SECONDS;
let timerPaused = true;
let timerInterval = null;
let notificationTimeout = null;
let lastEvaluation = null;
let activePhraseCategory = "all";
let sessionStarted = false;
let selectedStartType = "task";
let isFreeWriting = false;
let pausedForAwayView = false;
let textareaSelection = { start: 0, end: 0 };

const dom = {};

function cacheDom() {
  [
    "headerTask", "timer", "pauseTimer", "resetTimer", "startView", "trainerView", "practiceView",
    "startExam", "openPhraseGuide", "startTaskGrid", "startSelectionLabel",
    "taskDifficulty", "taskTopic", "taskTitle", "taskSituation", "taskInstruction",
    "pointsSection", "contentPoints", "supportTools", "taskPhrases", "sampleAnswer", "tipsToggle", "tipsPanel",
    "sampleToggle", "samplePanel", "taskNavigation", "prevTask", "nextTask", "taskSelect", "studentText",
    "writingHeading", "writingHelp",
    "inlineReview", "inlineReviewCount", "inlineReviewHelp", "reviewedLetter", "inlineExplanations",
    "wordCount", "wordTarget", "charCount", "lengthStatus", "checkLetter",
    "resultsPanel", "resultsContent", "closeResults", "notification",
    "phraseSearch", "phraseCategories", "phraseBankList", "bankPractice", "resetProgress"
  ].forEach((id) => {
    dom[id] = document.getElementById(id);
  });
}

function initializeApp() {
  cacheDom();
  loadProgress();
  buildTaskSelect();
  renderStartTaskGrid();
  bindEvents();
  renderTask();
  updateCounters();
  renderTimer();
  renderPhraseCategories();
  renderPhraseBank();
  switchView("home");

  window.AYDA_TEST = Object.freeze({
    tasks,
    phraseBank,
    countWords,
    detectGreeting,
    detectClosing,
    analyseContentPoints,
    calculateTelcScore,
    runLocalLanguageChecks,
    deduplicateIssues,
    buildCorrectedText,
    grammarReference,
    getSpellingCorrectionCount: () => Object.keys(commonSpellingCorrections).length,
    evaluateLetterSuitability,
    getExpectedFormality,
    insertAtCursor,
    getTimerRemaining: () => timerRemaining,
    isSessionStarted: () => sessionStarted,
    isFreeWriting: () => isFreeWriting
  });
}

function bindEvents() {
  dom.studentText.addEventListener("input", () => {
    rememberTextareaSelection();
    updateCounters();
    saveDraft();
    dom.inlineReview.hidden = true;
    dom.resultsPanel.hidden = true;
  });

  ["select", "keyup", "click", "focus"].forEach((eventName) => {
    dom.studentText.addEventListener(eventName, rememberTextareaSelection);
  });

  document.getElementById("germanKeyboard").addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) {
      rememberTextareaSelection();
      event.preventDefault();
    }
  });
  document.getElementById("germanKeyboard").addEventListener("mousedown", (event) => {
    if (event.target.closest("button")) {
      rememberTextareaSelection();
      event.preventDefault();
    }
  });
  document.getElementById("germanKeyboard").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-char]");
    if (button) insertAtCursor(button.dataset.char);
  });

  dom.prevTask.addEventListener("click", () => changeTask(state.activeTask - 1));
  dom.nextTask.addEventListener("click", () => changeTask(state.activeTask + 1));
  dom.taskSelect.addEventListener("change", () => changeTask(Number(dom.taskSelect.value)));
  dom.checkLetter.addEventListener("click", handleLetterCheck);
  dom.closeResults.addEventListener("click", () => { dom.resultsPanel.hidden = true; });
  dom.pauseTimer.addEventListener("click", toggleTimerPause);
  dom.resetTimer.addEventListener("click", resetTimer);
  dom.resetProgress.addEventListener("click", resetProgress);
  dom.startExam.addEventListener("click", startExamSession);
  dom.openPhraseGuide.addEventListener("click", () => switchView("practice"));
  dom.startTaskGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-start-type]");
    if (!button) return;
    selectStartOption(button.dataset.startType, button.dataset.taskIndex);
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  dom.tipsToggle.addEventListener("click", () => toggleAccordion(dom.tipsToggle, dom.tipsPanel));
  dom.sampleToggle.addEventListener("click", () => toggleAccordion(dom.sampleToggle, dom.samplePanel));

  dom.phraseSearch.addEventListener("input", renderPhraseBank);
  dom.phraseCategories.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activePhraseCategory = button.dataset.category;
    renderPhraseCategories();
    renderPhraseBank();
  });
  dom.phraseBankList.addEventListener("click", handleCopyClick);
  dom.taskPhrases.addEventListener("click", handleCopyClick);
}

function buildTaskSelect() {
  dom.taskSelect.replaceChildren();
  tasks.forEach((task, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `Soru ${String(task.id).padStart(2, "0")} — ${task.topic}`;
    dom.taskSelect.append(option);
  });
}

function renderStartTaskGrid() {
  dom.startTaskGrid.replaceChildren();
  tasks.forEach((task, index) => {
    const button = element("button", "start-task-option", `Mektup ${task.id}`);
    button.type = "button";
    button.dataset.startType = "task";
    button.dataset.taskIndex = String(index);
    button.title = task.topic;
    const selected = selectedStartType === "task" && state.activeTask === index;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
    dom.startTaskGrid.append(button);
  });

  const freeButton = element("button", "start-task-option free-option");
  freeButton.type = "button";
  freeButton.dataset.startType = "free";
  freeButton.append(
    element("strong", "", "Serbest Metin / Mektup"),
    element("small", "", "Kendi Almanca yazınızı kontrol edin")
  );
  const freeSelected = selectedStartType === "free";
  freeButton.classList.toggle("active", freeSelected);
  freeButton.setAttribute("aria-pressed", String(freeSelected));
  dom.startTaskGrid.append(freeButton);

  dom.startSelectionLabel.textContent = freeSelected ? "Serbest Metin / Mektup" : `Mektup ${tasks[state.activeTask].id}`;
  dom.startExam.textContent = freeSelected ? "Serbest Yazmayı Başlat" : `Mektup ${tasks[state.activeTask].id}'i Başlat`;
}

function selectStartOption(type, taskIndex) {
  selectedStartType = type === "free" ? "free" : "task";
  if (selectedStartType === "task") {
    const index = Number(taskIndex);
    if (Number.isInteger(index) && index >= 0 && index < tasks.length) state.activeTask = index;
  }
  saveProgress();
  renderStartTaskGrid();
}

function renderTask() {
  const task = tasks[state.activeTask];
  dom.contentPoints.replaceChildren();
  if (isFreeWriting) {
    dom.headerTask.textContent = "Serbest yazma";
    dom.taskDifficulty.textContent = "SERBEST";
    dom.taskTopic.textContent = "Kendi Almanca yazınız";
    dom.taskTitle.textContent = "Serbest Metin / Mektup";
    dom.taskSituation.textContent = "İstediğiniz Almanca metni veya mektubu yazabilirsiniz.";
    dom.taskInstruction.textContent = "Sistem görev maddesi aramaz; yazım ve dilbilgisi kontrolü yapar. Mektup yazarsanız hitap ve kapanış da gösterilir.";
    dom.pointsSection.hidden = true;
    dom.supportTools.hidden = true;
    dom.taskNavigation.hidden = true;
    dom.taskPhrases.replaceChildren();
    dom.sampleAnswer.textContent = "";
    dom.writingHeading.textContent = "Almanca metninizi buraya yazın";
    dom.writingHelp.textContent = "Mektup, kısa yazı veya istediğiniz başka bir Almanca metin olabilir.";
    dom.inlineReviewHelp.textContent = "Yazdığınız metnin kontrol edilmiş kopyasıdır. Her numaranın açıklaması hemen alttadır.";
    dom.studentText.placeholder = "Almanca metninizi buraya yazın…";
    dom.studentText.value = state.freeDraft || "";
  } else {
    dom.headerTask.textContent = `Soru ${String(task.id).padStart(2, "0")} / ${tasks.length}`;
    dom.taskDifficulty.textContent = task.difficulty;
    dom.taskTopic.textContent = task.topic;
    dom.taskTitle.textContent = `Mektup ${task.id}`;
    dom.taskSituation.textContent = task.situation;
    dom.taskInstruction.textContent = task.instruction;
    dom.taskSelect.value = String(state.activeTask);
    dom.prevTask.disabled = state.activeTask === 0;
    dom.nextTask.disabled = state.activeTask === tasks.length - 1;
    dom.pointsSection.hidden = false;
    dom.supportTools.hidden = false;
    dom.taskNavigation.hidden = false;
    task.points.forEach((item) => {
      const li = document.createElement("li");
      const label = document.createElement("span");
      label.textContent = item.label;
      const status = document.createElement("span");
      status.className = "point-state";
      status.textContent = "";
      li.append(label, status);
      dom.contentPoints.append(li);
    });
    renderTaskPhrases(task);
    dom.sampleAnswer.textContent = task.sampleAnswer;
    dom.writingHeading.textContent = "Almanca mektubunuzu buraya yazın";
    dom.writingHelp.textContent = "Kısa ve basit yazmanız yeterli. Yanlış yapmaktan korkmayın.";
    dom.inlineReviewHelp.textContent = "Yazdığınız mektubun kontrol edilmiş kopyasıdır. Her numaranın açıklaması hemen alttadır.";
    dom.studentText.placeholder = "Liebe Anna,\n\nvielen Dank für deine E-Mail. ...";
    dom.studentText.value = state.drafts[String(task.id)] || "";
  }

  closeAccordions();
  dom.resultsPanel.hidden = true;
  dom.inlineReview.hidden = true;
  lastEvaluation = null;
  updateCounters();
}

function renderTaskPhrases(task) {
  dom.taskPhrases.replaceChildren();
  task.recommendedPhraseIds.forEach((id) => {
    const phrase = phrasesById[id];
    if (!phrase) return;
    const row = document.createElement("div");
    row.className = "task-phrase";
    const text = document.createElement("span");
    text.textContent = phrase.text;
    const copy = makeCopyButton(phrase.text);
    row.append(text, copy);
    dom.taskPhrases.append(row);
  });
}

function changeTask(nextIndex) {
  if (nextIndex < 0 || nextIndex >= tasks.length || nextIndex === state.activeTask) return;
  saveDraft();
  isFreeWriting = false;
  selectedStartType = "task";
  state.activeTask = nextIndex;
  saveProgress();
  renderStartTaskGrid();
  resetTimer(false);
  renderTask();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function countWords(text) {
  const matches = String(text).trim().match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu);
  return matches ? matches.length : 0;
}

function updateCounters() {
  const text = dom.studentText.value;
  const words = countWords(text);
  dom.wordCount.textContent = String(words);
  dom.charCount.textContent = String(text.length);

  if (isFreeWriting) {
    dom.wordTarget.textContent = "";
    dom.lengthStatus.textContent = words === 0 ? "Yazmaya başlayın." : "Serbest yazı";
    dom.lengthStatus.className = words === 0 ? "length-status warn" : "length-status good";
    return;
  }

  dom.wordTarget.textContent = " / yaklaşık 40";

  let message = "Biraz daha yazabilirsin.";
  let className = "length-status warn";
  if (words >= 21 && words <= 29) message = "Görev maddelerini tamamla.";
  if (words >= 30 && words <= 55) {
    message = "Uzunluk iyi.";
    className = "length-status good";
  }
  if (words >= 56) message = "Bu görev için biraz uzun olabilir.";
  dom.lengthStatus.textContent = message;
  dom.lengthStatus.className = className;
}

function insertAtCursor(character) {
  const textarea = dom.studentText;
  const start = Number.isInteger(textareaSelection.start) ? textareaSelection.start : textarea.value.length;
  const end = Number.isInteger(textareaSelection.end) ? textareaSelection.end : textarea.value.length;
  textarea.value = textarea.value.slice(0, start) + character + textarea.value.slice(end);
  const cursor = start + character.length;
  textarea.focus({ preventScroll: true });
  textarea.setSelectionRange(cursor, cursor);
  textareaSelection = { start: cursor, end: cursor };
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

function rememberTextareaSelection() {
  if (!dom.studentText) return;
  const start = dom.studentText.selectionStart;
  const end = dom.studentText.selectionEnd;
  if (typeof start === "number" && typeof end === "number") textareaSelection = { start, end };
}

function normalizeText(text) {
  return String(text)
    .toLocaleLowerCase("de-DE")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[„“”"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(text) {
  return String(text)
    .split(/(?<=[.!?])\s+|\n+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function testPattern(pattern, text) {
  try {
    return new RegExp(pattern, "i").test(text);
  } catch (_error) {
    return false;
  }
}

function scoreContentPoint(contentPoint, text) {
  const sentences = splitSentences(text);
  let best = { score: 0, sentence: "", evidence: [], confidence: 0 };

  sentences.forEach((sentence) => {
    const normalized = normalizeText(sentence);
    const hits = [];
    contentPoint.keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      if (normalized.includes(normalizedKeyword)) hits.push(keyword);
    });
    const phraseHits = contentPoint.phrases.filter((phrase) => normalized.includes(normalizeText(phrase)));
    const intentHits = contentPoint.intentPatterns.filter((pattern) => testPattern(pattern, normalized));
    const sentenceWords = countWords(sentence);
    const hasDetail = /\?|\b(?:am|um|mit|bis|weil|kann|möchte|muss|euro|uhr|samstag|sonntag|montag|dienstag|mittwoch|donnerstag|freitag)\b/i.test(sentence);
    const related = hits.length > 0 || phraseHits.length > 0 || intentHits.length > 0;

    let score = 0;
    if (related) score = 1.5;
    if (
      related && sentenceWords >= 4 &&
      (hits.length >= 2 || phraseHits.length > 0 || intentHits.length > 0) &&
      (hasDetail || sentenceWords >= 7)
    ) {
      score = 3;
    }

    const confidence = hits.length + phraseHits.length * 2 + intentHits.length * 2 + (hasDetail ? 0.5 : 0);
    if (score > best.score || (score === best.score && confidence > best.confidence)) {
      best = {
        score,
        sentence,
        evidence: [...hits, ...phraseHits, ...intentHits.map(() => "intent")],
        confidence
      };
    }
  });

  return { ...contentPoint, ...best };
}

function analyseContentPoints(task, text) {
  return task.points.map((contentPoint) => scoreContentPoint(contentPoint, text));
}

function detectGreeting(text) {
  const firstLines = String(text).trimStart().split(/\n|[.!?]\s/).slice(0, 2).join(" ");
  const informal = /^(?:liebe\s+\p{L}+|lieber\s+\p{L}+|hallo(?:\s+\p{L}+)?)\s*,?/iu.test(firstLines);
  const formal = /^(?:sehr geehrte(?:r|\s+frau|\s+herr|\s+damen)|guten tag)/iu.test(firstLines);
  return { found: informal || formal, type: formal ? "formal" : informal ? "informal" : null };
}

function detectClosing(text) {
  const ending = String(text).trim().split(/\n/).slice(-4).join(" ");
  const formal = /mit freundlichen gr(?:ü|u|ue)ßen/iu.test(ending);
  const informal = /(?:liebe|viele|herzliche) gr(?:ü|u|ue)ße|bis bald/iu.test(ending);
  return { found: formal || informal, type: formal ? "formal" : informal ? "informal" : null };
}

function calculateTelcScore(task, text) {
  const analyses = analyseContentPoints(task, text);
  const ranked = analyses
    .map((item, index) => ({ ...item, originalIndex: index }))
    .sort((a, b) => b.score - a.score || b.confidence - a.confidence || a.originalIndex - b.originalIndex);
  const evaluated = ranked.slice(0, 3);
  const contentScore = evaluated.reduce((sum, item) => sum + item.score, 0);
  const greeting = detectGreeting(text);
  const closing = detectClosing(text);
  let communicationScore = 0;
  if (greeting.found || closing.found) communicationScore = 0.5;
  if (greeting.found && closing.found) communicationScore = 1;
  const styleMismatch = greeting.found && closing.found && greeting.type !== closing.type;

  return {
    analyses,
    evaluated,
    evaluatedNumbers: evaluated.map((item) => item.originalIndex + 1).sort((a, b) => a - b),
    contentScore,
    communicationScore,
    total: contentScore + communicationScore,
    greeting,
    closing,
    styleMismatch
  };
}

function classifyIssuePriority(type, ruleId = "") {
  const value = normalizeText(`${type || ""} ${ruleId || ""}`);
  if (value.includes("eksik fiil") || value.includes("fazla fiil") || value.includes("kelime secimi")) return issuePriorityOrder.meaning;
  if (value.includes("verbposition") || value.includes("wortstellung") || value.includes("fragesatz") || value.includes("nebensatz") || value.includes("trennbar")) return issuePriorityOrder.verbposition;
  if (value.includes("verbkonjugation") || value.includes("ozne-fiil") || value.includes("grammatik / verb")) return issuePriorityOrder.conjugation;
  if (value.includes("anrede") || value.includes("grussformel")) return issuePriorityOrder.case;
  if (value.includes("artikel") || value.includes("akkusativ") || value.includes("dativ") || value.includes("possessiv") || value.includes("personalpronomen") || value.includes("genus")) return issuePriorityOrder.case;
  if (value.includes("praposition") || value.includes("zeitangabe")) return issuePriorityOrder.preposition;
  if (value.includes("modal") || value.includes("infinitiv")) return issuePriorityOrder.modal;
  if (value.includes("perfekt") || value.includes("hilfsverb")) return issuePriorityOrder.perfekt;
  if (value.includes("rechtschreib") || value.includes("yazim") || value.includes("yazım") || value.includes("spelling")) return issuePriorityOrder.spelling;
  if (value.includes("gross") || value.includes("buyuk harf")) return issuePriorityOrder.capitalization;
  if (value.includes("satzzeichen") || value.includes("noktalama")) return issuePriorityOrder.punctuation;
  return issuePriorityOrder.style;
}

function makeLocalIssue({
  ruleId,
  type,
  explanation,
  original,
  suggestion,
  offset,
  source = "local",
  severity = "ERROR",
  confidence = "high",
  safeToApply,
  priority
}) {
  const normalizedConfidence = ["high", "medium", "low"].includes(String(confidence).toLocaleLowerCase("en-US"))
    ? String(confidence).toLocaleLowerCase("en-US")
    : "low";
  let normalizedSeverity = ["ERROR", "IMPROVEMENT", "INFO"].includes(String(severity).toLocaleUpperCase("en-US"))
    ? String(severity).toLocaleUpperCase("en-US")
    : "ERROR";
  if (normalizedConfidence === "low" && normalizedSeverity === "ERROR") normalizedSeverity = "INFO";
  return {
    source,
    ruleId,
    type,
    severity: normalizedSeverity,
    confidence: normalizedConfidence,
    safeToApply: safeToApply ?? (source !== "suitability" && normalizedConfidence === "high" && normalizedSeverity !== "INFO"),
    priority: Number.isFinite(priority) ? priority : classifyIssuePriority(type, ruleId),
    message: explanation,
    explanation,
    original,
    suggestion,
    offset,
    length: original.length,
    replacement: suggestion
  };
}

function getExpectedFormality(task) {
  const ids = task && Array.isArray(task.recommendedPhraseIds) ? task.recommendedPhraseIds : [];
  return ids.some((id) => ["greet-damen", "greet-frau", "greet-herr", "close-formal"].includes(id))
    ? "formal"
    : "informal";
}

function runSpellingChecks(text) {
  const value = String(text);
  const issues = [];
  for (const match of value.matchAll(/[\p{L}]+/gu)) {
    const key = match[0].toLocaleLowerCase("de-DE");
    const preferred = commonSpellingCorrections[key];
    if (!preferred) continue;
    const startsUppercase = match[0][0] === match[0][0].toLocaleUpperCase("de-DE");
    const suggestion = startsUppercase && preferred[0] === preferred[0].toLocaleLowerCase("de-DE")
      ? preferred[0].toLocaleUpperCase("de-DE") + preferred.slice(1)
      : preferred;
    issues.push(makeLocalIssue({
      ruleId: `spelling-${key}`,
      type: "Yazım",
      explanation: `Bu kelimenin standart Almanca yazımı “${suggestion}” şeklindedir.`,
      original: match[0],
      suggestion,
      offset: match.index
    }));
  }
  return issues;
}

function preserveInitialCase(original, suggestion) {
  const originalLetter = String(original).match(/\p{L}/u);
  const suggestionLetter = String(suggestion).match(/\p{L}/u);
  if (!originalLetter || !suggestionLetter) return suggestion;
  if (originalLetter[0] !== originalLetter[0].toLocaleUpperCase("de-DE")) return suggestion;
  const index = suggestion.indexOf(suggestionLetter[0]);
  return suggestion.slice(0, index) + suggestionLetter[0].toLocaleUpperCase("de-DE") + suggestion.slice(index + suggestionLetter[0].length);
}

function escapeRegexText(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSentenceSpans(text) {
  const spans = [];
  for (const match of String(text).matchAll(/[^.!?\r\n]+[.!?]?/g)) {
    const leading = match[0].match(/^\s*/)?.[0].length || 0;
    const trailing = match[0].match(/\s*$/)?.[0].length || 0;
    const value = match[0].slice(leading, match[0].length - trailing);
    if (!value) continue;
    spans.push({ text: value, start: match.index + leading, end: match.index + match[0].length - trailing });
  }
  return spans;
}

function personForSubject(subject) {
  if (subject === "Sie") return "Sie";
  const key = String(subject).toLocaleLowerCase("de-DE");
  if (["ich", "du", "er", "es", "wir", "ihr"].includes(key)) return key;
  if (["man", "meine mutter", "mein bruder", "der kurs", "die party", "das treffen"].includes(key)) return "er";
  return null;
}

function correctedVerbForSubject(form, subject) {
  const person = personForSubject(subject);
  if (!person) return form;
  const candidates = verbFormIndex.get(String(form).toLocaleLowerCase("de-DE"));
  if (!candidates) return form;
  for (const lemma of candidates) {
    const expected = a2VerbForms[lemma]?.[person];
    if (expected) return expected;
  }
  return form;
}

function infinitiveForFiniteForm(form) {
  const key = String(form).toLocaleLowerCase("de-DE");
  const special = { mitbringe: "mitbringen", ankomme: "ankommen", abhole: "abholen", anrufe: "anrufen", einlade: "einladen", aufstehe: "aufstehen", mitkomme: "mitkommen", zurückkomme: "zurückkommen", vorbeikomme: "vorbeikommen" };
  if (special[key]) return special[key];
  const candidates = verbFormIndex.get(key);
  if (!candidates) return null;
  for (const lemma of candidates) {
    if (lemma !== key) return lemma;
  }
  return null;
}

function runConjugationChecks(text) {
  const value = String(text);
  const issues = [];
  const words = [...value.matchAll(/\p{L}+/gu)];
  for (let index = 0; index < words.length - 1; index += 1) {
    const subject = words[index][0];
    const person = personForSubject(subject);
    if (!person) continue;
    const verb = words[index + 1];
    const between = value.slice(words[index].index + subject.length, verb.index);
    if (!/^\s+$/u.test(between)) continue;
    const previousWord = words[index - 1];
    const twoWordsBefore = words[index - 2];
    const followingWord = words[index + 2];
    const previousIsModal = previousWord && modalFiniteForms.has(previousWord[0].toLocaleLowerCase("de-DE"));
    const twoWordsBeforeIsModal = twoWordsBefore && modalFiniteForms.has(twoWordsBefore[0].toLocaleLowerCase("de-DE"));
    const followingIsModal = followingWord && modalFiniteForms.has(followingWord[0].toLocaleLowerCase("de-DE"));
    if (previousIsModal || twoWordsBeforeIsModal || followingIsModal) continue;
    const candidates = verbFormIndex.get(verb[0].toLocaleLowerCase("de-DE"));
    if (!candidates) continue;
    for (const lemma of candidates) {
      const expected = a2VerbForms[lemma]?.[person];
      if (!expected || expected === verb[0].toLocaleLowerCase("de-DE")) continue;
      issues.push(makeLocalIssue({
        ruleId: `conjugation-${lemma}-${person}`,
        type: "Verbkonjugation / Özne-fiil uyumu",
        explanation: `‘${subject}’ öznesiyle fiilin doğru çekimi ‘${expected}’ olur.`,
        original: verb[0],
        suggestion: expected,
        offset: verb.index,
        priority: issuePriorityOrder.conjugation
      }));
      break;
    }
  }
  return issues;
}

function runModalChecks(text) {
  const issues = [];
  getSentenceSpans(text).forEach((span) => {
    const core = span.text.replace(/[.!?]+$/u, "").trim();
    const modal = core.match(/\b(ich|du|er|sie|es|wir|ihr|Sie)\s+(kann|kannst|können|könnt|muss|musst|müssen|müsst|möchte|möchtest|möchten|möchtet|mag|magst|mögen|mögt|will|willst|wollen|wollt|darf|darfst|dürfen|dürft|soll|sollst|sollen|sollt)\b/iu);
    if (!modal) return;
    const lastWord = [...core.matchAll(/\p{L}+/gu)].at(-1);
    if (!lastWord || lastWord.index <= modal.index + modal[0].length) return;
    const infinitive = infinitiveForFiniteForm(lastWord[0]);
    if (infinitive && !modalFiniteForms.has(lastWord[0].toLocaleLowerCase("de-DE"))) {
      issues.push(makeLocalIssue({
        ruleId: "modal-final-infinitive",
        type: "Modalverb / Infinitiv",
        explanation: "Modal fiilden sonra ana fiil mastar hâlinde cümlenin sonunda kullanılır.",
        original: lastWord[0],
        suggestion: infinitive,
        offset: span.start + lastWord.index,
        priority: issuePriorityOrder.modal
      }));
    }

    const naturalOrder = core.match(/^(ich|du|er|sie|es|wir|ihr|Sie)\s+(kann|kannst|können|könnt|muss|musst|müssen|müsst|möchte|möchtest|möchten|möchtet|will|willst|wollen|wollt)\s+(kommen|gehen|arbeiten|fahren|helfen|bleiben|schlafen)\s+(heute|morgen|später|am\s+\p{L}+|um\s+\d{1,2}(?::\d{2})?\s+Uhr)$/iu);
    if (naturalOrder) {
      const suggestion = `${naturalOrder[1]} ${naturalOrder[2]} ${naturalOrder[4]} ${naturalOrder[3]}`;
      issues.push(makeLocalIssue({
        ruleId: "modal-natural-order",
        type: "Modalverb / Satzstellung",
        explanation: "Cümle anlaşılır; zaman ifadesi ana fiilden önce daha doğal durur.",
        original: core,
        suggestion: preserveInitialCase(core, suggestion),
        offset: span.start,
        severity: "IMPROVEMENT",
        confidence: "medium",
        safeToApply: false,
        priority: issuePriorityOrder.style
      }));
    }
  });
  return issues;
}

function runSeparableVerbChecks(text) {
  const issues = [];
  getSentenceSpans(text).forEach((span) => {
    const core = span.text.replace(/[.!?]+$/u, "").trim();
    Object.entries(separableA2Verbs).forEach(([infinitive, data]) => {
      const joinedForms = [...new Set([infinitive, ...Object.values(data.forms).map((form) => `${data.particle}${form}`)])]
        .sort((a, b) => b.length - a.length)
        .join("|");
      const subjectPattern = "(ich|du|er|sie|es|wir|ihr|Sie)";
      const joinedPattern = new RegExp(`^${subjectPattern}\\s+(${joinedForms})(?:\\s+(.+))?$`, "iu");
      const joined = core.match(joinedPattern);
      if (joined) {
        const person = personForSubject(joined[1]);
        const finite = person ? data.forms[person] : null;
        if (finite) {
          const middle = joined[3] ? ` ${joined[3]}` : "";
          issues.push(makeLocalIssue({
            ruleId: `separable-joined-${infinitive}`,
            type: "Trennbares Verb / Verbposition",
            explanation: `Ana cümlede ‘${infinitive}’ ayrılır; ‘${data.particle}’ parçası sona gider.`,
            original: core,
            suggestion: `${joined[1]} ${finite}${middle} ${data.particle}`,
            offset: span.start,
            priority: issuePriorityOrder.verbposition
          }));
        }
      }

      const finiteForms = [...new Set(Object.values(data.forms))].sort((a, b) => b.length - a.length).join("|");
      const middleParticlePattern = new RegExp(`^${subjectPattern}\\s+(${finiteForms})\\s+${data.particle}\\s+(.+)$`, "iu");
      const middleParticle = core.match(middleParticlePattern);
      const tailLooksLikePrepositionalObject = middleParticle && /^(?:der|die|das|dem|den|ein(?:e[rmn]?)?|mein(?:e[rmn]?)?|dein(?:e[rmn]?)?|sein(?:e[rmn]?)?|ihr(?:e[rmn]?)?|mir|dir|ihm|ihr|uns|euch)\b/iu.test(middleParticle[3]);
      const ambiguousMitkommen = infinitive === "mitkommen";
      if (middleParticle && !ambiguousMitkommen && !(data.particle === "mit" && tailLooksLikePrepositionalObject) && !middleParticle[3].toLocaleLowerCase("de-DE").endsWith(` ${data.particle}`)) {
        issues.push(makeLocalIssue({
          ruleId: `separable-particle-order-${infinitive}`,
          type: "Trennbares Verb / Verbposition",
          explanation: `Ayrılan ‘${data.particle}’ parçası ana cümlenin sonuna gider.`,
          original: core,
          suggestion: `${middleParticle[1]} ${middleParticle[2]} ${middleParticle[3]} ${data.particle}`,
          offset: span.start,
          priority: issuePriorityOrder.verbposition
        }));
      }
    });
  });
  return issues;
}

function runSentenceOrderChecks(text) {
  const issues = [];
  const timeStart = "(?:Heute|Morgen|Danach|Deshalb|Dann|Am\\s+(?:Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Wochenende|Morgen|Abend)|Um\\s+\\d{1,2}(?::\\d{2})?\\s+Uhr|Im\\s+(?:März|Sommer|Winter)|Nächste\\s+Woche)";
  const subject = "(?:ich|du|er|sie|es|wir|ihr|Sie)";
  const timeFirstPattern = new RegExp(`^(${timeStart})\\s+(${subject})\\s+(\\p{L}+)`, "iu");
  const subjectFirstPattern = new RegExp(`^(${subject})\\s+(${timeStart})\\s+(\\p{L}+)`, "iu");

  getSentenceSpans(text).forEach((span) => {
    const core = span.text.replace(/[.!?]+$/u, "").trim();
    const timeFirst = core.match(timeFirstPattern);
    if (timeFirst && verbFormIndex.has(timeFirst[3].toLocaleLowerCase("de-DE"))) {
      const verb = correctedVerbForSubject(timeFirst[3], timeFirst[2]);
      issues.push(makeLocalIssue({
        ruleId: "time-fronted-v2",
        type: "Verbposition / Zeitangabe",
        explanation: "Zaman ifadesi baştaysa çekimli fiil ikinci, özne üçüncü konumda olur.",
        original: timeFirst[0],
        suggestion: `${timeFirst[1]} ${verb} ${timeFirst[2]}`,
        offset: span.start,
        priority: issuePriorityOrder.verbposition
      }));
    }

    const subjectFirst = core.match(subjectFirstPattern);
    if (subjectFirst && verbFormIndex.has(subjectFirst[3].toLocaleLowerCase("de-DE"))) {
      const verb = correctedVerbForSubject(subjectFirst[3], subjectFirst[1]);
      issues.push(makeLocalIssue({
        ruleId: "subject-time-v2",
        type: "Verbposition / Zeitangabe",
        explanation: "Ana cümlede çekimli fiil genellikle ikinci konumda olur.",
        original: subjectFirst[0],
        suggestion: `${subjectFirst[1]} ${verb} ${subjectFirst[2]}`,
        offset: span.start,
        priority: issuePriorityOrder.verbposition
      }));
    }

    const whQuestion = core.match(/^(Was|Wann|Wo|Warum|Wie)\s+(ich|du|er|sie|es|wir|ihr|Sie)\s+(\p{L}+)/iu);
    if (whQuestion && verbFormIndex.has(whQuestion[3].toLocaleLowerCase("de-DE"))) {
      const verb = correctedVerbForSubject(whQuestion[3], whQuestion[2]);
      issues.push(makeLocalIssue({
        ruleId: "wh-question-v2",
        type: "Fragesatz / Verbposition",
        explanation: "Doğrudan soruda soru kelimesinden sonra çekimli fiil, ardından özne gelir.",
        original: whQuestion[0],
        suggestion: `${whQuestion[1]} ${verb} ${whQuestion[2]}`,
        offset: span.start,
        priority: issuePriorityOrder.verbposition
      }));
    }
  });
  return issues;
}

function runSubordinateClauseChecks(text) {
  const value = String(text);
  const issues = [];
  const supportedConjunctions = (grammarReference.subordinateConjunctions || ["weil", "dass", "wenn"]).join("|");
  const subject = "(ich|du|er|sie|es|wir|ihr|Sie|meine Mutter|mein Bruder|der Kurs|die Party|das Treffen)";
  const finite = "(bin|bist|ist|sind|seid|habe|hast|hat|haben|habt|kann|kannst|können|könnt|muss|musst|müssen|müsst|möchte|möchtest|möchten|möchtet|will|willst|wollen|wollt|darf|darfst|dürfen|dürft|soll|sollst|sollen|sollt|beginnt|endet)";
  const pattern = new RegExp(`\\b(${supportedConjunctions})\\s+${subject}\\s+${finite}\\s+([^,.!?;\\n]+)`, "giu");
  for (const match of value.matchAll(pattern)) {
    const conjunction = match[1];
    const clauseSubject = match[2];
    const originalFinite = match[3];
    const tail = match[4].trim();
    if (!tail) continue;
    const correctedFinite = correctedVerbForSubject(originalFinite, clauseSubject);
    issues.push(makeLocalIssue({
      ruleId: `${conjunction.toLocaleLowerCase("de-DE")}-verb-final`,
      type: `Nebensatz / ${conjunction} / Verbposition`,
      explanation: `‘${conjunction}’ ile başlayan yan cümlede çekimli fiil sona gider.`,
      original: match[0],
      suggestion: `${conjunction} ${clauseSubject} ${tail} ${correctedFinite}`,
      offset: match.index,
      priority: issuePriorityOrder.verbposition
    }));
  }
  return issues;
}

function runCaseAndPrepositionChecks(text) {
  const value = String(text);
  const issues = [];
  const masculine = [...masculineA2Nouns].join("|");
  const feminine = [...feminineA2Nouns].join("|");
  const allDativeNouns = [...masculineA2Nouns, ...feminineA2Nouns, ...neuterA2Nouns].join("|");
  const accusativeArticles = {
    ...(grammarReference.articleDeclension?.accusative?.m || {}),
    ...(grammarReference.possessiveDeclension?.accusativeMasculine || {}),
    eine: "einen",
    keine: "keinen"
  };
  const accusativePattern = new RegExp(`\\b(habe|hast|hat|haben|brauche|brauchst|braucht|sehen|sehe|siehst|sieht|besuche|besuchst|besucht|treffe|triffst|trifft|bringe|bringst|bringt|kaufe|kaufst|kauft)\\s+(der|ein|eine|mein|meine|dein|deine|sein|seine|ihr|ihre|kein|keine)\\s+(${masculine})\\b`, "giu");
  for (const match of value.matchAll(accusativePattern)) {
    const article = match[2].toLocaleLowerCase("de-DE");
    const expected = accusativeArticles[article];
    if (!expected || expected === article) continue;
    const original = `${match[2]} ${match[3]}`;
    const offset = match.index + match[0].toLocaleLowerCase("de-DE").lastIndexOf(original.toLocaleLowerCase("de-DE"));
    issues.push(makeLocalIssue({
      ruleId: "masculine-accusative",
      type: "Artikel / Akkusativ",
      explanation: `‘${match[3]}’ eril bir isimdir; burada Akkusativ biçimi ‘${expected}’ olur.`,
      original,
      suggestion: `${expected} ${commonGermanNouns[match[3].toLocaleLowerCase("de-DE")] || match[3]}`,
      offset,
      priority: issuePriorityOrder.case
    }));
  }

  const dativePrepositions = (grammarReference.prepositionCases?.dative || ["aus", "bei", "mit", "von", "zu"])
    .filter((preposition) => !["nach", "seit"].includes(preposition))
    .join("|");
  const dativePattern = new RegExp(`\\b(${dativePrepositions})\\s+(der|die|das|den|ein|eine|einen|kein|keine|keinen|mein|meine|meinen|dein|deine|deinen|sein|seine|seinen|ihr|ihre|ihren|unser|unsere|unseren|euer|eure|euren)\\s+(${allDativeNouns})\\b`, "giu");
  for (const match of value.matchAll(dativePattern)) {
    const noun = match[3].toLocaleLowerCase("de-DE");
    const gender = feminineA2Nouns.has(noun) ? "f" : "m";
    const base = match[2].toLocaleLowerCase("de-DE").replace(/e?n$/u, "");
    const dativeMap = gender === "f"
      ? {
          ...(grammarReference.articleDeclension?.dative?.f || {}),
          ...(grammarReference.possessiveDeclension?.dativeFeminine || {}),
          das: "der",
          den: "der",
          ein: "einer",
          einen: "einer",
          kein: "keiner"
        }
      : {
          ...(grammarReference.articleDeclension?.dative?.m || {}),
          ...(grammarReference.possessiveDeclension?.dativeMasculineNeuter || {}),
          die: "dem",
          das: "dem",
          den: "dem",
          eine: "einem",
          einen: "einem",
          keine: "keinem"
        };
    const expected = dativeMap[match[2].toLocaleLowerCase("de-DE")] || dativeMap[base];
    if (!expected || expected === match[2].toLocaleLowerCase("de-DE")) continue;
    const original = `${match[2]} ${match[3]}`;
    const offset = match.index + match[0].toLocaleLowerCase("de-DE").lastIndexOf(original.toLocaleLowerCase("de-DE"));
    issues.push(makeLocalIssue({
      ruleId: "dative-after-preposition",
      type: "Artikel / Dativ / Präposition",
      explanation: `‘${match[1]}’ edatından sonra Dativ kullanılır: ${expected} ${match[3]}.`,
      original,
      suggestion: `${expected} ${commonGermanNouns[noun] || match[3]}`,
      offset,
      priority: issuePriorityOrder.case + 2
    }));
  }

  const accusativePrepositions = (grammarReference.prepositionCases?.accusative || ["durch", "für", "gegen", "ohne"])
    .filter((preposition) => preposition !== "um")
    .join("|");
  const accusativePrepositionPattern = new RegExp(`\\b(${accusativePrepositions})\\s+(der|ein|eine|mein|meine|dein|deine|sein|seine|ihr|ihre|kein|keine|unser|unsere|euer|eure)\\s+(${masculine})\\b`, "giu");
  for (const match of value.matchAll(accusativePrepositionPattern)) {
    const article = match[2].toLocaleLowerCase("de-DE");
    const expected = accusativeArticles[article];
    if (!expected || expected === article) continue;
    const original = `${match[2]} ${match[3]}`;
    const offset = match.index + match[0].toLocaleLowerCase("de-DE").lastIndexOf(original.toLocaleLowerCase("de-DE"));
    issues.push(makeLocalIssue({
      ruleId: "accusative-after-preposition",
      type: "Artikel / Akkusativ / Präposition",
      explanation: `‘${match[1]}’ edatından sonra Akkusativ kullanılır: ${expected} ${match[3]}.`,
      original,
      suggestion: `${expected} ${commonGermanNouns[match[3].toLocaleLowerCase("de-DE")] || match[3]}`,
      offset,
      priority: issuePriorityOrder.case + 2
    }));
  }

  const femininePossessivePattern = new RegExp(`\\b(mein|dein|sein|ihr|unser|euer)\\s+(${feminine})\\b`, "giu");
  for (const match of value.matchAll(femininePossessivePattern)) {
    issues.push(makeLocalIssue({
      ruleId: "feminine-possessive",
      type: "Possessivartikel / Genus",
      explanation: `‘${match[2]}’ dişil bir isimdir; iyelik sözcüğü ‘${match[1]}e’ olur.`,
      original: match[0],
      suggestion: `${grammarReference.possessiveDeclension?.nominativeFeminine?.[match[1]] || `${match[1]}e`} ${commonGermanNouns[match[2].toLocaleLowerCase("de-DE")] || match[2]}`,
      offset: match.index,
      priority: issuePriorityOrder.case - 2
    }));
  }

  const ambiguousMasculine = new RegExp(`\\b(meine|deine|seine|ihre|unsere|eure)\\s+(${masculine})\\b`, "giu");
  for (const match of value.matchAll(ambiguousMasculine)) {
    const stem = match[1].slice(0, -1);
    issues.push(makeLocalIssue({
      ruleId: "masculine-possessive-context",
      type: "Possessivartikel / Genus",
      explanation: `‘${match[2]}’ eril bir isimdir; cümledeki göreve göre ‘${stem}’ veya ‘${stem}n’ gerekir.`,
      original: match[0],
      suggestion: `${stem} ${commonGermanNouns[match[2].toLocaleLowerCase("de-DE")] || match[2]}`,
      offset: match.index,
      severity: "IMPROVEMENT",
      confidence: "low",
      safeToApply: false,
      priority: issuePriorityOrder.style
    }));
  }

  const fixedPrepositions = [
    { pattern: /\bbei arzt\b/giu, replacement: "beim Arzt", explanation: "Bir kişinin yanında/bulunduğun yerde ‘beim Arzt’ kullanılır." },
    { pattern: /\bzu arzt\b/giu, replacement: "zum Arzt", explanation: "Hedef bildirirken ‘zum Arzt’ kullanılır." },
    { pattern: /\bzu schule\b/giu, replacement: "zur Schule", explanation: "‘Schule’ ile yön bildirirken ‘zur Schule’ kullanılır." },
    { pattern: /\bzu bahnhof\b/giu, replacement: "zum Bahnhof", explanation: "‘Bahnhof’ ile yön bildirirken ‘zum Bahnhof’ kullanılır." },
    { pattern: /\bin (märz|sommer|winter)\b/giu, replacement: "im $1", explanation: "Ay ve mevsim adlarından önce burada ‘im’ kullanılır." },
    { pattern: /\bmit (auto|bus|zug|fahrrad)\b/giu, replacement: "mit dem $1", explanation: "Ulaşım aracıyla ‘mit dem …’ yapısı kullanılır." },
    { pattern: /\bseit zwei tage\b/giu, replacement: "seit zwei Tagen", explanation: "‘seit’ Dativ ister; çoğul biçim burada ‘seit zwei Tagen’ olur." },
    { pattern: /\bseit eine woche\b/giu, replacement: "seit einer Woche", explanation: "‘seit’ Dativ ister: seit einer Woche." },
    { pattern: /\bich bin nach (berlin|hamburg|münchen|köln|bonn|bremen|frankfurt|dresden|leipzig)\b(?!\s+(?:gefahren|gegangen|gekommen|gereist)\b)/giu, replacement: "ich bin in $1", explanation: "Bulunulan şehri söylerken ‘in’ kullanılır; ‘nach’ yön bildirir." },
    { pattern: /\bich bin in die schule\b/giu, replacement: "ich bin in der Schule", explanation: "Sabit yerde ‘Wo?’ sorusuna Dativ ile cevap verilir: in der Schule." },
    { pattern: /\bich gehe in der schule\b/giu, replacement: "ich gehe in die Schule", explanation: "Bir yere yönelirken ‘Wohin?’ sorusuna burada Akkusativ ile cevap verilir." }
  ];
  fixedPrepositions.forEach((rule, index) => {
    for (const match of value.matchAll(rule.pattern)) {
      let suggestion = preserveInitialCase(match[0], match[0].replace(new RegExp(rule.pattern.source, rule.pattern.flags.replace("g", "")), rule.replacement));
      const fixedNounForms = { märz: "März", sommer: "Sommer", winter: "Winter", auto: "Auto", bus: "Bus", zug: "Zug", fahrrad: "Fahrrad", arzt: "Arzt", schule: "Schule", bahnhof: "Bahnhof" };
      suggestion = suggestion.replace(/\b(märz|sommer|winter|auto|bus|zug|fahrrad|arzt|schule|bahnhof)\b/giu, (word) => fixedNounForms[word.toLocaleLowerCase("de-DE")] || word);
      issues.push(makeLocalIssue({
        ruleId: `fixed-preposition-${index}`,
        type: "Präposition / Artikel",
        explanation: rule.explanation,
        original: match[0],
        suggestion,
        offset: match.index,
        priority: issuePriorityOrder.preposition
      }));
    }
  });

  return issues;
}

function runPronounCaseChecks(text) {
  const value = String(text);
  const issues = [];
  const accusativeToDative = grammarReference.pronouns?.accusativeToDative || { mich: "mir", dich: "dir", ihn: "ihm" };
  const nominativeToDative = grammarReference.pronouns?.nominativeToDative || { ich: "mir", du: "dir", er: "ihm" };
  const pronounMap = { ...accusativeToDative, ...nominativeToDative };
  const dativeLemmas = grammarReference.dativeVerbs || ["helfen", "antworten", "schreiben", "danken"];
  const dativeForms = dativeLemmas.flatMap((lemma) => Object.values(a2VerbForms[lemma] || {}));
  dativeForms.push("danke", "dankst", "dankt", "danken");
  const pattern = new RegExp(`\\b(${[...new Set(dativeForms)].map(escapeRegexText).join("|")})\\s+(mich|dich|ihn|ich|du|er)\\b`, "giu");
  for (const match of value.matchAll(pattern)) {
    const key = match[2].toLocaleLowerCase("de-DE");
    const expected = pronounMap[key];
    if (!expected) continue;
    const offset = match.index + match[0].toLocaleLowerCase("de-DE").lastIndexOf(key);
    issues.push(makeLocalIssue({
      ruleId: "dative-verb-pronoun",
      type: "Personalpronomen / Dativ",
      explanation: `‘${match[1]}’ burada Dativ zamiri ister; doğru biçim ‘${expected}’ olur.`,
      original: match[2],
      suggestion: expected,
      offset,
      priority: issuePriorityOrder.case
    }));
  }

  const modalHelpPattern = /\b(kannst du|können Sie|kann er)\s+(mich|dich|ihn|ich|du|er)\s+helfen\b/giu;
  for (const match of value.matchAll(modalHelpPattern)) {
    const key = match[2].toLocaleLowerCase("de-DE");
    const expected = pronounMap[key];
    if (!expected) continue;
    issues.push(makeLocalIssue({
      ruleId: "modal-help-dative-pronoun",
      type: "Personalpronomen / Dativ",
      explanation: "‘helfen’ fiili Dativ ister; kişi zamirini Dativ biçiminde kullan.",
      original: match[2],
      suggestion: expected,
      offset: match.index + match[0].indexOf(match[2]),
      priority: issuePriorityOrder.case
    }));
  }
  return issues;
}

function runReflexiveChecks(text) {
  const value = String(text);
  const issues = [];
  const rules = [
    { id: "reflexive-anmelden-modal", pattern: /\bich möchte für den kurs anmelden\b/giu, replacement: "ich möchte mich für den Kurs anmelden", explanation: "‘sich anmelden’ dönüşlüdür; ‘ich’ ile ‘mich’ kullanılır." },
    { id: "reflexive-anmelden-ich", pattern: /\bich melde für den kurs an\b/giu, replacement: "ich melde mich für den Kurs an", explanation: "‘sich anmelden’ dönüşlüdür: ich melde mich an." },
    { id: "reflexive-treffen-wir", pattern: /\bwir treffen am bahnhof\b/giu, replacement: "wir treffen uns am Bahnhof", explanation: "Karşılıklı buluşmayı anlatırken ‘wir treffen uns’ kullanılır." },
    { id: "reflexive-interest", pattern: /\bich interessiere für\b/giu, replacement: "ich interessiere mich für", explanation: "Doğru kalıp ‘sich für etwas interessieren’ şeklindedir." },
    { id: "reflexive-freuen-wir", pattern: /\bwir freuen auf\b/giu, replacement: "wir freuen uns auf", explanation: "‘sich freuen’ dönüşlüdür; ‘wir’ ile ‘uns’ kullanılır." },
    { id: "reflexive-entschuldigen", pattern: /\bich entschuldige\b(?!\s+mich)/giu, replacement: "ich entschuldige mich", explanation: "Özür dilemek için fiil dönüşlü kullanılır: ich entschuldige mich." }
  ];
  rules.forEach((rule) => {
    for (const match of value.matchAll(rule.pattern)) {
      const rawSuggestion = match[0].replace(new RegExp(rule.pattern.source, rule.pattern.flags.replace("g", "")), rule.replacement);
      issues.push(makeLocalIssue({
        ruleId: rule.id,
        type: "Reflexivverb",
        explanation: rule.explanation,
        original: match[0],
        suggestion: preserveInitialCase(match[0], rawSuggestion),
        offset: match.index,
        priority: issuePriorityOrder.case
      }));
    }
  });
  return issues;
}

function runRegisterConsistencyChecks(text) {
  const value = String(text);
  const greeting = detectGreeting(value);
  if (!greeting.found) return [];
  const rules = grammarReference.registerRules?.[greeting.type] || [];
  const issues = [];
  rules.forEach((rule, index) => {
    const pattern = new RegExp(`\\b${escapeRegexText(rule.from)}\\b`, "gu");
    for (const match of value.matchAll(pattern)) {
      issues.push(makeLocalIssue({
        ruleId: `register-${greeting.type}-${index}`,
        type: "Mektuba uygunluk / Register",
        explanation: greeting.type === "formal"
          ? "Resmî hitapla başlayan mektupta ‘Sie/Ihr’ biçimini ve uygun fiil çekimini kullan."
          : "Samimi hitapla başlayan mektupta ‘du/dein’ biçimini ve uygun fiil çekimini kullan.",
        original: match[0],
        suggestion: rule.to,
        offset: match.index,
        confidence: "high",
        safeToApply: true,
        priority: issuePriorityOrder.case + 5
      }));
    }
  });
  return issues;
}

function runPerfektChecks(text) {
  const value = String(text);
  const issues = [];
  const participleEntries = Object.values(grammarReference.participles || {});
  const participleByForm = new Map(participleEntries.map((entry) => [entry.form.toLocaleLowerCase("de-DE"), entry]));
  const participleAlternation = [...participleByForm.keys()].sort((a, b) => b.length - a.length).map(escapeRegexText).join("|");
  if (!participleAlternation) return issues;
  const pattern = new RegExp(`\\b(ich|du|er|es|wir|ihr|Sie)\\s+(bin|bist|ist|sind|seid|habe|hast|hat|haben|habt)\\s+(${participleAlternation})\\b`, "giu");
  for (const match of value.matchAll(pattern)) {
    const participle = match[3].toLocaleLowerCase("de-DE");
    const actualAux = match[2].toLocaleLowerCase("de-DE");
    const actualFamily = Object.values(a2VerbForms.sein).includes(actualAux) ? "sein" : "haben";
    const reference = participleByForm.get(participle);
    const expectedFamily = reference?.auxiliary || null;
    if (!expectedFamily || actualFamily === expectedFamily) continue;
    const person = personForSubject(match[1]);
    if (!person) continue;
    const expectedAux = a2VerbForms[expectedFamily][person];
    const confidence = reference?.confidence || "high";
    const isLowConfidence = confidence === "low";
    issues.push(makeLocalIssue({
      ruleId: `perfekt-${expectedFamily}-${participle}`,
      type: "Perfekt / haben-sein",
      explanation: isLowConfidence
        ? (reference.note || "Bu yardımcı fiil bağlama göre değişebilir; cümleyi öğretmeninle kontrol et.")
        : `‘${participle}’ ile Perfekt kurulurken burada ‘${expectedFamily}’ kullanılır.`,
      original: match[2],
      suggestion: expectedAux,
      offset: match.index + match[0].toLocaleLowerCase("de-DE").indexOf(actualAux),
      severity: isLowConfidence ? "INFO" : "ERROR",
      confidence,
      safeToApply: !isLowConfidence,
      priority: issuePriorityOrder.perfekt
    }));
  }
  return issues;
}

function runQuestionAndPunctuationChecks(text) {
  const issues = [];
  getSentenceSpans(text).forEach((span) => {
    const trimmed = span.text.trim();
    const core = trimmed.replace(/[.!?]+$/u, "");
    const looksLikeQuestion = /^(?:wann|warum|wo|wohin|woher|wie|wie viel|was|wer|welche?r?|kann|kannst|können|möchte|möchten|hast|haben|ist|sind|darf|dürfen)\b/iu.test(core);
    if (!looksLikeQuestion) return;
    if (trimmed.endsWith(".")) {
      issues.push(makeLocalIssue({
        ruleId: "question-mark",
        type: "Fragesatz / Satzzeichen",
        explanation: "Doğrudan soru cümlesi soru işaretiyle biter.",
        original: ".",
        suggestion: "?",
        offset: span.start + trimmed.length - 1,
        priority: issuePriorityOrder.punctuation
      }));
    } else if (!/[?]$/u.test(trimmed)) {
      const lastWord = [...core.matchAll(/[\p{L}\p{N}]+/gu)].at(-1);
      if (!lastWord) return;
      issues.push(makeLocalIssue({
        ruleId: "missing-question-mark",
        type: "Fragesatz / Satzzeichen",
        explanation: "Doğrudan soru cümlesini soru işaretiyle bitir.",
        original: lastWord[0],
        suggestion: `${lastWord[0]}?`,
        offset: span.start + lastWord.index,
        priority: issuePriorityOrder.punctuation
      }));
    }
  });
  return issues;
}

function runA2PatternChecks(text) {
  const value = String(text);
  const issues = [];
  const patterns = [
    { id: "question-wo-uns", pattern: /\bwo wir treffen uns\b/giu, replacement: "wo treffen wir uns", type: "Fragesatz / Verbposition", explanation: "Soru kelimesinden sonra fiil, sonra özne gelir; ‘uns’ fiilden sonra kalır.", priority: issuePriorityOrder.verbposition },
    { id: "question-was-modal", pattern: /\bwas ich soll mitbringen\b/giu, replacement: "was soll ich mitbringen", type: "Fragesatz / Verbposition", explanation: "Soru kelimesinden sonra çekimli modal fiil gelir.", priority: issuePriorityOrder.verbposition },
    { id: "imperative-komm", pattern: /\bbitte kommst\b/giu, replacement: "bitte komm", type: "Imperativ", explanation: "‘du’ için temel emir biçimi ‘komm’ olur.", priority: issuePriorityOrder.conjugation },
    { id: "imperative-schreib", pattern: /\bschreibst mir bitte\b/giu, replacement: "schreib mir bitte", type: "Imperativ", explanation: "‘du’ için emir biçimi ‘schreib’ olur.", priority: issuePriorityOrder.conjugation },
    { id: "adjective-neuter", pattern: /\bein schöne(?:s)? (geschenk|hotel|wochenende|auto|fahrrad)\b/giu, replacement: "ein schönes $1", type: "Adjektiv / Artikel", explanation: "‘ein’ ile kullanılan nötr isimde sıfat ‘-es’ eki alır.", priority: issuePriorityOrder.case },
    { id: "adjective-feminine", pattern: /\beine schön (party|einladung|woche|zeit)\b/giu, replacement: "eine schöne $1", type: "Adjektiv / Artikel", explanation: "Dişil isimden önce sıfat burada ‘-e’ eki alır.", priority: issuePriorityOrder.case },
    { id: "adjective-acc-masc", pattern: /\beinen schöne (kurs|termin|tag)\b/giu, replacement: "einen schönen $1", type: "Adjektiv / Akkusativ", explanation: "Eril Akkusativ yapıda sıfat burada ‘-en’ eki alır.", priority: issuePriorityOrder.case },
    { id: "denn-main-clause-order", pattern: /\bdenn (ich|du|er|sie|es|wir|ihr|Sie) (arbeiten|kommen|gehen|fahren) (muss|musst|müssen|müsst|kann|kannst|können|könnt)\b/giu, replacement: "denn $1 $3 $2", type: "Satzstellung / denn", explanation: "‘denn’ sonrasında ana cümle sırası korunur; çekimli fiil ikinci konumda olur.", priority: issuePriorityOrder.verbposition },
    { id: "perfekt-object-order", pattern: /\b(ich|du|er|sie|es|wir|ihr|Sie) (habe|hast|hat|haben|habt) (gelernt|gekauft|gemacht|geschrieben) (deutsch|kaffee|hausaufgaben|eine e-mail)\b/giu, replacement: "$1 $2 $4 $3", type: "Perfekt / Verbposition", explanation: "Perfekt cümlesinde Partizip II genellikle cümlenin sonunda durur.", priority: issuePriorityOrder.verbposition },
    { id: "perfekt-lernen-infinitive", pattern: /\b(ich|du|er|sie|es|wir|ihr|Sie) (habe|hast|hat|haben|habt) (gestern |heute )?lernen\b/giu, replacement: "$1 $2 $3gelernt", type: "Perfekt / Partizip II", explanation: "Perfekt yapısında mastar değil Partizip II kullanılır: gelernt.", priority: issuePriorityOrder.perfekt },
    { id: "perfekt-time-order-sein", pattern: /\b(ich|du|er|sie|es|wir|ihr|Sie) (bin|bist|ist|sind|seid) (aufgestanden|angekommen) (früh|spät|heute|gestern)\b/giu, replacement: "$1 $2 $4 $3", type: "Perfekt / Verbposition", explanation: "Perfekt cümlesinde Partizip II cümlenin sonunda durur.", priority: issuePriorityOrder.verbposition },
    { id: "modal-separable-prefix", pattern: /\bich kann mitbringe (meine schwester|meinen bruder|einen freund|eine freundin)\b/giu, replacement: "ich kann $1 mitbringen", type: "Modalverb / Trennbares Verb", explanation: "Modal fiille ayrılabilen ana fiil birleşik mastar olarak sonda kalır.", priority: issuePriorityOrder.verbposition },
    { id: "modal-separable-aufstehen", pattern: /\b(ich muss|du musst|er muss|wir müssen|ihr müsst|Sie müssen) (stehe|stehst|steht|stehen) auf\b/giu, replacement: "$1 aufstehen", type: "Modalverb / Trennbares Verb", explanation: "Modal fiilden sonra ayrılabilen fiil birleşik mastar hâlinde kullanılır: aufstehen.", priority: issuePriorityOrder.verbposition },
    { id: "two-way-location-table", pattern: /\b(ist|liegt|steht) auf der tisch\b/giu, replacement: "$1 auf dem Tisch", type: "Wechselpräposition / Dativ", explanation: "Sabit yerde ‘Wo?’ sorusuyla Dativ kullanılır: auf dem Tisch.", priority: issuePriorityOrder.case },
    { id: "double-finite", pattern: /\b(habe|bin|kann|muss|möchte|will)\s+\1\b/giu, replacement: "$1", type: "Fazla fiil / Çift fiil", explanation: "Aynı çekimli fiil yanlışlıkla iki kez yazılmış.", priority: issuePriorityOrder.meaning },
    { id: "word-choice-termin", pattern: /\beinen termin machen\b/giu, replacement: "einen Termin vereinbaren", type: "Kelime seçimi", explanation: "‘Termin vereinbaren’ daha doğal ve yerleşik bir kullanımdır.", severity: "IMPROVEMENT", confidence: "medium", safeToApply: false, priority: issuePriorityOrder.style },
    { id: "umlaut-mochte", pattern: /\b(ich|er|sie) mochte (kommen|gehen|fragen|wissen|buchen|absagen)\b/giu, replacement: "$1 möchte $2", type: "Umlaut / Modalverb", explanation: "İstek bildirirken ‘möchte’ sözcüğünde ‘ö’ kullanılır.", severity: "IMPROVEMENT", confidence: "medium", safeToApply: false, priority: issuePriorityOrder.spelling },
    { id: "umlaut-wurde", pattern: /\b(ich|er|sie) wurde (kommen|gehen|fragen|helfen|bleiben)\b/giu, replacement: "$1 würde $2", type: "Umlaut / Wortwahl", explanation: "Koşul veya nazik istek anlamında çoğunlukla ‘würde’ gerekir; ‘wurde’ başka bir geçmiş zaman biçimidir.", severity: "IMPROVEMENT", confidence: "low", safeToApply: false, priority: issuePriorityOrder.style }
  ];
  patterns.forEach((rule) => {
    for (const match of value.matchAll(rule.pattern)) {
      const suggestion = preserveInitialCase(match[0], match[0].replace(new RegExp(rule.pattern.source, rule.pattern.flags.replace("g", "")), rule.replacement));
      issues.push(makeLocalIssue({
        ruleId: rule.id,
        type: rule.type,
        explanation: rule.explanation,
        original: match[0],
        suggestion,
        offset: match.index,
        severity: rule.severity,
        confidence: rule.confidence,
        safeToApply: rule.safeToApply,
        priority: rule.priority
      }));
    }
  });

  getSentenceSpans(value).forEach((span) => {
    const core = span.text.replace(/[.!?]+$/u, "").trim();
    if (/^(Ich|Wir)\s+(?:heute|morgen)\s+(?:zum Arzt|zur Schule|im Kurs|in Berlin)$/u.test(core)) {
      issues.push(makeLocalIssue({
        ruleId: "possible-missing-verb",
        type: "Eksik fiil",
        explanation: "Bu cümlede çekimli fiil eksik görünüyor; anlatmak istediğine göre ‘gehe/fahre/bin’ ekle.",
        original: core,
        suggestion: "Çekimli bir fiil ekle",
        offset: span.start,
        severity: "INFO",
        confidence: "low",
        safeToApply: false,
        priority: issuePriorityOrder.meaning
      }));
    }
  });
  return issues;
}

function runStructuralLanguageChecks(text, task) {
  const value = String(text);
  const issues = [];
  const salutation = value.match(/^\s*(?:liebe\s+\p{L}+|lieber\s+\p{L}+|hallo(?:\s+\p{L}+)?|sehr geehrte[^\r\n]*|guten tag[^\r\n]*),[ \t]*\r?\n+[ \t]*([a-zäöüß])/iu);
  const salutationContinuationOffset = salutation ? salutation.index + salutation[0].length - salutation[1].length : -1;

  for (const match of value.matchAll(/(^|[.!?]\s+|\n+)([a-zäöüß])(?=\p{L})/gmu)) {
    const offset = match.index + match[1].length;
    if (offset === salutationContinuationOffset) continue;
    if (offset === 0 && /^(?:weil|dass|wenn)\b/iu.test(value.slice(offset))) continue;
    const original = match[2];
    issues.push(makeLocalIssue({
      ruleId: "sentence-capitalization",
      type: "Großschreibung",
      explanation: "Almancada cümleler ve satır başları büyük harfle başlar.",
      original,
      suggestion: original.toLocaleUpperCase("de-DE"),
      offset
    }));
  }

  const nounPattern = new RegExp(`\\b(${Object.keys(commonGermanNouns).join("|")})\\b`, "giu");
  for (const match of value.matchAll(nounPattern)) {
    if (match[0] !== match[0].toLocaleLowerCase("de-DE")) continue;
    const suggestion = commonGermanNouns[match[0].toLocaleLowerCase("de-DE")];
    issues.push(makeLocalIssue({
      ruleId: "noun-capitalization",
      type: "Großschreibung / Nomen",
      explanation: "Almancada isimler büyük harfle başlar.",
      original: match[0],
      suggestion,
      offset: match.index
    }));
  }

  for (const match of value.matchAll(/[ \t]{2,}/g)) {
    issues.push(makeLocalIssue({
      ruleId: "double-space",
      type: "Yazım / Boşluk",
      explanation: "Kelimeler arasında tek boşluk bırak.",
      original: match[0],
      suggestion: " ",
      offset: match.index
    }));
  }

  for (const match of value.matchAll(/[ \t]+[,.!?;]/g)) {
    const punctuation = match[0].slice(-1);
    issues.push(makeLocalIssue({
      ruleId: "space-before-punctuation",
      type: "Noktalama",
      explanation: "Noktalama işaretinden önce boşluk bırakılmaz.",
      original: match[0],
      suggestion: punctuation,
      offset: match.index
    }));
  }

  const lines = [...value.matchAll(/[^\r\n]+/g)];
  const firstLine = lines[0];
  let firstLineIsGreeting = false;
  if (firstLine) {
    const clean = firstLine[0].trim();
    const isGreeting = /^(?:liebe\s+\p{L}+|lieber\s+\p{L}+|hallo(?:\s+\p{L}+)?|sehr geehrte|guten tag)/iu.test(clean);
    firstLineIsGreeting = isGreeting;
    if (isGreeting && !clean.endsWith(",")) {
      const leading = firstLine[0].indexOf(clean);
      issues.push(makeLocalIssue({
        ruleId: "greeting-comma",
        type: "Anrede / Noktalama",
        explanation: "Almanca mektupta hitaptan sonra virgül kullanılır.",
        original: clean,
        suggestion: `${clean},`,
        offset: firstLine.index + leading
      }));
    }
  }

  const closingLineIndex = lines.findIndex((line) => /^(?:mit freundliche(?:n)? gr(?:ü|u|ue)ße(?:n)?|(?:liebe|viele|herzliche) gr(?:ü|u|ue)ße|bis bald)\s*,?$/iu.test(line[0].trim()));
  if (closingLineIndex >= 0) {
    const line = lines[closingLineIndex];
    const clean = line[0].trim();
    if (clean.endsWith(",")) {
      issues.push(makeLocalIssue({
        ruleId: "closing-comma",
        type: "Grußformel / Noktalama",
        explanation: "Almanca kapanış kalıbından sonra virgül kullanılmaz.",
        original: clean,
        suggestion: clean.slice(0, -1),
        offset: line.index + line[0].indexOf(clean)
      }));
    }
  }

  const bodyStart = firstLineIsGreeting ? 1 : 0;
  const bodyEnd = closingLineIndex >= 0 ? closingLineIndex : task ? Math.max(bodyStart, lines.length - 1) : lines.length;
  lines.slice(bodyStart, bodyEnd).forEach((line) => {
    const clean = line[0].trim();
    if (!clean || /[.!?]$/.test(clean)) return;
    const leading = line[0].indexOf(clean);
    const lastWord = clean.match(/[\p{L}\p{N}]+$/u);
    const original = lastWord ? lastWord[0] : clean.slice(-1);
    const wordOffset = clean.lastIndexOf(original);
    issues.push(makeLocalIssue({
      ruleId: "missing-end-punctuation",
      type: "Noktalama",
      explanation: "Mektubun gövdesindeki cümleyi nokta, soru işareti veya ünlemle bitir.",
      original,
      suggestion: `${original}.`,
      offset: line.index + leading + wordOffset
    }));
  });

  if (task && getExpectedFormality(task) === "formal") {
    for (const match of value.matchAll(/\b(können|haben|möchten|sind|kommen|schicken|antworten)\s+(sie)\b/giu)) {
      if (match[2] !== match[2].toLocaleLowerCase("de-DE")) continue;
      const pronounOffset = match.index + match[0].toLocaleLowerCase("de-DE").lastIndexOf("sie");
      issues.push(makeLocalIssue({
        ruleId: "formal-sie",
        type: "Höflichkeitsform",
        explanation: "Resmî mektupta hitap zamiri büyük yazılır: Sie.",
        original: value.slice(pronounOffset, pronounOffset + 3),
        suggestion: "Sie",
        offset: pronounOffset
      }));
    }
    for (const match of value.matchAll(/\b(ihnen|ihr|ihre|ihren|ihrer|ihrem)\b/giu)) {
      if (match[0] !== match[0].toLocaleLowerCase("de-DE")) continue;
      issues.push(makeLocalIssue({
        ruleId: "formal-pronoun-capitalization",
        type: "Höflichkeitsform",
        explanation: "Resmî hitap zamirleri büyük harfle yazılır: Ihnen / Ihr / Ihre.",
        original: match[0],
        suggestion: match[0][0].toLocaleUpperCase("de-DE") + match[0].slice(1),
        offset: match.index
      }));
    }

    const formalReplacements = {
      du: "Sie",
      dich: "Sie",
      dir: "Ihnen",
      dein: "Ihr",
      deine: "Ihre",
      deinen: "Ihren",
      deiner: "Ihrer",
      deinem: "Ihrem"
    };
    for (const match of value.matchAll(/\b(du|dich|dir|dein|deine|deinen|deiner|deinem)\b/giu)) {
      const key = match[0].toLocaleLowerCase("de-DE");
      issues.push(makeLocalIssue({
        ruleId: "formal-register-body",
        type: "Mektuba uygunluk",
        explanation: "Resmî mektubun gövdesinde ‘du/dein’ yerine ‘Sie/Ihr’ hitabı kullanılır.",
        original: match[0],
        suggestion: formalReplacements[key],
        offset: match.index,
        source: "suitability"
      }));
    }
  } else if (task) {
    for (const match of value.matchAll(/\b(können|haben|möchten|sind|kommen|schicken|antworten)\s+(sie)\b/giu)) {
      if (match[2] !== "Sie") continue;
      const pronounOffset = match.index + match[0].lastIndexOf(match[2]);
      issues.push(makeLocalIssue({
        ruleId: "informal-register-body",
        type: "Mektuba uygunluk",
        explanation: "Arkadaşa yazılan mektupta resmî ‘Sie’ yerine samimi ‘du’ hitabı kullanılır.",
        original: match[2],
        suggestion: "du",
        offset: pronounOffset,
        source: "suitability"
      }));
    }
  }

  const greeting = detectGreeting(value);
  const expected = getExpectedFormality(task);
  if (task && greeting.found && greeting.type !== expected && firstLine) {
    const clean = firstLine[0].trim();
    const suggestion = expected === "formal" ? "Sehr geehrte Damen und Herren," : "Liebe/Lieber …,";
    issues.push(makeLocalIssue({
      ruleId: "recipient-formality",
      type: "Mektuba uygunluk",
      explanation: expected === "formal"
        ? "Bu görevde bir kurum veya resmî kişiye yazıyorsun; resmî hitap kullan."
        : "Bu görevde bir arkadaşına yazıyorsun; samimi hitap kullan.",
      original: clean,
      suggestion,
      offset: firstLine.index + firstLine[0].indexOf(clean),
      source: "suitability"
    }));
  }

  return issues;
}

function runLocalLanguageChecks(text, task = tasks[state.activeTask]) {
  const value = String(text);
  const issues = [];
  localLanguageRules.forEach((rule) => {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    for (const match of value.matchAll(regex)) {
      const rawSuggestion = match[0].replace(new RegExp(rule.pattern.source, rule.pattern.flags.replace("g", "")), rule.replacement);
      const suggestion = preserveInitialCase(match[0], rawSuggestion);
      issues.push(makeLocalIssue({
        ruleId: rule.id,
        type: rule.type,
        explanation: rule.explanation,
        original: match[0],
        suggestion,
        offset: match.index,
        severity: rule.severity,
        confidence: rule.confidence,
        safeToApply: rule.safeToApply,
        priority: rule.priority
      }));
    }
  });
  issues.push(...runSpellingChecks(value));
  issues.push(...runConjugationChecks(value));
  issues.push(...runModalChecks(value));
  issues.push(...runSeparableVerbChecks(value));
  issues.push(...runSentenceOrderChecks(value));
  issues.push(...runSubordinateClauseChecks(value));
  issues.push(...runCaseAndPrepositionChecks(value));
  issues.push(...runPronounCaseChecks(value));
  issues.push(...runReflexiveChecks(value));
  issues.push(...runRegisterConsistencyChecks(value));
  issues.push(...runPerfektChecks(value));
  issues.push(...runQuestionAndPunctuationChecks(value));
  issues.push(...runA2PatternChecks(value));
  issues.push(...runStructuralLanguageChecks(value, task));
  return issues.sort((a, b) => a.offset - b.offset || b.length - a.length);
}

function applySafeCorrections(text, issues) {
  const explicitRuleIds = new Set(localLanguageRules.map((rule) => rule.id));
  const correctionPriority = (issue) => {
    if (explicitRuleIds.has(issue.ruleId)) return 4;
    if (String(issue.ruleId).startsWith("spelling-")) return 3;
    if (String(issue.type).toLocaleLowerCase("tr-TR").includes("noktalama")) return 1;
    return 2;
  };
  const correctionCandidates = issues
    .filter((issue) => issue.source !== "suitability" && issue.safeToApply !== false && issue.confidence === "high" && issue.severity !== "INFO" && issue.replacement && Number.isInteger(issue.offset))
    .sort((a, b) => correctionPriority(b) - correctionPriority(a) || a.offset - b.offset || b.length - a.length);
  const selectedCorrections = [];
  correctionCandidates.forEach((issue) => {
    const issueEnd = issue.offset + issue.length;
    const overlaps = selectedCorrections.some((selected) => {
      const selectedEnd = selected.offset + selected.length;
      return issue.offset < selectedEnd && issueEnd > selected.offset;
    });
    if (!overlaps) selectedCorrections.push(issue);
  });
  const corrections = selectedCorrections.sort((a, b) => b.offset - a.offset);
  let corrected = text;
  let previousStart = Infinity;
  corrections.forEach((issue) => {
    const end = issue.offset + issue.length;
    if (end > previousStart || issue.offset < 0 || end > corrected.length) return;
    corrected = corrected.slice(0, issue.offset) + issue.replacement + corrected.slice(end);
    previousStart = issue.offset;
  });
  return corrected;
}

function buildCorrectedText(text, issues) {
  return applySafeCorrections(text, issues);
}

function evaluateLetterSuitability(task, text, score, issues) {
  const words = countWords(text);
  const expected = getExpectedFormality(task);
  const completedPoints = score.analyses.filter((item) => item.score > 0).length;
  const languageIssues = issues.filter((issue) => issue.source !== "suitability");
  const hasRegisterIssue = issues.some((issue) => issue.source === "suitability");
  const registerMatches = !hasRegisterIssue && score.greeting.found && score.greeting.type === expected && (!score.closing.found || score.closing.type === expected);

  const items = [
    {
      title: "Göreve cevap",
      status: completedPoints >= 3 ? "good" : completedPoints === 2 ? "warning" : "error",
      detail: completedPoints >= 3 ? `${completedPoints}/4 madde metinde bulunuyor.` : `En az 3 madde gerekli; şu anda ${completedPoints}/4 madde bulundu.`
    },
    {
      title: "Hitap şekli",
      status: registerMatches ? "good" : "error",
      detail: registerMatches
        ? expected === "formal" ? "Resmî hitap göreve uygun." : "Samimi hitap göreve uygun."
        : expected === "formal" ? "Bu görev için resmî hitap ve kapanış kullan." : "Bu görev için samimi hitap ve kapanış kullan."
    },
    {
      title: "Mektup düzeni",
      status: score.greeting.found && score.closing.found && !score.styleMismatch ? "good" : score.greeting.found || score.closing.found ? "warning" : "error",
      detail: score.greeting.found && score.closing.found && !score.styleMismatch
        ? "Başlangıç ve kapanış tamam."
        : "Uygun bir başlangıç ve kapanış birlikte bulunmalı."
    },
    {
      title: "Uzunluk",
      status: words >= 30 && words <= 55 ? "good" : words >= 21 && words <= 65 ? "warning" : "error",
      detail: `${words} kelime yazılmış. Hedef yaklaşık 40 kelime.`
    },
    {
      title: "Dilbilgisi ve yazım",
      status: languageIssues.length === 0 ? "good" : languageIssues.length <= 2 ? "warning" : "error",
      detail: languageIssues.length === 0 ? "Belirgin hata bulunmadı." : `${languageIssues.length} yer için düzeltme önerisi var.`
    }
  ];

  return {
    expected,
    items,
    overall: items.some((item) => item.status === "error") ? "error" : items.some((item) => item.status === "warning") ? "warning" : "good"
  };
}

function renderInlineReview(text, issues) {
  dom.reviewedLetter.replaceChildren();
  dom.inlineExplanations.replaceChildren();

  const rangedIssues = issues
    .filter((issue) => Number.isInteger(issue.offset) && issue.offset >= 0 && issue.length > 0 && issue.offset + issue.length <= text.length)
    .sort((a, b) => a.offset - b.offset || b.length - a.length)
    .map((issue, index) => ({ ...issue, reviewNumber: index + 1 }));

  if (rangedIssues.length === 0) {
    dom.inlineReviewCount.textContent = "Hata bulunmadı";
    dom.inlineReviewCount.className = "review-count success";
    dom.reviewedLetter.append(document.createTextNode(text));
    dom.reviewedLetter.classList.add("is-clean");
    dom.inlineExplanations.append(element("p", "review-clean-note", isFreeWriting
      ? "Belirgin bir A2 dilbilgisi veya yazım sorunu bulunmadı."
      : "Belirgin bir A2 dilbilgisi, yazım veya mektuba uygunluk sorunu bulunmadı."));
    dom.inlineReview.hidden = false;
    return;
  }

  dom.reviewedLetter.classList.remove("is-clean");
  dom.inlineReviewCount.textContent = `${rangedIssues.length} noktayı kontrol et`;
  dom.inlineReviewCount.className = "review-count error";

  const clusters = [];
  rangedIssues.forEach((issue) => {
    const end = issue.offset + issue.length;
    const previous = clusters[clusters.length - 1];
    if (previous && issue.offset < previous.end) {
      previous.end = Math.max(previous.end, end);
      previous.issues.push(issue);
    } else {
      clusters.push({ start: issue.offset, end, issues: [issue] });
    }
  });

  let cursor = 0;
  clusters.forEach((cluster) => {
    if (cluster.start > cursor) dom.reviewedLetter.append(document.createTextNode(text.slice(cursor, cluster.start)));
    const marked = element("span", "review-error-fragment", text.slice(cluster.start, cluster.end));
    marked.title = cluster.issues.map((issue) => `${issue.reviewNumber}. ${issueSeverityLabel(issue.severity)} · ${friendlyIssueType(issue.type)}`).join(" · ");
    const number = element("sup", "review-error-number", cluster.issues.map((issue) => issue.reviewNumber).join(","));
    dom.reviewedLetter.append(marked, number);
    cursor = cluster.end;
  });
  if (cursor < text.length) dom.reviewedLetter.append(document.createTextNode(text.slice(cursor)));

  const makeExplanationCard = (issue) => {
    const card = element("article", "inline-explanation");
    card.append(element("span", "explanation-number", issue.reviewNumber));
    const detail = element("div");
    detail.append(element("strong", "", `${issueSeverityLabel(issue.severity)} · ${friendlyIssueType(issue.type)}`));
    const change = element("p", "explanation-change");
    change.append(
      element("span", "wrong-fragment", issue.original || "—"),
      document.createTextNode(" → "),
      element("span", "right-fragment", issue.suggestion || "Kontrol et")
    );
    detail.append(change, element("p", "explanation-why", issue.explanation || issue.message));
    card.append(detail);
    return card;
  };

  rangedIssues.slice(0, 5).forEach((issue) => {
    dom.inlineExplanations.append(makeExplanationCard(issue));
  });
  if (rangedIssues.length > 5) {
    const extra = element("details", "extra-explanations");
    extra.append(element("summary", "", `Diğer ${rangedIssues.length - 5} açıklamayı göster`));
    const extraList = element("div", "extra-explanation-list");
    rangedIssues.slice(5).forEach((issue) => extraList.append(makeExplanationCard(issue)));
    extra.append(extraList);
    dom.inlineExplanations.append(extra);
  }
  dom.inlineReview.hidden = false;
}

function evaluateFreeWriting(text, issues) {
  const languageIssues = issues.filter((issue) => issue.source !== "suitability");
  const stats = getLanguageIssueStats(languageIssues);
  const greeting = detectGreeting(text);
  const closing = detectClosing(text);
  const appearsToBeLetter = greeting.found || closing.found;
  return {
    words: countWords(text),
    languageIssueCount: languageIssues.length,
    languageStats: stats,
    greeting,
    closing,
    appearsToBeLetter,
    status: stats.errors > 0 ? "error" : stats.improvements > 0 || stats.info > 0 ? "warning" : "good"
  };
}

function getLanguageIssueStats(issues) {
  return issues.reduce((stats, issue) => {
    if (issue.severity === "IMPROVEMENT") stats.improvements += 1;
    else if (issue.severity === "INFO") stats.info += 1;
    else stats.errors += 1;
    return stats;
  }, { errors: 0, improvements: 0, info: 0 });
}

function formatLanguageIssueStats(issues) {
  const stats = getLanguageIssueStats(issues);
  const parts = [];
  if (stats.errors) parts.push(`${stats.errors} hata`);
  if (stats.improvements) parts.push(`${stats.improvements} iyileştirme`);
  if (stats.info) parts.push(`${stats.info} bilgi`);
  return parts.length ? parts.join(" · ") : "Belirgin hata bulunmadı.";
}

function handleLetterCheck() {
  const text = dom.studentText.value.trim();
  if (!text) {
    showNotification(isFreeWriting ? "Önce Almanca bir metin yazın." : "Önce Almanca bir mektup yazın.", "warning");
    dom.studentText.focus();
    return;
  }

  dom.checkLetter.disabled = true;
  const oldText = dom.checkLetter.textContent;
  dom.checkLetter.textContent = "Kontrol ediliyor…";

  const task = isFreeWriting ? null : tasks[state.activeTask];
  const score = task ? calculateTelcScore(task, text) : null;
  const localIssues = runLocalLanguageChecks(text, task);
  const allIssues = deduplicateIssues(localIssues, text);
  const correctedText = buildCorrectedText(text, allIssues);
  const suitability = task ? evaluateLetterSuitability(task, text, score, allIssues) : null;
  const freeEvaluation = task ? null : evaluateFreeWriting(text, allIssues);

  lastEvaluation = { free: !task, score, localIssues, allIssues, correctedText, suitability, freeEvaluation, text };
  state.attempts += 1;
  if (task) {
    state.lastScore = score.total;
    state.bestScore = Math.max(Number(state.bestScore) || 0, score.total);
    state.completed[String(task.id)] = { score: score.total, date: new Date().toISOString() };
  }
  saveProgress();
  renderInlineReview(text, allIssues);
  renderResults(lastEvaluation);
  if (task) updateTaskPointStates(score.analyses);

  dom.checkLetter.disabled = false;
  dom.checkLetter.textContent = oldText;
  dom.resultsPanel.hidden = false;
  dom.inlineReview.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deduplicateIssues(issues, text = "") {
  const seen = new Set();
  const severityRank = { ERROR: 3, IMPROVEMENT: 2, INFO: 1 };
  const confidenceRank = { high: 3, medium: 2, low: 1 };
  const ranked = issues.slice().sort((a, b) =>
    (b.priority || 0) - (a.priority || 0) ||
    (severityRank[b.severity] || 0) - (severityRank[a.severity] || 0) ||
    (confidenceRank[b.confidence] || 0) - (confidenceRank[a.confidence] || 0) ||
    (b.length || 0) - (a.length || 0) ||
    a.offset - b.offset
  );
  const selected = [];
  const sentenceCounts = new Map();
  const sentenceSpans = getSentenceSpans(text);

  ranked.forEach((issue) => {
    const key = `${issue.offset}|${normalizeText(issue.original)}|${normalizeText(issue.suggestion)}`;
    if (seen.has(key)) return;
    seen.add(key);
    const start = Number.isInteger(issue.offset) ? issue.offset : -1;
    const end = start + (issue.length || 0);
    const overlaps = start >= 0 && selected.some((other) => {
      if (!Number.isInteger(other.offset)) return false;
      const otherEnd = other.offset + (other.length || 0);
      return start < otherEnd && end > other.offset;
    });
    if (overlaps) return;

    const sentenceIndex = sentenceSpans.findIndex((span) => start >= span.start && start < span.end);
    const densityKey = sentenceIndex >= 0 ? sentenceIndex : `offset-${start}`;
    const density = sentenceCounts.get(densityKey) || 0;
    if (density >= 4 && issue.source !== "suitability") return;
    sentenceCounts.set(densityKey, density + 1);
    selected.push(issue);
  });
  return selected.sort((a, b) => a.offset - b.offset || (b.priority || 0) - (a.priority || 0));
}

function updateTaskPointStates(analyses) {
  [...dom.contentPoints.children].forEach((li, index) => {
    const analysis = analyses[index];
    const status = li.querySelector(".point-state");
    li.classList.remove("analysed-full", "analysed-partial");
    if (analysis.score === 3) {
      li.classList.add("analysed-full");
      status.textContent = "Erfüllt";
    } else if (analysis.score === 1.5) {
      li.classList.add("analysed-partial");
      status.textContent = "Teilweise";
    } else {
      status.textContent = "Fehlt";
    }
  });
}

function renderSuitabilityOverview(suitability) {
  const section = element("section", `suitability-overview ${suitability.overall}`);
  const heading = element("div", "suitability-heading");
  heading.append(
    element("h3", "", "Mektuba uygunluk ve dil kontrolü"),
    element("p", "", "Görev, hitap, düzen, uzunluk ve dilbilgisi birlikte kontrol edildi.")
  );
  section.append(heading);

  const grid = element("div", "suitability-grid");
  suitability.items.forEach((item) => {
    const card = element("article", `suitability-item ${item.status}`);
    card.append(
      element("span", "suitability-icon", item.status === "good" ? "✓" : item.status === "warning" ? "!" : "×"),
      element("strong", "", item.title),
      element("p", "", item.detail)
    );
    grid.append(card);
  });
  section.append(grid);
  return section;
}

function compactCheckRow(label, status, detail) {
  const row = element("div", `compact-check-row ${status}`);
  row.append(
    element("span", "compact-check-icon", status === "good" ? "✓" : status === "error" ? "×" : status === "warning" ? "!" : "i"),
    element("strong", "", label),
    element("span", "compact-check-detail", detail)
  );
  return row;
}

function renderResults(evaluation) {
  const { free, score, allIssues, correctedText, suitability, freeEvaluation, text } = evaluation;
  const languageIssues = allIssues.filter((issue) => issue.source !== "suitability");
  dom.resultsContent.replaceChildren();

  const heading = element("div", "compact-result-heading");
  if (free) {
    heading.append(
      element("div", "compact-score-badge", `${freeEvaluation.languageIssueCount}`),
      element("div", "compact-result-copy")
    );
    heading.lastElementChild.append(
      element("h3", "", freeEvaluation.languageIssueCount === 0 ? "Belirgin hata bulunmadı" : "Kontrol tamamlandı"),
      element("p", "", freeEvaluation.languageIssueCount === 0 ? "Serbest Almanca yazınız kontrol edildi." : `${freeEvaluation.languageIssueCount} düzeltme önerisi bulundu.`)
    );
  } else {
    const feedback = scoreFeedback(score.total, suitability);
    heading.append(
      element("div", "compact-score-badge", `${formatScore(score.total)}/10`),
      element("div", "compact-result-copy")
    );
    heading.lastElementChild.append(element("h3", "", feedback.title), element("p", "", feedback.text));
  }
  dom.resultsContent.append(heading);

  const checks = element("div", "compact-check-list");
  if (free) {
    checks.append(
      compactCheckRow(
        "Dilbilgisi ve yazım",
        freeEvaluation.status,
        formatLanguageIssueStats(languageIssues)
      ),
      compactCheckRow("Uzunluk", "info", `${freeEvaluation.words} kelime · Serbest yazıda kelime sınırı yok.`)
    );
    if (freeEvaluation.appearsToBeLetter) {
      const completeLetter = freeEvaluation.greeting.found && freeEvaluation.closing.found;
      checks.append(compactCheckRow("Mektup düzeni", completeLetter ? "good" : "warning", completeLetter ? "Hitap ve kapanış bulundu." : "Hitap veya kapanış eksik olabilir."));
    } else {
      checks.append(compactCheckRow("Yazı türü", "info", "Serbest metin olarak kontrol edildi; mektup düzeni aranmadı."));
    }
  } else {
    const completedPoints = score.analyses.filter((analysis) => analysis.score > 0).length;
    const formatGood = score.greeting.found && score.closing.found && !score.styleMismatch && !allIssues.some((issue) => issue.source === "suitability");
    const words = countWords(text);
    checks.append(
      compactCheckRow("Görev maddeleri", completedPoints >= 3 ? "good" : completedPoints === 2 ? "warning" : "error", `${completedPoints}/4 madde bulundu. En az 3 madde yazın.`),
      compactCheckRow(
        "Dilbilgisi ve yazım",
        getLanguageIssueStats(languageIssues).errors > 0 ? "error" : languageIssues.length > 0 ? "warning" : "good",
        formatLanguageIssueStats(languageIssues)
      ),
      compactCheckRow("Mektup düzeni", formatGood ? "good" : "warning", formatGood ? "Hitap ve kapanış uygun." : "Hitap, kapanış veya resmîlik biçimini kontrol edin."),
      compactCheckRow("Uzunluk", words >= 30 && words <= 55 ? "good" : "warning", `${words} kelime · Hedef yaklaşık 40 kelime.`)
    );
  }
  dom.resultsContent.append(checks);

  const advice = element("p", "compact-advice", free
    ? (languageIssues.length ? "Yazınızın altındaki kırmızı çizgili yerleri düzeltin." : "Metninizi yine de öğretmeninize göstermenizi öneririz.")
    : getNextTeacherStep(tasks[state.activeTask], text, score.analyses));
  dom.resultsContent.append(advice);

  const correctedDetails = element("details", "compact-corrected");
  correctedDetails.append(
    element("summary", "", "Düzeltilmiş metni göster"),
    element("p", "corrected-text", correctedText || text)
  );
  dom.resultsContent.append(correctedDetails);
  dom.resultsContent.append(element("p", "compact-result-warning", "Otomatik kontrol hata yapabilir. Sonucunuzu öğretmeninize danışın."));
}

function renderLanguageIssue(issue) {
  const card = element("article", "language-card");
  card.append(element("span", "error-type", `${issueSeverityLabel(issue.severity)} · ${friendlyIssueType(issue.type)}`));
  const originalLine = element("p");
  originalLine.append("Senin cümlen: ", element("span", "student-fragment", issue.original || "—"));
  card.append(originalLine);
  if (issue.suggestion) {
    const suggestionLine = element("p");
    suggestionLine.append("Daha iyi: ", element("span", "suggestion", issue.suggestion));
    card.append(suggestionLine);
  }
  const why = element("p");
  why.append(element("strong", "", "Neden? "), document.createTextNode(issue.explanation || issue.message));
  card.append(why, element("p", "", "Seviye: A2"));
  return card;
}

function issueSeverityLabel(severity) {
  if (severity === "IMPROVEMENT") return "İYİLEŞTİRME";
  if (severity === "INFO") return "BİLGİ";
  return "HATA";
}

function friendlyIssueType(type) {
  const value = normalizeText(type || "");
  if (value.includes("mektuba uygun")) return "Mektuba uygunluk";
  if (value.includes("hoflich")) return "Resmî hitap";
  if (value.includes("verbkonjugation") || value.includes("ozne-fiil")) return "Fiil çekimi";
  if (value.includes("fragesatz")) return "Soru cümlesi";
  if (value.includes("nebensatz")) return "Yan cümlede fiil";
  if (value.includes("trennbar")) return "Ayrılabilen fiil";
  if (value.includes("modal")) return "Modal fiil";
  if (value.includes("personalpronomen")) return "Kişi zamiri";
  if (value.includes("possessiv")) return "İyelik artikeli";
  if (value.includes("adjektiv")) return "Sıfat çekimi";
  if (value.includes("imperativ")) return "Emir cümlesi";
  if (value.includes("eksik fiil")) return "Eksik fiil";
  if (value.includes("fazla fiil")) return "Fazla fiil";
  if (value.includes("kelime secimi")) return "Kelime seçimi";
  if (value.includes("rechtschreib")) return "Yazım";
  if (value.includes("grammatik")) return "Dilbilgisi";
  if (value.includes("wortstellung")) return "Kelime sırası";
  if (value.includes("artikel")) return "Artikel";
  if (value.includes("praposition")) return "Edat";
  if (value.includes("zeichensetzung") || value.includes("noktalama")) return "Noktalama";
  if (value.includes("gross")) return "Büyük harf";
  if (value.includes("yazim")) return "Yazım";
  if (value.includes("perfekt")) return "Geçmiş zaman";
  if (value.includes("gruss")) return "Kapanış";
  return type || "Dil kullanımı";
}

function scoreFeedback(total, suitability) {
  if (suitability && suitability.overall === "error") {
    return { title: "Kontrol tamamlandı.", text: "Görev puanını ve aşağıdaki kırmızı dilbilgisi veya uygunluk uyarılarını birlikte değerlendir." };
  }
  if (suitability && suitability.overall === "warning") {
    return { title: "İyi gidiyorsun!", text: "Sarı ve kırmızı gösterilen birkaç noktayı düzeltirsen mektubun daha güçlü olur." };
  }
  if (total >= 9) return { title: "Çok iyi!", text: "Görevi açık ve uygun şekilde tamamladın." };
  if (total >= 7) return { title: "İyi gidiyorsun!", text: "Birkaç küçük noktayı düzeltirsen daha güçlü olur." };
  if (total >= 4) return { title: "İyi bir başlangıç.", text: "Bazı görev maddeleri veya mektup yapısı eksik." };
  return { title: "Birlikte geliştirebiliriz.", text: "Görev maddelerini tekrar oku ve kısa, net cümlelerle yeniden dene." };
}

function formatScore(number) {
  return Number.isInteger(number) ? String(number) : String(number).replace(".", ",");
}

function getNextTeacherStep(task, text, analyses = analyseContentPoints(task, text)) {
  if (!detectGreeting(text).found) return "Önce uygun bir Anrede yaz: arkadaş için “Liebe/Lieber …,”; kurum için “Sehr geehrte Damen und Herren,”.";
  const missing = analyses.find((item) => item.score === 0);
  const partial = analyses.find((item) => item.score === 1.5);
  if (missing) return `${missing.label} maddesi henüz görünmüyor. ${missing.hint}`;
  if (partial) return `${partial.label} maddesini biraz daha açık yaz. ${partial.hint}`;
  if (!detectClosing(text).found) return "Son olarak uygun bir Grußformel ekle: “Viele Grüße” veya resmî e-mailde “Mit freundlichen Grüßen”.";
  return "Mektubun temel yapısı tamam. Şimdi yazım ve dilbilgisi için “Mektubumu Kontrol Et” düğmesini kullan.";
}

function startTimer() {
  if (timerInterval) window.clearInterval(timerInterval);
  timerInterval = window.setInterval(() => {
    if (timerPaused || timerRemaining <= 0) return;
    timerRemaining -= 1;
    renderTimer();
    if (timerRemaining === 0) {
      showNotification("Süre bitti. Yazmaya devam edebilir veya mektubunu kontrol edebilirsin.", "warning");
    }
  }, 1000);
  renderTimer();
}

function renderTimer() {
  if (!sessionStarted) {
    dom.timer.textContent = "--:--";
    dom.timer.style.color = "";
    dom.pauseTimer.disabled = true;
    dom.resetTimer.disabled = true;
    return;
  }

  const minutes = Math.floor(timerRemaining / 60);
  const seconds = timerRemaining % 60;
  dom.timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  dom.timer.style.color = timerRemaining <= 60 ? "#ffd6d9" : "";
  dom.pauseTimer.disabled = timerRemaining <= 0;
  dom.resetTimer.disabled = false;
}

function toggleTimerPause() {
  if (!sessionStarted || timerRemaining <= 0) return;
  timerPaused = !timerPaused;
  dom.pauseTimer.textContent = timerPaused ? "Devam et" : "Duraklat";
  dom.pauseTimer.setAttribute("aria-label", timerPaused ? "Süreyi devam ettir" : "Süreyi duraklat");
  showNotification(timerPaused ? "Süre duraklatıldı." : "Süre devam ediyor.");
}

function resetTimer(notify = true) {
  if (!sessionStarted) {
    renderTimer();
    return;
  }
  timerRemaining = TASK_SECONDS;
  timerPaused = false;
  if (dom.pauseTimer) dom.pauseTimer.textContent = "Duraklat";
  if (dom.timer) renderTimer();
  if (notify) showNotification("Süre yeniden 15 dakikaya ayarlandı.");
}

function startExamSession() {
  isFreeWriting = selectedStartType === "free";
  sessionStarted = true;
  pausedForAwayView = false;
  timerRemaining = TASK_SECONDS;
  timerPaused = false;
  dom.pauseTimer.disabled = false;
  dom.resetTimer.disabled = false;
  dom.pauseTimer.textContent = "Duraklat";
  renderTask();
  switchView("trainer");
  startTimer();
  showNotification(isFreeWriting ? "Serbest yazma başladı." : `Mektup ${tasks[state.activeTask].id} başladı.`, "success");
}

function switchView(view) {
  const showPractice = view === "practice";
  const showTrainer = view === "trainer" && sessionStarted;
  const showStart = view === "home";

  if ((showPractice || showStart) && sessionStarted && !timerPaused && !dom.trainerView.hidden) {
    timerPaused = true;
    pausedForAwayView = true;
    dom.pauseTimer.textContent = "Devam et";
    showNotification("Yazma ekranından çıkınca süre duraklatıldı.");
  }

  if (showTrainer && pausedForAwayView) {
    timerPaused = false;
    pausedForAwayView = false;
    dom.pauseTimer.textContent = "Duraklat";
    showNotification("Süre devam ediyor.");
  }

  dom.startView.classList.toggle("active", showStart);
  dom.startView.hidden = !showStart;
  dom.trainerView.classList.toggle("active", showTrainer);
  dom.trainerView.hidden = !showTrainer;
  dom.practiceView.classList.toggle("active", showPractice);
  dom.practiceView.hidden = !showPractice;

  if (showStart) dom.headerTask.textContent = `${tasks.length} mektup + serbest yazma`;
  if (showTrainer) {
    dom.headerTask.textContent = isFreeWriting ? "Serbest yazma" : `Mektup ${String(tasks[state.activeTask].id).padStart(2, "0")} / ${tasks.length}`;
  }
  if (showPractice) dom.headerTask.textContent = "Kalıp rehberi";

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleAccordion(button, panel) {
  const willOpen = panel.hidden;
  panel.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
  const icon = button.lastElementChild;
  if (icon) icon.textContent = willOpen ? "−" : "＋";
}

function closeAccordions() {
  [[dom.tipsToggle, dom.tipsPanel], [dom.sampleToggle, dom.samplePanel]].forEach(([button, panel]) => {
    panel.hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (button.lastElementChild) button.lastElementChild.textContent = "＋";
  });
}

function renderPhraseCategories() {
  const visibleCategories = [{ id: "all", label: "Tüm kalıplar" }, ...phraseGuideGroups];
  dom.phraseCategories.replaceChildren();
  visibleCategories.forEach((category) => {
    const button = element("button", `category-chip${activePhraseCategory === category.id ? " active" : ""}`, category.label);
    button.type = "button";
    button.dataset.category = category.id;
    dom.phraseCategories.append(button);
  });
}

function renderPhraseBank() {
  const query = normalizeText(dom.phraseSearch ? dom.phraseSearch.value : "");
  const groups = phraseGuideGroups.filter((group) => activePhraseCategory === "all" || group.id === activePhraseCategory);
  dom.phraseBankList.replaceChildren();

  let visiblePhraseCount = 0;
  groups.forEach((group) => {
    const phrases = group.categories
      .flatMap((category) => phraseBank[category] || [])
      .filter((phrase) => !query || normalizeText(`${phrase.text} ${phrase.tr} ${group.label} ${group.purpose}`).includes(query));
    if (phrases.length === 0) return;

    visiblePhraseCount += phrases.length;
    const section = element("section", "phrase-guide-group");
    const heading = element("div", "phrase-guide-heading");
    heading.append(element("h3", "", group.label), element("p", "", group.purpose));
    const grid = element("div", "phrase-bank-grid");
    phrases.forEach((phrase) => {
      const card = element("article", "phrase-card");
      const copy = element("div");
      copy.append(element("strong", "", phrase.text), element("small", "", phrase.tr));
      card.append(copy, makeCopyButton(phrase.text));
      grid.append(card);
    });
    section.append(heading, grid);
    dom.phraseBankList.append(section);
  });
  if (visiblePhraseCount === 0) dom.phraseBankList.append(element("p", "", "Bu aramada kalıp bulunamadı."));
}

function makeCopyButton(text) {
  const button = element("button", "copy-button", "Kopyala");
  button.type = "button";
  button.dataset.copy = text;
  button.setAttribute("aria-label", `${text} kalıbını kopyala`);
  return button;
}

async function handleCopyClick(event) {
  const button = event.target.closest("button[data-copy]");
  if (!button) return;
  const text = button.dataset.copy;
  try {
    await navigator.clipboard.writeText(text);
  } catch (_error) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  const old = button.textContent;
  button.textContent = "Kopyalandı ✓";
  window.setTimeout(() => { button.textContent = old; }, 1600);
}

function saveDraft() {
  if (!dom.studentText) return;
  if (isFreeWriting) state.freeDraft = dom.studentText.value;
  else state.drafts[String(tasks[state.activeTask].id)] = dom.studentText.value;
  saveProgress();
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_error) {
    // Depolama kapalıysa uygulama yine çalışır.
  }
}

function loadDraft(taskId) {
  return state.drafts[String(taskId)] || "";
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved || typeof saved !== "object") return;
    state = {
      ...state,
      ...saved,
      drafts: saved.drafts && typeof saved.drafts === "object" ? saved.drafts : {},
      freeDraft: typeof saved.freeDraft === "string" ? saved.freeDraft : "",
      completed: saved.completed && typeof saved.completed === "object" ? saved.completed : {}
    };
    state.activeTask = Math.max(0, Math.min(tasks.length - 1, Number(state.activeTask) || 0));
  } catch (_error) {
    // Bozuk kayıt sessizce yok sayılır.
  }
}

function resetProgress() {
  const confirmed = window.confirm("Tüm taslakları, puanları ve ilerlemeyi sıfırlamak istiyor musun?");
  if (!confirmed) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch (_error) { /* no-op */ }
  state = { activeTask: 0, drafts: {}, freeDraft: "", completed: {}, lastScore: null, bestScore: 0, attempts: 0 };
  sessionStarted = false;
  timerPaused = true;
  selectedStartType = "task";
  isFreeWriting = false;
  pausedForAwayView = false;
  timerRemaining = TASK_SECONDS;
  if (timerInterval) window.clearInterval(timerInterval);
  timerInterval = null;
  renderTimer();
  renderStartTaskGrid();
  renderTask();
  switchView("home");
  showNotification("İlerleme sıfırlandı.", "success");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function element(tagName, className = "", text = null) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text !== null && text !== undefined) node.textContent = String(text);
  return node;
}

function showNotification(message, type = "") {
  if (notificationTimeout) window.clearTimeout(notificationTimeout);
  dom.notification.textContent = message;
  dom.notification.className = `notification${type ? ` ${type}` : ""}`;
  dom.notification.hidden = false;
  notificationTimeout = window.setTimeout(() => {
    dom.notification.hidden = true;
  }, 3200);
}

document.addEventListener("DOMContentLoaded", initializeApp);

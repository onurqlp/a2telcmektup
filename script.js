"use strict";

// Kurum daha sonra güvenli bir sunucu endpoint'i eklerse bu alanı doldurabilir.
// Gizli API anahtarı hiçbir zaman bu dosyaya yazılmamalıdır.
const AI_TEACHER_ENDPOINT = "";
const LANGUAGE_TOOL_ENDPOINT = "https://api.languagetool.org/v2/check";
const STORAGE_KEY = "ayda_telc_a2_progress_v1";
const TASK_SECONDS = 15 * 60;

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
    { id: "travel-pickup", text: "Kannst du mich am Bahnhof abholen?", tr: "Beni gardan alabilir misin?" }
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
    explanation: "Günlerden önce ‘am’ kullanılır: ich komme am Samstag."
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
    id: "ich-kommen",
    pattern: /\bich kommen\b/gi,
    replacement: "ich komme",
    type: "Grammatik / Verb",
    explanation: "‘ich’ ile fiil ‘komme’ olarak çekilir: ich komme."
  },
  {
    id: "ich-haben",
    pattern: /\bich haben\b/gi,
    replacement: "ich habe",
    type: "Grammatik / Verb",
    explanation: "‘haben’ fiilinin ‘ich’ çekimi ‘habe’ olur."
  },
  {
    id: "ich-sein",
    pattern: /\bich sein\b/gi,
    replacement: "ich bin",
    type: "Grammatik / Verb",
    explanation: "‘sein’ fiilinin ‘ich’ çekimi ‘bin’ olur."
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
  }
];

const commonGermanNouns = Object.freeze({
  adresse: "Adresse",
  anmeldung: "Anmeldung",
  antwort: "Antwort",
  arzt: "Arzt",
  bahnhof: "Bahnhof",
  dank: "Dank",
  einladung: "Einladung",
  familie: "Familie",
  freund: "Freund",
  freundin: "Freundin",
  geburtstag: "Geburtstag",
  geschenk: "Geschenk",
  grüße: "Grüße",
  herr: "Herr",
  herren: "Herren",
  hilfe: "Hilfe",
  information: "Information",
  informationen: "Informationen",
  kaffee: "Kaffee",
  kino: "Kino",
  kuchen: "Kuchen",
  kurs: "Kurs",
  medizin: "Medizin",
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
  salat: "Salat",
  stunde: "Stunde",
  stunden: "Stunden",
  termin: "Termin",
  unterricht: "Unterricht",
  uhr: "Uhr",
  wochenende: "Wochenende",
  zeit: "Zeit",
  zug: "Zug"
});

let state = {
  activeTask: 0,
  drafts: {},
  completed: {},
  lastScore: null,
  bestScore: 0,
  attempts: 0,
  mode: "exam"
};

let timerRemaining = TASK_SECONDS;
let timerPaused = true;
let timerInterval = null;
let notificationTimeout = null;
let lastEvaluation = null;
let activePhraseCategory = "all";
let sessionStarted = false;
let pausedForPhraseGuide = false;
let textareaSelection = { start: 0, end: 0 };

const dom = {};

function cacheDom() {
  [
    "headerTask", "timer", "pauseTimer", "resetTimer", "startView", "trainerView", "practiceView",
    "startExam", "openPhraseGuide",
    "taskDifficulty", "taskTopic", "taskTitle", "taskSituation", "taskInstruction",
    "contentPoints", "taskPhrases", "sampleAnswer", "tipsToggle", "tipsPanel",
    "sampleToggle", "samplePanel", "prevTask", "nextTask", "taskSelect", "studentText",
    "inlineReview", "inlineReviewCount", "reviewedLetter", "inlineExplanations",
    "wordCount", "charCount", "lengthStatus", "checkLetter", "openTeacher", "teacherPanel",
    "teacherSource", "teacherResponse", "stepGuide", "stepNumber", "stepTitle", "stepText",
    "refreshStep", "resultsPanel", "resultsContent", "closeResults", "notification",
    "phraseSearch", "phraseCategories", "phraseBankList", "bankPractice", "resetProgress"
  ].forEach((id) => {
    dom[id] = document.getElementById(id);
  });
}

function initializeApp() {
  cacheDom();
  loadProgress();
  buildTaskSelect();
  bindEvents();
  renderTask();
  setMode(state.mode || "exam", false);
  updateCounters();
  renderTimer();
  renderPhraseCategories();
  renderPhraseBank();
  switchView("trainer");

  window.AYDA_TEST = Object.freeze({
    tasks,
    phraseBank,
    countWords,
    detectGreeting,
    detectClosing,
    analyseContentPoints,
    calculateTelcScore,
    runLocalLanguageChecks,
    evaluateLetterSuitability,
    getExpectedFormality,
    insertAtCursor,
    getTimerRemaining: () => timerRemaining,
    isSessionStarted: () => sessionStarted
  });
}

function bindEvents() {
  dom.studentText.addEventListener("input", () => {
    rememberTextareaSelection();
    updateCounters();
    saveDraft();
    dom.inlineReview.hidden = true;
    dom.resultsPanel.hidden = true;
    if (state.mode === "steps") updateStepGuide();
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
  dom.openTeacher.addEventListener("click", () => setMode("teacher"));
  dom.closeResults.addEventListener("click", () => { dom.resultsPanel.hidden = true; });
  dom.pauseTimer.addEventListener("click", toggleTimerPause);
  dom.resetTimer.addEventListener("click", resetTimer);
  dom.refreshStep.addEventListener("click", updateStepGuide);
  dom.resetProgress.addEventListener("click", resetProgress);
  dom.startExam.addEventListener("click", startExamSession);
  dom.openPhraseGuide.addEventListener("click", () => switchView("practice"));

  document.querySelectorAll(".mode-button").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  dom.tipsToggle.addEventListener("click", () => toggleAccordion(dom.tipsToggle, dom.tipsPanel));
  dom.sampleToggle.addEventListener("click", () => toggleAccordion(dom.sampleToggle, dom.samplePanel));

  dom.teacherPanel.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-teacher-action]");
    if (button) handleTeacherAction(button.dataset.teacherAction);
  });

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

function renderTask() {
  const task = tasks[state.activeTask];
  dom.headerTask.textContent = `Soru ${String(task.id).padStart(2, "0")} / ${tasks.length}`;
  dom.taskDifficulty.textContent = task.difficulty;
  dom.taskTopic.textContent = task.topic;
  dom.taskTitle.textContent = `Soru ${task.id}`;
  dom.taskSituation.textContent = task.situation;
  dom.taskInstruction.textContent = task.instruction;
  dom.taskSelect.value = String(state.activeTask);
  dom.prevTask.disabled = state.activeTask === 0;
  dom.nextTask.disabled = state.activeTask === tasks.length - 1;

  dom.contentPoints.replaceChildren();
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
  dom.studentText.value = state.drafts[String(task.id)] || "";
  closeAccordions();
  dom.resultsPanel.hidden = true;
  dom.inlineReview.hidden = true;
  lastEvaluation = null;
  updateCounters();
  updateStepGuide();
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
  state.activeTask = nextIndex;
  saveProgress();
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

function makeLocalIssue({ ruleId, type, explanation, original, suggestion, offset, source = "local" }) {
  return {
    source,
    ruleId,
    type,
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

function runStructuralLanguageChecks(text, task) {
  const value = String(text);
  const issues = [];
  const salutation = value.match(/^\s*(?:liebe\s+\p{L}+|lieber\s+\p{L}+|hallo(?:\s+\p{L}+)?|sehr geehrte[^\r\n]*|guten tag[^\r\n]*),[ \t]*\r?\n+[ \t]*([a-zäöüß])/iu);
  const salutationContinuationOffset = salutation ? salutation.index + salutation[0].length - salutation[1].length : -1;

  for (const match of value.matchAll(/(^|[.!?]\s+|\n+)([a-zäöüß])(?=\p{L})/gmu)) {
    const offset = match.index + match[1].length;
    if (offset === salutationContinuationOffset) continue;
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
  if (firstLine) {
    const clean = firstLine[0].trim();
    const isGreeting = /^(?:liebe\s+\p{L}+|lieber\s+\p{L}+|hallo(?:\s+\p{L}+)?|sehr geehrte|guten tag)/iu.test(clean);
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

  const closingLineIndex = lines.findIndex((line) => /^(?:mit freundlichen gr(?:ü|u|ue)ßen|(?:liebe|viele|herzliche) gr(?:ü|u|ue)ße|bis bald)\s*,?$/iu.test(line[0].trim()));
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

  const bodyEnd = closingLineIndex >= 0 ? closingLineIndex : Math.max(1, lines.length - 1);
  lines.slice(1, bodyEnd).forEach((line) => {
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

  if (getExpectedFormality(task) === "formal") {
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
  } else {
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
  if (greeting.found && greeting.type !== expected && firstLine) {
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
      const suggestion = match[0].replace(new RegExp(rule.pattern.source, rule.pattern.flags.replace("g", "")), rule.replacement);
      issues.push(makeLocalIssue({
        ruleId: rule.id,
        type: rule.type,
        explanation: rule.explanation,
        original: match[0],
        suggestion,
        offset: match.index
      }));
    }
  });
  issues.push(...runStructuralLanguageChecks(value, task));
  return issues.sort((a, b) => a.offset - b.offset || b.length - a.length);
}

async function checkWithLanguageTool(text) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10000);
  try {
    const body = new URLSearchParams({ text, language: "de-DE", enabledOnly: "false" });
    const response = await fetch(LANGUAGE_TOOL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`LanguageTool ${response.status}`);
    const data = await response.json();
    return {
      available: true,
      matches: Array.isArray(data.matches) ? data.matches.map(mapLanguageToolMatch) : []
    };
  } catch (error) {
    return { available: false, matches: [], error: error instanceof Error ? error.message : "Network error" };
  } finally {
    window.clearTimeout(timeout);
  }
}

function mapLanguageToolMatch(match) {
  const replacement = match.replacements && match.replacements[0] ? match.replacements[0].value : "";
  const original = match.context && typeof match.context.text === "string"
    ? match.context.text.slice(match.context.offset, match.context.offset + match.context.length)
    : "";
  const category = match.rule && match.rule.category ? match.rule.category.name : "Sprache";
  return {
    source: "languagetool",
    ruleId: match.rule ? match.rule.id : "LT",
    type: category,
    message: match.message || "Dil kullanımını kontrol et.",
    explanation: languageToolExplanation(category, match.message),
    original,
    suggestion: replacement,
    offset: match.offset,
    length: match.length,
    replacement
  };
}

function languageToolExplanation(category, message) {
  const normalized = normalizeText(category);
  if (normalized.includes("rechtschreib")) return "Bu kelimenin yazımını kontrol et. Öneri, standart Almanca yazıma uygundur.";
  if (normalized.includes("grammatik")) return "Bu yapıda dilbilgisi veya çekim uyumu olabilir. Önerilen kısa biçimi karşılaştır.";
  if (normalized.includes("zeichensetzung")) return "Noktalama işaretini kontrol et; kısa cümleleri nokta ile ayırmak metni daha anlaşılır yapar.";
  if (normalized.includes("gross")) return "Almancada isimler büyük harfle başlar. Büyük-küçük harf kullanımını kontrol et.";
  return message ? `LanguageTool uyarısı: ${message}` : "Bu ifadeyi önerilen A2 biçimiyle karşılaştır.";
}

function applyLanguageToolCorrections(text, issues) {
  const localRanges = issues
    .filter((issue) => issue.source === "local" && Number.isInteger(issue.offset))
    .map((issue) => ({ start: issue.offset, end: issue.offset + issue.length }));
  const correctionCandidates = issues
    .filter((issue) => issue.source !== "suitability" && issue.replacement && Number.isInteger(issue.offset))
    .filter((issue) => issue.source === "local" || !localRanges.some((range) => {
      const issueEnd = issue.offset + issue.length;
      return issue.offset < range.end && issueEnd > range.start;
    }))
    .sort((a, b) => a.offset - b.offset || b.length - a.length);
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
  return applyLanguageToolCorrections(text, issues);
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
    dom.inlineExplanations.append(element("p", "review-clean-note", "Belirgin bir A2 dilbilgisi, yazım veya mektuba uygunluk sorunu bulunmadı."));
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
    marked.title = cluster.issues.map((issue) => `${issue.reviewNumber}. ${friendlyIssueType(issue.type)}`).join(" · ");
    const number = element("sup", "review-error-number", cluster.issues.map((issue) => issue.reviewNumber).join(","));
    dom.reviewedLetter.append(marked, number);
    cursor = cluster.end;
  });
  if (cursor < text.length) dom.reviewedLetter.append(document.createTextNode(text.slice(cursor)));

  rangedIssues.forEach((issue) => {
    const card = element("article", "inline-explanation");
    card.append(element("span", "explanation-number", issue.reviewNumber));
    const detail = element("div");
    detail.append(element("strong", "", friendlyIssueType(issue.type)));
    const change = element("p", "explanation-change");
    change.append(
      element("span", "wrong-fragment", issue.original || "—"),
      document.createTextNode(" → "),
      element("span", "right-fragment", issue.suggestion || "Kontrol et")
    );
    detail.append(change, element("p", "explanation-why", issue.explanation || issue.message));
    card.append(detail);
    dom.inlineExplanations.append(card);
  });
  dom.inlineReview.hidden = false;
}

async function handleLetterCheck() {
  const text = dom.studentText.value.trim();
  if (!text) {
    showNotification("Bitte schreibe zuerst eine E-Mail.", "warning");
    dom.studentText.focus();
    return;
  }

  dom.checkLetter.disabled = true;
  const oldText = dom.checkLetter.textContent;
  dom.checkLetter.textContent = "Kontrol ediliyor…";

  const task = tasks[state.activeTask];
  const score = calculateTelcScore(task, text);
  const localIssues = runLocalLanguageChecks(text, task);
  const languageTool = await checkWithLanguageTool(text);
  const allIssues = deduplicateIssues([...localIssues, ...languageTool.matches]);
  const correctedText = buildCorrectedText(text, allIssues);
  const suitability = evaluateLetterSuitability(task, text, score, allIssues);

  lastEvaluation = { score, localIssues, languageTool, allIssues, correctedText, suitability, text };
  state.attempts += 1;
  state.lastScore = score.total;
  state.bestScore = Math.max(Number(state.bestScore) || 0, score.total);
  state.completed[String(tasks[state.activeTask].id)] = {
    score: score.total,
    date: new Date().toISOString()
  };
  saveProgress();
  renderInlineReview(text, allIssues);
  renderResults(lastEvaluation);
  updateTaskPointStates(score.analyses);

  dom.checkLetter.disabled = false;
  dom.checkLetter.textContent = oldText;
  dom.resultsPanel.hidden = false;
  dom.inlineReview.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deduplicateIssues(issues) {
  const seen = new Set();
  return issues.filter((issue) => {
    const key = `${issue.offset}|${normalizeText(issue.original)}|${normalizeText(issue.suggestion)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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

function renderResults(evaluation) {
  const { score, languageTool, allIssues, correctedText, suitability, text } = evaluation;
  const languageIssues = allIssues.filter((issue) => issue.source !== "suitability");
  dom.resultsContent.replaceChildren();

  const summary = element("div", "score-summary");
  const ring = element("div", "score-ring");
  ring.style.setProperty("--score-angle", `${Math.min(360, score.total * 36)}deg`);
  ring.append(element("strong", "", formatScore(score.total)), element("span", "", "/ 10 görev puanı"));
  const copy = element("div", "score-copy");
  const feedback = scoreFeedback(score.total, suitability);
  copy.append(
    element("h3", "", feedback.title),
    element("p", "", feedback.text),
    element("span", "evaluated-note", `Puanlanan maddeler: ${score.evaluatedNumbers.join(", ")}`),
    element("small", "", "Bu otomatik çalışma değerlendirmesidir; resmî telc sınav sonucu değildir.")
  );
  summary.append(ring, copy);
  dom.resultsContent.append(summary, renderSuitabilityOverview(suitability));

  if (countWords(text) < 21) {
    dom.resultsContent.append(element("p", "short-note", "Metnin çok kısa. Analiz yapıldı; daha açık bir sonuç için içerik maddelerine kısa cümleler ekle."));
  }

  const columns = element("div", "result-columns");
  const telcBlock = element("section", "result-block");
  telcBlock.append(element("h3", "", "Görev maddeleri"));
  score.analyses.forEach((analysis, index) => {
    const evaluated = score.evaluated.some((item) => item.originalIndex === index);
    const row = element("div", "point-result");
    const statusClass = analysis.score === 3 ? "full" : analysis.score === 1.5 ? "partial" : "missing";
    const icon = element("span", `result-icon ${statusClass}`, analysis.score === 3 ? "✓" : analysis.score === 1.5 ? "!" : "×");
    const detail = element("div");
    detail.append(
      element("strong", "", `Madde ${index + 1}${evaluated ? " · puana dahil" : ""}`),
      element("p", "", analysis.score === 3 ? "Açık ve anlaşılır yazılmış." : analysis.score === 1.5 ? "Var, fakat biraz daha açıklanabilir." : "Bu madde henüz yazılmamış.")
    );
    row.append(icon, detail, element("span", "point-score", `${formatScore(analysis.score)} / 3`));
    telcBlock.append(row);
  });

  const communication = element("div", "point-result");
  const communicationClass = score.communicationScore === 1 ? "full" : score.communicationScore === 0.5 ? "partial" : "missing";
  const communicationDetail = element("div");
  const greetingText = score.greeting.found ? "Başlangıç var ✓" : "Başlangıç eksik";
  const closingText = score.closing.found ? "Kapanış var ✓" : "Kapanış eksik";
  communicationDetail.append(
    element("strong", "", "Mektup başlangıcı ve kapanışı"),
    element("p", "", `${greetingText} · ${closingText}${score.styleMismatch ? " · Başlangıç ve kapanış aynı resmîlikte olsun" : ""}`)
  );
  communication.append(
    element("span", `result-icon ${communicationClass}`, score.communicationScore === 1 ? "✓" : score.communicationScore === 0.5 ? "!" : "×"),
    communicationDetail,
    element("span", "point-score", `${formatScore(score.communicationScore)} / 1`)
  );
  telcBlock.append(communication);

  const languageBlock = element("section", "result-block");
  languageBlock.append(element("h3", "", "Dilbilgisi ve yazım hataları"));
  if (languageIssues.length === 0) {
    languageBlock.append(element("p", "", "Belirgin bir dil veya yazım hatası bulunmadı."));
  } else {
    languageBlock.append(element("p", "", `${languageIssues.length} düzeltme önerisi bulundu.`));
    languageIssues.slice(0, 16).forEach((issue) => languageBlock.append(renderLanguageIssue(issue)));
  }
  if (!languageTool.available) {
    languageBlock.append(element("p", "network-note", "Genişletilmiş çevrimdışı A2 kontrolü tamamlandı. İnternet bağlantısı olduğunda ayrıca çevrim içi ayrıntılı kontrol de kullanılır."));
  } else {
    languageBlock.append(element("p", "network-note success", "Çevrim içi ayrıntılı Almanca kontrolü de tamamlandı."));
  }

  columns.append(telcBlock, languageBlock);

  const correctedBlock = element("section", "result-block full-width");
  correctedBlock.append(
    element("h3", "", "Düzeltilmiş metin"),
    element("p", "corrected-text", correctedText || text)
  );

  const nextBlock = element("section", "result-block full-width");
  nextBlock.append(
    element("h3", "", "Şimdi ne yapmalısın?"),
    element("div", "next-step-card", getNextTeacherStep(tasks[state.activeTask], text, score.analyses))
  );
  columns.append(correctedBlock, nextBlock);
  dom.resultsContent.append(columns);
}

function renderLanguageIssue(issue) {
  const card = element("article", "language-card");
  card.append(element("span", "error-type", friendlyIssueType(issue.type)));
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

function friendlyIssueType(type) {
  const value = normalizeText(type || "");
  if (value.includes("mektuba uygun")) return "Mektuba uygunluk";
  if (value.includes("hoflich")) return "Resmî hitap";
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

function setMode(mode, persist = true) {
  if (!['exam', 'teacher', 'steps'].includes(mode)) mode = "exam";
  state.mode = mode;
  document.body.dataset.mode = mode;
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  dom.teacherPanel.hidden = mode === "exam";
  dom.stepGuide.hidden = mode !== "steps";
  if (mode === "teacher") renderTeacherWelcome();
  if (mode === "steps") {
    dom.teacherPanel.hidden = false;
    updateStepGuide();
  }
  if (persist) saveProgress();
}

function renderTeacherWelcome() {
  dom.teacherSource.textContent = AI_TEACHER_ENDPOINT ? "Gelişmiş kontrol" : "Temel kontrol";
  dom.teacherResponse.replaceChildren();
  const message = element("div", "teacher-message");
  message.append(
    element("strong", "", "Hazırım."),
    element("p", "", "Cümleni sen yaz. Ben yalnızca yanlışını gösterip ne yazabileceğini anlatacağım.")
  );
  dom.teacherResponse.append(message);
}

async function handleTeacherAction(action) {
  const text = dom.studentText.value.trim();
  if (!text && action !== "next" && action !== "example") {
    renderTeacherMessage("Önce bir cümle yaz.", "Kısa bir Anrede ile başlayabilirsin: “Liebe Anna,”");
    return;
  }

  if (AI_TEACHER_ENDPOINT) {
    const endpointFeedback = await requestTeacherEndpoint(action, text);
    if (endpointFeedback) {
      renderTeacherMessage(endpointFeedback.title || "Yazma yardımı", endpointFeedback.message || endpointFeedback.feedback || "");
      return;
    }
  }

  const task = tasks[state.activeTask];
  const analyses = analyseContentPoints(task, text);
  const issues = runLocalLanguageChecks(text);
  const sentences = splitSentences(text);
  const lastSentence = sentences[sentences.length - 1] || "";

  if (action === "sentence") {
    const sentenceIssue = issues.find((issue) => lastSentence.toLocaleLowerCase("de-DE").includes(issue.original.toLocaleLowerCase("de-DE"))) || issues[0];
    if (sentenceIssue) {
      renderTeacherMessage(
        "Cümlen anlaşılır. Küçük bir düzeltme var.",
        `Senin cümlen: ${sentenceIssue.original}\nDaha doğal: ${sentenceIssue.suggestion}\nNeden? ${sentenceIssue.explanation}`
      );
    } else {
      renderTeacherMessage("Cümlen anlaşılır görünüyor.", "Şimdi görev maddelerinden birine kısa ve net bir cümleyle cevap ver.");
    }
  } else if (action === "missing") {
    const missing = analyses.find((item) => item.score === 0);
    renderTeacherMessage(
      missing ? "Bir içerik maddesi eksik." : "Dört madde de metinde görünüyor.",
      missing ? `Eksik: ${missing.label}. ${missing.hint}` : "En iyi yazdığın üç madde puanlanır. Şimdi başlangıç ve kapanışı kontrol et."
    );
  } else if (action === "why") {
    const issue = issues[0];
    renderTeacherMessage(
      issue ? issue.type : "Belirgin bir yerel kural hatası bulamadım.",
      issue ? `${issue.original} → ${issue.suggestion}\n${issue.explanation}` : "LanguageTool ile daha ayrıntılı kontrol için “Mektubumu Kontrol Et” düğmesini kullanabilirsin."
    );
  } else if (action === "natural") {
    const issue = issues[0];
    renderTeacherMessage(
      issue ? "Daha doğal A2 biçimi" : "Cümleyi sade tut.",
      issue ? `${issue.original} → ${issue.suggestion}` : naturalSuggestion(lastSentence)
    );
  } else if (action === "next") {
    renderTeacherMessage("Sonraki adım", getNextTeacherStep(task, text, analyses));
  } else if (action === "example") {
    const missing = analyses.find((item) => item.score === 0) || task.points[0];
    renderTeacherMessage("Kısa örnek cümle", `${missing.example}\nBu cümleyi aynen almak zorunda değilsin; kendi bilgine göre değiştir.`);
  }
}

async function requestTeacherEndpoint(action, text) {
  try {
    const task = tasks[state.activeTask];
    const payload = {
      action,
      task: {
        id: task.id,
        situation: task.situation,
        instruction: task.instruction,
        points: task.points.map(({ id, label }) => ({ id, label }))
      },
      studentText: text,
      localAnalysis: analyseContentPoints(task, text),
      localLanguageFindings: runLocalLanguageChecks(text)
    };
    const response = await fetch(AI_TEACHER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("AI endpoint unavailable");
    return await response.json();
  } catch (_error) {
    showNotification("Güvenli AI bağlantısı kullanılamadı. Yerel öğretmen devam ediyor.", "warning");
    return null;
  }
}

function naturalSuggestion(sentence) {
  if (!sentence) return "Önce kısa bir cümle yaz. Örnek: “Ich komme am Samstag.”";
  if (/ich komme samstag/i.test(sentence)) return "Daha doğal: Ich komme am Samstag.";
  if (countWords(sentence) > 14) return "Cümlen uzun. A2 için iki kısa cümleye bölebilirsin.";
  return "Cümlen kısa ve anlaşılır. Zamanı ‘am Samstag’, saati ‘um 15 Uhr’ ile yazabilirsin.";
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

function updateStepGuide() {
  if (!dom.stepGuide || state.mode !== "steps") return;
  const text = dom.studentText.value;
  const task = tasks[state.activeTask];
  const analyses = analyseContentPoints(task, text);
  let number = 1;
  let title = "Anrede yaz";
  let instruction = "Önce uygun bir hitap yaz.";

  if (detectGreeting(text).found) {
    const completedPoints = analyses.filter((item) => item.score > 0).length;
    if (completedPoints < 3) {
      number = 2 + completedPoints;
      const target = analyses.find((item) => item.score === 0) || analyses.find((item) => item.score === 1.5);
      title = `${number - 1}. Inhaltspunkt`;
      instruction = target ? target.hint : "Bir içerik maddesine kısa bir cümleyle cevap ver.";
    } else if (!detectClosing(text).found) {
      number = 5;
      title = "Grußformel ekle";
      instruction = "Şimdi uygun bir kapanış yaz. Örneği sen seç: Viele Grüße / Mit freundlichen Grüßen.";
    } else {
      number = 6;
      title = "Metin tamam";
      instruction = "Şimdi kendi metnini kontrol et. Sistem senin yerine yeni bir mektup yazmaz.";
    }
  }

  dom.stepNumber.textContent = String(number);
  dom.stepTitle.textContent = title;
  dom.stepText.textContent = instruction;
}

function renderTeacherMessage(title, message) {
  dom.teacherResponse.replaceChildren();
  const card = element("div", "teacher-message");
  card.append(element("strong", "", title));
  String(message).split("\n").forEach((line) => card.append(element("p", "", line)));
  dom.teacherResponse.append(card);
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
  sessionStarted = true;
  pausedForPhraseGuide = false;
  timerRemaining = TASK_SECONDS;
  timerPaused = false;
  dom.pauseTimer.disabled = false;
  dom.resetTimer.disabled = false;
  dom.pauseTimer.textContent = "Duraklat";
  switchView("trainer");
  startTimer();
  showNotification("Sınav başladı. 15 dakikan var.", "success");
}

function switchView(view) {
  const showPractice = view === "practice";
  const showTrainer = view === "trainer" && sessionStarted;
  const showStart = view === "trainer" && !sessionStarted;

  if (showPractice && sessionStarted && !timerPaused) {
    timerPaused = true;
    pausedForPhraseGuide = true;
    dom.pauseTimer.textContent = "Devam et";
    showNotification("Kalıp rehberindeyken süre duraklatıldı.");
  }

  if (showTrainer && pausedForPhraseGuide) {
    timerPaused = false;
    pausedForPhraseGuide = false;
    dom.pauseTimer.textContent = "Duraklat";
    showNotification("Süre devam ediyor.");
  }

  dom.startView.classList.toggle("active", showStart);
  dom.startView.hidden = !showStart;
  dom.trainerView.classList.toggle("active", showTrainer);
  dom.trainerView.hidden = !showTrainer;
  dom.practiceView.classList.toggle("active", showPractice);
  dom.practiceView.hidden = !showPractice;

  if (showStart) dom.headerTask.textContent = `${tasks.length} çalışma sorusu`;
  if (showTrainer) {
    const task = tasks[state.activeTask];
    dom.headerTask.textContent = `Soru ${String(task.id).padStart(2, "0")} / ${tasks.length}`;
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
  state.drafts[String(tasks[state.activeTask].id)] = dom.studentText.value;
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
  state = { activeTask: 0, drafts: {}, completed: {}, lastScore: null, bestScore: 0, attempts: 0, mode: "exam" };
  sessionStarted = false;
  timerPaused = true;
  pausedForPhraseGuide = false;
  timerRemaining = TASK_SECONDS;
  if (timerInterval) window.clearInterval(timerInterval);
  timerInterval = null;
  renderTimer();
  setMode("exam", false);
  renderTask();
  switchView("trainer");
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

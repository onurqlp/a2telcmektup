# AYDA telc A2 Schreiben Trainer

GitHub Pages üzerinde doğrudan çalışan, mobil uyumlu telc A2 Schreiben çalışma ve değerlendirme uygulaması.

Arayüz; bilgisayar kullanımı sınırlı ve ileri yaştaki öğrenciler için büyük yazılar, açık Türkçe düğmeler ve tek sütunlu “Soruyu oku → Yaz → Kontrol et” akışıyla hazırlanmıştır. Ana sayfadaki görünür yönergeler öğrencinin ne yazacağını adım adım anlatır. Sayaç ana ekranda çalışmaz; öğrenci “Sınavı Başlat” düğmesine bastığında 15 dakikadan geri saymaya başlar.

## Yayınlama

1. ZIP dosyasını açın.
2. ZIP içindeki tüm dosyaları GitHub deponuzun ana dizinine yükleyin.
3. GitHub deposunda **Settings → Pages** bölümünü açın.
4. Kaynak olarak ana dalı (`main`) ve kök dizini (`/root`) seçin.

Uygulama için npm, veritabanı veya build işlemi gerekmez.

## Özellikler

- Tam 15 özgün A2 Schreiben görevi
- Ayrı karşılama ekranı ve yalnızca “Sınavı Başlat” düğmesiyle çalışan 15 dakikalık sayaç
- `ä ö ü Ä Ö Ü ß` Almanca klavyesi
- Görev maddeleri için yerel içerik analizi ve 10 puanlık çalışma değerlendirmesi
- Yazılan metnin hemen altında kırmızı dalgalı çizgi, numara, doğru kullanım ve Türkçe açıklama
- İnternet olmadan çalışan genişletilmiş A2 dilbilgisi/yazım kuralları ve varsa LanguageTool ile çevrim içi ayrıntılı kontrol
- Göreve cevap, resmîlik, hitap-kapanış, uzunluk ve dilbilgisini birlikte gösteren mektuba uygunluk özeti
- Yerel AYDA Lehrer ve adım adım yazma modu
- “Hangi durumda hangi kalıp?” mantığıyla amaçlarına göre ayrılmış sade kalıp rehberi
- Taslak ve ilerleme kaydı (`localStorage`)
- 320 px genişliğe kadar mobil uyum ve erişilebilir klavye kullanımı

## Güvenli AI endpoint'i

`script.js` dosyasındaki `AI_TEACHER_ENDPOINT` varsayılan olarak boştur. Uygulama bu halde yerel öğretmen kuralları ve LanguageTool ile çalışır. Kurum daha sonra kendi güvenli sunucu endpoint'ini ekleyebilir. Gizli API anahtarları hiçbir zaman frontend dosyalarına yazılmamalıdır.

## Not

Bu uygulama özgün çalışma soruları içerir; resmî telc sınavı veya resmî telc sonucu değildir.

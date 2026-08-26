# AYDA telc A2 Schreiben Trainer

GitHub Pages üzerinde doğrudan çalışan, mobil uyumlu telc A2 Schreiben çalışma ve değerlendirme uygulaması.

Arayüz; bilgisayar kullanımı sınırlı ve ileri yaştaki öğrenciler için büyük yazılar, açık Türkçe düğmeler ve sade “Soruyu oku → Yaz → Kontrol et” akışıyla hazırlanmıştır. Ana sayfadaki üç kısa adım öğrencinin ne yapacağını anlatır. Sayaç ana ekranda çalışmaz; öğrenci “Sınavı Başlat” düğmesine bastığında 15 dakikadan geri saymaya başlar.

## Yayınlama

1. ZIP dosyasını açın.
2. ZIP içindeki tüm dosyaları GitHub deponuzun ana dizinine yükleyin.
3. GitHub deposunda **Settings → Pages** bölümünü açın.
4. Kaynak olarak ana dalı (`main`) ve kök dizini (`/root`) seçin.

Uygulama için npm, veritabanı veya build işlemi gerekmez.

## Özellikler

- Tam 15 özgün A2 Schreiben görevi
- Ana sayfada büyük `Mektup 1–15` seçim düğmeleri
- Görev maddesi aramadan Almanca metin veya mektup düzelten `Serbest Metin / Mektup` seçeneği
- Ayrı karşılama ekranı ve yalnızca “Sınavı Başlat” düğmesiyle çalışan 15 dakikalık sayaç
- `ä ö ü Ä Ö Ü ß` Almanca klavyesi
- Görev maddeleri için yerel içerik analizi ve 10 puanlık çalışma değerlendirmesi
- Yazılan metnin hemen altında kırmızı dalgalı çizgi, numara, doğru kullanım ve Türkçe açıklama
- İnternet olmadan çalışan, 242 yaygın yazım hatası ve bağlama duyarlı A1–A2 dilbilgisi kuralları içeren yerel kontrol motoru
- Fiil çekimi ve konumu, modal/ayrılabilen fiiller, Akkusativ-Dativ, artikel/iyelik, edatlar, Perfekt, `weil/dass`, sorular, hitap ve noktalama denetimi
- Bulguları `Hata`, `İyileştirme` ve `Bilgi` olarak ayıran; yalnızca yüksek güvenli düzeltmeleri otomatik uygulayan öğretici geri bildirim
- Göreve cevap, resmîlik, hitap-kapanış, uzunluk ve dilbilgisini birlikte gösteren mektuba uygunluk özeti
- Tek çerçeveli kısa sonuç özeti ve isteğe bağlı açılan düzeltilmiş metin
- “Hangi durumda hangi kalıp?” mantığıyla amaçlarına göre ayrılmış sade kalıp rehberi
- Taslak ve ilerleme kaydı (`localStorage`)
- 320 px genişliğe kadar mobil uyum ve erişilebilir klavye kullanımı

Uygulama tamamen yerel çalışır; backend, API anahtarı, harici dil servisi veya `fetch` isteği kullanmaz.

## Not

Bu uygulama özgün çalışma soruları içerir; resmî telc sınavı veya resmî telc sonucu değildir. Otomatik kontrol hata yapabilir ve öğretmen değerlendirmesinin yerine geçmez.

const fs = require('fs');
const http = require('http');

const dosyaAdi = 'data.json';
const veri = JSON.parse(fs.readFileSync(dosyaAdi, 'utf-8'));



const ilgiAlanTablolari = {
  'Futbol': {},
  'Resim': {},
  'Edebiyat': {},
  'Sinema': {},
  'Mimarlık': {},
  'Moda': {},
  'GorselSanatlar': {},
  'Tarih': {},
  'Gastronomi': {},
  'Tiyatro': {},
  'Dans': {},
  'Basketbol': {},
  'Tenis': {},
  'Bilim': {},
  'Yoga': {},
  'Robotik': {},
  'Astronomi': {},
  'Fotografi': {},
  'Girişimcilik': {},
  'Psikoloji': {},
  'Müzik Prodüksiyonu': {},
  'Dijital Pazarlama': {},
  'Eko-Turizm': {},
  'Blockchain Teknolojisi': {},
  'Sağlıklı Beslenme': {},
  'Oyun Geliştirme': {}
};


const anahtarKelimeler = {
  'Futbol': [
    'amatör', 'atlet', 'atletizm', 'yenmek', 'mağlup etmek',
    'şampiyon', 'tezahürat','teknik adam','mücadele',
    'yarışmak', 'müsabaka','müsabaka','topçu',
    'saha', 'kupa', 'mağlubiyet', 'savunmak', 'beraberlik',
    'taraftar','skor', 'gol', 'spor', 'stadyum', 'taktik', 'takım', 'turnuva',
     'kupa', 'hakem', 'galibiyet', 'düdük', 'teknik','kupa','premier','sportoto','süperlig'
  ],
  'Resim': [
    'tuval', 'palet', 'perspektif', 'imge', 'türe', 'soyut', 'ekspresyonizm', 'minyatür','resim',
    'kolaj', 'portre', 'manzara', 'ikonografi', 'piksel', 'kompozisyon', 'figüratif','ışık','açı',
    'gravür', 'illüstrasyon', 'renk', 'oran', 'eskiz', 'artnouveau', 'artdeco', 'gerçekçi', 'abstraksiyon'
  ],
  'Edebiyat': [
    'roman', 'şiir', 'hikaye', 'yazarlık', 'karakter', 'anlatıcı', 'kurgu', 'deneme','edebiyat',
    'drama', 'mizah', 'epik', 'lirik', 'satir', 'diyalog', 'kritik', 'biyografi','kitap','okur','yazar',
    'trajedi', 'fantezi', 'distopya', 'nostalji', 'poezi', 'efsane', 'eleştiri', 'analiz', 'hüzün'
  ],
  'Sinema':[
    'senaryo', 'yönetmen', 'kamera', 'kurgu', 'sahne', 'dublaj', 'montaj', 'prodüksiyon','sinema',
    'izleyici', 'afiş', 'film', 'set', 'filmmüziği', 'kısa film', 'belgesel', 'fantastik',
    'bilimkurgu', 'gerilim', 'aksiyon', 'drama', 'animasyon', 'kostüm', 'senarist', 'reji', 'dublaj'
  ],
  'Mimarlık':[
    'plan', 'cephe', 'tasarım', 'proje', 'estetik', 'yapı', 'inşaat', 'modernizm','mimar',
    'uyarlama', 'restorasyon', 'fonksiyon', 'peyzaj', 'bina', 'ekolojiktasarım', 'peyzajmimarlığı',
    'malzeme', 'aydınlatma', 'minimalizm', 'biyofilitre', 'gökdelen', 'yeşilbina', 'tarihiiçmimarlık',
  'şehir', 'ölçek'
  ],
  'Moda':[
    'tasarım', 'trend', 'koleksiyon', 'evrensel', 'tekstil', 'haute couture', 'aksesuar', 'desen',
    'blog', 'stil', 'endüstri', 'dijital', 'blogger', 'etkinlik', 'hafta', 'marka','tarz','kıyafet',
    'dergi', 'defile', 'vintage', 'fotoğrafçılık', 'redaksiyon', 'kumaş','moda'
  ],
  'Gorsel Sanatlar':[
    'sanat','eser', 'sergi', 'galeri', 'sanatkoleksiyonu', 'boya', 'sanateleştirisi', 'sanateğitimi', 'sanatmüzesi',
    'ressam', 'sanatfuarı', 'sanatterapisi', 'tuval', 'renk', 'el', 'akım', 'ikonografi',
    'origami', 'fotoğraf', 'jüri', 'oturum', 'fırça', 'tablo', 'sanatetkinlikleri', 'sanatdünyası', 'sanatendüstrisi'
  ],
  'Tarih':[
    'geçmiş', 'arkeoloji', 'kültür', 'devir', 'yenilik', 'antik', 'eski', 'tarihi', 'yüzyıl', 'olay',
    'medeniyet', 'kronoloji', 'modern', 'çağ', 'devrim', 'eser', 'tasarım', 'arşiv', 'belge', 'arkeolog',
    'restorasyon', 'tarihçi', 'mitoloji', 'diplomasi','Atatürk'
  ],
  'Gastronomi':[
    'lezzet', 'mutfak', 'şef', 'menü', 'gurme', 'lokanta', 'tarif', 'sunum',
    'gastronomiturizmi', 'slowfood', 'fusion', 'meyhane', 'malzeme', 'tadım', 'sos',
    'pişirmeteknikleri', 'organik', 'dünyamutfakları', 'moleküler', 'tarım', 'restoran', 'tat',
    'aroma', 'baharat'
  ],
  'Tiyatro':[
    'sahne', 'rol', 'drama', 'monolog', 'kostüm', 'dekor', 'oyunculuk','kostüm',
  'maske', 'reji', 'repertuar', 'kabare', 'trajedi', 'komedi', 'drama','seyirci',
  'vodvil', 'absürd', 'gösteri', 'broadway', 'kulis', 'dublaj', 'tiyatro', 'analiz', 'hüzün'
  ],
  'Dans':[
    'koreografi', 'ritim', 'bale','jig',
    'balerin', 'breakdance', 'tango', 'salsa', 'dans', 'terim', 'stüdyo', 'kostüm',
    'performans', 'çift', 'swing', 'step', 'festival', 'drama', 'yarışma','dansçı','dansöz','salsa','flamenco'
  ],
  'Basketbol':[
    'pota', 'top', 'basket', 'basketbolcu', 'çember', 'savunma', 'hücum', 'faul',
    'serbestatış', 'turnike', 'şut', 'rebound', 'pas', 'blok', 'şutör',
    'pivot', 'fastbreak', 'tripledouble', 'takımoyunu', 'mvp', 'euroleague', 'nba',
    'crossover', 'slamdunk', 'antrenman','step'
  ],
  'Tenis':[
    'rakip', 'servis', 'set', 'maç', 'toprakkort', 'çimkort', 'smaç', 'forehand',
    'backhand', 'açılışmaçı', 'tiebreak', 'grandslam', 'oyunavantajı', 'tenisçi', 'topkaybı',
    'ace', 'çiftler', 'tekler', 'topvuruşu', 'teniskortu', 'topseçimi', 'file', 'şampiyonluk',
    'topspin', 'maçpuanı','tenis'
  ],
  'Bilim':[
    'bilim', 'keşif', 'araştırma', 'teori', 'deney', 'veri', 'analiz', 'sonuç',
    'teknoloji', 'innovasyon', 'evrim', 'genetik', 'hücre', 'atom', 'element', 'fizik', 'kimya',
    'biyoloji', 'matematik', 'robotik', 'mikroskop', 'teleskop','nasa','cern','biyolog','fizikçi'
  ],
  'Yoga': [
    'vinyasa', 'asanalar', 'pranayama', 'meditasyon', 'om', 'mantra', 'lotus', 'yogi', 'çakra', 'ashtanga',
    'hatha', 'iyengar', 'namaste', 'ayurveda', 'nirvana', 'samadhi', 'karma', 'surya', 'natarajasana', 'sankalpa',
    'ujiayi', 'drishti', 'ananda', 'bhakti'
  ],
  'Robotik': [
    'sensör', 'algoritma', 'entegrasyon', 'mekanik', 'otonom', 'platform', 'kinematik', 'simülasyon', 'ROS', 'drone',
    'endüstriyel', 'seri', 'görüş', 'havacılık', 'biyomekanik', 'lokomosyon', 'teknoloji', 'insansız', 'kontrol', 'exoskeleton',
    'maniülatör', 'mobiliti', 'navigate', 'robust', 'telemetri','robot','yapay zeka','kodlama','kod'
  ],
  'Astronomi': [
    'teleskop', 'galaksi', 'gökbilim', 'meteor', 'ay', 'güneş', 'merkür', 'jüpiter', 'mars', 'venüs',
    'kütleçekim', 'yıldız', 'gezegen', 'meteoroid', 'nebula', 'uzaklık', 'teleskopi', 'küresel', 'ekvatör', 'kuyruklu',
    'galaktik', 'kara delik', 'ufuk', 'aydönümü', 'teknik','süper nova','uzay istasyonu','kara delik','plüton','ışık hızı','evren','nasa'
  ],
  'Fotografi': [
    'diyafram', 'poz', 'enstantane', 'makro', 'pozlama', 'ISO', 'odak', 'fotojenik', 'kompozisyon', 'piksel',
    'fotoğrafçılık', 'çerçeve', 'manzara', 'portre', 'görüntüleme', 'poz verme', 'stüdyo', 'belgesel', 'siyah beyaz', 'fotoğrafçı',
    'geceçekimi', 'renkdoğruluğu', 'fotoğraf makinesi', 'ışıkölçer', 'vizör','fotoğraf'
  ],
  'Girişimcilik': [
    'startup', 'mentor', 'pazarlama', 'inovasyon', 'yatırımcı', 'finansman', 'strateji', 'öz kaynak', 'girişimci', 'şirket kurma',
    'müşterianalizi', 'rekabet', 'girişimcilik', 'işfikri', 'kar', 'yatırımcı', 'pazar araştırması', 'girişimcilik', 'girişimcilik ruhu',
    'yatırımlar', 'girişimcidehası', 'kârlılık', 'iş stratejisi', 'pazarlama stratejisi','girişimci'
  ],
  'Psikoloji': [
    'bilişsel', 'duygu', 'terapi', 'psikanaliz', 'zihinsel', 'psikiyatrist', 'duygusal', 'kimlik', 'anksiyete', 'depresyon',
    'hipnoz', 'psikotik', 'nevroz', 'bipolar', 'toplumsal', 'gelişim', 'kişilik', 'narsisizm', 'şiddet', 'obsesif',
    'ruhsal', 'kognitif', 'psikopatoloji', 'psikosomatik', 'psikoterapi'
  ],
  'Müzik Prodüksiyonu': [
    'mikrofon', 'stüdyo', 'daw', 'mixing', 'mastering', 'midi', 'ses mühendisliği', 'beat', 'prodüksiyon', 'arrangement',
    'sounddesign', 'sampling', 'sentez', 'equalization', 'compression', 'reverb', 'tempo', 'akor', 'melodi', 'akustik',
    'remiks', 'soundtrack', 'frekans', 'elektrofonik', 'seskesme'
  ],
  'Dijital Pazarlama': [
    'sosyal medya', 'SEO', 'analitik', 'içerik pazarlama', 'email pazarlama', 'dijital reklam', 'dönüşüm', 'CTR', 'ROI', 'SEM',
    'SERP', 'anahtarkelimeler', 'influencer', 'etkileşim', 'müşteribulma', 'çağrıalma', 'kampanya', 'demografi', 'remarketing', 'viral',
    'sosyal kanıt', 'hedef kitle', 'markalaşma', 'mobil turizm', 'afili pazarlama'
  ],
  'Eko-Turizm': [
    'biyoçeşitlilik', 'ekosistem', 'doğal kaynaklar', 'sürdürülebilir', 'ekoturizm', 'biyofilitre', 'yabani hayat', 'orman', 'doğa yürüyüşü', 'çevresel',
    'turizm', 'doğa', 'ekoloji', 'sürdürülebilir', 'çevre duyarlılığı', 'eko konaklama', 'korunan alan', 'doğa adamları', 'kamp', 'kırsal',
     'yerel'
  ],
  'Blockchain Teknolojisi': [
    'kripto para', 'akıllı kontratlar', 'merkezi banli', 'konsensus', 'madencilik', 'ICO', 'blockchain', 'token', 'dağıtımlı defter', 'dApps',
    'genel defter', 'özel defter', 'hash fonksiyonu', 'çatallanma', 'hash hızı', 'iş kanıtı', 'hisseye dönüşümü', 'yumuşak çatallanma', 'izinsiz blockchain',
    'izin yönetimli blockchain', 'cüzdan', 'uzak uzay', 'blok boyutu','kripto'
  ],
  'Sağlıklı Beslenme': [
    'organik', 'glutensiz', 'superfood', 'protein', 'vitamin', 'mineral', 'antioksidan', 'besin', 'fiber', 'vejetaryen',
    'vegan', 'bütünbesinler', 'dengelibeslenme', 'hidrasyon', 'metabolizma', 'kalori', 'porsiyon kontrolü', 'besinsel değer', 'diyet', 'az yağlı protein',
    'sağlıklı tarifler', 'yemek planlama', 'besin piramidi', 'besinsel dansite', 'fitoterapi'
  ],
  'Oyun Geliştirme': [
    'oyun tasarımı', 'oyun geliştirme', 'programlama', 'oyun geliştirici', 'oyun geliştirme', 'bağımsızoyunlar', 'oyuntesti', 'oyuncutopluluğu',
    'sanalgerçeklik', 'arttırılmış gerçeklik', 'oyunmotoru', 'oyunpazarlama', 'oyunsanayi', 'mobil oyun', 'oyunyayıncılığı', 'oyuntrendleri', 'eSports',
    'oyun geliştirme araçları', 'oyuncu geri bildirimleri', 'gamer', 'platform'
  ]

};

// ...


const regionIlgiAlanlari = {};

//kullanıcılar için nesne oluştur
class Kullanici {
  constructor(username, region, tweets) {
    this.username = username;
    this.region = region;
    this.tweets = tweets;
    this.ilgiAlanlari = {};
  }

  // Kullanıcının ilgi alanlarını kontrol et ve güncelle
  ilgiAlanlariniGuncelle() {
    const lowercaseTweets = this.tweets.join(' ').toLowerCase();

    for (const ilgiAlani in anahtarKelimeler) {
      const ilgiAlanSayac = anahtarKelimeler[ilgiAlani].reduce((sayac, kelime) => {
        if (lowercaseTweets.includes(kelime)) {
          sayac++;
        }
        return sayac;
      }, 0);

      if (ilgiAlanSayac >= 5) {
        // Kullanıcının ilgi alanları nesnesini güncelle
        this.ilgiAlanlari[ilgiAlani] = true;

        // Region bazlı ilgi alanları için
        if (!regionIlgiAlanlari[this.region]) {
          regionIlgiAlanlari[this.region] = {};
        }
        if (!regionIlgiAlanlari[this.region][ilgiAlani]) {
          regionIlgiAlanlari[this.region][ilgiAlani] = [];
        }
        regionIlgiAlanlari[this.region][ilgiAlani].push(this.username);
      }
    }
  }
}

// Kullanıcı nesnelerini oluştur ve ilgi alanlarını güncelle
const kullanicilar = veri.map(user => new Kullanici(user.username, user.region, user.tweets));
kullanicilar.forEach(user => user.ilgiAlanlariniGuncelle());


// Kullanıcı bazlı ilgi alanlarını yazdır
const ilgiAlanlariJSON = [];

for (const ilgiAlani in ilgiAlanTablolari) {
  const ilgiAlaninaGirenKullanicilar = kullanicilar
    .filter(user => user.ilgiAlanlari[ilgiAlani])
    .map(user => user.username);

  if (ilgiAlaninaGirenKullanicilar.length > 0) {
    ilgiAlanlariJSON.push({
      alan: ilgiAlani,
      kullanici: ilgiAlaninaGirenKullanicilar,
    });
  }
}

// JSON verilerini dosyaya yaz
fs.writeFileSync('ilgialani.json', JSON.stringify(ilgiAlanlariJSON, null, 2));

console.log('ilgialanlari.json dosyası oluşturuldu.');

// Region bazlı ilgi alanlarını ve en çok kullanılan ilgi alanını yazdır
// ...

// JSON verilerini dosyaya yaz
const bolgelerJSON = [];

for (const region in regionIlgiAlanlari) {
  let enCokKullanilanIlgiAlani = '';
  let maxKullaniciSayisi = 0;

  const bölgeJSON = {
    "ad": region,
    "trend_ilgi_alani": enCokKullanilanIlgiAlani,
    "ilgi_alanlari": []
  };

  for (const ilgiAlani in regionIlgiAlanlari[region]) {
    const ilgiAlaninaGirenKullanicilar = regionIlgiAlanlari[region][ilgiAlani];

    // En çok kullanılan ilgi alanını güncelle
    if (ilgiAlaninaGirenKullanicilar.length > maxKullaniciSayisi) {
      maxKullaniciSayisi = ilgiAlaninaGirenKullanicilar.length;
      enCokKullanilanIlgiAlani = ilgiAlani;
      bölgeJSON.trend_ilgi_alani = enCokKullanilanIlgiAlani;
    }

    // JSON verilerini oluştur
    const ilgiAlaniJSON = {
      "alan_adi": ilgiAlani,
      "kullanicilar": kullanicilar
        .filter(user => user.ilgiAlanlari[ilgiAlani] && user.region === region)
        .map(user => user.username)
    };

    bölgeJSON.ilgi_alanlari.push(ilgiAlaniJSON);
  }

  bolgelerJSON.push(bölgeJSON);
}

fs.writeFileSync('bolgeler.json', JSON.stringify({ "bolgeler": bolgelerJSON }, null, 2));

console.log('bolgeler.json dosyası oluşturuldu.');


// Yazma işlemi ekle
const yazmaDosyasi = 'kullanicilar_ilgi_alanlari.txt';
const dosyaIcerigi = kullanicilar.map(user => `Adı: "${user.username}" / İlgi Alanı: "${JSON.stringify(user.ilgiAlanlari)}"`).join('\n');

fs.writeFileSync(yazmaDosyasi, dosyaIcerigi);

console.log(`${yazmaDosyasi} dosyası oluşturuldu.`);

const dillerJsonDosyaAdi = 'diller.json';
const dilVerileri = {};

// Veriyi oku ve dil bazlı kullanıcıları dillerJsonDosyaAdi'na kaydet
veri.forEach((kullanici) => {
  const dil = kullanici.language;

  if (!dilVerileri[dil]) {
    dilVerileri[dil] = { language: dil, users: [] };
  }

  dilVerileri[dil].users.push({
    username: kullanici.username,
    name: kullanici.name,
  
  });
});

// JSON verilerini dosyaya yaz
const dilJson = Object.values(dilVerileri);
fs.writeFileSync(dillerJsonDosyaAdi, JSON.stringify(dilJson, null, 2));

console.log(`${dillerJsonDosyaAdi} dosyası oluşturuldu.`);

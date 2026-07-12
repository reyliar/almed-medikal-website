/* ============================================================
   ALMED MEDIKAL - i18n Language System (TR / EN)
   ============================================================ */

const I18N = (function() {
    'use strict';

    const STORAGE_KEY = 'almed_lang';
    const DEFAULT_LANG = 'tr';
    const SUPPORTED = ['tr', 'en'];

    // ==================== TRANSLATION DICTIONARY ====================
    const dict = {};

    // --- Shared / Global ---
    dict['nav.home']           = { tr: 'Anasayfa', en: 'Home' };
    dict['nav.corporate']      = { tr: 'Kurumsal', en: 'Corporate' };
    dict['nav.products']       = { tr: 'Ürünler', en: 'Products' };
    dict['nav.contact']        = { tr: 'İletişim', en: 'Contact' };
    dict['top.phone']          = { tr: '(0312) 311 50 14', en: '(0312) 311 50 14' };
    dict['top.email']          = { tr: 'iletisim@almedmedikal.com.tr', en: 'iletisim@almedmedikal.com.tr' };
    dict['footer.company']     = { tr: 'Almed Kozmetik İlaç ve Tıbbi Malzeme İnşaat Makina İç ve Dış Ticaret Ltd Şti', en: 'Almed Cosmetics Pharma and Medical Supplies Construction Machinery Domestic and Foreign Trade Ltd Co' };
    dict['footer.quick']       = { tr: 'HIZLI ERİŞİM', en: 'QUICK LINKS' };
    dict['footer.home']        = { tr: 'Anasayfa', en: 'Home' };
    dict['footer.corporate']   = { tr: 'Kurumsal', en: 'Corporate' };
    dict['footer.catalog']     = { tr: 'Ürün Kataloğu', en: 'Product Catalog' };
    dict['footer.about']       = { tr: 'Hakkımızda', en: 'About Us' };
    dict['footer.contact']     = { tr: 'İletişim', en: 'Contact' };
    dict['footer.copyright']   = { tr: '© 2026 Almed Medikal. Tüm hakları saklıdır.', en: '© 2026 Almed Medikal. All rights reserved.' };
    dict['footer.address']     = { tr: 'Mebusevleri Mah. Turgut Reis Caddesi No:6/4 Çankaya / Ankara', en: 'Mebusevleri Mah. Turgut Reis Caddesi No:6/4 Çankaya / Ankara, Turkey' };
    dict['footer.fax']         = { tr: '(0312) 311 50 13', en: '(0312) 311 50 13' };
    dict['menu.aria']          = { tr: 'Menü', en: 'Menu' };

    // --- index.html ---
    dict['index.hero.discover']      = { tr: 'Ürünlerimizi Keşfedin', en: 'Discover Our Products' };
    dict['index.hero.contact']       = { tr: 'Bize Ulaşın', en: 'Contact Us' };
    dict['index.scroll']             = { tr: 'Aşağı Kaydır', en: 'Scroll Down' };
    dict['index.welcome.title']      = { tr: 'Web sitemize <span class="highlight">Hoşgeldiniz</span>', en: 'Welcome to <span class="highlight">Our Website</span>' };
    dict['index.welcome.heading']    = { tr: 'Almed Medikal', en: 'Almed Medikal' };
    dict['index.welcome.p1']         = { tr: 'Sağlık ve ilaç sektöründe ilk olarak AR-GE Çalışmaları adı altında hizmet vermiştir. Devletin Sağlık sektöründe almış olduğu kararlar doğrultusunda ve gelişen şartlar altında şirketimiz sağlık ve ilaç sektörü araştırmalarında yüksek kalitede verimlilik, düşük maliyet prensibinden hareketle günümüz şartlarında en son teknolojik sistemde Ankara\'da Çankaya ilçesinde bugüne kadar hizmet vermeye devam etmiştir.', en: 'Initially serving under the name R&D Studies in the health and pharmaceutical sector, our company has continued to provide services to this day in the Çankaya district of Ankara, utilizing the latest technological systems under today\'s conditions, based on the principle of high-quality efficiency and low cost in health and pharmaceutical sector research, in line with government decisions.' };
    dict['index.welcome.p2']         = { tr: 'Son yıllarda devletin sağlık ve İlaç sektöründe yaptığı destekler neticesinde sektörün çok büyük ve çok yönlü olmasından dolayı sadece <strong>KBRN</strong> konusunda AR-GE çalışmalarına devam etme kararı almıştır.', en: 'In recent years, as a result of government support in the health and pharmaceutical sector, and due to the vast and multifaceted nature of the sector, the company has decided to continue its R&D activities focusing solely on <strong>CBRN</strong>.' };
    dict['index.welcome.stat1']      = { tr: 'Kuruluş', en: 'Established' };
    dict['index.welcome.stat2']      = { tr: 'Yıl Deneyim', en: 'Years Experience' };
    dict['index.welcome.stat3']      = { tr: 'Merkez', en: 'Headquarters' };
    dict['index.news.title']         = { tr: '<span class="highlight">Bizden</span> Haberler', en: 'News <span class="highlight">from Us</span>' };
    dict['index.news.heading']       = { tr: 'Yeni Web Sitemiz Yayında!', en: 'Our New Website is Live!' };
    dict['index.news.body']          = { tr: 'Almed Medikal olarak, yenilenen web sitemizle artık dijital dünyada da güçlü bir şekilde varız. Tüm ürün kataloğumuzu, teknik detayları ve güncel gelişmeleri bu platform üzerinden takip edebilirsiniz. Daha hızlı, daha kapsamlı ve daha modern bir deneyim sunmaktan mutluluk duyuyoruz.', en: 'As Almed Medikal, we now have a strong presence in the digital world with our renewed website. You can follow our entire product catalog, technical details, and latest developments on this platform. We are happy to offer a faster, more comprehensive, and more modern experience.' };
    dict['index.news.tag']           = { tr: 'Duyuru', en: 'Announcement' };
    dict['index.news.month']         = { tr: 'Tem', en: 'Jul' };
    dict['index.why.title']          = { tr: 'Neden <span class="highlight">Almed Medikal?</span>', en: 'Why <span class="highlight">Almed Medikal?</span>' };
    dict['index.why.subtitle']       = { tr: '2005\'ten beri Ankara\'da, AR-GE odaklı üretim anlayışıyla medikal sektöründe güvenin adresi.', en: 'Since 2005 in Ankara, the trusted name in the medical sector with an R&D-focused production approach.' };
    dict['index.why.f1.title']       = { tr: 'AR-GE Odaklı Üretim', en: 'R&D Focused Production' };
    dict['index.why.f1.desc']        = { tr: 'Her ürünümüz, kendi laboratuvarlarımızda geliştirilir ve uluslararası standartlarda test edilir. Yenilikçi formülasyonlarımızla sektöre yön veriyoruz.', en: 'Every product is developed in our own laboratories and tested to international standards. We lead the sector with our innovative formulations.' };
    dict['index.why.f2.title']       = { tr: 'NATO Standartları', en: 'NATO Standards' };
    dict['index.why.f2.desc']        = { tr: 'KBRN ekipmanlarımız NATO stok numaralarına sahiptir. Askeri ve sivil savunma alanında güvenle tercih edilen çözümler sunuyoruz.', en: 'Our CBRN equipment has NATO stock numbers. We offer solutions trusted in military and civil defense.' };
    dict['index.why.f3.title']       = { tr: 'Yerli ve Milli Üretim', en: 'Domestic & National Production' };
    dict['index.why.f3.desc']        = { tr: 'Ankara\'da, tamamen yerli imkanlarla üretim yapıyor; dışa bağımlılığı azaltan stratejik çözümler geliştiriyoruz.', en: 'We produce entirely with domestic resources in Ankara, developing strategic solutions that reduce foreign dependency.' };
    dict['index.why.f4.title']       = { tr: '7/24 Teknik Destek', en: '24/7 Technical Support' };
    dict['index.why.f4.desc']        = { tr: 'Uzman kadromuzla satış öncesi ve sonrası tam destek sağlıyor, acil durumlarda hızlı çözüm üretiyoruz.', en: 'With our expert team, we provide full pre- and post-sales support, delivering fast solutions in emergencies.' };
    dict['index.what.title']         = { tr: 'Neler <span class="highlight">Yapıyoruz?</span>', en: 'What <span class="highlight">We Do</span>' };
    dict['index.cat1.title']         = { tr: 'KBRN Savunma Ekipmanları', en: 'CBRN Defense Equipment' };
    dict['index.cat1.desc']          = { tr: 'KBRN Numune Alma Kiti, KBRN NBC Ekipmanları, dekontaminasyon sistemleri, kimyasal ve biyolojik tespit cihazları. NATO standartlarında, sahada test edilmiş ürünler.', en: 'CBRN Sampling Kit, CBRN NBC Equipment, decontamination systems, chemical and biological detection devices. NATO-standard, field-tested products.' };
    dict['index.cat1.li1']           = { tr: '<strong>KBRN Numune Alma Kiti:</strong> Hava, su, toprak ve yüzeylerden biyolojik ve kimyasal numune alma. NATO stok numaralı.', en: '<strong>CBRN Sampling Kit:</strong> Biological and chemical sampling from air, water, soil, and surfaces. NATO stock numbered.' };
    dict['index.cat1.li2']           = { tr: '<strong>GDA-P Kişisel Dedektör:</strong> IMS + PID/ECD teknolojisi, CWA ve TIC tespiti, IP65 koruma.', en: '<strong>GDA-P Personal Detector:</strong> IMS + PID/ECD technology, CWA and TIC detection, IP65 protection.' };
    dict['index.cat1.li3']           = { tr: '<strong>KBRN İlk Yardım Çantası:</strong> Fullers Earth bazlı, 6 bileşenli dekontaminasyon kiti.', en: '<strong>CBRN First Aid Kit:</strong> Fullers Earth-based, 6-component decontamination kit.' };
    dict['index.cat1.li4']           = { tr: '<strong>Dekontaminasyon Tozu:</strong> Yüksek kimyasal emilim kapasiteli NBC temizlik maddesi.', en: '<strong>Decontamination Powder:</strong> NBC cleaning agent with high chemical absorption capacity.' };
    dict['index.cat2.title']         = { tr: 'İlk Yardım ve Acil Müdahale', en: 'First Aid & Emergency Response' };
    dict['index.cat2.desc']          = { tr: 'Bireysel ilk yardım kitleri (IFAK), KBRN ilk yardım çantaları, yanık tedavi malzemeleri, turnike sistemleri. Askeri ve sivil kullanıma uygun.', en: 'Individual first aid kits (IFAK), CBRN first aid kits, burn treatment supplies, tourniquet systems. Suitable for military and civilian use.' };
    dict['index.cat2.li1']           = { tr: '<strong>VANGUARD IFAK:</strong> 19 parçalı bireysel ilk yardım kiti. Turnike, NPA, hemostatik pansuman içerir.', en: '<strong>VANGUARD IFAK:</strong> 19-piece individual first aid kit. Includes tourniquet, NPA, hemostatic dressing.' };
    dict['index.cat2.li2']           = { tr: '<strong>Otomatik Turnike:</strong> Acil durumlarda hızlı ve güvenilir kanama kontrolü sağlar.', en: '<strong>Automatic Tourniquet:</strong> Provides fast and reliable bleeding control in emergencies.' };
    dict['index.cat2.li3']           = { tr: '<strong>Yanık Tedavi Malzemeleri:</strong> Özel formüllü yanık pansuman setleri ve acil müdahale ekipmanları.', en: '<strong>Burn Treatment Supplies:</strong> Specially formulated burn dressing sets and emergency response equipment.' };
    dict['index.cat3.title']         = { tr: 'İlaç Hammaddeleri ve Üretim', en: 'Pharmaceutical Raw Materials & Production' };
    dict['index.cat3.desc']          = { tr: 'İlaç hammaddeleri, sentez çalışmaları, gaz kompres sistemleri, hemostatik ürünler, farmasötik test cihazları ve laboratuvar ekipmanları.', en: 'Pharmaceutical raw materials, synthesis studies, gas compress systems, hemostatic products, pharmaceutical testing devices, and laboratory equipment.' };
    dict['index.cat3.li1']           = { tr: '<strong>ERWEKA AR 403:</strong> Modüler farmasötik test cihazı. Dissolution tester özelliği ile Ar-Ge ve kalite kontrol.', en: '<strong>ERWEKA AR 403:</strong> Modular pharmaceutical testing device. R&D and quality control with dissolution tester feature.' };
    dict['index.cat3.li2']           = { tr: '<strong>MEDMAK Makine:</strong> LXZ-50/75/100 serisi swab katlama ve paketleme sistemi.', en: '<strong>MEDMAK Machine:</strong> LXZ-50/75/100 series swab folding and packaging system.' };
    dict['index.cat3.li3']           = { tr: '<strong>Hemostatik Gaz Kompres:</strong> Antiseptik ve hemostatik özellikli medikal gaz kompres sistemi.', en: '<strong>Hemostatic Gas Compress:</strong> Medical gas compress system with antiseptic and hemostatic properties.' };
    dict['index.cat4.title']         = { tr: 'Ar-Ge ve İleri Teknoloji Projeleri', en: 'R&D & Advanced Technology Projects' };
    dict['index.cat4.desc']          = { tr: 'Kan durdurucu ilaç formülasyonları, LED ameliyathane lambası, otomatik turnike, radyasyon koruma ürünleri ve mobil KBRN laboratuvarı projeleri.', en: 'Hemostatic drug formulations, LED operating room lamp, automatic tourniquet, radiation protection products, and mobile CBRN laboratory projects.' };
    dict['index.cat4.li1']           = { tr: '<strong>Kan Durdurucu İlaçlar:</strong> Yenilikçi hemostatik formülasyonlar, hızlı pıhtılaşma etkili.', en: '<strong>Hemostatic Drugs:</strong> Innovative hemostatic formulations with rapid clotting effect.' };
    dict['index.cat4.li2']           = { tr: '<strong>Radyasyon Koruma:</strong> Kimyasal bileşik bazlı radyasyon izolasyonu ve koruyucu ekipmanlar.', en: '<strong>Radiation Protection:</strong> Chemical compound-based radiation isolation and protective equipment.' };
    dict['index.cat4.li3']           = { tr: '<strong>Mobil KBRN Laboratuvarı:</strong> Tam donanımlı, sahada biyo-kim-rad tespit ve analiz.', en: '<strong>Mobile CBRN Laboratory:</strong> Fully equipped, on-site bio-chem-rad detection and analysis.' };
    dict['index.areas.title']        = { tr: 'Hangi <span class="highlight">Alanlarda</span> Çalışıyoruz?', en: 'Which <span class="highlight">Fields</span> Do We Work In?' };
    dict['index.areas.a1']           = { tr: 'İlaç Hammaddeleri', en: 'Pharmaceutical Raw Materials' };
    dict['index.areas.a1d']          = { tr: 'Aktif farmasötik içeriklerin (API) sentezi, saflaştırılması ve analizi. GMP standartlarında üretim prosesleri geliştirme. Özel formülasyon çalışmaları ve ölçek büyütme hizmetleri.', en: 'Synthesis, purification, and analysis of active pharmaceutical ingredients (API). Development of production processes at GMP standards. Custom formulation studies and scale-up services.' };
    dict['index.areas.a2']           = { tr: 'İlaç Üretim Sistem ve Ekipmanları', en: 'Pharma Production Systems & Equipment' };
    dict['index.areas.a2d']          = { tr: 'Tablet basım, kaplama, şişeleme ve paketleme hatları. ERWEKA farmasötik test cihazları, MEDMAK swab paketleme sistemleri ve tam otomatik üretim çözümleri.', en: 'Tablet pressing, coating, bottling, and packaging lines. ERWEKA pharmaceutical testing devices, MEDMAK swab packaging systems, and fully automated production solutions.' };
    dict['index.areas.a3']           = { tr: 'Gaz Kompres Sistemi ve Ekipmanları', en: 'Gas Compress System & Equipment' };
    dict['index.areas.a3d']          = { tr: 'Hemostatik antiseptik gaz kompres sistemleri. Medikal gaz karışımları ve dağıtım ekipmanları. Sterilizasyon ve dezenfeksiyon çözümleri.', en: 'Hemostatic antiseptic gas compress systems. Medical gas mixtures and distribution equipment. Sterilization and disinfection solutions.' };
    dict['index.areas.a4']           = { tr: 'Laboratuvar Sistem ve Ekipmanları', en: 'Laboratory Systems & Equipment' };
    dict['index.areas.a4d']          = { tr: 'Ar-Ge laboratuvarları için tam donanımlı sistemler. Analitik cihazlar, test ekipmanları, sarf malzemeleri ve laboratuvar kurulum danışmanlığı.', en: 'Fully equipped systems for R&D laboratories. Analytical instruments, test equipment, consumables, and laboratory setup consulting.' };
    dict['index.areas.a5']           = { tr: 'Yanık Tedavi Tıbbi Ekipmanları', en: 'Burn Treatment Medical Equipment' };
    dict['index.areas.a5d']          = { tr: 'Özel formüllü yanık pansuman setleri. Hidrojel bazlı yara örtüleri, acil müdahale kitleri ve yanık tedavisine yönelik yenilikçi medikal ürünler.', en: 'Specially formulated burn dressing sets. Hydrogel-based wound dressings, emergency response kits, and innovative medical products for burn treatment.' };
    dict['index.areas.b1']           = { tr: 'KBRN Mobil Laboratuvar', en: 'CBRN Mobile Laboratory' };
    dict['index.areas.b1d']          = { tr: 'Tam donanımlı, sahada biyolojik, kimyasal ve radyolojik tespit ve analiz yapabilen mobil platform. NATO standartlarında konfigürasyon seçenekleri.', en: 'Fully equipped mobile platform capable of on-site biological, chemical, and radiological detection and analysis. NATO-standard configuration options.' };
    dict['index.areas.b2']           = { tr: 'Radyasyon Koruma İzolasyonu', en: 'Radiation Protection Isolation' };
    dict['index.areas.b2d']          = { tr: 'Yenilikçi kimyasal bileşik bazlı radyasyon kalkanı. Yüksek emilim kapasitesi, hafif ve dayanıklı yapı. Askeri ve sivil kullanım için optimize edilmiştir.', en: 'Innovative chemical compound-based radiation shield. High absorption capacity, lightweight and durable structure. Optimized for military and civilian use.' };
    dict['index.areas.b3']           = { tr: 'Radyasyon Koruma Ürünleri', en: 'Radiation Protection Products' };
    dict['index.areas.b3d']          = { tr: 'Kişisel radyasyon koruyucu ekipmanlar, kurşun önlükler, tiroid koruyucular, gonadal kalkanlar ve radyasyon bariyerleri. Tıbbi ve endüstriyel kullanım için.', en: 'Personal radiation protective equipment, lead aprons, thyroid protectors, gonadal shields, and radiation barriers. For medical and industrial use.' };
    dict['index.areas.b4']           = { tr: 'Otomatik Turnike', en: 'Automatic Tourniquet' };
    dict['index.areas.b4d']          = { tr: 'Acil durumlarda hızlı ve güvenilir kanama kontrolü sağlayan pnömatik turnike sistemleri. Tek elle kullanım, ayarlanabilir basınç ve güvenlik mekanizmaları.', en: 'Pneumatic tourniquet systems providing fast and reliable bleeding control in emergencies. One-hand operation, adjustable pressure, and safety mechanisms.' };
    dict['index.areas.b5']           = { tr: 'Led Ameliyathane Lambası', en: 'LED Operating Room Lamp' };
    dict['index.areas.b5d']          = { tr: 'Yüksek parlaklık, düşük enerji tüketimi ve uzun ömürlü LED teknolojisi. Gölgesiz aydınlatma, ayarlanabilir renk sıcaklığı ve steril kullanım özellikleri.', en: 'High brightness, low energy consumption, and long-lasting LED technology. Shadowless illumination, adjustable color temperature, and sterile use features.' };
    dict['index.areas.products.btn'] = { tr: 'Ürünlerimiz', en: 'Our Products' };
    dict['index.prod.title']         = { tr: 'Üretim & <span class="highlight">Sentez</span>', en: 'Production & <span class="highlight">Synthesis</span>' };
    dict['index.prod.subtitle']      = { tr: 'En son teknolojik sistemlerle donatılmış laboratuvarlarımızda, yüksek kalite standartlarında ilaç hammaddeleri sentezi ve üretimi.', en: 'Synthesis and production of pharmaceutical raw materials at high quality standards in our laboratories equipped with the latest technological systems.' };
    dict['index.prod.tag1']          = { tr: 'İlaç • Üretim', en: 'Pharma • Production' };
    dict['index.prod.tag2']          = { tr: 'İlaç • Hammaddeler', en: 'Pharma • Raw Materials' };
    dict['index.prod.h1']            = { tr: 'Üretim', en: 'Production' };
    dict['index.prod.h2']            = { tr: 'Sentez', en: 'Synthesis' };
    dict['index.prod.p1']            = { tr: 'En son teknolojik sistemlerle donatılmış laboratuvarlarımızda, yüksek kalite standartlarında ilaç hammaddeleri üretimi gerçekleştirilmektedir.', en: 'Production of pharmaceutical raw materials is carried out at high quality standards in our laboratories equipped with the latest technological systems.' };
    dict['index.prod.p2']            = { tr: 'İlaç hammaddeleri sentez çalışmaları ve üretim süreçleri. Yüksek saflıkta ve uluslararası standartlara uygun farmasötik bileşiklerin sentezi gerçekleştirilmektedir.', en: 'Pharmaceutical raw material synthesis studies and production processes. Synthesis of high-purity pharmaceutical compounds in compliance with international standards.' };
    dict['index.prod.link']          = { tr: 'Detaylı Bilgi', en: 'Learn More' };

    // --- urunler.html ---
    dict['products.hero.title']      = { tr: 'Ürün <span class="highlight">Kataloğumuz</span>', en: 'Our Product <span class="highlight">Catalog</span>' };
    dict['products.sidebar.title']   = { tr: 'Kategoriler', en: 'Categories' };
    dict['products.filter.all']      = { tr: 'Tüm Ürünler', en: 'All Products' };
    dict['products.filter.kbrn']     = { tr: 'KBRN', en: 'CBRN' };
    dict['products.filter.ilkyardim']= { tr: 'İlk Yardım', en: 'First Aid' };
    dict['products.filter.arge']     = { tr: 'Ar-Ge', en: 'R&D' };
    dict['products.card1.title']     = { tr: 'Biyolojik ve Kimyasal Numune Alma Kiti', en: 'Biological & Chemical Sampling Kit' };
    dict['products.card1.desc']      = { tr: 'Biyolojik ve kimyasal harp maddesi tehdidi bulunan alanlarda hava, su, toprak, yüzey, materyal ve canlı/çevresel kaynaklardan numune almak ve güvenli taşıma zincirini kurmak için hazırlanmış taşınabilir hardcase kit.', en: 'Portable hardcase kit designed for sampling from air, water, soil, surface, material, and living/environmental sources in areas threatened by biological and chemical warfare agents, and establishing a secure transport chain.' };
    dict['products.card2.title']     = { tr: 'KBRN İlk Yardım Çantası', en: 'CBRN First Aid Kit' };
    dict['products.card2.desc']      = { tr: 'Fullers Earth decontamination powder bazlı, 6 bileşenli dekontaminasyon kiti. IP65 sertifikalı PP sert plastik hardcase içinde sunulmaktadır.', en: 'Fullers Earth decontamination powder-based, 6-component decontamination kit. Presented in an IP65-certified PP hard plastic hardcase.' };
    dict['products.card3.title']     = { tr: 'GDA-P Kişisel KBRN Dedektörü', en: 'GDA-P Personal CBRN Detector' };
    dict['products.card3.desc']      = { tr: 'AIRSENSE GDA-P; IMS + PID/ECD teknolojisiyle CWA ve TIC\'leri eş zamanlı tespit eden, IP65 korumalı, MIL STD 810G/461G uyumlu, -32°C ila +49°C çalışma aralığına sahip saha dedektörüdür.', en: 'AIRSENSE GDA-P is a field detector with IMS + PID/ECD technology that simultaneously detects CWA and TICs, IP65 protected, MIL STD 810G/461G compliant, with an operating range of -32°C to +49°C.' };
    dict['products.card4.title']     = { tr: 'BC Sistem Elbise ve İş Elbise Sistemi', en: 'BC System Suit & Work Suit System' };
    dict['products.card4.desc']      = { tr: 'KBRN koruyucu elbise — tam vücut koruma, maske/eldiven/bot entegrasyonu, sıvı ve partikül sızdırmazlık. Endüstriyel ve saha tipi seçenekler mevcuttur.', en: 'CBRN protective clothing — full body protection, mask/glove/boot integration, liquid and particle sealing. Industrial and field-type options available.' };
    dict['products.card5.title']     = { tr: 'VANGUARD IFAK', en: 'VANGUARD IFAK' };
    dict['products.card5.desc']      = { tr: 'MOLLE uyumlu taşıma kılıfı içinde 19 parçalı bireysel ilk yardım kiti. Turnike, NPA, hemostatik pansuman, yanık jeli ve sabitleme malzemeleri içerir.', en: '19-piece individual first aid kit in a MOLLE-compatible carrying pouch. Includes tourniquet, NPA, hemostatic dressing, burn gel, and immobilization supplies.' };
    dict['products.card6.title']     = { tr: 'İlkyardım Çantası', en: 'First Aid Kit' };
    dict['products.card6.desc']      = { tr: 'Temel yara bakımı, bandaj ve antiseptik sarf malzemelerini, ev-ofis-araç-saha kullanımına uygun düzenli bir çanta içinde sunar.', en: 'Presents basic wound care, bandaging, and antiseptic supplies in an organized bag suitable for home, office, vehicle, and field use.' };
    dict['products.card7.title']     = { tr: 'Kan Durdurucu İlaçlar', en: 'Hemostatic Drugs' };
    dict['products.card7.desc']      = { tr: 'Hızlı pıhtılaşma ve kanama kontrolü hedefiyle geliştirilen hemostatik formülasyonlar; toz, granül, emdirilmiş gazlı bez ve sprey gibi farklı uygulama formlarında çalışılabilir.', en: 'Hemostatic formulations developed for rapid clotting and bleeding control; available in various application forms such as powder, granule, impregnated gauze, and spray.' };
    dict['products.card8.title']     = { tr: 'ERWEKA AR 403', en: 'ERWEKA AR 403' };
    dict['products.card8.desc']      = { tr: '750W 3-fazlı AC motor, 20-400 rpm, 23 Nm sürekli/30 Nm maks tork. Modüler yapı: dissolution, disintegration, friability testleri. USP/EP/JP uyumlu.', en: '750W 3-phase AC motor, 20-400 rpm, 23 Nm continuous/30 Nm max torque. Modular structure: dissolution, disintegration, friability tests. USP/EP/JP compliant.' };
    dict['products.card9.title']     = { tr: 'MEDMAK LXZ Serisi', en: 'MEDMAK LXZ Series' };
    dict['products.card9.desc']      = { tr: 'PLC kontrollü, vakum destekli swab transfer ünitesi. Paket başına 1-5 swab, ISO 13485 uyumlu, üç model: LXZ-50, LXZ-75, LXZ-100.', en: 'PLC-controlled, vacuum-assisted swab transfer unit. 1-5 swabs per pack, ISO 13485 compliant, three models: LXZ-50, LXZ-75, LXZ-100.' };
    dict['products.back']            = { tr: 'Ürün Kataloğuna Dön', en: 'Back to Product Catalog' };

    // --- iletisim.html ---
    dict['contact.hero.title']       = { tr: 'Bize <span class="highlight">Ulaşın</span>', en: '<span class="highlight">Contact</span> Us' };
    dict['contact.hero.subtitle']    = { tr: 'Sorularınız, teklif talepleriniz ve iş birliği fırsatları için bizimle iletişime geçin.', en: 'Get in touch with us for your questions, quotation requests, and collaboration opportunities.' };
    dict['contact.info.title']       = { tr: 'İletişim Bilgileri', en: 'Contact Information' };
    dict['contact.address.label']    = { tr: 'Adres', en: 'Address' };
    dict['contact.phone.label']      = { tr: 'Telefon', en: 'Phone' };
    dict['contact.fax.label']        = { tr: 'Faks', en: 'Fax' };
    dict['contact.email.label']      = { tr: 'E-posta', en: 'E-mail' };

    // --- haber.html ---
    dict['news.back']                = { tr: 'Anasayfaya Dön', en: 'Back to Home' };
    dict['news.date']                = { tr: '11 Temmuz 2026', en: 'July 11, 2026' };
    dict['news.time']                = { tr: '10:00', en: '10:00 AM' };
    dict['news.category']            = { tr: 'Duyuru', en: 'Announcement' };
    dict['news.title']               = { tr: 'Yeni Web Sitemiz Yayında!', en: 'Our New Website is Live!' };
    dict['news.p1']                  = { tr: 'Almed Medikal olarak, yenilenen web sitemizle artık dijital dünyada da güçlü bir şekilde varız. Tüm ürün kataloğumuzu, teknik detayları ve güncel gelişmeleri bu platform üzerinden takip edebilirsiniz.', en: 'As Almed Medikal, we now have a strong presence in the digital world with our renewed website. You can follow our entire product catalog, technical details, and latest developments on this platform.' };
    dict['news.p2']                  = { tr: 'Yeni sitemizde KBRN savunma ekipmanlarından ilaç hammaddelerine, bireysel ilk yardım kitlerinden farmasötik test cihazlarına kadar tüm ürünlerimizi detaylı teknik bilgileriyle birlikte bulabilirsiniz.', en: 'On our new site, you can find all our products with detailed technical information, from CBRN defense equipment to pharmaceutical raw materials, from individual first aid kits to pharmaceutical testing devices.' };
    dict['news.p3']                  = { tr: 'Daha hızlı, daha kapsamlı ve daha modern bir deneyim sunmaktan mutluluk duyuyoruz. Bizi takip etmeye devam edin!', en: 'We are happy to offer a faster, more comprehensive, and more modern experience. Keep following us!' };

    // --- kan-durdurucu.html ---
    dict['kd.back']                  = { tr: 'Ürün Kataloğuna Dön', en: 'Back to Product Catalog' };
    dict['kd.tag']                   = { tr: 'Ar-Ge • Hemostatik Formülasyon', en: 'R&D • Hemostatic Formulation' };
    dict['kd.title']                 = { tr: 'Kan Durdurucu İlaçlar', en: 'Hemostatic Drugs' };
    dict['kd.intro']                 = { tr: 'Hızlı pıhtılaşma ve kanama kontrolü hedefiyle geliştirilen hemostatik formülasyonlar; toz, granül, emdirilmiş gazlı bez ve sprey gibi farklı uygulama formlarında çalışılabilir.', en: 'Hemostatic formulations developed for rapid clotting and bleeding control; available in various application forms such as powder, granule, impregnated gauze, and spray.' };
    dict['kd.spec1.label']           = { tr: 'Formlar', en: 'Forms' };
    dict['kd.spec1.val']             = { tr: 'Toz, granül, gaz kompres, sprey', en: 'Powder, granule, gas compress, spray' };
    dict['kd.spec2.label']           = { tr: 'Odak', en: 'Focus' };
    dict['kd.spec2.val']             = { tr: 'Hızlı kanama kontrolü', en: 'Rapid bleeding control' };
    dict['kd.spec3.label']           = { tr: 'Kullanım', en: 'Usage' };
    dict['kd.spec3.val']             = { tr: 'Travma, cerrahi, acil servis', en: 'Trauma, surgery, emergency' };
    dict['kd.spec4.label']           = { tr: 'Sterilite', en: 'Sterility' };
    dict['kd.spec4.val']             = { tr: 'Steril paket seçenekleri', en: 'Sterile pack options' };
    dict['kd.features.title']        = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['kd.features.1']            = { tr: 'Hemostatik aktifler yara yüzeyinde hızlı pıhtılaşma sürecini destekleyecek şekilde tasarlanır.', en: 'Hemostatic actives are designed to support the rapid clotting process on the wound surface.' };
    dict['kd.features.2']            = { tr: 'Farklı yara ve müdahale senaryoları için ürün formu çeşitlendirilebilir.', en: 'Product form can be diversified for different wound and intervention scenarios.' };
    dict['kd.features.3']            = { tr: 'Askeri travma, acil servis ve saha kullanımı hedeflenir.', en: 'Military trauma, emergency services, and field use are targeted.' };
    dict['kd.features.4']            = { tr: 'Ürünleşme sürecinde stabilite, sterilite ve uygulama kolaylığı birlikte değerlendirilir.', en: 'Stability, sterility, and ease of application are evaluated together during the productization process.' };
    dict['kd.usage.title']           = { tr: 'Kullanım Alanları', en: 'Areas of Use' };
    dict['kd.usage.1']               = { tr: 'Travma ve saha tıbbı', en: 'Trauma and field medicine' };
    dict['kd.usage.2']               = { tr: 'Acil servis kanama kontrolü', en: 'Emergency bleeding control' };
    dict['kd.usage.3']               = { tr: 'Cerrahi destek ürünleri', en: 'Surgical support products' };
    dict['kd.usage.4']               = { tr: 'Ar-Ge prototip çalışmaları', en: 'R&D prototype studies' };
    dict['kd.gallery.title']         = { tr: 'Ürün Görselleri', en: 'Product Images' };
    dict['lb.zoomout']               = { tr: 'Uzaklaştır', en: 'Zoom Out' };
    dict['lb.zoomin']                = { tr: 'Yakınlaştır', en: 'Zoom In' };
    dict['lb.reset']                 = { tr: 'Sıfırla', en: 'Reset' };

    // --- hemostatik.html ---
    dict['hemo.back']                = { tr: 'Sentez Sayfasına Dön', en: 'Back to Synthesis' };
    dict['hemo.title']               = { tr: 'Hemostatik Antiseptik Gaz Kompresi', en: 'Hemostatic Antiseptic Gas Compress' };
    dict['hemo.tag']                 = { tr: 'Medikal • Gaz Kompres', en: 'Medical • Gas Compress' };
    dict['hemo.intro']               = { tr: 'Antiseptik ve hemostatik özellikli, steril gaz kompres sistemi. Doğrudan yara üzerine basınç uygulanarak kanama kontrolü sağlar.', en: 'Sterile gas compress system with antiseptic and hemostatic properties. Provides bleeding control by applying direct pressure on the wound.' };
    dict['hemo.spec1.label']         = { tr: 'Sterilite', en: 'Sterility' };
    dict['hemo.spec1.val']           = { tr: 'Steril, tek kullanımlık', en: 'Sterile, single-use' };
    dict['hemo.spec2.label']         = { tr: 'Etki', en: 'Effect' };
    dict['hemo.spec2.val']           = { tr: 'Hemostatik + Antiseptik', en: 'Hemostatic + Antiseptic' };
    dict['hemo.spec3.label']         = { tr: 'Uygulama', en: 'Application' };
    dict['hemo.spec3.val']           = { tr: 'Doğrudan basınç', en: 'Direct pressure' };
    dict['hemo.spec4.label']         = { tr: 'Kullanım', en: 'Usage' };
    dict['hemo.spec4.val']           = { tr: 'Acil durum, cerrahi', en: 'Emergency, surgical' };
    dict['hemo.features.title']      = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['hemo.features.1']          = { tr: 'Çift etkili formül: hemostatik + antiseptik', en: 'Dual-action formula: hemostatic + antiseptic' };
    dict['hemo.features.2']          = { tr: 'Steril paket, tek kullanımlık', en: 'Sterile pack, single-use' };
    dict['hemo.features.3']          = { tr: 'Doğrudan yara üzerine basınç uygulaması', en: 'Direct pressure application on wound' };
    dict['hemo.features.4']          = { tr: 'Acil servis ve cerrahi kullanım', en: 'Emergency and surgical use' };
    dict['hemo.usage.title']         = { tr: 'Kullanım Alanları', en: 'Areas of Use' };
    dict['hemo.usage.1']             = { tr: 'Travmatik kanama kontrolü', en: 'Traumatic bleeding control' };
    dict['hemo.usage.2']             = { tr: 'Cerrahi müdahaleler', en: 'Surgical interventions' };
    dict['hemo.usage.3']             = { tr: 'Acil servis ve saha uygulamaları', en: 'Emergency and field applications' };
    dict['hemo.usage.4']             = { tr: 'Askeri sağlık hizmetleri', en: 'Military healthcare services' };

    // --- ifak.html ---
    dict['ifak.back']                = { tr: 'Ürün Kataloğuna Dön', en: 'Back to Product Catalog' };
    dict['ifak.tag']                 = { tr: 'İlk Yardım • Bireysel Kiti', en: 'First Aid • Individual Kit' };
    dict['ifak.title']               = { tr: 'VANGUARD IFAK', en: 'VANGUARD IFAK' };
    dict['ifak.intro']               = { tr: 'MOLLE uyumlu taşıma kılıfı içinde 19 parçalı bireysel ilk yardım kiti. Turnike, NPA, hemostatik pansuman, yanık jeli ve sabitleme malzemeleri içerir.', en: '19-piece individual first aid kit in a MOLLE-compatible carrying pouch. Includes tourniquet, NPA, hemostatic dressing, burn gel, and immobilization supplies.' };
    dict['ifak.spec1.label']         = { tr: 'Parça Sayısı', en: 'Piece Count' };
    dict['ifak.spec1.val']           = { tr: '19 parça', en: '19 pieces' };
    dict['ifak.spec2.label']         = { tr: 'Odak', en: 'Focus' };
    dict['ifak.spec2.val']           = { tr: 'Kanama, havayolu, yanık, sabitleme', en: 'Bleeding, airway, burns, immobilization' };
    dict['ifak.spec3.label']         = { tr: 'Taşıma', en: 'Carry' };
    dict['ifak.spec3.val']           = { tr: 'MOLLE uyumlu kılıf', en: 'MOLLE-compatible pouch' };
    dict['ifak.spec4.label']         = { tr: 'Kullanım', en: 'Usage' };
    dict['ifak.spec4.val']           = { tr: 'Askeri, taktik, sivil', en: 'Military, tactical, civilian' };
    dict['ifak.features.title']      = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['ifak.features.1']          = { tr: '19 adet travma ve ilk yardım malzemesi', en: '19 trauma and first aid supplies' };
    dict['ifak.features.2']          = { tr: 'MOLLE uyumlu kompakt taşıma kılıfı', en: 'MOLLE-compatible compact carrying pouch' };
    dict['ifak.features.3']          = { tr: 'Turnike ve hemostatik pansuman içerir', en: 'Includes tourniquet and hemostatic dressing' };
    dict['ifak.features.4']          = { tr: 'Askeri ve sivil kullanıma uygun', en: 'Suitable for military and civilian use' };
    dict['ifak.gallery.title']       = { tr: 'Ürün Görselleri', en: 'Product Images' };

    // --- ilkyardim-cantasi.html ---
    dict['ilkc.back']                = { tr: 'Ürün Kataloğuna Dön', en: 'Back to Product Catalog' };
    dict['ilkc.tag']                 = { tr: 'İlk Yardım • Temel Kiti', en: 'First Aid • Basic Kit' };
    dict['ilkc.title']               = { tr: 'İlkyardım Çantası', en: 'First Aid Kit' };
    dict['ilkc.intro']               = { tr: 'Temel yara bakımı, bandaj ve antiseptik sarf malzemelerini, ev-ofis-araç-saha kullanımına uygun düzenli bir çanta içinde sunar.', en: 'Presents basic wound care, bandaging, and antiseptic supplies in an organized bag suitable for home, office, vehicle, and field use.' };
    dict['ilkc.spec1.label']         = { tr: 'Kullanım Alanı', en: 'Usage Area' };
    dict['ilkc.spec1.val']           = { tr: 'Ev, ofis, araç, saha', en: 'Home, office, vehicle, field' };
    dict['ilkc.spec2.label']         = { tr: 'İçerik', en: 'Contents' };
    dict['ilkc.spec2.val']           = { tr: 'Yara bakım, bandaj, antiseptik', en: 'Wound care, bandage, antiseptic' };
    dict['ilkc.spec3.label']         = { tr: 'Taşıma', en: 'Carry' };
    dict['ilkc.spec3.val']           = { tr: 'Düzenli çanta', en: 'Organized bag' };
    dict['ilkc.features.title']      = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['ilkc.features.1']          = { tr: 'Temel yara bakımı ve bandaj malzemeleri', en: 'Basic wound care and bandaging supplies' };
    dict['ilkc.features.2']          = { tr: 'Antiseptik sarf malzemeleri', en: 'Antiseptic consumables' };
    dict['ilkc.features.3']          = { tr: 'Ev, ofis, araç ve saha kullanımına uygun', en: 'Suitable for home, office, vehicle, and field use' };
    dict['ilkc.features.4']          = { tr: 'Düzenli ve kolay erişilebilir tasarım', en: 'Organized and easily accessible design' };
    dict['ilkc.usage.title']         = { tr: 'Kullanım Alanları', en: 'Areas of Use' };
    dict['ilkc.usage.1']             = { tr: 'Ev ve ofis ilk yardımı', en: 'Home and office first aid' };
    dict['ilkc.usage.2']             = { tr: 'Araç içi acil durum kiti', en: 'Vehicle emergency kit' };
    dict['ilkc.usage.3']             = { tr: 'Saha ve iş yeri kullanımı', en: 'Field and workplace use' };
    dict['ilkc.usage.4']             = { tr: 'Okul ve kurumsal ilk yardım', en: 'School and institutional first aid' };
    dict['ilkc.gallery.title']       = { tr: 'Ürün Görselleri', en: 'Product Images' };

    // --- kbrn-ilkyardim.html ---
    dict['kbrnia.back']              = { tr: 'Ürün Kataloğuna Dön', en: 'Back to Product Catalog' };
    dict['kbrnia.tag']               = { tr: 'KBRN • Dekontaminasyon', en: 'CBRN • Decontamination' };
    dict['kbrnia.title']             = { tr: 'KBRN İlk Yardım Çantası', en: 'CBRN First Aid Kit' };
    dict['kbrnia.intro']             = { tr: 'Fullers Earth decontamination powder bazlı, 13 bileşenli dekontaminasyon kiti. IP65 sertifikalı PP sert plastik hardcase içinde sunulmaktadır.', en: 'Fullers Earth decontamination powder-based, 13-component decontamination kit. Presented in an IP65-certified PP hard plastic hardcase.' };
    dict['kbrnia.cert.title']        = { tr: 'Sertifikalar & Standartlar', en: 'Certificates & Standards' };
    dict['kbrnia.cert.1']            = { tr: 'ISO 13485 Tıbbi Cihaz Kalite Yönetim Sistemi', en: 'ISO 13485 Medical Device Quality Management System' };
    dict['kbrnia.cert.2']            = { tr: 'TÜV Sertifikalı üretim', en: 'TÜV Certified production' };
    dict['kbrnia.cert.3']            = { tr: 'Sağlık Bakanlığı onaylı', en: 'Ministry of Health approved' };

    // --- kbrn-nbc.html ---
    dict['kbrnnbc.back']             = { tr: 'Ürün Kataloğuna Dön', en: 'Back to Product Catalog' };
    dict['kbrnnbc.tag']              = { tr: 'KBRN • Koruyucu Elbise', en: 'CBRN • Protective Suit' };
    dict['kbrnnbc.title']            = { tr: 'BC Sistem Elbise ve İş Elbise Sistemi', en: 'BC System Suit & Work Suit System' };
    dict['kbrnnbc.intro']            = { tr: 'KBRN koruyucu elbise — tam vücut koruma, maske/eldiven/bot entegrasyonu, sıvı ve partikül sızdırmazlık. Endüstriyel ve saha tipi seçenekler mevcuttur.', en: 'CBRN protective clothing — full body protection, mask/glove/boot integration, liquid and particle sealing. Industrial and field-type options available.' };

    // --- kbrn-numune.html ---
    dict['kbrnnum.back']             = { tr: 'Ürün Kataloğuna Dön', en: 'Back to Product Catalog' };
    dict['kbrnnum.tag']              = { tr: 'KBRN • Numune Alma', en: 'CBRN • Sampling' };
    dict['kbrnnum.title']            = { tr: 'Biyolojik ve Kimyasal Numune Alma Kiti', en: 'Biological & Chemical Sampling Kit' };
    dict['kbrnnum.intro']            = { tr: 'Biyolojik ve kimyasal harp maddesi tehdidi bulunan alanlarda hava, su, toprak, yüzey, materyal ve canlı/çevresel kaynaklardan numune almak ve güvenli taşıma zincirini kurmak için hazırlanmış taşınabilir hardcase kit. NATO Stok No: 6665-27-050-6881.', en: 'Portable hardcase kit designed for sampling from air, water, soil, surface, material, and living/environmental sources in areas threatened by biological and chemical warfare agents, and establishing a secure transport chain. NATO Stock No: 6665-27-050-6881.' };
    dict['kbrnnum.spec1.label']      = { tr: 'Model', en: 'Model' };
    dict['kbrnnum.spec2.label']      = { tr: 'Boyutlar', en: 'Dimensions' };
    dict['kbrnnum.spec3.label']      = { tr: 'Ağırlık', en: 'Weight' };
    dict['kbrnnum.spec4.label']      = { tr: 'Vakum Kapasitesi', en: 'Vacuum Capacity' };
    dict['kbrnnum.spec4.val']        = { tr: '5-12 L/dk', en: '5-12 L/min' };

    // --- medmak.html ---
    dict['medmak.back']              = { tr: 'Üretim Sayfasına Dön', en: 'Back to Production' };
    dict['medmak.tag']               = { tr: 'Üretim • Paketleme', en: 'Production • Packaging' };
    dict['medmak.title']             = { tr: 'MEDMAK Swab Katlama ve Paketleme', en: 'MEDMAK Swab Folding & Packaging' };
    dict['medmak.intro']             = { tr: 'PLC kontrollü, vakum destekli swab transfer ünitesi. Paket başına 1-5 swab, ISO 13485 uyumlu, üç model: LXZ-50, LXZ-75, LXZ-100.', en: 'PLC-controlled, vacuum-assisted swab transfer unit. 1-5 swabs per pack, ISO 13485 compliant, three models: LXZ-50, LXZ-75, LXZ-100.' };
    dict['medmak.models.title']      = { tr: 'Modeller', en: 'Models' };
    dict['medmak.models.m1']         = { tr: 'LXZ-50: Giriş seviyesi', en: 'LXZ-50: Entry level' };
    dict['medmak.models.m2']         = { tr: 'LXZ-75: Orta seviye', en: 'LXZ-75: Mid-range' };
    dict['medmak.models.m3']         = { tr: 'LXZ-100: Amiral gemisi', en: 'LXZ-100: Flagship' };

    // --- sentez.html ---
    dict['sentez.back']              = { tr: 'Anasayfaya Dön', en: 'Back to Home' };
    dict['sentez.tag']               = { tr: 'Ar-Ge • İlaç Hammaddeleri', en: 'R&D • Pharmaceutical Raw Materials' };
    dict['sentez.title']             = { tr: 'İlaç Hammaddeleri Sentez', en: 'Pharmaceutical Raw Material Synthesis' };
    dict['sentez.intro']             = { tr: 'Aktif farmasötik içeriklerin (API) ve ara ürünlerin sentezi, saflaştırılması ve analizi. GMP standartlarında, USP/EP uyumlu üretim.', en: 'Synthesis, purification, and analysis of active pharmaceutical ingredients (API) and intermediates. GMP-compliant, USP/EP-compatible production.' };
    dict['sentez.related']           = { tr: 'İlgili Ürünler', en: 'Related Products' };

    // --- uretim.html ---
    dict['uretim.back']              = { tr: 'Anasayfaya Dön', en: 'Back to Home' };
    dict['uretim.tag']               = { tr: 'Üretim • Tesis', en: 'Production • Facility' };
    dict['uretim.title']             = { tr: 'Üretim', en: 'Production' };
    dict['uretim.intro']             = { tr: 'En son teknolojik sistemlerle donatılmış laboratuvarlarımızda, yüksek kalite standartlarında ilaç hammaddeleri üretimi gerçekleştirilmektedir.', en: 'Production of pharmaceutical raw materials is carried out at high quality standards in our laboratories equipped with the latest technological systems.' };
    dict['uretim.card1.title']       = { tr: 'ERWEKA AR 403', en: 'ERWEKA AR 403' };
    dict['uretim.card1.desc']        = { tr: 'Modüler farmasötik test cihazı. Dissolution, disintegration ve friability testleri için uygundur.', en: 'Modular pharmaceutical testing device. Suitable for dissolution, disintegration, and friability tests.' };
    dict['uretim.card2.title']       = { tr: 'MEDMAK LXZ Serisi', en: 'MEDMAK LXZ Series' };
    dict['uretim.card2.desc']        = { tr: 'Swab katlama ve paketleme sistemi. PLC kontrollü, vakum destekli transfer ünitesi.', en: 'Swab folding and packaging system. PLC-controlled, vacuum-assisted transfer unit.' };
    dict['uretim.card3.title']       = { tr: 'Hemostatik Gaz Kompres', en: 'Hemostatic Gas Compress' };
    dict['uretim.card3.desc']        = { tr: 'Antiseptik ve hemostatik özellikli medikal gaz kompres sistemi.', en: 'Medical gas compress system with antiseptic and hemostatic properties.' };
    dict['uretim.products.heading']  = { tr: 'Üretim <span class="highlight">Ürünlerimiz</span>', en: 'Production <span class="highlight">Products</span>' };

    // --- erweka.html ---
    dict['erweka.back']              = { tr: 'Üretim Sayfasına Dön', en: 'Back to Production' };
    dict['erweka.tag']               = { tr: 'Üretim • Test Cihazı', en: 'Production • Test Device' };
    dict['erweka.title']             = { tr: 'ERWEKA AR 403 Farmasötik Test Cihazı', en: 'ERWEKA AR 403 Pharmaceutical Test Device' };
    dict['erweka.intro']             = { tr: '750W 3-fazlı AC motor, 20-400 rpm, 23 Nm sürekli/30 Nm maks tork. Modüler yapı: dissolution, disintegration, friability testleri. USP/EP/JP uyumlu.', en: '750W 3-phase AC motor, 20-400 rpm, 23 Nm continuous/30 Nm max torque. Modular structure: dissolution, disintegration, friability tests. USP/EP/JP compliant.' };
    dict['erweka.spec1.label']       = { tr: 'Motor', en: 'Motor' };
    dict['erweka.spec1.val']         = { tr: '750W 3-faz AC', en: '750W 3-phase AC' };
    dict['erweka.spec2.label']       = { tr: 'Hız', en: 'Speed' };
    dict['erweka.spec2.val']         = { tr: '20-400 rpm', en: '20-400 rpm' };
    dict['erweka.spec3.label']       = { tr: 'Tork', en: 'Torque' };
    dict['erweka.spec3.val']         = { tr: '23 Nm sürekli / 30 Nm maks', en: '23 Nm continuous / 30 Nm max' };
    dict['erweka.spec4.label']       = { tr: 'Standartlar', en: 'Standards' };
    dict['erweka.spec4.val']         = { tr: 'USP / EP / JP', en: 'USP / EP / JP' };

    // --- gda-p.html ---
    dict['gdap.back']                = { tr: 'Ürün Kataloğuna Dön', en: 'Back to Product Catalog' };
    dict['gdap.tag']                 = { tr: 'KBRN • Kişisel Dedektör', en: 'CBRN • Personal Detector' };
    dict['gdap.title']               = { tr: 'GDA-P Kişisel KBRN Dedektörü', en: 'GDA-P Personal CBRN Detector' };
    dict['gdap.intro']               = { tr: 'AIRSENSE GDA-P; IMS + PID/ECD teknolojisiyle CWA ve TIC\'leri eş zamanlı tespit eden, IP65 korumalı, MIL STD 810G/461G uyumlu, -32°C ila +49°C çalışma aralığına sahip saha dedektörüdür.', en: 'AIRSENSE GDA-P is a field detector with IMS + PID/ECD technology that simultaneously detects CWA and TICs, IP65 protected, MIL STD 810G/461G compliant, with an operating range of -32°C to +49°C.' };
    dict['gdap.spec1.label']         = { tr: 'Teknoloji', en: 'Technology' };
    dict['gdap.spec1.val']           = { tr: 'IMS + PID veya IMS + ECD', en: 'IMS + PID or IMS + ECD' };
    dict['gdap.spec2.label']         = { tr: 'Tespit Seviyesi', en: 'Detection Level' };
    dict['gdap.spec2.val']           = { tr: 'ppb - ppm', en: 'ppb - ppm' };
    dict['gdap.spec3.label']         = { tr: 'Çalışma Sıcaklığı', en: 'Operating Temp.' };
    dict['gdap.spec3.val']           = { tr: '-32°C ila +49°C', en: '-32°C to +49°C' };
    dict['gdap.spec4.label']         = { tr: 'Koruma Sınıfı', en: 'Protection Class' };
    dict['gdap.spec4.val']           = { tr: 'IP65', en: 'IP65' };
    dict['gdap.features.title']      = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['gdap.features.1']          = { tr: 'CWA ve TIC\'leri eş zamanlı tespit', en: 'Simultaneous CWA and TIC detection' };
    dict['gdap.features.2']          = { tr: 'MIL STD 810G / 461G uyumlu', en: 'MIL STD 810G / 461G compliant' };
    dict['gdap.features.3']          = { tr: '8 saat pil ömrü, 4GB veri kaydı', en: '8-hour battery life, 4GB data logging' };
    dict['gdap.features.4']          = { tr: 'RS-232 / Bluetooth bağlantı', en: 'RS-232 / Bluetooth connectivity' };

// === AUTO-GENERATED PRODUCT PAGE TRANSLATIONS ===
    dict['erweka.features.1'] = { tr: 'Modüler yapı: dissolution, disintegration, friability', en: 'Modular structure: dissolution, disintegration, friability' };
    dict['erweka.features.2'] = { tr: 'USP/EP/JP standartlarına uyumlu', en: 'USP/EP/JP standards compliant' };
    dict['erweka.features.3'] = { tr: '750W 3-fazlı AC motor ile yüksek tork', en: 'High torque with 750W 3-phase AC motor' };
    dict['erweka.features.4'] = { tr: '20-400 rpm geniş hız aralığı', en: 'Wide speed range of 20-400 rpm' };
    dict['erweka.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['erweka.tag'] = { tr: 'Üretim • Test Cihazı', en: 'Production • Test Device' };
    dict['gdap.features.1'] = { tr: 'CWA ve TIC\'leri eş zamanlı tespit', en: 'Simultaneous CWA and TIC detection' };
    dict['gdap.features.2'] = { tr: 'MIL STD 810G / 461G uyumlu', en: 'MIL STD 810G / 461G compliant' };
    dict['gdap.features.3'] = { tr: '8 saat pil ömrü, 4GB veri kaydı', en: '8-hour battery life, 4GB data logging' };
    dict['gdap.features.4'] = { tr: 'RS-232 / Bluetooth bağlantı', en: 'RS-232 / Bluetooth connectivity' };
    dict['gdap.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['gdap.tag'] = { tr: 'KBRN • Kişisel Dedektör', en: 'CBRN • Personal Detector' };
    dict['hemo.features.1'] = { tr: 'Çift etkili formül: hemostatik + antiseptik', en: 'Dual-action formula: hemostatic + antiseptic' };
    dict['hemo.features.2'] = { tr: 'Steril paket, tek kullanımlık', en: 'Sterile pack, single-use' };
    dict['hemo.features.3'] = { tr: 'Doğrudan yara üzerine basınç uygulaması', en: 'Direct pressure application on wound' };
    dict['hemo.features.4'] = { tr: 'Acil servis ve cerrahi kullanım', en: 'Emergency and surgical use' };
    dict['hemo.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['hemo.tag'] = { tr: 'Medikal • Gaz Kompres', en: 'Medical • Gas Compress' };
    dict['hemo.usage.1'] = { tr: 'Travmatik kanama kontrolü', en: 'Traumatic bleeding control' };
    dict['hemo.usage.2'] = { tr: 'Cerrahi müdahaleler', en: 'Surgical interventions' };
    dict['hemo.usage.3'] = { tr: 'Acil servis ve saha uygulamaları', en: 'Emergency and field applications' };
    dict['hemo.usage.4'] = { tr: 'Askeri sağlık hizmetleri', en: 'Military healthcare services' };
    dict['hemo.usage.title'] = { tr: 'Kullanım Alanları', en: 'Areas of Use' };
    dict['ifak.features.1'] = { tr: '19 adet travma ve ilk yardım malzemesi', en: '19 trauma and first aid supplies' };
    dict['ifak.features.2'] = { tr: 'MOLLE uyumlu kompakt taşıma kılıfı', en: 'MOLLE-compatible compact carrying pouch' };
    dict['ifak.features.3'] = { tr: 'Turnike ve hemostatik pansuman içerir', en: 'Includes tourniquet and hemostatic dressing' };
    dict['ifak.features.4'] = { tr: 'Askeri ve sivil kullanıma uygun', en: 'Suitable for military and civilian use' };
    dict['ifak.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['ifak.tag'] = { tr: 'İlk Yardım • Bireysel Kiti', en: 'First Aid • Individual Kit' };
    dict['ilkc.features.1'] = { tr: 'Temel yara bakımı ve bandaj malzemeleri', en: 'Basic wound care and bandaging supplies' };
    dict['ilkc.features.2'] = { tr: 'Antiseptik sarf malzemeleri', en: 'Antiseptic consumables' };
    dict['ilkc.features.3'] = { tr: 'Ev, ofis, araç ve saha kullanımına uygun', en: 'Suitable for home, office, vehicle, and field use' };
    dict['ilkc.features.4'] = { tr: 'Düzenli ve kolay erişilebilir tasarım', en: 'Organized and easily accessible design' };
    dict['ilkc.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['ilkc.tag'] = { tr: 'İlk Yardım • Temel Kiti', en: 'First Aid • Basic Kit' };
    dict['kbrnia.content.desc'] = { tr: 'Aşağıdaki içerik, ürün setindeki öğeler ve teknik açıklamalar temel alınarak kullanıcıya dönük sıralı bir yapı ile hazırlanmıştır.', en: 'The following content is prepared in a user-oriented sequential structure based on the items and technical descriptions in the product set.' };
    dict['kbrnia.content.heading'] = { tr: 'KBRN İlk Yardım Çantası İçeriği', en: 'CBRN First Aid Kit Contents' };
    dict['kbrnia.content.kicker'] = { tr: 'Set İçeriği', en: 'Kit Contents' };
    dict['kbrnia.item1.desc'] = { tr: 'Darbeye dayanıklı, sert polipropilen taşıma çantası; pahalı ve hassas ekipmanların saha, polis, askeri, keşif ve bilimsel araştırma gibi zorlu kullanım alanlarında korunması için tasarlanmıştır.', en: 'Darbeye dayanıklı, sert polipropilen taşıma çantası; pahalı ve hassas ekipmanların saha, polis, askeri, keşif ve bilimsel araştırma gibi zorlu kullanım alanlarında korunması için tasarlanmıştır.' };
    dict['kbrnia.item1.title'] = { tr: 'Dekontaminasyon Kiti Taşıma Çantası', en: 'Dekontaminasyon Kiti Taşıma Çantası' };
    dict['kbrnia.item10.desc'] = { tr: 'Müdahale sonrası yüzey, cilt ve ekipman kurulama işlemi için belirtilmiş, emici özellikte, tek kullanımlık havludur.', en: 'Müdahale sonrası yüzey, cilt ve ekipman kurulama işlemi için belirtilmiş, emici özellikte, tek kullanımlık havludur.' };
    dict['kbrnia.item10.title'] = { tr: 'Tek Kullanımlık Havlu', en: 'Tek Kullanımlık Havlu' };
    dict['kbrnia.item11.desc'] = { tr: 'Kimyasal ve radyolojik maddelerin iz kontaminasyonunu cilt ve çeşitli yüzeylerden uzaklaştırmak için tanımlanan tekli paketlenmiş mendildir.', en: 'Kimyasal ve radyolojik maddelerin iz kontaminasyonunu cilt ve çeşitli yüzeylerden uzaklaştırmak için tanımlanan tekli paketlenmiş mendildir.' };
    dict['kbrnia.item11.title'] = { tr: 'KBRN Dekontaminasyon Mendili', en: 'KBRN Dekontaminasyon Mendili' };
    dict['kbrnia.item2.desc'] = { tr: 'Doğal sedimanter kil yapısındaki modifiye Fullers Earth; sıvı ve katı kimyasal ajanlar ile radyoaktif partikülleri absorbe ederek yüzey, giysi ve cilt üzerindeki kontaminasyonu fiziksel olarak uzaklaştırmak amacıyla formüle edilmiştir.', en: 'Doğal sedimanter kil yapısındaki modifiye Fullers Earth; sıvı ve katı kimyasal ajanlar ile radyoaktif partikülleri absorbe ederek yüzey, giysi ve cilt üzerindeki kontaminasyonu fiziksel olarak uzaklaştırmak amacıyla formüle edilmiştir.' };
    dict['kbrnia.item2.title'] = { tr: 'Fullers Earth Dekontaminasyon Tozu', en: 'Fullers Earth Dekontaminasyon Tozu' };
    dict['kbrnia.item3.desc'] = { tr: 'Polyethylene destekli ped içinde pudra bulunan bireysel dekontaminasyon eldiveni; kimyasal ve radyolojik maddelerin iz kontaminasyonunu cilt ve çeşitli yüzeylerden uzaklaştırmak için tanımlanmıştır.', en: 'Polyethylene destekli ped içinde pudra bulunan bireysel dekontaminasyon eldiveni; kimyasal ve radyolojik maddelerin iz kontaminasyonunu cilt ve çeşitli yüzeylerden uzaklaştırmak için tanımlanmıştır.' };
    dict['kbrnia.item3.title'] = { tr: 'Dekontaminasyon Eldiveni', en: 'Dekontaminasyon Eldiveni' };
    dict['kbrnia.item4.desc'] = { tr: 'Yağlı, toksik ve güçlü tutunan ürün kalıntıları için doğrudan yüzeye uygulanacak temizlik solüsyonu olarak tanımlanmıştır.', en: 'Yağlı, toksik ve güçlü tutunan ürün kalıntıları için doğrudan yüzeye uygulanacak temizlik solüsyonu olarak tanımlanmıştır.' };
    dict['kbrnia.item4.title'] = { tr: 'Kimyasal Temizleme ve Dezenfeksiyon Solüsyonu', en: 'Kimyasal Temizleme ve Dezenfeksiyon Solüsyonu' };
    dict['kbrnia.item5.desc'] = { tr: 'Göz yıkama, nazal irrigasyon ve açık yara temizliği için uygun, 0.9 NaCl izotonik solüsyon içeren, tek kullanımlık, bükülebilir plastik ampul formunda sunulan tüplerdir.', en: 'Göz yıkama, nazal irrigasyon ve açık yara temizliği için uygun, 0.9 NaCl izotonik solüsyon içeren, tek kullanımlık, bükülebilir plastik ampul formunda sunulan tüplerdir.' };
    dict['kbrnia.item5.title'] = { tr: 'Steril Serum Fizyolojik Tüpleri', en: 'Steril Serum Fizyolojik Tüpleri' };
    dict['kbrnia.item6.desc'] = { tr: 'İnce toz, yağ bazlı ve su bazlı partiküllere karşı solunum koruma amacıyla belirtilen tek kullanımlık valfli maskedir. EN 149:2001+A1:2009 standardına uygun olarak sınıflandırılmıştır.', en: 'İnce toz, yağ bazlı ve su bazlı partiküllere karşı solunum koruma amacıyla belirtilen tek kullanımlık valfli maskedir. EN 149:2001+A1:2009 standardına uygun olarak sınıflandırılmıştır.' };
    dict['kbrnia.item6.title'] = { tr: 'FFP2 NR D Valfli Maske', en: 'FFP2 NR D Valfli Maske' };
    dict['kbrnia.item7.desc'] = { tr: 'Pudrasız, lateks içermeyen, çift taraflı kullanılabilen, yüksek dayanıklılığa sahip tek kullanımlık muayene eldivenidir.', en: 'Pudrasız, lateks içermeyen, çift taraflı kullanılabilen, yüksek dayanıklılığa sahip tek kullanımlık muayene eldivenidir.' };
    dict['kbrnia.item7.title'] = { tr: 'Vinil Eldiven', en: 'Vinil Eldiven' };
    dict['kbrnia.item8.desc'] = { tr: 'Kapalı ambalaj içinde steril sunulan gaz kompres; yara bakımında, tampon uygulamasında ve kanama kontrolünde kullanılmak üzere belirtilmiştir.', en: 'Kapalı ambalaj içinde steril sunulan gaz kompres; yara bakımında, tampon uygulamasında ve kanama kontrolünde kullanılmak üzere belirtilmiştir.' };
    dict['kbrnia.item8.title'] = { tr: 'Steril Gaz Kompres', en: 'Steril Gaz Kompres' };
    dict['kbrnia.item9.desc'] = { tr: 'Tırnak ve cerrahi alet temizliği için kullanılan, tekrar kullanılabilir ve otoklavlanabilir fırçadır.', en: 'Tırnak ve cerrahi alet temizliği için kullanılan, tekrar kullanılabilir ve otoklavlanabilir fırçadır.' };
    dict['kbrnia.item9.title'] = { tr: 'Tırnak ve Cerrahi Alet Fırçası', en: 'Tırnak ve Cerrahi Alet Fırçası' };
    dict['kbrnia.overview.1h'] = { tr: 'Taşıma ve Muhafaza', en: 'Transport & Storage' };
    dict['kbrnia.overview.1p'] = { tr: 'IP65 sınıfı polipropilen çanta; darbe, toz ve su püskürtmesine karşı koruma sağlayacak şekilde saha koşullarına uygun olarak belirtilmiştir.', en: 'IP65 class polypropylene case; specified as suitable for field conditions, providing protection against impact, dust, and water spray.' };
    dict['kbrnia.overview.2h'] = { tr: 'Dekontaminasyon', en: 'Decontamination' };
    dict['kbrnia.overview.2p'] = { tr: 'Tozlu dekontaminasyon eldiveni, 150 ml Fullers Earth şişesi ve kimyasal/radyolojik dekontaminasyon mendilleri yüzey, ekipman ve kişisel kullanım senaryolarına destek verir.', en: 'Powdered decontamination glove, 150 ml Fullers Earth bottle, and chemical/radiological decontamination wipes support surface, equipment, and personal use scenarios.' };
    dict['kbrnia.overview.3h'] = { tr: 'Kişisel Koruma', en: 'Personal Protection' };
    dict['kbrnia.overview.3p'] = { tr: 'Vinil eldivenler, FFP2 NR D valfli maske, steril gaz kompres ve tek kullanımlık havlu gibi sarflar müdahale sonrası temizlik ve koruma düzenini tamamlar.', en: 'Vinyl gloves, FFP2 NR D valved mask, sterile gas compress, and disposable towels complete the post-intervention cleaning and protection protocol.' };
    dict['kbrnia.section.desc'] = { tr: 'Ürün seti; dayanıklı taşıma çantası, Fullers Earth bazlı emici/dekontaminasyon ürünleri, dezenfektan ve yüzey temizleme solüsyonları, göz/nazal temizlik tüpleri, steril sarflar, fırça, eldiven ve FFP2 maske bileşenlerini kapsar.', en: 'The product set includes: durable carry case, Fullers Earth-based absorbent/decontamination products, disinfectant and surface cleaning solutions, eye/nasal cleaning tubes, sterile supplies, brush, gloves, and FFP2 mask components.' };
    dict['kbrnia.section.heading'] = { tr: 'Tek Çanta İçinde Dekontaminasyon, Koruma ve Medikal Sarf', en: 'Decontamination, Protection & Medical Supplies in One Case' };
    dict['kbrnia.section.kicker'] = { tr: 'Operasyonel Kapsam', en: 'Operational Scope' };
    dict['kbrnia.spec.dim'] = { tr: 'Dış Ölçü', en: 'External Dimensions' };
    dict['kbrnia.spec.protect'] = { tr: 'Çanta Koruması', en: 'Case Protection' };
    dict['kbrnia.spec.scope'] = { tr: 'Set Kapsamı', en: 'Kit Scope' };
    dict['kbrnia.spec.temp'] = { tr: 'Sıcaklık', en: 'Temperature' };
    dict['kbrnia.tag'] = { tr: 'KBRN Dekontaminasyon ve İlk Yardım', en: 'CBRN Decontamination & First Aid' };
    dict['kbrnnbc.features.1'] = { tr: 'Tam vücut koruma sağlar', en: 'Provides full body protection' };
    dict['kbrnnbc.features.2'] = { tr: 'Maske, eldiven ve bot ile entegre kullanım', en: 'Integrated use with mask, gloves, and boots' };
    dict['kbrnnbc.features.3'] = { tr: 'Sıvı ve partikül sızdırmazlık', en: 'Liquid and particle sealing' };
    dict['kbrnnbc.features.4'] = { tr: 'Endüstriyel ve saha tipi seçenekler', en: 'Industrial and field-type options' };
    dict['kbrnnbc.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['kbrnnbc.tag'] = { tr: 'KBRN • Koruyucu Elbise', en: 'CBRN • Protective Suit' };
    dict['kbrnnum.features.1'] = { tr: 'Hava, su, toprak, cisim, yüzey ve materyal üzerinden örnekleme düzeni sağlar.', en: 'Provides sampling capability from air, water, soil, objects, surfaces, and materials.' };
    dict['kbrnnum.features.2'] = { tr: 'Biyolojik ve kimyasal tüpler kendi renk kodlarında sınıflandırılmıştır.', en: 'Biological and chemical tubes are classified with their own color codes.' };
    dict['kbrnnum.features.3'] = { tr: 'Steril tüpler bakteri ve virüs numunesi alma/taşıma için uygundur.', en: 'Sterile tubes are suitable for bacteria and virus sampling/transport.' };
    dict['kbrnnum.features.4'] = { tr: 'Su sızdırmaz çanta içinde tüm malzemeler sabitlenmiş ve etiketlenmiştir.', en: 'All materials are secured and labeled inside a waterproof bag.' };
    dict['kbrnnum.features.5'] = { tr: 'Paslanmaz çelik ve PP malzemeden üretilmiş numune alma ekipmanları içerir.', en: 'Includes sampling equipment made of stainless steel and PP material.' };
    dict['kbrnnum.features.6'] = { tr: 'Kullanım formları, etiketler ve ambalajlama malzemeleri tanımlama sürecini destekler.', en: 'Usage forms, labels, and packaging materials support the identification process.' };
    dict['kbrnnum.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['kbrnnum.spec.case'] = { tr: 'Çanta ölçüsü', en: 'Case Dimensions' };
    dict['kbrnnum.spec.nato'] = { tr: 'NATO stok no', en: 'NATO Stock No' };
    dict['kbrnnum.spec.power'] = { tr: 'Güç', en: 'Power' };
    dict['kbrnnum.spec.vacuum'] = { tr: 'Vakum kapasitesi', en: 'Vacuum Capacity' };
    dict['kbrnnum.tag'] = { tr: 'KBRN • Numune Alma', en: 'CBRN • Sampling' };
    dict['kbrnnum.usage.1'] = { tr: 'Saha KBRN olay yeri incelemesi', en: 'Field CBRN crime scene investigation' };
    dict['kbrnnum.usage.2'] = { tr: 'Laboratuvara güvenli numune transferi', en: 'Safe sample transfer to laboratory' };
    dict['kbrnnum.usage.3'] = { tr: 'Şüpheli kimyasal/biyolojik kontaminasyon araştırması', en: 'Suspected chemical/biological contamination investigation' };
    dict['kbrnnum.usage.4'] = { tr: 'SIBCRA odaklı numune alma süreçleri', en: 'SIBCRA-focused sampling processes' };
    dict['kbrnnum.usage.title'] = { tr: 'Kullanım Alanları', en: 'Areas of Use' };
    dict['kd.features.1'] = { tr: 'Hemostatik aktifler yara yüzeyinde hızlı pıhtılaşma sürecini destekleyecek şekilde tasarlanır.', en: 'Hemostatic actives are designed to support rapid clotting on the wound surface.' };
    dict['kd.features.2'] = { tr: 'Farklı yara ve müdahale senaryoları için ürün formu çeşitlendirilebilir.', en: 'Product form can be diversified for different wound and intervention scenarios.' };
    dict['kd.features.3'] = { tr: 'Askeri travma, acil servis ve saha kullanımı hedeflenir.', en: 'Targeted for military trauma, emergency services, and field use.' };
    dict['kd.features.4'] = { tr: 'Ürünleşme sürecinde stabilite, sterilite ve uygulama kolaylığı birlikte değerlendirilir.', en: 'Stability, sterility, and ease of application are evaluated together during productization.' };
    dict['kd.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['kd.tag'] = { tr: 'Ar-Ge • Hemostatik Formülasyon', en: 'R&D • Hemostatic Formulation' };
    dict['medmak.features.1'] = { tr: 'PLC kontrollü, vakum destekli transfer', en: 'PLC-controlled, vacuum-assisted transfer' };
    dict['medmak.features.2'] = { tr: 'Paket başına 1-5 swab kapasitesi', en: '1-5 swabs per pack capacity' };
    dict['medmak.features.3'] = { tr: 'ISO 13485 uyumlu üretim', en: 'ISO 13485 compliant production' };
    dict['medmak.features.4'] = { tr: 'Üç model seçeneği: LXZ-50, LXZ-75, LXZ-100', en: 'Three model options: LXZ-50, LXZ-75, LXZ-100' };
    dict['medmak.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['medmak.tag'] = { tr: 'Üretim • Paketleme', en: 'Production • Packaging' };
    dict['sentez.features.1'] = { tr: 'GMP standartlarında sentez ve üretim', en: 'GMP-standard synthesis and production' };
    dict['sentez.features.2'] = { tr: 'HPLC, GC, NMR, FTIR analiz yetkinliği', en: 'HPLC, GC, NMR, FTIR analysis capability' };
    dict['sentez.features.3'] = { tr: 'USP/EP referans standartlarına uygunluk', en: 'USP/EP reference standards compliance' };
    dict['sentez.features.4'] = { tr: 'Laboratuvar ölçeğinden pilot üretime geçiş', en: 'Scale-up from laboratory to pilot production' };
    dict['sentez.features.title'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['sentez.tag'] = { tr: 'Ar-Ge • İlaç Hammaddeleri', en: 'R&D • Pharmaceutical Raw Materials' };
    dict['uretim.tag'] = { tr: 'Üretim • Tesis', en: 'Production • Facility' };

    // === BULLETPROOF PRODUCT PAGE TRANSLATIONS ===
    dict['tr.93543'] = { tr: 'KBRN olay yeri, dekontaminasyon hattı ve numune alma operasyonlarında personel güvenliğini destekler.', en: '[EN] KBRN olay yeri, dekontaminasyon hattı ve numune alma operasyonlarında personel güvenliğini destekler.' };
    dict['tr.23488'] = { tr: 'Antiseptik solüsyon/mendil, nitril eldiven, makas ve cımbız ile müdahale hijyenini destekler.', en: '[EN] Antiseptik solüsyon/mendil, nitril eldiven, makas ve cımbız ile müdahale hijyenini destekler.' };
    dict['tr.69553'] = { tr: 'PID veya ECD modülleri kullanıcı tarafından değiştirilebilir ek algılama kabiliyeti sağlar.', en: '[EN] PID veya ECD modülleri kullanıcı tarafından değiştirilebilir ek algılama kabiliyeti sağlar.' };
    dict['tr.88958'] = { tr: 'Yüksek çözünürlüklü iyon mobilite spektrometresi ile pozitif ve negatif modda ölçüm yapar.', en: '[EN] Yüksek çözünürlüklü iyon mobilite spektrometresi ile pozitif ve negatif modda ölçüm yapar.' };
    dict['tr.44932'] = { tr: 'Acil durum battaniyesi ve ilk yardım kılavuzu ile genel acil durum hazırlığını artırır.', en: '[EN] Acil durum battaniyesi ve ilk yardım kılavuzu ile genel acil durum hazırlığını artırır.' };
    dict['tr.90854'] = { tr: 'CWA ve TIC kütüphaneleri daha geniş tehlikeli madde setlerine göre özelleştirilebilir.', en: '[EN] CWA ve TIC kütüphaneleri daha geniş tehlikeli madde setlerine göre özelleştirilebilir.' };
    dict['tr.71110'] = { tr: 'Steril gazlı bez, sargı bezi, elastik bandaj ve yara bandı gibi temel sarflar içerir.', en: '[EN] Steril gazlı bez, sargı bezi, elastik bandaj ve yara bandı gibi temel sarflar içerir.' };
    dict['tr.58646'] = { tr: 'NPA, makas, marker, medikal bant ve elastik bandaj ile travma müdahalesini tamamlar.', en: '[EN] NPA, makas, marker, medikal bant ve elastik bandaj ile travma müdahalesini tamamlar.' };
    dict['tr.23008'] = { tr: 'Koruyucu maske, eldiven ve botlarla birlikte bütüncül bariyer yaklaşımı oluşturur.', en: '[EN] Koruyucu maske, eldiven ve botlarla birlikte bütüncül bariyer yaklaşımı oluşturur.' };
    dict['tr.20520'] = { tr: 'İçerik: su, magnezyum oksit, titanyum dioksit, çinko oksit, etoksillenmiş alkoller', en: '[EN] İçerik: su, magnezyum oksit, titanyum dioksit, çinko oksit, etoksillenmiş alkoller' };
    dict['tr.47687'] = { tr: 'Burn gel, burn dressing ve acil battaniye yanık/hipotermi risklerinde kullanılır.', en: '[EN] Burn gel, burn dressing ve acil battaniye yanık/hipotermi risklerinde kullanılır.' };
    dict['tr.18476'] = { tr: 'Kalite yönetimi ve üretim uygulamalarına ilişkin sertifika ikonları yer alır.', en: '[EN] Kalite yönetimi ve üretim uygulamalarına ilişkin sertifika ikonları yer alır.' };
    dict['tr.8075'] = { tr: 'Turnike, hemostatik pansuman ve acil bandaj ile kanama kontrolünü destekler.', en: '[EN] Turnike, hemostatik pansuman ve acil bandaj ile kanama kontrolünü destekler.' };
    dict['tr.44799'] = { tr: 'Serum ve fırça öğelerinde uygunluk belgesi görselleri dokümana eklenmiştir.', en: '[EN] Serum ve fırça öğelerinde uygunluk belgesi görselleri dokümana eklenmiştir.' };
    dict['tr.59930'] = { tr: 'Hareket kabiliyetini koruyacak şekilde saha çalışmasına uygun tasarlanır.', en: '[EN] Hareket kabiliyetini koruyacak şekilde saha çalışmasına uygun tasarlanır.' };
    dict['tr.75300'] = { tr: 'LED, akustik alarm ve madde adı/tepki göstergesi ile hızlı uyarı verir.', en: '[EN] LED, akustik alarm ve madde adı/tepki göstergesi ile hızlı uyarı verir.' };
    dict['tr.67661'] = { tr: 'Asker, acil müdahale ekibi ve saha personeli kullanımı için uygundur', en: '[EN] Asker, acil müdahale ekibi ve saha personeli kullanımı için uygundur' };
    dict['tr.68236'] = { tr: 'Medikal personel, klinisyen, cerrah ve saha kullanımı için uygundur', en: '[EN] Medikal personel, klinisyen, cerrah ve saha kullanımı için uygundur' };
    dict['tr.96177'] = { tr: 'Uygulama öncesi el temizliği ve uç kontaminasyonundan kaçınma notu', en: '[EN] Uygulama öncesi el temizliği ve uç kontaminasyonundan kaçınma notu' };
    dict['tr.37785'] = { tr: 'Lateks içermez; lateks hassasiyeti olan kullanıcılar için uygundur', en: '[EN] Lateks içermez; lateks hassasiyeti olan kullanıcılar için uygundur' };
    dict['tr.50387'] = { tr: 'Burun süngeri, içten burun klipsi, örme ve ayarlanabilir baş bandı', en: '[EN] Burun süngeri, içten burun klipsi, örme ve ayarlanabilir baş bandı' };
    dict['tr.51213'] = { tr: 'Bileşim: alumina, silika, demir oksitleri, kireç, magnezya ve su', en: '[EN] Bileşim: alumina, silika, demir oksitleri, kireç, magnezya ve su' };
    dict['tr.33161'] = { tr: 'Dezenfektan yıkama solüsyonu için üretim izin belgesi bilgisi.', en: '[EN] Dezenfektan yıkama solüsyonu için üretim izin belgesi bilgisi.' };
    dict['tr.58120'] = { tr: 'Mevcut swab katlama ve paketleme hatlarına entegre edilebilir', en: '[EN] Mevcut swab katlama ve paketleme hatlarına entegre edilebilir' };
    dict['tr.95279'] = { tr: 'Temizlik kapasitesi hesabı: 10 g/m² toprak/kirlilik seviyesi', en: '[EN] Temizlik kapasitesi hesabı: 10 g/m² toprak/kirlilik seviyesi' };
    dict['tr.71940'] = { tr: 'Hemostatik etken maddeler ve kan durdurucu formülasyonlar', en: '[EN] Hemostatik etken maddeler ve kan durdurucu formülasyonlar' };
    dict['tr.11451'] = { tr: 'Farmasötik form: berrak, renksiz, partikülsüz göz damlası', en: '[EN] Farmasötik form: berrak, renksiz, partikülsüz göz damlası' };
    dict['tr.81332'] = { tr: 'Kask kullanımına uygun tasarım ve dikey katlanabilir yapı', en: '[EN] Kask kullanımına uygun tasarım ve dikey katlanabilir yapı' };
    dict['tr.11089'] = { tr: 'Elle kolay uygulama ve uzun süreli depolama stabilitesi', en: '[EN] Elle kolay uygulama ve uzun süreli depolama stabilitesi' };
    dict['tr.73640'] = { tr: 'Alüminyum ve yumuşak metal yüzeylerde kullanılmamalıdır', en: '[EN] Alüminyum ve yumuşak metal yüzeylerde kullanılmamalıdır' };
    dict['tr.8928'] = { tr: 'Hydro-Charging Technology ile meltblown filtre katmanı', en: '[EN] Hydro-Charging Technology ile meltblown filtre katmanı' };
    dict['tr.76652'] = { tr: 'Tırnak, el ve cerrahi alet temizliği için kullanılır', en: '[EN] Tırnak, el ve cerrahi alet temizliği için kullanılır' };
    dict['tr.91018'] = { tr: 'Seçilebilir swab adedi (1-5 arası programlanabilir)', en: '[EN] Seçilebilir swab adedi (1-5 arası programlanabilir)' };
    dict['tr.95548'] = { tr: 'ISO 13485 medikal cihaz üretim standartlarına uygun', en: '[EN] ISO 13485 medikal cihaz üretim standartlarına uygun' };
    dict['tr.37962'] = { tr: 'Sıvı kontaminasyon üzerinde güvenli uygulama amacı', en: '[EN] Sıvı kontaminasyon üzerinde güvenli uygulama amacı' };
    dict['tr.60066'] = { tr: 'Kullanım, kurum/hekim talimatına göre yapılmalıdır', en: '[EN] Kullanım, kurum/hekim talimatına göre yapılmalıdır' };
    dict['tr.31167'] = { tr: 'Raf ömrü: açılmamış ambalajda 5 yıl; EAR99 bilgisi', en: '[EN] Raf ömrü: açılmamış ambalajda 5 yıl; EAR99 bilgisi' };
    dict['tr.58444'] = { tr: 'MSDS dokümanı ile sağlanır; NSN: 6505-27-014-1446', en: '[EN] MSDS dokümanı ile sağlanır; NSN: 6505-27-014-1446' };
    dict['tr.87078'] = { tr: 'Pıhtılaşma sürecini destekleyen aktif bileşenler', en: '[EN] Pıhtılaşma sürecini destekleyen aktif bileşenler' };
    dict['tr.86261'] = { tr: 'Tampon ve yara temizliği amacıyla kullanılabilir', en: '[EN] Tampon ve yara temizliği amacıyla kullanılabilir' };
    dict['tr.99636'] = { tr: 'Yüzey dekontaminasyon kapasitesi: 1 m²’ye kadar', en: '[EN] Yüzey dekontaminasyon kapasitesi: 1 m²’ye kadar' };
    dict['tr.45044'] = { tr: 'Koruma standardı: EN 149:2001+A1:2009 FFP2 NR D', en: '[EN] Koruma standardı: EN 149:2001+A1:2009 FFP2 NR D' };
    dict['tr.81954'] = { tr: 'Dil altı ilaç formülasyonları için API sentezi', en: '[EN] Dil altı ilaç formülasyonları için API sentezi' };
    dict['tr.5213'] = { tr: 'Hafif, tekli ambalajlı ve kullanıma hazır form', en: '[EN] Hafif, tekli ambalajlı ve kullanıma hazır form' };
    dict['tr.24359'] = { tr: 'Kullanımda koruyucu eldiven ve gözlük önerilir', en: '[EN] Kullanımda koruyucu eldiven ve gözlük önerilir' };
    dict['tr.9203'] = { tr: 'Yaygın ölçüler: 5 x 5, 7.5 x 7.5 ve 10 x 10 cm', en: '[EN] Yaygın ölçüler: 5 x 5, 7.5 x 7.5 ve 10 x 10 cm' };
    dict['tr.73342'] = { tr: 'Tablet dağılma (disintegration) süresi tayini', en: '[EN] Tablet dağılma (disintegration) süresi tayini' };
    dict['tr.90009'] = { tr: 'Otoklavlanabilir ve tekrar kullanıma uygundur', en: '[EN] Otoklavlanabilir ve tekrar kullanıma uygundur' };
    dict['tr.76196'] = { tr: 'Emici katman: emici ve bağlayıcı lif karışımı', en: '[EN] Emici katman: emici ve bağlayıcı lif karışımı' };
    dict['tr.72719'] = { tr: 'Hızlı kanama kontrolüne yardımcı formülasyon', en: '[EN] Hızlı kanama kontrolüne yardımcı formülasyon' };
    dict['tr.78141'] = { tr: 'Otomatik örnekleme sistemleriyle entegrasyon', en: '[EN] Otomatik örnekleme sistemleriyle entegrasyon' };
    dict['tr.65670'] = { tr: 'Dokunmatik ekran ile kolay operatör kontrolü', en: '[EN] Dokunmatik ekran ile kolay operatör kontrolü' };
    dict['tr.54561'] = { tr: 'Sağlık Bakanlığı üretim izin belgesi bilgisi', en: '[EN] Sağlık Bakanlığı üretim izin belgesi bilgisi' };
    dict['tr.6273'] = { tr: 'Malzeme: PP, polipropilen enjeksiyon gövde', en: '[EN] Malzeme: PP, polipropilen enjeksiyon gövde' };
    dict['tr.99470'] = { tr: 'Doğrudan yara yüzeyine uygulama kolaylığı', en: '[EN] Doğrudan yara yüzeyine uygulama kolaylığı' };
    dict['tr.34785'] = { tr: 'Tablet ve kapsüllerin çözünme hızı tayini', en: '[EN] Tablet ve kapsüllerin çözünme hızı tayini' };
    dict['tr.18244'] = { tr: 'Tablet aşınma (friability) direnci ölçümü', en: '[EN] Tablet aşınma (friability) direnci ölçümü' };
    dict['tr.11691'] = { tr: 'Kontrollü ortamda reaksiyon optimizasyonu', en: '[EN] Kontrollü ortamda reaksiyon optimizasyonu' };
    dict['tr.27515'] = { tr: 'El ve vücut temizliği için uygun değildir', en: '[EN] El ve vücut temizliği için uygun değildir' };
    dict['tr.12021'] = { tr: 'Travma kaynaklı kanamalarda ilk müdahale', en: '[EN] Travma kaynaklı kanamalarda ilk müdahale' };
    dict['tr.11513'] = { tr: 'Analitik yöntem geliştirme ve validasyon', en: '[EN] Analitik yöntem geliştirme ve validasyon' };
    dict['tr.81602'] = { tr: 'Yüzey uygulaması için temizlik solüsyonu', en: '[EN] Yüzey uygulaması için temizlik solüsyonu' };
    dict['tr.72994'] = { tr: 'Asit içeren ürünlerden uzak tutulmalıdır', en: '[EN] Asit içeren ürünlerden uzak tutulmalıdır' };
    dict['tr.42720'] = { tr: 'Granül, pellet ve kaplı tablet testleri', en: '[EN] Granül, pellet ve kaplı tablet testleri' };
    dict['tr.17938'] = { tr: 'Ergonomik ve emici olmayan tutma yüzeyi', en: '[EN] Ergonomik ve emici olmayan tutma yüzeyi' };
    dict['tr.25979'] = { tr: 'Tek kullanımlık, iki ele de uyumlu yapı', en: '[EN] Tek kullanımlık, iki ele de uyumlu yapı' };
    dict['tr.30140'] = { tr: 'Cerrahi operasyonlarda kanama kontrolü', en: '[EN] Cerrahi operasyonlarda kanama kontrolü' };
    dict['tr.48753'] = { tr: 'Enfeksiyon riskini azaltmaya yardımcı', en: '[EN] Enfeksiyon riskini azaltmaya yardımcı' };
    dict['tr.70039'] = { tr: 'İlk yardım çantalarında yer alabilir', en: '[EN] İlk yardım çantalarında yer alabilir' };
    dict['tr.27297'] = { tr: 'Üst katman: hijyen onaylı beyaz HDPE', en: '[EN] Üst katman: hijyen onaylı beyaz HDPE' };
    dict['tr.87118'] = { tr: 'Askeri ve sivil savunma senaryoları', en: '[EN] Askeri ve sivil savunma senaryoları' };
    dict['tr.28837'] = { tr: 'NR: tekrar kullanıma uygun değildir', en: '[EN] NR: tekrar kullanıma uygun değildir' };
    dict['tr.37113'] = { tr: 'KBRN Dekontaminasyon ve İlk Yardım', en: 'CBRN Decontamination & First Aid' };
    dict['tr.57670'] = { tr: 'PLC kontrollü tam otomatik çalışma', en: '[EN] PLC kontrollü tam otomatik çalışma' };
    dict['tr.96342'] = { tr: 'Temizlenmiş ve zımparalanmış yüzey', en: '[EN] Temizlenmiş ve zımparalanmış yüzey' };
    dict['tr.11068'] = { tr: 'Dolomit testinden geçmiş D sınıfı', en: '[EN] Dolomit testinden geçmiş D sınıfı' };
    dict['tr.84952'] = { tr: 'Sıcaklık dayanımı: -30°C / +90°C', en: '[EN] Sıcaklık dayanımı: -30°C / +90°C' };
    dict['tr.32116'] = { tr: 'Nominal ped emiciliği: 128.0 cm³', en: '[EN] Nominal ped emiciliği: 128.0 cm³' };
    dict['tr.5559'] = { tr: 'Konsantrasyon: %5 sodyum klorür', en: '[EN] Konsantrasyon: %5 sodyum klorür' };
    dict['tr.79743'] = { tr: 'Kullanım sıcaklığı: 0°C / +70°C', en: '[EN] Kullanım sıcaklığı: 0°C / +70°C' };
    dict['tr.12471'] = { tr: 'Ar-Ge • Hemostatik Formülasyon', en: 'R&D • Hemostatic Formulation' };
    dict['tr.3550'] = { tr: 'Güvenlik ve kurtarma ekipleri', en: '[EN] Güvenlik ve kurtarma ekipleri' };
    dict['tr.55017'] = { tr: 'Yara yüzeyinde hijyen desteği', en: '[EN] Yara yüzeyinde hijyen desteği' };
    dict['tr.27814'] = { tr: 'Tekli steril ambalaj seçeneği', en: '[EN] Tekli steril ambalaj seçeneği' };
    dict['tr.92568'] = { tr: 'İçerik: 150 ml Fullers Earth', en: '[EN] İçerik: 150 ml Fullers Earth' };
    dict['tr.13920'] = { tr: 'Hipoalerjenik formül bilgisi', en: '[EN] Hipoalerjenik formül bilgisi' };
    dict['tr.92681'] = { tr: 'Araç ve kişisel travma kiti', en: '[EN] Araç ve kişisel travma kiti' };
    dict['tr.68457'] = { tr: 'İç ölçü: 335 x 250 x 122 mm', en: '[EN] İç ölçü: 335 x 250 x 122 mm' };
    dict['tr.32177'] = { tr: 'Sertifikalar & Standartlar', en: 'Certificates & Standards' };
    dict['tr.7677'] = { tr: 'İlk Yardım • Bireysel Kiti', en: 'First Aid • Individual Kit' };
    dict['tr.46340'] = { tr: 'Sığınak/altyapı gaz izleme', en: '[EN] Sığınak/altyapı gaz izleme' };
    dict['tr.45203'] = { tr: 'Paket ölçüsü: 10 x 12.7 cm', en: '[EN] Paket ölçüsü: 10 x 12.7 cm' };
    dict['tr.53572'] = { tr: 'Ar-Ge • İlaç Hammaddeleri', en: 'R&D • Pharmaceutical Raw Materials' };
    dict['tr.74673'] = { tr: 'Araç ve üs kampı gözetimi', en: '[EN] Araç ve üs kampı gözetimi' };
    dict['tr.34251'] = { tr: 'Acil servis müdahaleleri', en: '[EN] Acil servis müdahaleleri' };
    dict['tr.29626'] = { tr: 'KBRN • Kişisel Dedektör', en: 'CBRN • Personal Detector' };
    dict['tr.53164'] = { tr: 'İlk Yardım • Temel Kiti', en: 'First Aid • Basic Kit' };
    dict['tr.64357'] = { tr: 'KBRN • Koruyucu Elbise', en: 'CBRN • Protective Suit' };
    dict['tr.14121'] = { tr: 'KBRN • Dekontaminasyon', en: 'CBRN • Decontamination' };
    dict['tr.39985'] = { tr: 'Acil müdahale sahaları', en: '[EN] Acil müdahale sahaları' };
    dict['tr.72690'] = { tr: 'Araç ve filo güvenliği', en: '[EN] Araç ve filo güvenliği' };
    dict['tr.45218'] = { tr: 'Medikal • Gaz Kompres', en: 'Medical • Gas Compress' };
    dict['tr.88764'] = { tr: 'Kapalı steril ambalaj', en: '[EN] Kapalı steril ambalaj' };
    dict['tr.88089'] = { tr: 'Ölçü: 100 mm x 400 mm', en: '[EN] Ölçü: 100 mm x 400 mm' };
    dict['tr.73129'] = { tr: 'Öne Çıkan Özellikler', en: 'Key Features' };
    dict['tr.18619'] = { tr: 'Belge ve Standartlar', en: 'Documents & Standards' };
    dict['tr.61638'] = { tr: 'Üretim • Test Cihazı', en: 'Production • Test Device' };
    dict['tr.99556'] = { tr: 'Malzeme: özel ahşap', en: '[EN] Malzeme: özel ahşap' };
    dict['tr.21925'] = { tr: 'Operasyonel Kapsam', en: 'Operational Scope' };
    dict['tr.43785'] = { tr: 'KBRN • Numune Alma', en: 'CBRN • Sampling' };
    dict['tr.18847'] = { tr: 'Üretim • Paketleme', en: 'Production • Packaging' };
    dict['tr.14261'] = { tr: 'Kullanım Alanları', en: 'Areas of Use' };
    dict['tr.94515'] = { tr: 'Teknik Özellikler', en: 'Technical Specifications' };
    dict['tr.7937'] = { tr: 'Çalışma Sıcaklığı', en: 'Operating Temperature' };
    dict['tr.20569'] = { tr: 'Vakum Kapasitesi', en: 'Vacuum Capacity' };
    dict['tr.91906'] = { tr: 'Vakum kapasitesi', en: 'Vacuum Capacity' };
    dict['tr.79068'] = { tr: 'Kalite Standardı', en: '[EN] Kalite Standardı' };
    dict['tr.26187'] = { tr: 'Etanol oranı: %5', en: '[EN] Etanol oranı: %5' };
    dict['tr.14527'] = { tr: 'Ürün Görselleri', en: 'Product Images' };
    dict['tr.8548'] = { tr: 'Tespit Seviyesi', en: 'Detection Level' };
    dict['tr.9637'] = { tr: 'İlgili Ürünler', en: 'Related Products' };
    dict['tr.57664'] = { tr: 'Çanta Koruması', en: '[EN] Çanta Koruması' };
    dict['tr.43011'] = { tr: 'Kullanım Alanı', en: 'Usage Area' };
    dict['tr.37975'] = { tr: 'Üretim • Tesis', en: 'Production • Facility' };
    dict['tr.75687'] = { tr: 'Koruma Sınıfı', en: 'Protection Class' };
    dict['tr.66109'] = { tr: 'Çalışma Alanı', en: '[EN] Çalışma Alanı' };
    dict['tr.85707'] = { tr: 'NATO stok no', en: 'NATO Stock No' };
    dict['tr.37577'] = { tr: 'Çanta ölçüsü', en: 'Case Dimensions' };
    dict['tr.31667'] = { tr: 'Parça Sayısı', en: 'Piece Count' };
    dict['tr.13448'] = { tr: 'Modüler Yapı', en: '[EN] Modüler Yapı' };
    dict['tr.9543'] = { tr: 'Set İçeriği', en: 'Kit Contents' };
    dict['tr.23550'] = { tr: 'Set Kapsamı', en: '[EN] Set Kapsamı' };
    dict['tr.12268'] = { tr: 'Standartlar', en: 'Standards' };
    dict['tr.23731'] = { tr: 'Hız Aralığı', en: '[EN] Hız Aralığı' };
    dict['tr.56486'] = { tr: 'Tork Değeri', en: '[EN] Tork Değeri' };
    dict['tr.79796'] = { tr: 'Motor Gücü', en: '[EN] Motor Gücü' };
    dict['tr.6929'] = { tr: 'Teknoloji', en: 'Technology' };
    dict['tr.56176'] = { tr: 'Sterilite', en: 'Sterility' };
    dict['tr.81609'] = { tr: 'Modeller', en: 'Models' };
    dict['tr.41416'] = { tr: 'Boyutlar', en: 'Dimensions' };
    dict['tr.84982'] = { tr: 'Dış Ölçü', en: 'External Dimensions' };
    dict['tr.69926'] = { tr: 'Sıcaklık', en: 'Temperature' };
    dict['tr.85877'] = { tr: 'Kullanım', en: 'Usage' };
    dict['tr.30247'] = { tr: 'Uygulama', en: 'Application' };
    dict['tr.29173'] = { tr: 'Ağırlık', en: 'Weight' };
    dict['tr.30173'] = { tr: 'Formlar', en: 'Forms' };
    dict['tr.19792'] = { tr: 'Batarya', en: 'Battery' };
    dict['tr.27126'] = { tr: 'Taşıma', en: 'Carry' };
    dict['tr.92638'] = { tr: 'İçerik', en: 'Contents' };
    dict['tr.39857'] = { tr: 'Tork', en: 'Torque' };
    dict['tr.50489'] = { tr: 'Odak', en: 'Focus' };
    dict['tr.77288'] = { tr: 'Etki', en: 'Effect' };
    dict['tr.39410'] = { tr: 'Güç', en: 'Power' };
    dict['tr.59606'] = { tr: 'Hız', en: 'Speed' };

    // ================================================================
    //  ENGINE
    // ================================================================

    let currentLang = DEFAULT_LANG;

    function getLang() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED.includes(stored)) return stored;
        } catch (e) { /* ignore */ }
        return DEFAULT_LANG;
    }

    function saveLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    /** Translate a single key to the target language */
    function t(key, lang) {
        const entry = dict[key];
        if (!entry) return key;
        return entry[lang] || entry[DEFAULT_LANG] || key;
    }

    /** Walk the DOM and update all [data-i18n] elements */
    function applyLang(lang) {
        currentLang = lang;
        saveLang(lang);

        // Update <html lang="">
        document.documentElement.lang = lang;

        // Update all elements with data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;
            const translated = t(key, lang);
            if (translated === key) return; // no translation found

            // If the translation contains HTML, set innerHTML; otherwise textContent
            if (/<[a-z][\s\S]*>/i.test(translated)) {
                el.innerHTML = translated;
            } else {
                el.textContent = translated;
            }
        });

        // Update all elements with data-i18n-placeholder
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (!key) return;
            const translated = t(key, lang);
            if (translated !== key) {
                el.placeholder = translated;
            }
        });

        // Update all elements with data-i18n-alt
        const alts = document.querySelectorAll('[data-i18n-alt]');
        alts.forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            if (!key) return;
            const translated = t(key, lang);
            if (translated !== key) {
                el.alt = translated;
            }
        });

        // Update all elements with data-i18n-title
        const titles = document.querySelectorAll('[data-i18n-title]');
        titles.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (!key) return;
            const translated = t(key, lang);
            if (translated !== key) {
                el.title = translated;
            }
        });

        // Dispatch event for other scripts
        document.documentElement.dispatchEvent(new CustomEvent('i18nChanged', { detail: { lang } }));

        // Update language switcher UI
        updateSwitcherUI(lang);
    }

    /** Update the language toggle button visuals */
    function updateSwitcherUI(lang) {
        document.querySelectorAll('.lang-switch-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    /** Create and inject the language switcher into the top-bar */
    function injectSwitcher() {
        const topBarInner = document.querySelector('.top-bar-inner');
        if (!topBarInner) return;

        // Don't inject if already exists
        if (topBarInner.querySelector('.lang-switcher')) return;

        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        switcher.innerHTML = `
            <button class="lang-switch-btn active" data-lang="tr" aria-label="Türkçe">TR</button>
            <span class="lang-divider">|</span>
            <button class="lang-switch-btn" data-lang="en" aria-label="English">EN</button>
        `;
        topBarInner.appendChild(switcher);

        // Add event listeners
        switcher.querySelectorAll('.lang-switch-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                if (lang) applyLang(lang);
            });
        });
    }

    /** Initialize the i18n system */
    function init() {
        const lang = getLang();
        injectSwitcher();
        applyLang(lang);
    }

    // Public API
    return {
        init,
        t,
        getLang,
        setLang: applyLang,
        supported: SUPPORTED
    };
})();

// Auto-init on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', I18N.init);
} else {
    I18N.init();
}

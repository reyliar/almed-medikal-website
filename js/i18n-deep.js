/* ============================================================
   ALMED MEDIKAL - Deep Translation Fallback Engine
   Walks ALL text nodes and replaces known Turkish→English
   Runs after the primary data-i18n attribute system.
   ============================================================ */

(function() {
    'use strict';

    // ==================== DEEP TRANSLATION MAP ====================
    // Sorted longest-first for correct matching
    const tr2en = [
        // --- LONG PHRASES (match first) ---
        ['Öne Çıkan Özellikler', 'Key Features'],
        ['Kullanım Alanları', 'Areas of Use'],
        ['Ürün Görselleri', 'Product Images'],
        ['Ürün Kataloğuna Dön', 'Back to Product Catalog'],
        ['Anasayfaya Dön', 'Back to Home'],
        ['Üretim Sayfasına Dön', 'Back to Production'],
        ['Sentez Sayfasına Dön', 'Back to Synthesis'],
        ['Ürünlerimizi Keşfedin', 'Discover Our Products'],
        ['Ürünlerimiz', 'Our Products'],
        ['Bize Ulaşın', 'Contact Us'],
        ['Aşağı Kaydır', 'Scroll Down'],
        ['Detaylı Bilgi', 'Learn More'],
        ['HIZLI ERİŞİM', 'QUICK LINKS'],
        ['Tüm Ürünler', 'All Products'],
        ['İlk Yardım', 'First Aid'],
        ['İletişim Bilgileri', 'Contact Information'],
        ['İlgili Ürünler', 'Related Products'],
        ['Sertifikalar & Standartlar', 'Certificates & Standards'],
        ['Belge ve Standartlar', 'Documents & Standards'],
        ['Set İçeriği', 'Kit Contents'],
        ['Operasyonel Kapsam', 'Operational Scope'],
        ['Taşıma ve Muhafaza', 'Transport & Storage'],
        ['Kişisel Koruma', 'Personal Protection'],
        ['Dekontaminasyon', 'Decontamination'],
        ['İlaç Hammaddeleri', 'Pharmaceutical Raw Materials'],
        ['AR-GE Odaklı Üretim', 'R&D Focused Production'],
        ['NATO Standartları', 'NATO Standards'],
        ['Yerli ve Milli Üretim', 'Domestic & National Production'],
        ['7/24 Teknik Destek', '24/7 Technical Support'],
        ['KBRN Savunma Ekipmanları', 'CBRN Defense Equipment'],
        ['İlk Yardım ve Acil Müdahale', 'First Aid & Emergency Response'],
        ['İlaç Hammaddeleri ve Üretim', 'Pharmaceutical Raw Materials & Production'],
        ['Ar-Ge ve İleri Teknoloji Projeleri', 'R&D & Advanced Technology Projects'],
        ['KBRN Mobil Laboratuvar', 'CBRN Mobile Laboratory'],
        ['Radyasyon Koruma İzolasyonu', 'Radiation Protection Isolation'],
        ['Radyasyon Koruma Ürünleri', 'Radiation Protection Products'],
        ['Otomatik Turnike', 'Automatic Tourniquet'],
        ['Led Ameliyathane Lambası', 'LED Operating Room Lamp'],
        ['Gaz Kompres Sistemi', 'Gas Compress System'],
        ['Laboratuvar Sistem', 'Laboratory System'],
        ['Yanık Tedavi', 'Burn Treatment'],
        ['KBRN Dekontaminasyon ve İlk Yardım', 'CBRN Decontamination & First Aid'],
        ['KBRN İlk Yardım Çantası', 'CBRN First Aid Kit'],
        ['Biyolojik ve Kimyasal Numune Alma Kiti', 'Biological & Chemical Sampling Kit'],
        ['Kan Durdurucu İlaçlar', 'Hemostatic Drugs'],
        ['Hemostatik Antiseptik Gaz Kompresi', 'Hemostatic Antiseptic Gas Compress'],
        ['GDA-P Kişisel KBRN Dedektörü', 'GDA-P Personal CBRN Detector'],
        ['İlkyardım Çantası', 'First Aid Kit'],
        ['Tam donanımlı, sahada biyolojik', 'Fully equipped, on-site biological'],
        ['Tek Çanta İçinde Dekontaminasyon, Koruma ve Medikal Sarf', 'Decontamination, Protection & Medical Supplies in One Case'],

        // --- MEDIUM PHRASES ---
        ['KBRN Numune Alma Kiti', 'CBRN Sampling Kit'],
        ['BC Sistem Elbise', 'BC System Suit'],
        ['ERWEKA AR 403', 'ERWEKA AR 403'],
        ['MEDMAK LXZ Serisi', 'MEDMAK LXZ Series'],
        ['VANGUARD IFAK', 'VANGUARD IFAK'],
        ['Hemostatik Gaz Kompres', 'Hemostatic Gas Compress'],
        ['İlaç Hammaddeleri Sentez', 'Pharmaceutical Raw Material Synthesis'],
        ['Farmasötik Test Cihazı', 'Pharmaceutical Test Device'],
        ['Swab Katlama ve Paketleme', 'Swab Folding & Packaging'],
        ['Kişisel KBRN Dedektörü', 'Personal CBRN Detector'],
        ['KBRN koruyucu elbise', 'CBRN protective suit'],
        ['Numune Alma Kiti', 'Sampling Kit'],
        ['İlk Yardım Çantası', 'First Aid Kit'],
        ['İş Elbise Sistemi', 'Work Suit System'],
        ['Dekontaminasyon Kiti', 'Decontamination Kit'],
        ['Taşıma Çantası', 'Carry Case'],
        ['Dekontaminasyon Tozu', 'Decontamination Powder'],
        ['Yeni Web Sitemiz Yayında!', 'Our New Website is Live!'],
        ['Ürün Kataloğumuz', 'Our Product Catalog'],
        ['Ürün Kataloğu', 'Product Catalog'],
        ['Öne Çıkan Özellikler', 'Key Features'],
        ['Kullanım Alanları', 'Areas of Use'],
        ['Ürün Görselleri', 'Product Images'],
        ['Çanta ölçüsü', 'Case Dimensions'],
        ['Vakum kapasitesi', 'Vacuum Capacity'],
        ['NATO stok no', 'NATO Stock No'],
        ['Set Kapsamı', 'Kit Scope'],
        ['Çanta Koruması', 'Case Protection'],
        ['Dış Ölçü', 'External Dimensions'],
        ['Operasyonel Kapsam', 'Operational Scope'],
        ['Set İçeriği', 'Kit Contents'],
        ['Kişisel Koruma', 'Personal Protection'],
        ['Taşıma ve Muhafaza', 'Transport & Storage'],
        ['Sertifikalar & Standartlar', 'Certificates & Standards'],
        ['Belge ve Standartlar', 'Documents & Standards'],
        ['İlgili Ürünler', 'Related Products'],

        // --- SINGLE WORDS (shorter, matched later) ---
        ['Dekontaminasyon', 'Decontamination'],
        ['İletişim', 'Contact'],
        ['Anasayfa', 'Home'],
        ['Kurumsal', 'Corporate'],
        ['Hakkımızda', 'About Us'],
        ['Ürünler', 'Products'],
        ['Ürün', 'Product'],
        ['Kategoriler', 'Categories'],
        ['Duyuru', 'Announcement'],
        ['Haberler', 'News'],
        ['Kuruluş', 'Established'],
        ['Merkez', 'Headquarters'],
        ['Deneyim', 'Experience'],
        // Product spec terms
        ['Çanta', 'Case'],
        ['çanta', 'case'],
        ['ölçüsü', 'dimensions'],
        ['ölçü', 'dimension'],
        ['Güç', 'Power'],
        ['güç', 'power'],
        ['stok', 'stock'],
        ['NATO', 'NATO'],
        ['kapasitesi', 'capacity'],
        ['kapasite', 'capacity'],
        ['Vakum', 'Vacuum'],
        ['vakum', 'vacuum'],
        ['sıcaklık', 'temperature'],
        ['Sıcaklık', 'Temperature'],
        ['koruması', 'protection'],
        ['Koruması', 'Protection'],
        ['kapsamı', 'scope'],
        ['Kapsamı', 'Scope'],
        ['içeriği', 'contents'],
        ['İçeriği', 'Contents'],
        ['ağırlık', 'weight'],
        ['Ağırlık', 'Weight'],
        ['boyut', 'dimension'],
        ['Boyut', 'Dimension'],
        ['boyutlar', 'dimensions'],
        ['Boyutlar', 'Dimensions'],
        ['hava', 'air'],
        ['Hava', 'Air'],
        ['toprak', 'soil'],
        ['Toprak', 'Soil'],
        ['yüzey', 'surface'],
        ['Yüzey', 'Surface'],
        ['materyal', 'material'],
        ['Materyal', 'Material'],
        ['numune', 'sample'],
        ['Numune', 'Sample'],
        ['örnekleme', 'sampling'],
        ['Örnekleme', 'Sampling'],
        ['biyolojik', 'biological'],
        ['Biyolojik', 'Biological'],
        ['kimyasal', 'chemical'],
        ['Kimyasal', 'Chemical'],
        ['radyolojik', 'radiological'],
        ['Radyolojik', 'Radiological'],
        ['nükleer', 'nuclear'],
        ['Nükleer', 'Nuclear'],
        ['tüp', 'tube'],
        ['tüpler', 'tubes'],
        ['Tüpler', 'Tubes'],
        ['steril', 'sterile'],
        ['Steril', 'Sterile'],
        ['bakteri', 'bacteria'],
        ['virüs', 'virus'],
        ['renk', 'color'],
        ['kod', 'code'],
        ['kodları', 'codes'],
        ['sınıflandırılmıştır', 'classified'],
        ['uygundur', 'suitable'],
        ['paslanmaz', 'stainless'],
        ['çelik', 'steel'],
        ['malzeme', 'material'],
        ['malzemeler', 'materials'],
        ['malzemeleri', 'materials'],
        ['ekipman', 'equipment'],
        ['ekipmanları', 'equipment'],
        ['form', 'form'],
        ['formları', 'forms'],
        ['etiket', 'label'],
        ['etiketler', 'labels'],
        ['ambalaj', 'packaging'],
        ['ambalajlama', 'packaging'],
        ['tanımlama', 'identification'],
        ['süreci', 'process'],
        ['süreçleri', 'processes'],
        ['destekler', 'supports'],
        ['destek', 'support'],
        ['sağlar', 'provides'],
        ['içerir', 'includes'],
        ['saha', 'field'],
        ['olay', 'incident'],
        ['yeri', 'site'],
        ['incelemesi', 'investigation'],
        ['transferi', 'transfer'],
        ['transfer', 'transfer'],
        ['şüpheli', 'suspected'],
        ['kontaminasyon', 'contamination'],
        ['araştırması', 'investigation'],
        ['odaklı', 'focused'],
        ['elde', 'obtain'],
        ['etmek', 'to'],
        ['almak', 'collect'],
        ['alma', 'collection'],
        ['taşıma', 'transport'],
        ['zinciri', 'chain'],
        ['kurmak', 'establish'],
        ['hazırlanmış', 'prepared'],
        ['taşınabilir', 'portable'],
        ['güvenli', 'secure'],
        ['güvenliği', 'security'],
        ['güvenlik', 'security'],
        ['tehdit', 'threat'],
        ['tehdidi', 'threat'],
        ['bulunan', 'present'],
        ['alanlarda', 'in areas'],
        ['kaynaklardan', 'from sources'],
        ['çevresel', 'environmental'],
        ['canlı', 'living'],
        ['düzen', 'order/system'],
        ['düzeni', 'system'],
        ['dahil', 'including'],
        ['mevcut', 'available'],
        ['mevcuttur', 'is available'],
        ['seçenek', 'option'],
        ['seçenekler', 'options'],
        ['seçenekleri', 'options'],
        ['özelliği', 'feature'],
        ['özellikleri', 'features'],
        ['özellikler', 'features'],
        ['belirtilmiştir', 'specified'],
        ['belirtilen', 'specified'],
        ['tanımlanmıştır', 'defined'],
        ['tanımlanır', 'defined'],
        ['kullanılır', 'used'],
        ['kullanılmak', 'to be used'],
        ['kullanılmak üzere', 'for use'],
        ['amaçlanmıştır', 'intended'],
        ['amaçlanır', 'intended'],
        ['tasarlanmıştır', 'designed'],
        ['tasarlanmış', 'designed'],
        ['dayanıklı', 'durable'],
        ['darbeye', 'impact'],
        ['dayanıklı', 'resistant'],
        ['sert', 'hard'],
        ['polipropilen', 'polypropylene'],
        ['koruma', 'protection'],
        ['korunması', 'protection'],
        ['sağlayacak', 'providing'],
        ['şekilde', 'manner'],
        ['koşullarına', 'conditions'],
        ['uygun', 'suitable'],
        ['olarak', 'as'],
        ['toz', 'dust'],
        ['tozlu', 'powdered'],
        ['tozu', 'powder'],
        ['püskürtme', 'spray'],
        ['püskürtmesine', 'spray'],
        ['karşı', 'against'],
        ['darbe', 'impact'],
        ['Fullers', 'Fullers'],
        ['Earth', 'Earth'],
        ['emici', 'absorbent'],
        ['ürünleri', 'products'],
        ['dezenfektan', 'disinfectant'],
        ['dezenfeksiyon', 'disinfection'],
        ['temizleme', 'cleaning'],
        ['temizlik', 'cleaning'],
        ['temizleyici', 'cleaner'],
        ['solüsyonu', 'solution'],
        ['solüsyonları', 'solutions'],
        ['göz', 'eye'],
        ['nazal', 'nasal'],
        ['temizlik', 'cleaning'],
        ['tüpleri', 'tubes'],
        ['sarflar', 'supplies'],
        ['fırça', 'brush'],
        ['eldiven', 'glove'],
        ['eldiveni', 'glove'],
        ['eldivenler', 'gloves'],
        ['maske', 'mask'],
        ['bileşenlerini', 'components'],
        ['kapsar', 'covers'],
        ['vinil', 'vinyl'],
        ['pudrasız', 'powder-free'],
        ['lateks', 'latex'],
        ['içermeyen', 'free of'],
        ['içermez', 'free of'],
        ['çift', 'double'],
        ['taraflı', 'sided'],
        ['kullanılabilen', 'usable'],
        ['dayanıklılığa', 'durability'],
        ['sahip', 'having'],
        ['tek', 'single'],
        ['kullanımlık', 'use'],
        ['muayene', 'examination'],
        ['kapalı', 'closed/sealed'],
        ['ambalaj', 'package'],
        ['içinde', 'inside'],
        ['sunulan', 'presented'],
        ['yara', 'wound'],
        ['bakımında', 'care'],
        ['tampon', 'pad/buffer'],
        ['uygulamasında', 'application'],
        ['kanama', 'bleeding'],
        ['kontrolünde', 'control'],
        ['tırnak', 'nail'],
        ['cerrahi', 'surgical'],
        ['alet', 'instrument'],
        ['fırçası', 'brush'],
        ['tekrar', 're-'],
        ['kullanılabilir', 'reusable'],
        ['otoklavlanabilir', 'autoclavable'],
        ['havlu', 'towel'],
        ['mendil', 'wipe'],
        ['mendili', 'wipe'],
        ['paketlenmiş', 'packaged'],
        ['tekli', 'individual'],
        ['doğal', 'natural'],
        ['sedimanter', 'sedimentary'],
        ['kil', 'clay'],
        ['yapısındaki', 'structured'],
        ['modifiye', 'modified'],
        ['ajanlar', 'agents'],
        ['ajanları', 'agents'],
        ['ajanların', 'agents'],
        ['radyoaktif', 'radioactive'],
        ['partikülleri', 'particles'],
        ['absorbe', 'absorb'],
        ['ederek', 'by'],
        ['fiziksel', 'physically'],
        ['uzaklaştırmak', 'remove'],
        ['uzaklaştırmak', 'removing'],
        ['formüle', 'formulated'],
        ['edilmiştir', 'has been'],
        ['polyethylene', 'polyethylene'],
        ['destekli', 'backed'],
        ['ped', 'pad'],
        ['pudra', 'powder'],
        ['bireysel', 'individual'],
        ['kullanıcının', 'user'],
        ['mevcut', 'existing'],
        ['üzerine', 'over'],
        ['giyilen', 'worn'],
        ['kimyasallara', 'chemicals'],
        ['maruziyet', 'exposure'],
        ['azaltır', 'reduces'],
        ['yağlı', 'oily'],
        ['toksik', 'toxic'],
        ['tutunan', 'adhering'],
        ['kalıntıları', 'residues'],
        ['doğrudan', 'direct'],
        ['yüzeye', 'to surface'],
        ['uygulanacak', 'to be applied'],
        ['izotonik', 'isotonic'],
        ['içeren', 'containing'],
        ['bükülebilir', 'flexible'],
        ['plastik', 'plastic'],
        ['ampul', 'ampoule'],
        ['formunda', 'in form of'],
        ['yıkama', 'washing'],
        ['irrigasyon', 'irrigation'],
        ['açık', 'open'],
        ['temizliği', 'cleaning'],
        ['ince', 'fine'],
        ['yağ', 'oil'],
        ['bazlı', 'based'],
        ['partiküllere', 'particles'],
        ['solunum', 'respiratory'],
        ['amacıyla', 'for the purpose of'],
        ['valfli', 'valved'],
        ['maskedir', 'is a mask'],
        ['standardına', 'standard'],
        ['sınıflandırılmıştır', 'is classified'],
        ['üretilmiş', 'produced'],
        ['içerir', 'contains'],
        ['kullanım', 'usage'],
        ['etiketlenmiştir', 'labeled'],
        ['sabitlenmiş', 'secured'],
        ['sızdırmaz', 'waterproof'],
        ['parça', 'piece'],
        ['parçalı', 'piece'],
        ['sayısı', 'count/number'],
        ['kiti', 'kit'],
        ['adet', 'pieces'],
        ['travma', 'trauma'],
        ['yardım', 'aid/help'],
        ['kompakt', 'compact'],
        ['kılıf', 'pouch'],
        ['kılıfı', 'pouch'],
        ['turnike', 'tourniquet'],
        ['pansuman', 'dressing'],
        ['yara', 'wound'],
        ['bakım', 'care'],
        ['bakımı', 'care'],
        ['bandaj', 'bandage'],
        ['sarf', 'consumable'],
        ['düzenli', 'organized'],
        ['kolay', 'easy'],
        ['erişilebilir', 'accessible'],
        ['tasarım', 'design'],
        ['ofis', 'office'],
        ['araç', 'vehicle'],
        ['ev', 'home'],
        ['iş', 'work'],
        ['okul', 'school'],
        ['kurumsal', 'institutional'],
    ];

    // ==================== DEEP TRANSLATION ENGINE ====================    // Build optimized lookup structures
    const exactMap = new Map();   // exact matches
    const startsWith = [];        // for prefix-based lookup

    function buildLookups() {
        for (const [tr, en] of tr2en) {
            exactMap.set(tr, en);
            // For shorter terms, track prefix info
            if (tr.length <= 15) {
                startsWith.push({ prefix: tr, en: en, len: tr.length });
            }
        }
        startsWith.sort((a, b) => b.len - a.len);
    }

    /** Deep-walk text nodes and replace known Turkish text with English */
    function deepTranslate(root) {
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip script/style tags and empty nodes
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    const tag = parent.tagName;
                    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'CODE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // Skip elements that already have data-i18n (handled by primary system)
                    if (parent.hasAttribute && parent.hasAttribute('data-i18n')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // Check if any ancestor has data-i18n or data-i18n-skip
                    let p = parent;
                    while (p && p !== root) {
                        if (p.hasAttribute) {
                            if (p.hasAttribute('data-i18n')) return NodeFilter.FILTER_REJECT;
                            if (p.hasAttribute('data-i18n-skip')) return NodeFilter.FILTER_REJECT;
                        }
                        p = p.parentElement;
                    }
                    // Skip language switcher buttons
                    if (parent.classList && parent.classList.contains('lang-switch-btn')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (parent.classList && parent.classList.contains('lang-switcher')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    const text = node.textContent.trim();
                    if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
                    // Skip email addresses and phone/fax numbers
                    if (/@/.test(text) || /^\(?\d{3,4}\)?\s*\d{3}\s*\d{2}\s*\d{2}$/.test(text.trim())) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        const replaced = new Set();
        
        // Helper: escape regex special chars
        function escapeRx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
        
        // Helper: build word-boundary regex that works with Turkish chars
        function wordBoundaryRx(word) {
            return new RegExp('(^|[\\s.,!?;:()\\[\\]{}<>"\'\\-–—/])(' + escapeRx(word) + ')(?=[\\s.,!?;:()\\[\\]{}<>"\'\\-–—/]|$)', 'g');
        }
        
        while (node = walker.nextNode()) {
            if (replaced.has(node)) continue;
            let text = node.textContent.trim();
            if (!text) continue;

            let modified = false;
            // Try exact match first
            if (exactMap.has(text)) {
                node.textContent = exactMap.get(text);
                replaced.add(node);
                continue;
            }
            
            // Try phrase replacements (4+ chars only, using word boundaries)
            for (const [tr, en] of tr2en) {
                if (tr.length < 4) continue;
                if (text.includes(tr)) {
                    const rx = wordBoundaryRx(tr);
                    const newText = text.replace(rx, function(m, before) {
                        return before + en;
                    });
                    if (newText !== text) {
                        text = newText;
                        modified = true;
                    }
                }
            }
            
            // Also try single-word replacements from startsWith
            for (const { prefix, en, len } of startsWith) {
                if (len < 4) continue;
                if (text.includes(prefix)) {
                    const rx = wordBoundaryRx(prefix);
                    const newText = text.replace(rx, function(m, before) {
                        return before + en;
                    });
                    if (newText !== text) {
                        text = newText;
                        modified = true;
                    }
                }
            }
            
            if (modified) {
                node.textContent = text;
                replaced.add(node);
            }
        }
    }

    // Listen for language changes and apply deep translation
    document.documentElement.addEventListener('i18nChanged', function(e) {
        if (e.detail.lang === 'en') {
            // Small delay to let the primary i18n system finish
            setTimeout(() => deepTranslate(document.body), 50);
        }
    });

    // Also run on initial page load in case language is already set to EN
    const storedLang = localStorage.getItem('almed_lang');
    if (storedLang === 'en') {
        // Will be triggered by i18nChanged event from primary system
    }

    buildLookups();
    console.log('[i18n-deep] Deep translation engine ready with ' + tr2en.length + ' terms');
})();

#!/usr/bin/env python3
"""
Almed Medikal - Urun Yonetim Sunucusu
Calistir: python urun-admin.py
Ac: http://localhost:8765
"""
import json, os, re, sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse, quote
from datetime import datetime
import urllib.request


def clean_html(s):
    """Strip HTML tags and clean whitespace."""
    s = re.sub(r'<br\s*/?>', '\n', s, flags=re.IGNORECASE)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'&nbsp;', ' ', s)
    s = re.sub(r'&amp;', '&', s)
    s = re.sub(r'&lt;', '<', s)
    s = re.sub(r'&gt;', '>', s)
    s = re.sub(r'&quot;', '"', s)
    s = re.sub(r'&#\d+;', '', s)
    s = re.sub(r'[ \t]+', ' ', s)
    return '\n'.join(l.strip() for l in s.splitlines() if l.strip())


def scrape_product(url):
    """Fetch a product page and extract title, description, specs, usage, images."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        'Referer': 'https://www.atotest.com.tr/',
        'Accept': 'text/html,application/xhtml+xml,*/*;q=0.9',
        'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.8',
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=20) as r:
        content = r.read()
        
    # Dynamically detect charset to prevent Turkish character corruption (like replacement chars)
    charset = r.headers.get_content_charset()
    if not charset:
        # Scan first 4000 bytes for charset meta
        try:
            head_chunk = content[:4000].decode('utf-8', errors='ignore')
            charset_m = re.search(r'charset=["\']?([^"\' >]+)', head_chunk, re.IGNORECASE)
            if charset_m:
                charset = charset_m.group(1).strip()
        except:
            pass
    if not charset:
        charset = 'utf-8'
        
    try:
        html = content.decode(charset, errors='replace')
    except:
        html = content.decode('utf-8', errors='replace')

    # Convert corrupt Turkish HTML entities and standard entities
    import html as html_lib
    html = html.replace('&inildibar;', 'ı')
    html = html.replace('&Inildibar;', 'İ')
    html = html_lib.unescape(html)

    result = {
        'title': '',
        'description': '',
        'category': '',
        'brand': '',
        'specs': '',
        'usage': '',
        'images': [],
    }

    # --- Title ---
    h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL | re.IGNORECASE)
    if h1_m:
        result['title'] = clean_html(h1_m.group(1)).strip()
    else:
        h2_m = re.search(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL | re.IGNORECASE)
        if h2_m:
            result['title'] = clean_html(h2_m.group(1)).strip()
        else:
            t = re.search(r'<title[^>]*>([^<]+)</title>', html, re.IGNORECASE)
            if t:
                raw = t.group(1).strip()
                raw = re.sub(r'\s*[-|]\s*(Atotest|Almed).*$', '', raw, flags=re.IGNORECASE).strip()
                result['title'] = raw

    if result['title']:
        result['title'] = " ".join(result['title'].split())

    # --- Category ---
    cat_m = re.search(r'kategoriler\.php\?kid=\d+[^>]*>([^<]{3,60})<', html)
    if cat_m:
        result['category'] = cat_m.group(1).strip()

    # Helper function to extract content between tab IDs / data-tabs
    def extract_tab_content(tab_id):
        content_start = html.find('class="tab-cont"')
        if content_start == -1:
            content_start = html.find('class="tab-content-wrap"')
        if content_start == -1:
            content_start = 0
            
        idx = html.find(f'data-tab="{tab_id}"', content_start)
        if idx == -1:
            idx = html.find(f"data-tab='{tab_id}'", content_start)
        if idx == -1:
            idx = html.find(f'id="{tab_id}"', content_start)
        if idx == -1:
            idx = html.find(f"id='{tab_id}'", content_start)
        if idx == -1:
            return ""
            
        tag_start = html.rfind('<', 0, idx)
        if tag_start != -1 and (idx - tag_start) < 150:
            idx = tag_start
            
        next_idx = html.find('data-tab="tab', idx + 50)
        if next_idx == -1:
            next_idx = html.find("data-tab='tab", idx + 50)
        if next_idx == -1:
            next_idx = html.find('id="tab', idx + 50)
        if next_idx == -1:
            next_idx = html.find('class="tab-pane"', idx + 50)
        if next_idx == -1:
            next_idx = html.find('</div>', idx + 50)
            
        if next_idx != -1 and next_idx > idx:
            return html[idx:next_idx]
        return html[idx:idx+15000]

    # --- Description: tab0 ---
    tab0_html = extract_tab_content('tab0')
    if tab0_html:
        result['description'] = clean_html(tab0_html)
    else:
        tab1_idx = html.find('id="tab1"')
        if tab1_idx != -1:
            next_tab = html.find('class="tab-pane"', tab1_idx + 10)
            if next_tab == -1: next_tab = html.find('id="tab2"', tab1_idx + 10)
            result['description'] = clean_html(html[tab1_idx:next_tab] if next_tab != -1 else html[tab1_idx:tab1_idx+8000])

    # --- Usage: tab2 ---
    tab2_html = extract_tab_content('tab2')
    if tab2_html:
        lis = re.findall(r'<li[^>]*>(.*?)</li>', tab2_html, re.DOTALL)
        if lis:
            result['usage'] = "\n".join([clean_html(li) for li in lis if li.strip()])
        else:
            result['usage'] = clean_html(tab2_html)
    
    if not result['usage'].strip():
        usage_lines = []
        for keyword in ["Kullanım Alanları", "Kullanım Yerleri", "Uygulama Alanları"]:
            keyword_m = re.search(rf'(?:<h3>|<h2>|<strong>|<b>)[^<]*{keyword}[^<]*(?:</h3>|</h2>|</strong>|</b>)', html, re.IGNORECASE)
            if keyword_m:
                chunk = html[keyword_m.end():keyword_m.end()+3000]
                ul_m = re.search(r'<ul[^>]*>(.*?)</ul>', chunk, re.DOTALL | re.IGNORECASE)
                if ul_m:
                    lis = re.findall(r'<li[^>]*>(.*?)</li>', ul_m.group(1), re.DOTALL)
                    usage_lines = [clean_html(li) for li in lis if li.strip()]
                    break
        if not usage_lines and result.get('description'):
            for l in result['description'].split('\n'):
                l_clean = l.strip('•- ')
                if l.startswith('•') or l.startswith('-') or any(kw in l_clean.lower() for kw in ['kullanım', 'uygulama', 'alanlar', 'ideal']):
                    if 8 < len(l_clean) < 150: usage_lines.append(l_clean)
        result['usage'] = "\n".join(usage_lines[:10])

    # --- Specs: tab3 ---
    tab3_html = extract_tab_content('tab3')
    if not tab3_html:
        tab3_html = extract_tab_content('tab2')
        if not tab3_html:
            tab3_html = html

    tables = re.findall(r'<table[^>]*>(.*?)</table>', tab3_html, re.DOTALL)
    specs_lines = []
    seen_labels = set()
    for table in tables:
        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table, re.DOTALL)
        for row in rows:
            cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', row, re.DOTALL)
            clean_cells = [clean_html(c).strip() for c in cells]
            clean_cells = [c for c in clean_cells if c]
            if len(clean_cells) >= 2:
                label = clean_cells[0]
                value = clean_cells[1]
                if len(label) < 80 and len(value) < 500 and label not in seen_labels:
                    seen_labels.add(label)
                    specs_lines.append(f"{label}: {value}")
                    
    if not specs_lines and tab3_html:
        lis = re.findall(r'<li[^>]*>(.*?)</li>', tab3_html, re.DOTALL)
        if lis:
            specs_lines = [clean_html(li) for li in lis if li.strip()]
        else:
            specs_lines = [clean_html(tab3_html)]
            
    result['specs'] = "\n".join(specs_lines)

    # --- Images ---
    imgs = re.findall(r'(?:yuklenen|upload)/[^\s"\'>]+\.(?:jpg|jpeg|png|webp|gif)', html, re.IGNORECASE)
    imgs = list(dict.fromkeys(imgs))
    full_imgs = []
    base = re.match(r'(https?://[^/]+)', url)
    base_url = base.group(1) if base else ''
    for img in imgs:
        full_imgs.append(base_url + '/' + img if not img.startswith('http') else img)
    og = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if og and og.group(1) not in full_imgs:
        full_imgs.insert(0, og.group(1))
    result['images'] = full_imgs[:8]

    # --- Brand ---
    known_brands = ['TSI', 'Synbiosis', 'Meco', 'Sievers', 'Biochrom', 'PMS', 'Suez', 'Lighthouse', 'BioTrak', 'AeroTrak', 'Trio', 'Lasair']
    for brand in known_brands:
        if brand.lower() in (result['title'] + ' ' + result['description']).lower():
            result['brand'] = brand
            break

    return result

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CATEGORIES = [
    ("kbrn",                                    "KBRN",                                         "fa-shield-virus"),
    ("ilkyardim",                               "Ilk Yardim",                                   "fa-kit-medical"),
    ("arge",                                    "Ar-Ge",                                         "fa-dna"),
]

def slugify(text):
    text = text.lower()
    replacements = [
        ('\u00e7','c'),('\u011f','g'),('\u0131','i'),('\u0069','i'),('\u00f6','o'),('\u015f','s'),('\u00fc','u'),
        ('\u00c7','c'),('\u011e','g'),('\u0130','i'),('\u00d6','o'),('\u015e','s'),('\u00dc','u')
    ]
    for k,v in replacements: text = text.replace(k,v)
    return re.sub(r'[^a-z0-9]+','-', text).strip('-')

def build_detail_page(lang, title, cat_name, intro, img_url, specs_content, usage_content, brand, filename, gallery_images=None):
    is_tr = lang == 'tr'
    back_text   = "Ürün Kataloğuna Dön" if is_tr else "Back to Product Catalog"
    home_text   = "Anasayfa"             if is_tr else "Home"
    corp_text   = "Kurumsal"             if is_tr else "Corporate"
    prod_text   = "Ürünler"              if is_tr else "Products"
    cont_text   = "İletişim"             if is_tr else "Contact"
    spec_title  = "Teknik Detaylar"      if is_tr else "Technical Details"
    usage_title = "Kullanım Alanları"    if is_tr else "Usage Areas"
    quick_text  = "HIZLI ERİŞİM"         if is_tr else "QUICK ACCESS"
    copy_text   = "Tüm hakları saklıdır." if is_tr else "All rights reserved."
    css_prefix  = "css/style.css"       if is_tr else "../css/style.css"
    fav_prefix  = "favicon.png"         if is_tr else "../favicon.png"
    img_prefix  = "images"              if is_tr else "../images"
    back_href   = "urunler.html"        if is_tr else "../urunler.html"
    home_href   = "index.html"          if is_tr else "../index.html"
    urun_href   = "urunler.html"        if is_tr else "../urunler.html"
    ilt_href    = "iletisim.html"       if is_tr else "../iletisim.html"
    js_i18n     = "js/i18n.js"          if is_tr else "../js/i18n.js"
    js_main     = "js/main.js"          if is_tr else "../js/main.js"
    logo_src    = f"{img_prefix}/logosirketisimli.png"


    desc_title = "Ürün Detayı" if is_tr else "Product Details"
    desc_section = ""
    if intro.strip():
        # Convert newline formatting to brs or wrap paragraphs
        formatted_desc = intro.replace('\n', '<br>')
        desc_section = f"""<h2 style="font-size:1.3rem;font-weight:800;margin-bottom:18px;">{desc_title}</h2>
<div class="desc-box" style="line-height:1.7;font-size:0.95rem;color:var(--text-secondary);background:var(--white);border:1px solid var(--border-light);border-radius:8px;padding:24px;box-shadow:var(--shadow-sm);margin-bottom:24px">
{formatted_desc}
</div>"""

    # Generate Usage HTML panel
    usage_html = ""
    if usage_content.strip():
        items = [l.strip() for l in usage_content.split('\n') if l.strip()]
        li_items = "".join([f'<li><i class="fa-solid fa-arrow-right"></i><span>{item}</span></li>' for item in items])
        usage_html = f"""<section class="info-panel reveal" style="background:var(--white);border:1px solid var(--border-light);border-radius:8px;padding:24px;box-shadow:var(--shadow-sm);margin-top:24px">
<h2 style="font-family:var(--font-heading);font-size:1.25rem;margin-bottom:14px;">{usage_title}</h2>
<ul class="info-list" style="list-style:none;padding:0;margin:0;display:grid;gap:10px">
{li_items}
</ul>
</section>"""

    # Generate Specs Box
    specs_section = ""
    if specs_content.strip():
        formatted_specs = specs_content.replace('\n', '<br>')
        specs_section = f"""<h2 style="font-size:1.3rem;font-weight:800;margin-bottom:18px;">{spec_title}</h2>
<div class="specs-box" style="line-height:1.7;font-size:0.95rem;color:var(--text-secondary);background:var(--white);border:1px solid var(--border-light);border-radius:8px;padding:24px;box-shadow:var(--shadow-sm)">
{formatted_specs}
</div>"""

    # Generate Gallery HTML matching ilkyardim-cantasi.html
    gallery_html = ""
    gallery_script = ""
    if gallery_images:
        gallery_title = "Ürün Görselleri" if is_tr else "Product Images"
        items_html = ""
        for img in gallery_images:
            items_html += f"""<div class="gallery-item"><img src="{img}" alt="{title} görseli" loading="lazy" decoding="async"></div>"""
        
        if items_html:
            gallery_html = f"""<section class="gallery-section reveal">
<h2 data-i18n="kd.gallery.title">{gallery_title}</h2>
<div class="gallery-grid">
{items_html}
</div>
</section>"""

            # Lightbox overlay HTML and JS script
            gallery_script = """
<div class="lightbox-overlay" id="lightbox">
    <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
    <button class="lightbox-nav prev" onclick="lightboxPrev()"><i class="fa-solid fa-chevron-left"></i></button>
    <img src="" alt="" id="lightboxImg" draggable="false">
    <button class="lightbox-nav next" onclick="lightboxNext()"><i class="fa-solid fa-chevron-right"></i></button>
    <div class="lightbox-controls">
        <button onclick="lightboxZoom(-0.2)" title="Uzaklaştır" data-i18n-title="lb.zoomout"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
        <span class="zoom-level" id="zoomLevel">%100</span>
        <button onclick="lightboxZoom(0.2)" title="Yakınlaştır" data-i18n-title="lb.zoomin"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
        <button onclick="lightboxZoom(0)" title="Sıfırla" data-i18n-title="lb.reset"><i class="fa-solid fa-arrows-to-dot"></i></button>
    </div>
</div>
<script>
(function(){
  var imgs=[],idx=0,scale=1,overlay=document.getElementById('lightbox'),lbImg=document.getElementById('lightboxImg'),zl=document.getElementById('zoomLevel');
  document.querySelectorAll('.gallery-item img').forEach(function(img,i){
    img.addEventListener('click',function(e){
      e.stopPropagation();
      imgs=[];
      document.querySelectorAll('.gallery-item img').forEach(function(im){imgs.push(im.src)});
      idx=i;
      scale=1;
      openLightboxIdx()
    })
  });
  function openLightboxIdx(){
    lbImg.src=imgs[idx];
    lbImg.style.transform='scale(1)';
    scale=1;
    zl.textContent='%100';
    overlay.classList.add('active');
    document.body.style.overflow='hidden'
  }
  window.closeLightbox=function(){
    overlay.classList.remove('active');
    document.body.style.overflow=''
  };
  window.lightboxPrev=function(){
    idx=(idx-1+imgs.length)%imgs.length;
    scale=1;
    lbImg.style.transform='scale(1)';
    zl.textContent='%100';
    lbImg.src=imgs[idx]
  };
  window.lightboxNext=function(){
    idx=(idx+1)%imgs.length;
    scale=1;
    lbImg.style.transform='scale(1)';
    zl.textContent='%100';
    lbImg.src=imgs[idx]
  };
  window.lightboxZoom=function(d){
    if(d===0){scale=1}else{scale=Math.max(.2,Math.min(4,scale+d))}
    lbImg.style.transform='scale('+scale+')';
    zl.textContent='%'+Math.round(scale*100)
  };
  overlay.addEventListener('click',function(e){
    if(e.target===overlay)closeLightbox()
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape')closeLightbox();
    if(e.key==='ArrowLeft')lightboxPrev();
    if(e.key==='ArrowRight')lightboxNext();
    if(e.key==='+'||e.key==='='){e.preventDefault();lightboxZoom(.2)};
    if(e.key==='-'){e.preventDefault();lightboxZoom(-.2)}
  });
  lbImg.addEventListener('wheel',function(e){
    e.preventDefault();
    lightboxZoom(e.deltaY<0?.2:-.2)
  })
})();
</script>
"""

    # Layout detail content in grid
    detail_body_html = f"""<div style="display:grid;grid-template-columns:1fr;gap:24px">
{desc_section}
{specs_section}
{usage_html}
{gallery_html}
</div>"""

    brand_line = f'<span style="font-size:.85rem;color:var(--text-secondary);font-weight:600;display:block;margin-bottom:6px;">{brand}</span>' if brand else ""

    return f"""<!DOCTYPE html><html lang="{lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="{intro[:150]}"><title>{title} - Almed Medikal</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><link rel="stylesheet" href="{css_prefix}"><link rel="icon" type="image/png" href="{fav_prefix}"><style>
.detail-hero{{position:relative;z-index:1;background:var(--gradient-hero);padding:122px 32px 46px}}.detail-hero .back-link{{display:inline-flex;align-items:center;gap:8px;color:var(--primary);text-decoration:none;font-weight:700;font-size:.9rem;margin-bottom:26px;transition:gap .2s}}.detail-hero .back-link:hover{{gap:12px}}.product-hero-grid{{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(320px,.95fr);gap:42px;align-items:center}}.detail-tag{{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:var(--primary-bg);color:var(--primary);border-radius:var(--radius-full);font-size:.75rem;font-weight:800}}.detail-title{{font-family:var(--font-heading);font-size:clamp(2rem,4vw,3.1rem);line-height:1.12;margin:16px 0 14px}}.detail-intro{{color:var(--text-secondary);font-size:1.05rem;line-height:1.75;max-width:720px}}.hero-visual{{background:var(--white);border:1px solid var(--border-light);border-radius:8px;min-height:350px;display:flex;align-items:center;justify-content:center;padding:32px;box-shadow:var(--shadow-lg)}}.hero-visual img{{max-width:100%;max-height:330px;object-fit:contain;display:block}}.detail-content{{position:relative;z-index:1;padding:44px 32px 82px}}
.info-list li{{display:flex;gap:10px;color:var(--text-secondary);line-height:1.6;font-size:.93rem}}.info-list i{{color:var(--primary);margin-top:5px;flex:0 0 auto;font-size:.75rem}}
.led-bar,.footer{{position:relative;z-index:1}}@media(max-width:900px){{.product-hero-grid{{grid-template-columns:1fr}}}}
.gallery-section{{margin-top:34px}}.gallery-section h2{{font-family:var(--font-heading);font-size:1.35rem;margin-bottom:14px}}.gallery-grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px}}.gallery-item{{background:var(--white);border:1px solid var(--border-light);border-radius:8px;min-height:180px;padding:16px;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-sm)}}.gallery-item img{{max-width:100%;max-height:180px;object-fit:contain;display:block;cursor:pointer}}
/* === Lightbox === */
.lightbox-overlay{{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}}.lightbox-overlay.active{{opacity:1;visibility:visible}}.lightbox-overlay img{{max-width:90vw;max-height:85vh;object-fit:contain;transition:transform .3s var(--ease-out);cursor:grab;box-shadow:0 0 60px rgba(0,102,204,.15);border-radius:4px}}.lightbox-overlay img:active{{cursor:grabbing}}.lightbox-close{{position:absolute;top:22px;right:28px;font-size:2rem;color:#fff;cursor:pointer;z-index:10;width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(255,255,255,.08);transition:background .2s}}.lightbox-close:hover{{background:rgba(255,255,255,.18)}}.lightbox-controls{{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.1);border-radius:var(--radius-full);padding:10px 20px;backdrop-filter:blur(8px)}}.lightbox-controls button{{background:none;border:none;color:#fff;font-size:1.3rem;cursor:pointer;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background .2s}}.lightbox-controls button:hover{{background:rgba(255,255,255,.15)}}.lightbox-controls .zoom-level{{color:#fff;font-size:.8rem;font-weight:600;min-width:48px;text-align:center}}.lightbox-nav{{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.08);border:none;color:#fff;font-size:1.8rem;cursor:pointer;width:50px;height:50px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background .2s}}.lightbox-nav:hover{{background:rgba(255,255,255,.18)}}.lightbox-nav.prev{{left:20px}}.lightbox-nav.next{{right:20px}}
</style></head><body>
<div id="preloader"><img src="{fav_prefix}" alt="Almed Medikal" class="preloader-logo"><div class="preloader-bar"></div></div>
<div class="top-bar"><div class="top-bar-inner"><span><i class="fa-solid fa-phone"></i> (0312) 311 50 14</span><span><i class="fa-solid fa-envelope"></i> iletisim@almedmedikal.com.tr</span></div></div>
<nav class="navbar"><div class="nav-container"><a href="{home_href}" class="nav-logo"><img src="{logo_src}" alt="Almed Medikal"></a><ul class="nav-links"><li><a href="{home_href}">{home_text}</a></li><li><a href="{home_href}#neden-biz">{corp_text}</a></li><li><a href="{urun_href}" class="active btn-nav">{prod_text}</a></li><li><a href="{ilt_href}">{cont_text}</a></li></ul><button class="menu-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></nav>
<div class="led-bar led-bar-top"><div class="led-beam"></div></div>
<section class="detail-hero"><div class="container"><a href="{back_href}" class="back-link"><i class="fa-solid fa-arrow-left"></i> {back_text}</a><div class="product-hero-grid"><div><span class="detail-tag"><i class="fa-solid fa-microscope"></i> {cat_name}</span>{brand_line}<h1 class="detail-title">{title}</h1></div><div class="hero-visual"><img src="{img_url}" alt="{title}" id="main-product-img"></div></div></div></section>
<section class="detail-content"><div class="container">{detail_body_html}</div></section>
<div class="led-bar led-bar-bottom"><div class="led-beam"></div></div>
<footer class="footer"><div class="footer-grid" style="grid-template-columns:2fr 1fr;"><div class="footer-col"><img src="{logo_src}" alt="Almed Medikal" class="footer-logo-img"><ul class="footer-address"><li><i class="fa-solid fa-location-dot"></i>Mebusevleri Mah. Turgut Reis Caddesi No:6/4 Çankaya / Ankara</li><li><i class="fa-solid fa-phone"></i>(0312) 311 50 14</li><li><i class="fa-solid fa-envelope"></i>iletisim@almedmedikal.com.tr</li></ul></div><div class="footer-col"><h4>{quick_text}</h4><ul class="footer-links"><li><a href="{home_href}">{home_text}</a></li><li><a href="{urun_href}">{prod_text}</a></li><li><a href="{ilt_href}">{cont_text}</a></li></ul></div></div><div class="footer-bottom"><p>&copy; 2026 Almed Medikal. {copy_text}</p></div></footer>
<script src="{js_i18n}"></script><script src="{js_main}"></script>{gallery_script}</body></html>"""


def inject_product(data):
    title_tr   = data.get('title_tr','').strip()
    title_en   = data.get('title_en','').strip() or title_tr
    cat_slug   = data.get('cat_slug','').strip()
    cat_name_tr= data.get('cat_name_tr','').strip()
    cat_name_en= data.get('cat_name_en','').strip() or cat_name_tr
    # Fallback: kategori adi bossa slug'i gosterim adi olarak kullan
    if not cat_name_tr:
        cat_name_tr = cat_slug
    if not cat_name_en:
        cat_name_en = cat_slug
    intro_tr   = data.get('intro_tr','').strip()
    intro_en   = data.get('intro_en','').strip() or intro_tr
    img_url    = data.get('img_url','').strip()
    brand      = data.get('brand','').strip()
    icon       = data.get('icon','fa-microscope').strip() or 'fa-microscope'
    specs_tr   = data.get('specs_tr','').strip()
    specs_en   = data.get('specs_en','').strip() or specs_tr
    usage_tr   = data.get('usage_tr','').strip()
    usage_en   = data.get('usage_en','').strip() or usage_tr

    if not title_tr: raise ValueError("Urun basligi bos olamaz")
    if not cat_slug: raise ValueError("Kategori secilmedi")

    slug = slugify(title_tr)
    filename = f"{slug}.html"

    gallery_urls_raw = data.get('gallery_urls','').strip()
    gallery_images = [u.strip() for u in gallery_urls_raw.split('\n') if u.strip()]

    # TR detay sayfasi
    tr_page = build_detail_page('tr', title_tr, cat_name_tr, intro_tr, img_url, specs_tr, usage_tr, brand, filename, gallery_images)
    with open(os.path.join(BASE_DIR, filename), 'w', encoding='utf-8') as f: f.write(tr_page)

    # EN detay sayfasi
    en_page = build_detail_page('en', title_en, cat_name_en, intro_en, img_url, specs_en, usage_en, brand, filename, gallery_images)
    en_dir = os.path.join(BASE_DIR, 'en')
    os.makedirs(en_dir, exist_ok=True)
    with open(os.path.join(en_dir, filename), 'w', encoding='utf-8') as f: f.write(en_page)

    # showcase spec badges from first 3 lines of specs_tr
    lines = [l.strip() for l in specs_tr.split('\n') if l.strip()]
    # Remove HTML tags if any for badges
    clean_lines = [re.sub(r'<[^>]+>', '', l).strip() for l in lines]
    clean_lines = [l for l in clean_lines if l][:3]
    spec_badges = " ".join([f'<span class="showcase-spec">{l}</span>' for l in clean_lines])

    # urunler.html card inject
    card_html = f"""
<!-- PRODUCT:{slug} -->
<div class="showcase-card" data-category="{cat_slug}" onclick="location.href='{filename}'">
    <div class="showcase-img-wrap"><img src="{img_url}" alt="{title_tr}" loading="lazy"></div>
    <div class="showcase-body">
        <span class="showcase-tag">{cat_name_tr}</span>
        <h3>{title_tr}</h3>
        <a href="{filename}" class="showcase-link">Detayli Bilgi <i class="fa-solid fa-arrow-right"></i></a>
    </div>
</div>"""

    urunler_path = os.path.join(BASE_DIR, 'urunler.html')
    with open(urunler_path, 'r', encoding='utf-8') as f: content = f.read()

    # Duplicate kontrolu: ayni slug'a sahip urun zaten varsa hata ver
    if f'<!-- PRODUCT:{slug} -->' in content:
        raise ValueError(f"Bu urun zaten mevcut: {filename}. Once mevcut urunu silin veya duzenleyin.")

    # Sidebar kategori yoksa ekle
    if f'data-filter="{cat_slug}"' not in content:
        sidebar_btn = f'\n<button class="filter-btn" data-filter="{cat_slug}" data-cat-name-en="{cat_name_en}" title="{cat_name_tr}"><i class="fa-solid {icon}"></i> <span>{cat_name_tr}</span> <span class="count">1</span></button>'
        content = content.replace('</aside>', sidebar_btn + '\n</aside>', 1)
    else:
        # count artir
        def inc_cat(m):
            return m.group(0).replace(f'<span class="count">{m.group(1)}</span>',
                f'<span class="count">{int(m.group(1))+1}</span>')
        content = re.sub(
            rf'data-filter="{re.escape(cat_slug)}"[^>]*>.*?<span class="count">(\d+)</span>',
            lambda m: m.group(0)[:-len(f'<span class="count">{m.group(1)}</span>')] + f'<span class="count">{int(m.group(1))+1}</span>',
            content, count=1, flags=re.DOTALL)

    # Toplam sayac artir
    content = re.sub(
        r'(data-filter="all"[^>]*>.*?<span class="count">)(\d+)(</span>)',
        lambda m: m.group(1) + str(int(m.group(2))+1) + m.group(3),
        content, count=1, flags=re.DOTALL)

    # Card'i ekle
    marker = '\n</div></div><div class="led-bar led-bar-bottom">'
    if marker in content:
        content = content.replace(marker, card_html + marker, 1)
    else:
        content = content.replace('</div></div><div class="led-bar led-bar-bottom">',
            card_html + '</div></div><div class="led-bar led-bar-bottom">', 1)

    with open(urunler_path, 'w', encoding='utf-8') as f: f.write(content)

    # EN urunler.html'i de guncelle
    en_urunler_path = os.path.join(BASE_DIR, 'en', 'urunler.html')
    if os.path.exists(en_urunler_path):
        with open(en_urunler_path, 'r', encoding='utf-8') as f: en_content = f.read()

        if f'<!-- PRODUCT:{slug} -->' not in en_content:
            # EN sidebar kategori yoksa ekle
            if f'data-filter="{cat_slug}"' not in en_content:
                en_sidebar_btn = f'\n<button class="filter-btn" data-filter="{cat_slug}" data-cat-name-en="{cat_name_en}" title="{cat_name_en}"><i class="fa-solid {icon}"></i> <span>{cat_name_en}</span> <span class="count">1</span></button>'
                en_content = en_content.replace('</aside>', en_sidebar_btn + '\n</aside>', 1)
            else:
                # EN count artir
                en_content = re.sub(
                    rf'data-filter="{re.escape(cat_slug)}"[^>]*>.*?<span class="count">(\d+)</span>',
                    lambda m: m.group(0)[:-len(f'<span class="count">{m.group(1)}</span>')] + f'<span class="count">{int(m.group(1))+1}</span>',
                    en_content, count=1, flags=re.DOTALL)

            # EN toplam sayac artir
            en_content = re.sub(
                r'(data-filter="all"[^>]*>.*?<span class="count">)(\d+)(</span>)',
                lambda m: m.group(1) + str(int(m.group(2))+1) + m.group(3),
                en_content, count=1, flags=re.DOTALL)

            # EN card
            en_card_html = f"""
<!-- PRODUCT:{slug} -->
<div class="showcase-card" data-category="{cat_slug}" onclick="location.href='{filename}'">
    <div class="showcase-img-wrap"><img src="{img_url}" alt="{title_en}" loading="lazy"></div>
    <div class="showcase-body">
        <span class="showcase-tag">{cat_name_en}</span>
        <h3>{title_en}</h3>
        <a href="{filename}" class="showcase-link">Details <i class="fa-solid fa-arrow-right"></i></a>
    </div>
</div>"""
            en_marker = '\n</div></div><div class="led-bar led-bar-bottom">'
            if en_marker in en_content:
                en_content = en_content.replace(en_marker, en_card_html + en_marker, 1)
            else:
                en_content = en_content.replace('</div></div><div class="led-bar led-bar-bottom">',
                    en_card_html + '</div></div><div class="led-bar led-bar-bottom">', 1)

            with open(en_urunler_path, 'w', encoding='utf-8') as f: f.write(en_content)

    return {'ok': True, 'filename': filename, 'slug': slug}


ADMIN_HTML = r"""<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Almed Medikal - Urun Ekle</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--primary:#0066cc;--primary-dark:#0052a3;--primary-bg:rgba(0,102,204,.08);--bg:#f0f4f8;--surface:#fff;--border:#e2e8f0;--text:#0f172a;--text-muted:#64748b;--success:#10b981;--danger:#ef4444;--radius:10px;--radius-lg:16px;--shadow:0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06);--shadow-lg:0 8px 32px rgba(0,0,0,.12)}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
.admin-header{background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);color:#fff;padding:18px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 2px 16px rgba(0,0,0,.3)}
.logo{display:flex;align-items:center;gap:14px}.logo-icon{width:40px;height:40px;background:var(--primary);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem}.logo h1{font-size:1.05rem;font-weight:800}.logo p{font-size:.72rem;color:rgba(255,255,255,.5);margin-top:1px}
.badge{background:rgba(16,185,129,.15);color:#34d399;border:1px solid rgba(16,185,129,.3);padding:5px 12px;border-radius:20px;font-size:.7rem;font-weight:700;display:flex;align-items:center;gap:6px}
.badge::before{content:'';width:7px;height:7px;background:#10b981;border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.main{max-width:940px;margin:0 auto;padding:28px 20px 80px}
.tabs{display:flex;background:var(--surface);border-radius:var(--radius-lg);padding:5px;gap:4px;margin-bottom:24px;box-shadow:var(--shadow);border:1px solid var(--border)}
.tab-btn{flex:1;padding:10px 12px;border:none;border-radius:8px;background:transparent;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;color:var(--text-muted);cursor:pointer;transition:.2s;display:flex;align-items:center;justify-content:center;gap:7px}
.tab-btn.active{background:var(--primary);color:#fff;box-shadow:0 2px 8px rgba(0,102,204,.35)}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:24px;box-shadow:var(--shadow);margin-bottom:18px}
.card-title{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:var(--primary);margin-bottom:18px;display:flex;align-items:center;gap:8px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-grid.single{grid-template-columns:1fr}
.form-grid.triple{grid-template-columns:1fr 1fr 1fr}
.field{display:flex;flex-direction:column;gap:5px}
.field.full{grid-column:1/-1}
label{font-size:.7rem;font-weight:700;color:var(--text-muted);letter-spacing:.04em;text-transform:uppercase}
.flag{font-size:.62rem;padding:1px 5px;border-radius:3px;font-weight:700;margin-left:3px}
.tr{background:#c8102e;color:#fff}.en{background:#003399;color:#fff}
input[type=text],input[type=url],select,textarea{width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:8px;font-family:'Inter',sans-serif;font-size:.875rem;color:var(--text);background:#fff;transition:.2s;outline:none}
input:focus,select:focus,textarea:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(0,102,204,.1)}
textarea{resize:vertical;min-height:80px;line-height:1.6}
select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%2364748b' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
.img-row{display:flex;gap:12px;align-items:flex-start}
.img-box{width:110px;height:84px;border:1.5px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;background:var(--bg);overflow:hidden;flex-shrink:0}
.img-box img{max-width:100%;max-height:100%;object-fit:contain}
.img-box .ph{color:var(--text-muted);font-size:1.4rem}
.spec-head{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 32px;gap:7px;margin-bottom:5px}
.spec-head span{font-size:.63rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.04em;padding:0 2px}
.spec-row{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 32px;gap:7px;margin-bottom:6px;align-items:center}
.spec-row input{padding:7px 9px;font-size:.8rem}
.btn-rm{width:32px;height:32px;border:none;border-radius:6px;background:#fee2e2;color:var(--danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.15s}
.btn-rm:hover{background:var(--danger);color:#fff}
.btn-add-row{margin-top:6px;display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border:1.5px dashed var(--border);border-radius:8px;background:transparent;color:var(--text-muted);font-size:.76rem;font-weight:600;cursor:pointer;transition:.2s;font-family:'Inter',sans-serif}
.btn-add-row:hover{border-color:var(--primary);color:var(--primary);background:var(--primary-bg)}
.actions{display:flex;gap:10px;align-items:center;justify-content:flex-end;padding-top:6px}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:var(--primary);color:#fff;border:none;border-radius:10px;font-family:'Inter',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer;transition:.2s;box-shadow:0 2px 8px rgba(0,102,204,.3)}
.btn-primary:hover{background:var(--primary-dark);transform:translateY(-1px)}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-sec{display:inline-flex;align-items:center;gap:7px;padding:11px 18px;background:transparent;color:var(--text-muted);border:1.5px solid var(--border);border-radius:10px;font-family:'Inter',sans-serif;font-size:.85rem;font-weight:600;cursor:pointer;transition:.2s}
.btn-sec:hover{border-color:var(--primary);color:var(--primary)}
#toast{position:fixed;bottom:24px;right:24px;padding:13px 18px;border-radius:12px;font-weight:700;font-size:.86rem;display:flex;align-items:center;gap:10px;z-index:9999;transform:translateY(80px);opacity:0;transition:.3s cubic-bezier(.22,.61,.36,1);max-width:340px;box-shadow:var(--shadow-lg)}
#toast.show{transform:translateY(0);opacity:1}
#toast.ok{background:#ecfdf5;color:#065f46;border:1.5px solid #6ee7b7}
#toast.err{background:#fef2f2;color:#991b1b;border:1.5px solid #fca5a5}
.plist{display:flex;flex-direction:column;gap:10px}
.pitem{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px 16px;display:flex;align-items:center;gap:14px;box-shadow:var(--shadow)}
.pitem img{width:56px;height:42px;object-fit:contain;border-radius:6px;border:1px solid var(--border);background:var(--bg);flex-shrink:0}
.pinfo{flex:1}.pinfo h4{font-size:.88rem;font-weight:700;margin-bottom:2px}.pinfo span{font-size:.7rem;color:var(--text-muted);font-weight:600}
.btn-sm{padding:5px 11px;border:none;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:5px;transition:.15s;font-family:'Inter',sans-serif;background:var(--primary-bg);color:var(--primary)}
.btn-sm:hover{background:var(--primary);color:#fff}
.empty{text-align:center;padding:44px 0;color:var(--text-muted)}.empty i{font-size:2.2rem;margin-bottom:10px;display:block;opacity:.25}
input[readonly]{background:#f8fafc;color:var(--text-muted)}
</style>
</head>
<body>
<header class="admin-header">
  <div class="logo">
    <div class="logo-icon"><i class="fa-solid fa-layer-group" style="color:#fff"></i></div>
    <div><h1>Almed Medikal</h1><p>Urun Yonetim Paneli</p></div>
  </div>
  <div class="badge"><i class="fa-solid fa-circle-check"></i> Yerel Sunucu Aktif</div>
</header>

<main class="main">
  <div class="tabs">
    <button class="tab-btn active" onclick="showTab('add')" id="tab-add">
      <i class="fa-solid fa-plus-circle"></i> Yeni Urun Ekle
    </button>
    <button class="tab-btn" onclick="showTab('list')" id="tab-list">
      <i class="fa-solid fa-list-ul"></i> Mevcut Urunler
    </button>
  </div>

  <div id="pane-add">
      <div class="card" style="border:2px solid var(--primary);background:linear-gradient(135deg,rgba(0,102,204,.04) 0%,#fff 100%)">
        <div class="card-title" style="color:#0052a3"><i class="fa-solid fa-bolt"></i> Otomatik Doldur (Scraper)</div>
        <div style="display:flex;gap:10px;align-items:flex-end">
          <div class="field" style="flex:1">
            <label>Urun Sayfasi URL</label>
            <input type="url" id="scrape-url" placeholder="https://www.atotest.com.tr/detay.php?uid=1725454652" style="font-size:.82rem">
          </div>
          <button type="button" id="scrape-btn" onclick="doScrape()" style="padding:9px 20px;background:var(--primary);color:#fff;border:none;border-radius:8px;font-family:Inter,sans-serif;font-size:.85rem;font-weight:700;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:7px;transition:.2s;flex-shrink:0">
            <i class="fa-solid fa-bolt"></i> Cek ve Doldur
          </button>
        </div>
        <div id="scrape-status" style="margin-top:10px;font-size:.78rem;color:var(--text-muted)"></div>
        <!-- Image gallery picker (shown after scrape) -->
        <div id="img-gallery" hidden style="margin-top:14px">
          <label style="font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--text-muted);display:block;margin-bottom:8px">Galeriye Eklenecek Diğer Görselleri Seçin</label>
          <div id="img-gallery-inner" style="display:flex;flex-wrap:wrap;gap:8px"></div>
        </div>
      </div>

      <form id="pf" onsubmit="submitForm(event)">

      <div class="card">
        <div class="card-title"><i class="fa-solid fa-circle-info"></i> Temel Bilgiler</div>
        <div class="form-grid">
          <div class="field">
            <label>Urun Basligi <span class="flag tr">TR</span></label>
            <input type="text" name="title_tr" placeholder="Urun adi Turkce" required oninput="updateSlug(this)">
          </div>
          <div class="field">
            <label>Urun Basligi <span class="flag en">EN</span></label>
            <input type="text" name="title_en" placeholder="Product title in English">
          </div>
          <div class="field">
            <label>Marka / Uretici</label>
            <input type="text" name="brand" placeholder="TSI, Synbiosis, Meco...">
          </div>
          <div class="field">
            <label>Dosya Adi (otomatik)</label>
            <input type="text" name="slug_preview" id="slug-prev" placeholder="urun-adi.html" readonly>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><i class="fa-solid fa-tag"></i> Kategori</div>
        <div class="form-grid triple">
          <div class="field">
            <label>Kategori</label>
            <select name="cat_slug" id="cat-sel" onchange="fillCat(this)" required>
              <option value="">-- Secin --</option>
              ___CAT_OPTIONS___
              <option value="__new__">+ Yeni Kategori</option>
            </select>
          </div>
          <div class="field">
            <label>Adi <span class="flag tr">TR</span></label>
            <input type="text" name="cat_name_tr" id="cat-tr" placeholder="Kategori adi">
          </div>
          <div class="field">
            <label>Name <span class="flag en">EN</span></label>
            <input type="text" name="cat_name_en" id="cat-en" placeholder="Category name">
          </div>
        </div>
        <div id="new-cat-row" hidden style="display:none;margin-top:12px">
          <div class="form-grid">
            <div class="field">
              <label>Yeni Slug</label>
              <input type="text" name="new_cat_slug" id="new-slug" placeholder="yeni-kategori">
            </div>
            <div class="field">
              <label>Sidebar Ikon</label>
              <select name="icon" id="icon-sel">
                <option value="fa-microscope">fa-microscope</option>
                <option value="fa-flask">fa-flask</option>
                <option value="fa-wind">fa-wind</option>
                <option value="fa-droplet">fa-droplet</option>
                <option value="fa-bacteria">fa-bacteria</option>
                <option value="fa-vial">fa-vial</option>
                <option value="fa-dna">fa-dna</option>
                <option value="fa-chart-line">fa-chart-line</option>
                <option value="fa-temperature-high">fa-temperature-high</option>
                <option value="fa-water">fa-water</option>
                <option value="fa-kit-medical">fa-kit-medical</option>
                <option value="fa-circle-nodes">fa-circle-nodes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><i class="fa-solid fa-images"></i> Ürün Görselleri</div>
        <div class="img-row">
          <div class="img-box" id="img-box"><div class="ph"><i class="fa-solid fa-image"></i></div></div>
          <div class="field" style="flex:1">
            <label>Thumbnail / Ana Görsel URL</label>
            <input type="url" name="img_url" id="img-inp" placeholder="https://www.atotest.com.tr/yuklenen/urunler/..." oninput="prevImg(this.value)" required>
            <small style="color:var(--text-muted);font-size:.68rem;margin-top:3px">İlk çekilen görsel otomatik buraya eklenir. Bu görsel thumbnail olacaktır.</small>
          </div>
        </div>
        <div class="field" style="margin-top:16px">
          <label>Diğer Görseller (Her satıra bir URL)</label>
          <textarea name="gallery_urls" id="gallery-urls" placeholder="https://www.atotest.com.tr/...&#10;https://www.atotest.com.tr/..." rows="3"></textarea>
          <small style="color:var(--text-muted);font-size:.68rem;margin-top:3px">Ana görsel haricinde ürün sayfasında galeri olarak listelenecek diğer resimleri ekleyin.</small>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><i class="fa-solid fa-align-left"></i> Aciklama</div>
        <div class="form-grid single">
          <div class="field">
            <label>Aciklama <span class="flag tr">TR</span></label>
            <textarea name="intro_tr" placeholder="Urunun Turkce kisa aciklamasi..." rows="3"></textarea>
          </div>
          <div class="field">
            <label>Description <span class="flag en">EN</span></label>
            <textarea name="intro_en" placeholder="Product short description in English..." rows="3"></textarea>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><i class="fa-solid fa-align-justify"></i> Teknik Detaylar</div>
        <div class="form-grid single">
          <div class="field">
            <label>Teknik Detaylar <span class="flag tr">TR</span></label>
            <textarea name="specs_tr" id="specs-tr" placeholder="Teknik ozellikleri paragraf veya liste olarak buraya ekleyin..." rows="6"></textarea>
          </div>
          <div class="field">
            <label>Technical Details <span class="flag en">EN</span></label>
            <textarea name="specs_en" id="specs-en" placeholder="Enter technical details in English..." rows="6"></textarea>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title"><i class="fa-solid fa-location-dot"></i> Kullanım Alanları</div>
        <div class="form-grid single">
          <div class="field">
            <label>Kullanım Alanları <span class="flag tr">TR</span></label>
            <textarea name="usage_tr" id="usage-tr" placeholder="Her satira bir kullanim alani gelecek sekilde yazin (örn: Saha incelemeleri)..." rows="4"></textarea>
          </div>
          <div class="field">
            <label>Usage Areas <span class="flag en">EN</span></label>
            <textarea name="usage_en" id="usage-en" placeholder="Enter usage areas in English, one per line..." rows="4"></textarea>
          </div>
        </div>
      </div>

      <div class="actions">
        <button type="button" class="btn-sec" onclick="resetForm()"><i class="fa-solid fa-rotate-left"></i> Sifirla</button>
        <button type="submit" class="btn-primary" id="submit-btn"><i class="fa-solid fa-floppy-disk"></i> Siteye Kaydet</button>
      </div>
    </form>
  </div>

  <div id="pane-list" hidden>
    <div class="card">
      <div class="card-title"><i class="fa-solid fa-box-open"></i> Kayitli Urunler</div>
      <div class="plist" id="plist-inner"><div class="empty"><i class="fa-solid fa-spinner fa-spin"></i><p>Yukleniyor...</p></div></div>
    </div>
  </div>
</main>

<div id="toast"></div>

<script>
const CATS = ___CAT_DATA___;

function showTab(t) {
  document.getElementById('pane-add').hidden = t!=='add';
  document.getElementById('pane-list').hidden = t!=='list';
  document.getElementById('tab-add').classList.toggle('active',t==='add');
  document.getElementById('tab-list').classList.toggle('active',t==='list');
  if(t==='list') loadList();
}

function slug(t){
  const m={'c':'c','g':'g','i':'i','o':'o','s':'s','u':'u'};
  return t.toLowerCase()
    .replace(/\u00e7/g,'c').replace(/\u011f/g,'g').replace(/\u0131/g,'i').replace(/\u0069/g,'i')
    .replace(/\u00f6/g,'o').replace(/\u015f/g,'s').replace(/\u00fc/g,'u')
    .replace(/\u00c7/g,'c').replace(/\u011e/g,'g').replace(/\u0130/g,'i')
    .replace(/\u00d6/g,'o').replace(/\u015e/g,'s').replace(/\u00dc/g,'u')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

function updateSlug(el){
  const s=slug(el.value);
  document.getElementById('slug-prev').value=s?s+'.html':'';
}

function fillCat(sel){
  const v=sel.value;
  const nr=document.getElementById('new-cat-row');
  if(v==='__new__'){nr.hidden=false;nr.style.display='';document.getElementById('cat-tr').readOnly=false;document.getElementById('cat-en').readOnly=false;document.getElementById('cat-tr').value='';document.getElementById('cat-en').value='';return;}
  nr.hidden=true;nr.style.display='none';
  const c=CATS.find(x=>x[0]===v);
  if(c){document.getElementById('cat-tr').value=c[1];document.getElementById('cat-en').value=c[2]||c[1];document.getElementById('cat-tr').readOnly=true;document.getElementById('cat-en').readOnly=false;}
  else{document.getElementById('cat-tr').value='';document.getElementById('cat-en').value='';document.getElementById('cat-tr').readOnly=false;document.getElementById('cat-en').readOnly=false;}
}

function prevImg(u){
  const b=document.getElementById('img-box');
  if(!u){b.innerHTML='<div class="ph"><i class="fa-solid fa-image"></i></div>';return;}
  b.innerHTML='<img src="'+u+'" onerror="this.parentNode.innerHTML=\'<div class=ph><i class=\\"fa-solid fa-image\\"></i></div>\'">';
}

function resetForm(){
  document.getElementById('pf').reset();
  document.getElementById('img-box').innerHTML='<div class="ph"><i class="fa-solid fa-image"></i></div>';
  document.getElementById('slug-prev').value='';
  document.getElementById('scrape-url').value='';
  document.getElementById('scrape-status').innerHTML='';
  document.getElementById('img-gallery').hidden=true;
  document.querySelector('[name=title_en]').value='';
  document.querySelector('[name=intro_en]').value='';
  document.getElementById('specs-tr').value='';
  document.getElementById('specs-en').value='';
  document.getElementById('usage-tr').value='';
  document.getElementById('usage-en').value='';
  document.getElementById('gallery-urls').value='';
  document.getElementById('img-gallery-inner').innerHTML='';
}

async function submitForm(e){
  e.preventDefault();
  const btn=document.getElementById('submit-btn');
  btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Kaydediliyor...';
  const fd=new FormData(e.target);
  const cv=document.getElementById('cat-sel').value;
  if(cv==='__new__'){
    const ns=document.getElementById('new-slug').value.trim();
    if(!ns){toast('Kategori slug bos olamaz!','err');btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Siteye Kaydet';return;}
    fd.set('cat_slug',ns);
  }
  const icon=document.getElementById('icon-sel')?document.getElementById('icon-sel').value:'fa-microscope';
  fd.set('icon',icon);
  try{
    const r=await fetch('/api/add-product',{method:'POST',body:new URLSearchParams(fd)});
    const j=await r.json();
    if(j.ok){toast('Urun basariyla eklendi: '+j.filename,'ok');resetForm();}
    else toast('Hata: '+(j.error||'Bilinmeyen hata'),'err');
  }catch(ex){toast('Sunucu hatasi: '+ex.message,'err');}
  btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Siteye Kaydet';
}

async function doScrape(){
  const url=document.getElementById('scrape-url').value.trim();
  if(!url){toast('URL girin!','err');return;}
  const btn=document.getElementById('scrape-btn');
  const status=document.getElementById('scrape-status');
  btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Cekiliyor...';
  status.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Sayfa yukleniyor...';
  fetch('/api/scrape?url='+encodeURIComponent(url))
    .then(r=>r.json())
    .then(j=>{
      btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-bolt"></i> Cek ve Doldur';
      if(!j.ok){status.innerHTML='<span style="color:var(--danger)"><i class="fa-solid fa-triangle-exclamation"></i> Hata: '+j.error+'</span>';return;}
      const d=j.data;
      if(d.title){
        document.querySelector('[name=title_tr]').value=d.title;
        document.querySelector('[name=title_en]').value=d.title;
        updateSlug(document.querySelector('[name=title_tr]'));
      }
      if(d.brand) document.querySelector('[name=brand]').value=d.brand;
      if(d.description){
        document.querySelector('[name=intro_tr]').value=d.description;
        document.querySelector('[name=intro_en]').value=d.description;
      }
      let detectedCategory = d.category || '';
      const titleLower = (d.title || '').toLowerCase();
      
      // Smart override based on title keywords to bypass source website categorization errors
      if (titleLower.includes('ozmoz') || titleLower.includes('ozmose') || titleLower.includes('su sistem') || titleLower.includes('su arıtma') || titleLower.includes('meco') || titleLower.includes('elektrodeiyonizasyon') || titleLower.includes('water system')) {
        detectedCategory = 'Su Sistemleri';
      } else if (titleLower.includes('partikül') || titleLower.includes('particle') || titleLower.includes('aerotrak') || titleLower.includes('biotrak') || titleLower.includes('fms')) {
        detectedCategory = 'Havada Partikül Sayım Cihazları';
      } else if (titleLower.includes('microx') || titleLower.includes('tepe gazı') || titleLower.includes('tepegazı') || titleLower.includes('headspace')) {
        detectedCategory = 'Tepe Gazı Ölçüm Sistemleri';
      } else if (titleLower.includes('minitoc') || titleLower.includes('toc') || titleLower.includes('organik karbon')) {
        detectedCategory = 'Toplam Organik Karbon Analizörleri';
      } else if (titleLower.includes('aracus') || titleLower.includes('amino asit') || titleLower.includes('amino acid')) {
        detectedCategory = 'Amino Asit Analizörleri';
      } else if (titleLower.includes('ionus') || titleLower.includes('kromotografi') || titleLower.includes('kromatografi') || titleLower.includes('chromatography')) {
        detectedCategory = 'İyon Kromotografisi';
      }

      if (detectedCategory) {
        const catSel = document.getElementById('cat-sel');
        const match = CATS.find(c => 
          c[1].toLowerCase().includes(detectedCategory.toLowerCase().slice(0,8)) || 
          detectedCategory.toLowerCase().includes(c[1].toLowerCase().slice(0,8))
        );
        if (match) {
          catSel.value = match[0];
          fillCat(catSel);
        }
      }
      // Populate textarea specs
      if(d.specs) {
        document.getElementById('specs-tr').value=d.specs;
        document.getElementById('specs-en').value=d.specs;
      } else {
        document.getElementById('specs-tr').value='';
        document.getElementById('specs-en').value='';
      }
      // Populate textarea usage areas
      if(d.usage) {
        document.getElementById('usage-tr').value=d.usage;
        document.getElementById('usage-en').value=d.usage;
      } else {
        document.getElementById('usage-tr').value='';
        document.getElementById('usage-en').value='';
      }
      const gallery=document.getElementById('img-gallery');
      const inner=document.getElementById('img-gallery-inner');
      if(d.images&&d.images.length){
        // The first image is the main image
        if(d.images[0]) {
          document.getElementById('img-inp').value = d.images[0];
          prevImg(d.images[0]);
        }
        
        // The rest are gallery images
        const otherImages = d.images.slice(1);
        if(otherImages.length > 0) {
          inner.innerHTML = otherImages.map((img, i) => `
            <div onclick="toggleGalleryImg('${img}', this)" title="Galeriye eklemek veya çıkarmak için tıklayın" class="gallery-select-item selected" data-url="${img}" style="cursor:pointer;border:2px solid var(--primary);border-radius:8px;overflow:hidden;width:90px;height:68px;display:flex;align-items:center;justify-content:center;background:var(--bg);transition:.15s;position:relative;box-shadow:0 0 0 2px rgba(0,102,204,.25);" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="if(!this.classList.contains('selected')) this.style.borderColor='var(--border)'">
              <img src="${img}" style="max-width:100%;max-height:100%;object-fit:contain" onerror="this.parentNode.style.display='none'">
              <div class="chk-overlay" style="position:absolute;top:4px;right:4px;background:rgba(0,102,204,0.85);color:#fff;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:0.6rem;"><i class="fa-solid fa-check"></i></div>
            </div>`).join('');
          gallery.hidden = false;
          updateGalleryTextarea();
        } else {
          inner.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">Başka görsel bulunamadı.</span>';
          gallery.hidden = false;
          document.getElementById('gallery-urls').value = '';
        }
      } else {
        gallery.hidden = true;
        document.getElementById('gallery-urls').value = '';
      }
      status.innerHTML='<span style="color:var(--success)"><i class="fa-solid fa-check-circle"></i> Tamamlandi! Teknik detaylar ve '+( d.images?d.images.length:0)+' gorsel bulundu.</span>';
    })
    .catch(ex=>{
      btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-bolt"></i> Cek ve Doldur';
      status.innerHTML='<span style="color:var(--danger)"><i class="fa-solid fa-triangle-exclamation"></i> '+ex.message+'</span>';
    });
}

function toggleGalleryImg(url, el, forceState) {
  const chk = el.querySelector('.chk-overlay');
  let selected = el.classList.contains('selected');
  if (forceState !== undefined) {
    selected = !forceState;
  }
  
  if (selected) {
    el.classList.remove('selected');
    el.style.borderColor = 'var(--border)';
    el.style.boxShadow = '';
    if (chk) chk.style.display = 'none';
  } else {
    el.classList.add('selected');
    el.style.borderColor = 'var(--primary)';
    el.style.boxShadow = '0 0 0 2px rgba(0,102,204,.25)';
    if (chk) chk.style.display = 'flex';
  }
  updateGalleryTextarea();
}

function updateGalleryTextarea() {
  const urls = [];
  document.querySelectorAll('.gallery-select-item.selected').forEach(el => {
    urls.push(el.getAttribute('data-url'));
  });
  document.getElementById('gallery-urls').value = urls.join('\n');
}

function pickImg(url){
  document.getElementById('img-inp').value=url;
  prevImg(url);
}

async function loadList(){
  const el=document.getElementById('plist-inner');
  try{
    const r=await fetch('/api/list-products');const j=await r.json();
    if(!j.products||!j.products.length){el.innerHTML='<div class="empty"><i class="fa-solid fa-box-open"></i><p>Henuz urun eklenmedi.</p></div>';return;}
    el.innerHTML=j.products.map(p=>`<div class="pitem"><img src="${p.img}" onerror="this.src='favicon.png'"><div class="pinfo"><h4>${p.title}</h4><span>${p.category} &middot; ${p.filename}</span></div><div style="display:flex;gap:8px"><button class="btn-sm" onclick="window.open('${p.filename}')"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ac</button></div></div>`).join('');
  }catch{el.innerHTML='<div class="empty"><i class="fa-solid fa-triangle-exclamation"></i><p>Yuklenemedi.</p></div>';}
}

function toast(msg,type){
  const t=document.getElementById('toast');
  t.className='show '+(type||'ok');
  t.innerHTML=(type==='err'?'<i class="fa-solid fa-triangle-exclamation"></i>':'<i class="fa-solid fa-check-circle"></i>')+' '+msg;
  clearTimeout(window._tt);window._tt=setTimeout(()=>t.className='',4500);
}

</script>
</body>
</html>"""


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args): pass

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', len(body))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin','*')
        self.send_header('Access-Control-Allow-Methods','GET,POST')
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if path in ('/', '/admin'):
            # Sabit kategoriler
            all_cats = list(CATEGORIES)  # (slug, name_tr, icon)
            seen_slugs = {c[0] for c in all_cats}

            # urunler.html sidebar'dan dinamik kategorileri tara
            urunler_path = os.path.join(BASE_DIR, 'urunler.html')
            if os.path.exists(urunler_path):
                content = open(urunler_path, encoding='utf-8').read()
                for m in re.finditer(
                    r'<button class="filter-btn[^"]*" data-filter="([^"]+)"[^>]*>'
                    r'<i class="fa-solid ([^"]+)"></i>\s*'
                    r'<span[^>]*>([^<]+)</span>',
                    content):
                    slug_val = m.group(1).strip()
                    icon = m.group(2).strip()
                    name_tr = m.group(3).strip()
                    if slug_val == 'all' or slug_val in seen_slugs:
                        continue
                    if not name_tr:
                        name_tr = slug_val
                    # EN kategori adini data-cat-name-en attribute'unden al
                    en_match = re.search(rf'data-filter="{re.escape(slug_val)}"[^>]*data-cat-name-en="([^"]*)"', content)
                    name_en = en_match.group(1).strip() if en_match else name_tr
                    if not name_en:
                        name_en = name_tr
                    all_cats.append((slug_val, name_tr, icon, name_en))
                    seen_slugs.add(slug_val)

            opts = ""
            cat_js = "["
            for cat_entry in all_cats:
                slug_val = cat_entry[0]
                name_tr = cat_entry[1]
                icon = cat_entry[2]
                name_en = cat_entry[3] if len(cat_entry) > 3 else name_tr
                opts += f'<option value="{slug_val}">{name_tr}</option>\n'
                cat_js += f'["{slug_val}","{name_tr}","{name_en}"],'
            cat_js = cat_js.rstrip(',') + "]"
            html = ADMIN_HTML.replace('___CAT_OPTIONS___', opts).replace('___CAT_DATA___', cat_js)
            body = html.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type','text/html; charset=utf-8')
            self.send_header('Content-Length', len(body))
            self.end_headers()
            self.wfile.write(body)
            return

        if path == '/api/scrape':
            qs = urlparse(self.path).query
            params = parse_qs(qs)
            target_url = params.get('url', [''])[0]
            if not target_url:
                self.send_json({'error': 'URL gerekli'}, 400)
                return
            try:
                data = scrape_product(target_url)
                self.send_json({'ok': True, 'data': data})
            except Exception as ex:
                self.send_json({'ok': False, 'error': str(ex)}, 500)
            return

        if path == '/api/list-products':
            urunler_path = os.path.join(BASE_DIR, 'urunler.html')
            products = []
            if os.path.exists(urunler_path):
                content = open(urunler_path, encoding='utf-8').read()
                for m in re.finditer(
                    r'<!-- PRODUCT:([^>]+) -->\s*<div class="showcase-card"[^>]*data-category="([^"]+)"[^>]*>.*?<img src="([^"]*)".*?<h3>([^<]+)</h3>',
                    content, re.DOTALL):
                    slug_val, cat, img, title = m.group(1).strip(), m.group(2), m.group(3), m.group(4)
                    products.append({'slug': slug_val, 'filename': slug_val+'.html', 'category': cat, 'img': img, 'title': title})
            self.send_json({'products': products})
            return

        # Serve static files
        fp = os.path.join(BASE_DIR, path.lstrip('/'))
        if os.path.isfile(fp):
            ext = os.path.splitext(fp)[1].lower()
            mime = {'.css':'text/css','.js':'application/javascript','.png':'image/png',
                    '.jpg':'image/jpeg','.ico':'image/x-icon','.html':'text/html'}.get(ext,'application/octet-stream')
            data = open(fp, 'rb').read()
            self.send_response(200)
            self.send_header('Content-Type', mime)
            self.send_header('Content-Length', len(data))
            self.end_headers()
            self.wfile.write(data)
            return

        self.send_json({'error': 'Not found'}, 404)

    def do_POST(self):
        path = urlparse(self.path).path
        if path == '/api/add-product':
            length = int(self.headers.get('Content-Length', 0))
            raw = self.rfile.read(length).decode('utf-8')
            params = parse_qs(raw, keep_blank_values=True)
            data = {k: v[0] for k, v in params.items()}
            try:
                result = inject_product(data)
                print(f"[{datetime.now().strftime('%H:%M:%S')}] Urun eklendi: {result['filename']}")
                self.send_json(result)
            except Exception as ex:
                import traceback; traceback.print_exc()
                self.send_json({'ok': False, 'error': str(ex)}, 500)
            return
        self.send_json({'error': 'Not found'}, 404)


if __name__ == '__main__':
    PORT = 8765
    print(f"""
+--------------------------------------------------+
|   Almed Medikal -- Urun Yonetim Paneli           |
+--------------------------------------------------+
|  http://localhost:{PORT}                         |
|  Durdurmak icin: Ctrl + C                        |
+--------------------------------------------------+
""")
    try:
        httpd = HTTPServer(('', PORT), Handler)
        import webbrowser
        webbrowser.open(f'http://localhost:{PORT}')
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nSunucu kapatildi.")
        sys.exit(0)

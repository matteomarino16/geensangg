#!/usr/bin/env python3
"""
Generatore del sito Geensang.

Legge data/progetti.json e crea:
  home.html, lavori/<slug>.html, privacy.html, cookie.html, note-legali.html, 404.html,
  sitemap.xml, robots.txt, llms.txt, llms-full.txt, site.webmanifest, humans.txt
e aggiorna il blocco SEO nell'<head> di index.html.

Uso:  python3 build.py
Dopo aver aggiunto/modificato un progetto in data/progetti.json, rilancia lo script.
"""
import html
import json
import os
from datetime import date

# ===== CONFIGURAZIONE =====
SITE = "https://www.geensang.com"
NAME = "Gianmarco Palazzo"
ALIAS = "Geensang"
JOB = "Fotografo e videomaker"
CITY = "Martina Franca"
PROVINCE = "TA"
REGION = "Puglia"
COUNTRY = "IT"
EMAIL = "tonicwaee@gmail.com"
INSTAGRAM = "https://www.instagram.com/geensang/"
LINKEDIN = "https://www.linkedin.com/in/gianmarco-palazzo-12b05627b/"
CREDIT_NAME = "Matteo Marino"
CREDIT_URL = "https://www.instagram.com/_matteomarino/"
# Statistiche senza cookie (Plausible). Per disattivarle: ANALYTICS = ""
ANALYTICS = '<script defer data-domain="geensang.com" src="https://plausible.io/js/script.js"></script>'
ANALYTICS_NAME = "Plausible Analytics"
LEGAL_UPDATED = "29 ottobre 2026"

TODAY = date.today().isoformat()
YEAR = date.today().year
ROOT = os.path.dirname(os.path.abspath(__file__))

SUMMARY = (f"{NAME}, in arte {ALIAS}, è un fotografo e videomaker con base a {CITY} ({PROVINCE}), "
           f"in {REGION}. Lavora su moda e lookbook, campagne per brand streetwear, eventi, nightlife e club, "
           "reportage e video di sfilate.")

SERVICES = [
    ("Fotografia di moda e lookbook", "Editoriali, lookbook e campagne per brand di abbigliamento e streetwear."),
    ("Foto e video di eventi", "Reportage di eventi, attivazioni di brand, lanci e serate."),
    ("Nightlife e club", "Foto e video in club e festival: DJ set, pista, luci."),
    ("Video di sfilate e teaser", "Riprese e montaggio di sfilate, backstage e teaser."),
]

FAQ = [
    (f"Chi è {NAME}?",
     f"{NAME}, in arte {ALIAS}, è un fotografo e videomaker con base a {CITY} ({PROVINCE}), in {REGION}. "
     "Si occupa di moda, lookbook, eventi e nightlife."),
    (f"Dove lavora {NAME}?",
     f"Ha base a {CITY}, in provincia di Taranto ({REGION}). Per lavori in altre zone si può scrivere per "
     "verificare la disponibilità."),
    ("Che servizi offre?",
     "Fotografia di moda e lookbook, campagne per brand, foto e video di eventi, reportage di nightlife e club, "
     "video di sfilate e teaser."),
    ("Con chi ha lavorato?",
     "Tra i progetti: l'evento Red Bull x Adidas da Sneakers 76, lookbook, merch e sfilate per Wehea e Bolla, "
     "le serate DMT x Sound Department e MRC x Hangar."),
    ("Come si richiede un preventivo?",
     f"Scrivendo a {EMAIL} o in privato su Instagram (@geensang), con data, luogo e tipo di lavoro."),
    ("Si possono usare le foto pubblicate sul sito?",
     "No, senza autorizzazione. Foto e video sono protetti dal diritto d'autore: per una licenza d'uso "
     f"scrivi a {EMAIL}."),
]

TYPE_IT = {"photo": "Fotografia", "video": "Video"}
COUNT_IT = {"photo": ("foto", "foto"), "video": ("video", "video")}

esc = html.escape


def write(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)


def jsonld(data):
    s = json.dumps(data, ensure_ascii=False, indent=1).replace("</", "<\\/")
    return f'<script type="application/ld+json">\n{s}\n</script>'


def trunc(text, limit=158):
    """Taglia a fine parola per stare nella lunghezza mostrata da Google."""
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0].rstrip(",.;:—-") + "…"


def url(path=""):
    return f"{SITE}/{path}"


# ===== Entità comuni (JSON-LD) =====
PERSON_ID = url("#person")
BUSINESS_ID = url("#business")
WEBSITE_ID = url("#website")

ADDRESS = {"@type": "PostalAddress", "addressLocality": CITY, "addressRegion": PROVINCE,
           "addressCountry": COUNTRY}

PERSON = {
    "@type": "Person", "@id": PERSON_ID, "name": NAME, "alternateName": ALIAS,
    "jobTitle": JOB, "description": SUMMARY, "url": url(), "image": url("og-image.jpg"),
    "email": f"mailto:{EMAIL}", "address": ADDRESS,
    "homeLocation": {"@type": "Place", "name": f"{CITY}, {REGION}", "address": ADDRESS},
    "knowsAbout": ["Fotografia di moda", "Lookbook", "Fotografia di eventi", "Nightlife", "Videomaking",
                   "Video di sfilate", "Streetwear"],
    "sameAs": [INSTAGRAM, LINKEDIN],
}

BUSINESS = {
    "@type": "ProfessionalService", "@id": BUSINESS_ID, "name": f"{ALIAS} — {NAME}",
    "description": SUMMARY, "url": url(), "image": url("og-image.jpg"), "logo": url("icon-512.png"),
    "email": EMAIL, "address": ADDRESS, "founder": {"@id": PERSON_ID},
    "areaServed": [{"@type": "City", "name": CITY}, {"@type": "AdministrativeArea", "name": REGION}],
    "sameAs": [INSTAGRAM, LINKEDIN],
    "hasOfferCatalog": {
        "@type": "OfferCatalog", "name": "Servizi",
        "itemListElement": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": n, "description": d}}
                            for n, d in SERVICES],
    },
}

WEBSITE = {
    "@type": "WebSite", "@id": WEBSITE_ID, "url": url(), "name": f"{ALIAS} — {NAME}",
    "inLanguage": "it-IT", "publisher": {"@id": PERSON_ID},
}


def breadcrumb(items):
    return {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(items)]}


# ===== Parti HTML =====
def head(title, desc, path, p="", image=None, image_alt=None, og_type="website", ld=None, robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"):
    image = image or url("og-image.jpg")
    image_alt = image_alt or f"{NAME} — {JOB} a {CITY}"
    canonical = url(path)
    graph = jsonld({"@context": "https://schema.org", "@graph": ld}) if ld else ""
    return f"""  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <meta name="robots" content="{robots}">
  <link rel="canonical" href="{canonical}">
  <meta name="author" content="{NAME}">
  <meta name="geo.region" content="IT-{PROVINCE}">
  <meta name="geo.placename" content="{CITY}">
  <meta name="theme-color" content="#0a0a0a">
  <meta property="og:type" content="{og_type}">
  <meta property="og:site_name" content="{ALIAS} — {NAME}">
  <meta property="og:locale" content="it_IT">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{image}">
  <meta property="og:image:alt" content="{esc(image_alt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(title)}">
  <meta name="twitter:description" content="{esc(desc)}">
  <meta name="twitter:image" content="{image}">
  <link rel="icon" href="{p}favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="{p}favicon-32.png">
  <link rel="apple-touch-icon" href="{p}apple-touch-icon.png">
  <link rel="manifest" href="{p}site.webmanifest">
  <link rel="alternate" type="text/plain" title="llms.txt" href="{p}llms.txt">
  {graph}
  {ANALYTICS}"""


def page(title, desc, path, body, p="", body_class="home", **kw):
    return f"""<!DOCTYPE html>
<!-- Generato da build.py: modifica data/progetti.json o build.py, non questo file. -->
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
{head(title, desc, path, p=p, **kw)}
  <link rel="stylesheet" href="{p}style.css">
</head>
<body class="{body_class}">
{body}
  <script src="{p}script.js"></script>
</body>
</html>
"""


def top(p, filters=False):
    if filters:
        nav = """      <button class="filter active" data-filter="all">Tutto</button>
      <button class="filter" data-filter="photo">Foto</button>
      <button class="filter" data-filter="video">Video</button>
      <a href="#info">Info</a>"""
    else:
        nav = f"""      <a href="{p}home.html">Tutto</a>
      <a href="{p}home.html#photo">Foto</a>
      <a href="{p}home.html#video">Video</a>
      <a href="{p}home.html#info">Info</a>"""
    return f"""  <header class="top">
    <a href="{p}index.html" class="top-name">{NAME}<span>fotografia e video</span></a>
    <nav class="top-nav" aria-label="Menu">
{nav}
    </nav>
  </header>"""


def bottom(p):
    return f"""  <footer class="bottom">
    <span class="bottom-legal">© {YEAR} {NAME} · <a href="{p}privacy.html">Privacy</a> · <a href="{p}cookie.html">Cookie</a> · <a href="{p}note-legali.html">Note legali</a></span>
    <a class="credit-home" href="{CREDIT_URL}" target="_blank" rel="noopener">Web By {CREDIT_NAME}</a>
    <a href="#top" id="backTop">Torna su</a>
  </footer>"""


VIEWER = """  <div class="viewer" id="viewer" role="dialog" aria-modal="true" aria-label="Visore" hidden>
    <div class="viewer-bar">
      <span class="viewer-title" id="viewerTitle"></span>
      <span class="viewer-count" id="viewerCount"></span>
      <button class="viewer-close" id="viewerClose">Chiudi</button>
    </div>
    <div class="viewer-stage" id="viewerStage"></div>
    <button class="viewer-prev" id="viewerPrev" aria-label="Precedente"></button>
    <button class="viewer-next" id="viewerNext" aria-label="Successiva"></button>
  </div>"""


def media_path(pr, m, size, p=""):
    return f"{p}progetti/{pr['folder']}/{size}/{m['src']}"


def media_alt(pr, m):
    if "video" in m:
        return f"{pr['title']}: {m['title']} — anteprima del video"
    return m["alt"]


def count_label(pr):
    n = len(pr["media"])
    one, many = COUNT_IT[pr["type"]]
    return f"{n} {one if n == 1 else many}"


def project_url(pr, absolute=False):
    rel = f"lavori/{pr['slug']}.html"
    return url(rel) if absolute else rel


# ===== HOME =====
def build_home(projects):
    rows = []
    for i, pr in enumerate(projects):
        shots = []
        for j, m in enumerate(pr["media"]):
            video = f' data-video="progetti/{pr["folder"]}/{m["video"]}"' if "video" in m else ""
            play = '<span class="shot-play">▶ video</span>' if "video" in m else ""
            loading = 'loading="eager" fetchpriority="high"' if i == 0 and j < 3 else 'loading="lazy"'
            shots.append(
                f'        <button class="shot" style="--ar: {m["w"]} / {m["h"]}" data-full="{media_path(pr, m, "web")}"{video} '
                f'aria-label="Apri: {esc(media_alt(pr, m))}">'
                f'<img src="{media_path(pr, m, "thumbs")}" alt="{esc(media_alt(pr, m))}" width="{m["w"]}" height="{m["h"]}" {loading} decoding="async">{play}</button>')
        rows.append(f"""    <article class="row" data-type="{pr['type']}">
      <div class="row-meta">
        <span class="row-num">{i + 1:02d}</span>
        <h2 class="row-title"><a href="{project_url(pr)}">{esc(pr['title'])}</a></h2>
        <span class="row-sub">{pr['year']}, {count_label(pr)}</span>
      </div>
      <div class="strip" data-gallery data-title="{esc(pr['title'])}, {pr['year']}">
{chr(10).join(shots)}
      </div>
    </article>""")

    years = sorted({p["year"] for p in projects})
    services = "\n".join(f"        <li><strong>{esc(n)}</strong> — {esc(d)}</li>" for n, d in SERVICES)
    faq = "\n".join(f"""        <div class="faq-item">
          <dt>{esc(q)}</dt>
          <dd>{esc(a)}</dd>
        </div>""" for q, a in FAQ)

    body = f"""{top("", filters=True)}

  <main id="top">
    <section class="page-intro">
      <span class="row-num">Archivio</span>
      <h1>{NAME}, fotografo e videomaker a {CITY}, {REGION}. {len(projects)} progetti di moda, eventi e nightlife, {years[0]}–{years[-1]}.</h1>
    </section>

    <div class="archive" id="archive">
{chr(10).join(rows)}
    </div>

    <section class="info" id="info" aria-labelledby="info-title">
      <h2 class="info-label" id="info-title">Info</h2>
      <p class="info-lead">{esc(SUMMARY)}</p>

      <h3 class="info-label">Servizi</h3>
      <ul class="info-services">
{services}
      </ul>

      <h3 class="info-label">Domande frequenti</h3>
      <dl class="faq">
{faq}
      </dl>

      <h3 class="info-label">Contatti</h3>
      <dl class="info-list">
        <div><dt>Email</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
        <div><dt>Instagram</dt><dd><a href="{INSTAGRAM}" target="_blank" rel="noopener">@geensang</a></dd></div>
        <div><dt>LinkedIn</dt><dd><a href="{LINKEDIN}" target="_blank" rel="noopener">{NAME}</a></dd></div>
        <div><dt>Base</dt><dd>{CITY} ({PROVINCE}), {REGION}</dd></div>
      </dl>
    </section>
  </main>

{bottom("")}

{VIEWER}"""

    ld = [
        {"@type": "CollectionPage", "@id": url("home.html#archive"), "url": url("home.html"),
         "name": f"Lavori — {NAME}", "description": SUMMARY, "inLanguage": "it-IT",
         "isPartOf": {"@id": WEBSITE_ID}, "about": {"@id": PERSON_ID}, "author": {"@id": PERSON_ID},
         "mainEntity": {"@type": "ItemList", "numberOfItems": len(projects), "itemListElement": [
             {"@type": "ListItem", "position": i + 1, "url": project_url(pr, True), "name": pr["title"]}
             for i, pr in enumerate(projects)]}},
        {"@type": "FAQPage", "@id": url("home.html#faq"),
         "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                        for q, a in FAQ]},
        breadcrumb([("Home", url()), ("Lavori", url("home.html"))]),
        PERSON, BUSINESS,
    ]
    write("home.html", page(
        f"Lavori — {NAME}, fotografo e videomaker",
        f"Archivio di {NAME} (Geensang), fotografo e videomaker a {CITY}: {len(projects)} progetti di moda, "
        "lookbook, eventi e nightlife.",
        "home.html", body, ld=ld))


# ===== PAGINE PROGETTO =====
def build_project(projects, i):
    pr = projects[i]
    p = "../"
    prev_pr, next_pr = projects[i - 1], projects[(i + 1) % len(projects)]
    items = []
    for j, m in enumerate(pr["media"]):
        if "video" in m:
            items.append(f"""      <figure class="clip">
        <video src="{p}progetti/{pr['folder']}/{m['video']}" poster="{media_path(pr, m, 'web', p)}" controls playsinline preload="metadata" width="{m['ww']}" height="{m['wh']}" aria-label="{esc(pr['title'])}: {esc(m['title'])}"></video>
        <figcaption>{esc(m['title'])}</figcaption>
      </figure>""")
        else:
            loading = 'loading="eager" fetchpriority="high"' if j < 2 else 'loading="lazy"'
            items.append(
                f'      <button class="shot" style="--ar: {m["w"]} / {m["h"]}" data-full="{media_path(pr, m, "web", p)}" aria-label="Ingrandisci: {esc(m["alt"])}">'
                f'<img src="{media_path(pr, m, "thumbs", p)}" srcset="{media_path(pr, m, "thumbs", p)} {m["w"]}w, {media_path(pr, m, "web", p)} {m["ww"]}w" '
                f'sizes="(max-width: 760px) 100vw, 50vw" alt="{esc(m["alt"])}" width="{m["w"]}" height="{m["h"]}" {loading} decoding="async"></button>')

    gallery_class = "gallery gallery-video" if pr["type"] == "video" else "gallery"
    body = f"""{top(p)}

  <main id="top" class="page">
    <nav class="crumbs" aria-label="Percorso">
      <a href="{p}index.html">Home</a> / <a href="{p}home.html">Lavori</a> / <span aria-current="page">{esc(pr['title'])}</span>
    </nav>

    <header class="page-head">
      <h1>{esc(pr['title'])}</h1>
      <p class="page-meta">{pr['year']} · {TYPE_IT[pr['type']]} · {count_label(pr)} · {NAME}</p>
      <p class="page-desc">{esc(pr['description'])}</p>
    </header>

    <div class="{gallery_class}" data-gallery data-title="{esc(pr['title'])}, {pr['year']}">
{chr(10).join(items)}
    </div>

    <nav class="pager" aria-label="Altri progetti">
      <a href="{prev_pr['slug']}.html" rel="prev">← {esc(prev_pr['title'])}</a>
      <a href="{p}home.html">Tutti i lavori</a>
      <a href="{next_pr['slug']}.html" rel="next">{esc(next_pr['title'])} →</a>
    </nav>
  </main>

{bottom(p)}

{VIEWER}"""

    page_url = project_url(pr, True)
    first = pr["media"][0]
    image = url(media_path(pr, first, "web"))
    work = {
        "@type": "ImageGallery" if pr["type"] == "photo" else "VideoGallery",
        "@id": page_url + "#work", "url": page_url, "name": pr["title"], "headline": pr["title"],
        "description": pr["description"], "inLanguage": "it-IT", "dateCreated": str(pr["year"]),
        "author": {"@id": PERSON_ID}, "creator": {"@id": PERSON_ID}, "copyrightHolder": {"@id": PERSON_ID},
        "copyrightYear": pr["year"], "isPartOf": {"@id": url("home.html#archive")},
        "thumbnailUrl": image, "genre": TYPE_IT[pr["type"]],
    }
    if pr["type"] == "photo":
        work["image"] = [{
            "@type": "ImageObject", "contentUrl": url(media_path(pr, m, "web")),
            "thumbnailUrl": url(media_path(pr, m, "thumbs")), "width": m["ww"], "height": m["wh"],
            "caption": m["alt"], "creditText": NAME, "creator": {"@id": PERSON_ID},
            "copyrightNotice": f"© {pr['year']} {NAME}", "license": url("note-legali.html#licenze"),
            "acquireLicensePage": url("home.html#info"),
        } for m in pr["media"]]
    else:
        work["video"] = [{
            "@type": "VideoObject", "name": f"{pr['title']} — {m['title']}", "description": pr["description"],
            "thumbnailUrl": url(media_path(pr, m, "web")), "contentUrl": url(f"progetti/{pr['folder']}/{m['video']}"),
            "uploadDate": TODAY, "creator": {"@id": PERSON_ID}, "inLanguage": "it-IT",
        } for m in pr["media"]]

    ld = [work, breadcrumb([("Home", url()), ("Lavori", url("home.html")), (pr["title"], page_url)]),
          {"@type": "Person", "@id": PERSON_ID, "name": NAME, "alternateName": ALIAS, "url": url(),
           "jobTitle": JOB, "sameAs": [INSTAGRAM, LINKEDIN]}]

    desc = trunc(f"{pr['description']} {TYPE_IT[pr['type']]} di {NAME}, {CITY}, {pr['year']}.")
    write(f"lavori/{pr['slug']}.html", page(
        f"{pr['title']} ({pr['year']}) — {NAME}", desc, f"lavori/{pr['slug']}.html", body, p=p,
        image=image, image_alt=media_alt(pr, first), og_type="article", ld=ld))


# ===== PAGINE LEGALI =====
def legal_page(path, title, desc, content):
    body = f"""{top("")}

  <main id="top" class="page legal">
    <nav class="crumbs" aria-label="Percorso"><a href="index.html">Home</a> / <span aria-current="page">{esc(title)}</span></nav>
    <h1>{esc(title)}</h1>
    <p class="page-meta">Ultimo aggiornamento: {LEGAL_UPDATED}</p>
{content}
  </main>

{bottom("")}"""
    ld = [{"@type": "WebPage", "@id": url(path), "url": url(path), "name": title, "inLanguage": "it-IT",
           "isPartOf": {"@id": WEBSITE_ID}},
          breadcrumb([("Home", url()), (title, url(path))])]
    write(path, page(f"{title} — {NAME}", desc, path, body, ld=ld))


def build_legal():
    stats = f"""
    <h2>Statistiche di visita</h2>
    <p>Il sito usa <strong>{ANALYTICS_NAME}</strong> per contare le visite in forma aggregata e anonima (pagine viste, provenienza, tipo di dispositivo, paese). {ANALYTICS_NAME} <strong>non usa cookie</strong>, non salva l'indirizzo IP e non permette di identificare né di seguire i visitatori tra siti diversi. I dati sono ospitati nell'Unione Europea.</p>
    <p>Base giuridica: legittimo interesse del titolare a conoscere l'uso del sito in forma anonima (art. 6.1.f GDPR). Fornitore: Plausible Insights OÜ, Estonia.</p>""" if ANALYTICS else ""

    build_privacy = f"""
    <p>Questa informativa spiega come vengono trattati i dati personali di chi visita <a href="{url()}">{SITE.replace('https://', '')}</a>, ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 («GDPR») e del D.Lgs. 196/2003.</p>

    <h2>Titolare del trattamento</h2>
    <p>{NAME}, {CITY} ({PROVINCE}), Italia. Email: <a href="mailto:{EMAIL}">{EMAIL}</a>.</p>

    <h2>Quali dati raccogliamo</h2>
    <h3>Dati di navigazione</h3>
    <p>I server che ospitano il sito registrano in automatico alcuni dati tecnici (indirizzo IP, data e ora della richiesta, pagina richiesta, browser) nei log di sistema. Servono solo a far funzionare il sito e a proteggerlo da abusi, e vengono cancellati periodicamente dal fornitore di hosting.</p>
    <p>Base giuridica: legittimo interesse alla sicurezza e al funzionamento del sito (art. 6.1.f GDPR).</p>

    <h3>Dati che ci invii tu</h3>
    <p>Se scrivi via email o tramite i social, tratteremo il tuo indirizzo e i dati che decidi di condividere solo per risponderti e, se richiesto, per preparare un preventivo o svolgere un lavoro.</p>
    <p>Base giuridica: esecuzione di misure precontrattuali o di un contratto (art. 6.1.b GDPR). I messaggi sono conservati per il tempo necessario a gestire la richiesta e, in caso di lavoro, per i tempi previsti dalla legge.</p>
{stats}
    <h2>Cookie</h2>
    <p>Il sito non usa cookie di profilazione né cookie di terze parti. I dettagli sono nella <a href="cookie.html">Cookie Policy</a>.</p>

    <h2>Link esterni</h2>
    <p>Il sito contiene link a Instagram e LinkedIn. Non sono presenti pulsanti o contenuti incorporati di questi servizi: nessun dato viene inviato loro finché non clicchi un link. Una volta sui loro siti valgono le loro informative.</p>

    <h2>Font e risorse</h2>
    <p>Caratteri, immagini e video sono ospitati sullo stesso server del sito: la navigazione non comporta trasferimenti di dati a servizi esterni come Google Fonts.</p>

    <h2>Destinatari e trasferimenti</h2>
    <p>I dati non vengono venduti né ceduti. Possono accedervi solo i fornitori tecnici necessari (hosting, servizio email), che agiscono come responsabili del trattamento. Le email sono gestite con Gmail (Google): Google può trattare i dati anche fuori dallo Spazio Economico Europeo, con le garanzie previste dal GDPR (EU-US Data Privacy Framework e clausole contrattuali standard).</p>

    <h2>I tuoi diritti</h2>
    <p>Puoi chiedere in qualsiasi momento l'accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del trattamento, la portabilità e opporti al trattamento (artt. 15–22 GDPR), scrivendo a <a href="mailto:{EMAIL}">{EMAIL}</a>. Hai anche il diritto di proporre reclamo al <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">Garante per la protezione dei dati personali</a>.</p>

    <h2>Processi automatizzati</h2>
    <p>Non vengono prese decisioni basate unicamente su trattamenti automatizzati, profilazione compresa.</p>

    <h2>Modifiche</h2>
    <p>Questa informativa può essere aggiornata. La data in alto indica l'ultima versione.</p>"""

    cookie = f"""
    <p>Questa pagina descrive l'uso di cookie e tecnologie simili su <a href="{url()}">{SITE.replace('https://', '')}</a>, secondo le Linee guida del Garante Privacy del 10 giugno 2021.</p>

    <h2>Cosa sono i cookie</h2>
    <p>I cookie sono piccoli file di testo che un sito salva nel browser per ricordare informazioni sulla visita.</p>

    <h2>Cookie usati da questo sito</h2>
    <p><strong>Nessuno.</strong> Il sito non installa cookie tecnici, analitici, di profilazione o di terze parti, e non usa tecnologie simili (come localStorage) per tracciarti.</p>
    {"<p>Le statistiche di visita sono raccolte con " + ANALYTICS_NAME + ", che funziona senza cookie e in forma anonima: maggiori dettagli nella <a href='privacy.html'>Privacy Policy</a>.</p>" if ANALYTICS else ""}

    <h2>Perché non c'è il banner dei cookie</h2>
    <p>Il banner di consenso è obbligatorio solo per i cookie non tecnici, come quelli di profilazione o di statistica non anonima. Poiché il sito non ne usa, non serve chiederti alcun consenso.</p>

    <h2>Link a siti esterni</h2>
    <p>I link a Instagram e LinkedIn portano a siti che usano propri cookie, regolati dalle loro informative. Nessun loro contenuto è incorporato in queste pagine.</p>

    <h2>Gestire i cookie nel browser</h2>
    <p>Puoi in ogni caso bloccare o cancellare i cookie dalle impostazioni del browser: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a>, <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a>, <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener">Firefox</a>, <a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noopener">Edge</a>.</p>

    <h2>Contatti</h2>
    <p>Per domande: <a href="mailto:{EMAIL}">{EMAIL}</a>.</p>"""

    notes = f"""
    <h2>Titolare del sito</h2>
    <p>{NAME} ({ALIAS})<br>{CITY} ({PROVINCE}), {REGION}, Italia<br>Email: <a href="mailto:{EMAIL}">{EMAIL}</a></p>

    <h2 id="licenze">Diritto d'autore e licenze</h2>
    <p>Tutte le fotografie e i video pubblicati sono opere di {NAME} e sono protetti dalla Legge 22 aprile 1941 n. 633 sul diritto d'autore. Tutti i diritti sono riservati.</p>
    <p>Non è consentito copiare, scaricare per riutilizzare, modificare, pubblicare o usare le immagini e i video, anche in parte, senza autorizzazione scritta. Per licenze d'uso, pubblicazioni editoriali o collaborazioni scrivi a <a href="mailto:{EMAIL}">{EMAIL}</a>.</p>
    <p>È consentita la condivisione dei link alle pagine del sito.</p>

    <h2>Marchi</h2>
    <p>I nomi e i marchi citati nei titoli dei progetti (ad esempio Red Bull, Adidas, Sneakers 76, Wehea, Bolla) appartengono ai rispettivi titolari e sono usati solo per indicare il contesto dei lavori.</p>

    <h2>Persone ritratte</h2>
    <p>Se compari in una foto o in un video e vuoi che venga rimosso, scrivi a <a href="mailto:{EMAIL}">{EMAIL}</a>: la richiesta verrà gestita il prima possibile.</p>

    <h2>Crediti</h2>
    <p>Design e sviluppo: <a href="{CREDIT_URL}" target="_blank" rel="noopener">{CREDIT_NAME}</a>.<br>Caratteri: Anton e Space Mono, rilasciati con licenza SIL Open Font License.</p>

    <h2>Privacy e cookie</h2>
    <p>Consulta la <a href="privacy.html">Privacy Policy</a> e la <a href="cookie.html">Cookie Policy</a>.</p>"""

    legal_page("privacy.html", "Privacy Policy",
               f"Informativa privacy del sito di {NAME} (Geensang): quali dati vengono trattati, perché e quali sono i tuoi diritti.",
               build_privacy)
    legal_page("cookie.html", "Cookie Policy",
               f"Cookie Policy del sito di {NAME} (Geensang): il sito non usa cookie di profilazione né di terze parti.",
               cookie)
    legal_page("note-legali.html", "Note legali",
               f"Note legali del sito di {NAME} (Geensang): titolare, diritto d'autore su foto e video, marchi e crediti.",
               notes)


def build_404():
    p = "/"
    body = f"""{top(p)}

  <main id="top" class="page legal">
    <h1>Pagina non trovata</h1>
    <p class="page-desc">La pagina che cerchi non esiste o è stata spostata.</p>
    <p><a href="{p}home.html" class="link-u">Vai a tutti i lavori →</a></p>
  </main>

{bottom(p)}"""
    write("404.html", page(f"Pagina non trovata — {NAME}", "Pagina non trovata.", "404.html", body, p=p,
                           robots="noindex, follow"))


# ===== INDEX: blocco SEO nell'head =====
def build_index_head():
    path = os.path.join(ROOT, "index.html")
    src = open(path, encoding="utf-8").read()
    start, end = "<!-- SEO:START -->", "<!-- SEO:END -->"
    a, b = src.index(start) + len(start), src.index(end)
    ld = [WEBSITE, PERSON, BUSINESS, breadcrumb([("Home", url())])]
    block = "\n" + head(f"{NAME} — Fotografo e videomaker a {CITY}",
                        f"{NAME}, in arte Geensang: fotografo e videomaker a {CITY} (TA), {REGION}. "
                        "Moda, lookbook, eventi, nightlife e video di sfilate.",
                        "", ld=ld) + "\n  "
    with open(path, "w", encoding="utf-8") as f:
        f.write(src[:a] + block + src[b:])


# ===== FILE PER MOTORI DI RICERCA E AI =====
def build_sitemap(projects):
    def entry(loc, extra="", priority="0.5"):
        return f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{TODAY}</lastmod>
    <priority>{priority}</priority>{extra}
  </url>"""

    out = [entry(url(), priority="1.0"), entry(url("home.html"), priority="0.9")]
    for pr in projects:
        extra = ""
        for m in pr["media"]:
            if "video" in m:
                extra += f"""
    <video:video>
      <video:thumbnail_loc>{url(media_path(pr, m, "web"))}</video:thumbnail_loc>
      <video:title>{esc(pr['title'] + ' — ' + m['title'])}</video:title>
      <video:description>{esc(pr['description'])}</video:description>
      <video:content_loc>{url('progetti/' + pr['folder'] + '/' + m['video'])}</video:content_loc>
    </video:video>"""
            else:
                extra += f"""
    <image:image><image:loc>{url(media_path(pr, m, "web"))}</image:loc></image:image>"""
        out.append(entry(project_url(pr, True), extra, "0.8"))
    for pth in ("privacy.html", "cookie.html", "note-legali.html"):
        out.append(entry(url(pth), priority="0.2"))
    write("sitemap.xml", f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
{chr(10).join(out)}
</urlset>
""")


def build_robots():
    ai_bots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
               "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot"]
    ai = "\n".join(f"User-agent: {b}\nAllow: /\n" for b in ai_bots)
    write("robots.txt", f"""# {SITE}
User-agent: *
Allow: /
Disallow: /data/

# Motori di ricerca e assistenti AI: accesso consentito (GEO)
{ai}
Sitemap: {url('sitemap.xml')}
""")


def build_llms(projects):
    photos = [p for p in projects if p["type"] == "photo"]
    videos = [p for p in projects if p["type"] == "video"]
    line = lambda pr: f"- [{pr['title']} ({pr['year']})]({project_url(pr, True)}): {pr['description']}"
    facts = f"""- Nome: {NAME}
- Nome d'arte: {ALIAS}
- Professione: {JOB}
- Base: {CITY} ({PROVINCE}), {REGION}, Italia
- Specialità: {', '.join(n.lower() for n, _ in SERVICES)}
- Email: {EMAIL}
- Instagram: {INSTAGRAM}
- LinkedIn: {LINKEDIN}"""

    write("llms.txt", f"""# {NAME} ({ALIAS})

> {SUMMARY}

{facts}

## Lavori fotografici
{chr(10).join(line(p) for p in photos)}

## Lavori video
{chr(10).join(line(p) for p in videos)}

## Pagine
- [Archivio di tutti i lavori]({url('home.html')}): elenco di progetti, servizi, domande frequenti e contatti
- [Note legali]({url('note-legali.html')}): diritto d'autore e licenze d'uso delle immagini
- [Privacy Policy]({url('privacy.html')})

## Optional
- [Versione completa per AI]({url('llms-full.txt')}): tutti i testi del sito, con la descrizione di ogni foto
""")

    full = [f"# {NAME} ({ALIAS}) — testo completo del sito\n", f"> {SUMMARY}\n", facts, "\n## Servizi"]
    full += [f"- {n}: {d}" for n, d in SERVICES]
    full += ["\n## Domande frequenti"] + [f"### {q}\n{a}\n" for q, a in FAQ]
    full.append("## Progetti")
    for pr in projects:
        full.append(f"\n### {pr['title']} ({pr['year']}) — {TYPE_IT[pr['type']]}\nURL: {project_url(pr, True)}\n{pr['description']}")
        for m in pr["media"]:
            full.append(f"- {m['title'] + ' (video)' if 'video' in m else m['alt']}")
    write("llms-full.txt", "\n".join(full) + "\n")


def build_misc():
    write("site.webmanifest", json.dumps({
        "name": f"{ALIAS} — {NAME}", "short_name": ALIAS, "lang": "it", "start_url": "/",
        "display": "standalone", "background_color": "#0a0a0a", "theme_color": "#0a0a0a",
        "icons": [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
                  {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"}],
    }, indent=2, ensure_ascii=False) + "\n")
    write("humans.txt", f"""/* TEAM */
Fotografie e video: {NAME} ({ALIAS})
Contatto: {EMAIL}
Da: {CITY}, {REGION}, Italia

Design e sviluppo: {CREDIT_NAME}
Instagram: {CREDIT_URL}

/* SITE */
Ultimo aggiornamento: {TODAY}
Lingua: Italiano
Standard: HTML5, CSS3, JavaScript
""")


def main():
    projects = json.load(open(os.path.join(ROOT, "data", "progetti.json"), encoding="utf-8"))["projects"]
    build_home(projects)
    for i in range(len(projects)):
        build_project(projects, i)
    build_legal()
    build_404()
    build_index_head()
    build_sitemap(projects)
    build_robots()
    build_llms(projects)
    build_misc()
    print(f"Fatto: {len(projects)} progetti, {sum(len(p['media']) for p in projects)} elementi multimediali.")


if __name__ == "__main__":
    main()

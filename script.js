// ===== Dati progetti =====
// Foto e video stanno in progetti/<cartella>/ (originali), con versioni leggere in thumbs/ e web/.
// media: elenco in ordine; w/h servono a riservare lo spazio prima che l'immagine carichi.
const MEDIA = "progetti/";

const projects = [
  { title: "Redbull x Adidas in Sneakers 76", year: 2026, type: "photo", folder: "01-redbull-x-adidas-in-sneakers-76", media: [{ src: "01.jpg", w: 600, h: 900 }, { src: "02.jpg", w: 675, h: 900 }, { src: "03.jpg", w: 600, h: 900 }, { src: "04.jpg", w: 600, h: 900 }, { src: "05.jpg", w: 600, h: 900 }, { src: "06.jpg", w: 600, h: 900 }, { src: "07.jpg", w: 675, h: 900 }, { src: "08.jpg", w: 600, h: 900 }, { src: "09.jpg", w: 600, h: 900 }, { src: "10.jpg", w: 600, h: 900 }, { src: "11.jpg", w: 600, h: 900 }] },
  { title: "Silhouette", year: 2026, type: "photo", folder: "02-silhouette", media: [{ src: "01.jpg", w: 720, h: 900 }, { src: "02.jpg", w: 600, h: 900 }, { src: "03.jpg", w: 600, h: 900 }, { src: "04.jpg", w: 600, h: 900 }, { src: "05.jpg", w: 613, h: 900 }, { src: "06.jpg", w: 600, h: 900 }] },
  { title: "Fashion Killa", year: 2026, type: "photo", folder: "03-fashion-killa", media: [{ src: "01.jpg", w: 600, h: 900 }, { src: "02.jpg", w: 720, h: 900 }, { src: "03.jpg", w: 720, h: 900 }, { src: "04.jpg", w: 600, h: 900 }, { src: "05.jpg", w: 720, h: 900 }, { src: "06.jpg", w: 720, h: 900 }, { src: "07.jpg", w: 675, h: 900 }, { src: "08.jpg", w: 720, h: 900 }] },
  { title: "Aura", year: 2026, type: "photo", folder: "04-aura", media: [{ src: "01.jpg", w: 900, h: 672 }, { src: "02.jpg", w: 900, h: 672 }] },
  { title: "Wehea\\Bolla Merch", year: 2025, type: "photo", folder: "05-weheabolla-merch", media: [{ src: "01.jpg", w: 720, h: 900 }, { src: "02.jpg", w: 900, h: 600 }, { src: "03.jpg", w: 720, h: 900 }, { src: "04.jpg", w: 900, h: 600 }, { src: "05.jpg", w: 720, h: 900 }, { src: "06.jpg", w: 600, h: 900 }] },
  { title: "Nightlife", year: 2025, type: "photo", folder: "06-nightlife", media: [{ src: "01.jpg", w: 900, h: 600 }, { src: "02.jpg", w: 600, h: 900 }, { src: "03.jpg", w: 600, h: 900 }, { src: "04.jpg", w: 900, h: 600 }, { src: "05.jpg", w: 600, h: 900 }, { src: "06.jpg", w: 720, h: 900 }, { src: "07.jpg", w: 900, h: 600 }, { src: "08.jpg", w: 600, h: 900 }, { src: "09.jpg", w: 900, h: 600 }] },
  { title: "Wehea || Bolla || Lookbook", year: 2026, type: "photo", folder: "07-wehea-bolla-lookbook", media: [{ src: "01.jpg", w: 600, h: 900 }, { src: "02.jpg", w: 600, h: 900 }, { src: "03.jpg", w: 600, h: 900 }, { src: "04.jpg", w: 600, h: 900 }, { src: "05.jpg", w: 600, h: 900 }, { src: "06.jpg", w: 600, h: 900 }, { src: "07.jpg", w: 600, h: 900 }, { src: "08.jpg", w: 600, h: 900 }, { src: "09.jpg", w: 600, h: 900 }, { src: "10.jpg", w: 600, h: 900 }] },
  { title: "Tattoo\\4", year: 2025, type: "photo", folder: "08-savage-tattoo", media: [{ src: "01.jpg", w: 900, h: 660 }, { src: "02.jpg", w: 900, h: 510 }, { src: "03.jpg", w: 900, h: 600 }, { src: "04.jpg", w: 900, h: 797 }] },
  { title: "DMT x Sound Department", year: 2025, type: "photo", folder: "09-dmt-x-sound-department", media: [{ src: "01.jpg", w: 900, h: 600 }, { src: "02.jpg", w: 600, h: 900 }, { src: "03.jpg", w: 900, h: 600 }, { src: "04.jpg", w: 600, h: 900 }, { src: "05.jpg", w: 900, h: 600 }, { src: "06.jpg", w: 600, h: 900 }] },
  { title: "El Cohiba", year: 2025, type: "photo", folder: "10-el-cohiba", media: [{ src: "01.jpg", w: 900, h: 600 }, { src: "02.jpg", w: 600, h: 900 }, { src: "03.jpg", w: 900, h: 627 }, { src: "04.jpg", w: 600, h: 900 }] },
  { title: "OnTheRocks", year: 2024, type: "photo", folder: "11-ontherocks", media: [{ src: "01.jpg", w: 600, h: 900 }, { src: "02.jpg", w: 600, h: 900 }, { src: "03.jpg", w: 600, h: 900 }, { src: "04.jpg", w: 600, h: 900 }, { src: "05.jpg", w: 600, h: 900 }, { src: "06.jpg", w: 600, h: 900 }] },
  { title: "Wehea Lookbook", year: 2025, type: "photo", folder: "12-wehea-lookbook", media: [{ src: "01.jpg", w: 720, h: 900 }, { src: "02.jpg", w: 720, h: 900 }, { src: "03.jpg", w: 720, h: 900 }, { src: "04.jpg", w: 720, h: 900 }, { src: "05.jpg", w: 720, h: 900 }, { src: "06.jpg", w: 720, h: 900 }] },
  { title: "MRC x Hangar", year: 2025, type: "photo", folder: "13-mrc-x-hangar", media: [{ src: "01.jpg", w: 724, h: 900 }, { src: "02.jpg", w: 900, h: 600 }, { src: "03.jpg", w: 900, h: 600 }, { src: "04.jpg", w: 600, h: 900 }, { src: "05.jpg", w: 900, h: 600 }, { src: "06.jpg", w: 600, h: 900 }] },
  { title: "Southern Italian Escape", year: 2024, type: "photo", folder: "14-southern-italian-escape", media: [{ src: "01.jpg", w: 600, h: 900 }, { src: "02.jpg", w: 600, h: 900 }, { src: "03.jpg", w: 600, h: 900 }, { src: "04.jpg", w: 600, h: 900 }, { src: "05.jpg", w: 600, h: 900 }, { src: "06.jpg", w: 600, h: 900 }, { src: "07.jpg", w: 600, h: 900 }] },
  { title: "Basketball", year: 2025, type: "photo", folder: "15-basketball", media: [{ src: "01.jpg", w: 600, h: 900 }, { src: "02.jpg", w: 600, h: 900 }, { src: "03.jpg", w: 600, h: 900 }] },
  { title: "Mare Frame", year: 2025, type: "photo", folder: "16-mare-frame", media: [{ src: "01.jpg", w: 900, h: 675 }, { src: "02.jpg", w: 900, h: 630 }] },
  { title: "Bolla\\Wehea Fashion Show", year: 2025, type: "video", folder: "17-bollawehea-fashion-show", media: [{ src: "video-01-poster.jpg", w: 900, h: 506, video: "video-01.mp4" }, { src: "video-02-poster.jpg", w: 900, h: 506, video: "video-02.mp4" }, { src: "video-03-poster.jpg", w: 900, h: 506, video: "video-03.mp4" }] },
  { title: "WeheaCreativeStudio x Tears4Dinner", year: 2025, type: "video", folder: "18-weheacreativestudio-x-tears4dinner", media: [{ src: "video-01-poster.jpg", w: 900, h: 508, video: "video-01.mp4" }] },
  { title: "WCS", year: 2025, type: "video", folder: "19-wcs", media: [{ src: "video-01-poster.jpg", w: 900, h: 658, video: "video-01.mp4" }] },
  { title: "Wehea present Mythcore Fashion Show", year: 2025, type: "video", folder: "20-wehea-present-mythcore-fashion-show", media: [{ src: "video-01-poster.jpg", w: 900, h: 720, video: "video-01.mp4" }] },
  { title: "MTFK Teaser", year: 2025, type: "video", folder: "21-mtfk-teaser", media: [{ src: "video-01-poster.jpg", w: 900, h: 720, video: "video-01.mp4" }] },
  { title: "Afrobar Vibes", year: 2025, type: "video", folder: "22-afrobar-vibes", media: [{ src: "video-01-poster.jpg", w: 900, h: 720, video: "video-01.mp4" }] },
  { title: "Nightlife Footages", year: 2025, type: "video", folder: "23-gianma-bln-in-catania-sunrise", media: [{ src: "video-01-poster.jpg", w: 900, h: 506, video: "video-01.mp4" }, { src: "video-02-poster.jpg", w: 900, h: 506, video: "video-02.mp4" }] },
];

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pad = (n, len = 2) => String(n).padStart(len, "0");
const lerp = (a, b, t) => a + (b - a) * t;

// Cursore personalizzato: pallino che diventa un cerchio con etichetta su [data-cursor].
function initCursor() {
  const cursor = document.querySelector(".cursor");
  if (!cursor || !finePointer) return;
  const label = cursor.querySelector(".cursor-label");

  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.classList.add("visible");
  });

  document.addEventListener("mouseleave", () => cursor.classList.remove("visible"));

  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest("[data-cursor]");
    if (target) {
      label.textContent = target.dataset.cursor;
      cursor.classList.add("has-label");
    } else {
      cursor.classList.remove("has-label");
    }
  });

  (function loop() {
    cx = lerp(cx, x, 0.22);
    cy = lerp(cy, y, 0.22);
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  })();
}

// Chiude la tendina e poi cambia pagina.
function leaveTo(url) {
  const shutter = document.querySelector(".shutter");
  if (!shutter || reducedMotion) {
    window.location.href = url;
    return;
  }
  shutter.classList.remove("is-opening");
  shutter.classList.add("is-closed");
  setTimeout(() => { window.location.href = url; }, 950);
}

// Animazioni di comparsa (.split e .reveal-up) quando entrano nello schermo.
// Si osserva la .line (non lo .split, che è fuori dal suo overflow e quindi "invisibile").
function initTextReveals(root = document) {
  const els = [...root.querySelectorAll(".line, .reveal-up")];
  const show = (el) => {
    el.classList.add("in");
    el.querySelectorAll(":scope > .split").forEach((s) => s.classList.add("in"));
  };
  if (!("IntersectionObserver" in window)) {
    els.forEach(show);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      show(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
}

// Ritardi a cascata per gli elementi dell'intro/hero.
function stagger(selector, start = 0, step = 0.09) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${start + i * step}s`;
  });
}

// ===== INTRO (index.html) =====
function initIntro() {
  const enter = document.getElementById("enter");
  if (!enter) return;

  // Timecode stile videocamera (25 fps) + data in sovrimpressione
  const tc = document.getElementById("timecode");
  const startTime = performance.now();
  (function tick() {
    const t = (performance.now() - startTime) / 1000;
    const f = Math.floor((t % 1) * 25);
    tc.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(Math.floor(t) % 60)}:${pad(f)}`;
    requestAnimationFrame(tick);
  })();

  const d = new Date();
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  document.getElementById("hudDate").textContent = `${months[d.getMonth()]}. ${pad(d.getDate())} ${d.getFullYear()}`;

  // Parallasse leggera dello sfondo
  const bg = document.querySelector(".intro-bg");
  if (finePointer && !reducedMotion) {
    window.addEventListener("mousemove", (e) => {
      const px = (e.clientX / innerWidth - 0.5) * -30;
      const py = (e.clientY / innerHeight - 0.5) * -30;
      bg.style.setProperty("--px", `${px}px`);
      bg.style.setProperty("--py", `${py}px`);
    });
  }

  // Bottone magnetico
  if (finePointer && !reducedMotion) {
    enter.addEventListener("mousemove", (e) => {
      const r = enter.getBoundingClientRect();
      const mx = (e.clientX - r.left - r.width / 2) * 0.3;
      const my = (e.clientY - r.top - r.height / 2) * 0.4;
      enter.style.transform = `translate(${mx}px, ${my}px)`;
    });
    enter.addEventListener("mouseleave", () => { enter.style.transform = ""; });
  }

  // Preloader 000 → 100
  const loader = document.getElementById("loader");
  const count = document.getElementById("loaderCount");
  const bar = document.getElementById("loaderBar");
  const duration = reducedMotion ? 0 : 1500;
  const t0 = performance.now();

  stagger(".intro .split", 0.15, 0.1);
  stagger(".intro .reveal-up", 0.4, 0.1);

  (function load(now) {
    const p = duration ? Math.min(1, (now - t0) / duration) : 1;
    const eased = 1 - Math.pow(1 - p, 3);
    count.textContent = pad(Math.round(eased * 100), 3);
    bar.style.width = `${eased * 100}%`;
    if (p < 1) {
      requestAnimationFrame(load);
    } else {
      loader.classList.add("done");
      document.body.classList.remove("is-loading");
      setTimeout(() => initTextReveals(), 250);
    }
  })(t0);

  enter.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.add("leaving");
    leaveTo(enter.href);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement === document.body) enter.click();
  });
}

// ===== HOME (home.html) =====
const TYPE_LABEL = { photo: "foto", video: "video" };

function mediaUrl(p, m, size) {
  return `${MEDIA}${p.folder}/${size}/${m.src}`;
}

function renderArchive(container) {
  container.innerHTML = projects.map((p, pi) => {
    const shots = p.media.map((m, mi) => `
      <button class="shot" style="--ar: ${m.w} / ${m.h}" data-p="${pi}" data-m="${mi}" aria-label="${p.title}, ${mi + 1}">
        <img src="${mediaUrl(p, m, "thumbs")}" alt="" loading="lazy" decoding="async" width="${m.w}" height="${m.h}">
        ${m.video ? '<span class="shot-play">▶ video</span>' : ""}
      </button>`).join("");
    const n = p.media.length;
    return `
      <article class="row" data-type="${p.type}">
        <div class="row-meta">
          <span class="row-num">${pad(pi + 1)}</span>
          <h2 class="row-title">${p.title}</h2>
          <span class="row-sub">${p.year}, ${n} ${TYPE_LABEL[p.type]}</span>
        </div>
        <div class="strip">${shots}</div>
      </article>`;
  }).join("");

  container.querySelectorAll(".shot img").forEach((img) => {
    if (img.complete) img.classList.add("loaded");
    else img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
  });
}

function initFilters(rows) {
  const buttons = document.querySelectorAll(".filter");

  function apply(filter) {
    buttons.forEach((b) => b.classList.toggle("active", b.dataset.filter === filter));
    rows.forEach((r) => { r.hidden = filter !== "all" && r.dataset.type !== filter; });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      apply(btn.dataset.filter);
      history.replaceState(null, "", btn.dataset.filter === "all" ? location.pathname : `#${btn.dataset.filter}`);
      window.scrollTo({ top: 0 });
    });
  });

  // Permette link diretti tipo home.html#video
  function applyHash() {
    const hash = location.hash.slice(1);
    if (hash === "photo" || hash === "video") apply(hash);
    else if (!hash) apply("all");
  }
  applyHash();
  window.addEventListener("hashchange", applyHash);
}

// Visore a schermo intero: scorre le foto/video del progetto aperto.
function initViewer(container) {
  const viewer = document.getElementById("viewer");
  const stage = document.getElementById("viewerStage");
  const title = document.getElementById("viewerTitle");
  const count = document.getElementById("viewerCount");
  let p = null, i = 0, lastFocus = null;

  function show() {
    const m = p.media[i];
    count.textContent = `${i + 1} / ${p.media.length}`;
    if (m.video) {
      stage.innerHTML = `<video src="${MEDIA}${p.folder}/${m.video}" poster="${mediaUrl(p, m, "web")}" controls autoplay playsinline></video>`;
    } else {
      stage.innerHTML = `<img src="${mediaUrl(p, m, "web")}" alt="${p.title}, ${i + 1}">`;
    }
    // precarica la successiva
    const next = p.media[(i + 1) % p.media.length];
    if (!next.video) new Image().src = mediaUrl(p, next, "web");
  }

  function open(pi, mi) {
    p = projects[pi];
    i = mi;
    title.textContent = `${p.title}, ${p.year}`;
    lastFocus = document.activeElement;
    viewer.hidden = false;
    document.body.classList.add("viewer-open");
    show();
    document.getElementById("viewerClose").focus();
  }

  function close() {
    viewer.hidden = true;
    stage.innerHTML = "";
    document.body.classList.remove("viewer-open");
    if (lastFocus) lastFocus.focus();
  }

  const step = (d) => {
    i = (i + d + p.media.length) % p.media.length;
    show();
  };

  container.addEventListener("click", (e) => {
    const shot = e.target.closest(".shot");
    if (shot) open(+shot.dataset.p, +shot.dataset.m);
  });

  document.getElementById("viewerClose").addEventListener("click", close);
  document.getElementById("viewerPrev").addEventListener("click", () => step(-1));
  document.getElementById("viewerNext").addEventListener("click", () => step(1));

  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  // Swipe su mobile
  let x0 = null;
  viewer.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    x0 = null;
  });
}

function initHome() {
  const container = document.getElementById("archive");
  if (!container) return;

  renderArchive(container);
  initFilters([...container.querySelectorAll(".row")]);
  initViewer(container);

  document.getElementById("backTop").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
}

// Se si torna indietro dalla cronologia (bfcache) la tendina potrebbe restare chiusa.
window.addEventListener("pageshow", (e) => {
  if (!e.persisted) return;
  document.body.classList.remove("leaving");
  const shutter = document.querySelector(".shutter");
  if (shutter) shutter.classList.remove("is-closed", "is-opening");
});

document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initIntro();
  initHome();
});

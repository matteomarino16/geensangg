// ===== GEENSANG — script del sito =====

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

  stagger(".intro .split", 0.15, 0.1);
  stagger(".intro .reveal-up", 0.4, 0.1);
  requestAnimationFrame(() => initTextReveals());

  // Alcuni browser bloccano l'autoplay finché la pagina non è visibile: riprova.
  const video = document.querySelector(".intro-bg video");
  if (video) {
    const play = () => video.play().catch(() => {});
    play();
    document.addEventListener("visibilitychange", play);
    document.addEventListener("pointerdown", play, { once: true });
  }

  enter.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.add("leaving");
    leaveTo(enter.href);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement === document.body) enter.click();
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

// ===== HOME e pagine progetto =====
// L'HTML è generato da build.py: qui si aggiungono solo filtri, visore e piccole comodità.

// Visore a schermo intero: scorre gli elementi .shot del gruppo [data-gallery] cliccato.
function initViewer() {
  const viewer = document.getElementById("viewer");
  if (!viewer) return;
  const stage = document.getElementById("viewerStage");
  const title = document.getElementById("viewerTitle");
  const count = document.getElementById("viewerCount");
  let items = [], i = 0, lastFocus = null;

  function show() {
    const it = items[i];
    count.textContent = `${i + 1} / ${items.length}`;
    stage.innerHTML = "";
    if (it.video) {
      const v = document.createElement("video");
      Object.assign(v, { src: it.video, poster: it.full, controls: true, autoplay: true, playsInline: true });
      stage.append(v);
    } else {
      const img = new Image();
      img.src = it.full;
      img.alt = it.alt;
      stage.append(img);
      // precarica la successiva
      const next = items[(i + 1) % items.length];
      if (!next.video) new Image().src = next.full;
    }
  }

  function open(shot) {
    const group = shot.closest("[data-gallery]");
    const shots = [...group.querySelectorAll(".shot")];
    items = shots.map((s) => ({ full: s.dataset.full, video: s.dataset.video, alt: s.querySelector("img").alt }));
    i = shots.indexOf(shot);
    title.textContent = group.dataset.title;
    lastFocus = shot;
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
    i = (i + d + items.length) % items.length;
    show();
  };

  document.addEventListener("click", (e) => {
    const shot = e.target.closest(".shot");
    if (shot) open(shot);
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
  // Dissolvenza delle miniature quando arrivano
  document.querySelectorAll(".shot img").forEach((img) => {
    if (img.complete) img.classList.add("loaded");
    else img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
  });

  const archive = document.getElementById("archive");
  if (archive) initFilters([...archive.querySelectorAll(".row")]);

  initViewer();

  const backTop = document.getElementById("backTop");
  if (backTop) {
    backTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }
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

// ===== Dati progetti =====
// Per aggiungere un progetto basta aggiungere una riga qui.
const CDN = "https://cdn.myportfolio.com/8b7347df-6b14-4ca2-82a1-d36a3bbc4a6c/";
const SITE = "https://geensang.myportfolio.com/";

const projects = [
  // Photography
  { title: "Redbull x Adidas in Sneakers 76", year: 2026, type: "photo", slug: "redbull-x-adidas-in-sneakers-76", img: "37854a9c-0523-4d4f-99df-4f2859fbd89e_rwc_0x759x1920x1501x1920.jpg?h=5d03601006adcd46e0c0c5b12809b9fa" },
  { title: "Silhouette", year: 2026, type: "photo", slug: "silhouette", img: "e7f73ad5-0ca7-4a10-9bdc-32be730c01b7_carw_202x158x5120.jpg?h=28d48b8f526184327bb24287533e0be6" },
  { title: "Fashion Killa", year: 2026, type: "photo", slug: "fashion-killa", img: "f5fc4f5e-bbbc-4f25-9fb5-51030d4faa1c_carw_202x158x5120.jpg?h=7e5e9de9f24b0cac3879fd5e3e39a10a" },
  { title: "Aura", year: 2026, type: "photo", slug: "aura", img: "d7eb597f-aa91-48b9-8fce-5430b32cee8d_carw_202x158x5120.png?h=f11f8691b486df07bd33889e4fc5f977" },
  { title: "Wehea\\Bolla Merch", year: 2025, type: "photo", slug: "weheabolla-merch", img: "734964f7-922e-44c2-b6f2-061f272ae437_carw_202x158x5120.jpg?h=42f9badc61f95f34287359341d578929" },
  { title: "Nightlife", year: 2025, type: "photo", slug: "nightlife", img: "4671832f-f052-4947-a859-5a7f7cc6c755_carw_202x158x5120.jpg?h=6c6f38ba49a6a6a4a7b4ff772dea3e53" },
  { title: "Wehea || Bolla || Lookbook", year: 2026, type: "photo", slug: "wehea-bolla-lookbook", img: "ff8077ad-e429-4307-a7a0-9ab61250433a_carw_202x158x5120.jpg?h=f428228b764dfcfef89eacb25470e18a" },
  { title: "Tattoo\\4", year: 2025, type: "photo", slug: "savage-tattoo", img: "e4c08536-3612-49db-ba3d-4c1e0273f73e_carw_202x158x5120.jpg?h=5e008583eced48a2b90c62f17b638e13" },
  { title: "DMT x Sound Department", year: 2025, type: "photo", slug: "dmt-x-sound-department", img: "73b46873-a54f-44d4-86a0-b3f001686a29_rwc_572x56x1773x1386x1773.png?h=b8a1aebef58c504be768698ba7caf250" },
  { title: "El Cohiba", year: 2025, type: "photo", slug: "el-cohiba", img: "b3e460ba-a683-463e-8f61-2f4e2eb452ce_carw_202x158x5120.jpg?h=7f46a4a6d8283d29849d29fd7e86769e" },
  { title: "OnTheRocks", year: 2024, type: "photo", slug: "ontherocks", img: "816c39d1-b589-48ec-b980-e5da5ed21daa_carw_202x158x5120.jpg?h=e69cb712e24c1e015db06406ce8f8e4d" },
  { title: "Wehea Lookbook", year: 2025, type: "photo", slug: "wehea-lookbook", img: "614a6181-99bb-464f-a63f-e64f4f841546_carw_202x158x5120.jpg?h=2f5338c4840ff2dce67b8c4ceee7a4b3" },
  { title: "MRC x Hangar", year: 2025, type: "photo", slug: "mrc-x-hangar", img: "673de333-9278-4c47-aab0-ae00149969d0_carw_202x158x5120.jpg?h=66c6626ab42c1f8a83f1d5b85557bf0c" },
  { title: "Southern Italian Escape", year: 2024, type: "photo", slug: "southern-italian-escape", img: "bc7da916-6129-454a-9142-dffb2e7af2d2_carw_202x158x5120.jpg?h=d31a3468b02a3c9b55cf95f2ee830540" },
  { title: "Basketball", year: 2025, type: "photo", slug: "basketball", img: "5355048d-a806-45ca-9011-39a1f38992fa_carw_202x158x5120.jpg?h=cb4c907fd5b7642c0030ba04c81a49c8" },
  { title: "Mare Frame", year: 2025, type: "photo", slug: "mare-frame", img: "0c7080b6-b085-4356-957d-8916b782f5a5_carw_202x158x5120.jpg?h=dfbb70a82f800e5406dd03b93b694f71" },

  // Video
  { title: "Bolla\\Wehea Fashion Show", year: 2025, type: "video", slug: "bollawehea-fashion-show", img: "a8135cdd-76eb-4af8-8531-da4224b51c32_rwc_688x190x1500x1172x1500.png?h=542a503f2974b46b01ba1219678649fb" },
  { title: "WeheaCreativeStudio x Tears4Dinner", year: 2025, type: "video", slug: "weheacreativestudio-x-tears4dinner", img: "df2feb84-eae2-43c1-a20a-802797bb48f8_rwc_770x183x1303x1019x1303.png?h=b3db077eb5b3be8d2a951a4b8e4698c0" },
  { title: "WCS", year: 2025, type: "video", slug: "wcs", img: "ac3b672f-4717-4ada-82a7-e141c0e6cc84_rwc_669x177x1303x1019x1303.png?h=e3b2c102a5612d9e623f6e3857b9161f" },
  { title: "Wehea present Mythcore Fashion Show", year: 2025, type: "video", slug: "wehea-present-mythcore-fashion-show", img: "22c9dd94-c81b-42cc-86db-292870bdb384_rwc_748x11x1238x968x1238.png?h=9245d4376b38948c6e2738d348b76c0d" },
  { title: "MTFK Teaser", year: 2025, type: "video", slug: "mtfk-teaser", img: "b50a916d-3f5d-4b55-8fc9-d5d315c6898d_carw_202x158x5120.jpg?h=96a40808029b7bfdb0854c314faed195" },
  { title: "Afrobar Vibes", year: 2025, type: "video", slug: "afrobar-vibes", img: "291667ea-0843-4003-b2a4-cd169687884d_rwc_788x302x1303x1019x1303.png?h=005b3a466cd1cfd02c862a11bb634b95" },
  { title: "Nightlife Footages", year: 2025, type: "video", slug: "gianma-bln-in-catania-sunrise", img: "19b0d53d-9e8f-4b98-a87b-f6136ae2036d_rwc_604x308x1303x1019x1303.png?h=7531652e8e88be1e55327a907dd80059" },
];

const TYPE_LABEL = { photo: "Photography", video: "Video" };

// ===== Intro (index.html) =====
function initIntro() {
  const enter = document.getElementById("enter");
  if (!enter) return;

  enter.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => { window.location.href = enter.href; }, 600);
  });

  // Invio = entra
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") enter.click();
  });
}

// ===== Home (home.html) =====
function renderProjects(grid) {
  grid.innerHTML = projects.map((p) => `
    <a class="card" data-type="${p.type}" href="${SITE}${p.slug}" target="_blank" rel="noopener">
      <img src="${CDN}${p.img}" alt="${p.title}" loading="lazy">
      <div class="card-info">
        <h3 class="card-title">${p.title}</h3>
        <span class="card-meta">${TYPE_LABEL[p.type]} · ${p.year}</span>
      </div>
    </a>
  `).join("");
}

let io = null;

// (Ri)osserva le card non ancora apparse: va richiamata anche dopo un filtro,
// perché le card nascoste con display:none non vengono notificate dall'observer.
function revealOnScroll(cards) {
  if (!("IntersectionObserver" in window)) {
    cards.forEach((c) => c.classList.add("visible"));
    return;
  }
  if (io) {
    cards.forEach((c) => {
      if (c.classList.contains("visible")) return;
      io.unobserve(c);
      io.observe(c);
    });
    return;
  }
  io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
      entry.target.classList.add("visible");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  cards.forEach((c) => io.observe(c));
}

function initFilters(cards, nav, toggle) {
  const buttons = document.querySelectorAll(".filter");

  function apply(filter) {
    buttons.forEach((b) => b.classList.toggle("active", b.dataset.filter === filter));
    cards.forEach((c) => c.classList.toggle("hidden", filter !== "all" && c.dataset.type !== filter));
    revealOnScroll(cards.filter((c) => !c.classList.contains("hidden")));
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      apply(btn.dataset.filter);
      history.replaceState(null, "", btn.dataset.filter === "all" ? "home.html" : `#${btn.dataset.filter}`);
      closeMenu(nav, toggle);
      window.scrollTo({ top: 0, behavior: "smooth" });
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

function closeMenu(nav, toggle) {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}

function initHome() {
  const grid = document.getElementById("projects");
  if (!grid) return;

  renderProjects(grid);
  const cards = [...grid.querySelectorAll(".card")];
  revealOnScroll(cards);

  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("menuToggle");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelector(".nav-link").addEventListener("click", () => closeMenu(nav, toggle));

  initFilters(cards, nav, toggle);

  document.getElementById("backTop").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  initIntro();
  initHome();
});

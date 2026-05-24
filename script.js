(function () {
  "use strict";

  const logos = [
    { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
    { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
    { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel" },
    { name: "Git", icon: "https://cdn.simpleicons.org/git" },
    { name: "Vue.js", icon: "https://cdn.simpleicons.org/vuedotjs" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
    { name: "HTML", icon: "https://cdn.simpleicons.org/html5" },
    { name: "Python", icon: "https://cdn.simpleicons.org/python" },
    { name: "Yarn", icon: "https://cdn.simpleicons.org/yarn" },
    { name: "GitHub", icon: "https://cdn.simpleicons.org/github" },
    { name: "GitLab", icon: "https://cdn.simpleicons.org/gitlab" },
    { name: "React", icon: "https://cdn.simpleicons.org/react" },
    { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
    { name: "C", icon: "https://cdn.simpleicons.org/c" },
  ];

  const education = [
    {
      name: "Gymnázium Ladislava Jaroše Holešov",
      period: "2013 - 2021",
    },
    {
      name: "Univerzita Tomáše Bati",
      faculty: "Fakulta Aplikované informatiky",
      studyProgram: "Softwarové inženýrství - Bc.",
      period: "2022 - 2025",
      flip: {
        id: "bachelor-thesis",
        direction: "ccw",
        openLabel: "Otevřít detail bakalářské práce",
        backContentBuilder: buildBachelorThesisBackContent,
      },
    },
    {
      name: "Univerzita Tomáše Bati",
      faculty: "Fakulta Aplikované informatiky",
      studyProgram: "Informační technologie – Kybernetická bezpečnost – Ing.",
      period: "2025 - současnost",
      flip: {
        id: "master-thesis",
        direction: "cw",
        openLabel: "Otevřít detail diplomové práce",
        backContentBuilder: buildMasterThesisBackContent,
      },
    },
  ];

  const bachelorThesisDetails = {
    title:
      "Analýza vlivu vnějších podmínek na vlastnosti optických vláken a návrh aplikace pro optimální instalaci",
    author: "Martin Žůrek",
    year: "2025",
    university: "Univerzita UTB ve Zlíně",
    study: "Softwarové inženýrství",
    abstract: [
      "Bakalářská práce se zabývá laboratorním měřením vlivu vnějších podmínek na vlastnosti optických vláken a návrhem webové aplikace sloužící k plánování optimalizovaných tras optických svazků uvnitř budov.",
      "Teoretická část je věnována úvodu do tématu optických vláken, shrnutí historie a představení základních vlastností. Obsahuje rozdělení vláken dle jednotlivých typů a porovnává vlastnosti optických vláken s metalickými vodiči.",
      "Praktická část popisuje postup měření jednotlivých experimentů, interpretuje naměřená data a vyhodnocuje výsledky měření. Zahrnuje i představení navržené webové aplikace a její funkcionality.",
    ],
    tags: [
      "optické vlákno",
      "poloměr ohybu",
      "útlum",
      "akceptační úhel",
      "numerická apertura",
    ],
    pdfUrl: "assets/files/AP6BS_fulltext.pdf",
    githubUrl: "https://github.com/ZurekMartin/AP6BS",
  };

  const masterThesisDetails = {
    title: "Identifikace bezdrátových zařízení pomocí radiofrekvenčních otisků",
    author: "Martin Žůrek",
    year: "2027",
    university: "Univerzita UTB ve Zlíně",
    specialization: "Kybernetická bezpečnost",
    annotation: [
      "Diplomová práce se zabývá analýzou možností využití radiofrekvenčních otisků (RF Fingerprinting) pro identifikaci bezdrátových zařízení na fyzické vrstvě komunikace. Výzkum je zaměřen na analýzu unikátních charakteristik RF signálu vznikajících v důsledku hardwarových nedokonalostí vysílačů pracujících v sub-GHz pásmech, typických pro přístupové a IoT systémy.",
      "Cílem práce je pomocí softwarově definovaného rádia experimentálně ověřit schopnost rozlišení jednotlivých zdrojů signálu, navrhnout a implementovat základní řetězec zpracování zahrnující akvizici signálu, extrakci příznaků a vyhodnocení shody zařízení s referenční databází, a posoudit možnosti využití této technologie jako doplňkového mechanismu pro zvýšení bezpečnosti bezdrátových systémů.",
      "Součástí práce bude rovněž diskuse praktických omezení metody, zejména vlivu přenosového prostředí, úrovně signálu a stability získaných charakteristik na spolehlivost identifikace zařízení.",
    ],
  };

  function thesisInfoIcon() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9"></circle>
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v5"></path>
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h.01"></path>
    </svg>`;
  }

  function buildThesisTextParagraphs(paragraphs) {
    return paragraphs
      .map(
        (paragraph) =>
          `<p class="text-[0.98rem] leading-7 text-slate-200 text-justify">${escHtml(paragraph)}</p>`,
      )
      .join("");
  }

  function buildThesisTags(tags) {
    return tags
      .map((tag) => `<span class="thesis-tag-pill">${escHtml(tag)}</span>`)
      .join("");
  }

  function buildThesisMeta(metaItems) {
    return metaItems
      .map(
        (item, idx) =>
          `${idx > 0 ? '<span class="thesis-meta-sep" aria-hidden="true">|</span>' : ""}<span class="thesis-meta-item"><span class="thesis-meta-label">${escHtml(item.label)}</span>&nbsp;<span class="thesis-meta-value">${escHtml(item.value)}</span></span>`,
      )
      .join("");
  }

  function getEducationFlipConfigById(flipId) {
    for (const item of education) {
      if (
        item?.flip?.id === flipId &&
        typeof item.flip.backContentBuilder === "function"
      ) {
        return item.flip;
      }
    }
    return null;
  }

  function buildEducationCard(item, options = {}) {
    const timelineSide = options.timelineSide === "left" ? "left" : "right";
    const iconPositionClass =
      timelineSide === "left"
        ? "thesis-info-trigger--left"
        : "thesis-info-trigger--right";
    const contentPaddingClass = timelineSide === "left" ? "pl-10" : "pr-10";
    const flipConfig =
      item?.flip && typeof item.flip.backContentBuilder === "function"
        ? item.flip
        : null;

    if (!flipConfig) {
      return `
      <div class="bg-slate-900/60 p-5 rounded-xl shadow-xl border border-white/5"
           style="-webkit-backdrop-filter: blur(var(--ui-backdrop-blur)); backdrop-filter: blur(var(--ui-backdrop-blur))">
        <h3 class="text-lg font-extrabold text-white mb-1">${escHtml(item.name)}</h3>
        ${item.faculty ? `<p class="text-xs uppercase text-zinc-400 tracking-wider mb-1">${escHtml(item.faculty)}</p>` : ""}
        ${item.studyProgram ? `<p class="text-sm italic text-zinc-300 mb-2">${escHtml(item.studyProgram)}</p>` : ""}
        <p class="text-sm text-zinc-400 font-medium">${escHtml(item.period)}</p>
      </div>`;
    }

    return `
    <div class="bg-slate-900/60 p-5 rounded-xl shadow-xl border border-white/5 thesis-front-card relative"
         data-flip-source="${escHtml(flipConfig.id)}"
         style="-webkit-backdrop-filter: blur(var(--ui-backdrop-blur)); backdrop-filter: blur(var(--ui-backdrop-blur))">
      <button type="button"
        class="thesis-info-trigger ${iconPositionClass}"
        data-flip-open="${escHtml(flipConfig.id)}"
        data-flip-direction="${flipConfig.direction === "cw" ? "cw" : "ccw"}"
        aria-label="${escHtml(flipConfig.openLabel || "Otevřít detail práce")}">
        ${thesisInfoIcon()}
      </button>
      <div class="${contentPaddingClass}">
        <h3 class="text-lg font-extrabold text-white mb-1">${escHtml(item.name)}</h3>
        ${item.faculty ? `<p class="text-xs uppercase text-zinc-400 tracking-wider mb-1">${escHtml(item.faculty)}</p>` : ""}
        ${item.studyProgram ? `<p class="text-sm italic text-zinc-300 mb-2">${escHtml(item.studyProgram)}</p>` : ""}
        <p class="text-sm text-zinc-400 font-medium">${escHtml(item.period)}</p>
      </div>
    </div>`;
  }

  function buildBachelorThesisBackContent() {
    return `
    <div class="thesis-card-face-inner thesis-card-back-surface">
      <div class="thesis-card-back-header">
        <h3 class="thesis-card-back-title">${escHtml(bachelorThesisDetails.title)}</h3>
        <button type="button" class="thesis-card-close" data-thesis-close aria-label="Zavřít detail bakalářské práce">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12"></path>
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 6L6 18"></path>
          </svg>
        </button>
      </div>

      <div class="thesis-card-back-meta">
        ${buildThesisMeta([
          { label: "Autor", value: bachelorThesisDetails.author },
          { label: "Rok", value: bachelorThesisDetails.year },
          { label: "Univerzita", value: bachelorThesisDetails.university },
          { label: "Obor", value: bachelorThesisDetails.study },
        ])}
      </div>

      <div class="thesis-card-back-body">
        <p class="thesis-card-abstract-label">Abstrakt</p>
        <div class="thesis-abstract-list">
          ${buildThesisTextParagraphs(bachelorThesisDetails.abstract)}
        </div>
      </div>

      <div class="thesis-card-tags">
        ${buildThesisTags(bachelorThesisDetails.tags)}
      </div>

      <div class="thesis-card-actions">
        <a href="${bachelorThesisDetails.pdfUrl}" target="_blank" rel="noopener noreferrer" class="thesis-card-button thesis-card-button--primary">Zobrazit PDF</a>
        <a href="${bachelorThesisDetails.githubUrl}" target="_blank" rel="noopener noreferrer" class="thesis-card-button thesis-card-button--secondary">GitHub repozitář</a>
      </div>
    </div>`;
  }

  function buildMasterThesisBackContent() {
    return `
    <div class="thesis-card-face-inner thesis-card-back-surface">
      <div class="thesis-card-back-header" style="padding-bottom: 1rem;">
        <h3 class="thesis-card-back-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; margin: 0;" title="${escHtml(masterThesisDetails.title)}">${escHtml(masterThesisDetails.title)}</h3>
        <button type="button" class="thesis-card-close" data-thesis-close aria-label="Zavřít detail diplomové práce">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12"></path>
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 6L6 18"></path>
          </svg>
        </button>
      </div>

      <div class="thesis-card-back-meta">
        ${buildThesisMeta([
          { label: "Autor", value: masterThesisDetails.author },
          { label: "Rok", value: masterThesisDetails.year },
          { label: "Univerzita", value: masterThesisDetails.university },
          { label: "Specializace", value: masterThesisDetails.specialization },
        ])}
      </div>

      <div class="thesis-card-back-body">
        <p class="thesis-card-abstract-label">Anotace</p>
        <div class="thesis-abstract-list">
          ${buildThesisTextParagraphs(masterThesisDetails.annotation)}
        </div>
      </div>

      <div style="height: 1px; flex: 0 0 auto; pointer-events: none; visibility: hidden;"></div>
    </div>`;
  }

  function buildEducationFlipOverlay({
    frontContent,
    backContent,
    backRotationDeg,
  }) {
    return `
    <div class="thesis-card-overlay" data-thesis-overlay aria-hidden="true">
      <div class="thesis-card-backdrop" data-thesis-backdrop></div>
      <div class="thesis-card-shell" data-thesis-shell>
        <div class="thesis-card-scene" style="--flip-back-rotation: ${backRotationDeg}deg;">
          <div class="thesis-card-spine" aria-hidden="true"></div>
          <div class="thesis-card-face thesis-card-face--front">
            <div class="thesis-card-face-inner thesis-card-front-host">
              ${frontContent}
            </div>
          </div>

          <div class="thesis-card-face thesis-card-face--back">
            ${backContent}
          </div>
        </div>
      </div>
    </div>`;
  }

  const projects = [
    {
      title: "AP3KR",
      subtitle: "Kryptologie",
      size: "M",
      language: "Python",
      link: "https://www.github.com/ZurekMartin/AP3KR",
    },
    {
      title: "AP5PM",
      subtitle: "Programování mobilních aplikací",
      size: "S",
      language: "TypeScript",
      link: "https://www.github.com/ZurekMartin/AP5PM",
    },
    {
      title: "AP5PW",
      subtitle: "Pokročilé webové technologie",
      size: "S",
      language: "C#",
      link: "https://www.github.com/ZurekMartin/AP5PW",
    },
    {
      title: "AP6UI",
      subtitle: "Umělá a výpočetní inteligence",
      size: "S",
      language: "Python",
      link: "https://www.github.com/ZurekMartin/AP6UI",
    },
    {
      title: "AP7AK",
      subtitle: "Aplikovaná kryptologie",
      size: "M",
      language: "Python",
      link: "https://www.github.com/ZurekMartin/AP7AK",
    },
    {
      title: "AP7MT",
      subtitle: "Mobilní technologie",
      size: "S",
      language: "Kotlin",
      link: "https://www.github.com/ZurekMartin/AP7MT",
    },
    {
      title: "AP7SU",
      subtitle: "Strojové učení",
      size: "S",
      language: "Jupyter notebook",
      link: "https://www.github.com/ZurekMartin/AP7SU",
    },
    {
      title: "AP8BO",
      subtitle: "Bezpečnost operačních systémů",
      size: "M",
      language: "C",
      link: "https://www.github.com/ZurekMartin/AP8BO",
    },
    {
      title: "AP8UN",
      subtitle: "Umělé neuronové sítě",
      size: "S",
      language: "Jupyter Notebook",
      link: "https://www.github.com/ZurekMartin/AP8UN",
    },
    {
      title: "SimpleRecipes",
      subtitle: "Jednoduchý receptář",
      size: "S",
      language: "JavaScript",
      link: "https://www.github.com/ZurekMartin/SimpleRecipes",
    },
  ];

  const otherProjects = [
    {
      url: "https://siskaconstructioninc.com",
      logo: "./assets/logos/siskaconstructioninc_logo.png",
      description: "Siska Construction Inc.",
    },
  ];

  const SHAPES = {
    M_h: { w: 2, h: 1 },
    M_v: { w: 1, h: 2 },
    S: { w: 1, h: 1 },
  };
  const MAX_ROWS = 4;
  const MAX_COLS = 4;
  const GUARDED = new Set(["M_h", "M_v"]);
  const NEIGHBORS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function _prng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (Math.imul(1664525, s) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }
  function _shuffle(arr, rnd) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (rnd() * (i + 1)) | 0;
      const t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  const _structureCache = Object.create(null);
  const areaOf = (sz) => (sz === "M" || sz === "L" ? 2 : 1);

  function _getStructure(projectList, cols) {
    cols = Math.min(cols, MAX_COLS);
    const totalArea = projectList.reduce((sum, p) => sum + areaOf(p.size), 0);

    const key = `${cols}:${totalArea}:${projectList.length}`;
    if (!_structureCache[key]) {
      _structureCache[key] = _buildStructure(projectList, cols);
    }
    return _structureCache[key];
  }

  function _buildStructure(projectList, cols) {
    cols = Math.min(cols, MAX_COLS);
    const rnd = _prng((Math.random() * 0x100000000) | 0);

    const sizes = projectList.map((p) => (p.size === "L" ? "M" : p.size));
    const total = sizes.reduce((s, v) => s + areaOf(v), 0);
    const rows = Math.ceil(total / cols);

    const pool = _shuffle(
      projectList.map((p) =>
        p._isGithub ? "GH" : p.size === "L" ? "M" : p.size,
      ),
      rnd,
    );

    const grid = Array.from({ length: rows }, () => new Array(cols).fill(null));
    const placements = [];

    const firstEmpty = () => {
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) if (!grid[r][c]) return { r, c };
      return null;
    };

    const canPlace = (r, c, w, h, type) => {
      if (r + h > rows || c + w > cols) return false;
      const guarded = GUARDED.has(type);
      for (let rr = r; rr < r + h; rr++) {
        for (let cc = c; cc < c + w; cc++) {
          if (grid[rr][cc]) return false;
          if (guarded) {
            for (const [dr, dc] of NEIGHBORS) {
              const n = grid[rr + dr]?.[cc + dc];
              if (n?.type === type) return false;
            }
          }
        }
      }
      return true;
    };

    const setRect = (r, c, w, h, v) => {
      for (let rr = r; rr < r + h; rr++)
        for (let cc = c; cc < c + w; cc++) grid[rr][cc] = v;
    };

    function bt(remaining) {
      const spot = firstEmpty();
      if (!spot) return remaining.length === 0;
      const { r, c } = spot;

      const seen = new Set();
      for (let i = 0; i < remaining.length; i++) {
        const cat = remaining[i];
        if (seen.has(cat)) continue;
        seen.add(cat);

        const types = cat === "M" ? _shuffle(["M_h", "M_v"], rnd) : ["S"];

        for (const type of types) {
          const { w, h } = SHAPES[type];
          if (!canPlace(r, c, w, h, type)) continue;

          setRect(r, c, w, h, { type });
          placements.push({
            r,
            c,
            w,
            h,
            shapeType: type,
            isGithub: cat === "GH",
          });
          remaining.splice(i, 1);

          if (bt(remaining)) return true;

          remaining.splice(i, 0, cat);
          placements.pop();
          setRect(r, c, w, h, null);
        }
      }
      return false;
    }

    const solved = bt([...pool]);
    if (!solved) return null;

    return placements.sort((a, b) => a.r - b.r || a.c - b.c);
  }

  function computeBentoLayout(projectList, cols) {
    cols = Math.min(cols, MAX_COLS);
    const maxCapacity = cols * MAX_ROWS;

    const githubSize = "S";
    const githubArea = areaOf(githubSize);

    let validStructure = null;
    let trimmedProjects = [];
    let origIndices = [];

    for (let count = projectList.length; count >= 0; count--) {
      origIndices = Array.from({ length: count }, (_, i) => i);
      trimmedProjects = origIndices.map((i) => projectList[i]);

      const totalArea =
        trimmedProjects.reduce((sum, p) => sum + areaOf(p.size), 0) +
        githubArea;

      if (totalArea <= maxCapacity && totalArea % cols === 0) {
        const projectsForStructure = [
          ...trimmedProjects,
          { size: githubSize, _isGithub: true },
        ];

        validStructure = _getStructure(projectsForStructure, cols);
        if (validStructure !== null) {
          break;
        }
      }
    }

    if (!validStructure) return [];

    const rnd = _prng((Math.random() * 0x100000000) | 0);
    const bySize = { M: [], S: [] };

    trimmedProjects.forEach((p, k) => {
      const origIdx = origIndices[k];
      const sz = p.size === "L" ? "M" : p.size;
      bySize[sz].push(origIdx);
    });

    _shuffle(bySize.M, rnd);
    _shuffle(bySize.S, rnd);

    let mp = 0,
      sp = 0;

    return validStructure
      .map((slot) => {
        let index = -1;

        if (!slot.isGithub) {
          if (slot.shapeType === "M_h" || slot.shapeType === "M_v") {
            index = bySize.M[mp++];
          } else {
            index = bySize.S[sp++];
          }
        }

        return {
          index,
          isGithub: slot.isGithub,
          r: slot.r,
          c: slot.c,
          w: slot.w,
          h: slot.h,
        };
      })
      .sort((a, b) => a.r - b.r || a.c - b.c);
  }

  let currentCols = 0;

  function getResponsiveCols() {
    const w = window.innerWidth;
    if (w <= 640) return 2;
    if (w <= 1024) return 3;
    return 4;
  }

  function renderBentoGrid(force = false) {
    const cols = getResponsiveCols();
    if (!force && cols === currentCols) return;
    currentCols = cols;

    const gridEl = document.getElementById("bento-grid");
    const gap = 16 * (cols - 1);
    const available = gridEl.clientWidth - gap;
    if (available <= 0) return;

    const tileSize = Math.floor(available / cols);
    const tilePx = `${tileSize}px`;
    gridEl.style.gridTemplateColumns = `repeat(${cols}, ${tilePx})`;
    gridEl.style.gridAutoRows = tilePx;

    const layout = computeBentoLayout(projects, cols);
    const frag = document.createDocumentFragment();

    for (const { index: idx, isGithub, r, c, w, h } of layout) {
      const a = document.createElement("a");
      a.style.gridColumn = `${c + 1} / span ${w}`;
      a.style.gridRow = `${r + 1} / span ${h}`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      if (isGithub) {
        a.href = "https://github.com/ZurekMartin?tab=repositories";
        a.className =
          "project-tile bento-placeholder bg-slate-900/80 p-4 rounded-lg shadow-lg " +
          "flex flex-col justify-center items-center transform hover:scale-105 " +
          "hover:bg-slate-800 hover:shadow-2xl transition-all duration-300";
        a.innerHTML =
          '<div class="text-center">' +
          '<h3 class="text-lg font-bold text-white">Mnohé další</h3>' +
          '<p class="text-sm text-zinc-400">Otevřít GitHub</p>' +
          "</div>";
      } else if (idx !== -1) {
        const p = projects[idx];
        a.href = p.link;
        a.className =
          "project-tile bg-slate-900 p-4 rounded-lg shadow-lg border border-gray-700 " +
          "flex flex-col justify-between transform hover:scale-105 " +
          "hover:bg-slate-800 hover:shadow-2xl transition-all duration-300";
        a.innerHTML =
          `<div>` +
          `<h3 class="text-lg font-bold text-white">${escHtml(p.title)}</h3>` +
          `<p class="project-subtitle text-sm mb-1">${escHtml(p.subtitle || "")}</p>` +
          `<p class="project-language text-sm text-zinc-400">${escHtml(p.language || "")}</p>` +
          `</div>` +
          `<div class="hover-label mt-3 text-xs text-zinc-300 bg-white/5 px-2 py-1 rounded self-start">` +
          `Otevřít na GitHubu</div>`;
      }
      frag.appendChild(a);
    }

    gridEl.innerHTML = "";
    gridEl.appendChild(frag);
  }

  function renderLogos() {
    const grid = document.getElementById("logos-grid");
    const frag = document.createDocumentFragment();
    for (const { name, icon } of logos) {
      const div = document.createElement("div");
      div.className = "tech-tile";
      div.title = name;
      const img = document.createElement("img");
      img.src = icon;
      img.alt = name;
      img.loading = "lazy";
      img.decoding = "async";
      div.appendChild(img);
      frag.appendChild(div);
    }
    grid.appendChild(frag);
  }

  function renderTimeline() {
    const container = document.getElementById("timeline-items");
    const frag = document.createDocumentFragment();

    education.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "timeline-item flex items-center";
      row.dataset.idx = idx;

      const card = buildEducationCard(item, {
        timelineSide: idx % 2 === 0 ? "left" : "right",
      });

      const circle =
        '<div class="timeline-circle w-3 h-3 bg-blue-500 rounded-full shadow-lg self-center relative z-40 flex-shrink-0"></div>';

      row.innerHTML =
        idx % 2 === 0
          ? `<div class="w-1/2 pr-8 text-right">${card}</div>${circle}<div class="w-1/2"></div>`
          : `<div class="w-1/2"></div>${circle}<div class="w-1/2 pl-8">${card}</div>`;

      frag.appendChild(row);
    });

    container.appendChild(frag);
    initTimelineAnimation();
  }

  function initTimelineAnimation() {
    const timelineContainer = document.getElementById("timeline-container");
    const marker = document.getElementById("timeline-marker");
    const markerInner = document.getElementById("timeline-marker-inner");
    const lineEl = document.getElementById("timeline-line");
    const itemEls = Array.from(document.querySelectorAll(".timeline-item"));
    const circleEls = Array.from(document.querySelectorAll(".timeline-circle"));

    if (!timelineContainer || itemEls.length === 0) return;

    let currentY = null;
    let animFrame = null;

    const setMarker = (y) => {
      marker.style.transform = `translateX(-50%) translateY(${y}px)`;
      currentY = y;
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const addPulse = () => {
      markerInner.style.animation = "pulseScale 1.4s ease-in-out infinite";
    };
    const rmPulse = () => {
      markerInner.style.animation = "none";
    };

    const markerInnerStyles = getComputedStyle(markerInner);
    const markerBg = markerInnerStyles.backgroundColor;
    const markerBox =
      markerInnerStyles.boxShadow || "0 8px 24px rgba(2,6,23,0.45)";
    circleEls.forEach((c) => {
      c.style.transition = "transform 120ms linear";
      c.style.transformOrigin = "center center";
    });

    function animateTo(target, onDone) {
      if (animFrame) cancelAnimationFrame(animFrame);
      const step = () => {
        const prev = currentY !== null ? currentY : target;
        const next = lerp(prev, target, 0.12);
        setMarker(next);
        if (Math.abs(next - target) > 0.5) {
          animFrame = requestAnimationFrame(step);
        } else {
          setMarker(target);
          animFrame = null;
          onDone?.();
        }
      };
      animFrame = requestAnimationFrame(step);
    }

    function update() {
      const firstCirc = circleEls[0];
      const lastCirc = circleEls[circleEls.length - 1];
      const firstEl = itemEls[0];
      const lastEl = itemEls[itemEls.length - 1];
      if (!firstEl || !lastEl) return;

      const scrollY = window.scrollY;
      const fcRect = (firstCirc || firstEl).getBoundingClientRect();
      const lcRect = (lastCirc || lastEl).getBoundingClientRect();
      const firstCenter =
        fcRect.top + scrollY + (firstCirc || firstEl).clientHeight / 2;
      const lastCenter =
        lcRect.top + scrollY + (lastCirc || lastEl).clientHeight / 2;
      const containerTop =
        timelineContainer.getBoundingClientRect().top + scrollY;

      lineEl.style.top = `${Math.round(firstCenter - containerTop)}px`;

      const viewportMid = scrollY + window.innerHeight / 2;
      const progress = Math.max(
        0,
        Math.min(1, (viewportMid - firstCenter) / (lastCenter - firstCenter)),
      );
      const markerH = marker.offsetHeight;
      const mStart = firstCenter - containerTop - markerH / 2;
      const mEnd = lastCenter - containerTop - markerH / 2;
      const desired = Math.max(
        mStart,
        Math.min(
          mEnd,
          firstCenter +
            progress * (lastCenter - firstCenter) -
            containerTop -
            markerH / 2,
        ),
      );

      const markerPosForCheck = currentY !== null ? currentY : desired;
      const markerCenterLocal = markerPosForCheck + markerH / 2;
      const ROTATION_DISTANCE = Math.max(24, markerH * 1.5);

      for (const c of circleEls) {
        const cRect = c.getBoundingClientRect();
        const cCenterGlobal = cRect.top + scrollY + c.clientHeight / 2;
        const cCenterLocal = cCenterGlobal - containerTop;

        const markerInnerRect = markerInner.getBoundingClientRect();
        const markerWidth =
          markerInnerRect.width ||
          marker.getBoundingClientRect().width ||
          marker.offsetWidth ||
          marker.clientWidth;
        const targetScale = cRect.width > 0 ? markerWidth / cRect.width : 1;

        if (markerCenterLocal <= cCenterLocal) {
          c.style.transform = "";
          c.style.boxShadow = "";
          c.style.backgroundColor = "";
          c.style.setProperty("--check-rot", "0deg");
          c.style.setProperty("--check-scale", "0");
          c.style.setProperty("--check-opacity", "0");
          c.classList.remove("revealed");
          c.classList.remove("completed");
        } else {
          const delta = markerCenterLocal - cCenterLocal;
          const progress = Math.min(1, delta / ROTATION_DISTANCE);
          const deg = progress * 360;
          const scale = 1 + (targetScale - 1) * progress;

          c.style.transform = `rotate(${deg}deg) scale(${scale})`;
          c.style.boxShadow = progress > 0 ? markerBox : "";
          c.style.backgroundColor = progress > 0 ? markerBg : "";
          c.style.setProperty("--check-rot", deg + "deg");
          c.style.setProperty("--check-scale", String(progress));
          c.style.setProperty("--check-opacity", String(progress));
          c.classList.add("revealed");
          if (progress >= 1) {
            c.classList.add("completed");
          } else {
            c.classList.remove("completed");
          }
        }
      }

      if (currentY === null) {
        setMarker(desired);
        return;
      }

      const target =
        desired > currentY
          ? Math.max(
              mStart,
              Math.min(mEnd, currentY + (desired - currentY) * 1.16),
            )
          : desired;

      const atBottom = target >= mEnd - 0.5;
      const atTop = target <= mStart + 0.5;

      if (Math.abs(target - currentY) > 0.5) {
        if (atBottom) animateTo(target, addPulse);
        else if (atTop) animateTo(target, rmPulse);
        else {
          rmPulse();
          animateTo(target);
        }
      } else {
        if (atBottom) addPulse();
        if (atTop) rmPulse();
      }
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  function renderTimelineMobile() {
    const container = document.getElementById("timeline-items-mobile");
    if (!container) return;
    container.innerHTML = "";
    const frag = document.createDocumentFragment();

    education.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "timeline-item flex items-center";
      row.dataset.idx = idx;

      const card = buildEducationCard(item, { timelineSide: "right" });

      const circle =
        '<div class="timeline-circle w-3 h-3 bg-blue-500 rounded-full shadow-lg self-center relative z-40" style="flex:0 0 auto;"></div>';

      row.innerHTML = `<div class="tl-col">${circle}</div><div class="tl-card">${card}</div>`;
      frag.appendChild(row);
    });

    container.appendChild(frag);
    initTimelineAnimationMobile();
  }

  function initEducationFlipCards() {
    const triggers = Array.from(document.querySelectorAll("[data-flip-open]"));
    if (triggers.length === 0) return;

    let sourceCard = null;
    let backContentBuilder = null;
    let openAngle = -180;
    let overlayRoot = null;
    let shell = null;
    let open = false;
    let animating = false;
    let previousBodyOverflow = "";
    let scene = null;
    let animationFrameId = null;
    let currentState = null;
    let onKeyDown = null;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const easeInOutCubic = (value) =>
      value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2;
    const lerp = (from, to, progress) => from + (to - from) * progress;
    const interpRect = (fromRect, toRect, progress) => ({
      left: lerp(fromRect.left, toRect.left, progress),
      top: lerp(fromRect.top, toRect.top, progress),
      width: lerp(fromRect.width, toRect.width, progress),
      height: lerp(fromRect.height, toRect.height, progress),
    });

    const getSourceRect = () => sourceCard.getBoundingClientRect();

    const measureBackContentHeight = (width, contentBuilder) => {
      const measurer = document.createElement("div");
      measurer.className = "thesis-card-measure";
      measurer.style.width = `${Math.round(width)}px`;
      measurer.style.boxSizing = "border-box";
      measurer.innerHTML = contentBuilder();
      document.body.appendChild(measurer);
      const height = Math.ceil(measurer.getBoundingClientRect().height);
      measurer.remove();
      return height;
    };

    const getTargetRect = (sourceRect, contentBuilder) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const limitHeight = Math.max(240, viewportHeight - 32);
      const maxWidth = Math.max(320, viewportWidth - 32);
      const preferredWidth = Math.min(
        maxWidth,
        Math.max(880, sourceRect.width + 16),
      );

      let width = preferredWidth;
      let measured = measureBackContentHeight(width, contentBuilder);

      if (measured > limitHeight) {
        const measuredAtMax = measureBackContentHeight(
          maxWidth,
          contentBuilder,
        );
        if (measuredAtMax <= limitHeight) {
          width = maxWidth;
          measured = measuredAtMax;
        } else {
          let low = preferredWidth;
          let high = maxWidth;
          let found = null;
          for (let i = 0; i < 10 && high - low > 12; i++) {
            const mid = Math.floor((low + high) / 2);
            const m = measureBackContentHeight(mid, contentBuilder);
            if (m <= limitHeight) {
              found = mid;
              high = mid;
            } else {
              low = mid;
            }
          }
          if (found) {
            width = found;
            measured = measureBackContentHeight(found, contentBuilder);
          } else {
            width = maxWidth;
            measured = measuredAtMax;
          }
        }
      }

      const height = Math.min(
        Math.max(measured, sourceRect.height),
        viewportHeight - 32,
      );
      return {
        width,
        height,
        left: Math.round((viewportWidth - width) / 2),
        top: Math.round((viewportHeight - height) / 2),
      };
    };

    const setState = (state) => {
      currentState = {
        rect: {
          left: state.rect.left,
          top: state.rect.top,
          width: state.rect.width,
          height: state.rect.height,
        },
        angle: state.angle,
      };
      shell.style.left = `${Math.round(state.rect.left)}px`;
      shell.style.top = `${Math.round(state.rect.top)}px`;
      shell.style.width = `${Math.round(state.rect.width)}px`;
      shell.style.height = `${Math.round(state.rect.height)}px`;
      scene.style.transform = `rotateY(${state.angle}deg)`;
      const absAngle = Math.abs(state.angle % 180);
      const normalized = Math.min(absAngle, 180 - absAngle) / 90;
      const edgeFactor = Math.max(0, Math.min(1, normalized));
      scene.style.setProperty("--thesis-edge-factor", edgeFactor.toFixed(3));
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const finishClose = () => {
      stopAnimation();
      if (overlayRoot) {
        overlayRoot.remove();
      }
      if (onKeyDown) {
        document.removeEventListener("keydown", onKeyDown);
        onKeyDown = null;
      }
      overlayRoot = null;
      shell = null;
      scene = null;
      if (sourceCard) {
        sourceCard.style.visibility = "";
      }
      document.body.style.overflow = previousBodyOverflow;
      currentState = null;
      sourceCard = null;
      backContentBuilder = null;
      open = false;
      animating = false;
    };

    const animateState = (fromState, toState, options, onDone) => {
      stopAnimation();
      const duration = options?.duration ?? 760;
      const easing = options?.easing ?? easeInOutCubic;
      const start = performance.now();

      const step = (now) => {
        const t = clamp((now - start) / duration, 0, 1);
        const progress = easing(t);
        const rect = interpRect(fromState.rect, toState.rect, progress);
        const angle = lerp(fromState.angle, toState.angle, progress);
        setState({ rect, angle });

        if (t < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          animationFrameId = null;
          setState(toState);
          onDone?.();
        }
      };

      animationFrameId = requestAnimationFrame(step);
    };

    const closeCard = () => {
      if (!overlayRoot || !shell || !scene) return;
      if (!open && !animating) return;

      const sourceRect = getSourceRect();
      const fromState = currentState || {
        rect: shell.getBoundingClientRect(),
        angle: open ? openAngle : 0,
      };
      open = false;
      animating = true;

      animateState(
        fromState,
        { rect: sourceRect, angle: 0 },
        { duration: 700, easing: easeInOutCubic },
        () => {
          overlayRoot.classList.remove("is-open");
          overlayRoot.setAttribute("aria-hidden", "true");
          window.setTimeout(finishClose, 220);
        },
      );
    };

    const openCard = (trigger, flipConfig) => {
      if (open || animating) return;

      sourceCard = trigger.closest("[data-flip-source]");
      if (!sourceCard) return;
      backContentBuilder = flipConfig.backContentBuilder;
      openAngle = flipConfig.direction === "cw" ? 180 : -180;

      const sourceRect = getSourceRect();
      const targetRect = getTargetRect(sourceRect, backContentBuilder);
      const backMarkup = backContentBuilder();
      const frontClone = sourceCard.cloneNode(true);
      frontClone.classList.add("thesis-front-card--clone");
      frontClone.removeAttribute("data-flip-source");
      frontClone
        .querySelectorAll("[data-flip-open]")
        .forEach((button) => button.remove());
      const frontMarkup = frontClone.outerHTML;

      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      sourceCard.style.visibility = "hidden";

      const wrapper = document.createElement("div");
      wrapper.innerHTML = buildEducationFlipOverlay({
        frontContent: frontMarkup,
        backContent: backMarkup,
        backRotationDeg: openAngle,
      });
      overlayRoot = wrapper.firstElementChild;
      document.body.appendChild(overlayRoot);

      shell = overlayRoot.querySelector("[data-thesis-shell]");
      scene = overlayRoot.querySelector(".thesis-card-scene");

      overlayRoot.addEventListener("click", (event) => {
        if (
          event.target.closest("[data-thesis-close]") ||
          event.target.closest("[data-thesis-backdrop]")
        ) {
          event.preventDefault();
          closeCard();
        }
      });

      const recomputed = measureBackContentHeight(
        targetRect.width,
        backContentBuilder,
      );
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth <= 640;
      const maxAllowed = Math.max(240, viewportHeight - (isMobile ? 24 : 32));
      const safetyBuffer = isMobile ? 16 : 24;

      if (isMobile) {
        const margin = 16;
        targetRect.width = Math.max(320, viewportWidth - margin * 2);
        targetRect.left = Math.round(margin);
        targetRect.top = Math.round(margin);
        targetRect.height = viewportHeight - margin * 2;
      } else {
        targetRect.height = Math.min(
          Math.max(recomputed + safetyBuffer, sourceRect.height),
          maxAllowed,
        );
      }

      const backBody = overlayRoot.querySelector(".thesis-card-back-body");
      if (backBody) {
        backBody.style.overflow = isMobile
          ? "auto"
          : recomputed > maxAllowed
            ? "auto"
            : "visible";
      }

      onKeyDown = (e) => {
        if (e.key === "Escape") closeCard();
      };
      document.addEventListener("keydown", onKeyDown);

      overlayRoot.classList.add("is-open");
      overlayRoot.setAttribute("aria-hidden", "false");
      setState({ rect: sourceRect, angle: 0 });
      currentState = { rect: sourceRect, angle: 0 };
      animating = true;

      requestAnimationFrame(() => {
        animateState(
          { rect: sourceRect, angle: 0 },
          { rect: targetRect, angle: openAngle },
          { duration: 820, easing: easeInOutCubic },
          () => {
            open = true;
            animating = false;
            overlayRoot?.querySelector(".thesis-card-close")?.focus();
          },
        );
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const flipId = trigger.dataset.flipOpen;
        if (!flipId) return;
        const flipConfig = getEducationFlipConfigById(flipId);
        if (!flipConfig) return;
        openCard(trigger, flipConfig);
      });
    });
  }

  function initTimelineAnimationMobile() {
    const timelineContainer = document.getElementById(
      "timeline-container-mobile",
    );
    const marker = document.getElementById("timeline-marker-mobile");
    const markerInner = document.getElementById("timeline-marker-inner-mobile");
    const lineEl = document.getElementById("timeline-line-mobile");
    const itemEls = () =>
      Array.from(timelineContainer.querySelectorAll(".timeline-item"));
    const circleEls = () =>
      Array.from(timelineContainer.querySelectorAll(".timeline-circle"));

    if (!timelineContainer || itemEls().length === 0) return;

    let currentY = null;
    let animFrame = null;

    if (lineEl) lineEl.style.transform = "translateX(-50%)";
    if (marker) {
      marker.style.transform = "translateX(-50%)";
      marker.style.position = "absolute";
    }

    const setMarker = (y) => {
      if (marker) marker.style.top = `${Math.round(y)}px`;
      currentY = y;
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const addPulse = () => {
      if (markerInner)
        markerInner.style.animation = "pulseScale 1.4s ease-in-out infinite";
    };
    const rmPulse = () => {
      if (markerInner) markerInner.style.animation = "none";
    };

    circleEls().forEach((c) => {
      c.style.transition = "transform 120ms linear";
      c.style.transformOrigin = "center center";
    });

    function animateTo(target, onDone) {
      if (animFrame) cancelAnimationFrame(animFrame);
      const step = () => {
        const prev = currentY !== null ? currentY : target;
        const next = lerp(prev, target, 0.12);
        setMarker(next);
        if (Math.abs(next - target) > 0.5)
          animFrame = requestAnimationFrame(step);
        else {
          setMarker(target);
          animFrame = null;
          onDone && onDone();
        }
      };
      animFrame = requestAnimationFrame(step);
    }

    function update() {
      const _itemEls = itemEls();
      const _circleEls = circleEls();
      const firstCirc = _circleEls[0];
      const lastCirc = _circleEls[_circleEls.length - 1];
      const firstEl = _itemEls[0];
      const lastEl = _itemEls[_itemEls.length - 1];
      if (!firstEl || !lastEl) return;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const fcRect = (firstCirc || firstEl).getBoundingClientRect();
      const lcRect = (lastCirc || lastEl).getBoundingClientRect();
      const firstCenter =
        fcRect.top + scrollY + (firstCirc || firstEl).clientHeight / 2;
      const lastCenter =
        lcRect.top + scrollY + (lastCirc || lastEl).clientHeight / 2;
      const containerTop =
        timelineContainer.getBoundingClientRect().top + scrollY;

      if (lineEl)
        lineEl.style.top = `${Math.round(firstCenter - containerTop)}px`;

      const viewportMid = scrollY + window.innerHeight / 2;
      const progress = Math.max(
        0,
        Math.min(1, (viewportMid - firstCenter) / (lastCenter - firstCenter)),
      );
      const markerH = marker ? marker.offsetHeight : 0;
      const mStart = firstCenter - containerTop - markerH / 2;
      const mEnd = lastCenter - containerTop - markerH / 2;
      const desired = Math.max(
        mStart,
        Math.min(
          mEnd,
          firstCenter +
            progress * (lastCenter - firstCenter) -
            containerTop -
            markerH / 2,
        ),
      );

      const markerPosForCheck = currentY !== null ? currentY : desired;
      const markerCenterLocal = markerPosForCheck + markerH / 2;
      const ROTATION_DISTANCE = Math.max(24, markerH * 1.5);

      for (const c of _circleEls) {
        const cRect = c.getBoundingClientRect();
        const cCenterGlobal = cRect.top + scrollY + c.clientHeight / 2;
        const cCenterLocal = cCenterGlobal - containerTop;

        const markerInnerRect = markerInner
          ? markerInner.getBoundingClientRect()
          : { width: marker ? marker.offsetWidth : 8 };
        const markerWidth =
          markerInnerRect.width ||
          (marker ? marker.getBoundingClientRect().width : 8) ||
          (marker ? marker.offsetWidth : 8) ||
          (marker ? marker.clientWidth : 8);
        const targetScale = cRect.width > 0 ? markerWidth / cRect.width : 1;

        if (markerCenterLocal <= cCenterLocal) {
          c.style.transform = "";
          c.style.boxShadow = "";
          c.style.backgroundColor = "";
          c.style.setProperty("--check-rot", "0deg");
          c.style.setProperty("--check-scale", "0");
          c.style.setProperty("--check-opacity", "0");
          c.classList.remove("revealed");
          c.classList.remove("completed");
        } else {
          const delta = markerCenterLocal - cCenterLocal;
          const prog = Math.min(1, delta / ROTATION_DISTANCE);
          const deg = prog * 360;
          const scale = 1 + (targetScale - 1) * prog;

          c.style.transform = `rotate(${deg}deg) scale(${scale})`;
          c.style.boxShadow =
            prog > 0 ? getComputedStyle(markerInner).boxShadow || "" : "";
          c.style.backgroundColor =
            prog > 0 ? getComputedStyle(markerInner).backgroundColor || "" : "";
          c.style.setProperty("--check-rot", deg + "deg");
          c.style.setProperty("--check-scale", String(prog));
          c.style.setProperty("--check-opacity", String(prog));
          c.classList.add("revealed");
          if (prog >= 1) c.classList.add("completed");
          else c.classList.remove("completed");
        }
      }

      if (currentY === null) {
        setMarker(desired);
        return;
      }

      const target =
        desired > currentY
          ? Math.max(
              mStart,
              Math.min(mEnd, currentY + (desired - currentY) * 1.16),
            )
          : desired;

      const atBottom = target >= mEnd - 0.5;
      const atTop = target <= mStart + 0.5;

      if (Math.abs(target - currentY) > 0.5) {
        if (atBottom) animateTo(target, addPulse);
        else if (atTop) animateTo(target, rmPulse);
        else {
          rmPulse();
          animateTo(target);
        }
      } else {
        if (atBottom) addPulse();
        if (atTop) rmPulse();
      }
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      }),
    );
  }

  function renderOtherProjects() {
    const container = document.getElementById("other-projects");
    const frag = document.createDocumentFragment();
    for (const { url, logo, description } of otherProjects) {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className =
        "inline-flex items-center justify-center transform hover:scale-105 transition-all duration-300";
      const img = document.createElement("img");
      img.src = logo;
      img.alt = description;
      img.loading = "lazy";
      img.decoding = "async";
      img.className =
        "h-24 object-contain bg-white/5 p-2 rounded transition-transform duration-300";
      a.appendChild(img);
      frag.appendChild(a);
    }
    container.appendChild(frag);
  }

  const experiences = [
    {
      title: "Junior Software Engineer",
      company: "ANDYLOGY s.r.o.",
      period: "únor 2024 – současnost",
      url: "https://www.andylogy.com/",
    },
  ];

  function renderExperienceTiles() {
    const existingContainer = document.getElementById("experience-items");
    const parentSection = document.getElementById("experience");
    let target;
    if (existingContainer) {
      existingContainer.innerHTML = "";
      target = existingContainer;
    } else if (parentSection) {
      const c = document.createElement("div");
      c.id = "experience-items";
      c.className = "space-y-8";
      parentSection.appendChild(c);
      target = c;
    } else {
      return;
    }

    const frag = document.createDocumentFragment();
    for (const exp of experiences) {
      const outer = document.createElement("div");
      outer.className = "z-10 flex justify-center";
      outer.style.width = "100%";

      const cardWrapper = document.createElement("div");
      cardWrapper.style.width = "360px";
      cardWrapper.style.maxWidth = "90vw";

      const card = document.createElement("div");
      card.className =
        "bg-slate-900/60 p-6 rounded-xl shadow-xl border border-white/5";
      const __rootStyles = getComputedStyle(document.documentElement);
      const __uiBlur = (
        __rootStyles.getPropertyValue("--ui-backdrop-blur") || "4px"
      ).trim();
      card.style.setProperty("-webkit-backdrop-filter", `blur(${__uiBlur})`);
      card.style.setProperty("backdrop-filter", `blur(${__uiBlur})`);

      const h3 = document.createElement("h3");
      h3.className = "text-xl font-extrabold text-white mb-1";
      h3.textContent = exp.title;

      const company = document.createElement("p");
      company.className = "text-base font-semibold text-blue-300/80 mb-2";
      company.textContent = exp.company;

      const period = document.createElement("p");
      period.className = "text-sm text-zinc-400 font-medium";
      period.textContent = exp.period;

      card.appendChild(h3);
      card.appendChild(company);
      card.appendChild(period);

      if (exp.url) {
        const link = document.createElement("a");
        link.href = exp.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className =
          "inline-block transform hover:scale-105 transition-all duration-300";
        link.style.width = "100%";
        link.appendChild(card);
        cardWrapper.appendChild(link);
      } else {
        cardWrapper.appendChild(card);
      }

      outer.appendChild(cardWrapper);
      frag.appendChild(outer);
    }

    target.appendChild(frag);
  }

  function initHeader() {
    const navLinks = document.querySelectorAll(".nav-link");
    const menuBtn = document.getElementById("menu-btn");
    const panelClose = document.getElementById("panel-close");
    const iconMenu = document.getElementById("icon-menu");
    const panelContent = menuBtn
      ? menuBtn.querySelector(".panel-content")
      : null;

    const sectionIds = ["hero", "about", "education", "experience", "projects"];
    let currentActiveId = null;
    let suppressAutoUpdateUntil = 0;

    function getVisibleSectionEl(id) {
      const isVisible = (el) =>
        !!el &&
        el.offsetParent !== null &&
        getComputedStyle(el).display !== "none" &&
        el.getBoundingClientRect().height > 0;
      const el = document.getElementById(id);
      if (isVisible(el)) return el;
      const alt = document.getElementById(id + "-mobile");
      if (isVisible(alt)) return alt;
      return el;
    }

    function updateActiveSection() {
      if (Date.now() < suppressAutoUpdateUntil) return;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportCenter = scrollY + viewportHeight / 2;

      let activeId = "hero";
      let closestDistance = Infinity;

      for (const id of sectionIds) {
        const el = getVisibleSectionEl(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elTop = rect.top + window.scrollY;
          const elBottom = elTop + rect.height;

          if (elBottom > scrollY && elTop < scrollY + viewportHeight) {
            const distance = Math.abs((elTop + elBottom) / 2 - viewportCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              activeId = id;
            }
          } else if (elTop <= scrollY && closestDistance === Infinity) {
            activeId = id;
          }
        }
      }

      if (activeId !== currentActiveId) {
        currentActiveId = activeId;
        setActive(activeId);
      }
    }

    function setActive(id) {
      navLinks.forEach((link) => {
        const on = link.dataset.section === id;
        link.classList.toggle("font-bold", on);
        link.classList.toggle("text-lg", on);
        link.classList.toggle("text-white", on);
      });
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    if (menuBtn) {
      let open = false;

      const doOpen = () => {
        menuBtn.classList.add("open");
        menuBtn.setAttribute("aria-expanded", "true");
        if (panelContent) panelContent.setAttribute("aria-hidden", "false");
        if (iconMenu) iconMenu.classList.add("faded");
        if (panelClose) panelClose.classList.add("visible");
        document.body.style.overflow = "hidden";
        document.addEventListener("mousedown", outsideClickHandler);
        document.addEventListener("touchstart", outsideClickHandler, {
          passive: true,
        });
        open = true;
      };

      const doClose = () => {
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        if (panelContent) panelContent.setAttribute("aria-hidden", "true");
        if (iconMenu) iconMenu.classList.remove("faded");
        if (panelClose) panelClose.classList.remove("visible");
        document.removeEventListener("mousedown", outsideClickHandler);
        document.removeEventListener("touchstart", outsideClickHandler);
        document.body.style.overflow = "";
        open = false;
      };

      menuBtn.addEventListener("click", (e) => {
        if (
          e.target.closest(".overlay-close") ||
          e.target.closest(".panel-content")
        )
          return;
        open ? doClose() : doOpen();
      });

      if (panelClose) {
        panelClose.addEventListener("mousedown", (e) => e.stopPropagation());
        panelClose.addEventListener("touchstart", (e) => e.stopPropagation());
        panelClose.addEventListener("click", (e) => {
          e.stopPropagation();
          doClose();
        });
      }

      if (panelContent) {
        panelContent.addEventListener("mousedown", (e) => e.stopPropagation());
        panelContent.addEventListener("touchstart", (e) => e.stopPropagation());
        const links = panelContent.querySelectorAll("a");
        links.forEach((a) => {
          a.addEventListener("click", (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            const href = a.getAttribute("href");

            let scrolled = false;
            const runScroll = () => {
              if (scrolled) return;
              scrolled = true;

              if (href && href.startsWith("#")) {
                let id = href.substring(1);

                const attemptScroll = (baseId, tries = 0) => {
                  const maxTries = 8;
                  const candidates = [baseId, baseId + "-mobile"];
                  for (const cand of candidates) {
                    const el = document.getElementById(cand);
                    if (el && getComputedStyle(el).display !== "none") {
                      const header = document.querySelector("header");
                      const rect = el.getBoundingClientRect();
                      const top = window.scrollY + rect.top;
                      let offset = 0;
                      if (
                        header &&
                        getComputedStyle(header).position === "fixed"
                      ) {
                        offset = header.getBoundingClientRect().height + 8;
                      }
                      window.scrollTo({
                        top: Math.max(0, top - offset),
                        behavior: "smooth",
                      });
                      try {
                        history.replaceState(null, "", href);
                      } catch (e) {}
                      try {
                        el.focus({ preventScroll: true });
                      } catch (e) {}
                      try {
                        currentActiveId = baseId;
                        setActive(baseId);
                      } catch (e) {}
                      suppressAutoUpdateUntil = Date.now() + 700;
                      return true;
                    }
                  }
                  if (tries < maxTries) {
                    setTimeout(() => attemptScroll(baseId, tries + 1), 150);
                  }
                  return false;
                };

                attemptScroll(id);
              } else if (href) {
                window.location.href = href;
              }
            };

            try {
              const onEnd = (ev) => {
                if (ev.target === menuBtn) {
                  menuBtn.removeEventListener("transitionend", onEnd);
                  runScroll();
                }
              };
              menuBtn.addEventListener("transitionend", onEnd);
            } catch (e) {}

            doClose();

            setTimeout(runScroll, 420);
          });
        });
      }

      const outsideClickHandler = (e) => {
        if (!open) return;
        if (menuBtn.contains(e.target)) return;
        doClose();
      };

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && open) doClose();
      });
      window.closeMenu = doClose;
    }
  }

  function initHeroScroll() {
    const hint = document.getElementById("hero-hint");
    window.addEventListener(
      "scroll",
      () => {
        hint.style.opacity = Math.max(0, 1 - window.scrollY / 300);
      },
      { passive: true },
    );
  }

  function initFooter() {
    const el = document.getElementById("footer-year");
    if (el) el.textContent = new Date().getFullYear() + " ";
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", () => {
    for (const c of [2, 3, 4]) _getStructure(projects, c);

    initFooter();
    renderLogos();
    const isMobile =
      window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      if (
        document.getElementById("timeline-container-mobile") &&
        Array.isArray(education) &&
        education.length
      ) {
        setTimeout(() => {
          renderTimelineMobile();
          initEducationFlipCards();
        }, 30);
      }
    } else {
      renderTimeline();
      initEducationFlipCards();
    }
    renderOtherProjects();
    renderExperienceTiles();
    initHeader();
    initHeroScroll();

    requestAnimationFrame(() => renderBentoGrid(true));

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => renderBentoGrid(false), 120);
    });
  });
})();

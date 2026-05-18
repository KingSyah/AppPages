/* ============================================================
   AppLauncher — app.js
   ============================================================ */

// ============================================================
// DATA TOMBOL — Edit bagian ini untuk menambah/ubah tombol
// Format: { icon, name, desc, url }
// ============================================================
const APPS = {

  "🔬 Lab & Inventaris": [
    { icon:"📦", name:"Inventaris",         desc:"Manage inventory system",                    url:"https://kingsyah.github.io/inventaris/" },
    { icon:"📖", name:"Lab Logbook",        desc:"Laboratory activity tracker",                url:"https://kingsyah.github.io/lab-logbook/" },
    { icon:"🔬", name:"Ruang Lab",          desc:"Laboratory room management",                 url:"https://kingsyah.github.io/RuangLab/" },
    { icon:"📋", name:"Instruksi Kerja",    desc:"Work instruction management",                url:"https://kingsyah.github.io/IK/" },
    { icon:"📝", name:"Logbook Barang",     desc:"Item tracking and logging system",           url:"https://kingsyah.github.io/Logbook-Barang/" },
    { icon:"📄", name:"LabDok",             desc:"Laboratory document management",             url:"https://kingsyah.github.io/LabDok/" },
    { icon:"📊", name:"Logbook Lab v2",     desc:"Managemen Barang Laboratorium v2.0",         url:"https://kingsyah.github.io/BarangLab/" },
    { icon:"📦", name:"InvLab v2.1",        desc:"Managemen Barang Laboratorium v2.1",         url:"https://invlab.netlify.app/" },
    { icon:"📦", name:"InvLab v3.1",        desc:"Sistem Manajemen Inventaris",                url:"https://kingsyah.codeberg.page/invlab/" },
    { icon:"📡", name:"Kode Morse Transmitter",   desc:"Konversi teks menjadi Morse",          url:"https://morsend.pages.dev/" },
  ],

  "📂 Data & Dokumen": [
    { icon:"📝", name:"JSON Editor",        desc:"Edit and format JSON data",                  url:"https://kingsyah.github.io/JSON-Editor/" },
    { icon:"🔄", name:"JSONL Converter",    desc:"Convert JSON to JSONL format",               url:"https://kingsyah.github.io/JSONL-Converter/" },
    { icon:"🎓", name:"Perbaikan Gelar",    desc:"Academic degree correction tool",            url:"https://kingsyah.github.io/FIX/" },
    { icon:"👨‍🏫", name:"Editor Dosen",      desc:"Faculty data management editor",             url:"https://kingsyah.github.io/Editor-Data-Dosen/" },
    { icon:"📝", name:"Data Alumni",        desc:"Kelola JSONL, Manifest & Metadata",          url:"https://kingsyah.github.io/Editor-Data-Alumni/" },
    { icon:"🧩", name:"QRCORE",             desc:"QRCode dan Barcode Generator",               url:"https://kingsyah.github.io/QRCORE/" },
    { icon:"🔑", name:"Token Secret",       desc:"Token Secret Generator",                     url:"https://kingsyah.github.io/tookind/" },
  ],

  "🤖 AI & Gambar": [
    { icon:"🗿", name:"Face Generator",     desc:"Generate AI Character prompts",              url:"https://kingsyah.github.io/facefox/" },
    { icon:"🤖", name:"Prompt Generator",   desc:"Generate AI prompts automatically",          url:"https://kingsyah.github.io/AppPromptGenerator/" },
    { icon:"🛠️", name:"PCD Tools",          desc:"Digital Image Processing Tool",              url:"https://kingsyah.github.io/PCD-Tools/" },
    { icon:"📊", name:"Face Matching",      desc:"Cross-Spectral Face Matching",               url:"https://kingsyah.github.io/riset-blpoc/" },
  ],

  "🧮 Kalkulator & Konversi": [
    { icon:"📱", name:"Kalkulator Diskon",  desc:"Hitung Diskon dan Selisih Tahun",            url:"https://kingsyah.github.io/DiskonTools/" },
    { icon:"📱", name:"Kalkulator Jamker",  desc:"Kalkulator jam kerja praktikum",             url:"https://kingsyah.github.io/KalkulatorJamker/" },
    { icon:"🧮", name:"Arcane Converter",   desc:"Fantasy measurement systems",                url:"https://kingsyah.github.io/UniConverter/" },
    { icon:"📊", name:"Kalkulator Bisnis",  desc:"Menghitung BEP (Break Even Point)",          url:"https://kingsyah.github.io/kalbiz/" },
  ],

  "🎨 Desain & Kreasi": [
    { icon:"🎨", name:"Design Generator",   desc:"Temukan desain warna terbaik",               url:"https://desaingenerator.pages.dev/" },
    { icon:"🎨", name:"Smart Color",        desc:"Temukan palet warna sempurna",               url:"https://kingsyah.github.io/scp/" },
    { icon:"🎨", name:"Design Coloring",    desc:"Design Ratio Analisis",                      url:"https://dkvb.pages.dev/" },
    { icon:"📜", name:"Katanja Djadoel",    desc:"Translator Bahasa Jadoel",                   url:"https://jadoel.pages.dev/" },
  ],

  "📱 Aplikasi Umum": [
    { icon:"🚨", name:"Lapor Bencana",      desc:"Sampaikan laporan bencana",                  url:"https://kingsyah.github.io/lapor-bencana/" },
    { icon:"⚙️", name:"Button Editor",      desc:"Tambah tombol menu tanpa coding",            url:"Tools/index.html" },
  ],

  "🚀 Aplikasi EVE": [
    { icon:"⏰", name:"EVE Time Info",      desc:"EVE Online time tracker",                    url:"https://kingsyah.github.io/evetimeinfo/" },
    { icon:"💰", name:"ISK Tracker",        desc:"Track ISK earnings in EVE",                  url:"https://kingsyah.github.io/ISK-Tracker/" },
    { icon:"🧮", name:"Kalkulator Yield",   desc:"Menghitung Yield Timer",                     url:"https://kingsyah.github.io/KalkulatorYield/" },
    { icon:"🚀", name:"Nebula Nexus",       desc:"Exploration & gas harvesting tools",         url:"https://kingsyah.github.io/exploNexus/" },
    { icon:"📝", name:"Patch Intel",        desc:"EVE Online patch notes categorizer",         url:"https://patch-intel.pages.dev/" },
    { icon:"🧮", name:"Kalkulator BuyBack", desc:"KingSyah Buyback Calculator",                url:"https://kingsyah-buyback.pages.dev/" },
  ],

  "🎮 Games": [
    { icon:"🧩", name:"Bloklist",           desc:"Block puzzle game",                          url:"https://kingsyah.github.io/bloklist/" },
    { icon:"🍎", name:"Fruit Fusion",       desc:"Merge fruits and create combinations",       url:"https://kingsyah.github.io/Emoji-Merge/" },
    { icon:"🐍", name:"Ularkun",            desc:"Classic snake game adventure",               url:"https://kingsyah.github.io/ularkun/" },
  ],

};
// ============================================================

let currentView = localStorage.getItem('view') || 'grid';

function setView(v) {
  currentView = v;
  localStorage.setItem('view', v);
  document.getElementById('main').className = v + '-view';
  document.getElementById('btnGrid').classList.toggle('active', v === 'grid');
  document.getElementById('btnList').classList.toggle('active', v === 'list');
}

function buildUI() {
  const main = document.getElementById('main');
  main.className = currentView + '-view';
  main.innerHTML = '';
  for (const [cat, items] of Object.entries(APPS)) {
    const sec = document.createElement('div');
    sec.className = 'category';
    sec.dataset.cat = cat;
    sec.innerHTML = `<div class="cat-label">${cat}<span class="cat-line"></span></div><div class="app-grid"></div>`;
    const grid = sec.querySelector('.app-grid');
    items.forEach(app => {
      const a = document.createElement('a');
      a.href = app.url;
      a.className = 'app-item';
      a.dataset.name = (app.name + ' ' + app.desc).toLowerCase();
      a.innerHTML = `
        <span class="app-emoji">${app.icon}</span>
        <div class="app-info">
          <div class="app-name">${app.name}</div>
          <div class="app-desc">${app.desc}</div>
        </div>
        <span class="app-arrow">›</span>`;
      grid.appendChild(a);
    });
    main.appendChild(sec);
  }
  setView(currentView);
}

function filterApps(q) {
  q = q.toLowerCase().trim();
  let any = false;
  document.querySelectorAll('.category').forEach(cat => {
    let catHas = false;
    cat.querySelectorAll('.app-item').forEach(item => {
      const match = !q || item.dataset.name.includes(q);
      item.classList.toggle('hidden', !match);
      if (match) catHas = true;
    });
    cat.classList.toggle('hidden', !catHas);
    if (catHas) any = true;
  });
  const nr = document.getElementById('noResults');
  nr.classList.toggle('show', !any && q.length > 0);
  document.getElementById('searchTerm').textContent = q;
}

// Footer year
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Build
buildUI();

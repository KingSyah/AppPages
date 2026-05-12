/* ============================================================
   Button Editor — editor.js
   ============================================================ */

const EMOJIS = ['📱','🧮','📊','📝','🎮','🛠️','📖','🔬','💰','⏰','🎯','🚀','🧩','📦','🎨','🔑','🐍','🍎','🧪','⚗️','🔧','📡','💡','🗂️','📁','🌐','🤖','👨‍🏫','🎓','📜','🗿','🔄','👁️','📋','🚨','🔐','🧬','📈','🏆','⚡'];

let selectedEmoji = '📱';
let currentTab = 'js';
let generatedData = null;

function init() {
  const grid = document.getElementById('emojiGrid');
  EMOJIS.forEach(e => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn';
    btn.textContent = e;
    btn.title = e;
    btn.onclick = () => pickEmoji(e, btn);
    grid.appendChild(btn);
  });
  grid.querySelector('.emoji-btn').click();
}

function pickEmoji(e, btn) {
  selectedEmoji = e;
  document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
  if (btn) btn.classList.add('selected');
  document.getElementById('emojiDisplay').textContent = e;
  document.getElementById('emojiCustom').value = '';
  updatePreview();
}

function onCustomEmoji(val) {
  if (!val) return;
  const emoji = [...val].slice(0, 2).join('');
  selectedEmoji = emoji;
  document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('emojiDisplay').textContent = emoji;
  updatePreview();
}

function updatePreview() {
  const name = document.getElementById('appName').value || 'Nama Aplikasi';
  const desc = document.getElementById('appDesc').value || 'Deskripsi aplikasi';
  document.getElementById('prevEmoji').textContent = selectedEmoji;
  document.getElementById('prevName').textContent = name;
  document.getElementById('prevDesc').textContent = desc;
}

function generate() {
  const name = document.getElementById('appName').value.trim();
  const desc = document.getElementById('appDesc').value.trim();
  const url  = document.getElementById('appUrl').value.trim();
  const cat  = document.getElementById('appCat').value;

  if (!name || !desc || !url) {
    alert('Mohon isi Nama, Deskripsi, dan URL terlebih dahulu.');
    return;
  }

  if (!url.startsWith('http')) {
    alert('URL harus dimulai dengan https://');
    return;
  }

  generatedData = { icon: selectedEmoji, name, desc, url, cat };

  document.getElementById('outputSection').classList.remove('hidden');
  switchTab(currentTab);

  setTimeout(() => {
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.classList.toggle('active', (i === 0 && tab === 'js') || (i === 1 && tab === 'html'));
  });

  if (!generatedData) return;
  const { icon, name, desc, url, cat } = generatedData;

  let code, guide;

  if (tab === 'js') {
    code = `{ icon:"${icon}", name:"${name}",\n  desc:"${desc}",\n  url:"${url}" },`;
    guide = `
      <div class="step"><div class="step-num">1</div><div>Buka file <code>app.js</code> di text editor</div></div>
      <div class="step"><div class="step-num">2</div><div>Cari bagian <code>const APPS</code></div></div>
      <div class="step"><div class="step-num">3</div><div>Temukan baris <code>"${cat}":</code>, lalu paste code di dalam array tersebut (sebelum <code>],</code>)</div></div>
      <div class="step"><div class="step-num">4</div><div>Ingin kategori baru? Tambahkan key baru: <code>"🔧 Nama Kategori": [ ... ],</code></div></div>
      <div class="step"><div class="step-num">5</div><div>Save file. Tombol muncul otomatis!</div></div>`;
  } else {
    code = `<a href="${url}" class="app-item" data-name="${name.toLowerCase()} ${desc.toLowerCase()}">\n  <span class="app-emoji">${icon}</span>\n  <div class="app-info">\n    <div class="app-name">${name}</div>\n    <div class="app-desc">${desc}</div>\n  </div>\n  <span class="app-arrow">›</span>\n</a>`;
    guide = `
      <div class="step"><div class="step-num">1</div><div>Buka file <code>index.html</code> di text editor</div></div>
      <div class="step"><div class="step-num">2</div><div>Cari kategori <code>${cat}</code></div></div>
      <div class="step"><div class="step-num">3</div><div>Paste code di dalam <code>&lt;div class="app-grid"&gt;</code> pada kategori tersebut</div></div>
      <div class="step"><div class="step-num">4</div><div>Save file dan refresh browser</div></div>`;
  }

  document.getElementById('outputCode').textContent = code;
  document.getElementById('guideContent').innerHTML = guide;
  document.getElementById('copyBtn').textContent = '📋 Copy';
  document.getElementById('copyBtn').classList.remove('copied');
}

function copyCode() {
  const text = document.getElementById('outputCode').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// Footer year
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Init
init();

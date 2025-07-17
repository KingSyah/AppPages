# 🚀 App Launcher

Menu navigasi modern dengan tema langit berbintang yang responsif dan user-friendly, dilengkapi dengan tools untuk menambah tombol secara mandiri.

## ✨ Fitur Utama

### 🎨 Visual Design
- **Tema Langit Berbintang**: Gradien dinamis dari biru gelap ke biru terang
- **Bubble Animation**: Sistem bubble yang smooth dan natural dari sampel menu
- **Dynamic Background**: Background berubah gradien saat scroll
- **Glass Morphism**: Efek blur glass pada card menu untuk readability optimal

### 🚀 Animasi & Interaktivitas
- **Loading Animation**: Animasi fade-in bertahap untuk setiap elemen
- **Bubble System**: Animasi bubble yang muncul, menghilang, dan respawn secara random
- **Hover Effects**: Efek hover dengan transformasi smooth
- **Ripple Effect**: Efek ripple saat mengklik card aplikasi
- **Scroll Background**: Background berubah warna saat scroll

### 📱 Responsive Design
- **Mobile-First**: Desain yang mengutamakan tampilan mobile
- **Breakpoints**: Optimasi untuk tablet (768px) dan mobile (480px)
- **Touch-Friendly**: Ukuran tombol dan spacing yang sesuai untuk touch
- **Adaptive Background**: Background solid di mobile untuk readability
- **Compact Layout**: Layout yang efisien untuk semua ukuran layar

### ⚡ Performance Optimizations
- **Bubble Animation System**: Sistem animasi yang reliable dan smooth
- **Intersection Observer**: Lazy loading untuk animasi
- **Mobile Optimizations**: Animasi yang dioptimalkan untuk mobile
- **Reduced Motion**: Dukungan untuk preferensi reduced motion
- **Memory Management**: Cleanup otomatis untuk elemen dinamis

### 🛠️ Button Editor Tools
- **User-Friendly Interface**: Tools untuk user awam tanpa coding
- **Live Preview**: Preview real-time saat membuat tombol
- **Code Generator**: Generate HTML code siap pakai
- **Emoji Picker**: Pilihan icon emoji yang mudah
- **Category Selection**: Pilih kategori penempatan tombol

## 🛠️ Teknologi

- **HTML5**: Struktur semantik dengan accessibility attributes
- **CSS3**: Modern CSS dengan Grid, Flexbox, dan advanced animations
- **Vanilla JavaScript**: Interaktivitas tanpa dependency eksternal
- **CSS Custom Properties**: Untuk theming yang fleksibel
- **Modern Web APIs**: Intersection Observer, Performance API, Clipboard API

## 📁 Struktur File

```
app-launcher/
├── index.html          # Menu utama
├── style.css           # Styling dan animasi CSS
├── script.js           # JavaScript untuk interaktivitas
├── Tools/              # Folder tools untuk user
│   ├── index.html      # Button Editor interface
│   ├── style.css       # Styling untuk tools
│   └── script.js       # Logic untuk Button Editor
├── Sampel-Menu/        # Referensi menu sampel
└── README.md           # Dokumentasi ini
```

## 🎯 Kategori Menu

### 📱 Aplikasi Umum
- **Inventaris** - Manage inventory system
- **Lab Logbook** - Laboratory activity tracker
- **Ruang Lab** - Laboratory room management
- **Instruksi Kerja** - Work instruction management
- **Logbook Barang** - Item tracking and logging system
- **LabDok** - Laboratory document management

### 🛠️ Tools
- **Prompt Generator** - Generate AI prompts automatically
- **JSON Editor** - Edit and format JSON data
- **JSONL Converter** - Convert JSON to JSONL format
- **Perbaikan Gelar** - Academic degree correction tool
- **Editor Data Dosen** - Faculty data management editor
- **Button Editor** - Add new menu buttons easily without coding

### 🚀 Aplikasi EVE
- **EVE Time Info** - EVE Online time tracker
- **ISK Tracker** - Track ISK earnings in EVE

### 🎮 Games
- **Bloklist** - Block puzzle game
- **Fruit Fusion** - Merge fruits and create new combinations
- **Ularkun** - Classic snake game adventure

## 🎨 Tema Warna

```css
/* Gradien Utama (Default) */
background: linear-gradient(180deg,
    #2d4a7a 0%,     /* Ocean deep - tidak terlalu gelap */
    #4682b4 40%,    /* Steel blue */
    #5a9bd4 70%,    /* Medium sky blue */
    #87ceeb 100%    /* Sky blue - tidak terlalu terang */
);

/* Gradien Scroll (Dinamis) */
/* Top Section */    #2d4a7a → #87ceeb
/* Middle Section */ #4682b4 → #a0d2eb
/* Bottom Section */ #5a9bd4 → #b8e0f0

/* Warna Aksen */
--primary-blue: #87ceeb;    /* Sky blue */
--steel-blue: #4682b4;      /* Steel blue */
--ocean-blue: #2d4a7a;      /* Ocean deep */
--light-blue: #a0d2eb;      /* Light blue */

/* Tema Card */
--beach-theme: rgba(135, 206, 235, 0.15);  /* Sky blue */
--ocean-theme: rgba(70, 130, 180, 0.15);   /* Steel blue */
--star-theme: rgba(30, 144, 255, 0.15);    /* Dodger blue */
```

## 📱 Responsive Breakpoints

```css
/* Mobile First (Default) */
/* 320px - 767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

## ⚡ Performance Features

### Bubble Animation System
- **Reliable animations** menggunakan sistem dari sampel menu
- **Random positioning** dan timing untuk variasi natural
- **Smooth respawn** bubble yang menghilang dan muncul di posisi baru
- **Mobile optimization** dengan durasi animasi yang disesuaikan

### Background Optimization
- **Dynamic gradient** yang berubah berdasarkan scroll position
- **Balanced colors** tidak terlalu gelap di atas, tidak terlalu terang di bawah
- **Smooth transitions** dengan 3 tahap perubahan warna
- **Eye-friendly palette** untuk penggunaan jangka panjang

### Memory Management
- **Automatic cleanup** untuk elemen bubble dinamis
- **Event listener optimization** dengan debounced scroll
- **Performance detection** untuk device low-performance
- **Animation pausing** saat tab tidak aktif

## 🛠️ Button Editor Tools

### Fitur Utama
- **User-Friendly Interface** - Form yang mudah dipahami untuk user awam
- **Live Preview** - Preview real-time saat mengisi form
- **Code Generator** - Generate HTML code siap pakai
- **Emoji Picker** - Pilihan icon emoji dengan visual picker
- **Category Selection** - Dropdown untuk memilih kategori penempatan

### Cara Penggunaan
1. **Akses Tools** - Klik "Button Editor" di menu Tools
2. **Isi Form** - Masukkan nama, deskripsi, URL, dan pilih icon
3. **Preview** - Lihat preview tombol secara real-time
4. **Generate Code** - Klik tombol untuk membuat HTML code
5. **Copy & Paste** - Copy code dan paste ke index.html
6. **Save & Refresh** - Save file dan refresh browser

### Validasi & Error Handling
- **URL Validation** - Memastikan link valid dan aman
- **Required Fields** - Validasi field yang wajib diisi
- **Emoji Validation** - Memastikan icon emoji yang sesuai
- **Success Messages** - Feedback yang jelas untuk user

## 🔧 Customization

### Menambah Tombol Menu (Mudah)
**Gunakan Button Editor Tools:**
1. Buka `/Tools/index.html`
2. Isi form dengan informasi aplikasi
3. Generate dan copy HTML code
4. Paste ke kategori yang sesuai di `index.html`

### Mengubah Warna Background
Edit gradien di CSS atau JavaScript:

```css
/* Default background */
background: linear-gradient(180deg,
    #2d4a7a 0%,
    #4682b4 40%,
    #5a9bd4 70%,
    #87ceeb 100%
);
```

### Menambah Kategori Menu Manual
1. Tambahkan section baru di HTML:
```html
<div class="app-group loading">
    <h2 class="group-title">🆕 Kategori Baru</h2>
    <div class="app-grid compact-grid">
        <!-- App cards -->
    </div>
</div>
```

2. Tambahkan ke Button Editor dropdown:
```javascript
<option value="kategori-baru">🆕 Kategori Baru</option>
```

### Menyesuaikan Bubble Animation
Edit properties di CSS:

```css
.bubble {
    animation: bubbleFloat 8s ease-in-out infinite;
}

/* Ubah durasi atau delay */
.bubble-1 { animation-delay: 0s; animation-duration: 6s; }
```

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Modern Features Used
- **CSS Grid & Flexbox** - Layout responsif
- **CSS Custom Properties** - Theming dinamis
- **Intersection Observer** - Lazy loading
- **Clipboard API** - Copy code functionality
- **CSS Backdrop Filter** - Glass morphism effect

### Fallbacks
- Graceful degradation untuk browser lama
- CSS fallbacks untuk unsupported properties
- JavaScript feature detection untuk modern APIs

## 🚀 Getting Started

### Quick Start
1. **Clone atau download** repository ini
2. **Buka `index.html`** di browser modern
3. **Explore menu** dan aplikasi yang tersedia
4. **Gunakan Button Editor** untuk menambah tombol baru

### Untuk Developer
1. **Customize** warna dan animasi di `style.css`
2. **Modify** bubble system di `script.js`
3. **Add features** ke Button Editor di folder `Tools/`
4. **Test** di berbagai device dan browser

### Untuk User Awam
1. **Gunakan Button Editor** di menu Tools
2. **Isi form** dengan informasi aplikasi
3. **Copy code** yang dihasilkan
4. **Paste** ke file index.html sesuai instruksi
5. **Save dan refresh** browser

## 📄 License

MIT License - Bebas digunakan dan dimodifikasi.

## 👨‍💻 Developer

Dibuat oleh **KingSyah** dengan tema langit berbintang yang menggabungkan keindahan visual dan fungsionalitas modern.

### Changelog
- **v2.0** - Button Editor Tools untuk user awam
- **v1.5** - Bubble animation system yang reliable
- **v1.0** - Menu dasar dengan tema ocean stars

---

*"App Launcher yang indah dan fungsional untuk semua user"* 🚀✨

/* ============================================================
   Starfield — twinkling stars + meteors (space theme)
   ============================================================ */
const canvas = document.getElementById('starfield');
const ctx    = canvas.getContext('2d');
let stars = [], W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = window.innerWidth < 720 ? 100 : 220;
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.5 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.008,
      bright: Math.random() < 0.15
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    s.twinkle += s.speed;
    const pulse = s.bright
      ? (0.3 + 0.7 * Math.abs(Math.sin(s.twinkle)))
      : (0.6 + 0.4 * Math.sin(s.twinkle));
    const opacity = s.o * pulse;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 220, 255, ${opacity})`;
    ctx.fill();
    if (s.bright && opacity > 0.45) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 200, 255, ${opacity * 0.15})`;
      ctx.fill();
    }
  }
  drawMeteors();
  requestAnimationFrame(drawStars);
}

/* ── Meteors ─────────────────────────────────────────── */
let meteors = [];

function spawnMeteor() {
  const x = Math.random() * W * 0.7;
  const y = Math.random() * H * 0.4;
  const angle = Math.PI * 0.15 + Math.random() * 0.3;
  const speed = 8 + Math.random() * 6;
  meteors.push({
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    decay: 0.015 + Math.random() * 0.01,
    len: 60 + Math.random() * 80,
    width: 1 + Math.random() * 1.5
  });
}

function drawMeteors() {
  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    m.x += m.vx;
    m.y += m.vy;
    m.life -= m.decay;
    if (m.life <= 0) { meteors.splice(i, 1); continue; }

    const invSpeed = m.len / Math.sqrt(m.vx * m.vx + m.vy * m.vy);
    const tailX = m.x - m.vx * invSpeed;
    const tailY = m.y - m.vy * invSpeed;

    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = `rgba(180, 210, 255, ${m.life * 0.6})`;
    ctx.lineWidth = m.width;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(m.x, m.y, m.width * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${m.life * 0.3})`;
    ctx.fill();
  }
  if (Math.random() < 0.004) spawnMeteor();
}

window.addEventListener('resize', () => { resize(); initStars(); });
resize();
initStars();
requestAnimationFrame(drawStars);

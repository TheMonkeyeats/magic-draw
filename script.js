const promptEl = document.getElementById('prompt');
const styleEl = document.getElementById('style');
const modeEl = document.getElementById('mode');
const statusEl = document.getElementById('status');
const imgEl = document.getElementById('onlineImage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const placeholder = document.getElementById('placeholder');

function hashText(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return Math.abs(h >>> 0);
}

function rand(seed) {
  let x = seed || 123456789;
  return function() {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) / 4294967295);
  };
}

function hideResults() {
  imgEl.style.display = 'none';
  canvas.style.display = 'none';
  placeholder.style.display = 'none';
}

function drawLocalImage(prompt, style) {
  const seed = hashText(prompt + style);
  const random = rand(seed);
  const w = canvas.width;
  const h = canvas.height;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#08102f');
  bg.addColorStop(.45, '#24125a');
  bg.addColorStop(1, '#0a5dba');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 12; i++) {
    const x = random() * w;
    const y = random() * h;
    const r = 120 + random() * 260;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const hue = i % 2 ? '123,47,247' : '55,213,255';
    g.addColorStop(0, `rgba(${hue}, ${0.22 + random() * .18})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(w / 2, h / 2);
  for (let i = 0; i < 9; i++) {
    ctx.rotate((Math.PI * 2) / 9);
    ctx.strokeStyle = `rgba(255,255,255,${0.11 + random() * .09})`;
    ctx.lineWidth = 3 + random() * 10;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(110 + random()*90, -190 - random()*80, 340 + random()*80, -60 + random()*120, 430, -220 + random()*120);
    ctx.stroke();
  }
  ctx.restore();

  for (let i = 0; i < 180; i++) {
    const x = random() * w;
    const y = random() * h;
    const s = 1 + random() * 4;
    ctx.fillStyle = `rgba(255,255,255,${0.25 + random() * .65})`;
    ctx.beginPath();
    ctx.arc(x, y, s, 0, Math.PI * 2);
    ctx.fill();
  }

  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes('dragon')) drawDragon(random);
  else if (lowerPrompt.includes('city')) drawCity(random);
  else if (lowerPrompt.includes('cat')) drawCat(random);
  else if (lowerPrompt.includes('castle')) drawCastle(random);
  else drawMagicOrb(random);

  ctx.fillStyle = 'rgba(0,0,0,.35)';
  ctx.fillRect(0, h - 160, w, 160);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 54px Arial';
  ctx.fillText('Magic Draw', 54, h - 88);
  ctx.font = '28px Arial';
  wrapText(prompt || 'Your magical image idea', 54, h - 44, w - 108, 34);
}

function drawDragon(random) {
  ctx.save();
  ctx.translate(520, 480);
  ctx.fillStyle = 'rgba(35, 213, 255, .88)';
  ctx.strokeStyle = 'rgba(255,255,255,.82)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.ellipse(0, 0, 190, 92, -.15, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-70, -40); ctx.lineTo(-260, -190); ctx.lineTo(-170, 20); ctx.closePath();
  ctx.moveTo(80, -45); ctx.lineTo(275, -180); ctx.lineTo(185, 30); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.arc(205, -35, 58, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#07102b';
  ctx.beginPath(); ctx.arc(225, -48, 8, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawCity(random) {
  ctx.fillStyle = 'rgba(3,8,28,.9)';
  for (let x = 40; x < 1000; x += 70) {
    const bh = 180 + random() * 390;
    ctx.fillRect(x, 830 - bh, 48 + random()*42, bh);
    ctx.fillStyle = random() > .5 ? '#37d5ff' : '#a95cff';
    for (let y = 830 - bh + 24; y < 810; y += 42) ctx.fillRect(x + 10, y, 13, 18);
    ctx.fillStyle = 'rgba(3,8,28,.9)';
  }
}

function drawCat(random) {
  ctx.save();
  ctx.translate(520, 525);
  ctx.fillStyle = '#111936';
  ctx.strokeStyle = '#a95cff';
  ctx.lineWidth = 10;
  ctx.beginPath(); ctx.arc(0, 60, 170, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, -95, 120, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-82,-178); ctx.lineTo(-140,-285); ctx.lineTo(-25,-205); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(82,-178); ctx.lineTo(140,-285); ctx.lineTo(25,-205); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#37d5ff';
  ctx.beginPath(); ctx.arc(-42,-105,13,0,Math.PI*2); ctx.arc(42,-105,13,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

function drawCastle(random) {
  ctx.fillStyle = 'rgba(220,230,255,.85)';
  ctx.strokeStyle = '#a95cff';
  ctx.lineWidth = 8;
  ctx.fillRect(270, 455, 480, 330); ctx.strokeRect(270,455,480,330);
  for (let x of [215, 360, 620, 765]) {
    ctx.fillRect(x, 350, 110, 435); ctx.strokeRect(x,350,110,435);
    ctx.beginPath(); ctx.moveTo(x-5,350); ctx.lineTo(x+55,250); ctx.lineTo(x+115,350); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  ctx.fillStyle = '#07102b';
  ctx.beginPath(); ctx.arc(510, 786, 70, Math.PI, 0); ctx.lineTo(580, 786); ctx.fill();
}

function drawMagicOrb(random) {
  const g = ctx.createRadialGradient(512, 500, 20, 512, 500, 260);
  g.addColorStop(0, 'rgba(255,255,255,.95)');
  g.addColorStop(.35, 'rgba(55,213,255,.85)');
  g.addColorStop(1, 'rgba(123,47,247,.12)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(512, 500, 260, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.6)';
  ctx.lineWidth = 8;
  ctx.stroke();
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = 0;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
      lines++;
      if (lines > 1) break;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

async function generate() {
  const prompt = promptEl.value.trim() || 'blue dragon flying over a neon city';
  const style = styleEl.value;
  hideResults();
  statusEl.textContent = 'Generating...';

  if (modeEl.value === 'local') {
    drawLocalImage(prompt, style);
    canvas.style.display = 'block';
    statusEl.textContent = 'Done. Local Magic Canvas generated this in your browser.';
    return;
  }

  const fullPrompt = `${prompt}, ${style}, vibrant purple and blue lighting, polished digital art`;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1024&height=1024&nologo=true&seed=${hashText(fullPrompt)}`;
  imgEl.onload = () => {
    hideResults();
    imgEl.style.display = 'block';
    statusEl.textContent = 'Done. Online AI image loaded.';
  };
  imgEl.onerror = () => {
    drawLocalImage(prompt, style);
    canvas.style.display = 'block';
    statusEl.textContent = 'Online AI was busy or blocked, so Magic Draw used the local canvas fallback.';
  };
  imgEl.src = url;
}

function downloadImage() {
  let link = document.createElement('a');
  link.download = 'magic-draw-image.png';
  if (canvas.style.display === 'block') {
    link.href = canvas.toDataURL('image/png');
    link.click();
  } else if (imgEl.style.display === 'block') {
    alert('For online images, right-click the image and choose Save image as. The local canvas mode can download directly.');
  } else {
    alert('Generate an image first.');
  }
}

document.getElementById('generateBtn').addEventListener('click', generate);
document.getElementById('downloadBtn').addEventListener('click', downloadImage);

// Initial render
drawLocalImage('blue dragon flying over a neon city', 'Magic Draw purple-blue fantasy');
placeholder.style.display = 'none';
canvas.style.display = 'block';
statusEl.textContent = 'Ready.';

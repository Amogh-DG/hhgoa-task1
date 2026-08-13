import type { PassData, PhotoFilter } from '../types';
import { VECTOR_OPTIONS } from '../data/constants';

/**
 * Renders a high-resolution (1200x2133 HD) Builder Pass to an HTML5 Canvas element
 * and returns a Data URL / Blob for PNG export and live preview.
 */
export async function renderPassToCanvas(
  pass: PassData,
  canvasWidth: number = 1200,
  canvasHeight: number = 2133
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  // Scale factor for crisp text rendering
  const scale = canvasWidth / 400;

  // 1. Fill Deep Forest Green Background
  ctx.fillStyle = '#00180d';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 2. Draw Blueprint Grid Pattern
  ctx.strokeStyle = 'rgba(227, 236, 0, 0.07)';
  ctx.lineWidth = 1 * scale;
  const gridSize = 16 * scale;
  for (let x = 0; x < canvasWidth; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  }
  for (let y = 0; y < canvasHeight; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // 3. Draw Outer Card Container with Tech Cut Corners
  const pad = 24 * scale;
  const cardW = canvasWidth - pad * 2;
  const cardH = canvasHeight - pad * 2;
  const cutSize = 24 * scale;

  ctx.save();
  ctx.translate(pad, pad);

  // Card Inner Background
  ctx.fillStyle = '#002517';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(cardW - cutSize, 0);
  ctx.lineTo(cardW, cutSize);
  ctx.lineTo(cardW, cardH);
  ctx.lineTo(0, cardH);
  ctx.closePath();
  ctx.fill();

  // Outer Border (Electric Yellow + Magenta accents)
  ctx.strokeStyle = '#e3ec00';
  ctx.lineWidth = 4 * scale;
  ctx.stroke();

  // Tech Cut Notch Accents
  ctx.fillStyle = '#fe00fe';
  ctx.fillRect(cardW - cutSize - 4 * scale, 0, cutSize + 4 * scale, 4 * scale);
  ctx.fillRect(cardW - 4 * scale, 0, 4 * scale, cutSize + 4 * scale);
  ctx.fillRect(0, cardH - 4 * scale, 32 * scale, 4 * scale);

  // Inner Frame Outline (Lighter Jungle Green)
  const innerPad = 12 * scale;
  ctx.strokeStyle = '#0e3c29';
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(innerPad, innerPad, cardW - innerPad * 2, cardH - innerPad * 2);

  // 4. Header: GOA 2026 Logo & Validation Badge
  ctx.fillStyle = '#e3ec00';
  ctx.font = `italic 900 ${36 * scale}px Montserrat, sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('GOA', 24 * scale, 56 * scale);

  ctx.fillStyle = '#fe00fe';
  ctx.font = `italic 900 ${36 * scale}px Montserrat, sans-serif`;
  ctx.fillText('2026', 24 * scale, 92 * scale);

  // Top Right: VALIDATED Badge
  const badgeW = 120 * scale;
  const badgeH = 32 * scale;
  const badgeX = cardW - badgeW - 24 * scale;
  const badgeY = 32 * scale;

  ctx.strokeStyle = '#fe00fe';
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);

  ctx.fillStyle = '#fe00fe';
  ctx.font = `700 ${11 * scale}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('VALIDATED', badgeX + badgeW / 2, badgeY + 20 * scale);

  // Status Dot
  ctx.fillStyle = '#fe00fe';
  ctx.beginPath();
  ctx.arc(badgeX + 14 * scale, badgeY + 16 * scale, 4 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Subheader Line
  ctx.strokeStyle = '#0e3c29';
  ctx.lineWidth = 2 * scale;
  ctx.beginPath();
  ctx.moveTo(24 * scale, 114 * scale);
  ctx.lineTo(cardW - 24 * scale, 114 * scale);
  ctx.stroke();

  // 5. Photo Box Frame & Image Drawing
  const photoW = 200 * scale;
  const photoH = 200 * scale;
  const photoX = (cardW - photoW) / 2;
  const photoY = 136 * scale;

  // Photo Outer Frame
  ctx.fillStyle = '#0e3c29';
  ctx.fillRect(photoX - 4 * scale, photoY - 4 * scale, photoW + 8 * scale, photoH + 8 * scale);
  ctx.strokeStyle = '#e3ec00';
  ctx.lineWidth = 2 * scale;
  ctx.strokeRect(photoX - 4 * scale, photoY - 4 * scale, photoW + 8 * scale, photoH + 8 * scale);

  // Load User Photo or Generate Avatar Canvas
  const photoImg = await loadPhotoElement(pass.photoUrl, pass.name);
  ctx.save();
  ctx.beginPath();
  ctx.rect(photoX, photoY, photoW, photoH);
  ctx.clip();

  // Apply Photo Filter Effects
  applyCanvasFilter(ctx, pass.photoFilter);

  // Draw scaled photo
  const zoom = pass.zoom || 1;
  const drawW = photoW * zoom;
  const drawH = photoH * zoom;
  const drawX = photoX - (drawW - photoW) / 2;
  const drawY = photoY - (drawH - photoH) / 2;

  ctx.drawImage(photoImg, drawX, drawY, drawW, drawH);
  ctx.restore();

  // Corner Accents on Photo Frame
  ctx.fillStyle = '#fe00fe';
  ctx.fillRect(photoX - 6 * scale, photoY - 6 * scale, 12 * scale, 4 * scale);
  ctx.fillRect(photoX - 6 * scale, photoY - 6 * scale, 4 * scale, 12 * scale);

  ctx.fillStyle = '#e3ec00';
  ctx.fillRect(photoX + photoW - 6 * scale, photoY + photoH + 2 * scale, 12 * scale, 4 * scale);

  // HUD text on photo
  ctx.fillStyle = 'rgba(227, 236, 0, 0.7)';
  ctx.font = `700 ${9 * scale}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('SYS.BIO.IMG_01', photoX + 6 * scale, photoY + 16 * scale);

  // 6. User Designation (Name & Handle)
  const nameY = photoY + photoH + 36 * scale;

  ctx.fillStyle = '#c9c8ab';
  ctx.font = `700 ${10 * scale}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('OPERATOR DESIGNATION', cardW / 2, nameY);

  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${22 * scale}px Montserrat, sans-serif`;
  const nameUpper = (pass.name || 'ANONYMOUS BUILDER').toUpperCase();
  ctx.fillText(nameUpper, cardW / 2, nameY + 28 * scale);

  if (pass.xHandle || pass.githubHandle) {
    ctx.fillStyle = '#7df4ff';
    ctx.font = `700 ${11 * scale}px "JetBrains Mono", monospace`;
    const handleStr = pass.xHandle ? `@${pass.xHandle.replace('@', '')}` : `gh/${pass.githubHandle}`;
    ctx.fillText(handleStr, cardW / 2, nameY + 46 * scale);
  }

  // 7. Divider & Builder Class / Vector Details
  const vectorY = nameY + 68 * scale;
  ctx.strokeStyle = '#0e3c29';
  ctx.beginPath();
  ctx.moveTo(24 * scale, vectorY - 14 * scale);
  ctx.lineTo(cardW - 24 * scale, vectorY - 14 * scale);
  ctx.stroke();

  const activeVec = VECTOR_OPTIONS.find(v => v.id === pass.vector) || VECTOR_OPTIONS[0];

  // Vector Box 1: Builder Class
  ctx.fillStyle = '#c9c8ab';
  ctx.font = `700 ${9 * scale}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('BUILDER CLASS', 24 * scale, vectorY);

  ctx.fillStyle = '#e3ec00';
  ctx.font = `700 ${12 * scale}px Montserrat, sans-serif`;
  const bClass = pass.builderClass || activeVec.defaultClass;
  ctx.fillText(bClass, 24 * scale, vectorY + 18 * scale);

  // Clearance Box
  ctx.fillStyle = '#c9c8ab';
  ctx.font = `700 ${9 * scale}px "JetBrains Mono", monospace`;
  ctx.fillText('CLEARANCE LEVEL', 24 * scale, vectorY + 40 * scale);

  ctx.fillStyle = '#fe00fe';
  ctx.font = `700 ${12 * scale}px "JetBrains Mono", monospace`;
  ctx.fillText(pass.clearance || activeVec.clearance, 24 * scale, vectorY + 58 * scale);

  // 8. Tech Stack Badges
  const techY = vectorY + 84 * scale;
  ctx.fillStyle = '#c9c8ab';
  ctx.font = `700 ${9 * scale}px "JetBrains Mono", monospace`;
  ctx.fillText('PRIMARY TECH VECTOR', 24 * scale, techY);

  let curX = 24 * scale;
  let curY = techY + 12 * scale;
  const stacks = pass.techStack.length > 0 ? pass.techStack : ['React', 'TypeScript', 'Rust'];

  stacks.slice(0, 5).forEach(stack => {
    ctx.font = `700 ${9 * scale}px "JetBrains Mono", monospace`;
    const textW = ctx.measureText(stack).width;
    const tagW = textW + 16 * scale;
    const tagH = 20 * scale;

    if (curX + tagW > cardW - 24 * scale) {
      curX = 24 * scale;
      curY += 24 * scale;
    }

    ctx.fillStyle = '#00311f';
    ctx.fillRect(curX, curY, tagW, tagH);
    ctx.strokeStyle = '#7df4ff';
    ctx.lineWidth = 1 * scale;
    ctx.strokeRect(curX, curY, tagW, tagH);

    ctx.fillStyle = '#7df4ff';
    ctx.textAlign = 'left';
    ctx.fillText(stack, curX + 8 * scale, curY + 14 * scale);

    curX += tagW + 8 * scale;
  });

  // 9. QR Code Matrix & Serial Number Footer
  const footerY = cardH - 120 * scale;
  ctx.strokeStyle = '#0e3c29';
  ctx.beginPath();
  ctx.moveTo(24 * scale, footerY);
  ctx.lineTo(cardW - 24 * scale, footerY);
  ctx.stroke();

  // Draw High-Tech Geometric QR Code
  const qrSize = 72 * scale;
  const qrX = cardW - qrSize - 24 * scale;
  const qrY = footerY + 16 * scale;
  drawHighTechQR(ctx, qrX, qrY, qrSize, pass.serialNumber);

  // Serial Number text
  ctx.fillStyle = '#c9c8ab';
  ctx.font = `700 ${9 * scale}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('SERIAL NO.', 24 * scale, footerY + 28 * scale);

  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${12 * scale}px "JetBrains Mono", monospace`;
  ctx.fillText(pass.serialNumber, 24 * scale, footerY + 46 * scale);

  // Location / Timestamp coordinates
  ctx.fillStyle = 'rgba(227, 236, 0, 0.7)';
  ctx.font = `700 ${9 * scale}px "JetBrains Mono", monospace`;
  ctx.fillText('GOA 15.2993° N // 73.9142° E', 24 * scale, footerY + 68 * scale);
  ctx.fillText('OCT 28-31 2026 // HACKER HOUSE', 24 * scale, footerY + 84 * scale);

  // 10. Holographic Foil Streak Overlay if active
  if (pass.hologramActive) {
    const holoGrad = ctx.createLinearGradient(0, 0, cardW, cardH);
    holoGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    holoGrad.addColorStop(0.4, 'rgba(254, 0, 254, 0.08)');
    holoGrad.addColorStop(0.5, 'rgba(227, 236, 0, 0.15)');
    holoGrad.addColorStop(0.6, 'rgba(125, 244, 255, 0.1)');
    holoGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = holoGrad;
    ctx.fillRect(0, 0, cardW, cardH);
  }

  ctx.restore();

  // Watermark at the bottom of the canvas
  ctx.fillStyle = 'rgba(201, 200, 171, 0.3)';
  ctx.font = `700 ${10 * scale}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL HACKER HOUSE GOA BUILDER PASS · FORGED CLIENT-SIDE', canvasWidth / 2, canvasHeight - 12 * scale);

  return canvas.toDataURL('image/png');
}

/**
 * Loads user photo URL or renders a high-tech fallback avatar canvas element
 */
function loadPhotoElement(photoUrl: string | null, name: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    if (photoUrl) {
      img.onload = () => resolve(img);
      img.onerror = () => resolve(createFallbackAvatar(name));
      img.src = photoUrl;
    } else {
      resolve(createFallbackAvatar(name));
    }
  });
}

function createFallbackAvatar(name: string): HTMLImageElement {
  const c = document.createElement('canvas');
  c.width = 400;
  c.height = 400;
  const ctx = c.getContext('2d')!;

  // Deep Jungle Avatar BG
  ctx.fillStyle = '#00180d';
  ctx.fillRect(0, 0, 400, 400);

  // Cyber Grid
  ctx.strokeStyle = 'rgba(227, 236, 0, 0.15)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 400; i += 32) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 400); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(400, i); ctx.stroke();
  }

  // Silhouette Avatar Body
  ctx.fillStyle = '#0e3c29';
  ctx.beginPath();
  ctx.arc(200, 150, 70, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(200, 360, 140, 120, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cyber Visor
  ctx.fillStyle = '#fe00fe';
  ctx.fillRect(150, 135, 100, 16);

  ctx.fillStyle = '#e3ec00';
  ctx.fillRect(170, 140, 60, 6);

  // Initials
  const initials = (name || 'AB').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'HH';
  ctx.fillStyle = '#e3ec00';
  ctx.font = '900 48px Montserrat, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(initials, 200, 290);

  const outImg = new Image();
  outImg.src = c.toDataURL();
  return outImg;
}

/**
 * Applies color/contrast filters to the canvas photo drawing
 */
function applyCanvasFilter(ctx: CanvasRenderingContext2D, filter: PhotoFilter) {
  switch (filter) {
    case 'cyber':
      ctx.filter = 'contrast(135%) brightness(110%) hue-rotate(-20deg)';
      break;
    case 'matrix':
      ctx.filter = 'contrast(150%) brightness(90%) sepia(100%) hue-rotate(75deg)';
      break;
    case 'sunset':
      ctx.filter = 'contrast(120%) saturate(180%) sepia(40%) hue-rotate(-40deg)';
      break;
    case 'noir':
      ctx.filter = 'grayscale(100%) contrast(160%) brightness(95%)';
      break;
    case 'raw':
    default:
      ctx.filter = 'none';
      break;
  }
}

/**
 * Renders a crisp high-tech scannable QR code matrix pattern
 */
function drawHighTechQR(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, data: string) {
  ctx.fillStyle = '#e3ec00';
  ctx.fillRect(x, y, size, size);

  ctx.fillStyle = '#00180d';
  const cell = size / 8;

  // Corner Finders
  ctx.fillRect(x + cell, y + cell, cell * 2, cell * 2);
  ctx.fillRect(x + size - cell * 3, y + cell, cell * 2, cell * 2);
  ctx.fillRect(x + cell, y + size - cell * 3, cell * 2, cell * 2);

  // Hash-based data bits
  let seed = 0;
  for (let i = 0; i < data.length; i++) {
    seed = (seed + data.charCodeAt(i) * 17) % 100;
  }

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r < 3 && c < 3) || (r < 3 && c > 4) || (r > 4 && c < 3)) continue;
      if ((r + c + seed) % 2 === 0) {
        ctx.fillRect(x + c * cell, y + r * cell, cell, cell);
      }
    }
  }

  // Center logo square
  ctx.fillStyle = '#fe00fe';
  ctx.fillRect(x + cell * 3.25, y + cell * 3.25, cell * 1.5, cell * 1.5);
}

/**
 * Photo Package Canvas Generator
 * All sizes are at 300 DPI for print-quality output.
 *
 * Photo sizes at 300 DPI:
 *   1×1 inch  = 300 × 300 px
 *   2×2 inch  = 600 × 600 px
 *   Passport  = 35 mm × 45 mm ≈ 413 × 531 px
 *
 * Output paper: 4×6 inch = 1200 × 1800 px
 */

const DPI = 300
const MM = DPI / 25.4 // px per mm ≈ 11.811

export const PAPER_W = 4 * DPI  // 1200
export const PAPER_H = 6 * DPI  // 1800

const S1 = 1 * DPI               // 1×1 inch = 300 px
const S2 = 2 * DPI               // 2×2 inch = 600 px
const PW = Math.round(35 * MM)   // passport width  ≈ 413 px
const PH = Math.round(45 * MM)   // passport height ≈ 531 px
// Name area height: divide remaining vertical space evenly across 3 rows
const NAME_H = Math.round((PAPER_H - 3 * PH) / 3) // ≈ 69 px
const CELL_H = PH + NAME_H                         // ≈ 600 px

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Draw an image cropped with object-fit:cover semantics into the target rect.
 */
function drawCover(ctx, img, dx, dy, dw, dh) {
  const ir = img.width / img.height
  const dr = dw / dh
  let sx, sy, sw, sh
  if (ir > dr) {
    sh = img.height
    sw = sh * dr
    sy = 0
    sx = (img.width - sw) / 2
  } else {
    sw = img.width
    sh = sw / dr
    sx = 0
    sy = (img.height - sh) / 2
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
}

/**
 * Draw dashed cut-guide lines on the canvas.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x1,y1,x2,y2 }[]} lines
 */
function drawCutLines(ctx, lines) {
  ctx.save()
  ctx.strokeStyle = 'rgba(180,180,180,0.8)'
  ctx.lineWidth = 3
  ctx.setLineDash([18, 12])
  lines.forEach(({ x1, y1, x2, y2 }) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  })
  ctx.restore()
}

/** Initialise the canvas to 4×6 white paper and return the context. */
function init(canvas) {
  canvas.width = PAPER_W
  canvas.height = PAPER_H
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, PAPER_W, PAPER_H)
  return ctx
}

// ─── Package generators ───────────────────────────────────────────────────────

/**
 * Package A — 4 pcs 2×2 + 4 pcs 1×1
 * Layout (4×6 paper):
 *   ┌─────────┬─────────┐  ← y=0
 *   │  2×2    │  2×2    │
 *   ├─────────┼─────────┤  ← y=600
 *   │  2×2    │  2×2    │
 *   ├──┬──┬──┬──┬───────┤  ← y=1200
 *   │1×1│1×1│1×1│1×1   │
 *   └──┴──┴──┴──┘        ← y=1500
 */
export function generatePackageA(canvas, img) {
  const ctx = init(canvas)

  // 4 × 2×2 in a 2-col × 2-row grid
  for (let i = 0; i < 4; i++) {
    const c = i % 2
    const r = Math.floor(i / 2)
    drawCover(ctx, img, c * S2, r * S2, S2, S2)
  }

  // 4 × 1×1 in a single row below
  const y1 = 2 * S2  // y = 1200
  for (let i = 0; i < 4; i++) {
    drawCover(ctx, img, i * S1, y1, S1, S1)
  }

  drawCutLines(ctx, [
    // 2×2 section
    { x1: S2,       y1: 0,      x2: S2,       y2: 2 * S2 },    // vertical centre
    { x1: 0,        y1: S2,     x2: PAPER_W,  y2: S2 },         // horizontal centre
    // Separator between sections
    { x1: 0,        y1: 2 * S2, x2: PAPER_W,  y2: 2 * S2 },
    // 1×1 section
    { x1: S1,       y1: y1,     x2: S1,       y2: y1 + S1 },
    { x1: 2 * S1,   y1: y1,     x2: 2 * S1,   y2: y1 + S1 },
    { x1: 3 * S1,   y1: y1,     x2: 3 * S1,   y2: y1 + S1 },
    { x1: 0,        y1: y1 + S1,x2: PAPER_W,  y2: y1 + S1 },
  ])
}

/**
 * Package B — 10 pcs 1×1
 * Layout: 4+4+2 (last row centred in the 4-col grid)
 */
export function generatePackageB(canvas, img) {
  const ctx = init(canvas)

  for (let i = 0; i < 10; i++) {
    let x, y
    if (i < 8) {
      x = (i % 4) * S1
      y = Math.floor(i / 4) * S1
    } else {
      // i = 8 → col 1, i = 9 → col 2 (centred in 4-col grid)
      x = (i - 8 + 1) * S1
      y = 2 * S1
    }
    drawCover(ctx, img, x, y, S1, S1)
  }

  drawCutLines(ctx, [
    // Horizontal row separators
    { x1: 0,        y1: S1,     x2: PAPER_W, y2: S1 },
    { x1: 0,        y1: 2 * S1, x2: PAPER_W, y2: 2 * S1 },
    { x1: 0,        y1: 3 * S1, x2: PAPER_W, y2: 3 * S1 },
    // Vertical separators rows 1-2
    { x1: S1,       y1: 0,      x2: S1,      y2: 2 * S1 },
    { x1: 2 * S1,   y1: 0,      x2: 2 * S1,  y2: 2 * S1 },
    { x1: 3 * S1,   y1: 0,      x2: 3 * S1,  y2: 2 * S1 },
    // Vertical separators row 3 (2 centred photos)
    { x1: S1,       y1: 2 * S1, x2: S1,      y2: 3 * S1 },
    { x1: 2 * S1,   y1: 2 * S1, x2: 2 * S1,  y2: 3 * S1 },
    { x1: 3 * S1,   y1: 2 * S1, x2: 3 * S1,  y2: 3 * S1 },
  ])
}

/**
 * Package C — 6 pcs 2×2
 * Layout: 2-col × 3-row grid (exactly fills 4×6 paper)
 */
export function generatePackageC(canvas, img) {
  const ctx = init(canvas)

  for (let i = 0; i < 6; i++) {
    const c = i % 2
    const r = Math.floor(i / 2)
    drawCover(ctx, img, c * S2, r * S2, S2, S2)
  }

  drawCutLines(ctx, [
    { x1: S2, y1: 0,       x2: S2,      y2: PAPER_H },   // vertical centre
    { x1: 0,  y1: S2,      x2: PAPER_W, y2: S2 },
    { x1: 0,  y1: 2 * S2,  x2: PAPER_W, y2: 2 * S2 },
  ])
}

/**
 * Package D — 6 pcs passport (35×45 mm) with name below each photo.
 * Layout: 2-col × 3-row grid; photos centred in each column.
 * Name printed in bold below each photo.
 */
export function generatePackageD(canvas, img, name = '') {
  const ctx = init(canvas)

  // Pack both columns side-by-side, centred horizontally on the paper
  const startX = Math.round((PAPER_W - 2 * PW) / 2)  // left edge of col 0
  const startY = Math.round((PAPER_H - 3 * CELL_H) / 2) // top edge of row 0 (vertically centred)
  const borderPx = Math.round(0.5 * MM) // thin border around each cell to help with cutting alignment

  for (let i = 0; i < 6; i++) {
    const c = i % 2
    const r = Math.floor(i / 2)
    const x = startX + c * PW   // no gap between columns
    const y = startY + r * CELL_H // no gap between rows

    // White background for name area
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(x, y + PH, PW, NAME_H)

    // Photo
    drawCover(ctx, img, x, y, PW, PH)

    // Name label below photo
    if (name && name.trim()) {
      ctx.save()
      const displayName = name.trim().toUpperCase()

      // Auto-shrink font for long names
      let fontSize = Math.round(NAME_H * 0.52)
      ctx.font = `bold ${fontSize}px Arial, sans-serif`
      while (ctx.measureText(displayName).width > PW - 20 && fontSize > 18) {
        fontSize -= 2
        ctx.font = `bold ${fontSize}px Arial, sans-serif`
      }

      ctx.fillStyle = '#111111'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(displayName, x + PW / 2, y + PH + NAME_H / 2)
      ctx.restore()
    }

    // Border around entire cell (photo + name)
    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = borderPx
    ctx.strokeRect(x + borderPx / 2, y + borderPx / 2, PW - borderPx, CELL_H - borderPx)
    ctx.restore()
  }

  // Cut lines traced exactly along the outer edge of each passport cell
  const cutLines = []
  for (let i = 0; i < 6; i++) {
    const c = i % 2
    const r = Math.floor(i / 2)
    const x = startX + c * PW
    const y = startY + r * CELL_H
    cutLines.push({ x1: x,      y1: y,           x2: x + PW,  y2: y           }) // top
    cutLines.push({ x1: x,      y1: y + CELL_H,  x2: x + PW,  y2: y + CELL_H }) // bottom
    cutLines.push({ x1: x,      y1: y,           x2: x,       y2: y + CELL_H }) // left
    cutLines.push({ x1: x + PW, y1: y,           x2: x + PW,  y2: y + CELL_H }) // right
  }
  drawCutLines(ctx, cutLines)
}

/**
 * Package E — 2 pcs 2×2 + 8 pcs 1×1
 * Layout: 2×2 pair on top, then 2 rows of 4×1×1 below — centred vertically
 */
export function generatePackageE(canvas, img) {
  const ctx = init(canvas)
  const totalH = S2 + 2 * S1                      // 1200 px
  const startY = Math.round((PAPER_H - totalH) / 2) // 300 px

  // 2 × 2×2
  drawCover(ctx, img, 0,  startY, S2, S2)
  drawCover(ctx, img, S2, startY, S2, S2)

  // 8 × 1×1 in two rows of 4
  for (let i = 0; i < 8; i++) {
    const c = i % 4
    const r = Math.floor(i / 4)
    drawCover(ctx, img, c * S1, startY + S2 + r * S1, S1, S1)
  }

  drawCutLines(ctx, [
    // 2×2 section
    { x1: S2,     y1: startY,       x2: S2,      y2: startY + S2 },
    { x1: 0,      y1: startY + S2,  x2: PAPER_W, y2: startY + S2 },
    // 1×1 rows
    { x1: 0,      y1: startY + S2 + S1, x2: PAPER_W, y2: startY + S2 + S1 },
    { x1: 0,      y1: startY + S2 + 2*S1, x2: PAPER_W, y2: startY + S2 + 2*S1 },
    { x1: S1,     y1: startY + S2,  x2: S1,      y2: startY + totalH },
    { x1: 2*S1,   y1: startY + S2,  x2: 2*S1,    y2: startY + totalH },
    { x1: 3*S1,   y1: startY + S2,  x2: 3*S1,    y2: startY + totalH },
    // outer border
    { x1: 0,      y1: startY,       x2: PAPER_W, y2: startY },
    { x1: 0,      y1: startY + totalH, x2: PAPER_W, y2: startY + totalH },
  ])
}

/**
 * Package F — 4 pcs passport (2 cols × 2 rows) with name — centred on paper
 */
export function generatePackageF(canvas, img, name = '') {
  const ctx = init(canvas)
  const startX = Math.round((PAPER_W - 2 * PW) / 2)
  const startY = Math.round((PAPER_H - 2 * CELL_H) / 2)
  const borderPx = Math.round(0.5 * MM)

  for (let i = 0; i < 4; i++) {
    const c = i % 2
    const r = Math.floor(i / 2)
    const x = startX + c * PW
    const y = startY + r * CELL_H

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(x, y + PH, PW, NAME_H)

    drawCover(ctx, img, x, y, PW, PH)

    if (name && name.trim()) {
      ctx.save()
      const displayName = name.trim().toUpperCase()
      let fontSize = Math.round(NAME_H * 0.52)
      ctx.font = `bold ${fontSize}px Arial, sans-serif`
      while (ctx.measureText(displayName).width > PW - 20 && fontSize > 18) {
        fontSize -= 2
        ctx.font = `bold ${fontSize}px Arial, sans-serif`
      }
      ctx.fillStyle = '#111111'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(displayName, x + PW / 2, y + PH + NAME_H / 2)
      ctx.restore()
    }

    ctx.save()
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = borderPx
    ctx.strokeRect(x + borderPx / 2, y + borderPx / 2, PW - borderPx, CELL_H - borderPx)
    ctx.restore()
  }

  const cutLines = []
  for (let i = 0; i < 4; i++) {
    const c = i % 2
    const r = Math.floor(i / 2)
    const x = startX + c * PW
    const y = startY + r * CELL_H
    cutLines.push({ x1: x,      y1: y,           x2: x + PW,  y2: y           })
    cutLines.push({ x1: x,      y1: y + CELL_H,  x2: x + PW,  y2: y + CELL_H })
    cutLines.push({ x1: x,      y1: y,           x2: x,       y2: y + CELL_H })
    cutLines.push({ x1: x + PW, y1: y,           x2: x + PW,  y2: y + CELL_H })
  }
  drawCutLines(ctx, cutLines)
}

/**
 * Package G — 1 pc 3×4 inch + 4 pcs 1×1 (school-photo combo)
 * 3×4 on the left, 4×1×1 stacked on the right strip
 */
export function generatePackageG(canvas, img) {
  const ctx = init(canvas)
  const S34W = 3 * DPI  // 900 px
  const S34H = 4 * DPI  // 1200 px
  const startY = Math.round((PAPER_H - S34H) / 2) // 300 px

  // 1 × 3×4 on left
  drawCover(ctx, img, 0, startY, S34W, S34H)

  // 4 × 1×1 stacked in right strip (width = S1 = 300 px, exactly)
  for (let i = 0; i < 4; i++) {
    drawCover(ctx, img, S34W, startY + i * S1, S1, S1)
  }

  drawCutLines(ctx, [
    // outer top/bottom
    { x1: 0,    y1: startY,          x2: PAPER_W, y2: startY },
    { x1: 0,    y1: startY + S34H,   x2: PAPER_W, y2: startY + S34H },
    // vertical split between 3×4 and 1×1 strip
    { x1: S34W, y1: startY,          x2: S34W,    y2: startY + S34H },
    // horizontal dividers in 1×1 strip
    { x1: S34W, y1: startY + S1,     x2: PAPER_W, y2: startY + S1 },
    { x1: S34W, y1: startY + 2*S1,   x2: PAPER_W, y2: startY + 2*S1 },
    { x1: S34W, y1: startY + 3*S1,   x2: PAPER_W, y2: startY + 3*S1 },
    // right edge
    { x1: PAPER_W, y1: startY,       x2: PAPER_W, y2: startY + S34H },
  ])
}

/**
 * Package H — symmetric sandwich: 4×1×1 | 2×2×2 | 4×1×1 — centred vertically
 */
export function generatePackageH(canvas, img) {
  const ctx = init(canvas)
  const totalH = S1 + S2 + S1                       // 1200 px
  const startY = Math.round((PAPER_H - totalH) / 2)  // 300 px

  // Top row: 4 × 1×1
  for (let i = 0; i < 4; i++) {
    drawCover(ctx, img, i * S1, startY, S1, S1)
  }

  // Middle: 2 × 2×2
  drawCover(ctx, img, 0,  startY + S1, S2, S2)
  drawCover(ctx, img, S2, startY + S1, S2, S2)

  // Bottom row: 4 × 1×1
  for (let i = 0; i < 4; i++) {
    drawCover(ctx, img, i * S1, startY + S1 + S2, S1, S1)
  }

  drawCutLines(ctx, [
    // outer borders
    { x1: 0,    y1: startY,          x2: PAPER_W, y2: startY },
    { x1: 0,    y1: startY + totalH, x2: PAPER_W, y2: startY + totalH },
    // row separators
    { x1: 0,    y1: startY + S1,           x2: PAPER_W, y2: startY + S1 },
    { x1: 0,    y1: startY + S1 + S2,      x2: PAPER_W, y2: startY + S1 + S2 },
    // vertical in top 1×1 row
    { x1: S1,   y1: startY,          x2: S1,      y2: startY + S1 },
    { x1: 2*S1, y1: startY,          x2: 2*S1,    y2: startY + S1 },
    { x1: 3*S1, y1: startY,          x2: 3*S1,    y2: startY + S1 },
    // vertical in 2×2 row
    { x1: S2,   y1: startY + S1,     x2: S2,      y2: startY + S1 + S2 },
    // vertical in bottom 1×1 row
    { x1: S1,   y1: startY + S1 + S2, x2: S1,     y2: startY + totalH },
    { x1: 2*S1, y1: startY + S1 + S2, x2: 2*S1,   y2: startY + totalH },
    { x1: 3*S1, y1: startY + S1 + S2, x2: 3*S1,   y2: startY + totalH },
  ])
}

/**
 * Dispatch to the correct generator based on package ID.
 */
export function generatePackage(canvas, packageId, img, name = '') {
  switch (packageId) {
    case 'A': return generatePackageA(canvas, img)
    case 'B': return generatePackageB(canvas, img)
    case 'C': return generatePackageC(canvas, img)
    case 'D': return generatePackageD(canvas, img, name)
    case 'E': return generatePackageE(canvas, img)
    case 'F': return generatePackageF(canvas, img, name)
    case 'G': return generatePackageG(canvas, img)
    case 'H': return generatePackageH(canvas, img)
    default:  throw new Error(`Unknown package: ${packageId}`)
  }
}

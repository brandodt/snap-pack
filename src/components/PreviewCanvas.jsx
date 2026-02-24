import { useEffect, useRef } from 'react'
import { generatePackage, PAPER_W, PAPER_H } from '../utils/canvasGenerator'

const PACKAGE_LABELS = {
  A: 'Package A — 2×2 + 1×1',
  B: 'Package B — 1×1 (10 pcs)',
  C: 'Package C — 2×2 (6 pcs)',
  D: 'Package D — Passport',
}

export default function PreviewCanvas({ packageId, photo, name }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !photo) return

    let cancelled = false
    const img = new Image()

    img.onload = () => {
      if (cancelled) return
      generatePackage(canvas, packageId, img, name)
    }
    img.src = photo

    return () => { cancelled = true }
  }, [packageId, photo, name])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `photo-${PACKAGE_LABELS[packageId].replace(/\s+/g, '-').toLowerCase()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  function handlePrint() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    const win = window.open('', '_blank')
    win.document.write(
      '<html><head><title>Print – ' + PACKAGE_LABELS[packageId] + '</title>' +
      '<style>@page{size:4in 6in;margin:0}body{margin:0}img{width:4in;height:6in;display:block}</style>' +
      '</head><body><img src="' + dataUrl + '" />' +
      '<script>window.onload=function(){window.print();window.close()}<' + '/script></body></html>'
    )
    win.document.close()
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Preview
        </h2>
        <span className="text-xs text-gray-600">300 DPI · 4×6 in</span>
      </div>

      {/* Canvas wrapper */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-3 flex justify-center">
        <div
          className="overflow-hidden rounded-lg border border-gray-700 shadow-xl"
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <canvas
            ref={canvasRef}
            width={PAPER_W}
            height={PAPER_H}
            style={{ width: '100%', display: 'block' }}
            aria-label={`${PACKAGE_LABELS[packageId]} layout preview`}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v9M5 8l3 3 3-3M2 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download PNG
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold py-3 transition-colors border border-gray-700"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M5 5V3a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v2" stroke="currentColor" strokeWidth="1.6"/>
            <rect x="5" y="9" width="6" height="3.5" rx=".5" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          Print
        </button>
      </div>

      <p className="text-xs text-gray-600 text-center">
        Output is print-ready at 300 DPI · scale to 4×6 in when printing
      </p>
    </section>
  )
}


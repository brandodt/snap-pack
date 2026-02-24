/**
 * Visual diagram of each package layout — rendered as inline SVG icons
 * so users can see what arrangement they'll get at a glance.
 */

// Small squares arranged like the real layout
export function DiagramA() {
  return (
    <svg viewBox="0 0 44 56" className="w-full h-full" aria-hidden="true">
      {/* 2×2 grid (top) */}
      <rect x="1" y="1"  width="20" height="20" rx="1" fill="currentColor" opacity=".9"/>
      <rect x="23" y="1" width="20" height="20" rx="1" fill="currentColor" opacity=".9"/>
      <rect x="1" y="23" width="20" height="20" rx="1" fill="currentColor" opacity=".9"/>
      <rect x="23" y="23" width="20" height="20" rx="1" fill="currentColor" opacity=".9"/>
      {/* 1×1 row (bottom) */}
      <rect x="1"  y="46" width="9" height="9" rx="1" fill="currentColor" opacity=".7"/>
      <rect x="12" y="46" width="9" height="9" rx="1" fill="currentColor" opacity=".7"/>
      <rect x="23" y="46" width="9" height="9" rx="1" fill="currentColor" opacity=".7"/>
      <rect x="34" y="46" width="9" height="9" rx="1" fill="currentColor" opacity=".7"/>
    </svg>
  )
}

export function DiagramB() {
  // 4+4+2 layout
  const positions = [
    [1,1],[12,1],[23,1],[34,1],
    [1,12],[12,12],[23,12],[34,12],
    [12,23],[23,23],
  ]
  return (
    <svg viewBox="0 0 44 33" className="w-full h-full" aria-hidden="true">
      {positions.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="9" height="9" rx="1" fill="currentColor" opacity=".9"/>
      ))}
    </svg>
  )
}

export function DiagramC() {
  // 2×3 grid of 2×2
  const positions = [
    [1,1],[23,1],
    [1,20],[23,20],
    [1,39],[23,39],
  ]
  return (
    <svg viewBox="0 0 44 58" className="w-full h-full" aria-hidden="true">
      {positions.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="20" height="18" rx="1" fill="currentColor" opacity=".9"/>
      ))}
    </svg>
  )
}

export function DiagramD() {
  const positions = [[1,1],[24,1],[1,22],[24,22],[1,43],[24,43]]
  return (
    <svg viewBox="0 0 45 65" className="w-full h-full" aria-hidden="true">
      {positions.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="19" height="18" rx="1" fill="currentColor" opacity=".9"/>
          <rect x={x+2} y={y+19} width="15" height="1.5" rx=".5" fill="currentColor" opacity=".5"/>
        </g>
      ))}
    </svg>
  )
}

export function DiagramE() {
  // 2×2 pair on top, 2 rows of 4×1×1 below
  return (
    <svg viewBox="0 0 44 50" className="w-full h-full" aria-hidden="true">
      <rect x="1"  y="1"  width="20" height="20" rx="1" fill="currentColor" opacity=".9"/>
      <rect x="23" y="1"  width="20" height="20" rx="1" fill="currentColor" opacity=".9"/>
      {[0,1,2,3].map(i => <rect key={i}    x={1+i*11} y="23" width="9" height="9" rx="1" fill="currentColor" opacity=".75"/>)}
      {[0,1,2,3].map(i => <rect key={i+4}  x={1+i*11} y="34" width="9" height="9" rx="1" fill="currentColor" opacity=".75"/>)}
    </svg>
  )
}

export function DiagramF() {
  // 2×2 grid of passport + name
  const positions = [[1,1],[24,1],[1,24],[24,24]]
  return (
    <svg viewBox="0 0 45 47" className="w-full h-full" aria-hidden="true">
      {positions.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="19" height="18" rx="1" fill="currentColor" opacity=".9"/>
          <rect x={x+2} y={y+19} width="15" height="1.5" rx=".5" fill="currentColor" opacity=".5"/>
        </g>
      ))}
    </svg>
  )
}

export function DiagramG() {
  // 3×4 on left, 4×1×1 stacked on right
  return (
    <svg viewBox="0 0 44 44" className="w-full h-full" aria-hidden="true">
      <rect x="1" y="1" width="30" height="42" rx="1" fill="currentColor" opacity=".9"/>
      {[0,1,2,3].map(i => <rect key={i} x="33" y={1+i*10} width="10" height="9" rx="1" fill="currentColor" opacity=".75"/>)}
    </svg>
  )
}

export function DiagramH() {
  // 4×1×1 top + 2×2×2 middle + 4×1×1 bottom
  return (
    <svg viewBox="0 0 44 50" className="w-full h-full" aria-hidden="true">
      {[0,1,2,3].map(i => <rect key={i}   x={1+i*11} y="1"  width="9" height="9" rx="1" fill="currentColor" opacity=".75"/>)}
      <rect x="1"  y="12" width="20" height="20" rx="1" fill="currentColor" opacity=".9"/>
      <rect x="23" y="12" width="20" height="20" rx="1" fill="currentColor" opacity=".9"/>
      {[0,1,2,3].map(i => <rect key={i+4} x={1+i*11} y="34" width="9" height="9" rx="1" fill="currentColor" opacity=".75"/>)}
    </svg>
  )
}

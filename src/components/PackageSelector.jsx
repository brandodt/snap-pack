import { DiagramA, DiagramB, DiagramC, DiagramD, DiagramE, DiagramF, DiagramG, DiagramH } from './PackageDiagrams'

const DIAGRAMS = { A: DiagramA, B: DiagramB, C: DiagramC, D: DiagramD, E: DiagramE, F: DiagramF, G: DiagramG, H: DiagramH }

const PACKAGES = [
  {
    id: 'A',
    name: 'Package A',
    subtitle: 'Combination',
    specs: ['4 pcs — 2×2 inch', '4 pcs — 1×1 inch'],
    accent: 'from-blue-500 to-cyan-500',
    ring: 'ring-blue-500',
    glow: 'shadow-blue-500/30',
  },
  {
    id: 'B',
    name: 'Package B',
    subtitle: '1×1 inch',
    specs: ['10 pcs — 1×1 inch'],
    accent: 'from-emerald-500 to-teal-500',
    ring: 'ring-emerald-500',
    glow: 'shadow-emerald-500/30',
  },
  {
    id: 'C',
    name: 'Package C',
    subtitle: '2×2 inch',
    specs: ['6 pcs — 2×2 inch'],
    accent: 'from-violet-500 to-purple-500',
    ring: 'ring-violet-500',
    glow: 'shadow-violet-500/30',
  },
  {
    id: 'D',
    name: 'Package D',
    subtitle: 'Passport Size',
    specs: ['6 pcs — 35×45 mm', 'Name printed below'],
    accent: 'from-rose-500 to-pink-500',
    ring: 'ring-rose-500',
    glow: 'shadow-rose-500/30',
  },
  {
    id: 'E',
    name: 'Package E',
    subtitle: 'Combination',
    specs: ['2 pcs — 2×2 inch', '8 pcs — 1×1 inch'],
    accent: 'from-amber-500 to-orange-500',
    ring: 'ring-amber-500',
    glow: 'shadow-amber-500/30',
  },
  {
    id: 'F',
    name: 'Package F',
    subtitle: 'Passport Size',
    specs: ['4 pcs — 35×45 mm', 'Name printed below'],
    accent: 'from-fuchsia-500 to-rose-500',
    ring: 'ring-fuchsia-500',
    glow: 'shadow-fuchsia-500/30',
  },
  {
    id: 'G',
    name: 'Package G',
    subtitle: 'School Combo',
    specs: ['1 pc — 3×4 inch', '4 pcs — 1×1 inch'],
    accent: 'from-sky-500 to-blue-500',
    ring: 'ring-sky-500',
    glow: 'shadow-sky-500/30',
  },
  {
    id: 'H',
    name: 'Package H',
    subtitle: 'Symmetric Combo',
    specs: ['4 pcs — 1×1 inch', '2 pcs — 2×2 inch', '4 pcs — 1×1 inch'],
    accent: 'from-lime-500 to-emerald-500',
    ring: 'ring-lime-500',
    glow: 'shadow-lime-500/30',
  },
]

export default function PackageSelector({ selected, onSelect }) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
        Choose a Package
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {PACKAGES.map((pkg) => {
          const Diagram = DIAGRAMS[pkg.id]
          const isSelected = selected === pkg.id
          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg.id)}
              className={[
                'relative flex flex-col items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer',
                isSelected
                  ? `border-transparent ring-2 ${pkg.ring} bg-gray-800/80 shadow-xl ${pkg.glow}`
                  : 'border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800/60',
              ].join(' ')}
              aria-pressed={isSelected}
            >
              {/* Gradient badge */}
              <span
                className={`bg-linear-to-br ${pkg.accent} w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md`}
              >
                {pkg.id}
              </span>

              {/* Layout diagram */}
              <div
                className={`w-10 h-12 ${isSelected ? 'text-white' : 'text-gray-500'} transition-colors`}
              >
                <Diagram />
              </div>

              <div className="text-center">
                <p className="font-bold text-white text-sm">{pkg.name}</p>
                <p className={`text-xs font-medium bg-linear-to-r ${pkg.accent} bg-clip-text text-transparent`}>
                  {pkg.subtitle}
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {pkg.specs.map((s) => (
                    <li key={s} className="text-xs text-gray-400">{s}</li>
                  ))}
                </ul>
              </div>

              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-gray-900" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}

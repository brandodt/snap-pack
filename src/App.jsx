import { useState } from 'react'
import PackageSelector from './components/PackageSelector'
import UploadZone from './components/UploadZone'
import PreviewCanvas from './components/PreviewCanvas'
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState('')

  const PASSPORT_PACKAGES = ['D', 'F']

  function handlePackageSelect(id) {
    setSelectedPackage(id)
    if (!PASSPORT_PACKAGES.includes(id)) setName('')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>
      {/* Header */}
      <header className="border-b border-gray-800/60 bg-gray-950/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <img src="/snappack-logo.svg" alt="SnapPack" className="h-10" />
          {/* Badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-500 border border-gray-800 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            300 DPI · 4×6 in
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <PackageSelector selected={selectedPackage} onSelect={handlePackageSelect} />

        {selectedPackage && (
          <UploadZone
            photo={photo}
            onPhotoChange={setPhoto}
            showName={PASSPORT_PACKAGES.includes(selectedPackage)}
            name={name}
            onNameChange={setName}
          />
        )}

        {selectedPackage && photo && (
          <PreviewCanvas
            packageId={selectedPackage}
            photo={photo}
            name={name}
          />
        )}

        {/* Empty state */}
        {!selectedPackage && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none">
                <path d="M4 8h16M4 12h10M4 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-gray-500 text-sm">Select a package above to get started</p>
          </div>
        )}

        {selectedPackage && !photo && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-gray-600 text-sm">Upload a photo to see the preview</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 mt-16 py-6">
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src="/icon.svg" alt="" className="w-5 h-5 rounded-md" />
            <span className="text-xs font-bold text-gray-500">SnapPack</span>
          </div>
          <p className="text-xs text-gray-700">Made by <span className="text-gray-500 font-medium">Brando Dela Torre</span></p>
        </div>
      </footer>
      <Analytics />
    </div>
  )
}


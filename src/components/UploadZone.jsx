import { useRef, useState } from 'react'

export default function UploadZone({ photo, onPhotoChange, showName, name, onNameChange }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => onPhotoChange(e.target.result)
    reader.readAsDataURL(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  function handleInputChange(e) {
    handleFile(e.target.files[0])
  }

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
        Upload Photo
      </h2>

      {/* Drop Zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload photo — click or drag and drop"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={[
          'relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden',
          dragging
            ? 'border-blue-400 bg-blue-950/30'
            : photo
              ? 'border-gray-700 bg-gray-900'
              : 'border-gray-700 bg-gray-900 hover:border-gray-500 hover:bg-gray-800/60',
        ].join(' ')}
        style={{ minHeight: '180px' }}
      >
        {photo ? (
          /* Preview */
          <div className="flex items-center gap-4 p-4">
            <img
              src={photo}
              alt="Uploaded preview"
              className="w-24 h-24 object-cover rounded-xl border border-gray-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Photo ready</p>
              <p className="text-xs text-gray-400 mt-0.5">Click to replace</p>
            </div>
            <button
              type="button"
              aria-label="Remove photo"
              onClick={(e) => { e.stopPropagation(); onPhotoChange(null) }}
              className="shrink-0 w-8 h-8 rounded-full bg-gray-800 hover:bg-red-900/60 border border-gray-700 hover:border-red-600 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ) : (
          /* Placeholder */
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="w-14 h-14 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
              <svg className="w-7 h-7 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M4 16l4-4 4 4M12 12l4-5 4 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">
                Drop your photo here
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                or <span className="text-blue-400 underline underline-offset-2">browse files</span>
              </p>
              <p className="text-xs text-gray-600 mt-2">JPG, PNG, WEBP supported</p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {/* Name input (only for Package D) */}
      {showName && (
        <div className="space-y-1.5">
          <label htmlFor="subject-name" className="text-sm font-medium text-gray-300">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="subject-name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. JUAN DELA CRUZ"
            maxLength={60}
            className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors"
          />
          <p className="text-xs text-gray-600">Displayed in uppercase below each passport photo.</p>
        </div>
      )}
    </section>
  )
}

# SnapPack

**SnapPack** is a browser-based photo package generator that produces print-ready 300 DPI layouts on a 4×6 inch canvas. Upload a photo, pick a package, and instantly download or print a studio-quality layout — no design software needed.

---

## Packages

| Package | Contents                          | Layout                                                     |
| ------- | --------------------------------- | ---------------------------------------------------------- |
| **A**   | 4 pcs 2×2 + 4 pcs 1×1             | 2×2 grid on top, 1×1 row below                             |
| **B**   | 10 pcs 1×1                        | 4 + 4 + 2 rows                                             |
| **C**   | 6 pcs 2×2                         | 2-column × 3-row grid                                      |
| **D**   | 6 pcs Passport (35×45 mm)         | 2-column × 3-row, centred, name printed below each photo   |
| **E**   | 2 pcs 2×2 + 8 pcs 1×1             | 2×2 pair on top, 2 rows of 4×1×1 below, centred            |
| **F**   | 4 pcs Passport (35×45 mm)         | 2-column × 2-row, centred, name printed below each photo   |
| **G**   | 1 pc 3×4 + 4 pcs 1×1              | 3×4 on the left, 4×1×1 stacked on the right, centred       |
| **H**   | 4 pcs 1×1 + 2 pcs 2×2 + 4 pcs 1×1 | Symmetric sandwich (1×1 row / 2×2 pair / 1×1 row), centred |

---

## Features

- Drag-and-drop or click-to-browse photo upload (JPG, PNG, WEBP)
- SVG layout diagram for each package shown at selection time
- Live canvas preview at 300 DPI on a 4×6 in canvas
- Passport packages (D & F) include an auto-sizing name label printed below each photo
- Dashed cut-guide lines per cell for easy trimming
- Download as PNG or send directly to your printer (page auto-sized to 4×6 in)

---

## Tech Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- HTML5 Canvas API

---

## Getting Started

```bash
# Install dependencies
yarn

# Start dev server
yarn dev

# Build for production
yarn build
```

---

## Author

**Brando Dela Torre**

---

## License

MIT

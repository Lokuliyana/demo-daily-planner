# The Dispatch & Blueprint — Minimalist & Retro Editorial Design System

A handcrafted, distinctive Next.js & Tailwind CSS template and component system designed as an antidote to generic AI interfaces. Built around warm paper stocks, high-contrast serif typography, monospaced data ledgers, and tactile ink dividing rules.

---

## 🏛️ Core Design Principles

1. **Authentic Paper Surfaces & Tones**:
   - **Broadside Cream** (`#F9F6F0`): Warm, inviting, natural paper surface for daylight reading.
   - **Archival Laid Paper** (`#F4EFE6`): Historical, rich antique tone with burgundy press seals.
   - **Washi Botanical** (`#F3F5EF`): Organic, calming Japanese paper tone with forest ink accents.
   - **Obsidian Night Press** (`#141312`): High-contrast inverted dark mode resembling a printer's ink slab.

2. **Disciplined Typographic Hierarchy**:
   - **Serif Headlines & Display**: *Newsreader* / *Playfair Display* for authoritative, literary lead stories.
   - **Monospaced Data & Metadata**: *JetBrains Mono* / *SF Mono* for tickers, stamps, timestamps, and ledger metrics.
   - **Clean UI Sans**: *Plus Jakarta Sans* / *Inter* for form controls and interface navigation.

3. **Mathematical Precision & Concentric Radii**:
   - Nested containers follow the strict formula: `Inner Radius = Outer Radius - Padding`.
   - Docking rule: Viewport-touching boundaries (action bars, headers) enforce `0px` radius at contact edges.
   - 8-pt spatial rhythm across all cards and section dividers.

4. **Tactile Ink Hairlines & Newspaper Rules**:
   - Double hairline dividing rules (`rule-double-t`, `rule-double-b`) for mastheads and table footers.
   - Rubber stamp badges (`Badge variant="stamp"`) and postal seals (`PressSeal`).
   - Classic editorial drop-caps (`drop-cap`).

---

## 🧰 Available Modular Building Blocks

- **`Masthead`** (`src/components/layout/masthead.tsx`): Broadside newspaper masthead with date stamp, global edition tags, paper stock switcher, and category navigation.
- **`Card` & `NestedCardItem`** (`src/components/ui/card.tsx`): Tactile paper cards, pull quotes (`EditorialPullQuote`), and concentric inner containers.
- **`Button`** (`src/components/ui/button.tsx`): Primary ink vermilion, secondary paper, outline typewriter, and dashed stamp buttons.
- **`Badge`** (`src/components/ui/badge.tsx`): Stamp, archival, outline, and status badges.
- **`QuickSelect`** (`src/components/ui/quick-select.tsx`): Ergonomic 1-tap selectors replacing high-friction dropdowns (Fitts's Law).
- **`Input` & `Textarea`** (`src/components/ui/input.tsx`): Typewriter-styled inputs with monospaced labels and hairline borders.
- **`StickyActionBar`** (`src/components/layout/sticky-action-bar.tsx`): Bottom-docked action deck with token export and print trigger.
- **`EditorialFooter`** (`src/components/layout/editorial-footer.tsx`): Colophon, typography credits, and dispatch newsletter subscription.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the interactive workbench and design token matrix.

### Building for Production

```bash
npm run build
```

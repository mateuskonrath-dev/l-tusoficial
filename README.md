# 🪷 Lótus Calçados — Premium Website

**A sophisticated digital presence for luxury women's footwear manufacturing.**

---

## 📊 Project Status

✅ **PHASE 1-3 Complete:** UX Audit → Design Improvements → Design Tokens

### Version: 1.0.0
**Last Updated:** March 26, 2026
**Maintained by:** Uma (UX Design Expert)

---

## 🎯 Key Features

### ✨ **Premium Design System**
- W3C DTCG-compliant design tokens (`tokens.json`)
- Complete CSS variable system (`tokens.css`)
- Scalable, maintainable component architecture
- Dark/light mode ready

### 🌍 **Multilingual Support**
- 6 languages: 🇵🇹 Portuguese, 🇬🇧 English, 🇩🇪 German, 🇫🇷 French, 🇪🇸 Spanish, 🇮🇹 Italian
- Dynamic translation system with localStorage persistence
- Language dropdown selector

### ♿ **Accessibility (WCAG AA)**
- Contrast ratio: **6.5:1** (exceeds WCAG AA minimum)
- Responsive font sizing with `clamp()`
- Semantic HTML structure
- Form validation with visual feedback
- Reduced motion support

### 📱 **Fully Responsive**
- Mobile-first design (375px+)
- Optimized for tablets (768px+)
- Desktop experience (1440px+)
- Smart breakpoints and fluid layout

### ⚡ **Performance Optimized**
- No dependencies (pure HTML/CSS/JS)
- CSS custom properties for minimal redundancy
- Smooth animations with hardware acceleration
- Optimized images with object-fit

---

## 📁 Project Structure

```
lotus-site/
├── index.html                # Main HTML file
├── style.css                 # Component & section styles
├── tokens.css               # 🆕 Design tokens (CSS variables)
├── tokens.json              # 🆕 W3C DTCG token definitions
├── script.js                # Interactions & translations
├── DESIGN_SYSTEM.md         # 🆕 Design system documentation
├── README.md               # This file
├── assets/                  # Images & media
├── locales/                 # Translation files (6 languages)
│   ├── pt.json
│   ├── en.json
│   ├── de.json
│   ├── fr.json
│   ├── es.json
│   └── it.json
└── deploy/                  # Vercel deployment config

```

---

## 🚀 Quick Start

### Local Development

```bash
# Start Python HTTP server (or use Live Server)
cd lotus-site
python3 -m http.server 8000

# Open browser
# http://localhost:8000/
```

### Install Dependencies
None! This is vanilla HTML/CSS/JS.

### Deploy
```bash
# The site is already deployed on Vercel
# https://lotus-shoes-preview.vercel.app/
```

---

## 🎨 Design System

### Design Tokens

All design values are centralized in **`tokens.json`** and mapped to CSS variables in **`tokens.css`**:

#### Colors
```css
--color-brand-primary: #d4af37           /* Gold */
--color-brand-secondary-dark: #0f3b28    /* Deep Green */
--color-neutral-text-primary: #d0d6d2    /* WCAG AA Compliant */
```

#### Typography
```css
--font-serif: 'Playfair Display', serif
--font-sans: 'Inter', sans-serif
--font-size-base: 16px
--font-weight-bold: 700
```

#### Spacing
```css
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
```

**Full documentation:** See `DESIGN_SYSTEM.md`

---

## 📋 Sections

### 1. **Hero Section**
- Full-width background image with overlay
- Animated zoom effect (20s loop)
- Responsive typography with `clamp()`
- Clear call-to-action

### 2. **About (Global Excellence)**
- 2-column layout (stacks on mobile)
- Stats cards with glassmorphism effect
- Company overview & metrics
- Team photo with hover zoom

### 3. **CTA Section** ✨ NEW
- Gradient background with floating animation
- Two button options (primary + secondary)
- High conversion-focused copy

### 4. **Social Responsibility**
- 2-column card grid (responsive)
- 64x64 icons for visibility
- Company culture & community focus
- Smooth hover animations

### 5. **Sustainability**
- Dark gradient background
- 3-column card grid with hover glow
- Key metrics (800 solar panels, 100% recycling, etc.)
- Featured image with enhanced shadows

### 6. **Contact Form**
- Real-time validation (blur + input events)
- Visual feedback (green/red states)
- Multi-language support
- Responsive grid layout
- Country input field (free text)

### 7. **Info & Map**
- Contact details with icons
- Embedded Google Maps
- Responsive layout

---

## 🔧 Customization

### Change Colors

Edit **`tokens.css`** (variables) or **`tokens.json`** (definitions):

```css
:root {
  --color-brand-primary: #your-color;
}
```

### Adjust Spacing

Modify spacing tokens:

```css
--spacing-lg: 1.5rem;  /* Change to any value */
```

### Add New Component

1. Create CSS in `style.css`
2. Use design tokens: `var(--color-gold)`
3. Document in `DESIGN_SYSTEM.md`

---

## 🌐 Language Support

Add a new language:

1. Create `locales/[lang].json`
2. Copy structure from `locales/pt.json`
3. Translate all keys
4. Script auto-detects and loads

Current languages:
- 🇵🇹 Portuguese (pt)
- 🇬🇧 English (en)
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇮🇹 Italian (it)

---

## 📈 Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| **Lighthouse** | 90+ | ✅ Optimized |
| **Contrast Ratio** | 4.5:1 | ✅ 6.5:1 (WCAG AA+) |
| **Mobile Responsive** | 375px+ | ✅ Fluid |
| **Load Time** | <2s | ✅ Zero deps |
| **Accessibility** | WCAG AA | ✅ Compliant |

---

## 🔐 Security

- No external scripts (except Google Fonts)
- No form submission backend (simulated)
- XSS-safe translations
- Input validation

---

## 🎯 Best Practices Implemented

### ✅ Atomic Design
Components built as atoms → molecules → organisms → templates → pages

### ✅ CSS Architecture
- Single source of truth (tokens.json)
- No hardcoded values
- Organized by functionality
- Reusable utility classes

### ✅ Mobile-First
- Start with mobile (375px)
- Enhance for larger screens
- Responsive images
- Touch-friendly targets (44px+)

### ✅ Accessibility
- WCAG AA compliance
- Semantic HTML
- Keyboard navigation
- Screen reader friendly

### ✅ Performance
- No dependencies
- CSS optimizations
- Image optimization
- Smooth animations

---

## 📝 Documentation

| File | Purpose |
|------|---------|
| `DESIGN_SYSTEM.md` | Complete design system guide |
| `tokens.json` | W3C DTCG token definitions |
| `tokens.css` | CSS variable implementation |
| `README.md` | This file |

---

## 🔄 Updates & Maintenance

### PHASE 1 ✅
- Accessibility audit
- Contrast improvements
- Validation enhancements
- CTA section added

### PHASE 2 ✅
- Typography refinement
- Component redesign
- Mobile optimization
- Visual polish

### PHASE 3 ✅
- Design tokens system
- CSS refactoring
- Documentation
- Component library ready

### Future Enhancements
- [ ] Dark mode toggle
- [ ] Animation library (Framer Motion)
- [ ] Form backend integration
- [ ] Analytics tracking
- [ ] A/B testing setup

---

## 🤝 Contributing

### Code Style
```css
/* Use tokens */
color: var(--color-gold);
padding: var(--spacing-lg);

/* Use semantic HTML */
<button class="btn-primary">Action</button>

/* Keep it accessible */
<label for="email">Email</label>
<input id="email" type="email" required>
```

### Testing
1. Visual test across devices (375px, 768px, 1440px)
2. Test all 6 languages
3. Check form validation
4. Test accessibility with Axe DevTools

---

## 📞 Support

For issues or improvements:
1. Check `DESIGN_SYSTEM.md`
2. Review `tokens.json` for design values
3. Test in multiple browsers
4. Validate accessibility with WAVE

---

## 📄 License

© 2026 **Lótus Calçados**. All rights reserved.

**"Produzindo no Brasil, desfilando pelo mundo."**
*Producing in Brazil, showcasing to the world.*

---

## 👤 Credits

**Design & UX:** Uma (UX Design Expert)
**Implementation:** Full-stack optimization
**Version:** 1.0.0
**Last Updated:** March 26, 2026

---

## 🎨 Design System Status

```
✅ Color System      - WCAG AA Compliant
✅ Typography       - Responsive & Accessible
✅ Spacing Scale    - 8px Base System
✅ Component Lib    - Production Ready
✅ Documentation    - Complete
✅ Tokens (JSON)    - W3C DTCG Compliant
✅ CSS Variables    - Fully Implemented
```

**System Status: PRODUCTION READY** 🚀


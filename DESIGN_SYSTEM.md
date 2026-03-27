# 🎨 Lótus Calçados — Design System

**Version:** 1.0.0
**Last Updated:** March 26, 2026
**Maintained by:** Uma (UX Design Expert)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Components](#components)
6. [Best Practices](#best-practices)

---

## Overview

The Lótus Calçados Design System is a comprehensive, W3C DTCG-compliant token library that ensures consistency across the brand's digital presence. All values are stored in `tokens.json` and used throughout the codebase.

### Key Principles

- **Accessibility First**: All colors meet WCAG AA standards
- **Scalability**: Tokens are organized hierarchically for easy maintenance
- **Flexibility**: Support for light/dark modes and responsive design
- **Performance**: Optimized with CSS custom properties

---

## Color System

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `color-brand-primary` | `#d4af37` | Primary gold accent |
| `color-brand-primary-light` | `#f5df9a` | Light gold highlights |
| `color-brand-secondary-dark` | `#0f3b28` | Deep green core |
| `color-brand-secondary-light` | `#1f5e42` | Light green accents |

### Neutral Colors

| Token | Value | Usage | Contrast Ratio |
|-------|-------|-------|---|
| `color-neutral-bg` | `#030d09` | Background | N/A |
| `color-neutral-surface` | `#eaedea` | Light surfaces | 18:1 |
| `color-neutral-white` | `#ffffff` | Pure white | 21:1 |
| `color-neutral-text-primary` | `#d0d6d2` | Primary text | **6.5:1** ✓ WCAG AA |
| `color-neutral-text-secondary` | `#a8b4ae` | Secondary text | 4.5:1 |
| `color-neutral-gray-dark` | `#242424` | Dark elements | - |

### Semantic Colors

| Token | Value | Purpose |
|-------|-------|---------|
| `color-semantic-success` | `#27ae60` | Valid, success states |
| `color-semantic-error` | `#e74c3c` | Error, invalid states |
| `color-semantic-warning` | `#f39c12` | Warning, caution states |

---

## Typography

### Font Families

```css
/* Headings */
--font-serif: 'Playfair Display', serif;

/* Body & UI */
--font-sans: 'Inter', sans-serif;
```

### Font Sizes (Responsive)

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 12px | Labels, captions |
| `sm` | 14px | Small text |
| `base` | 16px | Body text |
| `lg` | 18px | Large text |
| `xl` | 20px | Extra large |
| `2xl` | 24px | Heading 3 |
| `3xl` | 28px | Heading 2 |
| `6xl` | 64px | Heading 1 (desktop) |

**Mobile:** Use `clamp()` for automatic scaling:
```css
font-size: clamp(2.2rem, 8vw, 4.5rem);
```

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `light` | 300 | Delicate text |
| `normal` | 400 | Body text |
| `medium` | 500 | UI elements |
| `semibold` | 600 | Subheadings |
| `bold` | 700 | Headings |
| `extra-bold` | 800 | Super bold headings |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `tight` | 1.1 | Headings |
| `normal` | 1.6 | Body text |
| `relaxed` | 1.8 | Descriptions |

---

## Spacing

All spacing values follow an 8px base scale for consistency:

| Token | Pixel | Usage |
|-------|-------|-------|
| `xs` | 4px | Micro-spacing |
| `sm` | 8px | Small gaps |
| `md` | 16px | Default spacing |
| `lg` | 24px | Medium gaps |
| `xl` | 32px | Large gaps |
| `2xl` | 40px | Section spacing |
| `3xl` | 48px | Large sections |
| `4xl` | 64px | Hero sections |
| `5xl` | 80px | Page sections |
| `6xl` | 96px | Major sections |

### Usage Examples

```css
/* Small components */
padding: var(--spacing-md);

/* Section padding */
padding: var(--spacing-5xl) 0;

/* Responsive gaps */
gap: clamp(1rem, 5vw, 3rem);
```

---

## Components

### Button

```css
.btn-primary {
  padding: 1rem 2.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 2px;
  border-radius: 4px;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Variants:**
- `.btn-primary` - Filled gold button
- `.btn-secondary` - Outlined gold button

### Cards

```css
.glass-card-light {
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.15);
  backdrop-filter: blur(12px);
}
```

### Form Inputs

```css
.form-group input,
.form-group textarea {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  border: 1px solid #e0e6e3;
}

/* Validation states */
input.valid {
  border-color: #27ae60;
  background-color: #f1f8f5;
}

input.invalid {
  border-color: #e74c3c;
  background-color: #fff5f5;
}
```

---

## Shadows

| Token | Value | Use Case |
|-------|-------|----------|
| `sm` | `0 2px 8px rgba(0, 0, 0, 0.1)` | Subtle shadows |
| `md` | `0 4px 15px rgba(0, 0, 0, 0.15)` | Default shadows |
| `lg` | `0 10px 30px rgba(0, 0, 0, 0.2)` | Elevated elements |
| `xl` | `0 15px 40px rgba(0, 0, 0, 0.25)` | Modal/overlay shadows |
| `2xl` | `0 20px 50px rgba(0, 0, 0, 0.3)` | Hero shadows |
| `gold-sm` | `0 4px 15px rgba(212, 175, 55, 0.3)` | Gold accent shadows |
| `gold-lg` | `0 20px 50px rgba(212, 175, 55, 0.2)` | Large gold shadows |

---

## Transitions & Animations

### Transition Speeds

| Token | Timing | Usage |
|-------|--------|-------|
| `fast` | 0.3s | Quick feedback |
| `smooth` | 0.6s | Normal interactions |
| `slow` | 1.0s | Entrance animations |

### Easing Functions

```css
/* Cubic Bezier - Web standard */
cubic-bezier(0.16, 1, 0.3, 1)  /* Smooth, natural easing */
cubic-bezier(0.4, 0, 0.2, 1)   /* Fast easing */
```

### Keyframe Animations

```css
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -20px); }
}

@keyframes heroZoom {
  0%, 100% { transform: scale(1.05); }
  50% { transform: scale(1.08); }
}
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | Sharp corners |
| `sm` | 4px | Buttons, small elements |
| `md` | 8px | Form inputs, cards |
| `lg` | 12px | Medium containers |
| `xl` | 16px | Large cards, images |
| `2xl` | 20px | Extra-large containers |
| `full` | 9999px | Circular elements |

---

## Best Practices

### 1. **Always Use Tokens**

✅ **Good:**
```css
color: var(--color-gray);
padding: var(--spacing-lg);
border-radius: var(--border-radius-xl);
```

❌ **Avoid:**
```css
color: #d0d6d2;
padding: 24px;
border-radius: 16px;
```

### 2. **Responsive Design with `clamp()`**

✅ **Good:**
```css
font-size: clamp(1.5rem, 5vw, 3rem);
padding: clamp(1rem, 4vw, 3rem);
gap: clamp(1.5rem, 3vw, 2.5rem);
```

### 3. **Accessibility**

- Always use `color-neutral-text-primary` (#d0d6d2) for body text
- Minimum contrast ratio: **4.5:1** (WCAG AA)
- Text on gold backgrounds: Use dark color (#000 or #0c1d1e)

### 4. **Mobile-First**

```css
/* Mobile first */
padding: var(--spacing-md);
font-size: clamp(1rem, 4vw, 1.5rem);

/* Tablet and up */
@media (min-width: 768px) {
  padding: var(--spacing-lg);
}
```

### 5. **Performance**

- Use `will-change` for animated elements
- Batch transitions with shorthand
- Avoid hardcoded values - use CSS custom properties

---

## Maintenance & Updates

### Adding New Tokens

1. Add to `tokens.json` following W3C DTCG format
2. Document in this file
3. Update CSS with new variable
4. Test across all components

### Versioning

```json
{
  "version": "1.0.0",
  "metadata": {
    "date": "2026-03-26"
  }
}
```

---

## References

- **W3C Design Tokens Format:** https://www.w3.org/community/design-tokens/
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Font Pairing Guide:** https://fonts.google.com/
- **Spacing Scale:** https://www.spacing.io/

---

**Last Updated:** March 26, 2026
**Maintained by:** Uma, UX Design Expert
© 2026 Lótus Calçados. All rights reserved.

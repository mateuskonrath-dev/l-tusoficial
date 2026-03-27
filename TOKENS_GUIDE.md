# 🎨 Design Tokens Usage Guide

**Quick reference for using Lótus Design Tokens in your code**

---

## 📊 Token Structure

All tokens are defined in two places:

1. **`tokens.json`** — W3C DTCG format (source of truth)
2. **`tokens.css`** — CSS variables (used in stylesheets)

```
tokens.json → tokens.css → your-component.css
```

---

## 🎯 How to Use Tokens

### ✅ Good: Use CSS Variables

```css
/* ✅ GOOD */
.card {
  background: var(--color-neutral-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-lg);
  transition: var(--transition-smooth);
}
```

### ❌ Bad: Hardcoded Values

```css
/* ❌ AVOID */
.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.6s cubic-bezier(...);
}
```

---

## 🎨 Common Token Patterns

### Colors

```css
/* Brand colors */
color: var(--color-brand-primary);              /* Gold */
background: var(--color-brand-secondary-dark);  /* Deep Green */

/* Neutral colors */
color: var(--color-neutral-text-primary);       /* WCAG AA text */
background: var(--color-neutral-bg);            /* Dark background */

/* Semantic colors */
color: var(--color-semantic-success);           /* Green for success */
color: var(--color-semantic-error);             /* Red for errors */
```

### Typography

```css
/* Font families */
font-family: var(--font-serif);     /* Playfair Display (headings) */
font-family: var(--font-sans);      /* Inter (body text) */

/* Font sizes - Static */
font-size: var(--font-size-base);   /* 16px */
font-size: var(--font-size-2xl);    /* 24px */

/* Font sizes - Responsive (use clamp) */
font-size: clamp(1.5rem, 5vw, 3rem);

/* Font weights */
font-weight: var(--font-weight-bold);        /* 700 */
font-weight: var(--font-weight-extra-bold);  /* 800 */

/* Line heights */
line-height: var(--line-height-tight);   /* 1.1 (headings) */
line-height: var(--line-height-normal);  /* 1.6 (body) */

/* Letter spacing */
letter-spacing: var(--letter-spacing-wide);       /* 1.5px */
letter-spacing: var(--letter-spacing-extra-wide); /* 2px */
```

### Spacing

```css
/* Fixed spacing */
margin: var(--spacing-md);                /* 16px */
padding: var(--spacing-lg);               /* 24px */
gap: var(--spacing-xl);                   /* 32px */

/* Responsive spacing */
padding: clamp(1rem, 4vw, 3rem);

/* Common patterns */
padding: var(--spacing-lg) var(--spacing-xl);    /* Vertical Horizontal */
margin-top: var(--spacing-2xl);
padding: var(--spacing-md) var(--spacing-lg) var(--spacing-xl) var(--spacing-md);
```

### Border Radius

```css
border-radius: var(--border-radius-sm);   /* 4px (buttons) */
border-radius: var(--border-radius-md);   /* 8px (inputs) */
border-radius: var(--border-radius-xl);   /* 16px (cards) */
border-radius: var(--border-radius-full); /* 9999px (circles) */
```

### Shadows

```css
box-shadow: var(--shadow-sm);           /* Subtle */
box-shadow: var(--shadow-md);           /* Default */
box-shadow: var(--shadow-lg);           /* Elevated */
box-shadow: var(--shadow-xl);           /* Modal */
box-shadow: var(--shadow-gold-lg);      /* Brand highlight */

/* Multiple shadows */
box-shadow:
  var(--shadow-lg),
  var(--shadow-gold-sm);
```

### Transitions

```css
transition: var(--transition-fast);    /* 0.3s */
transition: var(--transition-smooth);  /* 0.6s - default */
transition: var(--transition-slow);    /* 1.0s */

/* Specific properties */
transition: opacity 0.3s, transform 0.3s;

/* Multiple */
transition: var(--transition-smooth), color 0.2s;
```

---

## 🔨 Component Examples

### Button

```css
.btn-primary {
  /* Typography */
  font-family: var(--font-sans);
  font-size: var(--button-primary-font-size);        /* 0.85rem */
  font-weight: var(--button-primary-font-weight);    /* 500 */
  letter-spacing: var(--button-primary-letter-spacing); /* 2px */

  /* Spacing */
  padding: var(--button-primary-padding);  /* 1rem 2.5rem */

  /* Styling */
  background: linear-gradient(135deg,
    var(--color-brand-primary) 0%,
    var(--color-brand-primary-light) 100%);
  color: #000;
  border: none;
  border-radius: var(--button-primary-border-radius);  /* 4px */

  /* Interaction */
  transition: var(--transition-smooth);
  cursor: pointer;

  /* Shadow */
  box-shadow: var(--shadow-gold-sm);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-gold-lg);
}
```

### Card

```css
.glass-card-light {
  /* Spacing */
  padding: var(--card-padding);  /* 2.5rem */

  /* Styling */
  background: rgba(255, 255, 255, 0.85);
  border: var(--card-border);
  border-radius: var(--card-border-radius);  /* 16px */

  /* Effects */
  backdrop-filter: blur(12px);
  box-shadow: var(--card-shadow);

  /* Interaction */
  transition: var(--transition-smooth);
}

.glass-card-light:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}
```

### Form Input

```css
.form-group input {
  /* Spacing */
  padding: var(--input-padding);  /* 0.8rem 1rem */

  /* Typography */
  font-size: var(--input-font-size);  /* 0.95rem */
  font-family: var(--font-sans);

  /* Styling */
  border: var(--input-border);
  border-radius: var(--input-border-radius);  /* 8px */
  background-color: var(--input-bg);

  /* Interaction */
  transition: var(--transition-fast);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-brand-secondary-light);
  box-shadow: var(--shadow-success);
}

.form-group input.valid {
  border-color: var(--color-semantic-success);
  box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
}

.form-group input.invalid {
  border-color: var(--color-semantic-error);
  box-shadow: var(--shadow-error);
}
```

---

## 📱 Responsive Design with Tokens

### Mobile-First Approach

```css
/* Base (mobile) */
:root {
  --section-padding: 3rem 0;
  --card-padding: 2rem;
  --font-size-base: 14px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  :root {
    --section-padding: 5rem 0;
    --card-padding: 2.5rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  :root {
    --section-padding: 6rem 0;
    --card-padding: 3rem;
  }
}
```

### Responsive Typography

```css
/* Always use clamp for fluid scaling */
h1 {
  font-size: clamp(2.2rem, 8vw, 4.5rem);
  line-height: var(--line-height-tight);
  font-weight: var(--font-weight-extra-bold);
}

h2 {
  font-size: clamp(1.8rem, 5vw, 3rem);
  line-height: var(--line-height-tight);
}

p {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}
```

---

## ♿ Accessibility with Tokens

### Color Contrast

```css
/* ✅ WCAG AA Compliant */
color: var(--color-neutral-text-primary);      /* 6.5:1 contrast */

/* ❌ Insufficient contrast */
color: var(--color-neutral-text-secondary);    /* 4.5:1 - use sparingly */
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    /* Remove animations for users who prefer reduced motion */
    --transition-fast: all 0s;
    --transition-smooth: all 0s;
  }
}
```

---

## 🔄 When to Add New Tokens

✅ **Add token if:**
- Value is used 2+ times
- It's a design decision (color, spacing, etc.)
- It might change in the future

❌ **Don't add token if:**
- It's a one-off calculation
- It's component-specific positioning
- It's a magic number for animations

---

## 📊 Token Hierarchy

```
Global Tokens (colors, fonts, spacing)
    ↓
Alias Tokens (convenience variables)
    ↓
Component Tokens (button, card, input)
    ↓
Utility Classes (.text-primary, .shadow-lg)
    ↓
Component Styles (specific implementations)
```

---

## 🛠️ Adding New Tokens

### Step 1: Update `tokens.json`

```json
{
  "color": {
    "new-color": {
      "$value": "#abc123",
      "$description": "Description here",
      "$type": "color"
    }
  }
}
```

### Step 2: Add to `tokens.css`

```css
:root {
  --color-new-color: #abc123;
}
```

### Step 3: Document in `DESIGN_SYSTEM.md`

```markdown
| `color-new-color` | `#abc123` | Use case |
```

### Step 4: Use in Styles

```css
.element {
  color: var(--color-new-color);
}
```

---

## 🚀 Best Practices

### ✅ DO

- ✅ Use CSS variables for all design values
- ✅ Organize tokens by category
- ✅ Document token purposes
- ✅ Use `clamp()` for responsive sizing
- ✅ Test accessibility compliance
- ✅ Keep tokens DRY (Don't Repeat Yourself)

### ❌ DON'T

- ❌ Hardcode colors, spacing, or other values
- ❌ Create conflicting token names
- ❌ Use magic numbers without documentation
- ❌ Skip accessibility considerations
- ❌ Add tokens for single-use values
- ❌ Ignore responsive requirements

---

## 📚 References

- **W3C Design Tokens:** https://www.w3.org/community/design-tokens/
- **CSS Custom Properties:** https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **clamp() Function:** https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
- **WCAG Contrast:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum

---

## 💡 Quick Tips

### Fluid Sizing
```css
/* Scales between min and max */
width: clamp(300px, 90vw, 1200px);
```

### Responsive Spacing
```css
/* Responsive padding */
padding: clamp(1rem, 5%, 3rem);
gap: clamp(1rem, 3vw, 2rem);
```

### Multiple Transitions
```css
transition:
  opacity var(--transition-fast),
  transform var(--transition-smooth),
  background-color var(--transition-fast);
```

---

**Version:** 1.0.0
**Last Updated:** March 26, 2026
**Created by:** Uma (UX Design Expert)


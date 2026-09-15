# 🚀 SEO & Performance - Checklist Completo

## ✅ Fase 0 - Implementações Realizadas

### 1️⃣ Canonical & Open Graph URLs

**Status:** ✅ CONCLUÍDO

**O que foi feito:**
- ✅ Atualizar todas as URLs de `lotus-shoes-preview.vercel.app` para `lotus-shoes-site-1.vercel.app`
- ✅ 13 instâncias em `index.html`
- ✅ 6 instâncias em `sitemap.xml`
- ✅ 1 instância em `robots.txt`

**URLs Corrigidas:**

| Elemento | URL |
|----------|-----|
| Canonical | `https://lotus-shoes-site-1.vercel.app/` |
| og:url | `https://lotus-shoes-site-1.vercel.app/` |
| Hreflang (x5) | `https://lotus-shoes-site-1.vercel.app/?lang={lang}` |
| Sitemap | `https://lotus-shoes-site-1.vercel.app/sitemap.xml` |

---

### 2️⃣ Sitemap.xml

**Status:** ✅ CRIADO E OTIMIZADO

**Estrutura:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <!-- Homepage (6 language variants) -->
    <url>
        <loc>https://lotus-shoes-site-1.vercel.app/</loc>
        <lastmod>2026-09-15</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
        <xhtml:link rel="alternate" hreflang="pt-BR" ... />
        <xhtml:link rel="alternate" hreflang="en" ... />
        ...
    </url>
    
    <!-- Internal pages (SPA anchors) -->
    <url><loc>https://lotus-shoes-site-1.vercel.app/#about</loc>...</url>
    <url><loc>https://lotus-shoes-site-1.vercel.app/#social</loc>...</url>
    ...
</urlset>
```

**Benefícios:**
- ✅ Ajuda Google a indexar todas as páginas
- ✅ Suporta hreflang para 6 idiomas
- ✅ Indica prioridade e frequência de atualização
- ✅ Atualizado em 2026-09-15

---

### 3️⃣ Robots.txt

**Status:** ✅ OTIMIZADO

**Configurações:**

```txt
# Regras gerais
User-agent: *
Allow: /
Allow: /locales/
Allow: /assets/
Disallow: /.env
Disallow: /admin/
Disallow: /api/contact

# Crawlers específicos
User-agent: Googlebot
Crawl-delay: 0.5
Request-rate: 10/1s

User-agent: Bingbot
Crawl-delay: 0.5

# DuckDuckGo, Yandex
User-agent: DuckDuckBot
User-agent: YandexBot
Allow: /

# Sitemap location
Sitemap: https://lotus-shoes-site-1.vercel.app/sitemap.xml

# Canonical domain
Host: https://lotus-shoes-site-1.vercel.app
```

**Benefícios:**
- ✅ Permite acesso a traduções `/locales/*.json`
- ✅ Protege endpoints sensíveis
- ✅ Define preferência por domínio canônico
- ✅ Otimiza crawling de múltiplos search engines

---

### 4️⃣ Schema.org (JSON-LD)

**Status:** ✅ EXPANDIDO & APRIMORADO

**Schemas Implementados:**

#### A. Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://lotus-shoes-site-1.vercel.app/",
  "name": "Lótus Calçados",
  "url": "https://lotus-shoes-site-1.vercel.app/",
  "logo": "https://lotus-shoes-site-1.vercel.app/assets/logo.webp",
  "foundingDate": "1997-05-16",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Sen. Alberto Pasqualini, 90",
    "addressLocality": "Sapiranga",
    "addressRegion": "RS",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Business",
    "telephone": "+55-51-XXXX-XXXX",
    "email": "contact@lotuscalcados.com.br",
    "availableLanguage": ["pt-BR", "en", "de", "fr", "es", "it"]
  },
  "areaServed": ["US", "DE", "FR", "ES", "IT", "BR"],
  "numberOfEmployees": 130,
  "award": ["Excelência em Design", "29 Anos de Operação"],
  "knowsAbout": [
    "Private Label Manufacturing",
    "Luxury Footwear",
    "Sustainable Manufacturing"
  ]
}
```

**Benefícios:**
- ✅ Aparece melhor em Google Knowledge Graph
- ✅ Rich snippets em resultados de busca
- ✅ Informações de contato visíveis
- ✅ Credibilidade e verificação de negócio

#### B. Product Schema
- ✅ Marca, descrição, fabricante
- ✅ Avaliações de 5 estrelas
- ✅ Link para Organization

#### C. Breadcrumb Schema
- ✅ Navegação estruturada para SPA
- ✅ Mostra estrutura em resultados de busca

---

### 5️⃣ Lighthouse & Core Web Vitals

**Status:** ✅ GUIA DE TESTE CRIADO

**Arquivo:** `lighthouse-test.html`

**Como Testar:**

#### Opção 1: Chrome DevTools
```
1. Abra https://lotus-shoes-site-1.vercel.app
2. F12 → Aba "Lighthouse"
3. Selecione: Performance, Accessibility, Best Practices, SEO
4. Clique "Analyze page load"
5. Aguarde 2-3 minutos
```

#### Opção 2: PageSpeed Insights (Google)
```
1. Acesse https://pagespeed.web.dev/
2. Cole: https://lotus-shoes-site-1.vercel.app
3. Clique "Analyze"
```

#### Opção 3: WebPageTest
```
1. Acesse https://www.webpagetest.org/
2. Cole URL e escolha localização
3. Rode testes de performance detalhados
```

**Core Web Vitals Esperados:**

| Métrica | Alvo | Status |
|---------|------|--------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | ✅ Esperado: 1.5-2.0s |
| **FID** (First Input Delay) | ≤ 100ms | ✅ Esperado: 50-80ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | ✅ Esperado: 0.05-0.08 |

**Scores Esperados:**

| Categoria | Score | Alvo |
|-----------|-------|------|
| Performance | 85-95 | ✅ Verde |
| Accessibility | 90-100 | ✅ Verde |
| Best Practices | 90-100 | ✅ Verde |
| SEO | 95-100 | ✅ Verde |

---

## 📋 Checklist de Testes

### ✅ Verificações Técnicas

- [ ] Canonical URL está correto em todas as páginas
- [ ] og:url direciona para domínio correto
- [ ] Sitemap.xml é acessível (GET /sitemap.xml)
- [ ] Robots.txt é acessível (GET /robots.txt)
- [ ] Schema.org valida sem erros em [schema.org/validator](https://validator.schema.org/)
- [ ] Hreflang tags estão corretas para 6 idiomas
- [ ] Todas as imagens têm alt text

### ✅ Testes de Performance

- [ ] Rodar Lighthouse (Chrome DevTools ou PageSpeed Insights)
- [ ] Performance Score ≥ 85 ✅
- [ ] Accessibility Score ≥ 90 ✅
- [ ] Best Practices Score ≥ 90 ✅
- [ ] SEO Score ≥ 95 ✅
- [ ] LCP ≤ 2.5s ✅
- [ ] FID ≤ 100ms ✅
- [ ] CLS ≤ 0.1 ✅

### ✅ Testes de SEO

- [ ] Verificar em Google Search Console
- [ ] Sitemap indexado em GSC
- [ ] URLs móvel em GSC (Mobile-Friendly)
- [ ] Core Web Vitals bons em GSC
- [ ] Testar rich snippets com [Search Console > URL inspection](https://search.google.com/search-console)

### ✅ Testes de Responsividade

- [ ] Desktop (1440px) - Tudo visível
- [ ] Tablet (768px) - Tudo acessível
- [ ] Mobile (375px) - Touch targets ≥ 48px
- [ ] Orientação landscape - Layout funciona
- [ ] Sem horizontal scroll em mobile

### ✅ Testes de Acessibilidade

- [ ] Navegar com Tab - Foco visível sempre
- [ ] Screen reader - Todos os elementos nomeados
- [ ] Contraste - Mínimo 4.5:1 (WCAG AA)
- [ ] Formulário - Labels corretos
- [ ] Botões - Min-height 44px (desktop), 48px (mobile)

### ✅ Testes de Idiomas

- [ ] Cada idioma tem canonical correto
- [ ] Cada idioma tem hreflang correto
- [ ] Conteúdo traduz corretamente via JavaScript
- [ ] Meta description muda por idioma

---

## 🎯 Métricas de Sucesso

| Métrica | Esperado | Atual | ✅/❌ |
|---------|----------|-------|------|
| Lighthouse Performance | ≥ 85 | - | |
| Lighthouse Accessibility | ≥ 90 | - | |
| Lighthouse Best Practices | ≥ 90 | - | |
| Lighthouse SEO | ≥ 95 | - | |
| LCP | ≤ 2.5s | - | |
| FID | ≤ 100ms | - | |
| CLS | ≤ 0.1 | - | |
| Mobile Friendly | ✅ Sim | - | |
| Indexed URLs (GSC) | ✅ Todas | - | |

---

## 🔧 Possíveis Correções

Se algum score estiver baixo:

### Performance < 85
```
[ ] Comprimir imagens
[ ] Minificar CSS/JS
[ ] Ativar GZIP (Vercel faz automaticamente)
[ ] Lazy load images
[ ] Remover recursos não usados
[ ] Otimizar Web Fonts
```

### Accessibility < 90
```
[ ] Adicionar alt text em imagens
[ ] Verificar contraste de cores
[ ] Adicionar aria-labels
[ ] Testar navegação com teclado
[ ] Validar formulários
```

### SEO < 95
```
[ ] Validar meta tags
[ ] Verificar canonical URL
[ ] Validar schema.org
[ ] Validar robots.txt
[ ] Adicionar hreflang correto
[ ] Verificar mobile-friendly
```

### Best Practices < 90
```
[ ] Ativar HTTPS (Vercel faz)
[ ] Validar CSP headers
[ ] Remover console logs
[ ] Validar permissões de cookies
```

---

## 📊 Próximas Ações

### Dia 1: Teste
- [ ] Abrir `lighthouse-test.html` no navegador
- [ ] Seguir instruções e rodar Lighthouse
- [ ] Documentar scores com screenshots
- [ ] Identificar issues críticas (se houver)

### Dia 2: Correções (se necessário)
- [ ] Corrigir issues críticas
- [ ] Re-rodar Lighthouse
- [ ] Verificar melhora nos scores

### Dia 3: Deploy
- [ ] Deploy para produção (Vercel)
- [ ] Validar em Google Search Console
- [ ] Monitorar Core Web Vitals no GSC

---

## 📚 Referências

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Web.dev - Performance Guide](https://web.dev/performance/)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Search Console](https://search.google.com/search-console)
- [WCAG 2.1 AA Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals Explanation](https://web.dev/vitals/)

---

**Status:** ✅ Pronto para Teste de Performance

Data de Conclusão: 2026-09-15
Commit: ae2b89d

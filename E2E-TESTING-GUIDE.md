# 🧪 E2E Testing Guide - Lótus Calçados

## Visão Geral

Este guia fornece testes ponta a ponta (E2E) para validar funcionalidade completa do site:
- ✅ Formulário de contato (sanitização, validação, envio)
- ✅ Todos os 6 idiomas (PT, EN, DE, FR, ES, IT)
- ✅ Todos os links do menu
- ✅ Responsividade (desktop, tablet, mobile)
- ✅ Segurança (XSS, injeção)

---

## 1️⃣ Testes do Formulário

### 1.1 Validação de Campos Obrigatórios

**Teste 1.1.1: Campo Nome Vazio**
```
1. Abra o site: https://lotus-shoes-site-1.vercel.app
2. Role até seção "Contato"
3. Deixe "Nome" vazio
4. Clique em outro campo (blur)
5. ✅ Esperado: Campo fica vermelho (classe .invalid)
6. ✅ Clique "Enviar" → Mensagem de erro aparece
```

**Teste 1.1.2: Email Inválido**
```
1. Campo Email
2. Digite: "email-invalido" (sem @domain.com)
3. Clique em outro campo
4. ✅ Esperado: Campo fica vermelho
5. ✅ Clique "Enviar" → Erro de validação
```

**Teste 1.1.3: Email Válido**
```
1. Digite: "contact@example.com"
2. Clique em outro campo
3. ✅ Esperado: Campo fica verde (classe .valid)
4. ✅ Valida sem erro
```

**Teste 1.1.4: Continente Vazio**
```
1. Deixe dropdown "Continente" vazio
2. Tente enviar
3. ✅ Esperado: Erro de validação
4. ✅ Select fica vermelho
```

**Teste 1.1.5: Todos os Campos Preenchidos**
```
1. Nome: "João Silva"
2. Empresa: "Tech Company Ltda"
3. Email: "joao@example.com"
4. Continente: "America"
5. País: "Brazil"
6. Mensagem: "Gostaria de parceria"
7. Clique "Enviar"
8. ✅ Esperado: Mensagem "Mensagem enviada com sucesso!"
9. ✅ Esperado: Formulário limpo
10. ✅ Esperado: Sem erros no console (F12)
```

### 1.2 Testes de Segurança (XSS Prevention)

**Teste 1.2.1: XSS no Campo Nome**
```
Payload: <script>alert('XSS')</script>

1. Digite no campo "Nome": <script>alert('XSS')</script>
2. Tente enviar
3. ✅ Esperado: Nenhum alert aparece
4. ✅ Esperado: Payload é sanitizado (removido)
5. ✅ Console (F12): Log mostra "[vazio]" ou truncado
```

**Teste 1.2.2: XSS com Event Handler**
```
Payload: <img src=x onerror=alert('XSS')>

1. Digite no campo "Mensagem": <img src=x onerror=alert('XSS')>
2. Tente enviar
3. ✅ Esperado: Nenhum alert
4. ✅ Esperado: Payload removido
```

**Teste 1.2.3: Javascript Protocol**
```
Payload: javascript:alert('XSS')

1. Digite no campo "Email": javascript:alert('XSS')
2. Clique em outro campo
3. ✅ Esperado: Fica inválido (não é email)
4. ✅ Esperado: javascript: é removido
```

**Teste 1.2.4: HTML Entity Encoding**
```
Payload: &lt;script&gt;alert('XSS')&lt;/script&gt;

1. Digite: &lt;script&gt;alert('XSS')&lt;/script&gt;
2. Envie
3. ✅ Esperado: HTML entities são decodificadas e depois re-sanitizadas
4. ✅ Esperado: Nenhuma execução de código
```

**Teste 1.2.5: SQL Injection Attempt** (Frontend only)
```
Payload: '; DROP TABLE users; --

1. Digite no campo "Nome": '; DROP TABLE users; --
2. Tente enviar
3. ✅ Esperado: Sanitizado e enviado como texto
4. ✅ Nota: Em produção, backend deve usar prepared statements
```

### 1.3 Testes de Rate Limiting

**Teste 1.3.1: Múltiplos Envios Rápidos**
```
1. Preencha o formulário corretamente
2. Clique "Enviar"
3. Imediatamente, clique "Enviar" novamente
4. ✅ Esperado: Segunda tentativa mostra erro:
   "Por favor, aguarde antes de enviar novamente"
5. ✅ Esperado: Aguarde 2 segundos
6. ✅ Pode enviar novamente após cooldown
```

### 1.4 Testes de Limites de Caracteres

**Teste 1.4.1: Nome com Muitos Caracteres**
```
1. Digite 200 caracteres no campo "Nome"
2. ✅ Esperado: Máximo de 100 caracteres é respeitado
3. ✅ Esperado: Validação passa
```

**Teste 1.4.2: Mensagem com 5000+ Caracteres**
```
1. Digite 10000 caracteres no campo "Mensagem"
2. ✅ Esperado: Máximo de 5000 caracteres é respeitado
3. ✅ Esperado: Ainda valida corretamente
```

---

## 2️⃣ Testes de Idiomas

### 2.1 Teste de Cada Idioma

**Para cada idioma (PT, EN, DE, FR, ES, IT):**

```
1. Clique no ícone do globo (canto superior direito)
2. Selecione idioma: {IDIOMA}
3. ✅ Esperado: Label do botão muda para código do idioma (PT, EN, DE, etc)
4. Verifique os seguintes textos:

   Português (PT):
   - Hero Title: "Elegância em cada passo. Sustentabilidade em cada detalhe."
   - Section: "Responsabilidade Social" 
   - Button: "Descubra a Lótus"
   - Form: "Nome", "Empresa", "Continente", "País", "E-mail", "Mensagem"
   - Button: "ENVIAR MENSAGEM"

   English (EN):
   - Hero Title: "Elegance in every step. Sustainability in every detail."
   - Section: "Social Responsibility"
   - Button: "Discover Lótus"
   - Form: "Name", "Company", "Continent", "Country", "Email", "Message"
   - Button: "SEND MESSAGE"

   Deutsch (DE):
   - Hero Title: "Eleganz bei jedem Schritt. Nachhaltigkeit in jedem Detail."
   - Section: "Soziale Verantwortung"
   - Button: "Entdecken Sie Lótus"
   - Form: "Name", "Unternehmen", "Kontinent", "Land", "E-Mail", "Nachricht"
   - Button: "NACHRICHT SENDEN"

   Français (FR):
   - Hero Title: "Élégance à chaque pas. Durabilité dans chaque détail."
   - Section: "Responsabilité Sociale"
   - Button: "Découvrez Lótus"
   - Form: "Nom", "Entreprise", "Continent", "Pays", "E-mail", "Message"
   - Button: "ENVOYER"

   Español (ES):
   - Hero Title: "Elegancia en cada paso. Sostenibilidad en cada detalle."
   - Section: "Responsabilidad Social"
   - Button: "Descubra Lótus"
   - Form: "Nombre", "Empresa", "Continente", "País", "Correo", "Mensaje"
   - Button: "ENVIAR MENSAJE"

   Italiano (IT):
   - Hero Title: "Eleganza ad ogni passo. Sostenibilità in ogni dettaglio."
   - Section: "Responsabilità Sociale"
   - Button: "Scopri Lótus"
   - Form: "Nome", "Azienda", "Continente", "Paese", "Email", "Messaggio"
   - Button: "INVIA MESSAGGIO"

5. Verifique dropdown de continentes:
   - Português: "Ásia", "Europa", "América", "África", "Oceania"
   - English: "Asia", "Europe", "America", "Africa", "Oceania"
   - [Cada idioma deve ter traduções corretas]

6. ✅ Esperado: localStorage salva idioma
   - Abra DevTools (F12)
   - Console: localStorage.getItem('lotus-lang')
   - ✅ Retorna: "pt", "en", "de", "fr", "es", ou "it"

7. ✅ Esperado: Recarregar página (F5) mantém idioma
   - ✅ Página carrega no idioma salvo
```

### 2.2 Teste de Formulário em Cada Idioma

```
1. Selecione idioma: EN (English)
2. Preencha formulário com:
   - Name: "Test User"
   - Company: "Test Company"
   - Email: "test@example.com"
   - Continent: "America"
   - Country: "United States"
   - Message: "Testing multilingual form"
3. Clique "SEND MESSAGE"
4. ✅ Esperado: "Message sent successfully!" (em inglês)
5. ✅ Formulário limpa

[Repetir para: DE, FR, ES, IT]
```

---

## 3️⃣ Testes de Links do Menu

### 3.1 Links de Navegação Principal

**Teste 3.1.1: Home (Logo/LÓTUS)**
```
1. Clique no logo "LÓTUS" no canto superior esquerdo
2. ✅ Esperado: Página rola para o topo (hero section)
```

**Teste 3.1.2: Menu - Home**
```
1. Clique no link "Home" no menu
2. ✅ Esperado: Rola para hero section (#home)
3. ✅ Esperado: Link fica "active" (underline dourado)
```

**Teste 3.1.3: Menu - About (Global)**
```
1. Clique no link "About" (ou "Sobre") no menu
2. ✅ Esperado: Rola para seção "Excelência Global"
3. ✅ Esperado: Vê cards com 400 pares/dia, 100% exportação, 1997
4. ✅ Esperado: Link fica "active"
```

**Teste 3.1.4: Menu - Social**
```
1. Clique no link "Social" no menu
2. ✅ Esperado: Rola para seção "Responsabilidade Social"
3. ✅ Esperado: Vê 2 cards (Bem-estar da Equipe, Apoio à Comunidade)
4. ✅ Esperado: Link fica "active"
```

**Teste 3.1.5: Menu - Sustainability**
```
1. Clique no link "Sustainability" (ou "Sustentabilidade") no menu
2. ✅ Esperado: Rola para seção "O Futuro é Renovável"
3. ✅ Esperado: Vê 3 cards (Energia Limpa, Zero Desperdício, Alta Eficiência)
4. ✅ Esperado: Link fica "active"
```

**Teste 3.1.6: Menu - Contact**
```
1. Clique no link "Contact" no menu
2. ✅ Esperado: Rola para seção "Contato"
3. ✅ Esperado: Formulário visível
4. ✅ Esperado: Link fica "active"
```

### 3.2 Links CTA (Call-to-Action)

**Teste 3.2.1: Hero CTA Button**
```
1. Clique no botão "Descubra a Lótus" (no hero)
2. ✅ Esperado: Rola para seção "About" (#about)
3. ✅ Esperado: Botão tem efeito hover (levanta + sombra)
```

**Teste 3.2.2: CTA Section Buttons**
```
1. Role até seção "Pronto para uma Parceria Exclusiva?"
2. Clique em "Solicitar Catálogo"
3. ✅ Esperado: Rola para formulário de contato
4. Volte e clique em "Agendar Ligação"
5. ✅ Esperado: Também rola para formulário
```

### 3.3 Links Internos de Seções (Scroll Interno)

**Teste 3.3.1: Scroll Ativa Links Corretamente**
```
1. Faça scroll lento pela página
2. ✅ Esperado: Links do menu ficam "active" conforme você passa por cada seção
   - Ao passar por Home → "Home" fica active
   - Ao passar por About → "About" fica active
   - Ao passar por Social → "Social" fica active
   - Etc.
```

---

## 4️⃣ Testes de Responsividade

### 4.1 Desktop (1440px+)

```
1. Abra site em monitor desktop ou janela grande
2. ✅ Logo visível
3. ✅ Menu completo (todos links visíveis)
4. ✅ Seletor de idioma visível
5. ✅ Hamburger menu NÃO deve aparecer
6. ✅ Botões ≥ 44px (fácil clicar)
7. ✅ Formulário com 2 colunas (nome/empresa lado a lado)
8. ✅ Sem horizontal scroll
```

### 4.2 Tablet (768px)

```
1. Abra DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Defina para 768x1024 (iPad)
4. ✅ Menu adaptado (hamburguer pode aparecer)
5. ✅ Botões ≥ 44px
6. ✅ Formulário com 1 coluna
7. ✅ Texto legível
8. ✅ Imagens adaptadas
9. ✅ Sem horizontal scroll
```

### 4.3 Mobile (375px)

```
1. DevTools → 375x667 (iPhone SE)
2. ✅ Hamburguer menu aparece
3. ✅ Clique hamburguer → Menu abre
4. ✅ Clique link → Menu fecha
5. ✅ Botões ≥ 48px (toque fácil)
6. ✅ Campos forma ≥ 48px
7. ✅ Font size ≥ 16px (sem zoom automático)
8. ✅ Sem horizontal scroll
9. ✅ Imagens responsivas (não saem do viewport)
```

### 4.4 Orientação Landscape

```
1. DevTools → 667x375 (landscape)
2. ✅ Layout funciona
3. ✅ Menu acessível
4. ✅ Botões visíveis
5. ✅ Sem horizontal scroll
```

---

## 5️⃣ Testes de Performance & Segurança

### 5.1 Segurança

- [ ] Rodar Lighthouse (F12 → Lighthouse → Analyze)
- [ ] Security score ≥ 90 ✅
- [ ] Nenhuma "insecure JavaScript" warning
- [ ] Console limpo (F12 → Console) sem erros

### 5.2 Performance

- [ ] Lighthouse Performance ≥ 85 ✅
- [ ] LCP ≤ 2.5s ✅
- [ ] FID ≤ 100ms ✅
- [ ] CLS ≤ 0.1 ✅

---

## 🧪 Checklist de Testes Completo

### Formulário
- [ ] Validação nome (obrigatório)
- [ ] Validação email (formato correto)
- [ ] Validação continente (dropdown válido)
- [ ] Validação país (dropdown válido)
- [ ] Enviabilidade (todos campos preenchidos)
- [ ] XSS Prevention (<script>, onerror, etc)
- [ ] SQL Injection Attempt ('; DROP TABLE)
- [ ] HTML Entity Encoding (&lt;script&gt;)
- [ ] Rate Limiting (2 segundo cooldown)
- [ ] Campo nome max 100 chars
- [ ] Campo mensagem max 5000 chars
- [ ] Console sem erros

### Idiomas
- [ ] Português (PT) - Todos textos traduzidos
- [ ] English (EN) - Todos textos traduzidos
- [ ] Deutsch (DE) - Todos textos traduzidos
- [ ] Français (FR) - Todos textos traduzidos
- [ ] Español (ES) - Todos textos traduzidos
- [ ] Italiano (IT) - Todos textos traduzidos
- [ ] Hreflang correto para cada idioma
- [ ] localStorage mantém idioma após reload

### Links de Menu
- [ ] Logo/Home (vai para hero)
- [ ] Home link (vai para hero)
- [ ] About link (vai para about section)
- [ ] Social link (vai para social section)
- [ ] Sustainability link (vai para sustainability section)
- [ ] Contact link (vai para contact form)
- [ ] Links ficam "active" ao scrollar
- [ ] CTA buttons (Descubra, Solicitar, Agendar)

### Responsividade
- [ ] Desktop (1440px+) - Tudo funciona
- [ ] Tablet (768px) - Tudo funciona
- [ ] Mobile (375px) - Tudo funciona
- [ ] Hamburguer menu em mobile
- [ ] Botões ≥ 44px (desktop), ≥ 48px (mobile)
- [ ] Sem horizontal scroll em nenhum viewport
- [ ] Formulário se adapta

### Performance
- [ ] Lighthouse Score ≥ 85
- [ ] LCP ≤ 2.5s
- [ ] FID ≤ 100ms
- [ ] CLS ≤ 0.1
- [ ] Console sem erros críticos
- [ ] Imagens carregam rápido

---

## 📊 Relatório de Testes

Após completar todos os testes, preencha este relatório:

```
DATA: [DATA]
NAVEGADOR: [Chrome/Firefox/Safari/Edge]
DEVICE: [Desktop/Tablet/Mobile]
VIEWPORT: [1440px / 768px / 375px]

✅ PASSOU
- Teste X: Descrito o resultado positivo
- Teste Y: Descrito o resultado positivo

⚠️ VERIFICADO COM CUIDADO
- Teste Z: Alguma observação

❌ FALHOU
- Teste W: Descrição do problema encontrado
  - Ação necessária: [correção necessária]
```

---

## 🚀 Próximas Ações

1. ✅ Completar checklist
2. 📝 Documentar resultados
3. 🔧 Corrigir qualquer issue encontrada
4. 🚀 Deploy para produção (Vercel)
5. 📊 Rodar Lighthouse final
6. ✅ Monitorar Core Web Vitals

---

**Status:** ✅ Pronto para Testes E2E

Data de Criação: 2026-09-15

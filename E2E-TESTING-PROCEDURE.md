# 🧪 Procedimento de Testes E2E - Lótus Calçados

Documento prático e passo-a-passo para executar testes de ponta a ponta. Siga cada seção exatamente como descrito.

## ⚠️ Pré-requisitos

- [ ] Email no seu recebimento pronto para verificar
- [ ] Abra DevTools: F12 → Aba **Console** (para ver logs)
- [ ] Navegador atualizado (Chrome, Firefox, Edge)
- [ ] 3 idiomas diferentes abertos em abas (para testar mudança de idioma)

---

## 🔐 TESTE 1: Validação de Segurança (Sanitização)

### 1.1 - Tentativa de XSS no campo Nome

**Procedimento:**

1. Vá para https://lotus-shoes-site-1.vercel.app
2. Clique no link **Contato** ou role até o formulário
3. No campo **Nome**, copie e cole:
   ```
   <script>alert('XSS')</script>
   ```
4. Clique fora do campo (blur)
5. **Verificação esperada:**
   - ✅ Campo fica com classe `.valid` (borda verde)
   - ✅ Nenhum alerta JS aparece
   - ✅ No DevTools → Console, veja: `📧 Formulário sanitizado...`
   - ✅ Log mostra nome como vazio ou truncado, não o script

**Se falhar:** 
- ❌ Alerta aparecer = FALHA DE SEGURANÇA
- Anote a falha para reportar

### 1.2 - Tentativa de XSS com atributo onclick

**Procedimento:**

1. No campo **Empresa**, copie e cole:
   ```
   <img src=x onerror="alert('XSS')">
   ```
2. Clique fora do campo
3. **Verificação esperada:**
   - ✅ Campo fica com classe `.valid`
   - ✅ Nenhum alerta JS aparece
   - ✅ No Console, não há erros de segurança

### 1.3 - Tentativa de SQL Injection

**Procedimento:**

1. No campo **Mensagem**, copie e cole:
   ```
   '; DROP TABLE contacts; --
   ```
2. Clique em **Enviar Mensagem**
3. **Verificação esperada:**
   - ✅ Formulário trata como texto normal
   - ✅ Nenhum comando SQL é executado
   - ✅ Email chega com o texto sanitizado

### 1.4 - Limite de Caracteres

**Procedimento:**

1. No campo **Nome**, escreva 150 caracteres (ex: copiando "a" muitas vezes)
2. Clique fora
3. **Verificação esperada:**
   - ✅ Campo fica `.valid` com apenas 100 primeiros chars
   - ✅ No Log, aparece: `name: "aaaaaa..."`

---

## 📧 TESTE 2: Envio de Email Real

### 2.1 - Envio Simples

**Procedimento:**

1. Vá para https://lotus-shoes-site-1.vercel.app
2. Role até **Formulário de Contato**
3. Preencha os campos:
   - **Nome:** Seu nome real
   - **Email:** SEU EMAIL REAL (é importante, será o reply-to)
   - **Empresa:** (opcional) Seu nome de empresa
   - **Continente:** América do Norte (ou outro)
   - **País:** Brasil (ou outro)
   - **Mensagem:** "Teste de email - 2026-09-15"

4. Clique **Enviar Mensagem**

5. **Verificações:**
   - ✅ Botão muda para "Enviando..." por 1-2 segundos
   - ✅ Notificação verde aparece: "Mensagem enviada com sucesso!"
   - ✅ Formulário é resetado (campos ficam vazios)
   - ✅ No DevTools Console: `✅ Email enviado com sucesso: {id: '...'}`

6. **Verificar Email:**
   - Aguarde 1-2 minutos
   - Verifique sua caixa de entrada
   - **Email que você deve receber:**
     - Remetente: `Lótus Calçados <onboarding@resend.dev>`
     - Assunto: `✅ Recebemos sua mensagem - Lótus Calçados`
     - Conteúdo: Mensagem de confirmação
   
   - **Email que você enviou:**
     - Vai para: contact@lotuscalcados.com.br
     - Será confirmado quando empresa verificar Resend

7. **Se falhar:**
   - ❌ Erro "Erro ao enviar mensagem" = verifique SETUP-EMAIL.md
   - ❌ Email não chega = verificar spam, ou RESEND_API_KEY não configurada

### 2.2 - Envio com Dados Completos

**Procedimento:**

Repita 2.1 com dados mais realistas:
- Nome: "João Silva"
- Email: seu-email@example.com
- Empresa: "Silva Consultoria"
- Continente: "Europa"
- País: "Alemanha"
- Mensagem: "Gostaria de conhecer a qualidade dos seus calçados para minha loja em Berlim."

**Verificação:** Mesmo procedimento de 2.1

### 2.3 - Rate Limiting (Proteção contra spam)

**Procedimento:**

1. Envie um formulário (siga 2.1)
2. **Imediatamente** (dentro de 1 segundo) tente enviar outro
3. **Verificação esperada:**
   - ✅ Notificação de erro aparece
   - ✅ Mensagem: "Por favor, aguarde antes de enviar novamente"
   - ✅ Segundo envio é bloqueado

4. Aguarde 2 segundos
5. Tente enviar novamente
6. **Verificação:** Deve funcionar normalmente

---

## 🌍 TESTE 3: Multilíngue (6 Idiomas)

### 3.1 - Mudar Idioma via Dropdown

**Procedimento:**

Para cada idioma (PT, EN, DE, FR, ES, IT):

1. Clique no botão de idioma (canto superior direito)
2. Selecione idioma da lista
3. **Verificações:**
   - ✅ Página inteira muda de idioma
   - ✅ Título da página muda
   - ✅ Menu muda
   - ✅ Seções mudam
   - ✅ Formulário muda rótulos
   - ✅ No DevTools Console: `✅ Language changed to: {lang}`
   - ✅ localStorage mostra: `lotus-lang = pt/en/de/fr/es/it`

### 3.2 - Verificar Texto Exato por Idioma

**Procedure por idioma:**

#### 🇧🇷 Português (PT)

Deve aparecer:
- [ ] "Elegância em cada passo" (hero)
- [ ] "Quem Somos" (menu)
- [ ] "Sobre Nós" (seção)
- [ ] "Sustentabilidade" (menu)
- [ ] "Por Que Escolher Lótus" (seção)
- [ ] Campo continente: "Selecione um continente"

#### 🇺🇸 Inglês (EN)

Deve aparecer:
- [ ] "Elegance in every step" (hero)
- [ ] "About" (menu)
- [ ] "Sustainability" (menu)
- [ ] "Why Choose Lotus" (seção)

#### 🇩🇪 Alemão (DE)

Deve aparecer:
- [ ] "Eleganz in jedem Schritt" (hero)
- [ ] "Nachhaltigkeit" (menu)
- [ ] "Warum Lotus wählen" (seção)

#### 🇫🇷 Francês (FR)

Deve aparecer:
- [ ] "Élégance à chaque pas" (hero)
- [ ] "Durabilité" (menu)
- [ ] "Pourquoi Choisir Lotus" (seção)

#### 🇪🇸 Espanhol (ES)

Deve aparecer:
- [ ] "Elegancia en cada paso" (hero)
- [ ] "Sostenibilidad" (menu)
- [ ] "Por Qué Elegir Lotus" (seção)

#### 🇮🇹 Italiano (IT)

Deve aparecer:
- [ ] "Eleganza ad ogni passo" (hero)
- [ ] "Sostenibilità" (menu)
- [ ] "Perché Scegliere Lotus" (seção)

### 3.3 - Teste do Dropdown de Continentes

**Procedimento:**

1. Mude para cada idioma
2. No formulário, abra o dropdown "Continente"
3. **Verificações:**
   - ✅ Em português: "América do Norte", "Europa", "Ásia", etc.
   - ✅ Em inglês: "North America", "Europe", "Asia", etc.
   - ✅ Não há "Brasil" (foi removido conforme solicitado)
   - ✅ A primeira opção mostra: "Selecione um continente" (ou equivalente)
   - ✅ Ao selecionar, o texto muda para o continente selecionado

---

## 🔗 TESTE 4: Links e Navegação

### 4.1 - Links do Menu (Desktop)

**Procedimento - para cada link do menu:**

1. Clique em **Home** (logo)
   - ✅ Página scrolls até hero
   - ✅ Menu item fica `.active`

2. Clique em **Sobre** / **About** / etc.
   - ✅ Página scrolls até seção About
   - ✅ Menu item fica `.active` (sublinhado/destacado)

3. Clique em **Por Que Escolher** / **Why Choose** / etc.
   - ✅ Página scrolls até essa seção
   - ✅ Menu item fica `.active`

4. Clique em **Sustentabilidade** / **Sustainability** / etc.
   - ✅ Página scrolls até essa seção
   - ✅ Menu item fica `.active`

5. Clique em **Contato** / **Contact** / etc.
   - ✅ Página scrolls até formulário
   - ✅ Menu item fica `.active`

### 4.2 - Links do Menu (Mobile)

**Procedimento - com viewport 375px:**

1. Hambúrguer menu aparece ✅
2. Clique no ícone hambúrguer
3. Menu abre com animação
4. Clique em qualquer link
   - ✅ Menu fecha automaticamente
   - ✅ Página scrolls até seção
   - ✅ Link fica `.active`

### 4.3 - Botão CTA (Call-to-Action)

**Procedimento:**

1. Na seção Hero, clique no botão **"Solicite Uma Cotação"** / **"Request a Quote"**
2. **Verificação:**
   - ✅ Página scrolls até seção Contato
   - ✅ Formulário é visível
   - ✅ Campo de Nome tem focus (cursor dentro)

---

## 📱 TESTE 5: Responsividade

### 5.1 - Desktop (1440px+)

**Procedimento:**

1. Abra DevTools (F12)
2. Clique em responsividade (Ctrl+Shift+M)
3. Defina viewport para 1440x900
4. **Verificações:**
   - [ ] Hamburger menu não aparece
   - [ ] Menu horizontal está visível
   - [ ] Botões têm min-height: 44px (check com inspetor)
   - [ ] Inputs têm min-height: 44px
   - [ ] Nenhum horizontal scroll
   - [ ] Imagens carregam rápido (< 2s)
   - [ ] Texto legível

### 5.2 - Tablet (768px)

**Procedimento:**

1. Defina viewport para 768x1024
2. **Verificações:**
   - [ ] Hamburger menu pode aparecer ou não (layout adaptável)
   - [ ] Formulário em 1 coluna
   - [ ] Botões ainda têm 44px
   - [ ] Nenhum horizontal scroll
   - [ ] Cards em 2 colunas (ou adaptativo)

### 5.3 - Mobile (375px)

**Procedimento:**

1. Defina viewport para 375x667
2. **Verificações:**
   - [ ] Hamburger menu aparece
   - [ ] Botões têm min-height: 48px (mobile)
   - [ ] Inputs têm min-height: 48px
   - [ ] Touch targets mínimo 48px (acessibilidade)
   - [ ] Nenhum horizontal scroll
   - [ ] Texto readável (min 16px)
   - [ ] Cards em 1 coluna
   - [ ] Formulário em 1 coluna com campos empilhados

### 5.4 - Orientação Landscape (667x375)

**Procedimento:**

1. Vire dispositivo mobile para landscape
2. **Verificações:**
   - [ ] Layout se adapta
   - [ ] Nenhum horizontal scroll
   - [ ] Botões continuam clicáveis
   - [ ] Menu funciona

---

## ⚡ TESTE 6: Performance e Animações

### 6.1 - Fade-in ao Scroll (Reveal)

**Procedimento:**

1. Abra o site
2. Role a página lentamente
3. **Verificações:**
   - [ ] Seções fade in suavemente
   - [ ] Animação é smooth (não jerky)
   - [ ] Cards do "Por Que Escolher" aparecem com animação
   - [ ] Nenhuma animação stutter

### 6.2 - Hover Effects

**Procedimento (Desktop):**

1. Passe mouse sobre cards da seção "Por Que Escolher Lótus"
2. **Verificações:**
   - [ ] Shadow muda (mais profundo)
   - [ ] Card sobe levemente (scale 1.03)
   - [ ] Borda dourada brilha
   - [ ] Transição é smooth (0.4s)

### 6.3 - Focus States (Acessibilidade)

**Procedimento:**

1. Pressione TAB repetidamente
2. **Verificações:**
   - [ ] Foco é sempre visível (outline/highlight)
   - [ ] Navegação por tab funciona em toda página
   - [ ] Inputs têm visible focus state
   - [ ] Botões têm visible focus state

---

## 🎯 Checklist de Conclusão

Após completar todos os testes:

- [ ] TESTE 1: Validação de Segurança - PASSOU
- [ ] TESTE 2: Email Real - PASSOU (email recebido)
- [ ] TESTE 3: 6 Idiomas - PASSOU
- [ ] TESTE 4: Links e Navegação - PASSOU
- [ ] TESTE 5: Responsividade - PASSOU
- [ ] TESTE 6: Performance - PASSOU

**Se algum falhou:**
1. Anote qual teste
2. Descreva o comportamento esperado vs real
3. Tire screenshot (F12 → Screenshot tool)
4. Reporte com contexto

---

## 📊 Resultados

Após completar: Salve este documento preenchido como `E2E-TEST-RESULTS-{DATA}.md` para registro.

---

**Documento:** Procedimento de Testes E2E  
**Última atualização:** 2026-09-15  
**Pronto para:** Execução imediata

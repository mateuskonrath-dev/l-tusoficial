# 🎨 Como Editar Frases do Site

## ⚡ Forma Mais Simples (Recomendado)

### Passo 1: Edita APENAS o arquivo português
- Abre: `locales/pt.json` no GitHub
- Muda a frase que quiser
- Clica "Commit" (verde)

### Passo 2: Rodas o script de sincronização
Quando o site fizer deploy, roda este comando no seu terminal:

```bash
cd "C:\Users\mateu\projeto claude\lotus-site"
node sync-translations.js
```

### Passo 3: Push
```bash
git add locales/
git commit -m "feat: atualizei as frases do site"
git push
```

### Pronto! ✅
- O script distribui a mudança em PT para TODOS os 6 idiomas automaticamente
- Você só edita UMA VEZ em português
- Os outros idiomas recebem a mesma frase (você edita depois se quiser traduzir diferente)

---

## 📝 Como o Script Funciona

```
VOCÊ edita: locales/pt.json
   ↓
Roda: node sync-translations.js
   ↓
Script lê: "Por Que Escolher Lótus?" (em PT)
   ↓
Script distribui para: en.json, de.json, fr.json, es.json, it.json
   ↓
Todos os 6 arquivos ficam sincronizados
```

---

## 🚀 Workflow Completo (Passo a Passo)

### 1️⃣ Editar no GitHub (mais fácil)
```
https://github.com/mateuskonrath-dev/l-tusoficial/edit/master/locales/pt.json
```

- Procura a frase que quer mudar
- Muda
- Clica "Commit changes" (verde)
- Espera deploy (2-3 min)

### 2️⃣ Sincronizar Localmente (no seu PC)

Abre Terminal/PowerShell e roda:

```bash
cd "C:\Users\mateu\projeto claude\lotus-site"
node sync-translations.js
```

Você vai ver:
```
🔄 Sincronizando traduções...

✅ Master (PT) carregado: 77 chaves

  ⚠️  EN: Nova chave adicionada: hero-title
  ⚠️  DE: Nova chave adicionada: hero-title
  ...
```

### 3️⃣ Fazer Commit

```bash
git add locales/
git commit -m "chore: sincronizei traduções com PT"
git push
```

---

## 📖 Exemplos

### Exemplo 1: Mudar "Por Que Escolher Lótus?"

1. Abre `pt.json` no GitHub
2. Procura por: `"why-lotus-title"`
3. Muda para: `"Por Que Confiar em Lótus?"`
4. Clica "Commit"
5. Roda no terminal: `node sync-translations.js`
6. Pronto! Todos os 6 idiomas recebem a mudança

### Exemplo 2: Adicionar Uma Frase Nova

1. Abre `pt.json`
2. Adiciona uma linha nova:
   ```json
   "new-phrase": "Minha nova frase aqui"
   ```
3. Clica "Commit"
4. Roda: `node sync-translations.js`
5. Pronto! Script distribui para en.json, de.json, etc.

---

## ❓ Perguntas Comuns

**P: E se eu quiser traduzir diferente em Inglês?**
- R: Depois de rodar `sync-translations.js`, edita `en.json` manualmente com a tradução correta.

**P: O script vai apagar minhas traduções?**
- R: Não! Mantém tudo o que já existe. Só adiciona novas chaves do master (PT).

**P: Posso editar direto no en.json, de.json, etc?**
- R: Sim, mas depois roda `sync-translations.js` para sincronizar a estrutura (chaves novas).

**P: Como instalo "node"?**
- R: Já está no seu PC. Só digita no terminal: `node --version`

---

## 🎯 Resumo em 3 passos

1. **Edita:** `locales/pt.json` (uma única vez)
2. **Sincroniza:** `node sync-translations.js` (no terminal)
3. **Pronto:** Todos os 6 idiomas recebem a mudança automaticamente!

Simples assim! ✨

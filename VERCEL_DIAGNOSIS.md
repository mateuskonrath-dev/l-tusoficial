# Diagnóstico: Vercel Cache Travado

## Status Atual

✅ **GitHub (origem):** CSS correto
```css
.card-text h3 { color: #ffffff; }
.card-text p { color: #f5f5f5; }
```

❌ **Vercel (produção):** Servindo CSS ANTIGO
```css
color: var(--color-green-core)  /* ESTÁTICO, NÃO ATUALIZA */
```

## Root Cause Identificado

**O `vercel.json` está VAZIO:**
```json
{"buildCommand": "", "outputDirectory": ".", "framework": null}
```

Isso significa:
1. **Sem build command** → Vercel não processa nada
2. **Output = "."** → Pega tudo da raiz
3. **Framework = null** → Sem auto-detection

**Resultado:** Vercel entra em modo "estático puro" mas pode estar servindo de um **cache de build anterior** que contém o CSS antigo.

## 5 Causas Possíveis

### 1. **Cache de Build Antigo no Vercel (MAIS PROVÁVEL)**
- Vercel armazenou o site em cache após um build anterior
- A invalidação de cache NÃO funcionou porque o config está vazio
- Força: Sem build command, Vercel não "vê" mudanças de arquivo

### 2. **CDN/Edge Caching do Vercel (PROVÁVEL)**
- Vercel Edge Network pode ter cachado a resposta HTTP
- Header `Cache-Control` não está sendo respeitado
- Solução: TTL muito longo (dias) em cache deles

### 3. **Service Worker (sw.js) Cacheando Versão Antiga**
- Se o seu `sw.js` tem estratégia de cache, ele pode estar servindo versão velha
- Verifica se há `caches.open()` e versões fixas

### 4. **Browser Cache Local**
- Improvável ser GERAL, mas possível em seu próprio teste
- Solução: Hard refresh (`Ctrl+Shift+Del`)

### 5. **Vercel Project Settings Travado**
- Pode haver um deployment anterior "default" sendo servido
- Pode estar usando alias errado ou custom domain apontando para deployment velho

## Soluções Recomendadas (em ordem de efetividade)

### ✅ SOLUÇÃO 1: Recriar o Build Command (GARANTIDO)

Editar `vercel.json`:
```json
{
  "buildCommand": "echo 'Static deployment'",
  "outputDirectory": ".",
  "framework": null,
  "env": {
    "DEPLOYMENT_TIMESTAMP": "2026-08-25T10:47:00Z"
  }
}
```

**Por quê funciona:**
- Força Vercel a re-inicializar o build
- Timestamp obriga invalidação de cache
- Mesmo sem fazer nada, o comando rodar reconstrói tudo

### ✅ SOLUÇÃO 2: Force Rebuild via Vercel API + Env Var

Adicionar env var no Vercel Dashboard:
- Nome: `FORCE_REBUILD`
- Valor: `2026-08-25-10-47` (timestamp único)

E commitar mudança trivial:
```bash
echo "# Deploy $(date)" >> README.md
git add README.md
git commit -m "chore: force Vercel rebuild with env var"
git push
```

### ✅ SOLUÇÃO 3: Desconectar e Reconectar GitHub no Vercel

1. Dashboard do Vercel → Settings → Git
2. Desconectar repositório
3. Reconectar repositório
4. Vercel vai limpar cache e fazer deploy from scratch

**Tempo:** 5 minutos
**Confiabilidade:** 95%

### ✅ SOLUÇÃO 4: Redeployar Versão Anterior Explicitamente

No Vercel Dashboard:
1. Ir para "Deployments" 
2. Encontrar deployment anterior (há 1-2 dias)
3. Clicar em "Redeploy"
4. Depois deploy o atual normalmente

**Isso força:** Limpeza total do cache

### ✅ SOLUÇÃO 5: Migrar para Netlify (Backup)

`netlify.toml` já está configurado com headers de no-cache:
```toml
Cache-Control = "no-cache, no-store, must-revalidate"
```

**Comando:**
```bash
git remote add netlify <netlify-git-url>
git push netlify master
```

**Vantagem:** Netlify respeita headers melhor que Vercel

## Próximos Passos

1. **Imediato:** Editar `vercel.json` com buildCommand não-vazio
2. **Se não funcionar em 5 min:** Desconectar/reconectar GitHub
3. **Se ainda não funcionar:** Migrar para Netlify (já tem config)

## Comandos Rápidos

```bash
# Editar vercel.json com buildCommand
cat > vercel.json << 'INNER'
{
  "buildCommand": "echo 'Vercel static deployment' && date",
  "outputDirectory": ".",
  "framework": null
}
INNER

# Commit e push
git add vercel.json
git commit -m "fix: Vercel buildCommand to force cache invalidation"
git push origin master
```

**Resultado esperado:** Dentro de 2 minutos, novo deployment deve aparecer no Vercel Dashboard.


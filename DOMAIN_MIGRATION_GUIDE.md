# 📊 GUIA: Migração de Domínio

## Por Quê Migrar?
- URL atual: `lotus-shoes-site-1.vercel.app` = **genérico, pouco profissional**
- URL desejada: `lotuscalcados.com.br` (ou similar)
- Impacto: Prospects B2B não confiam em domínios alugados/subdomínios

---

## Opção 1: Domínio Próprio Existente (RECOMENDADO)

Se você já tem `lotuscalcados.com.br` ou similar registrado:

### Passo 1: Verificar Registrador
- Onde o domínio está registrado? (Registro.br, NameCheap, GoDaddy, etc)

### Passo 2: Apontar DNS para Vercel
1. Acesse painel do registrador
2. Vá para configuração de DNS
3. Adicione os registros:

**Se using CNAME (mais fácil):**
```
www.lotuscalcados.com.br  CNAME  cname.vercel.app
```

**Se usando A record:**
```
lotuscalcados.com.br  A  76.76.19.194
lotuscalcados.com.br  A  76.76.19.195
```

### Passo 3: Configurar no Vercel
1. Vá para vercel.com/dashboard
2. Selecione projeto "lotus-shoes-site-1"
3. Settings → Domains
4. Clique "Add"
5. Digite: `lotuscalcados.com.br`
6. Siga instruções de verificação

### Passo 4: Redirecionar www
Adicione também redirect de `www.lotuscalcados.com.br` → `lotuscalcados.com.br`

---

## Opção 2: Registrar Novo Domínio

Se precisa registrar um novo domínio:

### Passo 1: Escolher e Registrar
**Recomendados:**
- `lotuscalcados.com` (international)
- `lotuscalcados.com.br` (local)
- `lotusshoes.com` (brand)
- `lotusfootwear.com` (descriptive)

**Onde registrar:**
- Registro.br (para .com.br)
- NameCheap
- GoDaddy  
- Hostinger

### Passo 2-4: Mesmo que Opção 1

---

## Opção 3: Subdomínio Vercel (TEMPORÁRIO)

Se quer solução rápida (não recomendado para lançamento premium):

1. Vercel dashboard → Domains
2. Add: `lotus.vercel.app`
3. Clique Save

**PROBLEMA:** Continua parecendo genérico

---

## SEO & Redirecionamentos

### Após Migração
Se já tem conteúdo no vercel.app, configure 301 redirects:

**Adicione ao `vercel.json`:**
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "destination": "https://lotuscalcados.com.br/:path*",
      "permanent": true
    }
  ]
}
```

---

## Timeline
- **Domínio existente:** 2-4 horas (DNS propagação)
- **Registrar novo:** 24-48 horas (propagação)
- **Verificação Vercel:** instant

---

## Validar Após Migração
1. Acesse `https://lotuscalcados.com.br`
2. Deve carregar o site normalmente
3. Verifique SSL (cadeado verde 🔒)
4. Teste em mobile
5. Verifique com `curl -I https://lotuscalcados.com.br`

---

## Support
- Vercel Docs: https://vercel.com/docs/projects/domains/add-a-domain
- Registro.br: https://registro.br/

---

**Deadline Sugerido:** Fazer ANTES de lançamento público premium

# 📧 Configuração de Email - Lótus Calçados

## Visão Geral

O site utiliza **Resend** para enviar emails do formulário de contato. O Resend é um serviço moderno de email otimizado para Vercel.

## Passos para Ativar Email

### 1️⃣ Criar Conta Resend

1. Acesse https://resend.com
2. Faça login ou crie uma conta gratuita
3. Após login, vá para **API Tokens**
4. Clique em **+ New Token**
5. Dê um nome (ex: "Lotus Calcados Production")
6. Copie a chave gerada (começa com `re_`)

### 2️⃣ Configurar no Vercel (Produção)

1. Acesse https://vercel.com/dashboard
2. Selecione o projeto **lotus-site**
3. Vá em **Settings** → **Environment Variables**
4. Adicione novo environment variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx` (cole a chave do Resend)
   - **Environments:** Selecione **Production** (e **Preview** se desejar testar antes)
5. Clique **Save**

5. Opcionalmente, configure também:
   - **Name:** `CONTACT_EMAIL`
   - **Value:** `seu-email@lotuscalcados.com.br`
   - **Environments:** Production

### 3️⃣ Deploy

1. Faça push para a branch production:
   ```bash
   git push origin main
   ```

2. Vercel detectará o push e fará deploy automático
3. Aguarde a build terminar (2-3 min)
4. Teste o formulário no site ao vivo

## ✅ Teste do Email

### No Desenvolvimento Local

Se quiser testar localmente com arquivo `.env`:

1. Crie `.env.local` na raiz do projeto:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   CONTACT_EMAIL=seu-email@test.com
   ```

2. Execute o servidor local:
   ```bash
   npm run dev
   ```

3. Abra http://localhost:3000
4. Preencha o formulário e envie
5. Verifique seu email

### Na Produção

1. Acesse https://lotus-shoes-site-1.vercel.app
2. Preencha o formulário de contato
3. Envie
4. Verifique seu email (pode levar 1-2 minutos)

## 🔍 Troubleshooting

### "Erro ao enviar mensagem"

**Problema:** Aparece mensagem de erro ao submeter

**Solução:**
1. Abra DevTools (F12) → Console
2. Verifique a mensagem de erro
3. Certifique-se que `RESEND_API_KEY` está configurada no Vercel
4. Verifique se a chave começa com `re_`

### Email não chega

**Problema:** Formulário enviado com sucesso mas não recebe email

**Solução:**
1. Verifique se o email está na pasta de spam
2. Confirme o email de destino em `CONTACT_EMAIL`
3. No Resend dashboard, verifique "Recent Emails" para status
4. Se estiver em "Sandbox mode", adicione email verificado no Resend

### "502 Bad Gateway"

**Problema:** Erro 502 ao submeter formulário

**Solução:**
1. Aguarde 2-3 minutos (Vercel pode estar ainda deployando)
2. Faça refresh (Ctrl+Shift+R)
3. Verifique o deployment status no Vercel dashboard

## 📋 Variáveis de Ambiente

| Variável | Obrigatória? | Padrão | Descrição |
|----------|-------------|--------|-----------|
| `RESEND_API_KEY` | ✅ SIM | — | Chave de API do Resend |
| `CONTACT_EMAIL` | ❌ NÃO | `contact@lotuscalcados.com.br` | Email destinatário |
| `NODE_ENV` | ❌ NÃO | `production` | Ambiente (production/development) |

## 📞 Suporte

- **Resend Docs:** https://resend.com/docs
- **Resend Status:** https://status.resend.com
- **Vercel Docs:** https://vercel.com/docs

---

**Status:** ✅ Pronto para usar  
**Último Update:** 2026-09-15

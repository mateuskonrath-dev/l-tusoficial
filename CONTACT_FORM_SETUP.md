# 📧 Configuração do Formulário de Contato

O formulário de contato agora está **funcional** e pronto para enviar emails! Aqui estão os passos para ativar completamente:

## ✅ Passo 1: Criar Conta no Resend

**Resend** é um serviço de email moderno que funciona perfeito com Vercel.

1. Acesse: **https://resend.com**
2. Clique em **"Sign up"** (ou **"Get started"**)
3. Crie uma conta com seu email
4. Confirme seu email via link enviado
5. Você receberá automaticamente uma **API Key** de teste

**Nota sobre domínio personalizado:**
- Por enquanto, no modo sandbox, os emails serão enviados com `onboarding@resend.dev` (sem custo)
- Para usar seu próprio domínio (`noreply@lotuscalcados.com`), você precisa verificar o domínio (pago/premium)

## ✅ Passo 2: Adicionar API Key no Vercel

1. Acesse: **https://vercel.com/dashboard**
2. Clique no seu projeto **"lotus-shoes-site-1"** (ou qual estiver usando)
3. Vá para **Settings** → **Environment Variables**
4. Clique em **"Add New"** e preencha:
   - **Name:** `RESEND_API_KEY`
   - **Value:** (cole aqui a API Key do Resend)
   - **Select environments:** Marque ✓ Production, Preview, Development
5. Clique em **"Save"**

## ✅ Passo 3: Verificar Funcionamento

1. Acesse seu site: **https://lotus-shoes-site-1.vercel.app** (ou seu domínio)
2. Vá para a seção **"Contact Information"**
3. Preencha o formulário com seus dados
4. Clique em **"Send Message"** ✉️
5. Você deve ver uma mensagem: ✅ **Obrigado! Sua mensagem foi enviada com sucesso**

## 📬 Onde Receberá os Emails

Os emails de contato serão enviados para: **`contact@lotuscalcados.com.br`**

Se quiser mudar, edite o arquivo `/api/contact.js` e procure por:
```javascript
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'contact@lotuscalcados.com.br';
```

## 🔐 Segurança & Funcionalidades

✅ **Validação de email** - Apenas emails válidos são aceitos  
✅ **Campos obrigatórios** - Nome, email, país e mensagem  
✅ **Proteção contra spam** - Validação no frontend e backend  
✅ **Auto-reply** - Remetente recebe confirmação automaticamente  
✅ **Feedback visual** - Mensagens de sucesso/erro para o usuário

## 🚀 Próximas Etapas: Ativar o Site na Internet

### Opção 1: Usar Domínio Próprio (Recomendado)

Se você tem um domínio como `lotuscalcados.com.br`:

1. Acesse **https://vercel.com/dashboard**
2. Clique no projeto → **Settings** → **Domains**
3. Clique em **"Add"** e digite seu domínio
4. Siga as instruções para adicionar registros DNS no seu provedor

### Opção 2: Usar Domínio Gratuito do Vercel

Já está funcionando em: `lotus-shoes-site-1.vercel.app`

### Opção 3: Usar Subdomínio do Vercel

1. Em **Settings** → **Domains**
2. Clique em **"Add"** e use: `lotus-shoes.vercel.app` (se disponível)

## 📊 Monitorar Emails Enviados

Acesse **https://resend.com/emails** para ver histórico de:
- ✅ Emails entregues
- 📧 Conteúdo enviado
- ❌ Erros de envio

## ⚠️ Limitações Atuais (Modo Sandbox)

- Emails saem de `onboarding@resend.dev` (não personalizado)
- Limite: ~100 emails/dia (gratuito)
- Para domínio personalizado, precisa de conta paga

## ✨ Customizações Disponíveis

Você pode editar:

1. **Email que recebe as mensagens:** `/api/contact.js` (linha ~15)
2. **Template do email:** `/api/contact.js` (linhas 60-120)
3. **Validações:** `/api/contact.js` (linhas 25-45)
4. **Mensagens de erro/sucesso:** `/index.html` (busque por "Obrigado")

---

## 📞 Próximas Melhorias

- [ ] Integração com CRM (Notion, Airtable)
- [ ] Webhooks para notificações em tempo real
- [ ] Limite de rate-limiting para spam
- [ ] Anexos de arquivo
- [ ] Tradução de emails (PT-BR, EN, ES)

---

**Dúvidas?** Consulte a documentação do Resend: https://resend.com/docs

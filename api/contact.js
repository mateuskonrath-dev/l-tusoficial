/**
 * Vercel Function: POST /api/contact
 * Processa formulário de contato e envia email
 *
 * Requisitos:
 * - RESEND_API_KEY configurada em Vercel Environment Variables
 * - npm package: resend
 */

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Email que receberá as mensagens
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'contact@lotuscalcados.com.br';

module.exports = async (req, res) => {
  // Apenas POST é permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, company, country, message } = req.body;

    // Validação básica
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Nome, email e mensagem são obrigatórios'
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido'
      });
    }

    // Template HTML do email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
            .header { background: #0f3b28; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #0f3b28; }
            .field-value { margin-top: 5px; padding: 10px; background: #f5f5f5; border-left: 3px solid #ffe6a3; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🪷 Novo Contato - Lótus Calçados</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Nome:</div>
                <div class="field-value">${escapeHtml(name)}</div>
              </div>

              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
              </div>

              ${company ? `
              <div class="field">
                <div class="field-label">Empresa:</div>
                <div class="field-value">${escapeHtml(company)}</div>
              </div>
              ` : ''}

              ${country ? `
              <div class="field">
                <div class="field-label">País:</div>
                <div class="field-value">${escapeHtml(country)}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="field-label">Mensagem:</div>
                <div class="field-value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
              </div>

              <div class="footer">
                <p>✅ Esta mensagem foi enviada automaticamente pelo formulário de contato do site Lótus Calçados</p>
                <p>🔗 Para responder, use o email do remetente: ${escapeHtml(email)}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email com Resend
    const result = await resend.emails.send({
      from: 'Lótus Calçados <onboarding@resend.dev>', // Resend sandbox - substituir após verificação
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `🪷 Novo contato de ${name}`,
      html: htmlContent,
    });

    // Enviar confirmação para o remetente (opcional)
    await resend.emails.send({
      from: 'Lótus Calçados <onboarding@resend.dev>',
      to: email,
      subject: '✅ Recebemos sua mensagem - Lótus Calçados',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Obrigado por entrar em contato!</h2>
              <p>Olá <strong>${escapeHtml(name)}</strong>,</p>
              <p>Recebemos sua mensagem com sucesso. Nossa equipe analisará seus dados e retornará em breve.</p>
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                🪷 Lótus Calçados | Fabricante de calçados femininos de luxo<br>
                contato@lotuscalcados.com.br
              </p>
            </div>
          </body>
        </html>
      `,
    }).catch(() => {}); // Ignorar erros de confirmação

    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
      id: result.id
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({
      error: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Escapa HTML para evitar injeção de código
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

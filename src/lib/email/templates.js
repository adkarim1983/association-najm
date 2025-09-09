// Email templates for different notifications

export const getEmailTemplate = (type, data, language = 'fr') => {
  const templates = {
    // Admin notification when new contact is received
    adminNotification: {
      fr: {
        subject: `[Association Najm] Nouveau message de contact - ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Association Najm</h1>
              <p style="margin: 5px 0 0 0;">Nouveau message de contact</p>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; margin-top: 0;">Détails du message</h2>
              
              <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <p><strong>Nom:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ''}
                <p><strong>Sujet:</strong> ${data.subject}</p>
                <p><strong>Catégorie:</strong> ${data.category || 'Général'}</p>
                <p><strong>Date:</strong> ${new Date(data.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric', month: 'long', day: 'numeric', 
                  hour: '2-digit', minute: '2-digit'
                })}</p>
              </div>
              
              <div style="background: white; padding: 15px; border-radius: 5px;">
                <h3 style="margin-top: 0; color: #333;">Message:</h3>
                <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/contacts/${data._id}" 
                   style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Voir dans l'admin
                </a>
              </div>
            </div>
            
            <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
              <p>Association Najm - Système de gestion des contacts</p>
              <p>Cet email a été généré automatiquement.</p>
            </div>
          </div>
        `
      },
      en: {
        subject: `[Association Najm] New contact message - ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Association Najm</h1>
              <p style="margin: 5px 0 0 0;">New contact message</p>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; margin-top: 0;">Message Details</h2>
              
              <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Category:</strong> ${data.category || 'General'}</p>
                <p><strong>Date:</strong> ${new Date(data.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric', 
                  hour: '2-digit', minute: '2-digit'
                })}</p>
              </div>
              
              <div style="background: white; padding: 15px; border-radius: 5px;">
                <h3 style="margin-top: 0; color: #333;">Message:</h3>
                <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/contacts/${data._id}" 
                   style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View in Admin
                </a>
              </div>
            </div>
            
            <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
              <p>Association Najm - Contact Management System</p>
              <p>This email was generated automatically.</p>
            </div>
          </div>
        `
      }
    },

    // Auto-reply to user who sent contact form
    userConfirmation: {
      fr: {
        subject: 'Confirmation de réception - Association Najm',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Association Najm</h1>
              <p style="margin: 5px 0 0 0;">Confirmation de réception</p>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; margin-top: 0;">Bonjour ${data.name},</h2>
              
              <p>Nous avons bien reçu votre message concernant "<strong>${data.subject}</strong>" et nous vous remercions de nous avoir contactés.</p>
              
              <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Récapitulatif de votre message:</h3>
                <p><strong>Sujet:</strong> ${data.subject}</p>
                <p><strong>Date d'envoi:</strong> ${new Date(data.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric', month: 'long', day: 'numeric', 
                  hour: '2-digit', minute: '2-digit'
                })}</p>
              </div>
              
              <p>Notre équipe examine votre demande et vous répondra dans les plus brefs délais, généralement sous 48 heures ouvrables.</p>
              
              <p>Si votre demande est urgente, n'hésitez pas à nous contacter directement par téléphone.</p>
              
              <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1976d2;">Informations de contact</h3>
                <p><strong>Email:</strong> contact@associationnajm.ma</p>
                <p><strong>Téléphone:</strong> +212 5XX XX XX XX</p>
                <p><strong>Adresse:</strong> [Adresse de l'association]</p>
              </div>
            </div>
            
            <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
              <p>Association Najm - Accompagnement et développement</p>
              <p>Cet email de confirmation a été généré automatiquement.</p>
            </div>
          </div>
        `
      },
      en: {
        subject: 'Message received - Association Najm',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Association Najm</h1>
              <p style="margin: 5px 0 0 0;">Message Confirmation</p>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; margin-top: 0;">Hello ${data.name},</h2>
              
              <p>We have received your message regarding "<strong>${data.subject}</strong>" and thank you for contacting us.</p>
              
              <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Message Summary:</h3>
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Sent on:</strong> ${new Date(data.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric', 
                  hour: '2-digit', minute: '2-digit'
                })}</p>
              </div>
              
              <p>Our team is reviewing your request and will respond as soon as possible, typically within 48 business hours.</p>
              
              <p>If your request is urgent, please don't hesitate to contact us directly by phone.</p>
              
              <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1976d2;">Contact Information</h3>
                <p><strong>Email:</strong> contact@associationnajm.ma</p>
                <p><strong>Phone:</strong> +212 5XX XX XX XX</p>
                <p><strong>Address:</strong> [Association Address]</p>
              </div>
            </div>
            
            <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
              <p>Association Najm - Support and Development</p>
              <p>This confirmation email was generated automatically.</p>
            </div>
          </div>
        `
      }
    },

    // Welcome email for new users
    welcomeUser: {
      fr: {
        subject: 'Bienvenue dans Association Najm !',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Bienvenue chez Association Najm !</h1>
              <p style="margin: 5px 0 0 0;">Votre compte a été créé avec succès</p>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
              <h2 style="color: #333; margin-top: 0;">Bonjour ${data.firstName} ${data.lastName},</h2>
              
              <p>Nous sommes ravis de vous accueillir dans la communauté Association Najm !</p>
              
              <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Informations de votre compte:</h3>
                <p><strong>Nom d'utilisateur:</strong> ${data.username}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Date de création:</strong> ${new Date(data.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
              
              <p>Vous pouvez maintenant accéder à votre espace personnel et découvrir tous nos projets.</p>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" 
                   style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Se connecter
                </a>
              </div>
            </div>
            
            <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
              <p>Association Najm - Accompagnement et développement</p>
            </div>
          </div>
        `
      }
    }
  };

  return templates[type][language] || templates[type]['fr'];
};

export default { getEmailTemplate };

import { sendEmail } from './config.js';
import { getEmailTemplate } from './templates.js';

// Send contact notification to admin
export const sendContactNotification = async (contactData) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  
  if (!adminEmail) {
    console.log('📧 Admin email not configured for contact notifications');
    return { success: false, message: 'Admin email not configured' };
  }

  const template = getEmailTemplate('adminNotification', contactData, 'fr');
  return await sendEmail(adminEmail, template.subject, template.html);
};

// Send confirmation email to user
export const sendUserConfirmation = async (contactData) => {
  const template = getEmailTemplate('userConfirmation', contactData, contactData.language || 'fr');
  return await sendEmail(contactData.email, template.subject, template.html);
};

// Send welcome email to new user
export const sendWelcomeEmail = async (userData) => {
  const template = getEmailTemplate('welcomeUser', userData, 'fr');
  return await sendEmail(userData.email, template.subject, template.html);
};

// Send password reset email
export const sendPasswordResetEmail = async (userData, resetToken) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const template = {
    subject: 'Réinitialisation de votre mot de passe - Association Najm',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Association Najm</h1>
          <p style="margin: 5px 0 0 0;">Réinitialisation de mot de passe</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333; margin-top: 0;">Bonjour ${userData.firstName},</h2>
          
          <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Réinitialiser mon mot de passe
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Ce lien est valide pendant 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
          </p>
          
          <p style="color: #666; font-size: 12px; word-break: break-all;">
            Lien direct : ${resetUrl}
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p>Association Najm - Sécurité du compte</p>
        </div>
      </div>
    `
  };
  
  return await sendEmail(userData.email, template.subject, template.html);
};

export default {
  sendContactNotification,
  sendUserConfirmation,
  sendWelcomeEmail,
  sendPasswordResetEmail
};

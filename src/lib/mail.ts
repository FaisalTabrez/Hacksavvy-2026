import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ SMTP Connection Success');
  } catch (error) {
    console.error('❌ SMTP Connection Failed:', error);
  }
};

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  try {
    console.log(`📨 Attempting to send email to: ${to}`);
    
    // Verify connection before sending (optional but good for debugging)
    // await verifyConnection(); 

    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent successfully: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`❌ Nodemailer Error: ${error.message}`);
    // We throw so the caller knows it failed
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

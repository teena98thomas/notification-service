import * as nodemailer from 'nodemailer';
import { Transporter, SendMailOptions } from 'nodemailer';
import { SESClient } from '@aws-sdk/client-ses';
import { config } from 'dotenv';

config();

export class EmailService {
  private transporter: Transporter;

  constructor() {
    const sesClient = new SESClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_AWS,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
      }, // Change 'default' if using a different profile
  });

  this.transporter = nodemailer.createTransport({
    SES: { ses: sesClient, aws: require('@aws-sdk/client-ses') },
});
  }

  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}

// export const emailService = new EmailService();

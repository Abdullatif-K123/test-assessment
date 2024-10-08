import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abdullatif.khayat123@gmail.com', // Your email
        pass: '00000000', // Your email password
      },
    });
  }

  async sendGeolocationEmail(
    email: string,
    geolocation: { latitude: number; longitude: number },
  ) {
    const mailOptions = {
      from: 'Abdullatif.khayat123@gmail.com',
      to: email,
      subject: 'Geolocation Data',
      text: `The geolocation for your address is Latitude: ${geolocation.latitude}, Longitude: ${geolocation.longitude}`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

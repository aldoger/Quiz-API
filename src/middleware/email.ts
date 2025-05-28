import nodemailer from 'nodemailer';

interface MailBody {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const sendingMail = async ({ from, to, subject, text }: MailBody) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email Sent Successfully');
    console.log(info);
    return info;
  } catch (e) {
    console.error('Error cannot send email:', e);
    throw e; 
  }
};

export default sendingMail;

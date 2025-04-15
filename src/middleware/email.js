import nodemailer from 'nodemailer'

const sendingMail = async ({from, to, subject, text}) => {

    try{
        
        let mailOptions = ({
            from,
            to,
            subject,
            text
        });

        console.log(process.env.EMAIL_NAME, process.env.EMAIL_PASSWORD);

        const transporter = nodemailer.createTransport({
            host: `smtp.gmail.com`,
            port: 587,
            secure: false,
            service: "gmail",
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        return await transporter.sendMail(mailOptions, function(error, info){
            if (error) throw Error(error);
            console.log('Email Sent Successfully');
            console.log(info);
        });
    }catch(e){
        console.error("Error cannot send email");
    }
}

export default sendingMail;
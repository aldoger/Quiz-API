import nodemailer from 'nodemailer'

const sendingMail = async ({from, to, subject, text}) => {

    try{
        
        let mailOptions = ({
            from,
            to,
            subject,
            text
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        return await transporter.sendMail(mailOptions);
    }catch(e){
        console.error("Error cannot send emaio");
    }
}

export default sendingMail;
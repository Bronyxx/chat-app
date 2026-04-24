import {resendClient,sender} from "../lib/resend.js"
import {emailtemplate} from "../email/emailTemplates.js"

export const sendWelcomeEmail= async (email,name, clientURL)=>{
    const{data,error} = await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject: "Welcome to chat app",
        html:emailtemplate(name,clientURL),
    });

    if(error){
        console.error("error sending welcome",error);
        throw new Error("failed to send welcome email"); 
    }
    console.log("welcome email sent succesfully ",data)
};
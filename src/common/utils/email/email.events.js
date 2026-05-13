
import { sendEmail } from "./send.email.js";
import { emailTemplate } from "./email.template.js"; 
import { emailEnum } from "../../enum/user.enum.js";
import { EventEmitter } from "node:events";

export const eventEmitter = new EventEmitter();
eventEmitter.on(emailEnum.confirmEmail, async (email, otp) => {
    await sendEmail({
        to: email,
        subject: "Confirm Your Email - Saraha App",
        html: emailTemplate(otp) 
    });
});
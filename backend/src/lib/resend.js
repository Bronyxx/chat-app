import {Resend} from "resend";
import "dotenv/config";


export const resendClient = new Resend(process.env.RESENd_API_KEY)
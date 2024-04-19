import { supabase } from "@/lib/utils";
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

import * as jwt from "jsonwebtoken";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const { email } = await req.json();

    if(!email) 
        return new Response(JSON.stringify({msg : 'Please provide a email'}, { status: 401 }));

    
    const otp = Math.floor(100000 + Math.random() * 900000);

    const token = jwt.sign({ email, otp }, process.env.JWT_KEY, { expiresIn: '1h' });

    await supabase.rpc('insert_into_otp_table', { email:email, otp: otp });
    
    try {
      const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Construction Key',
        react: EmailTemplate({ otp }),
      });
  
      return Response.json(JSON.stringify({token}));
    } catch (error) {
      return Response.json({ error });
    }
}


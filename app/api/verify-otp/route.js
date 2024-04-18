
import * as jwt from "jsonwebtoken";
import { supabase } from "@/lib/utils";
import { stringify } from "postcss";
import { Network } from "lucide-react";

export async function POST(req) {


    let token = req.headers.get('authorization');

    if(!token) return new Response(JSON.stringify({message: 'Token Missing'}), {status: 403});
    
    token = token.split(' ')[1];

    const { otp } = await req.json();

    try{
    
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        console.log(decoded)
    

        const {data, error} = await supabase.from('otp').select('*').eq('email', decoded?.email)
        
        if(error || otp != decoded.otp || otp != data[0].otp) 
            return new Response(JSON.stringify({message : 'Otp not matched'}), { status: 403})
        console.log(data[0].otp);

        const newToken = jwt.sign({ email: decoded?.email }, process.env.JWT_KEY, { expiresIn: '5h' });

        await supabase.rpc('insert_into_user_table', {email: decoded?.email, token: newToken});

        return new Response(JSON.stringify({token: newToken}), { status: 201 })

    }
    catch(error) {
        return new Response(JSON.stringify({ message: "token expired" }), {status: 401});
    }

}
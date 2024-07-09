import * as jwt from "jsonwebtoken";
import { supabase } from "@/lib/utils";
import { connectDB } from "../../../dbConfig/dbConfig";
import otpModel from "../../../models/otp";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {


    let token = req.headers.get('authorization');

    if(!token) return new Response(JSON.stringify({message: 'Token Missing'}), {status: 403});
    
    token = token.split(' ')[1];

    const { otp } = await req.json();

    try{
        console.log("writing before db Connect")
        await connectDB();

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        console.log("decoded token", decoded)
    

        // const {data, error} = await supabase.from('otp').select('*').eq('email', decoded?.email)

        const otpRecord = await otpModel.findOne({ email: decoded?.email });
        
        // if(error || otp != decoded.otp || otp != data[0].otp) 
        //     return new Response(JSON.stringify({message : 'Otp not matched'}), { status: 403})
        
        if (!otpRecord || otp !== decoded.otp || otp !== otpRecord.otp) {
            return new Response(JSON.stringify({ message: 'Otp not matched' }), { status: 403 });
        }
        const newToken = jwt.sign({ email: decoded?.email }, process.env.JWT_KEY, { expiresIn: '5h' });
        // await supabase.rpc('insert_into_user_table', {email: decoded?.email, token: newToken});
   
        const user = await UserModel.findOne({email: decoded?.email});
        if(!user){
            return NextResponse.json({
                msg: "No user found with this email in verifying the otp",
                status: 404,
            })
        }
        await UserModel.updateOne(
            { email: decoded?.email },
            { email: decoded?.email, token: newToken },
            { upsert: true }
        );

        return new Response(JSON.stringify({token: newToken}), { status: 201 })

    }
    catch(error) {

        return new Response(JSON.stringify({ message: "token expired" }), {status: 401});
    }

}
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from '@supabase/supabase-js'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export const generateOTP = function() {
  const otpLength = 6;
  let otp = '';
  for (let i = 0; i < otpLength; i++) {
      otp += Math.floor(Math.random() * 10); 
  }
  return otp;
}


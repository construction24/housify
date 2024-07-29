import { NextResponse } from 'next/server';
import { verifyAdminCredentials } from '@/lib/verifyAdminCredentials';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    console.log("admin email and password", email, password);

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    const isValidAdmin = await verifyAdminCredentials(email, password);

    if (isValidAdmin) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
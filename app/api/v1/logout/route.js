import { NextResponse } from 'next/server';

export async function POST(req) {
  const response = new NextResponse(
    JSON.stringify({ message: 'Logged out' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );

  // Clear the idToken cookie
  response.cookies.set('idToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
    maxAge: -1, // Expires immediately
  });

  return response;
}
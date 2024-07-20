import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_KEY || ''; 

// Helper function to clear the token
function clearTokenCookie() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
    maxAge: -1, // Expires immediately
  };
}

// Helper function to handle unauthorized responses
function unauthorizedResponse() {
  return new NextResponse(
    JSON.stringify({ message: 'Unauthorized' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
}

// Helper function to handle authorized responses
function authorizedResponse() {
  return new NextResponse(
    JSON.stringify({ message: 'Authorized' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function verifyToken(req) {
  const { cookies } = req;
  const idToken = cookies.get('idToken')?.value;

  console.log('Received Cookies:', cookies); // Debugging line
  console.log('ID Token:', idToken); // Debugging line

  if (!idToken) {
    console.warn('ID Token is missing or not found.'); // Logging warning
    return unauthorizedResponse();
  }

  try {
    console.log('Verifying JWT token...'); // Debugging line
    jwt.verify(idToken, JWT_SECRET);
    console.log('JWT token verified successfully.'); // Debugging line
    return authorizedResponse(); 
  } catch (error) {
    console.error('JWT Verification Error:', error.message); // Logging error
    console.error('Error Stack Trace:', error.stack); // Logging stack trace

    const response = unauthorizedResponse();
    response.cookies.set('idToken', '', clearTokenCookie());
    
    return response;
  }
}

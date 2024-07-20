import { verifyToken } from '@/middlewares/verifyToken.middleware';

export async function GET(req) {
  const response = await verifyToken(req);
  return response;
}

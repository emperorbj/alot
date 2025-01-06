

// backend/api/auth/verify-email.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connect } from '@/dbConfig/DbConfig';

interface DecodedToken {
  id: string;
}

export async function GET(req: Request): Promise<Response> {
  await connect();

  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: 'Email already verified' }, { status: 400 });
    }

    user.isVerified = true;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }
}

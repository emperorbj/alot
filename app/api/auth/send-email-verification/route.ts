// backend/api/auth/send-email-verification.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import sendEmail from '@/lib/sendEmail';
import { connect } from '@/dbConfig/DbConfig';

interface SendEmailRequestBody {
  email: string;
}

export async function POST(req: Request): Promise<Response> {
  await connect();

  const { email }: SendEmailRequestBody = await req.json();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  if (user.isVerified) {
    return NextResponse.json({ message: 'Email already verified' }, { status: 400 });
  }

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  // Email content
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const subject = 'Verify Your Email';
  const html = `<p>Click the link below to verify your email:</p><a href="${verificationUrl}">Verify Email</a>`;

  await sendEmail(user.email, subject, html);

  return NextResponse.json({ message: 'Verification email sent' });
}

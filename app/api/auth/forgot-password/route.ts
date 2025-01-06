import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import crypto from 'crypto';
import User from '@/models/User';
import sendEmail from '@/lib/sendEmail';
import {connect} from '@/dbConfig/DbConfig';

export async function POST(req: Request) {
    try {
        logger.log('User attempted to log in.');
        // Your API logic...
      
  await connect();

  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  await sendEmail(user.email, 'Reset Password', `Your reset token is: ${resetToken}`);

  return NextResponse.json({ message: 'Password reset email sent.' });
} catch (error) {
    logger.error(`Error in login API: ${error.message}`);
    throw error;
  }
}

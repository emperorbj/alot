import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import sendVerificationEmail from '@/lib/sendEmail';
import {connect} from "@/dbConfig/DbConfig"
// import { logger } from '@/lib/logger';

export async function POST(req: Request) {

  await connect();

  const { fullName, email, password } = await req.json();

    // Validate required fields
    if (!fullName || !email || !password) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
      }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const newUser = await User.create({ fullName, email, password: hashedPassword });

  // Send verification email
  await sendVerificationEmail(newUser);

  return NextResponse.json({ message: 'User registered. Please verify your email.',userId: newUser._id }, { status: 201 });
// } catch (error) {
//     logger.error(`Error in login API: ${error.message}`);
//     throw error;
//   }
}

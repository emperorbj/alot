// 
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connect } from '@/dbConfig/DbConfig';

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connect();

    console.log("I GOT TO THE BACKEND")
    // Parse the request body
    const { email, password } = await req.json();
    console.log(email,password)

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Check if the email is verified
    if (!user.isVerified) {
      return NextResponse.json({ message: 'Please verify your email first.' }, { status: 403 });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Default to 1 hour if not set
    );

    // Return the token and success message
    return NextResponse.json({ token, message: 'Login successful.' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'An error occurred. Please try again later.' }, { status: 500 });
  }
}

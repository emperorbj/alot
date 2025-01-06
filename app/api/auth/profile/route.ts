import { authMiddleware } from '@/middleware/authMiddleware';
import User from '@/models/User';
import {connect} from '@/dbConfig/DbConfig';
import { NextResponse } from 'next/server';


export const GET = authMiddleware(async (req: any) => {
  await connect();

  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
});

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authorized, no token' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    await dbConnect();
    
    // Get user without password
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Not authorized, token failed' },
      { status: 401 }
    );
  }
}

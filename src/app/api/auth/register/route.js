import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/middleware/auth';

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();
    
    await dbConnect();

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    const token = generateToken(user._id);

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

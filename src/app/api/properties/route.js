import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to authenticate user
async function authenticateUser(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return await User.findById(decoded.id);
  } catch (error) {
    return null;
  }
}

// Get all properties
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const propertyType = searchParams.get('propertyType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    
    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (propertyType) query.propertyType = propertyType;
    if (city) query['address.city'] = { $regex: city, $options: 'i' };
    if (state) query['address.state'] = { $regex: state, $options: 'i' };
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const properties = await Property.find(query)
      .populate('realtor', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// Create a new property
export async function POST(request) {
  try {
    const user = await authenticateUser(request);
    
    if (!user || (user.role !== 'realtor' && user.role !== 'admin')) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to create properties' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const propertyData = await request.json();
    
    // Add the realtor ID
    propertyData.realtor = user._id;
    
    const property = await Property.create(propertyData);
    
    return NextResponse.json(
      { success: true, data: property },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

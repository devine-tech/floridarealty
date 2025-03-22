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

// Get single property
export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const property = await Property.findById(params.id).populate('realtor', 'name email');
    
    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// Update property
export async function PUT(request, { params }) {
  try {
    const user = await authenticateUser(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    let property = await Property.findById(params.id);
    
    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }
    
    // Make sure user is property realtor or admin
    if (property.realtor.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Not authorized to update this property' },
        { status: 403 }
      );
    }
    
    const updateData = await request.json();
    
    property = await Property.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('realtor', 'name email');
    
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

// Delete property
export async function DELETE(request, { params }) {
  try {
    const user = await authenticateUser(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const property = await Property.findById(params.id);
    
    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }
    
    // Make sure user is property realtor or admin
    if (property.realtor.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Not authorized to delete this property' },
        { status: 403 }
      );
    }
    
    await property.deleteOne();
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server Error' },
      { status: 500 }
    );
  }
}

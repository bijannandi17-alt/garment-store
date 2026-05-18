import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import mongoose from 'mongoose';

// Force Next.js to never cache this API route
export const dynamic = 'force-dynamic';

// ==========================================
// GET: Fetch all orders for the dashboard
// ==========================================
export async function GET() {
  try {
    // 1. Establish the database connection first
    await dbConnect();
    
    // --- DEBUGGING BLOCK ---
    console.log("=== DB CONNECTION CHECK ===");
    console.log("Connected to Database Name:", mongoose.connection.name);
    
    // 2. Fetch all orders using your Mongoose model
    const orders = await Order.find({}).sort({ createdAt: -1 });
    
    console.log(`Fetched ${orders.length} orders from the collection`);
    console.log("===========================");
    
    // 3. Send back the data with a 200 OK status
    return NextResponse.json({ data: orders }, { status: 200 });
    
  } catch (e) {
    console.error("Error fetching orders:", e);
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

// ==========================================
// PATCH: Update an order's status
// ==========================================
export async function PATCH(request: Request) {
  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Read the data sent from the admin frontend
    const body = await request.json();
    
    // We expect the frontend to send the order's ID and the new status
    const { _id, orderId, status } = body;

    if (!status) {
      return NextResponse.json({ message: 'Status is required' }, { status: 400 });
    }

    let updatedOrder;

    // 3. Find the order and update its status
    if (_id) {
      // Update using the MongoDB _id
      updatedOrder = await Order.findByIdAndUpdate(_id, { status }, { new: true });
    } else if (orderId) {
      // Update using your custom orderId string
      updatedOrder = await Order.findOneAndUpdate({ orderId }, { status }, { new: true });
    } else {
      return NextResponse.json({ message: 'Order ID is required' }, { status: 400 });
    }

    if (!updatedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    // 4. Return success
    return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });

  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
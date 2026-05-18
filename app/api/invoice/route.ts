import { NextRequest } from "next/server";
import { generateInvoice } from "@/lib/generateInvoice";

export async function GET(req: NextRequest) {
  try {
    /* 🟢 GET ORDER ID */
    const orderId = req.nextUrl.searchParams.get("orderId");

    if (!orderId) {
      return new Response("Order ID missing", { status: 400 });
    }

    /* 🟢 FETCH ALL ORDERS */
    // IMPORTANT: Check your terminal! If your app runs on port 3001, 
    // change "http://localhost:3000" to "http://localhost:3001" below.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/orders`, { cache: "no-store" });

    if (!res.ok) {
      return new Response(`Orders fetch failed: ${res.status}`, { status: 500 });
    }

    const data = await res.json();

    /* 🔥 THE FIX: We updated this to look for data.data, since that is what your orders API returns! */
    let orders = data.data || data.orders || [];

    /* 🟢 FALLBACK logic */
    if (!orders || orders.length === 0) {
      return new Response("No orders found in database", { status: 404 });
    }

    /* 🟢 FIND CORRECT ORDER */
    const order = orders.find((o: any) => o.orderId === orderId || o._id === orderId);

    if (!order) {
      return new Response("Specific order not found", { status: 404 });
    }

    /* 🟢 MAP ITEMS */
    const items = order.items.map((item: any) => {
      const qty = item.qty || item.quantity || 1;
      const price = item.price || item.product?.price || 0;

      return {
        name: item.name || item.product?.name || "Unknown Item",
        hsn: "6208", // Default HSN code
        qty,
        price
      };
    });

    /* 🟢 CUSTOMER */
    const customer = order.customer || {
      name: order.name,
      phone: order.phone,
      address: order.address
    };

    /* 🟢 GENERATE PDF */
    const pdf = await generateInvoice({
      invoiceNo: "INV-" + orderId.slice(-6).toUpperCase(),
      orderId: orderId,
      date: new Date(order.createdAt).toLocaleDateString(),
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      items
    });

    /* 🟢 RETURN PDF */
    // Convert Uint8Array → guaranteed ArrayBuffer
    const pdfArrayBuffer = new Uint8Array(pdf).buffer;

    return new Response(pdfArrayBuffer as ArrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        // 'inline' makes the PDF open directly in the browser tab so you can preview it before printing!
        "Content-Disposition": "inline; filename=invoice.pdf", 
      },
    });

  } catch (error) {
    console.error("Invoice Error:", error);
    return new Response("Invoice generation failed on server", { status: 500 });
  }
}
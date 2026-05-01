import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, customer_name, phone, address, total_price } = body;

    const promisePool = db.promise();

    await promisePool.query(
      `INSERT INTO orders (user_id, customer_name, phone, address, total_price)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, customer_name, phone, address, total_price]
    );

    await promisePool.query(
      "DELETE FROM cart WHERE user_id = ?",
      [user_id]
    );

    return NextResponse.json({ message: "Order placed successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
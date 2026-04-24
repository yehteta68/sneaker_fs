import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const promisePool = db.promise();

    const [rows] = await promisePool.query(
      `SELECT cart.id, cart.quantity, sneakers.name, sneakers.price, sneakers.image
       FROM cart
       JOIN sneakers ON cart.sneaker_id = sneakers.id
       WHERE cart.user_id = ?`,
      [id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
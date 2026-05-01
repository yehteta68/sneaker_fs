import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, sneaker_id, quantity } = body;

    const promisePool = db.promise();

    const [sneakerRows] = await promisePool.query(
      "SELECT stock FROM sneakers WHERE id = ?",
      [sneaker_id]
    );

    if (sneakerRows.length === 0) {
      return NextResponse.json(
        { message: "Sneaker not found" },
        { status: 404 }
      );
    }

    const currentStock = sneakerRows[0].stock;

    if (currentStock < quantity) {
      return NextResponse.json(
        { message: "Not enough stock" },
        { status: 400 }
      );
    }

    const [existing] = await promisePool.query(
      "SELECT * FROM cart WHERE user_id = ? AND sneaker_id = ?",
      [user_id, sneaker_id]
    );

    if (existing.length > 0) {
      await promisePool.query(
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND sneaker_id = ?",
        [quantity, user_id, sneaker_id]
      );
    } else {
      await promisePool.query(
        "INSERT INTO cart (user_id, sneaker_id, quantity) VALUES (?, ?, ?)",
        [user_id, sneaker_id, quantity]
      );
    }

    await promisePool.query(
      "UPDATE sneakers SET stock = stock - ? WHERE id = ?",
      [quantity, sneaker_id]
    );

    return NextResponse.json({ message: "Added to cart successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
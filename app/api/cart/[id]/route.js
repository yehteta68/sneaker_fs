import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const promisePool = db.promise();

    const [cartRows] = await promisePool.query(
      "SELECT sneaker_id, quantity FROM cart WHERE id = ?",
      [id]
    );

    if (cartRows.length === 0) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      );
    }

    const sneaker_id = cartRows[0].sneaker_id;
    const quantity = cartRows[0].quantity;

    await promisePool.query(
      "UPDATE sneakers SET stock = stock + ? WHERE id = ?",
      [quantity, sneaker_id]
    );

    await promisePool.query(
      "DELETE FROM cart WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
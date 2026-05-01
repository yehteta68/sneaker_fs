import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const promisePool = db.promise();

    const [rows] = await promisePool.query(
      "SELECT * FROM sneakers WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Sneaker not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, brand, price, image, description, stock } = body;

    const promisePool = db.promise();

    await promisePool.query(
      `UPDATE sneakers
       SET name = ?, brand = ?, price = ?, image = ?, description = ?, stock = ?
       WHERE id = ?`,
      [name, brand, price, image, description, stock, id]
    );

    return NextResponse.json({ message: "Sneaker updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const promisePool = db.promise();

    await promisePool.query(
      "DELETE FROM sneakers WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Sneaker deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
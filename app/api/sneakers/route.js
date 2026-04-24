import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET() {
  const promisePool = db.promise();
  const [rows] = await promisePool.query("SELECT * FROM sneakers");
  return NextResponse.json(rows);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, brand, price, image, description, stock } = body;

    const promisePool = db.promise();

    const [result] = await promisePool.query(
      `INSERT INTO sneakers (name, brand, price, image, description, stock)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, brand, price, image, description, stock]
    );

    return NextResponse.json({
      message: "Sneaker added successfully",
      id: result.insertId
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const promisePool = db.promise();

    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE username = ? AND password = ? AND role = 'admin'",
      [username, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid admin username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login successful",
      username: rows[0].username
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
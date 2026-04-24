"use client";
import CartList from "@/components/CartList";

export default function page() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f7fb, #e9eef5)",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}>
      <CartList />
    </div>
  );
}
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./CheckoutForm.css";

export default function CheckoutForm() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  async function fetchCart() {
    const res = await fetch("/api/cart/user/1");
    const data = await res.json();
    setCartItems(data);

    let total = 0;
    data.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function handleCheckout(e) {
    e.preventDefault();

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        customer_name: customerName,
        phone: phone,
        address: address,
        total_price: totalPrice,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Order placed successfully ✅");
      setCustomerName("");
      setPhone("");
      setAddress("");
      setCartItems([]);
      setTotalPrice(0);
    } else {
      setMessage(data.message || "Checkout failed ❌");
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-topbar">
        <Link href="/cart" className="checkout-back-link">
          ← Back
        </Link>

        <h1 className="checkout-title">Checkout</h1>

        <div style={{ width: "48px" }}></div>
      </div>

      {cartItems.length === 0 ? (
        <div className="checkout-empty-box">
          <h2>Order successfully ✅</h2>
          <Link href="/sneakers" className="checkout-shop-btn">
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="checkout-content">
          <div className="checkout-form-card">
            <h2>Customer Information</h2>

            <form onSubmit={handleCheckout} className="checkout-form">
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="confirm-btn">
                Confirm Order
              </button>
            </form>

            {message && <p className="checkout-message">{message}</p>}
          </div>

          <div className="checkout-summary-card">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-left">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="summary-name">{item.name}</p>
                      <p className="summary-qty">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <p className="summary-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
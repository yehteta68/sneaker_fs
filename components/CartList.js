"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./CartList.css";

export default function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  async function removeItem(cartId) {
    const res = await fetch(`/api/cart/${cartId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchCart();
    }
  }

  return (
    <div className="cart-container">
      <div className="cart-topbar">
        <Link href="/sneakers" className="cart-back-link">
          ← Back
        </Link>

        <h1 className="cart-title">My Cart</h1>

        <Link href="/checkout" className="cart-checkout-icon" title="Checkout">
          💳
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty-box">
          <h2>Your cart is empty</h2>
          <p>Add some sneakers and come back here.</p>
          <Link href="/sneakers" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image-box">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">
                    Price: ${Number(item.price).toFixed(2)}
                  </p>
                  <p className="cart-item-qty">Quantity: {item.quantity}</p>
                  <p className="cart-item-subtotal">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-box">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="summary-row total-row">
              <span>Total Price</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import "./SneakerDetail.css";

export default function SneakerDetail() {
  const { id } = useParams();
  const [sneaker, setSneaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchSneaker() {
      const res = await fetch(`/api/sneakers/${id}`);
      if (res.ok) {
        const data = await res.json();
        setSneaker(data);
      }
      setLoading(false);
    }
    fetchSneaker();
  }, [id]);

  function increaseQuantity() {
    if (sneaker && quantity < sneaker.stock) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  async function addToCart() {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        sneaker_id: sneaker.id,
        quantity: quantity
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message || "Added to cart successfully ✅");
      setQuantity(1);

      const updatedRes = await fetch(`/api/sneakers/${id}`);
      if (updatedRes.ok) {
        const updatedData = await updatedRes.json();
        setSneaker(updatedData);
      }
    } else {
      setMessage(data.message || "Failed to add to cart ❌");
    }
  }

  if (loading) return <div className="detail-loading">Loading...</div>;
  if (!sneaker) return <div className="detail-loading">Sneaker not found.</div>;

  return (
    <div className="detail-page">
      <div className="detail-topbar">
        <Link href="/sneakers" className="back-link">← Back</Link>
        <Link href="/cart" className="cart-icon">🛒</Link>
      </div>

      <div className="detail-card">
        <div className="detail-image-section">
          <img src={sneaker.image} alt={sneaker.name} className="detail-image" />
        </div>

        <div className="detail-info-section">
          <p className="detail-brand">{sneaker.brand}</p>
          <h1 className="detail-title">{sneaker.name}</h1>
          <p className="detail-price">${Number(sneaker.price).toFixed(2)}</p>

          <p className="detail-description">{sneaker.description}</p>

          <div className="detail-stock-box">
            {sneaker.stock > 0 ? (
              <span className="stock-available">In Stock: {sneaker.stock}</span>
            ) : (
              <span className="stock-unavailable">Out of Stock</span>
            )}
          </div>

          <div className="detail-actions">
            <div className="quantity-box">
              <button
                className="qty-btn"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
              >
                -
              </button>

              <span className="qty-value">{quantity}</span>

              <button
                className="qty-btn"
                onClick={increaseQuantity}
                disabled={sneaker.stock === 0 || quantity === sneaker.stock}
              >
                +
              </button>
            </div>

            <button
              className="cart-btn"
              onClick={addToCart}
              disabled={sneaker.stock === 0}
            >
              {sneaker.stock === 0 ? "Unavailable" : "Add to Cart"}
            </button>
          </div>

          {message && <p className="detail-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
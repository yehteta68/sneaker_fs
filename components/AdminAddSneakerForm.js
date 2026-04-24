"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./AdminAddSneakerForm.css";

export default function AdminAddSneakerForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    image: "",
    description: "",
    stock: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/sneakers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      })
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/admin");
    } else {
      setMessage(data.message || "Failed to add sneaker ❌");
    }
  }

  return (
    <div className="add-page">
      <div className="add-header">
        <div>
          <h1>Add New Product</h1>
          <p>Create a new sneaker item for your shop</p>
        </div>

        <Link href="/admin" className="back-admin-btn">
          ← Back to Admin
        </Link>
      </div>

      <div className="add-card">
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Sneaker Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Write product description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Add Product
            </button>

            <Link href="/admin" className="cancel-btn">
              Cancel
            </Link>
          </div>

          {message && <p className="form-message">{message}</p>}
        </form>

        <div className="preview-box">
          <h3>Preview</h3>

          {form.image ? (
            <img src={form.image} alt="Preview" />
          ) : (
            <div className="preview-placeholder">Image Preview</div>
          )}

          <h2>{form.name || "Sneaker Name"}</h2>
          <p>{form.brand || "Brand"}</p>
          <strong>${form.price || "0.00"}</strong>
        </div>
      </div>
    </div>
  );
}
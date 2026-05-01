"use client";
import "./Sneaker.css";
import Link from "next/link";

export default function Sneaker({ id, img, name, price, stock }) {
  return (
    <Link href={`/sneakers/${id}`} className="card-link">
      <div className="card">
        <div className="image-wrapper">
          <img src={img} alt={name} className="card-img" />
        </div>

        <div className="card-content">
          <h3>{name}</h3>
          <p className="price">${price}</p>

          {stock > 0 ? (
            <p className="stock available">Stock: {stock}</p>
          ) : (
            <p className="stock soldout">Out of Stock</p>
          )}

          <div className="detail-btn">View Details</div>
        </div>
      </div>
    </Link>
  );
}
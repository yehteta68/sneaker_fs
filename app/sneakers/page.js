"use client";
import { useEffect, useState } from "react";
import Sneaker from "@/components/Sneaker";
import Link from "next/link";

export default function page() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/sneakers")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #e4ecf5)",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(10px)",
          borderRadius: "18px",
          padding: "18px 25px",
          marginBottom: "30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ width: "40px" }}></div>

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "bold",
              color: "#111"
            }}
          >
            YNJ Sneaker
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              color: "#666",
              fontSize: "14px"
            }}
          >
            Step into style
          </p>
        </div>

        <Link
          href="/cart"
          style={{
            textDecoration: "none",
            fontSize: "28px",
            background: "#111",
            color: "white",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 6px 16px rgba(0,0,0,0.18)"
          }}
          title="Cart"
        >
          🛒
        </Link>
      </div>

      {/* HERO TEXT */}
      <div style={{ marginBottom: "25px", textAlign: "center" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "26px",
            color: "#222"
          }}
        >
          Discover Your Perfect Pair
        </h2>
        <p
          style={{
            marginTop: "10px",
            color: "#666",
            fontSize: "15px"
          }}
        >
          Premium sneakers with comfort, style, and attitude.
        </p>
      </div>

      {/* PRODUCT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px"
        }}
      >
        {currentItems.map((item) => (
          <Sneaker
            key={item.id}
            id={item.id}
            img={item.image}
            name={item.name}
            price={item.price}
            stock={item.stock}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          marginTop: "35px"
        }}
      >
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            background: currentPage === 1 ? "#bbb" : "#111",
            color: "white",
            cursor: currentPage === 1 ? "not-allowed" : "pointer"
          }}
        >
          Previous
        </button>

        <span style={{ fontWeight: "bold", color: "#222" }}>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            background:
              currentPage === totalPages || totalPages === 0 ? "#bbb" : "#111",
            color: "white",
            cursor:
              currentPage === totalPages || totalPages === 0
                ? "not-allowed"
                : "pointer"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
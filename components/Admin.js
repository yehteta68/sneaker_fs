"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Admin.css";

export default function Admin() {
  const [data, setData] = useState([]);
  const router = useRouter();

  async function fetchData() {
    const res = await fetch("/api/sneakers");
    const data = await res.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("adminLoggedIn");
    sessionStorage.removeItem("adminUsername");
    router.push("/admin/login");
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Are you sure you want to delete this sneaker?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/sneakers/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchData();
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage sneaker products</p>
        </div>

        <div className="admin-actions">
          <Link href="/admin/new" className="add-btn">
            + Add Product
          </Link>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="admin-img"
                  />
                </td>

                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>${Number(item.price).toFixed(2)}</td>
                <td>{item.stock}</td>

                <td>
                  <div className="table-actions">
                    <Link href={`/admin/${item.id}/edit`} className="edit-btn">
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="empty-admin">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
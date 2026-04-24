"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./AdminLoginForm.css";

export default function AdminLoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem("adminLoggedIn", "true");
      sessionStorage.setItem("adminUsername", data.username);
      router.push("/admin");
    } else {
      setMessage(data.message || "Login failed ❌");
    }
  }

  return (
    <div className="login-page">
      <div className="circle circle-one"></div>
      <div className="circle circle-two"></div>
      <div className="circle circle-three"></div>

      <div className="login-left">
        <div className="logo-box">
          
          <span>YNJ SNEAKER SHOP</span>
        </div>

        <h1>Log In</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">LOG IN</button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>

      <div className="login-right">
        <div className="paint-bg"></div>

        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="Sneaker"
          className="login-shoe"
        />

        <div className="shadow"></div>
      </div>
    </div>
  );
}
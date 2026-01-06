import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #4f46e5, #6d28d9)",
        padding: "20px",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "350px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "#4f46e5", textAlign: "center" }}>
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#4f46e5",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3730a3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
        >
          Sign Up
        </button>

        <p style={{ fontSize: "14px", textAlign: "center", color: "#555" }}>
          Already have an account? <a href="/login" style={{ color: "#4f46e5" }}>Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;

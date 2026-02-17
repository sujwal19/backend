import React, { useState } from "react";
import { signup } from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password });
      alert("Signup successful! Check your email.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data);
      const message =
        err?.response?.data?.message || err.message || "Signup failed";
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;

import { useState } from "react";
import API from "../../utils/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response.data.error);
    }
  };

  return (
    <form>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <button type="submit">Signup</button>
      <p>{msg}</p>
    </form>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", 
        new URLSearchParams({
          username: form.username,
          password: form.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          withCredentials: true 
        }
      );

      if (response.status === 200) {
        //setLoggedIn(true);
        onLogin();
        alert("Uspešno ste se prijavili!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Greška pri loginu:", err);
      setError("Neispravno korisničko ime ili lozinka.");
    }
  };

  return (
    <div>
      <h2>Prijava</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Korisničko ime"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Lozinka"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Prijavi se</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loggedIn && <p style={{ color: "green" }}>Uspešna prijava!</p>}
    </div>
  );
}

export default LoginForm;

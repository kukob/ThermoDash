import { useState } from 'react';
import { registerUser } from '../services/UserService';

function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '', city: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registracija uspešna!");
    } catch (err) {
      setError(err.response?.data || "Greška");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registracija</h2>
      <input name="username" placeholder="Korisničko ime" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Lozinka" onChange={handleChange} required />
      <input name="city" placeholder="Grad" onChange={handleChange} />
      <button type="submit">Registruj se</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default RegisterForm;

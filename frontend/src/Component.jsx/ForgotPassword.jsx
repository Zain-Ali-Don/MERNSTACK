import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function Forgot_Passwrod() {
  const [email, setEmail] = useState('');

  async function forgot() {
    try {
      const response = await axios.post('http://localhost:3001/gym/fp', {
        email,
      });
      toast.success(response.data.msg);
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Something went wrong');
    }
  }

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={forgot}>Submit</button>
    </div>
  );
}
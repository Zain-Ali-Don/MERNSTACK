import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setMail] = useState("");
  const [pswd, setPswd] = useState("");

  const login_func = async () => {
    try {
      const res = await axios.post("http://localhost:3001/gym/log", {
        email: email,
        password: pswd,
      });

      localStorage.setItem("User_Information", JSON.stringify(res.data.user));
      toast.success(res.data.msg);
      setMail("");
      setPswd("");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>Login Team 💪</h2>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setMail(e.target.value)}
        className="form-control my-2"
        required
      />

      <label>Password</label>
      <input
        type="password"
        value={pswd}
        onChange={(e) => setPswd(e.target.value)}
        className="form-control my-2"
        required
      />

      <button className="btn btn-primary mt-2" onClick={login_func}>
        Login
      </button>

      <p className="mt-2">
        <Link to="/reg">Register Your Account</Link>
        <Link to="/fp">Forgot Password</Link>
      </p>
    </div>
  );
}

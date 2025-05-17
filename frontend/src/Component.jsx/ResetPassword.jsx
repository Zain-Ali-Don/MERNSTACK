import React, { useState } from 'react'

export default function ResetPassword() {
  const [pswd, setPswd] = useState("");
  const [cpswd, setCPswd] = useState("");

  return (
    <div className='container'>
        <h1>Reset Password</h1>
      <label>Password</label>
      <input
        type="password"
        value={pswd}
        onChange={(e) => setPswd(e.target.value)}
        className="form-control my-2"
        required
      />
      <label>Confirm Password</label>
      <input
        type="password"
        value={cpswd}
        onChange={(e) => setCPswd(e.target.value)}
        className="form-control my-2"
        required
      />
      <button className="btn btn-primary mt-2" >
        Reset Password
      </button>
    </div>
  )
}

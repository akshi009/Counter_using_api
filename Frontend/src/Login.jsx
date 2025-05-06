import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState('')
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    const data = {
      email,
      password,
    };
  
    try {
      const res = await axios.post("http://localhost:3000/login", data);
  
      if (res.data.success) {
        alert(res.data.message || "Login successful");
        navigate("/home");
      } else {
        setError(res.data.message || "Login failed!");
      }
    } catch (error) {
  console.error("Error during login", error);

  // Handle errors from backend
  if (error.response && error.response.data && error.response.data.message) {
    setError(error.response.data.message); // ✅ show backend error message in UI
  } else {
    setError("Something went wrong. Please try again."); // fallback
  }
}

  };
  
  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "90%", maxWidth: "1200px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            borderRadius: "25px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* Form Section */}
          <div style={{ flex: 1, padding: "40px", minWidth: "300px" }}>
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "30px",
              }}
            >
              Login
            </h1>

            <form onSubmit={handelSubmit}>
              {/* Email Field */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="email"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Your Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="password"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>

              {/* Repeat Password Field */}

              {/* Register Button */}
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </div>
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
              }}
            >
              Not Signup Yet? <Link to="/signup">Signup</Link>
            </div>
          {error && (
  <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
    {error}
  </p>
)}
          </div>
          {/* Image Section */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              alt="Signup Illustration"
              style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEditable, setEmailEditable] = useState(false);
  const [passwordEditable, setPasswordEditable] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setEmail("");
      setPassword("");

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "owner") navigate("/owner");
      else navigate("/renter");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 text-white"
      style={{
        background: "linear-gradient(135deg, #5b5fef, #7a7df7)",
      }}
    >
      <div
        className="auth-card p-5 rounded-4 shadow-lg fade-in"
        style={{
          width: "400px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h3 className="text-center mb-4 fw-semibold">
          Welcome Back to Dwell-In
        </h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              autoComplete="email"
              readOnly={!emailEditable}
              onFocus={() => setEmailEditable(true)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              autoComplete="current-password"
              readOnly={!passwordEditable}
              onFocus={() => setPasswordEditable(true)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Don't have an account?{" "}
          <span
            style={{ cursor: "pointer", fontWeight: 500 }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
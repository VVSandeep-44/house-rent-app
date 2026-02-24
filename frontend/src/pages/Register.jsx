import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("renter");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
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
          width: "420px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h3 className="text-center mb-4 fw-semibold">
          Create Your Dwell-In Account
        </h3>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="custom-select-wrapper mb-4">
            <div
              className="custom-select"
              onClick={() => setOpen(!open)}
            >
              {role === "renter" ? "Renter" : "Owner"}
              <span className={`arrow ${open ? "rotate" : ""}`}>⌄</span>
            </div>

            {open && (
              <div className="custom-options">
                <div
                  className="custom-option"
                  onClick={() => {
                    setRole("renter");
                    setOpen(false);
                  }}
                >
                  Renter
                </div>

                <div
                  className="custom-option"
                  onClick={() => {
                    setRole("owner");
                    setOpen(false);
                  }}
                >
                  Owner
                </div>
              </div>
            )}
          </div>

          <button className="auth-btn w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", fontWeight: 500 }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
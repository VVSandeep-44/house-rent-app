import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("renter");
  const [nameEditable, setNameEditable] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [passwordEditable, setPasswordEditable] = useState(false);

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z ]{2,}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateName(name)) {
      alert("Name must be at least 2 letters and contain only alphabets.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 8 || password.length > 12) {
      alert("Password must be between 8 and 12 characters.");
      return;
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRole("renter");
      setOpen(false);
      setShowPassword(false);
      setPasswordError("");

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
          {/* Name */}
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Full Name"
              autoComplete="name"
              readOnly={!nameEditable}
              onFocus={() => setNameEditable(true)}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              autoComplete="new-password"
              readOnly={!passwordEditable}
              onFocus={() => setPasswordEditable(true)}
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                if (
                  value.length > 0 &&
                  (value.length < 8 || value.length > 12)
                ) {
                  setPasswordError(
                    "Password must be 8–12 characters."
                  );
                } else {
                  setPasswordError("");
                }
              }}
              required
            />

            <span
              className={`arrow ${showPassword ? "rotate" : ""}`}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          {passwordError && (
            <div className="auth-error mb-3">
              {passwordError}
            </div>
          )}

          {/* Role Dropdown */}
          <div className="custom-select-wrapper mb-4">
            <div
              className="custom-select"
              onClick={() => setOpen(!open)}
            >
              {role === "renter" ? "Renter" : "Owner"}
              <span className={`arrow ${open ? "rotate" : ""}`}>
                ⌄
              </span>
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

          {/* Register Button */}
          <button className="auth-btn w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", fontWeight: 500 }}
            onClick={() => navigate("/login", { replace: true })}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
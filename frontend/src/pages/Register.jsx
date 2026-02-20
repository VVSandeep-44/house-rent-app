import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("renter");

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
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Create Account</h3>

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

          <div className="mb-3">
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="renter">Renter</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <button className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

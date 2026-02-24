import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(90deg, #5b5fef, #7a7df7)",
      }}
    >
      <div className="container">
        <span
          className="navbar-brand text-white fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Dwell-In
        </span>

        <button
          className="btn btn-light btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

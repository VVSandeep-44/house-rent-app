import { useNavigate } from "react-router-dom";

function Navbar({ navItems = [], activeNavKey, onNavSelect }) {
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

        {navItems.length > 0 && (
          <div className="d-flex gap-2 ms-3">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`btn btn-sm ${
                  activeNavKey === item.key ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => onNavSelect?.(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

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

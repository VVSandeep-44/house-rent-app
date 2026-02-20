import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">RentEase</span>
      <button className="btn btn-danger btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;

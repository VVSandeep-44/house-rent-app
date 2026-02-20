import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "15px", background: "#eee", display: "flex", justifyContent: "space-between" }}>
      <h3>House Rent App</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;

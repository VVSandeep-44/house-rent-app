import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminDashboard() {
  const [owners, setOwners] = useState([]);


  useEffect(() => {
  const fetchPendingOwners = async () => {
    try {
      const res = await API.get("/admin/owners");
      setOwners(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchPendingOwners();
}, []);


  const approveOwner = async (ownerId) => {
  try {
    await API.put(`/admin/approve/${ownerId}`);

    const res = await API.get("/admin/owners");
    setOwners(res.data);

    alert("Owner approved");
  } catch (error) {
    alert(error.response?.data?.message || "Approval failed");
  }
};


  return (
    <>
    <Navbar />
    <div style={{ padding: "40px" }}>
      <h2>Admin Dashboard</h2>

      {owners.map((owner) => (
        <div
          key={owner._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>Name: {owner.name}</p>

          <button onClick={() => approveOwner(owner._id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
    </>
  );
}

export default AdminDashboard;

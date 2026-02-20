import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AdminDashboard() {
  const [owners, setOwners] = useState([]);

  const fetchPendingOwners = async () => {
    try {
      const res = await API.get("/admin/owners");
      setOwners(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPendingOwners();
    })();
  }, []);

  const approveOwner = async (ownerId) => {
    try {
      await API.put(`/admin/approve/${ownerId}`);
      fetchPendingOwners();
    } catch (error) {
      alert(error.response?.data?.message || "Approval failed");
    }
  };

  return (
    <Layout>
      <h2 className="mb-4">Admin Dashboard</h2>

      <h4 className="mb-3">Pending Owner Approvals</h4>

      {owners.length === 0 ? (
        <div className="alert alert-success">
          No pending owners
        </div>
      ) : (
        owners.map((owner) => (
          <div key={owner._id} className="card mb-3 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1">{owner.name}</h6>
                <small>{owner.email}</small>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => approveOwner(owner._id)}
              >
                Approve
              </button>
            </div>
          </div>
        ))
      )}
    </Layout>
  );
}

export default AdminDashboard;

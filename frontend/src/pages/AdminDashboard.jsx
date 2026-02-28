import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AdminDashboard() {
  const [owners, setOwners] = useState([]);
  const [allOwners, setAllOwners] = useState([]);
  const [activeSection, setActiveSection] = useState("pending-approvals");

  const fetchPendingOwners = async () => {
    try {
      const res = await API.get("/admin/owners");
      setOwners(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllOwners = async () => {
    try {
      const res = await API.get("/admin/owners/all");
      setAllOwners(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPendingOwners();
      await fetchAllOwners();
    })();
  }, []);

  const approveOwner = async (ownerId) => {
    try {
      await API.put(`/admin/approve/${ownerId}`);
      fetchPendingOwners();
      fetchAllOwners();
    } catch (error) {
      alert(error.response?.data?.message || "Approval failed");
    }
  };

  const adminNavItems = [
    { key: "pending-approvals", label: "Pending Approvals" },
    { key: "all-owner-profiles", label: "All Owner Profiles" },
  ];

  const activeSectionLabel =
    adminNavItems.find((item) => item.key === activeSection)?.label || "Admin";

  const renderOwnerCard = (owner, showApproveButton = false) => {
    const isProfileComplete =
      owner.profile?.phone?.trim() &&
      owner.profile?.city?.trim() &&
      owner.profile?.idProof?.trim();

    return (
      <div key={owner._id} className="card mb-3 shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-start gap-3">
          <div>
            <h6 className="mb-1">{owner.name}</h6>
            <small className="d-block mb-2">{owner.email}</small>

            <p className="mb-1">
              <strong>Phone:</strong> {owner.profile?.phone || "Not provided"}
            </p>
            <p className="mb-1">
              <strong>City:</strong> {owner.profile?.city || "Not provided"}
            </p>
            <p className="mb-1">
              <strong>ID Proof:</strong> {owner.profile?.idProof || "Not provided"}
            </p>
            {owner.profile?.bio && (
              <p className="mb-1">
                <strong>Bio:</strong> {owner.profile.bio}
              </p>
            )}

            <span
              className={`badge ${isProfileComplete ? "bg-success" : "bg-warning text-dark"}`}
            >
              {isProfileComplete ? "Profile Complete" : "Profile Incomplete"}
            </span>
          </div>

          {showApproveButton && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => approveOwner(owner._id)}
            >
              Approve
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body p-3">
              <h5 className="mb-3">Admin Menu</h5>

              <div className="d-grid gap-2">
                {adminNavItems.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`btn text-start ${
                      activeSection === item.key ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    onClick={() => setActiveSection(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="card shadow-sm mb-4 border-0">
            <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div>
                <h3 className="mb-1">Admin Dashboard</h3>
                <p className="text-muted mb-0">{activeSectionLabel}</p>
              </div>

              <div className="d-flex flex-wrap gap-2">
                <span className="badge text-bg-light border px-3 py-2">
                  Pending: {owners.length}
                </span>
                <span className="badge text-bg-light border px-3 py-2">
                  Total Owners: {allOwners.length}
                </span>
              </div>
            </div>
          </div>

          {activeSection === "pending-approvals" && (
            <>
              <h4 className="fw-semibold mb-4 border-bottom pb-2">Pending Owner Approvals</h4>

              {owners.length === 0 ? (
                <div className="alert alert-success">No pending owners</div>
              ) : (
                owners.map((owner) => renderOwnerCard(owner, true))
              )}
            </>
          )}

          {activeSection === "all-owner-profiles" && (
            <>
              <h4 className="fw-semibold mb-4 border-bottom pb-2">All Owner Profiles</h4>

              {allOwners.length === 0 ? (
                <div className="alert alert-info">No owners available.</div>
              ) : (
                allOwners.map((owner) => renderOwnerCard(owner, false))
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;

import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AdminDashboard() {
  const [owners, setOwners] = useState([]);
  const [allOwners, setAllOwners] = useState([]);
  const [allRenters, setAllRenters] = useState([]);
  const [ownerSearch, setOwnerSearch] = useState("");
  const [renterSearch, setRenterSearch] = useState("");
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

  const fetchAllRenters = async () => {
    try {
      const res = await API.get("/admin/renters/all");
      setAllRenters(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPendingOwners();
      await fetchAllOwners();
      await fetchAllRenters();
    })();
  }, []);

  const approveOwner = async (ownerId) => {
    try {
      await API.put(`/admin/approve/${ownerId}`);
      fetchPendingOwners();
      fetchAllOwners();
      fetchAllRenters();
    } catch (error) {
      alert(error.response?.data?.message || "Approval failed");
    }
  };

  const adminNavItems = [
    { key: "pending-approvals", label: "Pending Approvals" },
    { key: "all-owner-profiles", label: "All Owner Profiles" },
    { key: "all-renter-profiles", label: "All Renter Profiles" },
  ];

  const activeSectionLabel =
    adminNavItems.find((item) => item.key === activeSection)?.label || "Admin";

  const renderUserProfileCard = (user, showApproveButton = false) => {
    const isProfileComplete =
      user.profile?.phone?.trim() &&
      user.profile?.city?.trim() &&
      user.profile?.idProof?.trim();

    return (
      <div key={user._id} className="card mb-3 shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-start gap-3">
          <div className="d-flex align-items-start gap-3">
            <div>
              {user.profile?.profilePhoto ? (
                <img
                  src={user.profile.profilePhoto}
                  alt={`${user.name} profile`}
                  style={{
                    width: "56px",
                    height: "56px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <i className="bi bi-person-circle" style={{ fontSize: "2.5rem" }}></i>
              )}
            </div>

            <div>
              <h6 className="mb-1">{user.name}</h6>
              <small className="d-block mb-2">{user.email}</small>

              <p className="mb-1">
                <strong>Phone:</strong> {user.profile?.phone || "Not provided"}
              </p>
              <p className="mb-1">
                <strong>City:</strong> {user.profile?.city || "Not provided"}
              </p>
              <p className="mb-1">
                <strong>ID Proof:</strong> {user.profile?.idProof || "Not provided"}
              </p>
              {user.profile?.bio && (
                <p className="mb-1">
                  <strong>Bio:</strong> {user.profile.bio}
                </p>
              )}

              <span
                className={`badge ${isProfileComplete ? "bg-success" : "bg-warning text-dark"}`}
              >
                {isProfileComplete ? "Profile Complete" : "Profile Incomplete"}
              </span>
            </div>
          </div>

          {showApproveButton && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => approveOwner(user._id)}
            >
              Approve
            </button>
          )}
        </div>
      </div>
    );
  };

  const filteredOwners = allOwners.filter((owner) => {
    const query = ownerSearch.trim().toLowerCase();
    if (!query) return true;

    return (
      owner.name?.toLowerCase().includes(query) ||
      owner.email?.toLowerCase().includes(query) ||
      owner.profile?.phone?.toLowerCase().includes(query) ||
      owner.profile?.city?.toLowerCase().includes(query)
    );
  });

  const filteredRenters = allRenters.filter((renter) => {
    const query = renterSearch.trim().toLowerCase();
    if (!query) return true;

    return (
      renter.name?.toLowerCase().includes(query) ||
      renter.email?.toLowerCase().includes(query) ||
      renter.profile?.phone?.toLowerCase().includes(query) ||
      renter.profile?.city?.toLowerCase().includes(query)
    );
  });

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
                <span className="badge text-bg-light border px-3 py-2">
                  Total Renters: {allRenters.length}
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
                owners.map((owner) => renderUserProfileCard(owner, true))
              )}
            </>
          )}

          {activeSection === "all-owner-profiles" && (
            <>
              <h4 className="fw-semibold mb-4 border-bottom pb-2">All Owner Profiles</h4>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search owners by name, email, phone or city"
                  value={ownerSearch}
                  onChange={(e) => setOwnerSearch(e.target.value)}
                />
              </div>

              {filteredOwners.length === 0 ? (
                <div className="alert alert-info">No owners available.</div>
              ) : (
                filteredOwners.map((owner) => renderUserProfileCard(owner, false))
              )}
            </>
          )}

          {activeSection === "all-renter-profiles" && (
            <>
              <h4 className="fw-semibold mb-4 border-bottom pb-2">All Renter Profiles</h4>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search renters by name, email, phone or city"
                  value={renterSearch}
                  onChange={(e) => setRenterSearch(e.target.value)}
                />
              </div>

              {filteredRenters.length === 0 ? (
                <div className="alert alert-info">No renters available.</div>
              ) : (
                filteredRenters.map((renter) => renderUserProfileCard(renter, false))
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;

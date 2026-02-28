import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [activeSection, setActiveSection] = useState("profile");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [idProof, setIdProof] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties/owner");
      setProperties(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setOwnerName(res.data?.name || "");
      setOwnerEmail(res.data?.email || "");
      setPhone(res.data?.profile?.phone || "");
      setCity(res.data?.profile?.city || "");
      setIdProof(res.data?.profile?.idProof || "");
      setBio(res.data?.profile?.bio || "");
      setProfilePhoto(res.data?.profile?.profilePhoto || "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBookings();
      await fetchProperties();
      await fetchProfile();
    })();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await API.put("/auth/profile", {
        phone,
        city,
        idProof,
        bio,
        profilePhoto,
      });
      alert("Profile updated successfully");
      setIsEditingProfile(false);
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result?.toString() || "");
    };
    reader.readAsDataURL(file);
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      await API.post("/properties", {
        title,
        type,
        address,
        price,
        description,
      });

      alert("Property added successfully");
      setTitle("");
      setType("");
      setAddress("");
      setPrice("");
      setDescription("");
      fetchProperties();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding property");
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await API.put(`/bookings/${bookingId}`, { status });
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const ownerNavItems = [
    { key: "profile", label: "Profile" },
    { key: "add-property", label: "Add New Property" },
    { key: "my-properties", label: "My Properties" },
    { key: "bookings", label: "Bookings" },
  ];

  const isProfileComplete =
    phone.trim() !== "" && city.trim() !== "" && idProof.trim() !== "";

  const activeSectionLabel =
    ownerNavItems.find((item) => item.key === activeSection)?.label || "Owner";

  return (
    <Layout>
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body p-3">
              <h5 className="mb-3">Owner Menu</h5>

              <div className="d-grid gap-2">
                {ownerNavItems.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`btn text-start ${
                      activeSection === item.key
                        ? "btn-primary"
                        : "btn-outline-secondary"
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
                <h3 className="mb-1">Owner Dashboard</h3>
                <p className="text-muted mb-0">{activeSectionLabel}</p>
              </div>

              <div className="d-flex flex-wrap gap-2">
                <span className="badge text-bg-light border px-3 py-2">
                  Properties: {properties.length}
                </span>
                <span className="badge text-bg-light border px-3 py-2">
                  Bookings: {bookings.length}
                </span>
                <span
                  className={`badge px-3 py-2 ${
                    isProfileComplete ? "text-bg-success" : "text-bg-warning"
                  }`}
                >
                  {isProfileComplete ? "Profile Complete" : "Profile Incomplete"}
                </span>
              </div>
            </div>
          </div>

          {activeSection === "profile" && (
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Owner Profile</h5>

                <p className="text-muted">
                  Complete your profile so admin can verify and approve your owner account.
                </p>

                {!isEditingProfile ? (
                  <>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="border rounded p-3 text-center h-100 d-flex flex-column justify-content-center align-items-center">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto}
                              alt="Owner Profile"
                              style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <i className="bi bi-person-circle" style={{ fontSize: "4rem" }}></i>
                          )}
                          <p className="text-muted mt-2 mb-0">Profile Photo</p>
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="border rounded p-3 h-100">
                          <p className="mb-2"><strong>Name:</strong> {ownerName || "-"}</p>
                          <p className="mb-2"><strong>Email:</strong> {ownerEmail || "-"}</p>
                          <p className="mb-2"><strong>Phone:</strong> {phone || "-"}</p>
                          <p className="mb-2"><strong>City:</strong> {city || "-"}</p>
                          <p className="mb-2"><strong>ID Proof:</strong> {idProof || "-"}</p>
                          <p className="mb-0"><strong>Bio:</strong> {bio || "-"}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-primary mt-3"
                      onClick={() => setIsEditingProfile(true)}
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleSaveProfile}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="border rounded p-3 text-center h-100 d-flex flex-column justify-content-center align-items-center">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto}
                              alt="Owner Profile"
                              style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <i className="bi bi-person-circle" style={{ fontSize: "4rem" }}></i>
                          )}

                          <input
                            type="file"
                            accept="image/*"
                            className="form-control mt-3"
                            onChange={handleProfilePhotoUpload}
                          />
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <input
                              className="form-control"
                              placeholder="Phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              className="form-control"
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <input
                              className="form-control"
                              placeholder="ID Proof Number"
                              value={idProof}
                              onChange={(e) => setIdProof(e.target.value)}
                              required
                            />
                          </div>

                          <div className="col-12">
                            <textarea
                              className="form-control"
                              placeholder="Bio / Business details"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <button className="btn btn-primary" type="submit">
                        Save Profile
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => {
                          setIsEditingProfile(false);
                          fetchProfile();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeSection === "add-property" && (
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Add New Property</h5>

                <form onSubmit={handleAddProperty}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        placeholder="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary mt-3">
                    Add Property
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeSection === "my-properties" && (
            <>
              <h4 className="fw-semibold mb-4 border-bottom pb-2">My Properties</h4>

              {properties.length === 0 ? (
                <div className="alert alert-info">No properties added yet.</div>
              ) : (
                properties.map((property) => (
                  <div key={property._id} className="card mb-3 shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="mb-2">{property.title}</h5>
                      <p className="text-muted mb-1">
                        {property.type} • {property.address}
                      </p>
                      <p className="fw-semibold mb-0">₹{property.price}</p>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeSection === "bookings" && (
            <>
              <h4 className="fw-semibold mb-4 border-bottom pb-2">Booking Requests</h4>

              {bookings.length === 0 ? (
                <div className="alert alert-secondary">No booking requests yet.</div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking._id} className="card mb-3 shadow-sm border-0">
                    <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                      <div>
                        <p className="mb-1 fw-semibold">{booking.property?.title || "Property"}</p>
                        <span
                          className={`badge ${
                            booking.status === "approved"
                              ? "bg-success"
                              : booking.status === "rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {booking.status === "pending" && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => updateStatus(booking._id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => updateStatus(booking._id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default OwnerDashboard;

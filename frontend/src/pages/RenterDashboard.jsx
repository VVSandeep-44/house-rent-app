import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function RenterDashboard() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [idProof, setIdProof] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const propertiesRes = await API.get("/properties");
        const bookingsRes = await API.get("/bookings");
        const profileRes = await API.get("/auth/profile");

        setProperties(propertiesRes.data);
        setBookings(bookingsRes.data);
        setRenterName(profileRes.data?.name || "");
        setRenterEmail(profileRes.data?.email || "");
        setPhone(profileRes.data?.profile?.phone || "");
        setCity(profileRes.data?.profile?.city || "");
        setIdProof(profileRes.data?.profile?.idProof || "");
        setBio(profileRes.data?.profile?.bio || "");
        setProfilePhoto(profileRes.data?.profile?.profilePhoto || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBooking = async (propertyId) => {
    try {
      await API.post("/bookings", { propertyId });
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setRenterName(res.data?.name || "");
      setRenterEmail(res.data?.email || "");
      setPhone(res.data?.profile?.phone || "");
      setCity(res.data?.profile?.city || "");
      setIdProof(res.data?.profile?.idProof || "");
      setBio(res.data?.profile?.bio || "");
      setProfilePhoto(res.data?.profile?.profilePhoto || "");
    } catch (error) {
      console.error(error);
    }
  };

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

  const renterNavItems = [
    { key: "profile", label: "Profile" },
    { key: "available-properties", label: "Available Properties" },
    { key: "my-bookings", label: "My Bookings" },
  ];

  const activeSectionLabel =
    renterNavItems.find((item) => item.key === activeSection)?.label || "Renter";

  return (
    <Layout>
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body p-3">
              <h5 className="mb-3">Renter Menu</h5>

              <div className="d-grid gap-2">
                {renterNavItems.map((item) => (
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
                <h3 className="mb-1">Renter Dashboard</h3>
                <p className="text-muted mb-0">{activeSectionLabel}</p>
              </div>

              <div className="d-flex flex-wrap gap-2">
                <span className="badge text-bg-light border px-3 py-2">
                  Available: {properties.length}
                </span>
                <span className="badge text-bg-light border px-3 py-2">
                  Bookings: {bookings.length}
                </span>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}

          {!loading && activeSection === "profile" && (
            <div className="card mb-4 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title mb-3">Renter Profile</h5>

                {!isEditingProfile ? (
                  <>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="border rounded p-3 text-center h-100 d-flex flex-column justify-content-center align-items-center">
                          {profilePhoto ? (
                            <img
                              src={profilePhoto}
                              alt="Renter Profile"
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
                          <p className="mb-2"><strong>Name:</strong> {renterName || "-"}</p>
                          <p className="mb-2"><strong>Email:</strong> {renterEmail || "-"}</p>
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
                              alt="Renter Profile"
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
                              placeholder="Bio"
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

          {!loading && activeSection === "available-properties" && (
            <>
              <h4 className="fw-semibold mb-4 border-bottom pb-2">Available Properties</h4>

              {properties.length === 0 ? (
                <div className="alert alert-info">No properties available at the moment.</div>
              ) : (
                properties.map((property) => (
                  <div
                    key={property._id}
                    className="card mb-4 shadow-sm border-0"
                  >
                    <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                      <div>
                        <h5 className="card-title fw-semibold mb-2">{property.title}</h5>
                        <p className="card-text text-muted mb-1">
                          {property.type} • {property.address}
                        </p>
                        <p className="fw-semibold mb-0">₹{property.price}</p>
                      </div>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleBooking(property._id)}
                      >
                        Book Property
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {!loading && activeSection === "my-bookings" && (
            <>
              <h4 className="fw-semibold mb-4 border-bottom pb-2">My Bookings</h4>

              {bookings.length === 0 ? (
                <div className="alert alert-secondary">You have not made any bookings yet.</div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="card mb-4 shadow-sm border-0"
                  >
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-1 fw-medium">{booking.property?.title}</p>
                      </div>

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

export default RenterDashboard;
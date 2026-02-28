import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function RenterDashboard() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("available-properties");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const propertiesRes = await API.get("/properties");
        const bookingsRes = await API.get("/bookings");

        setProperties(propertiesRes.data);
        setBookings(bookingsRes.data);
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

  const renterNavItems = [
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
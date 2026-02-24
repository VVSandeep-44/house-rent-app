import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function RenterDashboard() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Renter Dashboard</h2>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {!loading && (
        <>
          {/* Available Properties Section */}
          <h4 className="fw-semibold mb-4 border-bottom pb-2">
            Available Properties
          </h4>

          {properties.length === 0 ? (
            <div className="alert alert-info">
              No properties available at the moment.
            </div>
          ) : (
            properties.map((property) => (
              <div
                key={property._id}
                className="card mb-4 shadow-sm"
              >
                <div className="card-body">
                  <h5 className="card-title fw-semibold">
                    {property.title}
                  </h5>

                  <p className="card-text text-muted">
                    Type: {property.type} <br />
                    Address: {property.address} <br />
                    Price: ₹{property.price}
                  </p>

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

          {/* My Bookings Section */}
          <h4 className="fw-semibold mt-5 mb-4 border-bottom pb-2">
            My Bookings
          </h4>

          {bookings.length === 0 ? (
            <div className="alert alert-secondary">
              You have not made any bookings yet.
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="card mb-4 shadow-sm"
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1 fw-medium">
                      {booking.property?.title}
                    </p>
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
    </Layout>
  );
}

export default RenterDashboard;
import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function RenterDashboard() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const propertiesRes = await API.get("/properties");
        setProperties(propertiesRes.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const bookingsRes = await API.get("/bookings");
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error(error);
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
      alert("Booking request sent");
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <Layout>
      <h2 className="mb-4">Renter Dashboard</h2>

      <h4>Available Properties</h4>
      {properties.map((property) => (
        <div
          key={property._id}
          className="card mb-3 shadow-sm"
        >
          <div className="card-body">
            <h5 className="card-title">{property.title}</h5>
            <p className="card-text">
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
      ))}

      <h4 className="mt-5">My Bookings</h4>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="card mb-3 shadow-sm"
        >
          <div className="card-body">
            <p className="card-text">
              Property: {booking.property?.title}
            </p>
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
      ))}
    </Layout>
  );
}

export default RenterDashboard;

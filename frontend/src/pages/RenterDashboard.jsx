import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function RenterDashboard() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Fetch renter's bookings
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleBooking = async (propertyId) => {
    try {
      await API.post("/bookings", { propertyId });
      alert("Booking request sent");
      fetchBookings(); // refresh bookings
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Renter Dashboard</h2>

        <h3>Available Properties</h3>
        {properties.map((property) => (
          <div
            key={property._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{property.title}</h3>
            <p>Type: {property.type}</p>
            <p>Address: {property.address}</p>
            <p>Price: ₹{property.price}</p>
            <button onClick={() => handleBooking(property._id)}>
              Book Property
            </button>
          </div>
        ))}

        <h3>My Bookings</h3>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>Property: {booking.property?.title}</p>
            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default RenterDashboard;

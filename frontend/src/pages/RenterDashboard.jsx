import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function RenterDashboard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
  let isMounted = true;

  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties");
      if (isMounted) {
        setProperties(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchProperties();

  return () => {
    isMounted = false;
  };
}, []);

  const handleBooking = async (propertyId) => {
    try {
      await API.post("/bookings", { propertyId });
      alert("Booking request sent");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <>
    <Navbar />
    <div style={{ padding: "40px" }}>
      <h2>Renter Dashboard</h2>
      {properties.map((property) => (
        <div key={property._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{property.title}</h3>
          <p>Type: {property.type}</p>
          <p>Address: {property.address}</p>
          <p>Price: ₹{property.price}</p>
          <button onClick={() => handleBooking(property._id)}>
            Book Property
          </button>
        </div>
      ))}
    </div>
    </>
  );
}

export default RenterDashboard;

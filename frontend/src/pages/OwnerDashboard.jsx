import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");


  const fetchBookings = async () => {
    const res = await API.get("/bookings");
    setBookings(res.data);
  };

  const fetchProperties = async () => {
    const res = await API.get("/properties/owner");
    setProperties(res.data);
  };

  useEffect(() => {
    (async () => {
      await fetchBookings();
      await fetchProperties();
    })();
  }, []);

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

      alert("Property added");
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
    await API.put(`/bookings/${bookingId}`, { status });
    fetchBookings();
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Owner Dashboard</h2>

        <h3>Add Property</h3>
        <form onSubmit={handleAddProperty}>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <br /><br />
          <input placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} required />
          <br /><br />
          <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <br /><br />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <br /><br />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <br /><br />
          <button type="submit">Add Property</button>
        </form>

        <h3>Your Properties</h3>
        {properties.map((property) => (
          <div key={property._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <p>{property.title} - ₹{property.price}</p>
          </div>
        ))}

        <h3>Booking Requests</h3>
        {bookings.map((booking) => (
          <div key={booking._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <p>Property: {booking.property?.title}</p>
            <p>Status: {booking.status}</p>

            {booking.status === "pending" && (
              <>
                <button onClick={() => updateStatus(booking._id, "approved")}>Approve</button>
                <button onClick={() => updateStatus(booking._id, "rejected")}>Reject</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default OwnerDashboard;

import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";


function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);


  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchBookings();
}, []);


  const updateStatus = async (bookingId, status) => {
  try {
    await API.put(`/bookings/${bookingId}`, { status });

    // Refetch manually
    const res = await API.get("/bookings");
    setBookings(res.data);

    alert("Booking updated");
  } catch (error) {
    alert(error.response?.data?.message || "Update failed");
  }
};


  return (
    <>
    <Navbar />
    <div style={{ padding: "40px" }}>
      <h2>Owner Dashboard</h2>

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
          <p>Renter: {booking.renter?.name}</p>
          <p>Status: {booking.status}</p>

          {booking.status === "pending" && (
            <>
              <button onClick={() => updateStatus(booking._id, "approved")}>
                Approve
              </button>
              <button onClick={() => updateStatus(booking._id, "rejected")}>
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
    </>
  );
}

export default OwnerDashboard;

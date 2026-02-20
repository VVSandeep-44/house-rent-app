import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);

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

  return (
    <Layout>
      <h2 className="mb-4">Owner Dashboard</h2>

      {/* Add Property Section */}
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

      {/* Owner Properties */}
      <h4 className="mb-3">Your Properties</h4>
      {properties.map((property) => (
        <div key={property._id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5>{property.title}</h5>
            <p>
              Type: {property.type} <br />
              Address: {property.address} <br />
              Price: ₹{property.price}
            </p>
          </div>
        </div>
      ))}

      {/* Booking Requests */}
      <h4 className="mt-5 mb-3">Booking Requests</h4>
      {bookings.map((booking) => (
        <div key={booking._id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <p>
              Property: {booking.property?.title}
            </p>

            <span
              className={`badge me-3 ${
                booking.status === "approved"
                  ? "bg-success"
                  : booking.status === "rejected"
                  ? "bg-danger"
                  : "bg-warning text-dark"
              }`}
            >
              {booking.status}
            </span>

            {booking.status === "pending" && (
              <>
                <button
                  className="btn btn-success btn-sm me-2"
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
              </>
            )}
          </div>
        </div>
      ))}
    </Layout>
  );
}

export default OwnerDashboard;

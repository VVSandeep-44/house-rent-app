import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <div className="container">
        <h1 className="display-4 fw-bold mb-3">RentEase</h1>
        <p className="lead mb-4">
          Find, list, and manage rental properties with ease.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary px-4"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn btn-outline-primary px-4"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <h5>For Renters</h5>
            <p>Browse available properties and book easily.</p>
          </div>

          <div className="col-md-4">
            <h5>For Owners</h5>
            <p>List properties and manage booking requests.</p>
          </div>

          <div className="col-md-4">
            <h5>Admin Control</h5>
            <p>Approve owners and manage platform access.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

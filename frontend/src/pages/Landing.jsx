import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100 text-center text-white"
            style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)", boxShadow: "0 0 80px rgba(255,255,255,0.1)"

            }}

        >
            <div className="container fade-in">
                <div
                    className="p-5 rounded-4 shadow-lg"
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <h1 className="display-3 fw-bold mb-4">Dwell-In</h1>
                    <p className="lead Opacity-75">
                        Discover your next home with confidence.
                    </p>

                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button
                            className="btn btn-light px-4 py-2 fw-semibold shadow-sm"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                        <button
                            className="btn px-4 py-2 fw-semibold text-white shadow-sm"
                            style={{
                                backgroundColor: "#1f2937",
                                border: "none",
                            }}
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>



                    <div className="row mt-5 pt-4">
                        <div className="col-md-4 text-center">
                            <i className="bi bi-house-door-fill fs-1 mb-3 float"></i>
                            <h5>For Renters</h5>
                            <p>Browse available properties and book easily.</p>
                        </div>

                        <div className="col-md-4 text-center">
                            <i className="bi bi-building fs-1 mb-3 float"></i>
                            <h5>For Owners</h5>
                            <p>List properties and manage booking requests.</p>
                        </div>

                        <div className="col-md-4 text-center">
                            <i className="bi bi-shield-check fs-1 mb-3 float"></i>
                            <h5>Admin Control</h5>
                            <p>Approve owners and manage platform access.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;

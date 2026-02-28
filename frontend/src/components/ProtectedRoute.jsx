import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  let userRole;

  try {
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      return <Navigate to="/" />;
    }

    const payloadPart = tokenParts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const paddedPayload = payloadPart.padEnd(
      payloadPart.length + ((4 - (payloadPart.length % 4)) % 4),
      "="
    );

    const payload = JSON.parse(atob(paddedPayload));

    if (!payload?.role) {
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }

    userRole = payload.role;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

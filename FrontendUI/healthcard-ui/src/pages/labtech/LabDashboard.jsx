import { Link } from "react-router-dom";
import { logout } from "../../auth/roleGuard";

export default function LabDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Lab Technician Dashboard</h1>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/lab/search" style={{ marginRight: "10px" }}>Search Patient</Link>
        <button onClick={logout} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px" }}>Logout</button>
      </nav>
      <div>
        <h2>Welcome to Lab Dashboard</h2>
        <p>Manage patient reports and upload test results.</p>
      </div>
    </div>
  );
}

import { logout } from "../../auth/roleGuard";

export default function DoctorDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctor Dashboard</h1>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={logout} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px" }}>Logout</button>
      </nav>
      <div>
        <h2>Welcome to Doctor Dashboard</h2>
        <p>Access patient records and manage medical data.</p>
        {/* Add more functionality as needed */}
      </div>
    </div>
  );
}
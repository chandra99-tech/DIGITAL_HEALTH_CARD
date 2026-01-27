import { useEffect, useState } from "react";
import api from "../../api/axios";
import { logout } from "../../auth/roleGuard";

export default function AdminDashboard() {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [verifiedDoctors, setVerifiedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const [pendingRes, verifiedRes] = await Promise.all([
        api.get("/api/hospital-admin/pending-doctors"),
        api.get("/api/hospital-admin/verified-doctors")
      ]);
      setPendingDoctors(pendingRes.data);
      setVerifiedDoctors(verifiedRes.data);
    } catch (err) {
      console.error("Failed to load doctors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const verifyDoctor = async (doctorId) => {
    try {
      await api.post(`/api/hospital-admin/verify-doctor/${doctorId}`);
      alert("Doctor verified successfully");
      // Refresh both lists
      loadDoctors();
    } catch (err) {
      console.error("Verification failed", err);
      alert("Failed to verify doctor");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Hospital Admin Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hospital Admin Dashboard</h1>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={logout} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px" }}>Logout</button>
      </nav>

      {/* Pending Doctor Verifications */}
      <div style={{ marginBottom: "40px" }}>
        <h2>Pending Doctor Verifications</h2>
        {pendingDoctors.length === 0 ? (
          <p>No pending verifications.</p>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {pendingDoctors.map(doctor => (
              <div key={doctor.id} style={{
                padding: "15px",
                border: "1px solid #ffc107",
                borderRadius: "5px",
                backgroundColor: "#fff3cd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <strong>{doctor.name}</strong> - {doctor.email}
                  <br />
                  <small style={{ color: "#6c757d" }}>Status: Pending Verification</small>
                </div>
                <button
                  onClick={() => verifyDoctor(doctor.id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Verify Doctor
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verified Doctors */}
      <div>
        <h2>Verified Doctors</h2>
        {verifiedDoctors.length === 0 ? (
          <p>No verified doctors yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {verifiedDoctors.map(doctor => (
              <div key={doctor.id} style={{
                padding: "15px",
                border: "1px solid #28a745",
                borderRadius: "5px",
                backgroundColor: "#d4edda",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <strong>{doctor.name}</strong> - {doctor.email}
                  <br />
                  <small style={{ color: "#155724" }}>Status: Verified ✓</small>
                </div>
                <span style={{
                  padding: "4px 8px",
                  backgroundColor: "#28a745",
                  color: "white",
                  borderRadius: "12px",
                  fontSize: "12px"
                }}>
                  VERIFIED
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
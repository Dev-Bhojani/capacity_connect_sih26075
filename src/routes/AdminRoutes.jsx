import React from "react";
import { Routes, Route } from "react-router-dom";

// ============================================================
// ADMIN PLACEHOLDER
// ============================================================

const AdminPlaceholder = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background:
          "linear-gradient(135deg, #f2f8fc 0%, #eaf4fb 50%, #f8fbfd 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "42px",
          textAlign: "center",
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 24px 60px rgba(11, 31, 58, 0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "18px",
            background: "rgba(37, 99, 235, 0.1)",
            color: "#2563eb",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          A
        </div>

        <h1
          style={{
            margin: "0 0 10px",
            color: "#0b1f3a",
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "-0.03em",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            margin: "0 0 24px",
            color: "#64748b",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          The Admin module is currently under development.
          <br />
          Please check back soon.
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 16px",
            borderRadius: "999px",
            background: "rgba(37, 99, 235, 0.08)",
            border: "1px solid rgba(37, 99, 235, 0.14)",
            color: "#2563eb",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#2563eb",
            }}
          />
          Admin module pending
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ADMIN ROUTES
// ============================================================

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ========================================
          ADMIN APPLICATION
      ======================================== */}

      <Route path="/" element={<AdminPlaceholder />} />
    </Routes>
  );
};

export default AdminRoutes;

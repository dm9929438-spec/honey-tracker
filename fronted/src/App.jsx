import VerifyHoney from "./pages/verifyHoney";
import QRCodePage from "./pages/QRCode";
import QRScanner from "./pages/QRScanner";
import AddBatch from "./pages/AddBatch";
import SellerEntry from "./pages/SellerEntry";

function RoleButton({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        maxWidth: "350px",
        padding: "25px 20px",
        border: "1px solid #e5d8bd",
        borderRadius: "16px",
        background: "#fffdf7",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: "18px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
      }}
    >
      <span style={{ fontSize: "40px" }}>{icon}</span>

      <span>
        <strong style={{ fontSize: "20px", color: "#292524" }}>
          {title}
        </strong>

        <br />

        <span style={{ color: "#78716c", fontSize: "14px" }}>
          {description}
        </span>
      </span>

      <span style={{ marginLeft: "auto", fontSize: "24px" }}>
        →
      </span>
    </button>
  );
}

function LoginPage({ role }) {
  const roleName = role === "beekeeper" ? "Beekeeper" : "Seller";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fffaf0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "35px",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          🍯 {roleName} Login
        </h1>

        <p style={{ textAlign: "center", color: "#78716c" }}>
          Login to your Honey Tracker account
        </p>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px",
            marginTop: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px",
            marginTop: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={() => {
  if (role === "beekeeper") {
    window.location.href = "/add-batch";
  } else {
    window.location.href = "/seller-entry";
  }
}}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "20px",
            background: "#e6a817",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "10px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back to Role Selection
        </button>
      </div>
    </div>
  );
}

function CustomerPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fffaf0",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1>🍯 Customer</h1>

      <p>Verify your honey and check its journey.</p>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => (window.location.href = "/verify")}
          style={{
            padding: "15px 25px",
            margin: "10px",
            background: "#e6a817",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Verify Honey
        </button>

        <button
          onClick={() => (window.location.href = "/scan")}
          style={{
            padding: "15px 25px",
            margin: "10px",
            background: "#292524",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Scan QR Code
        </button>
      </div>

      <button
        onClick={() => (window.location.href = "/")}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "white",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>
    </div>
  );
}

function RoleSelection() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fffaf0",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "36px", color: "#292524" }}>
        🍯 Honey Tracker
      </h1>

      <p style={{ color: "#78716c", fontSize: "18px" }}>
        Transparent • Trusted • Traceable
      </p>

      <h2 style={{ marginTop: "45px", fontSize: "28px" }}>
        Who are you?
      </h2>

      <p style={{ color: "#78716c" }}>
        Choose your role to continue
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <RoleButton
          icon="🐝"
          title="Beekeeper"
          description="Create and manage honey batches"
          onClick={() => (window.location.href = "/beekeeper-login")}
        />

        <RoleButton
          icon="📦"
          title="Seller"
          description="Manage honey sales and entries"
          onClick={() => (window.location.href = "/seller-login")}
        />

        <RoleButton
          icon="👤"
          title="Customer"
          description="Verify honey batch using QR code"
          onClick={() => (window.location.href = "/customer")}
        />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🍯 Honey Tracker</div>

        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="#about">About</a>
          <a href="#how-it-works">How It Works</a>

          <button
            onClick={() => (window.location.href = "/add-batch")}
          >
            Beekeeper
          </button>

          <button
            onClick={() => (window.location.href = "/seller-entry")}
          >
            Seller Entry
          </button>

          <button
            onClick={() => (window.location.href = "/")}
          >
            Login
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <p className="tagline">
            🐝 Transparent • Trusted • Traceable
          </p>

          <h1>
            Know Your Honey.
            <br />
            <span>Trust Your Source.</span>
          </h1>

          <p className="description">
            Honey Tracker helps you trace honey from the hive
            to your hands with a transparent supply chain.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => (window.location.href = "/verify")}
            >
              Verify Honey
            </button>

            <button
              className="secondary-btn"
              onClick={() => (window.location.href = "/scan")}
            >
              Scan QR Code
            </button>

            <button
  className="primary-btn"
  onClick={() => (window.location.href = "/roles")}
>
  Start / Next →
</button>
          </div>
        </div>

        <div className="hero-card">
          <div className="honey-icon">🍯</div>
          <h2>Honey Batch</h2>
          <p>HC-001</p>
          <div className="verified">✓ Verified</div>
        </div>
      </section>

      <section className="features">
        <h2>Why Honey Tracker?</h2>

        <div className="feature-container">
          <div className="feature-card">
            <div>🔗</div>
            <h3>Traceable</h3>
            <p>Track honey from the hive to the customer.</p>
          </div>

          <div className="feature-card">
            <div>🛡️</div>
            <h3>Trusted</h3>
            <p>Verify important honey records.</p>
          </div>

          <div className="feature-card">
            <div>📱</div>
            <h3>QR Verification</h3>
            <p>Scan a QR code to check honey information.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const path = window.location.pathname;

  if (path === "/verify") {
    return <VerifyHoney />;
  }

  if (path === "/qr") {
    return <QRCodePage />;
  }

  if (path === "/scan") {
    return <QRScanner />;
  }

  if (path === "/add-batch") {
    return <AddBatch />;
  }

  if (path === "/seller-entry") {
    return <SellerEntry />;
  }

  if (path === "/beekeeper-login") {
    return <LoginPage role="beekeeper" />;
  }

  if (path === "/seller-login") {
    return <LoginPage role="seller" />;
  }

  if (path === "/customer") {
    return <CustomerPage />;
  }
  if (path === "/roles") {
  return <RoleSelection />;
}

  if (path === "/home") {
    return <HomePage />;
  }

  return <HomePage />;
}

export default App;
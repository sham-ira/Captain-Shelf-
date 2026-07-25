import { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("register"); // "register" or "login"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setMode(mode === "register" ? "login" : "register");
    setFormData({ name: "", email: "", password: "" });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(mode === "register" ? "Registering..." : "Logging in...");

    const endpoint = mode === "register" ? "/api/register" : "/api/login";
    const payload =
      mode === "register"
        ? formData
        : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        if (mode === "login") {
          localStorage.setItem("token", data.token);
        }
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Could not connect to server");
    }
  };

  const filled = [1, 2, 4, 6, 7, 8, 10, 13, 14, 15, 16, 19, 20, 22];
  const tagged = { 7: "94%", 14: "88%", 20: "91%" };

  return (
    <div className="page">
      <div className="scan-panel">
        <div className="brand-mark">
          <svg className="mascot" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 30 Q50 8 80 30 L84 38 L16 38 Z" fill="#2d6cdf" />
            <rect x="16" y="36" width="68" height="7" rx="2" fill="#1d4ed8" />
            <circle cx="50" cy="30" r="4" fill="#ffffff" />
            <rect x="24" y="44" width="52" height="42" rx="12" fill="#ffffff" stroke="#2d6cdf" strokeWidth="3" />
            <rect x="30" y="52" width="16" height="14" rx="4" fill="#2d6cdf" />
            <rect x="54" y="52" width="16" height="14" rx="4" fill="#2d6cdf" />
            <circle cx="38" cy="59" r="2.5" fill="#ffffff" />
            <circle cx="62" cy="59" r="2.5" fill="#ffffff" />
            <path d="M38 74 Q50 82 62 74" stroke="#2d6cdf" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line x1="50" y1="14" x2="50" y2="22" stroke="#2d6cdf" strokeWidth="2" />
            <circle cx="50" cy="12" r="3" fill="#ffffff" stroke="#2d6cdf" strokeWidth="1.5" />
          </svg>
          <span className="brand-text">CAPTAIN<span style={{ color: "#2d6cdf" }}>.</span>SHELF</span>
        </div>

        <div>
          <h1 className="scan-headline">
            See exactly what's <em>sitting on the shelf</em> — before your competitors do.
          </h1>

          <div className="shelf-grid">
            <div className="scanline"></div>
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`slot ${filled.includes(i) ? "filled" : ""} ${tagged[i] ? "tag" : ""}`}
                data-tag={tagged[i] || ""}
              ></div>
            ))}
          </div>

          <p className="scan-caption">
            <b>ShelfIQ engine</b> — detecting products, brands, and shelf share in real time.
          </p>
        </div>

        <p className="scan-footnote">CSE327 · North South University · Summer 2026</p>
      </div>

      <div className="auth-side">
        <div className="auth-card">
          <div className="auth-eyebrow">
            {mode === "register" ? "Get started" : "Welcome back"}
          </div>
          <h2>{mode === "register" ? "Create your account" : "Log in"}</h2>
          <p className="sub">
            {mode === "register"
              ? "Start auditing shelves in minutes."
              : "Access your ShelfIQ dashboard."}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "register" && (
              <div className="field">
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Rahman"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">
              {mode === "register" ? "Create account" : "Log in"}
            </button>
          </form>

          <p className="auth-message">{message}</p>

          <p className="auth-toggle">
            {mode === "register" ? (
              <>Already have an account? <span onClick={switchMode}>Log in</span></>
            ) : (
              <>Don't have an account? <span onClick={switchMode}>Register</span></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
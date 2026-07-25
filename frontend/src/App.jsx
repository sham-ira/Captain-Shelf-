import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/health")
      .then((res) => res.json())
      .then((data) => setMessage(`Backend says: ${data.status}`))
      .catch(() => setMessage("Could not connect to backend ❌"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Captain.Shelf — ShelfIQ</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
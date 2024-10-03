import React, { useState } from "react";
import PremiumCalculator from "./PremiumCalculator";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import './styles.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin") {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        isAdmin ? (
          <AdminPanel />
        ) : (
          <PremiumCalculator />
        )
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

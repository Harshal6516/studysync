import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./components/firebase";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
import TaskManager from "./components/TaskManager";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route 
          path="/tasks" 
          element={user ? <TaskManager /> : <Navigate to="/signin" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

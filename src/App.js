import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./login";
import SignUp from "./register";
import Profile from "./profile";
import VaccineStatus from "./VaccineStatus"; // Ensure consistent component name
import OptionsPage from "./OptionsPage";
import RJchatbot from "./chatbot/RJchatbot";
import Information from "./Information";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./back/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase auth state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/options" element={<OptionsPage />} />
              <Route path="/vaccinestatus" element={<VaccineStatus />} /> {/* Ensure consistent case */}
              <Route path="/information" element={<Information />} />
              <Route path="/RJchatbot" element={<RJchatbot />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

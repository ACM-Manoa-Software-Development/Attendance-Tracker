import React from "react";
import { AuthProvider } from "../contexts/AuthContexts";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home/Home";
import EditProfile from "./EditProfile";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";


function App() {

  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

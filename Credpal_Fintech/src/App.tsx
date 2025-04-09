import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AuthLayout from "./auth/AuthLayout";
import './App.css';

import WalletMainLayout from "./layout/WalletMainLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="/*" element={<WalletMainLayout />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

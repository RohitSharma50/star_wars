import React, { useState } from "react";
import Body from "./components/Body";
import Login from "./Authentication/login";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Authentication/signup";
const App = () => {
  const [isLoginTrue, setIsLoginTrue] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/home" element={<Body isLoginTrue={isLoginTrue} />} />
        <Route
          path="/login"
          element={<Login setIsLoginTrue={setIsLoginTrue} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
export default App;

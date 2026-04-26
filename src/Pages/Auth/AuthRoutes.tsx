import React from "react";
import { Route, Routes } from "react-router-dom";
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

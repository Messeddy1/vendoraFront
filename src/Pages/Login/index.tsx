import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { useNavigate } from "react-router-dom";
import { setUser } from "./LoginSlice";

export default function Login() {
  const { user } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.name) {
      navigate("/home");
    }
  }, [user, navigate]);
  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      dispatch(setUser(userData));
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-700">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-100 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Role */}
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold text-white ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

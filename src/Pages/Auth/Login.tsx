import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/cors/_request";

export default function Login() {
  const dispatch = useAppDispatch();
  const { error, fieldErrors } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await dispatch(login(userData));
    setLoading(false);

    if (response.payload?.user) {
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-700">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-100 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {/* Display general error */}
        {error && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 ${
                fieldErrors?.email
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              required
            />
            {fieldErrors?.email && (
              <p className="text-red-400 text-sm mt-1">
                {fieldErrors.email[0]}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 ${
                fieldErrors?.password
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              required
            />
            {fieldErrors?.password && (
              <p className="text-red-400 text-sm mt-1">
                {fieldErrors.password[0]}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold text-white ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/register")}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

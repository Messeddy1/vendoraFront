import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/cors/_request";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function Login() {
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect") || "/";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const response = await dispatch(login(userData));
      console.log(response);
      if (response.meta.requestStatus === "fulfilled") {
        navigate(redirect, { replace: true });
      }
      // Check if login was successful and navigate
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground text-center mb-6">
          Login to Market
        </h1>

        {error && (
          <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm text-foreground">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={userData.email}
              onChange={handleChange}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            {fieldErrors?.email && (
              <p className="text-xs text-destructive">{fieldErrors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-foreground">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            {fieldErrors?.password && (
              <p className="text-xs text-destructive">
                {fieldErrors.password[0]}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/register")}
            className="font-semibold text-primary hover:text-primary/80"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { useNavigate } from "react-router-dom";
import { register } from "./cors/_request";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function Register() {
  const dispatch = useAppDispatch();
  const { error, fieldErrors } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setPasswordMatchError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    try {
      if (userData.password !== userData.password_confirmation) {
        setPasswordMatchError("Passwords do not match");
        return;
      }
      setLoading(true);
      const response = await dispatch(register(userData));
      if (response.payload?.user) {
        console.log(response);
      }
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
          Create your seller or shopper account
        </h1>

        {error && (
          <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              value={userData.name}
              onChange={handleChange}
              className="bg-slate-950/90 text-slate-100 border-slate-700"
              required
            />
            {fieldErrors?.name && (
              <p className="text-xs text-red-400">{fieldErrors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={userData.email}
              onChange={handleChange}
              className="bg-slate-950/90 text-slate-100 border-slate-700"
              required
            />
            {fieldErrors?.email && (
              <p className="text-xs text-red-400">{fieldErrors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              className="bg-slate-950/90 text-slate-100 border-slate-700"
              required
            />
            {fieldErrors?.password && (
              <p className="text-xs text-red-400">{fieldErrors.password[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">
              Confirm Password
            </label>
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={userData.password_confirmation}
              onChange={handleChange}
              className="bg-slate-950/90 text-slate-100 border-slate-700"
              required
            />
            {(fieldErrors?.password_confirmation || passwordMatchError) && (
              <p className="text-xs text-red-400">
                {fieldErrors?.password_confirmation
                  ? fieldErrors.password_confirmation[0]
                  : passwordMatchError}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="font-semibold text-primary hover:text-primary/80"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

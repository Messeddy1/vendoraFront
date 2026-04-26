import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          ✓ Password changed successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          ✕ {error}
        </div>
      )}

      {/* Security Notice */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
        💡 Use a strong password with at least 8 characters, including uppercase,
        lowercase, numbers, and special characters.
      </div>

      {/* Current Password */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Current Password
        </label>
        <div className="relative">
          <Input
            type={showPasswords.current ? "text" : "password"}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg pr-12"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("current")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPasswords.current ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          New Password
        </label>
        <div className="relative">
          <Input
            type={showPasswords.new ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg pr-12"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("new")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPasswords.new ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Confirm New Password
        </label>
        <div className="relative">
          <Input
            type={showPasswords.confirm ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg pr-12"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirm")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPasswords.confirm ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="px-8 h-11 rounded-lg font-semibold"
        >
          {loading ? "Updating..." : "Change Password"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            setError("");
          }}
          className="px-8 h-11 rounded-lg font-semibold"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

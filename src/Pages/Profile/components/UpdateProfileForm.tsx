import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { User } from "@/Pages/Auth/cors/_Modules";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { updateProfile } from "../cors/_requests";

interface UpdateProfileFormProps {
  user: User | undefined | null;
}

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    id: user?.id || 0,
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { error, fieldErrors } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // TODO: Replace with actual API call
      await dispatch(updateProfile(formData)).unwrap();
      setSuccess(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          ✓ Profile updated successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          ✕ {error}
        </div>
      )}

      {/* Full Name Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Full Name
        </label>
        {fieldErrors?.name && (
          <p className="text-xs text-red-500">{fieldErrors.name}</p>
        )}
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
          required
        />
        <p className="text-xs text-muted-foreground">
          This is the name associated with your account.
        </p>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Email Address
        </label>
        {fieldErrors?.email && (
          <p className="text-xs text-red-500">{fieldErrors.email}</p>
        )}
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
          required
        />
        <p className="text-xs text-muted-foreground">
          Your email is used for account recovery and notifications.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="px-8 h-11 rounded-lg font-semibold"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              name: user?.name || "",
              email: user?.email || "",
              id: user?.id || 0,
            });
          }}
          className="px-8 h-11 rounded-lg font-semibold"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

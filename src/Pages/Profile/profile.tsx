import  { useState } from "react";
import { useAppSelector } from "@/store/reduxHooks";
import ChangePasswordForm from "./components/ChangePasswordForm";
import BrowserSessions from "./components/BrowserSessions";
import UpdateProfileForm from "./components/UpdateProfileForm";

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="w-full min-h-screen  from-background via-background to-background/80 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full  from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-primary-foreground">
                {user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {user?.name}
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="text-sm font-semibold text-foreground mb-4 px-2">
                ACCOUNT SETTINGS
              </h3>
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profile Settings", icon: "⚙️" },
                  { id: "password", label: "Security", icon: "🔒" },
                  { id: "sessions", label: "Sessions", icon: "📱" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="bg-card border border-border rounded-2xl shadow-sm p-8 animate-fadeIn">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Profile Settings
                  </h2>
                  <p className="text-muted-foreground">
                    Update your personal information
                  </p>
                </div>
                <UpdateProfileForm user={user} />
              </div>
            )}

            {/* Password Security Tab */}
            {activeTab === "password" && (
              <div className="bg-card border border-border rounded-2xl shadow-sm p-8 animate-fadeIn">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Change Password
                  </h2>
                  <p className="text-muted-foreground">
                    Keep your account secure by using a strong password
                  </p>
                </div>
                <ChangePasswordForm />
              </div>
            )}

            {/* Browser Sessions Tab */}
            {activeTab === "sessions" && (
              <div className="bg-card border border-border rounded-2xl shadow-sm p-8 animate-fadeIn">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Browser Sessions
                  </h2>
                  <p className="text-muted-foreground">
                    Manage your active login sessions
                  </p>
                </div>
                <BrowserSessions />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

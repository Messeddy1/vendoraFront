import  { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Session {
  id: string;
  browser: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActivity: string;
  isCurrent: boolean;
}

export default function BrowserSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate fetching sessions
    const mockSessions: Session[] = [
      {
        id: "1",
        browser: "Chrome",
        device: "MacBook Pro",
        location: "Cairo, Egypt",
        ipAddress: "192.168.1.1",
        lastActivity: "Just now",
        isCurrent: true,
      },
      {
        id: "2",
        browser: "Safari",
        device: "iPhone 14",
        location: "Cairo, Egypt",
        ipAddress: "192.168.1.2",
        lastActivity: "2 hours ago",
        isCurrent: false,
      },
      {
        id: "3",
        browser: "Firefox",
        device: "Windows PC",
        location: "Giza, Egypt",
        ipAddress: "192.168.1.3",
        lastActivity: "1 day ago",
        isCurrent: false,
      },
    ];

    setTimeout(() => {
      setSessions(mockSessions);
      setLoading(false);
    }, 800);
  }, []);

  const handleLogoutSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    setError("");
  };

  const handleLogoutAll = () => {
    const currentSession = sessions.find((s) => s.isCurrent);
    if (currentSession) {
      setSessions([currentSession]);
    }
  };

  const getBrowserIcon = (browser: string) => {
    const icons: Record<string, string> = {
      Chrome: "🌐",
      Safari: "🧭",
      Firefox: "🔥",
      Edge: "📘",
      Opera: "🎭",
    };
    return icons[browser] || "🌐";
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes("MacBook")) return "💻";
    if (device.includes("iPhone")) return "📱";
    if (device.includes("iPad")) return "📱";
    if (device.includes("Windows")) return "🖥️";
    return "💻";
  };

  return (
    <div className="space-y-6">
      {/* Header with Logout All Button */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Manage your active sessions and logged-in devices
        </p>
        {sessions.length > 1 && (
          <Button
            onClick={handleLogoutAll}
            variant="destructive"
            className="rounded-lg h-10"
          >
            Logout All Other Sessions
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading sessions...</div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          ✕ {error}
        </div>
      ) : sessions.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-muted-foreground">No active sessions</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`p-6 border rounded-xl transition-all ${
                session.isCurrent
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left Section - Icons and Info */}
                <div className="flex gap-4 flex-1">
                  <div className="text-3xl">{getBrowserIcon(session.browser)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {session.browser} on {session.device}
                      </h3>
                      {session.isCurrent && (
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                          Current Session
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {getDeviceIcon(session.device)} {session.device}
                    </p>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <p>📍 {session.location}</p>
                      <p>🔗 IP: {session.ipAddress}</p>
                      <p>⏱️ Last activity: {session.lastActivity}</p>
                    </div>
                  </div>
                </div>

                {/* Right Section - Action Button */}
                {!session.isCurrent && (
                  <Button
                    onClick={() => handleLogoutSession(session.id)}
                    variant="outline"
                    className="rounded-lg h-10 border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Security Info */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="font-semibold text-blue-900 mb-2">🔒 Security Tips</h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Regularly review your active sessions</li>
          <li>• Logout from devices you no longer use</li>
          <li>• Change your password if you see unfamiliar devices</li>
          <li>• Use strong, unique passwords for your account</li>
        </ul>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  getuserSessions,
  logoutAllSession,
  logoutSession,
} from "../cors/_requests";
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import {
  Clock1Icon,
  MonitorUpIcon,
  PhoneOffIcon,
  PinOffIcon,
  RefreshCwIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function BrowserSessions() {
  const { sessions, status, error } = useAppSelector(
    (state) => state.userSessions,
  );
  const dispatch = useAppDispatch();

  const fetch = async () => {
    try {
      await dispatch(getuserSessions());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleLogoutSession = async (sessionId: string) => {
    try {
      const response = await dispatch(logoutSession(sessionId));
      if (response.meta.requestStatus === "fulfilled")
        toast.success("Session logged out");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutAll = async () => {
    try {
      const response = await dispatch(logoutAllSession());
      if (response.meta.requestStatus === "fulfilled")
        toast.success("All sessions logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4 py-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage your active sessions and logged-in devices
        </p>
        {sessions && sessions.length > 1 && (
          <Button
            onClick={handleLogoutAll}
            variant="outline"
            className="h-9 rounded-lg border-destructive/40 text-destructive hover:bg-destructive/5 text-sm"
          >
            Logout all other sessions
          </Button>
        )}
      </div>

      {/* Refresh */}
      <div>
        <Button
          onClick={fetch}
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-muted-foreground text-xs px-3"
        >
          <RefreshCwIcon
            className={`${status === "PENDING" && "animate-spin"} h-4 w-4 `}
          />
          Refresh
        </Button>
      </div>

      {/* States */}
      {status === "PENDING" ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-sm text-muted-foreground">Loading sessions...</p>
        </div>
      ) : error ? (
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive">
          {error}
        </div>
      ) : sessions && sessions.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-muted-foreground">No active sessions</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {sessions &&
            sessions.map((session) => (
              <div
                key={session.id}
                className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-colors ${
                  session.is_this_device
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30"
                    : "border-border bg-background hover:border-border/80"
                }`}
              >
                {/* Left */}
                <div className="flex gap-3 flex-1">
                  {/* Device icon */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      session.is_this_device
                        ? "bg-blue-100 border-blue-200 text-blue-700"
                        : "bg-muted border-border text-muted-foreground"
                    }`}
                  >
                    {session.user_agent.is_desktop ? (
                      <MonitorUpIcon />
                    ) : (
                      <PhoneOffIcon />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-sm font-medium ${
                          session.is_this_device
                            ? "text-blue-900 dark:text-blue-100"
                            : "text-foreground"
                        }`}
                      >
                        {session.user_agent.browser} on{" "}
                        {session.user_agent.platform}
                      </span>
                      {session.is_this_device && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-600 text-blue-50 font-normal">
                          Current session
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-xs mb-2 ${
                        session.is_this_device
                          ? "text-blue-600 dark:text-blue-300"
                          : "text-muted-foreground"
                      }`}
                    >
                      {session.user_agent.is_desktop ? "Desktop" : "Mobile"} ·{" "}
                      {session.is_this_device
                        ? "This device"
                        : "Another device"}
                    </p>

                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                        <Clock1Icon className="h-4" />
                        {session.last_activity}
                      </span>
                      <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                        <PinOffIcon className="h-4" />
                        {session.ip_address}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Logout button */}
                {!session.is_this_device && (
                  <Button
                    onClick={() => handleLogoutSession(session.id)}
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs rounded-lg border-destructive/30 text-destructive hover:bg-destructive/5 shrink-0"
                  >
                    Logout
                  </Button>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Security tips */}
      <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-2.5">
          Security tips
        </h4>
        <ul className="space-y-1.5">
          {[
            "Review your active sessions regularly",
            "Logout from devices you no longer use",
            "Change your password if you see an unfamiliar device",
            "Use a strong, unique password for your account",
          ].map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40 mt-1.5 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

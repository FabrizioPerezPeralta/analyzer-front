import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { Users as UsersIcon, LayoutDashboard } from "lucide-react";

const AppShell = () => {
  const { username, clearAuth } = useAuthStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="flex h-11 items-center justify-between bg-black px-6 text-[12px] uppercase tracking-[0.2em] text-white">
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-body-muted transition-colors">
            Analyzer
          </Link>
          <div className="flex items-center gap-4 normal-case tracking-normal">
            <Link
              to="/"
              className={`flex items-center gap-2 hover:text-white transition-colors ${
                location.pathname === "/" ? "text-white" : "text-body-muted"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/users"
              className={`flex items-center gap-2 hover:text-white transition-colors ${
                location.pathname === "/users" ? "text-white" : "text-body-muted"
              }`}
            >
              <UsersIcon className="h-4 w-4" />
              Users
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] normal-case tracking-normal text-body-muted">
            {username ?? "admin"}
          </span>
          <Button variant="dark" size="sm" onClick={clearAuth}>
            Sign out
          </Button>
        </div>
      </div>
      <div className="sticky top-0 z-20 border-b border-hairline bg-parchment/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[21px] font-semibold tracking-[0.231px]">
              Database Audit
            </p>
            <p className="text-[14px] text-ink-muted-48">
              Upload schema and notes for AI analysis
            </p>
          </div>
        </div>
      </div>
      <main className="min-h-[calc(100vh-88px)] bg-canvas">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;

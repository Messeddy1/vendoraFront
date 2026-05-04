import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { User, Settings, Key, Package, Home } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="mt-12">
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Vendora</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <nav className="space-y-2">
            <a
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </a>
            <a
              href="/profile/info"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Settings className="w-4 h-4" />
              User Info
            </a>
            <a
              href="/profile/password"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Key className="w-4 h-4" />
              Password
            </a>
            <a
              href="/products"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Package className="w-4 h-4" />
              Products
            </a>
            <a
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </a>
          </nav>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-muted-foreground">
          © 2026 Vendora
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

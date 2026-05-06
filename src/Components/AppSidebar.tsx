import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { getSidebarLinks } from "@/data/SideBarlinks";
import { ChevronRight } from "lucide-react";
import { useAppSelector } from "@/store/reduxHooks";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const isActive = (path: string) => {
  return location.pathname.startsWith(path);
};
  const role = user?.roles && user?.roles[0];
  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
            {getSidebarLinks(role || null).map((item: any, index: number) => {
              const Icon = item.icon;
              const isOpen = openItems[index];

              // ✅ إذا عندو children
              if (item.children) {
                return (
                  <div key={index} className="space-y-1">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </div>

                      {/* arrow */}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {/* children */}
                    {isOpen && (
                      <div className="ml-6 space-y-1">
                        {item.children.map((child: any, i: number) => {
                          const ChildIcon = child.icon;
                          return (
                            <Link
                              key={i}
                              to={child.href}
                              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${isActive(child.href) ? "bg-accent text-accent-foreground" : ""}`}
                            >
                              <ChildIcon className="w-4 h-4" />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // ✅ إذا ما عندوش children
              return (
                  <Link
                    key={index}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${isActive(item.href) ? "bg-accent text-accent-foreground" : ""}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
              );
            })}
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
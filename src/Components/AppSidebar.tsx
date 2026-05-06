import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { sidebarLinks } from "@/data/SideBarlinks";
import { ChevronRight } from "lucide-react";

export function AppSidebar() {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

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
            {sidebarLinks.map((item, index) => {
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
                        {item.children.map((child, i) => {
                          const ChildIcon = child.icon;
                          return (
                            <a
                              key={i}
                              href={child.href}
                              className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <ChildIcon className="w-4 h-4" />
                              {child.label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // ✅ إذا ما عندوش children
              return (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
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
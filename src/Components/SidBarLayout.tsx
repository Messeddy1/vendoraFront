import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/Components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col min-h-screen w-full mx-10 my-5">
        <main className="flex-1">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

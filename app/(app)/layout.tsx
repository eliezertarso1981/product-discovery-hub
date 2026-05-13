import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { ProductsProvider } from "@/lib/products-context";
import { DoresProvider } from "@/lib/dores-store";
import { DiscoveryProvider } from "@/lib/discovery-store";
import { WorkspaceProvider } from "@/lib/workspace-store";
import { ThemeProvider } from "@/lib/theme-context";
import { AppToaster } from "@/components/shared/app-toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <WorkspaceProvider>
          <DoresProvider>
            <DiscoveryProvider>
              <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg-elevated)" }}>
                <Sidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                  <Topbar />
                  <main className="flex-1 overflow-x-hidden animate-fade-in">{children}</main>
                </div>
              </div>
              <AppToaster />
            </DiscoveryProvider>
          </DoresProvider>
        </WorkspaceProvider>
      </ProductsProvider>
    </ThemeProvider>
  );
}

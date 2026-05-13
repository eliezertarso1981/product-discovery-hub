import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { ProductsProvider } from "@/lib/products-context";
import { DoresProvider } from "@/lib/dores-store";
import { DiscoveryProvider } from "@/lib/discovery-store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProductsProvider>
      <DoresProvider>
        <DiscoveryProvider>
          <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg-elevated)" }}>
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Topbar />
              <main className="flex-1 overflow-x-hidden">{children}</main>
            </div>
          </div>
        </DiscoveryProvider>
      </DoresProvider>
    </ProductsProvider>
  );
}

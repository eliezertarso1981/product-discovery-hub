import { DoresProvider } from "@/lib/dores-store";

export default function DoresLayout({ children }: { children: React.ReactNode }) {
  return <DoresProvider>{children}</DoresProvider>;
}

import { Navbar } from "./Navbar.js";
import { Footer } from "./Footer.js";
import { CustomCursor, ScrollProgress } from "@/shared/templates/index.js";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

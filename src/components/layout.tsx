import React, { PropsWithChildren } from "react";
import Header from "@/components/header";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto">{children}</main>
      <footer className="fixed bottom-0 left-0 w-full border-t backdrop-blur py-6 md:py-12 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>♥</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

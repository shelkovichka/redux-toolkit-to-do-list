import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { selectAuthUser } from "@/redux/selectors/auth-selectors";
import AddTask from "@/components/add-task";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector(selectAuthUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="flex min-h-screen">
        {user && (
          <aside className="flex-[1_0_15%] hidden md:block">
            <Sidebar />
          </aside>
        )}
        <div className="overflow-y-auto w-full">
          <Header />
          <main>{children}</main>
        </div>
      </div>

      {user && (
        <div
          className="fixed bottom-6 left-1/2 sm:right-6 sm:left-auto
          transform -translate-x-1/2 md:hidden z-50"
        >
          <AddTask />
        </div>
      )}
      <footer
        className="border-t backdrop-blur py-6
          supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>♥</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

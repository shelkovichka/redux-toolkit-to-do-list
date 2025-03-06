import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { selectUser } from "@/redux/selectors/auth-selectors";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="flex min-h-screen">
        <aside className={`flex-[1_0_15%] ${!user && "hidden"}`}>
          <Sidebar />
        </aside>
        <div className="overflow-y-auto w-full">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

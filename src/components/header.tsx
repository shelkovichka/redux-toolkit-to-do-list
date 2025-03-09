import React from "react";
import { Moon, Sun } from "lucide-react";
import { useSelector } from "react-redux";

import { useTheme } from "@/context/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { selectAuthUser } from "@/redux/selectors/auth-selectors";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/mobile-menu";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  const isDark = theme === "dark";
  const user = useSelector(selectAuthUser);

  return (
    <header
      className="w-full border-b bg-background/95
        backdrop-blur py-0 md:py-2 supports-[backdrop-filter]:bg-background/60"
    >
      <div
        className="container mx-auto px-4 flex h-16 items-center
          justify-between md:justify-end"
      >
        <MobileMenu />
        <div className="flex gap-4">
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform 
              duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}
          >
            {isDark ? (
              <Sun
                className="h-6 w-6 text-yellow-200 rotate-0
                  transition-all"
              />
            ) : (
              <Moon
                className="h-6 w-6 text-blue-300 rotate-0
                  transition-all"
              />
            )}
          </div>
          {user && (
            <Button
              onClick={logout}
              variant="link"
              className="hover:no-underline sm:pr-12"
            >
              Log out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

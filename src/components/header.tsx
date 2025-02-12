import React from "react";
import { Moon, Sun, CalendarCheck } from "lucide-react";
import { useTheme } from "@/context/theme-provider";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-0 sm:py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <CalendarCheck className="h-6 w-6 text-blue-300" />
          <h1 className="text-lg font-bold">Todo App</h1>
        </div>
        <div className="flex gap-4">
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-200 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-300 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

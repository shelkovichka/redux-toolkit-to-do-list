import {FC, type PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import {Github} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import {selectAuthUser} from '@/redux/selectors/auth-selectors';
import AddTask from '@/components/add-task';

const Layout: FC<PropsWithChildren> = ({children}) => {
  const user = useSelector(selectAuthUser);

  return (
    <div
      className="bg-gradient-to-br from-background to-muted h-screen
       flex flex-col overflow-hidden"
    >
      <div className="flex flex-grow overflow-hidden">
        {user && (
          <aside className="flex-[1_0_15%] hidden md:block">
            <Sidebar />
          </aside>
        )}
        <div className="w-full flex flex-col">
          <Header />
          <main className="flex-grow overflow-auto">{children}</main>
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
      <footer className="w-full border-t">
        <div className="flex h-12 px-8 md:px-10 text-gray-400 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/shelkovichka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Github className="size-5" />
                  <span>shelkovichka</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hi!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

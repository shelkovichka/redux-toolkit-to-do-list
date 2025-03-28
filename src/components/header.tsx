import {LogOut, Moon, Sun} from 'lucide-react';
import {useSelector} from 'react-redux';

import {useTheme} from '@/theme/use-theme';
import {useAuth} from '@/hooks/use-auth';
import {selectAuthUser} from '@/redux/selectors/auth-selectors';
import {Button} from '@/components/ui/button';
import MobileMenu from '@/components/mobile-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Header = () => {
  const {theme, setTheme} = useTheme();
  const {logout} = useAuth();
  const isDark = theme === 'dark';

  const user = useSelector(selectAuthUser);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95
        backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div
        className="px-8 flex h-14 items-center
          justify-between w-full"
      >
        <MobileMenu />
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className={`
                    flex items-center cursor-pointer 
                    transition-transform duration-500 
                    ${isDark ? 'rotate-180' : 'rotate-0'}
                  `}
                >
                  {isDark ? (
                    <Sun className="text-yellow-200 rotate-0 transition-all" />
                  ) : (
                    <Moon className="text-blue-300 rotate-0 transition-all" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isDark ? 'Light' : 'Dark'} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {user && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={logout}
                    variant="link"
                    className="hover:no-underline"
                  >
                    <LogOut strokeWidth={2} className="scale-125" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

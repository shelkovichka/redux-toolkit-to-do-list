import {LogOut, Moon, Sun} from 'lucide-react';
import {useSelector} from 'react-redux';

import {useTheme} from '@/theme/use-theme';
import {useAuth} from '@/hooks/use-auth';
import {selectAuthUser} from '@/redux/selectors/auth-selectors';
import {Button} from '@/components/ui/button';
import MobileMenu from '@/components/mobile-menu';

const Header = () => {
  const {theme, setTheme} = useTheme();
  const {logout} = useAuth();

  const isDark = theme === 'dark';
  const user = useSelector(selectAuthUser);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95
        backdrop-blur py-0 md:py-2 supports-[backdrop-filter]:bg-background/60"
    >
      <div
        className="container mx-auto px-4 flex h-14 items-center
          justify-between md:justify-end"
      >
        <MobileMenu />
        <div className="flex gap-2">
          <div
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center cursor-pointer transition-transform 
              duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
          >
            {isDark ? (
              <Sun className="text-yellow-200 rotate-0 transition-all" />
            ) : (
              <Moon className="text-blue-300 rotate-0 transition-all" />
            )}
          </div>
          {user && (
            <Button
              onClick={logout}
              variant="link"
              className="hover:no-underline sm:pr-12"
            >
              <LogOut strokeWidth={2} className="scale-125" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

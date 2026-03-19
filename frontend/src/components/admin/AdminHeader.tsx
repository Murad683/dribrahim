import { useLocation } from 'react-router-dom';
import { LogOut, Menu, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/profile': 'Profile Manager',
  '/admin/services': 'Services Manager',
  '/admin/cases': 'Cases Manager',
  '/admin/settings': 'Settings',
};

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || 'Admin';

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="h-11 w-11 shrink-0 lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation</span>
        </Button>

        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-slate-900 font-display sm:text-lg">
            {pageTitle}
          </h2>
          <p className="text-xs text-slate-400 lg:hidden">Admin Panel</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Admin Badge */}
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
            <Shield className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-600">{user?.username || 'Admin'}</span>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 sm:hidden">
          <Shield className="h-4 w-4 text-blue-600" />
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          className="h-11 w-11 text-slate-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-500 sm:w-auto sm:px-4"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}

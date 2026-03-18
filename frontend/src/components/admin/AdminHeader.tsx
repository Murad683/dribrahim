import { useLocation } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/profile': 'Profile Manager',
  '/admin/services': 'Services Manager',
  '/admin/cases': 'Cases Manager',
  '/admin/settings': 'Settings',
};

export function AdminHeader() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || 'Admin';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 font-display">{pageTitle}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Admin Badge */}
        <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 border border-slate-200">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
            <Shield className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-600">{user?.username || 'Admin'}</span>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="gap-2 text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}

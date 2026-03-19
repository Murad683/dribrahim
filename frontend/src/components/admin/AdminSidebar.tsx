import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import {
  ExternalLink,
  Images,
  LayoutDashboard,
  Settings,
  Stethoscope,
  User,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AdminNavItem = {
  to: string;
  icon: typeof LayoutDashboard;
  label: string;
  end?: boolean;
};

const navItems: AdminNavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/profile', icon: User, label: 'Profile' },
  { to: '/admin/services', icon: Stethoscope, label: 'Services' },
  { to: '/admin/cases', icon: Images, label: 'Cases' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navLinkClassName = (isActive: boolean) =>
  cn(
    'flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/5'
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
  );

function SidebarBrand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
        <Stethoscope className="h-5 w-5 text-white" />
      </div>
      <div>
        <h1 className="text-sm font-semibold text-slate-900 font-display">Dr. Ibrahim</h1>
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Admin Panel</p>
      </div>
    </div>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) => navLinkClassName(isActive)}
          >
            <item.icon className="h-[18px] w-[18px] shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 px-3 py-3">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-50 hover:text-slate-600"
        >
          <ExternalLink className="h-[18px] w-[18px] shrink-0" />
          <span>Back to Site</span>
        </Link>
      </div>
    </>
  );
}

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="border-b border-slate-100 px-6 py-5">
          <SidebarBrand />
        </div>
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              onClick={onClose}
              className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,86vw)] flex-col border-r border-slate-200 bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
                <SidebarBrand />

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <SidebarContent onNavigate={onClose} />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

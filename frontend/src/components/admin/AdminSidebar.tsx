import { Link, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Stethoscope,
  Images,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/profile', icon: User, label: 'Profile' },
  { to: '/admin/services', icon: Stethoscope, label: 'Services' },
  { to: '/admin/cases', icon: Images, label: 'Cases' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
          <Stethoscope className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-slate-900 font-display">Dr. Ibrahim</h1>
          <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/5'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              )
            }
          >
            <item.icon className="h-[18px] w-[18px]" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-100 px-3 py-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-50 hover:text-slate-600"
        >
          <ExternalLink className="h-[18px] w-[18px]" />
          <span>Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}

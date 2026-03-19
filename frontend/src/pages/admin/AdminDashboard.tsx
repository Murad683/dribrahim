import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Images,
  Users,
  Clock,
  TrendingUp,
  Wifi,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';

const stats = [
  {
    title: 'Total Services',
    value: '12',
    change: '+2 this month',
    icon: Stethoscope,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Treatment Cases',
    value: '48',
    change: '+5 this month',
    icon: Images,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Monthly Visitors',
    value: '1,234',
    change: '+12% increase',
    icon: Users,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    title: 'Avg. Response Time',
    value: '2.4h',
    change: '-30min improved',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function AdminDashboard() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await apiClient.get('/api/services');
        setIsLive(true);
      } catch {
        setIsLive(false);
      }
    };

    void checkBackend();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-display sm:text-2xl">Welcome back, Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Here's an overview of your dental platform.</p>
        </div>
        <Badge
          variant="secondary"
          className={
            isLive
              ? 'self-start border-emerald-100 bg-emerald-50 text-emerald-700 md:self-auto'
              : 'self-start border-amber-100 bg-amber-50 text-amber-700 md:self-auto'
          }
        >
          <Wifi className="h-3.5 w-3.5" />
          {isLive ? 'Live' : 'Offline'}
        </Badge>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="border-slate-200/80 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-[18px] w-[18px] ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 sm:text-[1.75rem]">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 sm:text-sm">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 font-display">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Edit Profile', href: '/admin/profile', icon: Users },
              { label: 'Add Service', href: '/admin/services', icon: Stethoscope },
              { label: 'Upload Case', href: '/admin/cases', icon: Images },
              { label: 'Update Hours', href: '/admin/settings', icon: Clock },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="flex min-h-11 items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

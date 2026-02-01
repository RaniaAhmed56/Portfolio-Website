import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Settings,
  LogOut,
  Menu,
  X,
  Code2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { toast } from 'sonner';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FolderKanban, label: 'Projects', path: '/dashboard/projects' },
  { icon: Plus, label: 'Add Project', path: '/dashboard/projects/new' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/signin');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-72 min-h-screen border-r border-slate-800/50 backdrop-blur-xl bg-slate-950/30">
          {/* Logo */}
          <div className="p-6 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                <p className="text-xs text-slate-400">Portfolio Manager</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <motion.button
                      onClick={() => navigate(item.path)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                          : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User & Sign Out */}
          <div className="p-4 border-t border-slate-800/50">
            <div className="px-4 py-3 rounded-xl bg-slate-900/50 mb-2">
              <p className="text-sm font-medium text-white truncate">
                {user?.email}
              </p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </motion.button>
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 30 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800/50 z-50 flex flex-col"
              >
                {/* Logo */}
                <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                      <p className="text-xs text-slate-400">Portfolio Manager</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                  <ul className="space-y-2">
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      const Icon = item.icon;

                      return (
                        <li key={item.path}>
                          <button
                            onClick={() => {
                              navigate(item.path);
                              setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* User & Sign Out */}
                <div className="p-4 border-t border-slate-800/50">
                  <div className="px-4 py-3 rounded-xl bg-slate-900/50 mb-2">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-slate-400">Admin</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-30 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/30">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

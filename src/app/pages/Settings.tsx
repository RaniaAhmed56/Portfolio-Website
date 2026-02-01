import { motion } from 'motion/react';
import { User, Mail, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Settings() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account settings</p>
      </motion.div>

      {/* Account Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-slate-400">Email</span>
              </div>
              <p className="text-white font-medium">{user?.email}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-slate-400">Role</span>
              </div>
              <p className="text-white font-medium">Administrator</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-slate-400">User ID</span>
              </div>
              <p className="text-white font-medium font-mono text-sm">{user?.id}</p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="p-6 rounded-2xl border border-blue-500/30 backdrop-blur-xl bg-blue-500/5">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            About Your Account
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            This is your admin account for managing your portfolio. You have full access to create, edit, and delete projects. 
            Your public portfolio is accessible to anyone, but the dashboard is protected and only accessible when you're signed in.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

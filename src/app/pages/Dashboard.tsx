import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FolderKanban, TrendingUp, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { API_BASE_URL } from '../../lib/supabase';
import { snakeToCamel } from '../../lib/utils-api';

export function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/`);

      if (response.ok) {
        const data = await response.json();
        const projects = Array.isArray(data) ? data : (data.results || data.projects || []);
        setProjectCount(projects.length || 0);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: FolderKanban,
      label: 'Total Projects',
      value: loading ? '...' : projectCount,
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: TrendingUp,
      label: 'Active',
      value: loading ? '...' : projectCount,
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Eye,
      label: 'Published',
      value: loading ? '...' : projectCount,
      color: 'from-cyan-600 to-teal-600',
      bgColor: 'bg-cyan-500/10',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here's your portfolio overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              />
              <div className={`relative p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl bg-slate-900/50 ${stat.bgColor}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.button
            onClick={() => navigate('/dashboard/projects/new')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white text-left group hover:shadow-2xl hover:shadow-blue-500/25 transition-all"
          >
            <Plus className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Add New Project</h3>
            <p className="text-blue-100 text-sm">Create and publish a new project</p>
          </motion.button>

          <motion.button
            onClick={() => navigate('/dashboard/projects')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl bg-slate-900/50 text-white text-left group hover:bg-slate-900/70 transition-all"
          >
            <FolderKanban className="w-8 h-8 mb-3 text-blue-400" />
            <h3 className="text-lg font-bold mb-1">Manage Projects</h3>
            <p className="text-slate-400 text-sm">Edit or delete existing projects</p>
          </motion.button>

          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl bg-slate-900/50 text-white text-left group hover:bg-slate-900/70 transition-all"
          >
            <Eye className="w-8 h-8 mb-3 text-purple-400" />
            <h3 className="text-lg font-bold mb-1">View Portfolio</h3>
            <p className="text-slate-400 text-sm">See your public portfolio page</p>
          </motion.button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
        <div className="p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Create Your First Project</h3>
                <p className="text-slate-400 text-sm">Click "Add New Project" to get started with your portfolio.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                <span className="text-slate-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Add Project Details</h3>
                <p className="text-slate-400 text-sm">Include images, descriptions, and links to showcase your work.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                <span className="text-slate-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Share Your Portfolio</h3>
                <p className="text-slate-400 text-sm">Your projects will appear on the public portfolio page.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Sparkles, Lock, Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { ProjectCard } from '../components/ProjectCard';
import { API_BASE_URL } from '../../lib/supabase';
import { snakeToCamel } from '../../lib/utils-api';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  description: string;
  images?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  demoUrl?: string;
}

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/`);

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      const projects = Array.isArray(data) ? data : (data.results || data.projects || []);
      const camelProjects = projects.map(snakeToCamel);
      console.log('Fetched projects:', camelProjects);
      setProjects(camelProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src="/logo.png" alt="Rania Logo" className="w-14 h-14 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-white">Rania Ahmed</h1>
                <p className="text-sm text-slate-400">Software Engineer</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signin')}
              className="px-4 py-2 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Admin
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Software Engineer
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Hi, I'm Rania Ahmed
            </h1>

            <p className="text-2xl lg:text-3xl font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-6">
              Software Engineer | Backend & AI Developer
            </p>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              I build scalable backend systems, intelligent solutions, and modern web applications with clean architecture.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all inline-flex items-center gap-2"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all font-medium"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              About Me
            </h2>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                I'm a Software Engineer specialized in Backend Development and Artificial Intelligence. I have a strong passion for building efficient, secure, and scalable systems, and turning complex ideas into practical solutions.
              </p>
              <p>
                I enjoy working on real-world projects that combine logic, data, and clean system design, and I always aim to write maintainable and high-quality code.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative z-10 py-20 lg:py-32 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Education
            </h2>
            <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Bachelor's Degree in Computers and Information
              </h3>
              <p className="text-blue-400 font-semibold mb-6">
                Faculty of Electronic Engineering – Menouf
              </p>
              <p className="text-slate-300 leading-relaxed">
                My studies focused on software development, data structures, databases, artificial intelligence, and system design, with hands-on academic and practical projects.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 py-20 lg:py-32 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16 text-center">
              Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Backend Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-4">Backend Development</h3>
                <ul className="space-y-3 text-slate-300">
                  {['Python (Django)', 'REST APIs', 'Authentication & Authorization', 'Database Design', 'CRUD Operations', 'Clean Architecture'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Databases */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-purple-400 mb-4">Databases</h3>
                <ul className="space-y-3 text-slate-300">
                  {['MySQL', 'Database Modeling', 'Query Optimization'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* AI & Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-pink-400 mb-4">AI & Data</h3>
                <ul className="space-y-3 text-slate-300">
                  {['Machine Learning Basics', 'Data Preprocessing', 'Classification & Regression', 'Model Evaluation'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Frontend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Frontend (Supportive)</h3>
                <ul className="space-y-3 text-slate-300">
                  {['HTML', 'CSS', 'JavaScript', 'Basic UI Integration','react.js','Bootstrap','Tailwind CSS'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tools & Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-green-400 mb-4">Tools & Technologies</h3>
                <ul className="space-y-3 text-slate-300">
                  {['Git & GitHub', 'VS Code', 'Postman', 'Figma (UI understanding)'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Soft Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-4">Soft Skills</h3>
                <ul className="space-y-3 text-slate-300">
                  {['Problem Solving', 'Analytical Thinking', 'Continuous Learning', 'Time Management', 'Team Collaboration', 'Attention to Detail'].map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative z-10 py-20 lg:py-32 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Experience
            </h2>
            <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
              <p className="text-slate-300 leading-relaxed mb-6">
                I worked on multiple academic and personal projects involving backend systems, machine learning models, and full applications.
              </p>
              <p className="text-slate-400 font-semibold mb-4">I gained hands-on experience in:</p>
              <ul className="space-y-3 text-slate-300">
                {[
                  'Building backend APIs from scratch',
                  'Designing databases and data flows',
                  'Implementing authentication systems',
                  'Developing AI models for classification and prediction',
                  'Debugging, testing, and optimizing applications'
                ].map((exp) => (
                  <li key={exp} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                    {exp}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Training & Certifications Section */}
      <section className="relative z-10 py-20 lg:py-32 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Training & Certifications
            </h2>
            <div className="space-y-4">
              {[
                'Backend Development Training',
                'Artificial Intelligence & Machine Learning Training',
                'Hands-on projects in software development and data analysis'
              ].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-lg"
                >
                  <Sparkles className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-slate-300">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="relative z-10 py-20 lg:py-32 border-t border-slate-800/50" id="projects">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Here are some of the projects I've worked on. Each project reflects my approach to problem-solving, system design, and clean implementation.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900/50 border border-slate-800 mb-6">
                <Code2 className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Projects Yet</h3>
              <p className="text-slate-400 mb-6">This portfolio is just getting started!</p>
              <motion.button
                onClick={() => navigate('/signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all inline-flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Set Up Admin Account
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-20 lg:py-32 border-t border-slate-800/50" id="contact">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              I'm always open to new opportunities, collaborations, and challenging projects. Feel free to reach out.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href="mailto:raniaahmed200156@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ranya-ahmed-222334354/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all font-medium inline-flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </motion.a>
              <motion.a
                href="https://github.com/RaniaAhmed56"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all font-medium inline-flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
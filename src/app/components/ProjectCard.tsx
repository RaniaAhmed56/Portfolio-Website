import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: string;
  name: string;
  description: string;
  images?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  demoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export function ProjectCard({ project, onEdit, onDelete, isAdmin = false }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = project.images || [];
  const hasImages = images.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/50 shadow-2xl">
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 40%)',
          }}
        />

        {/* Image Gallery */}
        {hasImages && (
          <div className="relative h-64 overflow-hidden">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={images[currentImageIndex]}
                alt={`${project.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Image navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-blue-500 w-6'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 relative z-10">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-slate-300 mb-6 line-clamp-3">{project.description}</p>

          {/* Links */}
          <div className="flex gap-3 mb-4">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all"
                title="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {project.linkedinUrl && (
              <motion.a
                href={project.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all"
                title="View on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/25"
                title="View Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>

          {/* Admin actions */}
          {isAdmin && (
            <div className="flex gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={onEdit}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #a855f7, #06b6d4, #3b82f6)',
            backgroundSize: '300% 300%',
            opacity: isHovered ? 0.3 : 0,
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, ExternalLink, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'featured', 'web', 'mobile', 'desktop'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success && data.data) {
        // Parse technologies from JSON string and sort by featured first, then by order
        const parsedProjects = data.data.map((project: any) => ({
          ...project,
          technologies: typeof project.technologies === 'string' 
            ? JSON.parse(project.technologies) 
            : project.technologies
        })).sort((a: any, b: any) => {
          // Featured projects first, then by order
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (a.order || 0) - (b.order || 0);
        });
        
        setProjects(parsedProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = () => {
    if (activeCategory === 'all') return projects;
    if (activeCategory === 'featured') return projects.filter(project => project.featured);
    return projects.filter(project => project.category === activeCategory);
  };

  return (
    <div className="min-h-screen bg-primary-black text-white">
      <Navbar />
      
      {/* Header */}
      <div className="border-b border-gray-700 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-primary-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4">
              All <span className="gradient-gold">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Comprehensive collection of my work across different technologies and domains.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium capitalize transition-all ${
                activeCategory === category
                  ? 'bg-primary-gold text-primary-black'
                  : 'bg-card text-gray-300 hover:bg-primary-gold hover:text-primary-black border border-border hover:border-primary-gold'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-400">Loading projects...</div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredProjects().map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary-gold transition-all duration-300 card-hover">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-gold/20 to-primary-dark-gold/20 flex items-center justify-center">
                        <div className="text-4xl">🖥️</div>
                      </div>
                    )}
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-full bg-primary-gold text-primary-black hover:bg-primary-dark-gold transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-full bg-card text-white hover:bg-gray-700 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-gold transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs bg-primary-gold text-primary-black rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 mb-4">
                      {project.description}
                    </p>
                    
                    {project.longDescription && (
                      <p className="text-gray-500 text-sm mb-4">
                        {project.longDescription}
                      </p>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-background rounded-full text-gray-300 border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-4 bg-primary-gold text-primary-black rounded-lg font-medium text-center hover:bg-primary-dark-gold transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-4 border border-border text-gray-300 rounded-lg font-medium text-center hover:border-primary-gold hover:text-primary-gold transition-colors flex items-center justify-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

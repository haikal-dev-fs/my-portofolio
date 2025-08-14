'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Fallback projects data
  const fallbackProjects: Project[] = [
    {
      id: '1',
      title: 'Fleet Management System',
      description: 'A comprehensive fleet management system for mining operations with real-time monitoring and reporting capabilities.',
      technologies: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Bootstrap'],
      liveUrl: '',
      githubUrl: '',
    },
    {
      id: '2',
      title: 'Company Website Migration',
      description: 'Successfully migrated PT Polytama Propindo website to modern platform with improved functionality.',
      technologies: ['Laravel', 'PHP', 'Bootstrap', 'PostgreSQL', 'JavaScript'],
      liveUrl: '',
      githubUrl: '',
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'Modern and responsive portfolio website built with Next.js and Tailwind CSS.',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
      liveUrl: '',
      githubUrl: '',
    }
  ];

  useEffect(() => {
    setMounted(true);
    // Start with fallback data
    setProjects([...fallbackProjects]);
    setLoading(false);
    
    // Then try to fetch from API
    const timeoutId = setTimeout(() => {
      fetchProjects();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const fetchProjects = async () => {
    try {
      if (typeof window === 'undefined') return;
      
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (data && data.success && data.data && Array.isArray(data.data)) {
        const parsedProjects = data.data.map((project: any) => ({
          ...project,
          technologies: Array.isArray(project.technologies) 
            ? project.technologies 
            : (typeof project.technologies === 'string' 
               ? JSON.parse(project.technologies || '[]') 
               : [])
        }));
        
        if (parsedProjects.length > 0) {
          setProjects(parsedProjects);
        }
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      // Keep fallback data on error
    }
  };

  if (!mounted) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-8"></div>
          </div>
        </div>
      </section>
    );
  }

  // Ensure projects is always an array
  const safeProjects = Array.isArray(projects) ? projects : fallbackProjects;

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
            Featured <span className="gradient-gold">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing my recent work in full-stack development and project management
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary-gold transition-all duration-300 card-hover"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, techIndex) => (
                    <span
                      key={`${tech}-${techIndex}`}
                      className="px-3 py-1 text-sm bg-primary-gold/10 text-primary-gold rounded-full border border-primary-gold/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-gold hover:text-yellow-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="flex justify-center mt-12">
          <a
            href="/projects"
            className="inline-block px-8 py-3 rounded-full bg-primary-gold text-primary-black font-semibold text-lg shadow-lg hover:bg-primary-dark-gold transition-colors"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

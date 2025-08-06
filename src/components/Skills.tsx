'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Frontend: 'from-blue-400 to-blue-600',
      Backend: 'from-green-400 to-green-600',
      Database: 'from-purple-400 to-purple-600',
      Tools: 'from-orange-400 to-orange-600',
      Management: 'from-red-400 to-red-600',
      Mobile: 'from-pink-400 to-pink-600',
    };
    return colors[category] || 'from-gray-400 to-gray-600';
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
            <div className="animate-pulse">Loading skills...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills by Category */}
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {skill.name}
                      </h4>
                      <span className="text-sm font-medium text-gray-600">
                        {skill.level}/5
                      </span>
                    </div>
                    
                    {/* Skill Level Bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Always Learning
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Technology evolves rapidly, and I&apos;m committed to continuous learning. 
              I regularly explore new frameworks, tools, and best practices to stay 
              current with industry trends and deliver the best solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

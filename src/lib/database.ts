import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'portfolio.db');

interface Project {
  id?: number;
  title: string;
  description: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies: string;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  icon?: string;
  created_at: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  current: boolean;
  created_at: string;
}

interface About {
  id: number;
  name?: string;
  title?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  profile_image?: string;
  resume_url?: string;
  updated_at: string;
}

// Initialize database connection
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeTables();
  }
});

// Initialize database tables
function initializeTables() {
  // Projects table
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      demo_url TEXT,
      github_url TEXT,
      technologies TEXT,
      featured BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Skills table
  db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      level INTEGER DEFAULT 1,
      icon TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Experiences table
  db.run(`
    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      position TEXT NOT NULL,
      description TEXT,
      start_date DATE,
      end_date DATE,
      current BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // About table
  db.run(`
    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      title TEXT,
      bio TEXT,
      email TEXT,
      phone TEXT,
      location TEXT,
      profile_image TEXT,
      resume_url TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default data if tables are empty
  insertDefaultData();
}

function insertDefaultData() {
  // Check if about data exists, if not insert default
  db.get('SELECT COUNT(*) as count FROM about', (err, row: { count: number } | undefined) => {
    if (!err && row && row.count === 0) {
      db.run(`
        INSERT INTO about (name, title, bio, email, phone, location) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        'Haikal Alfandi',
        'Fullstack Engineer & Project Manager',
        'Passionate fullstack engineer and project manager with extensive experience in modern web technologies, agile methodologies, and team leadership.',
        'mhaikalas@gmail.com',
        '+62 123 456 7890',
        'Indonesia'
      ]);
    }
  });

  // Insert sample projects
  db.get('SELECT COUNT(*) as count FROM projects', (err, row: { count: number } | undefined) => {
    if (!err && row && row.count === 0) {
      const sampleProjects = [
        {
          title: 'Portfolio Website',
          description: 'Responsive portfolio website built with Next.js and TypeScript, featuring modern design and admin panel for content management.',
          technologies: 'Next.js,TypeScript,Tailwind CSS,SQLite',
          demo_url: 'http://localhost:3002',
          github_url: 'https://github.com/haikalalfandi/portfolio',
          image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'E-Commerce Platform',
          description: 'Full-stack e-commerce solution with payment integration, inventory management, and real-time order tracking.',
          technologies: 'React,Node.js,MongoDB,Stripe',
          demo_url: '',
          github_url: 'https://github.com/haikalalfandi/ecommerce',
          image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          featured: true
        },
        {
          title: 'Task Management System',
          description: 'Collaborative task management application with real-time updates, file sharing, and team communication features.',
          technologies: 'Vue.js,Express.js,MySQL,Socket.io',
          demo_url: '',
          github_url: 'https://github.com/haikalalfandi/taskmanager',
          image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          featured: false
        }
      ];

      sampleProjects.forEach(project => {
        db.run(`
          INSERT INTO projects (title, description, technologies, demo_url, github_url, image_url, featured) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [project.title, project.description, project.technologies, project.demo_url, project.github_url, project.image_url, project.featured]);
      });
    }
  });

  // Insert sample skills
  db.get('SELECT COUNT(*) as count FROM skills', (err, row: { count: number } | undefined) => {
    if (!err && row && row.count === 0) {
      const sampleSkills = [
        // Frontend Technologies
        { name: 'JavaScript', category: 'Frontend', level: 5 },
        { name: 'React', category: 'Frontend', level: 5 },
        { name: 'Vue.js', category: 'Frontend', level: 4 },
        { name: 'Next.js', category: 'Frontend', level: 5 },
        
        // Backend Technologies
        { name: 'Node.js', category: 'Backend', level: 5 },
        { name: 'PHP', category: 'Backend', level: 5 },
        { name: 'Laravel', category: 'Backend', level: 5 },
        { name: 'Lumen', category: 'Backend', level: 4 },
        
        // Database Technologies
        { name: 'MySQL', category: 'Database', level: 5 },
        { name: 'PostgreSQL', category: 'Database', level: 4 },
        { name: 'MongoDB', category: 'Database', level: 4 },
        { name: 'Firebase', category: 'Database', level: 4 },
        { name: 'NoSQL', category: 'Database', level: 4 },
        
        // Development Tools
        { name: 'Git', category: 'Tools', level: 5 },
        { name: 'VS Code', category: 'Tools', level: 5 },
        
        // Management & Methodologies
        { name: 'Agile Methodologies', category: 'Management', level: 5 },
        { name: 'Trello', category: 'Management', level: 4 }
      ];

      sampleSkills.forEach(skill => {
        db.run(`
          INSERT INTO skills (name, category, level) 
          VALUES (?, ?, ?)
        `, [skill.name, skill.category, skill.level]);
      });
    }
  });
}

// Database helper functions
export const dbHelpers = {
  // Get all projects
  getProjects: (): Promise<Project[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else {
          const projects = (rows as any[]).map(row => ({
            ...row,
            image_url: row.image_url || '',
            demo_url: row.demo_url || '',
            github_url: row.github_url || ''
          }));
          resolve(projects as Project[]);
        }
      });
    });
  },

  // Get featured projects
  getFeaturedProjects: (): Promise<Project[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else {
          const projects = (rows as any[]).map(row => ({
            ...row,
            image_url: row.image_url || '',
            demo_url: row.demo_url || '',
            github_url: row.github_url || ''
          }));
          resolve(projects as Project[]);
        }
      });
    });
  },

  // Get all skills grouped by category
  getSkills: (): Promise<Skill[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM skills ORDER BY category, level DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Skill[]);
      });
    });
  },

  // Get experiences
  getExperiences: (): Promise<Experience[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM experiences ORDER BY start_date DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Experience[]);
      });
    });
  },

  // Get about info
  getAbout: (): Promise<About | undefined> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM about LIMIT 1', (err, row: any) => {
        if (err) reject(err);
        else {
          if (row) {
            const about = {
              ...row,
              name: row.name || '',
              title: row.title || '',
              bio: row.bio || '',
              email: row.email || '',
              phone: row.phone || '',
              location: row.location || '',
              profile_image: row.profile_image || '',
              resume_url: row.resume_url || ''
            };
            resolve(about as About);
          } else {
            resolve(undefined);
          }
        }
      });
    });
  },

  // Add project
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<void> => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO projects (title, description, image_url, demo_url, github_url, technologies, featured) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      db.run(sql, [
        project.title,
        project.description,
        project.image_url,
        project.demo_url,
        project.github_url,
        project.technologies,
        project.featured
      ], function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  // Update project
  updateProject: (id: number, project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<void> => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE projects 
        SET title = ?, description = ?, image_url = ?, demo_url = ?, github_url = ?, technologies = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      db.run(sql, [
        project.title,
        project.description,
        project.image_url,
        project.demo_url,
        project.github_url,
        project.technologies,
        project.featured,
        id
      ], function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  // Delete project
  deleteProject: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  // Update about info
  updateAbout: (about: Omit<About, 'id' | 'updated_at'>): Promise<void> => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE about 
        SET name = ?, title = ?, bio = ?, email = ?, phone = ?, location = ?, profile_image = ?, resume_url = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `;
      db.run(sql, [
        about.name,
        about.title,
        about.bio,
        about.email,
        about.phone,
        about.location,
        about.profile_image,
        about.resume_url
      ], function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};

export default db;

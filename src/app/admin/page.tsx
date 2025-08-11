'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already authenticated
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        // If we can access profile API, assume authenticated
        const cookies = document.cookie;
        if (cookies.includes('admin-auth=authenticated')) {
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.log('Not authenticated');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (error) {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { 
        method: 'DELETE',
        credentials: 'include'
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-card p-8 rounded-2xl border border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary-black" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
              <p className="text-gray-400">Enter password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white pr-12"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-primary-gold text-primary-black font-semibold rounded-lg hover:bg-primary-dark-gold transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-black/30 border-t-primary-black rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

// Admin Dashboard Component
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects'>('profile');
  
  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: '👤' },
    { id: 'projects', label: 'Project Management', icon: '💼' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-gold rounded-lg flex items-center justify-center font-bold text-primary-black">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-sm text-gray-400">Portfolio Management</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'profile' | 'projects')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-gold text-primary-black'
                      : 'bg-card hover:bg-primary-gold/10 text-gray-300 hover:text-primary-gold border border-border'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && <ProfileEditor />}
              {activeTab === 'projects' && <ProjectManager />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Editor Component
function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    skills: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      if (data.success) {
        const profileData = data.data;
        setProfile({
          ...profileData,
          skills: profileData.skills ? JSON.parse(profileData.skills) : []
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillAdd = (skill: string) => {
    if (skill.trim() && !profile.skills.includes(skill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border">
      <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
      
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-6 ${
            message.includes('successfully')
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Job Title
            </label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Bio
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
            className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white resize-none"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Phone
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={profile.linkedinUrl}
              onChange={(e) => setProfile(prev => ({ ...prev, linkedinUrl: e.target.value }))}
              className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              GitHub URL
            </label>
            <input
              type="url"
              value={profile.githubUrl}
              onChange={(e) => setProfile(prev => ({ ...prev, githubUrl: e.target.value }))}
              className="w-full p-4 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Skills
          </label>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                className="flex-1 p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none transition-colors text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSkillAdd(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  const input = (e.target as HTMLButtonElement).parentElement?.querySelector('input');
                  if (input) {
                    handleSkillAdd(input.value);
                    input.value = '';
                  }
                }}
                className="px-4 py-3 bg-primary-gold text-primary-black rounded-lg hover:bg-primary-dark-gold transition-colors font-medium"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 bg-primary-gold/10 text-primary-gold rounded-full text-sm border border-primary-gold/20 flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="w-4 h-4 rounded-full bg-primary-gold/20 hover:bg-red-500/20 hover:text-red-400 transition-colors flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CV Upload Section */}
        <CVUploadSection />

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 bg-primary-gold text-primary-black font-semibold rounded-lg hover:bg-primary-dark-gold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Profile'}
        </motion.button>
      </form>
    </div>
  );
}

// CV Upload Component
function CVUploadSection() {
  const [currentCV, setCurrentCV] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if there's an existing CV
    checkExistingCV();
  }, []);

  const checkExistingCV = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      if (data.success && data.data.resumeUrl) {
        setCurrentCV(data.data.resumeUrl);
      }
    } catch (error) {
      console.error('Failed to check existing CV:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.type !== 'application/pdf') {
      setMessage('Only PDF files are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setMessage('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('cv', file);

      const response = await fetch('/api/cv', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setCurrentCV(result.data.url);
        setMessage('CV uploaded successfully!');
        
        // Update profile with new CV URL
        await updateProfileCV(result.data.url);
      } else {
        setMessage(result.message || 'Failed to upload CV');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Failed to upload CV');
    } finally {
      setUploading(false);
      // Reset file input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const updateProfileCV = async (cvUrl: string) => {
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ resumeUrl: cvUrl }),
      });
    } catch (error) {
      console.error('Failed to update profile with CV URL:', error);
    }
  };

  const handleDeleteCV = async () => {
    if (!confirm('Are you sure you want to delete your CV? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/cv', {
        method: 'DELETE',
        credentials: 'include',
      });

      const result = await response.json();
      
      if (result.success) {
        setCurrentCV(null);
        setMessage('CV deleted successfully');
        
        // Update profile to remove CV URL
        await updateProfileCV('');
      } else {
        setMessage(result.message || 'Failed to delete CV');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('Failed to delete CV');
    }
  };

  return (
    <div className="border-t border-border pt-6 mt-6">
      <h3 className="text-lg font-semibold text-white mb-4">CV/Resume</h3>
      
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-lg mb-4 text-sm ${
            message.includes('successfully')
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {message}
        </motion.div>
      )}

      <div className="space-y-4">
        {currentCV ? (
          <div className="bg-background p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <span className="text-red-400 text-sm font-mono">PDF</span>
                </div>
                <div>
                  <p className="text-white font-medium">Current CV</p>
                  <p className="text-gray-400 text-sm">Uploaded PDF file</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={currentCV}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-primary-gold/10 text-primary-gold rounded-lg hover:bg-primary-gold/20 transition-colors text-sm"
                >
                  View
                </a>
                <button
                  onClick={handleDeleteCV}
                  className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary-gold/10 flex items-center justify-center">
              <span className="text-primary-gold text-xl">📄</span>
            </div>
            <p className="text-gray-400 mb-4">No CV uploaded yet</p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                uploading
                  ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-gold text-primary-black hover:bg-primary-dark-gold'
              }`}>
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-black/30 border-t-primary-black rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    📤 Upload CV (PDF only, max 5MB)
                  </>
                )}
              </span>
            </label>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>• Only PDF files are supported</p>
          <p>• Maximum file size: 5MB</p>
          <p>• Uploading a new CV will replace the existing one</p>
        </div>
      </div>
    </div>
  );
}

// Project Manager Component
function ProjectManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    technologies: '',
    category: 'web',
    status: 'completed',
    demoUrl: '',
    githubUrl: '',
    imageUrl: '',
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success && data.data) {
        setProjects(data.data);
      } else {
        setProjects([]);
        setError(data.message || 'Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      setError('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingProject ? 'PUT' : 'POST';
      const url = editingProject ? '/api/projects' : '/api/projects';
      
      const payload: Record<string, any> = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()),
      };
      
      if (editingProject) {
        payload.id = editingProject.id;
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        fetchProjects();
        resetForm();
        setShowForm(false);
      } else {
        console.error('Error saving project:', result.message);
        setError(result.message || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setError('Failed to save project');
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    let technologiesStr = '';
    if (project.technologies) {
      try {
        const techArray = JSON.parse(project.technologies);
        technologiesStr = Array.isArray(techArray) ? techArray.join(', ') : project.technologies;
      } catch {
        technologiesStr = project.technologies;
      }
    }
    
    setFormData({
      title: project.title || '',
      description: project.description || '',
      longDescription: project.longDescription || '',
      technologies: technologiesStr,
      category: project.category || 'web',
      status: project.status || 'completed',
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      imageUrl: project.imageUrl || '',
      featured: project.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects?id=${id}`, { 
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      technologies: '',
      category: 'web',
      status: 'completed',
      demoUrl: '',
      githubUrl: '',
      imageUrl: '',
      featured: false
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const categories = [
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'desktop', label: 'Desktop App' },
    { value: 'api', label: 'API/Backend' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'planned', label: 'Planned' }
  ];

  if (isLoading) {
    return (
      <div className="bg-card p-8 rounded-2xl border border-border">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Project Management</h2>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-primary-gold text-primary-black font-semibold rounded-lg hover:bg-primary-dark-gold transition-colors flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Add Project
        </motion.button>
      </div>

      {/* Project Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-6 rounded-2xl border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none text-white"
                placeholder="Project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none text-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none text-white h-24 resize-none"
                placeholder="Brief description of the project"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Detailed Description
              </label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none text-white h-32 resize-none"
                placeholder="Detailed description, features, challenges, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies *
              </label>
              <input
                type="text"
                required
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none text-white"
                placeholder="React, Node.js, MongoDB (comma separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none text-white"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Demo URL
              </label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none text-white"
                placeholder="https://demo.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary-gold focus:outline-none text-white"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="md:col-span-2">
              <ProjectImageUpload 
                projectId={editingProject?.id}
                currentImageUrl={formData.imageUrl}
                onImageUploaded={(imageUrl) => setFormData({ ...formData, imageUrl })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 bg-background border border-border rounded focus:border-primary-gold focus:outline-none"
                />
                <span className="text-gray-300">Featured Project</span>
              </label>
            </div>

            <div className="md:col-span-2 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-primary-gold text-primary-black font-semibold rounded-lg hover:bg-primary-dark-gold transition-colors"
              >
                {editingProject ? 'Update Project' : 'Create Project'}
              </motion.button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="bg-card p-6 rounded-2xl border border-border">
        <h3 className="text-xl font-bold text-white mb-6">
          Projects ({projects?.length || 0})
        </h3>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchProjects}
              className="mt-2 px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {!projects || projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h4 className="text-lg font-semibold text-gray-300 mb-2">No Projects Yet</h4>
            <p className="text-gray-400">Create your first project to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(projects || []).map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background p-4 rounded-lg border border-border hover:border-primary-gold/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                      {project.featured && (
                        <span className="px-2 py-1 bg-primary-gold/20 text-primary-gold text-xs rounded-full">
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {Array.isArray(project.technologies) && project.technologies.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-border/50 text-gray-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Category: {project.category}</span>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-gold hover:underline"
                        >
                          Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-gold hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-3 py-2 bg-primary-gold/10 text-primary-gold rounded hover:bg-primary-gold/20 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-3 py-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Project Image Upload Component
function ProjectImageUpload({ 
  projectId, 
  currentImageUrl, 
  onImageUploaded 
}: { 
  projectId?: string;
  currentImageUrl: string;
  onImageUploaded: (imageUrl: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('projectId', projectId || 'temp-' + Date.now());

      const response = await fetch('/api/projects/image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onImageUploaded(data.imageUrl);
      } else {
        alert(data.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeImage = async () => {
    if (!projectId) {
      onImageUploaded('');
      return;
    }

    try {
      const response = await fetch('/api/projects/image', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      });

      const data = await response.json();
      if (data.success) {
        onImageUploaded('');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Project Image
      </label>

      {currentImageUrl ? (
        <div className="bg-background p-4 rounded-lg border border-border">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src={currentImageUrl}
                alt="Project preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Current Image</p>
              <p className="text-gray-400 text-sm truncate">{currentImageUrl}</p>
            </div>
            <button
              type="button"
              onClick={removeImage}
              className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary-gold bg-primary-gold/5'
              : 'border-gray-600 hover:border-primary-gold/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-gold/10 flex items-center justify-center">
              <span className="text-2xl">🖼️</span>
            </div>

            <div>
              <p className="text-white font-medium mb-2">
                {isUploading ? 'Uploading...' : 'Upload Project Image'}
              </p>
              <p className="text-gray-400 text-sm">
                Drag and drop an image here, or click to select
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Supports JPEG, PNG, WebP (max 5MB)
              </p>
            </div>

            {isUploading && (
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-primary-gold h-2 rounded-full animate-pulse w-1/2"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

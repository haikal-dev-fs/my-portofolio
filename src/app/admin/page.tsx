'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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
      await fetch('/api/auth', { method: 'DELETE' });
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

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-sm text-gray-400">
                Hint: The password is <code className="bg-background px-2 py-1 rounded text-primary-gold">adminkal</code>
              </p>
            </div>
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

// Project Manager Component
function ProjectManager() {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border">
      <h2 className="text-2xl font-bold text-white mb-6">Project Management</h2>
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">Coming Soon</h3>
        <p className="text-gray-400">
          Project management features will be available in the next update.
        </p>
      </div>
    </div>
  );
}

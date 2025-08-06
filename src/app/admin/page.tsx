'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLogin from '@/components/AdminLogin';

interface Project {
  id?: number;
  title: string;
  description: string;
  image_url?: string | null;
  demo_url?: string | null;
  github_url?: string | null;
  technologies: string;
  featured: boolean;
}

interface AboutData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  profile_image: string;
  resume_url: string;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [aboutData, setAboutData] = useState<AboutData>({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    profile_image: '',
    resume_url: '',
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [editProjectImageFile, setEditProjectImageFile] = useState<File | null>(null);
  const [newProject, setNewProject] = useState<Project>({
    title: '',
    description: '',
    image_url: '',
    demo_url: '',
    github_url: '',
    technologies: '',
    featured: false,
  });

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchAboutData();
    }
  }, [isAuthenticated]);

  const checkAuthentication = async () => {
    try {
      // Check if admin session cookie exists
      const cookies = document.cookie.split(';');
      const hasSession = cookies.some(cookie => cookie.trim().startsWith('admin-session='));
      
      setIsAuthenticated(hasSession);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (password: string) => {
    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        const data = await response.json();
        setLoginError(data.error || 'Invalid password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Connection error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'DELETE',
      });
      setIsAuthenticated(false);
      // Clear any local state
      setProjects([]);
      setAboutData({
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        location: '',
        profile_image: '',
        resume_url: '',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about');
      if (response.ok) {
        const data = await response.json();
        setAboutData({
          name: data?.name || '',
          title: data?.title || '',
          bio: data?.bio || '',
          email: data?.email || '',
          phone: data?.phone || '',
          location: data?.location || '',
          profile_image: data?.profile_image || '',
          resume_url: data?.resume_url || '',
        });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const handleAddProject = async () => {
    try {
      let imageUrl = '';
      
      // Upload project image if selected
      if (projectImageFile) {
        const formData = new FormData();
        formData.append('image', projectImageFile);
        
        const uploadResponse = await fetch('/api/upload/project-image', {
          method: 'POST',
          body: formData,
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          imageUrl = uploadData.url;
        } else {
          alert('Error uploading project image');
          return;
        }
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProject,
          image_url: imageUrl,
        }),
      });

      if (response.ok) {
        setIsAddingProject(false);
        setProjectImageFile(null);
        setNewProject({
          title: '',
          description: '',
          image_url: '',
          demo_url: '',
          github_url: '',
          technologies: '',
          featured: false,
        });
        fetchProjects();
        alert('Project added successfully!');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project');
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject?.id) return;

    try {
      let imageUrl = editingProject.image_url || '';
      
      // Upload new project image if selected
      if (editProjectImageFile) {
        const formData = new FormData();
        formData.append('image', editProjectImageFile);
        
        const uploadResponse = await fetch('/api/upload/project-image', {
          method: 'POST',
          body: formData,
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          imageUrl = uploadData.url;
        } else {
          alert('Error uploading project image');
          return;
        }
      }

      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editingProject,
          image_url: imageUrl,
        }),
      });

      if (response.ok) {
        setEditingProject(null);
        setEditProjectImageFile(null);
        fetchProjects();
        alert('Project updated successfully!');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProjects();
        alert('Project deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  const handleUpdateAbout = async () => {
    try {
      let resumeUrl = aboutData.resume_url;
      
      // Upload resume file if selected
      if (resumeFile) {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        
        const uploadResponse = await fetch('/api/upload/resume', {
          method: 'POST',
          body: formData,
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          resumeUrl = uploadData.url;
        } else {
          alert('Error uploading resume file');
          return;
        }
      }

      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...aboutData,
          resume_url: resumeUrl,
        }),
      });

      if (response.ok) {
        // Update local state with new resume URL
        setAboutData({ ...aboutData, resume_url: resumeUrl });
        setResumeFile(null);
        alert('About information updated successfully!');
      }
    } catch (error) {
      console.error('Error updating about data:', error);
      alert('Error updating about information');
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLogin={handleLogin} 
        isLoading={loginLoading} 
        error={loginError} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Admin Panel</h1>
            <p className="text-gray-700 mt-2">Manage your portfolio content</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 text-gray-900 border-gray-300 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* About Section */}
        <Card className="mb-8 bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">About Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
                <input
                  type="text"
                  value={aboutData.name}
                  onChange={(e) => setAboutData({ ...aboutData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
                <input
                  type="text"
                  value={aboutData.title}
                  onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={aboutData.email}
                  onChange={(e) => setAboutData({ ...aboutData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                <input
                  type="text"
                  value={aboutData.phone}
                  onChange={(e) => setAboutData({ ...aboutData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                <input
                  type="text"
                  value={aboutData.location}
                  onChange={(e) => setAboutData({ ...aboutData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Profile Image URL</label>
                <input
                  type="url"
                  value={aboutData.profile_image}
                  onChange={(e) => setAboutData({ ...aboutData, profile_image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Bio</label>
              <textarea
                value={aboutData.bio}
                onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Resume/CV File</label>
              <div className="space-y-3">
                {/* Current Resume Display */}
                {aboutData.resume_url && !resumeFile && (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-800 font-medium">CV file uploaded</span>
                    </div>
                    <button
                      onClick={() => setAboutData({ ...aboutData, resume_url: '' })}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
                
                {/* File Upload */}
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload your resume/CV (PDF, DOC, DOCX - Max 5MB)
                  </p>
                </div>
                
                {/* Selected File Display */}
                {resumeFile && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 11-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-blue-800 font-medium">{resumeFile.name}</span>
                    </div>
                    <button
                      onClick={() => setResumeFile(null)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            <Button onClick={handleUpdateAbout} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Update About Information
            </Button>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-900">Projects</CardTitle>
            <Button
              onClick={() => setIsAddingProject(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            {/* Add Project Form */}
            {isAddingProject && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Add New Project</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Demo URL</label>
                    <input
                      type="url"
                      value={newProject.demo_url || ''}
                      onChange={(e) => setNewProject({ ...newProject, demo_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      value={newProject.github_url || ''}
                      onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Project Image</label>
                  <div className="space-y-3">
                    {/* File Upload */}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProjectImageFile(e.target.files?.[0] || null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Upload project image (JPG, PNG, WebP - Max 5MB)
                      </p>
                    </div>
                    
                    {/* Selected File Display */}
                    {projectImageFile && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-blue-800 font-medium">{projectImageFile.name}</span>
                          </div>
                          <button
                            onClick={() => setProjectImageFile(null)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                        
                        {/* Image Preview */}
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                          <img
                            src={URL.createObjectURL(projectImageFile)}
                            alt="Project preview"
                            className="w-full max-w-md h-32 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="flex items-center text-gray-900">
                    <input
                      type="checkbox"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                      className="mr-2"
                    />
                    Featured Project
                  </label>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddProject} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingProject(false);
                      setProjectImageFile(null);
                    }}
                    variant="outline"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  {editingProject?.id === project.id && editingProject ? (
                    // Edit Form
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Technologies</label>
                          <input
                            type="text"
                            value={editingProject.technologies}
                            onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Demo URL</label>
                          <input
                            type="url"
                            value={editingProject.demo_url || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, demo_url: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">GitHub URL</label>
                          <input
                            type="url"
                            value={editingProject.github_url || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                        <textarea
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-900 mb-2">Project Image</label>
                        <div className="space-y-3">
                          {/* Current Image Display */}
                          {editingProject.image_url && !editProjectImageFile && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center">
                                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-green-800 font-medium">Current project image</span>
                                </div>
                                <button
                                  onClick={() => setEditingProject({ ...editingProject, image_url: '' })}
                                  className="text-red-600 hover:text-red-800 font-medium"
                                >
                                  Remove
                                </button>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                                <img
                                  src={editingProject.image_url}
                                  alt="Current project image"
                                  className="w-full max-w-md h-32 object-cover rounded-lg border border-gray-200"
                                />
                              </div>
                            </div>
                          )}
                          
                          {/* File Upload */}
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setEditProjectImageFile(e.target.files?.[0] || null)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                              Upload new project image (JPG, PNG, WebP - Max 5MB)
                            </p>
                          </div>
                          
                          {/* Selected File Display */}
                          {editProjectImageFile && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center">
                                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-blue-800 font-medium">{editProjectImageFile.name}</span>
                                </div>
                                <button
                                  onClick={() => setEditProjectImageFile(null)}
                                  className="text-red-600 hover:text-red-800 font-medium"
                                >
                                  Remove
                                </button>
                              </div>
                              
                              {/* New Image Preview */}
                              <div>
                                <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
                                <img
                                  src={URL.createObjectURL(editProjectImageFile)}
                                  alt="New project preview"
                                  className="w-full max-w-md h-32 object-cover rounded-lg border border-gray-200"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="flex items-center text-gray-900">
                          <input
                            type="checkbox"
                            checked={editingProject.featured}
                            onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                            className="mr-2"
                          />
                          Featured Project
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateProject} className="bg-blue-600 hover:bg-blue-700">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingProject(null);
                            setEditProjectImageFile(null);
                          }}
                          variant="outline"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Display Project
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 flex-1">
                        {/* Project Image */}
                        {project.image_url && (
                          <div className="flex-shrink-0">
                            <img
                              src={project.image_url}
                              alt={project.title}
                              className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                            />
                          </div>
                        )}
                        
                        {/* Project Info */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                          <p className="text-gray-800 mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.split(',').map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {project.featured && (
                              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                Featured
                              </span>
                            )}
                            {project.demo_url && (
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                Has Demo
                              </span>
                            )}
                            {project.github_url && (
                              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                Has GitHub
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => setEditingProject({
                            ...project,
                            image_url: project.image_url || '',
                            demo_url: project.demo_url || '',
                            github_url: project.github_url || ''
                          })}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => project.id && handleDeleteProject(project.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;

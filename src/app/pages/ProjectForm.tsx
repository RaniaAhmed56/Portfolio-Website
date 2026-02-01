import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { Save, ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/lib/supabase';
import { snakeToCamel } from '@/lib/utils-api';
import { toast } from 'sonner';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';

interface ProjectFormData {
  name: string;
  description: string;
  images: string[];
  githubUrl: string;
  linkedinUrl: string;
  demoUrl: string;
}

export function ProjectForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    images: [],
    githubUrl: '',
    linkedinUrl: '',
    demoUrl: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetchingProject, setFetchingProject] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      fetchProject(id);
    }
  }, [isEdit, id]);

  const fetchProject = async (projectId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/`);

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      const projects = Array.isArray(data) ? data : (data.results || data.projects || []);
      const project = projects.find((p: any) => p.id === projectId);

      if (project) {
        const camelProject = snakeToCamel(project);
        setFormData({
          name: camelProject.name || '',
          description: camelProject.description || '',
          images: camelProject.images || [],
          githubUrl: camelProject.githubUrl || '',
          linkedinUrl: camelProject.linkedinUrl || '',
          demoUrl: camelProject.demoUrl || '',
        });
      } else {
        toast.error('Project not found');
        navigate('/dashboard/projects');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
    } finally {
      setFetchingProject(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    console.log(`Uploading ${files.length} images...`);
    setUploading(true);
    try {
      const savedSession = localStorage.getItem('auth_session');
      if (!savedSession) {
        toast.error('You must be signed in to upload images');
        return;
      }

      const session = JSON.parse(savedSession);
      const token = session.token;

      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formDataObj = new FormData();
        formDataObj.append('file', file);

        const response = await fetch(`${API_BASE_URL}/upload/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataObj,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
        console.log(`Uploaded: ${file.name}`);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      
      console.log(`Total images now: ${formData.images.length + uploadedUrls.length}`);
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Project description is required');
      return;
    }

    setLoading(true);
    try {
      const savedSession = localStorage.getItem('auth_session');
      if (!savedSession) {
        toast.error('You must be signed in');
        return;
      }

      const session = JSON.parse(savedSession);
      const token = session.token;

      const url = isEdit
        ? `${API_BASE_URL}/projects/${id}/`
        : `${API_BASE_URL}/projects/`;
      
      const method = isEdit ? 'PUT' : 'POST';

      // Convert camelCase to snake_case for Django backend
      const payload = {
        name: formData.name,
        description: formData.description,
        images: formData.images,
        github_url: formData.githubUrl,
        linkedin_url: formData.linkedinUrl,
        demo_url: formData.demoUrl,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      toast.success(isEdit ? 'Project updated successfully' : 'Project created successfully');
      navigate('/dashboard/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProject) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/dashboard/projects')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>
        <h1 className="text-4xl font-bold text-white mb-2">
          {isEdit ? 'Edit Project' : 'Add New Project'}
        </h1>
        <p className="text-slate-400">
          {isEdit ? 'Update your project details' : 'Create a new portfolio project'}
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="p-6 rounded-2xl border border-slate-800/50 backdrop-blur-xl bg-slate-900/30 space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
              required
              className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your project..."
              required
              rows={4}
              className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Images Upload */}
          <div className="space-y-2">
            <Label className="text-white">Project Images</Label>
            <div className="space-y-4">
              {/* Upload Button */}
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <div className="px-4 py-3 rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 transition-colors cursor-pointer text-center">
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <Upload className="w-5 h-5" />
                      <span>Click to upload images</span>
                    </div>
                  )}
                </div>
              </label>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GitHub URL */}
          <div className="space-y-2">
            <Label htmlFor="githubUrl" className="text-white">
              GitHub URL <span className="text-slate-500">(optional)</span>
            </Label>
            <Input
              id="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/username/repo"
              className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl" className="text-white">
              LinkedIn URL <span className="text-slate-500">(optional)</span>
            </Label>
            <Input
              id="linkedinUrl"
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Demo URL */}
          <div className="space-y-2">
            <Label htmlFor="demoUrl" className="text-white">
              Live Demo URL <span className="text-slate-500">(optional)</span>
            </Label>
            <Input
              id="demoUrl"
              type="url"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              placeholder="https://your-demo.com"
              className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <motion.button
            type="button"
            onClick={() => navigate('/dashboard/projects')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 rounded-xl border border-slate-800 text-white hover:bg-slate-800/50 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={loading || uploading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isEdit ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEdit ? 'Update Project' : 'Create Project'}
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}

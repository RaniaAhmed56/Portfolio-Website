import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
const projects = new Map<string, any>();
const users = new Map<string, any>();

// Mock token storage
const tokens = new Map<string, string>();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Sign up endpoint
app.post('/signup', (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (Array.from(users.values()).some(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const userId = `user_${Date.now()}`;
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    users.set(userId, { id: userId, email, password, name });
    tokens.set(token, userId);

    res.status(201).json({
      user: { id: userId, email, name },
      token,
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

// Sign in endpoint
app.post('/signin', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = Array.from(users.values()).find(u => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    tokens.set(token, user.id);

    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

// Get all projects
app.get('/projects', (req, res) => {
  try {
    const projectList = Array.from(projects.values());
    res.json({ projects: projectList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create project
app.post('/projects', (req, res) => {
  try {
    const { name, description, images, githubUrl, linkedinUrl, demoUrl } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const id = Date.now().toString();
    const project = {
      id,
      name,
      description,
      images: images || [],
      githubUrl: githubUrl || '',
      linkedinUrl: linkedinUrl || '',
      demoUrl: demoUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.set(id, project);
    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
app.put('/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existingProject = projects.get(id);

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updates = req.body;
    const updatedProject = {
      ...existingProject,
      ...updates,
      id,
      createdAt: existingProject.createdAt,
      updatedAt: new Date().toISOString(),
    };

    projects.set(id, updatedProject);
    res.json({ project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
app.delete('/projects/:id', (req, res) => {
  try {
    const { id } = req.params;

    if (!projects.has(id)) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects.delete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Upload image (mock)
app.post('/upload', (req, res) => {
  try {
    const mockUrl = `https://via.placeholder.com/400x300?text=Project+Image`;
    res.json({ url: mockUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Mock Server running on http://localhost:${PORT}`);
  console.log(`✅ Ready to handle requests!`);
});

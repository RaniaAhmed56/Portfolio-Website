import express, { Request, Response } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
interface Project {
  id: string;
  name: string;
  description: string;
  images?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  demoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const projects: Map<string, Project> = new Map();
const users: Map<string, User> = new Map();

// Helper function to generate mock tokens
const generateToken = (userId: string): string => {
  return Buffer.from(`${userId}:${Date.now()}`).toString('base64');
};

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Sign up endpoint
app.post('/signup', (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (Array.from(users.values()).some(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const userId = uuidv4();
    const user: User = { id: userId, email, password, name };
    users.set(userId, user);

    const token = generateToken(userId);
    res.status(201).json({
      user: {
        id: userId,
        email,
        name,
      },
      token,
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sign in endpoint
app.post('/signin', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = Array.from(users.values()).find(u => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all projects (public)
app.get('/projects', (req: Request, res: Response) => {
  try {
    const projectList = Array.from(projects.values());
    res.json({ projects: projectList });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project
app.get('/projects/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const project = projects.get(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create project (requires auth)
app.post('/projects', (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description, images, githubUrl, linkedinUrl, demoUrl } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const projectId = uuidv4();
    const project: Project = {
      id: projectId,
      name,
      description,
      images: images || [],
      githubUrl: githubUrl || '',
      linkedinUrl: linkedinUrl || '',
      demoUrl: demoUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.set(projectId, project);
    res.status(201).json({ project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project (requires auth)
app.put('/projects/:id', (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = req.params.id as string;
    const project = projects.get(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { name, description, images, githubUrl, linkedinUrl, demoUrl } = req.body;

    const updatedProject: Project = {
      ...project,
      name: name || project.name,
      description: description || project.description,
      images: images !== undefined ? images : project.images,
      githubUrl: githubUrl !== undefined ? githubUrl : project.githubUrl,
      linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : project.linkedinUrl,
      demoUrl: demoUrl !== undefined ? demoUrl : project.demoUrl,
      updatedAt: new Date().toISOString(),
    };

    projects.set(id, updatedProject);
    res.json({ project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project (requires auth)
app.delete('/projects/:id', (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = req.params.id as string;
    const project = projects.get(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects.delete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Upload image (mock - just return a URL)
app.post('/upload', (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization?.split(' ')[1];
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Mock image upload - return a placeholder URL
    const url = `https://via.placeholder.com/${600 + Math.random() * 200}x${400 + Math.random() * 200}?text=Project+Image`;
    res.json({ url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`✅ CORS enabled for all origins`);
});

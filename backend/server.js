const path = require('path');
const express = require('express');
const session = require('express-session');

//OAuth
const passport = require('passport');
const authRoutes = require('./auth/auth');

//CRUD projects
const multer = require('multer'); //to upload files
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(
  session({
    secret: 'temporary_development_secret', // Need to change
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../frontend/views'));

// Multer Configuration
const storage = multer.diskStorage({
  destination: './frontend/public/images',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
  },
});
const upload = multer({ storage });

// data for projects(Temporary - will be deleted)
let projects = [
  {
    id: 1,
    title: 'Dynamic E-Commerce Platform',
    description:
      'Built a responsive e-commerce platform with HTML, CSS, and React.js for the frontend and Node.js with Express for the backend.',
    imagePath: '/images/thumbnail-1.png',
    viewLink: '#',
    githubLink: '#',
  },
  {
    id: 2,
    title: 'Machine Learning Dashboard',
    description:
      'Developed a dashboard to visualize machine learning data and predictions using Flask and React.js.',
    imagePath: '/images/thumbnail-2.png',
    viewLink: '#',
    githubLink: '#',
  },
  {
    id: 3,
    title: 'Portfolio Blog with CMS',
    description:
      'Built a personal blog with a content management system (CMS) using Django and React.js.',
    imagePath: '/images/thumbnail-3.png',
    viewLink: '#',
    githubLink: '#',
  },
];

//routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

app.get('/unauthorized', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/unauthorized.html'));
});

app.get('/auth/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

//projects-routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/add', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/add.html'));
});

app.post('/api/projects/add', upload.single('image'), (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/add.html'));
  const { title, description } = req.body;
  const newProject = {
    id: Date.now(),
    title,
    description,
    imagePath: `/images/${req.file.filename}`,
    viewLink: '#',
    githubLink: '#',
  };

  projects.push(newProject);
  res.redirect('/'); // Redirect to the main page after adding
});

app.get('/api/project/:id', (req, res) => {
  const { id } = req.params;
  const project = projects.find((proj) => proj.id == id);

  if (project) {
    res.json(project);
  } else {
    res.status(404).send('Project not found');
  }
});

app.put('/api/project/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, viewLink, githubLink } = req.body;
  const project = projects.find((proj) => proj.id == id);

  if (project) {
    project.title = title || project.title;
    project.description = description || project.description;
    project.imagePath = imagePath || project.imagePath;
    project.viewLink = viewLink || project.viewLink;
    project.githubLink = githubLink || project.githubLink;

    res.json(project);
  } else {
    res.status(404).send('Project not found');
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projects = projects.filter((proj) => proj.id != id);
  res.json({ message: 'Project deleted' });
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google'); // Redirect to login if not authenticated
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

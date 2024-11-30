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

// necessary middleware to process PUT requests containing files
// because Multer is only used for the POST route
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Multer Configuration
const upload = multer({
  dest: './frontend/public/images',
  fileFilter: (req, file, cb) => {
    // Only accept certain file types
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});

// data for projects(Temporary - will be deleted)
let projects = [
  {
    id: 1,
    title: 'Dynamic E-Commerce Platform',
    description:
      'Built a responsive e-commerce platform with HTML, CSS, and React.js for the frontend and Node.js with Express for the backend. The platform features secure user authentication, a custom shopping cart, product pages, and checkout integrations. Implemented RESTful APIs and used MySQL for managing product inventory and order data.',
    imagePath: '/images/thumbnail-1.png',
    viewLink: '#',
    githubLink: '#',
  },
  {
    id: 2,
    title: 'Machine Learning Dashboard',
    description:
      'Developed a dashboard to visualize machine learning data and predictions, using Flask for the backend and React.js for the frontend. The application retrieves and processes data from a MySQL database and displays results in interactive charts. Hosted on Google Cloud Platform, it provides insights from the model and enables users to filter and analyze specific data points.',
    imagePath: '/images/thumbnail-2.png',
    viewLink: '#',
    githubLink: '#',
  },
  {
    id: 3,
    title: 'Portfolio Blog with CMS',
    description:
      'Built a personal blog with a content management system (CMS) to manage and display posts, using Django for the backend and React.js for the frontend. Integrated MySQL for database management and created a rich-text editor for easy post creation. Deployed on AWS with automated CI/CD for smooth updates, it also includes SEO optimization and a responsive design.',
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
  const { title, description, viewLink, githubLink } = req.body;

  const newProject = {
    id: Date.now(),
    title,
    description,
    imagePath: `/images/${req.file.filename}`,
    viewLink,
    githubLink,
  };

  projects.push(newProject);

  res.redirect('/');
});

app.get('/edit.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/edit.html'));
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

app.put('/api/project/:id', upload.single('imagePath'), (req, res) => {
  const { id } = req.params;
  const { title, description, viewLink, githubLink } = req.body;
  const project = projects.find((proj) => proj.id == id);

  if (project) {
    project.title = title || project.title;
    project.description = description || project.description;
    project.viewLink = viewLink || project.viewLink;
    project.githubLink = githubLink || project.githubLink;

    // Update the image if a new one is uploaded
    if (req.file) {
      project.imagePath = `/images/${req.file.filename}`;
    }

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

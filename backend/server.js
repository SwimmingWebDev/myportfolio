const path = require('path');
const express = require('express');
const session = require('express-session');

//OAuth
const passport = require('passport');
const authRoutes = require('./auth/auth');

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

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../frontend/views'));

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

# ACIT 3475 Web Server Administration - Project2

### Title

High Availability Portfolio with OAuth and GitHub Contributions Display

### Project Setup

1. Install packages `npm install`
2. Run server `npm run dev`

### Requirements

#### Frontend

- [ ] Build a portfolio using HTML/CSS/JS
- [ ] Have aesthetic and user-friendly interface
- [ ] Have clear, and intuitive navigation
- [ ] Have sections like "About Me", "Projects", and a "GitHub Contributions"
- [ ] Must allow users to log in via Google OAuth
- [ ] Implement CRUD Functionality for updating projects

#### Backend

- [ ] Use Nginx as the prmary web server to host the portfolio
- [ ] After only OAuth authentication, accessible for updating projects
- [ ] Set up two or more Nginx instances behind HAProxy to balance incoming traffic

#### OAuth Implementation

- [ ] Use Google Cloud OAuth 2.0 to allow users to log in
- [ ] Only authenticated users have access to edit the portfolio
- [ ] Ensure proper token handling and authentication flows

#### Load Balancing with HAProxy

- [ ] Install and configure HAProxy to distribute traffic
- [ ] Monitor the performance of the load balancing setup
- [ ] Provide basic reporting on the distribution of traffic

#### GitHub Contributions Widjet

- [ ] Use GitHub widget
- [ ] Integrate the widget by showcasing GitHub
- [ ] Contributions using the CDN recommended by the repo
- [ ] Ensure the widget loads efficiently and matches the overall design

#### CDN

- [ ] Implement the CDN provided by the GitHub widget
- [ ] Demonstrate understanding of how the CDN works
- [ ] Understand how CDN improves the loading of static content(the calender)

#### Documentation

- [ ] Detailed explanation of how OAuth, HAProxy, and Nginx were configured
- [ ] Report on how the GitHub Contributions widget was integrated
- [ ] Report on how the CDN enhances performance

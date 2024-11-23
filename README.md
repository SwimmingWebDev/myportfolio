# ACIT 3475 Web Server Administration - Project2

### Title

High Availability Portfolio with OAuth and GitHub Contributions Display

### Project Setup

1. Install packages `npm install`
2. Run server `npm run dev`

### UI/UX

- [Wireframe](https://www.figma.com/board/QfCCKDbTZF5dYszUv5VnlW/Untitled?node-id=0-1&t=g2SCDmbtJGdMydn8-1)

### Requirements

#### Frontend

- [x] Build a portfolio using HTML/CSS/JS (Angela, Henry, Yang)
- [ ] Have aesthetic and user-friendly interface (Yang)
- [ ] Have clear, and intuitive navigation (Yang)
- [x] Have sections like "About Me", "Projects", and a "GitHub Contributions" (Yang)
- [x] Must allow users to log in via Google OAuth (Yang)
- [ ] Implement CRUD Functionality for updating projects (Yang)

#### Backend

- [ ] Use Nginx as the primary web server to host the portfolio
- [ ] After only OAuth authentication, accessible for updating projects (Yang)
- [ ] Set up two or more Nginx instances behind HAProxy to balance incoming traffic

#### OAuth Implementation

- [ ] Use Google Cloud OAuth 2.0 to allow users to log in (Yang)
- [ ] Only authenticated users have access to edit the portfolio (Yang)
- [ ] Ensure proper token handling and authentication flows (Yang)

#### Load Balancing with HAProxy

- [ ] Install and configure HAProxy to distribute traffic
- [ ] Monitor the performance of the load balancing setup
- [ ] Provide basic reporting on the distribution of traffic

#### GitHub Contributions Widjet

- [ ] Use GitHub widget (Yang)
- [ ] Integrate the widget by showcasing GitHub (Yang)
- [ ] Contributions using the CDN recommended by the repo (Yang)
- [ ] Ensure the widget loads efficiently and matches the overall design (Yang)

#### CDN

- [ ] Implement the CDN provided by the GitHub widget
- [ ] Demonstrate understanding of how the CDN works
- [ ] Understand how CDN improves the loading of static content(the calender)

#### Documentation

- [ ] Detailed explanation of how OAuth, HAProxy, and Nginx were configured (Angela, Yang)
- [ ] Report on how the GitHub Contributions widget was integrated (Yang)
- [ ] Report on how the CDN enhances performance

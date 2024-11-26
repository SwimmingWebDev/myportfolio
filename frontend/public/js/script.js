document.addEventListener('DOMContentLoaded', () => {
  // Check login status
  fetch('/auth/status')
    .then((response) => response.json())
    .then((data) => {
      const authLink = document.getElementById('auth-link');
      if (data.loggedIn) {
        // Change Login to Logout
        authLink.innerHTML = `<a href="/auth/logout">Logout</a>`;

        // Show options to edit 'projects' section if logged in
        const adminOptions = document.getElementById('admin-options');
        if (adminOptions) {
          adminOptions.style.display = 'block';
        }
      }
    })
    .catch((error) => console.error('Error checking login status:', error));
});

document.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 700) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

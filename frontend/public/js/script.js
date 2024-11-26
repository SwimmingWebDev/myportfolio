document.addEventListener('DOMContentLoaded', () => {
  // Check login status
  checkLoginStatus().then((isLoggedIn) => {
    toggleAdminOptions(isLoggedIn);
    if (!isEditPage()) {
      loadProjects(isLoggedIn);
    } else {
      initializeEditPage();
    }
  });

  // Handle scroll behavior for navigation
  handleScrollEffect();

  // Load all projects initially
  loadProjects();
});

// Check login status
const checkLoginStatus = async () => {
  try {
    const response = await fetch('/auth/status');
    const data = await response.json();
    const authLink = document.getElementById('auth-link');

    if (data.loggedIn) {
      // Update Login to Logout
      authLink.innerHTML = `<a href="/auth/logout">Logout</a>`;
      return true;
    }
  } catch (error) {
    console.error('Error checking login status:', error);
  }
  return false;
};

// Add scroll effect to navigation bar
const handleScrollEffect = () => {
  const nav = document.querySelector('nav');

  document.addEventListener('scroll', () => {
    if (window.scrollY > 700) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
};

// Toggle visibility of admin options
const toggleAdminOptions = (isLoggedIn) => {
  const adminOptionsNew = document.getElementById('admin-options-new');
  const adminOptionsEdit = document.querySelectorAll('.admin-options');

  if (isLoggedIn) {
    if (adminOptionsNew) adminOptionsNew.style.display = 'block';
    if (adminOptionsEdit) {
      adminOptionsEdit.forEach((option) => (option.style.display = 'block'));
    }
  } else {
    if (adminOptionsNew) adminOptionsNew.style.display = 'none';
    if (adminOptionsEdit) {
      adminOptionsEdit.forEach((option) => (option.style.display = 'none'));
    }
  }
};

// Display all projects
const loadProjects = async (isLoggedIn) => {
  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();

    const projectsContainer = document.querySelector('.projects-container');
    projectsContainer.innerHTML = projects
      .map(
        (project) => `
        <div class="project" id="project-${project.id}">
          <div class="project-image"  style="background-image: url('${
            project.imagePath
          }');"></div>
          <div class="project-content">
            <div class="texts">
              <h3>${project.title}</h3>
              <div class="admin-options" id="admin-options-edit" style="display: ${
                isLoggedIn ? 'block' : 'none'
              };">
                <p>
                  <span onclick="editProject(${project.id})">
                    <i class="fa-regular fa-pen-to-square"></i>Edit
                  </span>
                  <span onclick="deleteProject(${project.id})">
                    <i class="fa-solid fa-trash-can"></i>Delete
                  </span>
                </p>
              </div>
              <p>${project.description}</p>
            </div>
            <div class="project-links">
              <p>
                <a href="${project.viewLink}" target="_blank">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>View
                </a>
              </p>
              <p>
                <a href="${project.githubLink}" target="_blank">
                  <i class="fa-brands fa-github"></i>GitHub
                </a>
              </p>
            </div>
          </div>
        </div>`
      )
      .join('');
  } catch (error) {
    console.error('Error loading projects:', error);
  }
};

const isEditPage = () => document.getElementById('editForm') !== null;

// Add a new project
const addProject = async (newProject) => {
  try {
    await fetch('/api/projects/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    });
    checkLoginStatus().then((isLoggedIn) => loadProjects(isLoggedIn));
  } catch (error) {
    console.error('Error adding project:', error);
  }
};

// Edit an existing project
// Initialize edit page (edit.html)
const initializeEditPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  const editForm = document.getElementById('editForm');

  // Fetch project details and populate the form
  fetch(`/api/project/${projectId}`)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch project details');
      return res.json();
    })
    .then((data) => {
      document.getElementById('title').value = data.title;
      document.getElementById('description').value = data.description;
      document.getElementById('imagePath').value = data.imagePath;
      document.getElementById('viewLink').value = data.viewLink;
      document.getElementById('githubLink').value = data.githubLink;
    })
    .catch((error) => console.error('Error fetching project details:', error));

  // Handle form submission
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedProject = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      imagePath: document.getElementById('imagePath').value,
      viewLink: document.getElementById('viewLink').value,
      githubLink: document.getElementById('githubLink').value,
    };

    try {
      const response = await fetch(`/api/project/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Error updating project:', error);
    }
  });
};

// Edit an existing project
window.editProject = (id) => {
  window.location.href = `/edit.html?id=${id}`;
};

// Delete a project
window.deleteProject = async (id) => {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      checkLoginStatus().then((isLoggedIn) => loadProjects(isLoggedIn));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }
};

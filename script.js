// Extensions data
const extensionsData = [
  {
    logo: "./assets/images/logo-devlens.svg",
    name: "DevLens",
    description: "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description: "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description: "Simulates various screen resolutions directly within the browser.",
    isActive: false
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description: "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description: "Enhanced developer console with advanced filtering and logging.",
    isActive: true
  }
];

// DOM Elements
const extensionsContainer = document.getElementById('extensions-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.querySelector('.theme-toggle');

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Create extension card
function createExtensionCard(extension) {
  const card = document.createElement('div');
  card.className = 'extension-card';
  card.dataset.active = extension.isActive;
  
  card.innerHTML = `
    <div class="extension-header">
      <div class="extension-logo">
        <img src="${extension.logo}" alt="${extension.name} logo">
      </div>
      <h3 class="extension-name">${extension.name}</h3>
    </div>
    <p class="extension-description">${extension.description}</p>
    <div class="extension-footer">
      <button class="remove-btn">Remove</button>
      <label class="toggle-switch">
        <input type="checkbox" ${extension.isActive ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </label>
    </div>
  `;
  
  // Add event listeners
  const toggleSwitch = card.querySelector('input[type="checkbox"]');
  toggleSwitch.addEventListener('change', () => {
    extension.isActive = toggleSwitch.checked;
    card.dataset.active = extension.isActive;
    filterExtensions(getCurrentFilter());
  });
  
  const removeBtn = card.querySelector('.remove-btn');
  removeBtn.addEventListener('click', () => {
    card.classList.add('removing');
    setTimeout(() => {
      card.remove();
      // In a real app, you would also remove from the data array
    }, 300);
  });
  
  return card;
}

// Render all extensions
function renderExtensions(extensions) {
  extensionsContainer.innerHTML = '';
  
  extensions.forEach(extension => {
    extensionsContainer.appendChild(createExtensionCard(extension));
  });
}

// Get current selected filter
function getCurrentFilter() {
  const activeFilter = document.querySelector('.filter-btn.active');
  return activeFilter.dataset.filter;
}

// Filter extensions based on selected filter
function filterExtensions(filter) {
  const filteredExtensions = extensionsData.filter(extension => {
    if (filter === 'all') return true;
    if (filter === 'active') return extension.isActive;
    if (filter === 'inactive') return !extension.isActive;
    return true;
  });
  
  renderExtensions(filteredExtensions);
}

// Add event listeners to filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active class
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter extensions
    filterExtensions(button.dataset.filter);
  });
});

// Initialize with all extensions
filterExtensions('all');

// Optional: Add animations for card removal
document.documentElement.style.setProperty('--card-remove-animation', '0.3s ease-out');
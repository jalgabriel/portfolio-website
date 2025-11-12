// Small helper: project data (replace with real links & descriptions)
const PROJECTS = {
   landing: {
      title: 'Fitness Landing Page',
      desc: 'Simple and effective bodyweight workouts page.',
      // live: 'https://live-demo-landing.example',
      repo: 'https://github.com/jalgabriel/full-body-workout.git'
   },
   restaurant: {
      title: 'Ramen Restaurant Website',
      desc: 'Fully responsive, front-end restaurant website designed for a Japanese ramen brand specialising in delivery-only service.',
      // live: 'https://live-demo-store.example',
      repo: 'https://jalgabriel.github.io/guaramen/'
   },
   notesapp: {
      title: 'CRUD Notes App',
      desc: 'CRUD-MERN notes taking app where users can create, read, update, and delete notes.',
      // live: 'https://live-demo-blog.example',
      repo: 'https://github.com/jalgabriel/mern-notes-app.git'
   }
};


// NAV TOGGLE (accessible)
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

function closeNav() {
   if (!navToggle || !navList) return;
   navList.classList.remove('open');
   navToggle.setAttribute('aria-expanded', 'false');
}

function openNav() {
   if (!navToggle || !navList) return;
   navList.classList.add('open');
   navToggle.setAttribute('aria-expanded', 'true');
}

if (navToggle && navList) {
   navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeNav() : openNav();
   });

   // Close nav on Escape
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
      }
   });

   // Close nav when clicking outside
   document.addEventListener('click', (e) => {
      if (!navList.contains(e.target) && !navToggle.contains(e.target) && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
      }
   });

   // Close nav when clicking a nav link
   navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
      closeNav();
      });
   });
}

// MODAL LOGIC
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalContent = document.getElementById('modalContent');
// const liveLink = document.getElementById('liveLink');
const repoLink = document.getElementById('repoLink');

document.querySelectorAll('[data-open]').forEach(btn => {
   btn.addEventListener('click', e => {
   const id = btn.getAttribute('data-open');
   openProject(id);
   });
});

document.getElementById('closeModal').addEventListener('click', closeModal);

modal.addEventListener('click', (e) => { 
   if (e.target === modal) closeModal(); 
});

function openProject(id) {
   const p = PROJECTS[id];
   if (!p) return;

   modalTitle.textContent = p.title;
   modalDesc.textContent = p.desc;

   modalContent.innerHTML = `
      <p class=\"muted\">
         Tech stack: ${
            id === 'restaurant' ? 'JavaScript, HTML, CSS, 3rd Party Services' : id === 'notesapp' ? 'React.js, Node.js, Express, MongoDB' : 'JavaScript, HTML, CSS'
         }
      </p>
   `;

   // liveLink.href = p.live;
   repoLink.href = p.repo;
   modal.classList.add('open');
   document.body.style.overflow = 'hidden';
   history.replaceState(null,'',`#project-${id}`);
}

function closeModal() {
   modal.classList.remove('open');
   document.body.style.overflow = '';
   history.replaceState(null,'',location.pathname);
}

// CONTACT FORM PLACEHOLDER HANDLER
function handleContact(e) {
   e.preventDefault();
   const name = document.getElementById('name').value.trim();
   const email = document.getElementById('email').value.trim();
   const message = document.getElementById('message').value.trim();

   if (!name||!email||!message) {
      alert('Please fill all fields.');
      return false
   }

   // Basic validation passed — show a friendly message. In production replace with API call.
   alert('Thanks '+name+" — message received! I'll respond shortly.");
   e.target.reset();
   return false;
}

// SMALL ACCESSIBILITY / SEO UTILITIES
document.getElementById('year').textContent = new Date().getFullYear();

// LAZY LOAD IMAGES (MODERN BROWSERS)
document.querySelectorAll('img').forEach(img => { 
   if ('loading' in HTMLImageElement.prototype) img.loading='lazy'; 
});

// KEYBOARD: CLOSE MODAL WITH ESCAPE
window.addEventListener('keydown', e => { 
   if (e.key==='Escape') closeModal(); 
});

// SIMPLE FOCUS TRAP WHEN MODAL OPENS (MINIMAL)
modal.addEventListener('keydown', e => {
   if (e.key==='Tab') {
      const focusables = modal.querySelectorAll('button,a,input,textarea');

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length-1];

      if (e.shiftKey && document.activeElement===first) { 
         last.focus(); e.preventDefault(); 
      }
      else if (!e.shiftKey && document.activeElement===last) { 
         first.focus(); e.preventDefault(); 
      }
   }
});

// SIMPLE UTM SAFE LINK ENHANCEMENT (PRESERVE PRIVACY)
document.querySelectorAll('a[target="_blank"]').forEach(a => a.rel='noopener noreferrer');


// THANK YOU MESSAGE
const form = document.getElementById("contact-form");

if (form) {
   form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);

      try {
      const res = await fetch(form.action, {
         method: "POST",
         body: data,
         headers: { "Accept": "application/json" }
      });

      if (res.ok) {
         // Redirect to your own page
         window.location.href = "https://jalgabriel.github.io/portfolio-website/thank-you.html";
      } else {
         // Optional: show inline error
         alert("Sorry, something went wrong. Please try again later.");
      }
      } catch (err) {
      alert("Network error. Please check your connection and try again.");
      }
   });
}

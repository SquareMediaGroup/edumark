// src/js/script.js

// Import the mock API service
import { getEssayFeedback } from '../services/mockapi.js';

// Grab DOM elements
const form = document.getElementById('essay-form');
const essayInput = document.getElementById('essay-input');
const errorMsg = document.getElementById('error-msg');
const loading = document.getElementById('loading');
const feedbackEl = document.getElementById('feedback');
const themeToggle = document.getElementById('theme-toggle');

// Initialize theme from localStorage (defaults to 'light')
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

// Theme toggle handler
themeToggle.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'light'
    ? 'dark'
    : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = essayInput.value.trim();

  // Validation: non-empty
  if (!text) {
    errorMsg.textContent = 'Please enter your essay.';
    errorMsg.classList.remove('hidden');
    return;
  }

  // Reset UI state
  errorMsg.classList.add('hidden');
  loading.classList.remove('hidden');
  feedbackEl.classList.add('hidden');
  feedbackEl.innerHTML = ''; // clear previous feedback

  try {
    // Call mock API (simulated delay)
    const result = await getEssayFeedback(text);
    renderFeedback(result);
  } catch (err) {
    // Network or API error
    errorMsg.textContent = 'Network error—please try again.';
    errorMsg.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
});

// Renders the returned feedback object into collapsible cards
function renderFeedback({ grammar, style, argument, structure, score }) {
  const categories = [
    { title: 'Grammar', content: grammar },
    { title: 'Style', content: style },
    { title: 'Argument Strength', content: argument },
    { title: 'Structure', content: structure },
    { title: 'Score', content: `Estimated Score: ${score}/100` },
  ];

  categories.forEach(({ title, content }) => {
    // Card container
    const card = document.createElement('div');
    card.className = 'feedback-card';

    // Header: title + toggle button
    const header = document.createElement('div');
    header.className = 'card-header';
    header.innerHTML = `
      <h3>${title}</h3>
      <button aria-label="Toggle ${title}">+</button>
    `;
    card.appendChild(header);

    // Body: content, hidden by default
    const body = document.createElement('div');
    body.className = 'card-body';
    body.textContent = content;
    card.appendChild(body);

    // Toggle expand/collapse
    header.querySelector('button').addEventListener('click', () => {
      const isOpen = body.classList.toggle('open');
      header.querySelector('button').textContent = isOpen ? '–' : '+';
    });

    // Append to feedback container
    feedbackEl.appendChild(card);
  });

  // Show the feedback section
  feedbackEl.classList.remove('hidden');
}
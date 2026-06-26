import { GitHubValues } from './values.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');

  if (!app) {
    console.error('App not found!');
    return;
  }

  const table = document.createElement('table');

  Object.entries(GitHubValues).forEach(([key, value]) => {
    const tr = document.createElement('tr');

    const tdLeft = document.createElement('td');
    tdLeft.textContent = key;

    const tdRight = document.createElement('td');
    tdRight.textContent = value;

    tr.appendChild(tdLeft);
    tr.appendChild(tdRight);
    table.appendChild(tr);
  });

  app.appendChild(table);
});

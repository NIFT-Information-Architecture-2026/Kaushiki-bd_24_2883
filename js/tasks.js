/* ==========================================================================
   Tasks & Agenda Module (Main Page)
   Work-Study-Life Sanctuary
   ========================================================================== */

function renderMainAgenda() {
  const container = document.getElementById('main-tasks-container');
  if (!container) return;

  const tasks = window.appState.getTasks().filter(t => !t.isPending);
  container.innerHTML = '';

  if (tasks.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px 16px; color: var(--text-secondary);">
        <p style="font-family: var(--font-editorial); font-size: 16px; margin-bottom: 6px;">A clean slate for today.</p>
        <p style="font-size: 12px;">Tap the (+) button below to add your priority tasks.</p>
      </div>
    `;
    return;
  }

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `task-item-card ${task.isCompleted ? 'is-done show-tick' : ''}`;
    card.dataset.id = task.id;

    // Format multiline time slots (e.g., 11:00 / 12:00 / 01:00)
    const formattedTime = task.timeSlot.replace(/\n/g, '<br>');

    card.innerHTML = `
      <div class="task-time-col">
        ${formattedTime}
      </div>
      <div class="task-content-col">
        <span class="task-title-text">${task.title}</span>
        <button class="task-tick-btn" title="Mark as done" aria-label="Mark task done">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    `;

    // Step 1: Click card reveals tick button
    card.addEventListener('click', (e) => {
      if (e.target.closest('.task-tick-btn')) return;
      card.classList.toggle('show-tick');
    });

    // Step 2: Click tick button marks completed (light grey)
    const tickBtn = card.querySelector('.task-tick-btn');
    tickBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const allTasks = window.appState.getTasks();
      const target = allTasks.find(t => t.id === task.id);
      if (target) {
        target.isCompleted = !target.isCompleted;
        window.appState.saveTasks(allTasks);
        renderMainAgenda();
      }
    });

    container.appendChild(card);
  });
}

function setupWindUpDayButton() {
  const btn = document.getElementById('btn-wind-up-day');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // 1. Activate warm coffee shop night theme
    window.appState.setTheme('night');

    // 2. Smoothly switch to Good Things Jar screen
    if (window.navigateToScreen) {
      window.navigateToScreen('jar');
    }
  });
}

window.renderMainAgenda = renderMainAgenda;
window.setupWindUpDayButton = setupWindUpDayButton;

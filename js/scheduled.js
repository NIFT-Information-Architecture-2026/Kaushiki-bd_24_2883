/* ==========================================================================
   Scheduled & Backlog Module (Pending/Scheduled Page)
   Work-Study-Life Sanctuary
   ========================================================================== */

function renderScheduledPage() {
  const container = document.getElementById('scheduled-tasks-container');
  if (!container) return;

  const tasks = window.appState.getTasks().filter(t => t.isPending);
  container.innerHTML = '';

  if (tasks.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px 16px; color: var(--text-secondary);">
        <p style="font-family: var(--font-editorial); font-size: 16px; margin-bottom: 6px;">No pending or leftover items!</p>
        <p style="font-size: 12px;">Tasks uncompleted at day's end gracefully roll over here.</p>
      </div>
    `;
    return;
  }

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `task-item-card ${task.isCompleted ? 'is-done show-tick' : ''}`;
    card.dataset.id = task.id;

    const formattedTime = task.timeSlot.replace(/\n/g, '<br>');

    card.innerHTML = `
      <div class="task-time-col">
        ${formattedTime}
      </div>
      <div class="task-content-col">
        <span class="task-title-text">${task.title}</span>
        <button class="task-tick-btn" title="Mark as done">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.task-tick-btn')) return;
      card.classList.toggle('show-tick');
    });

    const tickBtn = card.querySelector('.task-tick-btn');
    tickBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const allTasks = window.appState.getTasks();
      const target = allTasks.find(t => t.id === task.id);
      if (target) {
        target.isCompleted = !target.isCompleted;
        window.appState.saveTasks(allTasks);
        renderScheduledPage();
      }
    });

    container.appendChild(card);
  });
}

function setupScheduledInteractions() {
  const quickAddBtn = document.getElementById('btn-scheduled-quick-add');
  if (quickAddBtn) {
    quickAddBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-add-task');
      if (modal) modal.classList.add('open');
    });
  }

  // Day pill selection on Scheduled page
  const dayPills = document.querySelectorAll('#scheduled-day-pills .day-pill-item');
  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      dayPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderScheduledPage();
    });
  });
}

window.renderScheduledPage = renderScheduledPage;
window.setupScheduledInteractions = setupScheduledInteractions;

/* ==========================================================================
   Add Task Module (Modal Sheet)
   Work-Study-Life Sanctuary
   ========================================================================== */

function setupAddTaskModal() {
  const modal = document.getElementById('modal-add-task');
  const form = document.getElementById('form-add-task');
  const closeBtn = document.getElementById('btn-close-add-task');

  if (!modal || !form) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  // Close when clicking overlay outside sheet
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('input-task-title').value.trim();
    const dateNum = document.getElementById('select-task-date').value;
    const month = document.getElementById('select-task-month').value;
    const year = document.getElementById('select-task-year').value;
    const startTime = document.getElementById('input-start-time').value || '09:00 AM';
    const endTime = document.getElementById('input-end-time').value || '10:00 AM';
    const enableNotif = document.getElementById('check-send-notif').checked;
    const notifCadence = document.querySelector('input[name="notif_cadence"]:checked')?.value || 'once';

    if (!title) return;

    const newTask = {
      id: 'task-' + Date.now(),
      title: title,
      date: `${year}-${month}-${dateNum}`,
      timeSlot: `${startTime}`,
      startTime: startTime,
      endTime: endTime,
      isCompleted: false,
      isPending: false, // directly adds to active day view
      notification: enableNotif ? notifCadence : null
    };

    const tasks = window.appState.getTasks();
    tasks.push(newTask);
    window.appState.saveTasks(tasks);

    // Reset and close
    form.reset();
    modal.classList.remove('open');

    // Refresh UI
    if (window.renderMainAgenda) window.renderMainAgenda();
    if (window.renderScheduledPage) window.renderScheduledPage();
  });
}

window.setupAddTaskModal = setupAddTaskModal;

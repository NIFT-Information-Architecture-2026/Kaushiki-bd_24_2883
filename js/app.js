/* ==========================================================================
   Master Application Controller & Router
   Work-Study-Life Sanctuary
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme
  const savedTheme = window.appState.getTheme();
  window.appState.setTheme(savedTheme);

  // 2. Initialize Subsystems
  if (window.updateDynamicGreeting) window.updateDynamicGreeting();
  if (window.renderMainAgenda) window.renderMainAgenda();
  if (window.setupWindUpDayButton) window.setupWindUpDayButton();
  if (window.renderCalendar) window.renderCalendar();
  if (window.setupCalendarNavigation) window.setupCalendarNavigation();
  if (window.renderScheduledPage) window.renderScheduledPage();
  if (window.setupScheduledInteractions) window.setupScheduledInteractions();
  if (window.setupAddTaskModal) window.setupAddTaskModal();
  if (window.setupGoodThingsJar) window.setupGoodThingsJar();
  if (window.setupJournal) window.setupJournal();

  // 3. Navigation Setup
  setupNavigationRouting();
  setupProfileThemeToggle();
});

function navigateToScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen-view').forEach(screen => {
    screen.classList.remove('active');
  });

  // Activate target screen
  const targetScreen = document.getElementById(`screen-${screenId}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update bottom dock active tab
  document.querySelectorAll('.dock-nav-item').forEach(item => {
    if (item.dataset.screen === screenId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Screen-specific refreshes
  if (screenId === 'calendar' && window.renderCalendar) {
    window.renderCalendar();
  } else if (screenId === 'scheduled' && window.renderScheduledPage) {
    window.renderScheduledPage();
  } else if (screenId === 'home' && window.renderMainAgenda) {
    window.renderMainAgenda();
  }
}

function setupNavigationRouting() {
  // Bottom Dock items
  document.querySelectorAll('.dock-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.dataset.screen;
      if (screen) navigateToScreen(screen);
    });
  });

  // Elevated (+) Add Task button in bottom dock
  const elevatedAddBtn = document.getElementById('dock-elevated-add');
  if (elevatedAddBtn) {
    elevatedAddBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-add-task');
      if (modal) modal.classList.add('open');
    });
  }

  // Universal Header Home buttons
  document.querySelectorAll('.btn-nav-home').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateToScreen('home');
    });
  });
}

// Profile avatar click toggles between Day Mode and Night Sanctuary Mode
function setupProfileThemeToggle() {
  document.querySelectorAll('.profile-avatar').forEach(avatar => {
    avatar.addEventListener('click', () => {
      const currentTheme = window.appState.getTheme();
      const nextTheme = currentTheme === 'day' ? 'night' : 'day';
      window.appState.setTheme(nextTheme);
    });
  });
}

window.navigateToScreen = navigateToScreen;

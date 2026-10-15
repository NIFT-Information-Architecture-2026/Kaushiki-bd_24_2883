/* ==========================================================================
   Calendar Module (Calendar Page)
   Work-Study-Life Sanctuary
   ========================================================================== */

let currentYear = 2026;
let currentMonth = 9; // October (0-indexed: 9 = Oct)
const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

function renderCalendar() {
  const monthHeader = document.getElementById('calendar-month-label');
  const gridContainer = document.getElementById('calendar-days-grid');
  if (!monthHeader || !gridContainer) return;

  monthHeader.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
  gridContainer.innerHTML = '';

  // Weekday Labels
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weekdays.forEach(day => {
    const label = document.createElement('div');
    label.className = 'calendar-weekday-label';
    label.textContent = day;
    gridContainer.appendChild(label);
  });

  // Calculate days in month & first day offset (Monday start)
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust so Monday = 0, Sunday = 6
  const adjustedFirstDay = (firstDayIndex === 0) ? 6 : firstDayIndex - 1;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Empty leading cells
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day-cell empty';
    gridContainer.appendChild(emptyCell);
  }

  const milestones = window.appState.getMilestones();

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day-cell';
    cell.textContent = day;

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // October 15 is today's date
    if (currentYear === 2026 && currentMonth === 9 && day === 15) {
      cell.classList.add('today');
    }

    // Has milestone check
    const hasEvent = milestones.some(m => m.date === dateStr);
    if (hasEvent) {
      cell.classList.add('has-milestone');
    }

    cell.addEventListener('click', () => {
      document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      renderEventFeed(dateStr);
    });

    gridContainer.appendChild(cell);
  }

  renderEventFeed();
}

function renderEventFeed(filterDate = null) {
  const container = document.getElementById('calendar-events-feed');
  if (!container) return;

  let milestones = window.appState.getMilestones();
  if (filterDate) {
    milestones = milestones.filter(m => m.date === filterDate);
  }

  container.innerHTML = '';

  if (milestones.length === 0) {
    container.innerHTML = `
      <div style="padding: 16px; text-align: center; color: var(--text-secondary); font-size: 13px;">
        No events or holidays marked for this date.
      </div>
    `;
    return;
  }

  // Sort systematically by date
  milestones.sort((a, b) => new Date(a.date) - new Date(b.date));

  milestones.forEach(item => {
    const card = document.createElement('div');
    card.className = 'event-card-item';
    card.innerHTML = `
      <div class="event-date-col">
        <span class="day-name">${item.dayName || 'Day'}</span>
        <span class="day-num">${item.dayNum || item.date.split('-')[2]}</span>
      </div>
      <div class="event-info-col">
        ${item.title}
      </div>
    `;
    container.appendChild(card);
  });
}

function setupCalendarNavigation() {
  const prevBtn = document.getElementById('btn-prev-month');
  const nextBtn = document.getElementById('btn-next-month');
  const markDateBtn = document.getElementById('btn-mark-date');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });
  }

  if (markDateBtn) {
    markDateBtn.addEventListener('click', () => {
      const modal = document.getElementById('modal-mark-date');
      if (modal) modal.classList.add('open');
    });
  }
}

window.renderCalendar = renderCalendar;
window.setupCalendarNavigation = setupCalendarNavigation;

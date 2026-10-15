/* ==========================================================================
   My Journal Module (3-Way Views: List, Media, Calendar)
   Work-Study-Life Sanctuary
   ========================================================================== */

let activeJournalTab = 'list'; // 'list' (default), 'media', 'calendar'
let activeMediaFilter = 'All';  // 'All', 'Photo', 'Video'

function setupJournal() {
  const tabBtns = document.querySelectorAll('.journal-segmented-control .segment-btn');
  const addEntryFab = document.getElementById('fab-add-journal');
  const entryModal = document.getElementById('modal-add-journal');
  const closeEntryModalBtn = document.getElementById('btn-close-journal-modal');
  const entryForm = document.getElementById('form-add-journal');

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeJournalTab = btn.dataset.tab;

      document.getElementById('journal-view-list').style.display = activeJournalTab === 'list' ? 'block' : 'none';
      document.getElementById('journal-view-media').style.display = activeJournalTab === 'media' ? 'block' : 'none';
      document.getElementById('journal-view-calendar').style.display = activeJournalTab === 'calendar' ? 'block' : 'none';

      renderJournalActiveTab();
    });
  });

  // FAB Add Entry
  if (addEntryFab && entryModal) {
    addEntryFab.addEventListener('click', () => {
      entryModal.classList.add('open');
    });
  }

  if (closeEntryModalBtn && entryModal) {
    closeEntryModalBtn.addEventListener('click', () => {
      entryModal.classList.remove('open');
    });
  }

  if (entryForm) {
    entryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('input-journal-title').value.trim();
      const text = document.getElementById('input-journal-text').value.trim();
      const mediaUrl = document.getElementById('input-journal-media-url').value.trim() || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80';
      const mediaType = document.getElementById('select-journal-media-type').value;

      if (!title) return;

      const now = new Date();
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THRU', 'FRI', 'SAT'];

      const newEntry = {
        id: 'journ-' + Date.now(),
        dateDay: days[now.getDay()],
        dateNum: String(now.getDate()),
        fullDate: `${now.getDate()} OCT 2026`,
        title: title,
        snippet: text,
        mediaUrl: mediaUrl,
        mediaType: mediaType
      };

      const entries = window.appState.getJournalEntries();
      entries.unshift(newEntry);
      window.appState.saveJournalEntries(entries);

      entryForm.reset();
      entryModal.classList.remove('open');
      renderJournalActiveTab();
    });
  }

  renderJournalActiveTab();
}

function renderJournalActiveTab() {
  if (activeJournalTab === 'list') {
    renderJournalList();
  } else if (activeJournalTab === 'media') {
    renderJournalMedia();
  } else if (activeJournalTab === 'calendar') {
    renderJournalCalendarView();
  }
}

// 1. List View (Default)
function renderJournalList() {
  const container = document.getElementById('journal-entries-feed');
  if (!container) return;

  const entries = window.appState.getJournalEntries();
  container.innerHTML = '';

  if (entries.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 16px; color: var(--text-secondary);">
        <p style="font-family: var(--font-editorial); font-size: 16px; margin-bottom: 6px;">Your journal is waiting for its first thought.</p>
        <p style="font-size: 12px;">Tap the pencil button to write an entry.</p>
      </div>
    `;
    return;
  }

  entries.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'journal-entry-card';
    card.innerHTML = `
      <div class="journal-date-badge">
        <span style="font-size: 11px; color: var(--text-secondary);">${entry.dateDay}</span>
        <span style="font-size: 16px; color: var(--text-primary);">${entry.dateNum}</span>
      </div>
      <div class="journal-content-preview">
        <h4 class="journal-entry-title">${entry.title}</h4>
        <p class="journal-entry-text">${entry.snippet}</p>
      </div>
      ${entry.mediaUrl ? `<img src="${entry.mediaUrl}" alt="Journal Thumbnail" class="journal-media-thumb" loading="lazy">` : ''}
    `;
    container.appendChild(card);
  });
}

// 2. Media View (Filterable Grid)
function renderJournalMedia() {
  const container = document.getElementById('journal-media-grid');
  const filterBtns = document.querySelectorAll('.media-filter-btn');
  if (!container) return;

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMediaFilter = btn.dataset.filter;
      renderJournalMedia();
    };
  });

  let entries = window.appState.getJournalEntries().filter(e => e.mediaUrl);
  if (activeMediaFilter !== 'All') {
    entries = entries.filter(e => e.mediaType === activeMediaFilter);
  }

  container.innerHTML = '';

  if (entries.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; color: var(--text-secondary); font-size: 13px;">
        No media found for this filter.
      </div>
    `;
    return;
  }

  entries.forEach(item => {
    const card = document.createElement('div');
    card.style.cssText = `
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      aspect-ratio: 1;
      box-shadow: var(--shadow-card);
      cursor: pointer;
    `;
    card.innerHTML = `
      <img src="${item.mediaUrl}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
      <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 10px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: #fff; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
        <span>${item.fullDate}</span>
        <span style="font-size: 9px; opacity: 0.8; text-transform: uppercase;">${item.mediaType}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// 3. Calendar View (Thumbnails on dates with entries)
function renderJournalCalendarView() {
  const container = document.getElementById('journal-calendar-months-container');
  if (!container) return;

  const entries = window.appState.getJournalEntries();
  const entryDateMap = {};
  entries.forEach(e => {
    entryDateMap[e.dateNum] = e.mediaUrl;
  });

  container.innerHTML = `
    <div style="margin-bottom: 24px;">
      <h3 style="font-family: var(--font-editorial); font-size: 17px; margin-bottom: 12px; padding: 0 4px;">OCTOBER 2026</h3>
      <div class="calendar-grid" style="padding: 0;">
        ${['M','T','W','T','F','S','S'].map(d => `<div class="calendar-weekday-label">${d}</div>`).join('')}
        ${Array.from({length: 3}, () => '<div class="calendar-day-cell empty"></div>').join('')}
        ${Array.from({length: 31}, (_, i) => {
          const day = i + 1;
          const bgImg = entryDateMap[String(day)];
          if (bgImg) {
            return `
              <div class="calendar-day-cell" style="background-image: url('${bgImg}'); background-size: cover; background-position: center; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.8); font-weight: 700;">
                ${day}
              </div>
            `;
          }
          return `<div class="calendar-day-cell">${day}</div>`;
        }).join('')}
      </div>
    </div>
  `;
}

window.setupJournal = setupJournal;

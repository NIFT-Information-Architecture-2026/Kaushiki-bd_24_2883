/* ==========================================================================
   Good Things Jar Module ("Read Me When" System)
   Work-Study-Life Sanctuary
   ========================================================================== */

let selectedMood = 'Happy';

function setupGoodThingsJar() {
  const stickyEditor = document.getElementById('jar-sticky-note');
  const putBtn = document.getElementById('btn-put-to-jar');
  const readBtn = document.getElementById('btn-read-from-jar');
  const editColorsBtn = document.getElementById('btn-edit-colors');
  const moodPills = document.querySelectorAll('.mood-pill-btn');

  const readModal = document.getElementById('modal-read-jar');
  const closeReadBtn = document.getElementById('btn-close-read-jar');
  const editColorsModal = document.getElementById('modal-edit-colors');
  const closeEditColorsBtn = document.getElementById('btn-close-edit-colors');

  // Update sticky note background based on selected mood
  function updateStickyColor() {
    const moodColors = window.appState.getMoodColors();
    const activeColor = moodColors[selectedMood] || '#FDF1BA';
    if (stickyEditor) {
      stickyEditor.style.backgroundColor = activeColor;
    }
  }

  updateStickyColor();
  renderJarVisualNotes();

  // Mood Pill Clicks
  moodPills.forEach(pill => {
    pill.addEventListener('click', () => {
      moodPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedMood = pill.dataset.mood;
      updateStickyColor();
    });
  });

  // Put note into the jar
  if (putBtn) {
    putBtn.addEventListener('click', () => {
      const headingInput = document.getElementById('jar-input-heading');
      const bodyInput = document.getElementById('jar-input-body');

      const heading = headingInput.value.trim();
      const body = bodyInput.value.trim();

      if (!heading && !body) {
        alert('Please write a heading or note to drop into your jar.');
        return;
      }

      const moodColors = window.appState.getMoodColors();
      const newNote = {
        id: 'jar-' + Date.now(),
        heading: heading || 'A sweet moment',
        body: body,
        mood: selectedMood,
        color: moodColors[selectedMood],
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      // Play drop animation
      if (stickyEditor) {
        stickyEditor.style.animation = 'dropNote 0.4s ease-in-out';
        setTimeout(() => {
          stickyEditor.style.animation = '';
        }, 400);
      }

      const notes = window.appState.getJarNotes();
      notes.unshift(newNote);
      window.appState.saveJarNotes(notes);

      // Clear inputs
      headingInput.value = '';
      bodyInput.value = '';

      renderJarVisualNotes();
    });
  }

  // Open "Read from Jar" Filter Drawer
  if (readBtn && readModal) {
    readBtn.addEventListener('click', () => {
      readModal.classList.add('open');
      renderReadNotesList('ALL');
    });
  }

  if (closeReadBtn && readModal) {
    closeReadBtn.addEventListener('click', () => {
      readModal.classList.remove('open');
    });
  }

  // Edit Colors Popover
  if (editColorsBtn && editColorsModal) {
    editColorsBtn.addEventListener('click', () => {
      editColorsModal.classList.add('open');
      populateEditColorPickers();
    });
  }

  if (closeEditColorsBtn && editColorsModal) {
    closeEditColorsBtn.addEventListener('click', () => {
      editColorsModal.classList.remove('open');
      updateStickyColor();
      renderJarVisualNotes();
    });
  }

  // Setup Filter Checkboxes inside Read Modal
  const moodFilterCheckboxes = document.querySelectorAll('.filter-mood-checkbox');
  moodFilterCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.value === 'ALL' && cb.checked) {
        moodFilterCheckboxes.forEach(other => {
          if (other !== cb) other.checked = false;
        });
        renderReadNotesList('ALL');
      } else {
        const allCb = document.querySelector('.filter-mood-checkbox[value="ALL"]');
        if (allCb) allCb.checked = false;

        const checkedMoods = Array.from(moodFilterCheckboxes)
          .filter(c => c.checked)
          .map(c => c.value);

        renderReadNotesList(checkedMoods.length ? checkedMoods : 'ALL');
      }
    });
  });
}

// Render folded pastel memory cards inside the illustrated glass jar
function renderJarVisualNotes() {
  const container = document.getElementById('jar-notes-stack');
  if (!container) return;

  const notes = window.appState.getJarNotes();
  container.innerHTML = '';

  notes.slice(0, 14).forEach((note, index) => {
    const foldedCard = document.createElement('div');
    foldedCard.style.cssText = `
      position: absolute;
      width: 28px;
      height: 18px;
      background-color: ${note.color};
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      bottom: ${14 + Math.floor(index / 3) * 16}px;
      left: ${24 + (index % 3) * 26 + (index % 2 === 0 ? 4 : -4)}px;
      transform: rotate(${(index * 17) % 40 - 20}deg);
      transition: all 0.3s ease;
    `;
    container.appendChild(foldedCard);
  });
}

// Render filtered reading cards list
function renderReadNotesList(selectedFilter) {
  const container = document.getElementById('read-notes-feed');
  if (!container) return;

  let notes = window.appState.getJarNotes();
  if (selectedFilter !== 'ALL') {
    if (Array.isArray(selectedFilter)) {
      notes = notes.filter(n => selectedFilter.includes(n.mood));
    } else {
      notes = notes.filter(n => n.mood === selectedFilter);
    }
  }

  container.innerHTML = '';

  if (notes.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px 16px; text-align: center; color: var(--text-secondary);">
        No notes found for this mood filter.
      </div>
    `;
    return;
  }

  notes.forEach(note => {
    const card = document.createElement('div');
    card.style.cssText = `
      background-color: ${note.color};
      border-radius: var(--radius-md);
      padding: 18px;
      margin-bottom: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    `;
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-family: var(--font-editorial); font-size: 16px; font-weight: 700; color: #1C1917;">${note.heading}</span>
        <span style="font-size: 11px; font-weight: 600; color: rgba(28,25,23,0.6);">${note.date}</span>
      </div>
      <p style="font-size: 13px; line-height: 1.5; color: #1C1917;">${note.body}</p>
      <div style="margin-top: 10px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(28,25,23,0.5);">
        Mood: ${note.mood}
      </div>
    `;
    container.appendChild(card);
  });
}

function populateEditColorPickers() {
  const container = document.getElementById('color-pickers-list');
  if (!container) return;

  const moodColors = window.appState.getMoodColors();
  container.innerHTML = '';

  Object.entries(moodColors).forEach(([mood, color]) => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;';
    row.innerHTML = `
      <span style="font-weight: 600; font-size: 13px;">${mood}</span>
      <input type="color" value="${color}" data-mood="${mood}" style="width: 44px; height: 32px; border: none; border-radius: 6px; cursor: pointer;">
    `;

    const input = row.querySelector('input');
    input.addEventListener('change', (e) => {
      moodColors[mood] = e.target.value;
      window.appState.saveMoodColors(moodColors);
    });

    container.appendChild(row);
  });
}

window.setupGoodThingsJar = setupGoodThingsJar;

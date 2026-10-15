/* ==========================================================================
   State Management & LocalStorage Persistence
   Work-Study-Life Sanctuary
   ========================================================================== */

const STORAGE_KEYS = {
  TASKS: 'sanctuary_tasks',
  MILESTONES: 'sanctuary_milestones',
  JAR_NOTES: 'sanctuary_jar_notes',
  JOURNAL_ENTRIES: 'sanctuary_journal_entries',
  MOOD_COLORS: 'sanctuary_mood_colors',
  THEME_MODE: 'sanctuary_theme_mode'
};

// Initial Sample Data Matching User's Sketches & Direction
const INITIAL_DATA = {
  tasks: [
    {
      id: 'task-1',
      title: 'Zoom meeting for TSR Presentation',
      date: '2026-10-15',
      timeSlot: '11:00\n12:00\n01:00',
      startTime: '11:00 AM',
      endTime: '01:00 PM',
      isCompleted: false,
      isPending: false
    },
    {
      id: 'task-2',
      title: 'Explore Blender',
      date: '2026-10-15',
      timeSlot: '03:00',
      startTime: '03:00 PM',
      endTime: '04:30 PM',
      isCompleted: false,
      isPending: false
    },
    {
      id: 'task-3',
      title: 'Laundry',
      date: '2026-10-15',
      timeSlot: '07:00',
      startTime: '07:00 PM',
      endTime: '08:00 PM',
      isCompleted: false,
      isPending: false
    },
    // Backlog / Leftover tasks on Scheduled page
    {
      id: 'task-4',
      title: 'Budget Review',
      date: '2026-10-15',
      timeSlot: '7:30 pm',
      startTime: '07:30 PM',
      endTime: '08:00 PM',
      isCompleted: false,
      isPending: true
    },
    {
      id: 'task-5',
      title: 'Work on TBR Presentation',
      date: '2026-10-15',
      timeSlot: '11:00 pm\n12:00 am\n01:00 am',
      startTime: '11:00 PM',
      endTime: '01:00 AM',
      isCompleted: false,
      isPending: true
    },
    {
      id: 'task-6',
      title: 'Finish MTA PPT',
      date: '2026-10-15',
      timeSlot: '02:00 am',
      startTime: '02:00 AM',
      endTime: '03:00 AM',
      isCompleted: false,
      isPending: true
    }
  ],

  milestones: [
    {
      id: 'mile-1',
      date: '2026-10-16',
      dayName: 'Fri',
      dayNum: '16',
      title: 'Shoot Day',
      category: 'Work'
    },
    {
      id: 'mile-2',
      date: '2026-10-17',
      dayName: 'Sat',
      dayNum: '17',
      title: "Swati's Bday & 7th day of Dussehra",
      category: 'Holiday'
    },
    {
      id: 'mile-3',
      date: '2026-10-20',
      dayName: 'Tue',
      dayNum: '20',
      title: 'Dusshera',
      category: 'Holiday'
    }
  ],

  jarNotes: [
    {
      id: 'jar-1',
      heading: 'Great Critique Session',
      body: 'Professors loved the sustainable packaging concept and typography choices in studio today!',
      mood: 'Happy',
      color: '#FDF1BA',
      date: '5th Oct, 2026'
    },
    {
      id: 'jar-2',
      heading: 'Studio Progress',
      body: 'Finally mastered the complex weave pattern and solved the lighting in Blender.',
      mood: 'Thankful',
      color: '#E8DCF4',
      date: '9th Oct, 2026'
    },
    {
      id: 'jar-3',
      heading: 'Took a Breath & Handled the Stress',
      body: 'Chore backlog felt heavy, took a 10-minute walk, brewed chamomile tea, and got right back on track.',
      mood: 'Angry',
      color: '#D2E7D6', // Pastel Sage Green
      date: '10th Oct, 2026'
    }
  ],

  journalEntries: [
    {
      id: 'journ-1',
      dateDay: 'SAT',
      dateNum: '10',
      fullDate: '10 OCT 2026',
      title: 'Quiet Saturday Coffee & Sketching',
      snippet: 'Woke up without an alarm, visited the local café, worked on moodboards for 3 uninterrupted hours.',
      mediaUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80',
      mediaType: 'Photo'
    },
    {
      id: 'journ-2',
      dateDay: 'THRU',
      dateNum: '15',
      fullDate: '15 OCT 2026',
      title: 'Mid-term Review & Deep Focus',
      snippet: 'Presented the information architecture blueprint. Received high praise for the dual-mode sanctuary idea.',
      mediaUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80',
      mediaType: 'Photo'
    },
    {
      id: 'journ-3',
      dateDay: 'FRI',
      dateNum: '16',
      fullDate: '16 OCT 2026',
      title: 'Behind the Scenes: Editorial Fashion Shoot',
      snippet: 'Lighting setups, fabric textures, model styling, and curating film stills from the studio floor.',
      mediaUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80',
      mediaType: 'Video'
    }
  ],

  moodColors: {
    Happy: '#FDF1BA',
    Thankful: '#E8DCF4',
    Angry: '#D2E7D6',
    Lonely: '#FAD4DF',
    Sad: '#D6E6F8'
  }
};

class AppState {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_DATA.tasks));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MILESTONES)) {
      localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(INITIAL_DATA.milestones));
    }
    if (!localStorage.getItem(STORAGE_KEYS.JAR_NOTES)) {
      localStorage.setItem(STORAGE_KEYS.JAR_NOTES, JSON.stringify(INITIAL_DATA.jarNotes));
    }
    if (!localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES)) {
      localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(INITIAL_DATA.journalEntries));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MOOD_COLORS)) {
      localStorage.setItem(STORAGE_KEYS.MOOD_COLORS, JSON.stringify(INITIAL_DATA.moodColors));
    }
  }

  getTasks() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS)) || [];
  }

  saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  getMilestones() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MILESTONES)) || [];
  }

  saveMilestones(milestones) {
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(milestones));
  }

  getJarNotes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.JAR_NOTES)) || [];
  }

  saveJarNotes(notes) {
    localStorage.setItem(STORAGE_KEYS.JAR_NOTES, JSON.stringify(notes));
  }

  getJournalEntries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES)) || [];
  }

  saveJournalEntries(entries) {
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
  }

  getMoodColors() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MOOD_COLORS)) || INITIAL_DATA.moodColors;
  }

  saveMoodColors(colors) {
    localStorage.setItem(STORAGE_KEYS.MOOD_COLORS, JSON.stringify(colors));
  }

  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME_MODE) || 'day';
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, theme);
    if (theme === 'night') {
      document.body.classList.add('theme-night');
    } else {
      document.body.classList.remove('theme-night');
    }
  }
}

window.appState = new AppState();

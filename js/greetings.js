/* ==========================================================================
   Dynamic Greeting Engine
   Work-Study-Life Sanctuary (Phase 4 & 5 Specifications)
   ========================================================================== */

function updateDynamicGreeting() {
  const greetingEl = document.getElementById('dynamic-greeting-text');
  if (!greetingEl) return;

  const currentHour = new Date().getHours();
  let greetingText = 'Welcome back!';

  if (currentHour >= 4 && currentHour < 12) {
    greetingText = 'Good Morning!';
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingText = 'Good Afternoon!';
  } else if (currentHour >= 18 && currentHour < 23) {
    greetingText = 'Good Evening!';
  } else {
    greetingText = 'Welcome back!';
  }

  greetingEl.textContent = greetingText;
}

window.updateDynamicGreeting = updateDynamicGreeting;

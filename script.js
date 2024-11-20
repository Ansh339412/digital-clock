// Populate the timezone selector
const timezoneSelector = document.getElementById('timezone-selector');

const populateTimezones = () => {
  const timezones = Intl.supportedValuesOf('timeZone'); // Get all supported time zones

  timezones.forEach((timezone) => {
    const option = document.createElement('option');
    option.value = timezone;
    option.textContent = timezone.replace('_', ' '); // Replace underscores with spaces for better readability
    timezoneSelector.appendChild(option);
  });

  // Set default selection to the user's local time zone
  timezoneSelector.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// Update the clock display
function updateClock() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  const selectedTimezone = timezoneSelector.value || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();

  // Convert to selected time zone
  const options = {
    timeZone: selectedTimezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Format time and date
  timeElement.textContent = now.toLocaleTimeString('en-US', options);
  dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Populate time zones and initialize the clock
populateTimezones();
updateClock();
setInterval(updateClock, 1000);

// Update clock when the time zone is changed
timezoneSelector.addEventListener('change', updateClock);

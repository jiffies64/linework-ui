/* Apply the saved paper before first paint. */
(function () {
  try {
    var theme = localStorage.getItem('linework-theme');
    if (theme === 'trace' || theme === 'blueprint' || theme === 'vellum') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch (error) {
  }
})();

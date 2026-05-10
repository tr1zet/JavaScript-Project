export function renderDashboard(app, userName) {
  app.innerHTML = `
    <div class="container">
      <header class="glass" style="padding:20px; margin-bottom:20px;">
        <h1>Привет, ${userName}! 👋</h1>
        <button id="logoutBtn" style="margin-top:10px; padding:5px 15px; background:#ff4444; color:white; border:none; border-radius:5px; cursor:pointer;">Выйти</button>
      </header>

      <section class="controls glass" style="padding:20px; margin-bottom:20px; display:grid; gap:15px;">
        <input id="searchInput" placeholder="🔍 Поиск по названию...">
        <select id="regionFilter">
          <option value="all">🌍 Все регионы</option>
          <option value="Europe">🇪🇺 Европа</option>
          <option value="Asia">🌏 Азия</option>
          <option value="Africa">🌍 Африка</option>
          <option value="Americas">🌎 Америка</option>
          <option value="Oceania">🌊 Океания</option>
          <option value="Antarctic">❄️ Антарктида</option>
        </select>
        <input id="languageFilter" placeholder="🔤 Поиск по языку (english, russian...)">
        <select id="sortSelect">
          <option value="name">📝 По названию (А-Я)</option>
          <option value="population">👥 По населению (убыв.)</option>
          <option value="area">📏 По площади (убыв.)</option>
        </select>
      </section>

      <section id="stats"></section>
      <section id="countries" class="countries-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px,1fr)); gap:20px; margin-top:20px;"></section>
    </div>
  `;

  setTimeout(() => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userName');
        location.reload();
      });
    }
  }, 0);
}
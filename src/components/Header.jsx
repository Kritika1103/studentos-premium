function Header({ user, theme, setTheme, exportData }) {
  return (
    <header className="top-header">
      <div>
        <p className="header-mini-title">PRODUCTIVITY DASHBOARD</p>
        <h1 className="header-main-title">Dashboard</h1>
      </div>

      <div className="header-actions">
        <div className="user-pill">
          <span>{user?.name || "Student"}</span>
        </div>

        <button
          className="theme-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>

        <button className="export-btn" onClick={exportData}>
          Export Data
        </button>
      </div>
    </header>
  );
}

export default Header;

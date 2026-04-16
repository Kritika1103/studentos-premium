function Sidebar({
  activeTab,
  setActiveTab,
  pomodoroTime,
  handleLogout,
  theme,
}) {
  const navItems = [
    "Dashboard",
    "Tasks",
    "Notes",
    "Study",
    "Attendance",
    "Goals",
    "Calendar",
    "Pomodoro",
  ];

  return (
    <aside className={`sidebar-pro ${theme}`}>
      <div className="brand-box">
        <div className="brand-logo">🎓</div>
        <div>
          <h2>StudentOS</h2>
          <p>PRO Edition</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-btn ${activeTab === item ? "active" : ""}`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="focus-widget">
        <p className="focus-label">Focus Time</p>
        <h3>{pomodoroTime}</h3>
        <button className="focus-btn" onClick={() => setActiveTab("Pomodoro")}>
          Open Focus Session
        </button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;

function LoginScreen({ loginInput, setLoginInput, handleLogin, theme }) {
  return (
    <div className={`login-shell ${theme}`}>
      <div className="login-card-pro">
        <div className="login-badge">🎓 StudentOS PRO</div>

        <div className="login-logo-wrap">
          <div className="login-logo-circle">🎓</div>
        </div>

        <h1 className="login-title">Welcome to StudentOS PRO</h1>
        <p className="login-subtitle">
          Your premium student productivity dashboard for tasks, focus, study,
          attendance, and academic growth.
        </p>

        <div className="login-form">
          <label className="login-label">Enter your name</label>
          <input
            type="text"
            className="login-input"
            placeholder="Enter your name..."
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Enter Dashboard
          </button>
        </div>

        <div className="login-features">
          <span>✅ Tasks</span>
          <span>📚 Study</span>
          <span>🎯 Goals</span>
          <span>⏱ Pomodoro</span>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;

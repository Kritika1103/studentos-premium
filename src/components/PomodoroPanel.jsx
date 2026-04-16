function PomodoroPanel({
  minutes,
  seconds,
  isRunning,
  startPomodoro,
  pausePomodoro,
  resetPomodoro,
  sessionsCompleted,
}) {
  const timeText = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  return (
    <section className="panel-card">
      <div className="panel-head">
        <h3>Pomodoro Focus ⏱</h3>
        <span className="panel-chip">{sessionsCompleted} sessions done</span>
      </div>

      <div className="pomodoro-wrap">
        <div className="pomodoro-time">{timeText}</div>

        <div className="pomodoro-actions">
          {!isRunning ? (
            <button className="panel-btn" onClick={startPomodoro}>
              Start
            </button>
          ) : (
            <button className="panel-btn secondary" onClick={pausePomodoro}>
              Pause
            </button>
          )}

          <button className="panel-btn ghost" onClick={resetPomodoro}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default PomodoroPanel;

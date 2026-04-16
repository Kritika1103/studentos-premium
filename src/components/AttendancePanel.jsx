function AttendancePanel({ attendance }) {
  return (
    <section className="panel-card">
      <div className="panel-head">
        <h3>Attendance Tracker 🎯</h3>
      </div>

      <div className="progress-list">
        {attendance.map((item) => (
          <div className="progress-item" key={item.id}>
            <div className="progress-top">
              <span>{item.subject}</span>
              <span>{item.percent}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill attendance-fill"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AttendancePanel;

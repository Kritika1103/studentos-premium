function StudyTracker({ subjects }) {
  const totalHours = subjects.reduce((sum, subject) => sum + subject.hours, 0);

  return (
    <section className="panel-card">
      <div className="panel-head">
        <h3>Study Tracker 📚</h3>
        <span className="panel-chip">{totalHours.toFixed(1)} hrs total</span>
      </div>

      <div className="progress-list">
        {subjects.map((subject) => {
          const width = Math.min((subject.hours / 8) * 100, 100);
          return (
            <div className="progress-item" key={subject.id}>
              <div className="progress-top">
                <span>{subject.name}</span>
                <span>{subject.hours} hrs</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default StudyTracker;

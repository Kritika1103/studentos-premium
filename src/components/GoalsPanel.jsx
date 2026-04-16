function GoalsPanel({ goals, toggleGoal }) {
  return (
    <section className="panel-card">
      <div className="panel-head">
        <h3>Goals Tracker 🚀</h3>
      </div>

      <div className="list-wrap">
        {goals.map((goal) => (
          <div className="list-item" key={goal.id}>
            <label className="checkbox-wrap">
              <input
                type="checkbox"
                checked={goal.done}
                onChange={() => toggleGoal(goal.id)}
              />
              <span className={goal.done ? "done-text" : ""}>{goal.text}</span>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GoalsPanel;

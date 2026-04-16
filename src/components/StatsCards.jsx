function StatsCards({ tasks, subjects, attendance, goals }) {
  const completedTasks = tasks.filter((task) => task.done).length;
  const totalStudyHours = subjects.reduce((sum, item) => sum + item.hours, 0);
  const averageAttendance =
    attendance.length > 0
      ? Math.round(
          attendance.reduce((sum, item) => sum + item.percent, 0) /
            attendance.length,
        )
      : 0;
  const completedGoals = goals.filter((goal) => goal.done).length;
  const focusScore =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const cards = [
    {
      label: "Total Tasks",
      value: tasks.length,
      sub: `${completedTasks} completed`,
    },
    {
      label: "Study Time",
      value: `${totalStudyHours.toFixed(1)} hrs`,
      sub: "This week",
    },
    {
      label: "Attendance",
      value: `${averageAttendance}%`,
      sub: "Average across subjects",
    },
    {
      label: "Focus Score",
      value: `${focusScore}%`,
      sub: `${completedGoals} goals completed`,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <p className="stat-label">{card.label}</p>
          <h3 className="stat-value">{card.value}</h3>
          <span className="stat-sub">{card.sub}</span>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;

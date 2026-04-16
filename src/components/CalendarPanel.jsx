function CalendarPanel({ events }) {
  return (
    <section className="panel-card">
      <div className="panel-head">
        <h3>Mini Calendar 📅</h3>
      </div>

      <div className="calendar-list">
        {events.map((event) => (
          <div className="calendar-item" key={event.id}>
            <div className="calendar-date">{event.date}</div>
            <div className="calendar-title">{event.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalendarPanel;

function QuotePanel({ quote }) {
  return (
    <section className="panel-card quote-card">
      <div className="panel-head">
        <h3>Quote of the Day ✨</h3>
      </div>

      <p className="quote-text">“{quote}”</p>
    </section>
  );
}

export default QuotePanel;

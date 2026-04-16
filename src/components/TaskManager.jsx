function TaskManager({
  tasks,
  taskInput,
  setTaskInput,
  addTask,
  toggleTask,
  deleteTask,
}) {
  return (
    <section className="panel-card">
      <div className="panel-head">
        <h3>Task Manager ✅</h3>
      </div>

      <div className="input-row">
        <input
          type="text"
          className="panel-input"
          placeholder="Enter your task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="panel-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="list-wrap">
        {tasks.map((task) => (
          <div className="list-item" key={task.id}>
            <label className="checkbox-wrap">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.done ? "done-text" : ""}>{task.text}</span>
            </label>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TaskManager;

import { useMemo, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("studentos_tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Complete DBMS notes", done: false },
          { id: 2, text: "Practice 2 coding questions", done: true },
          { id: 3, text: "Attend OS lecture at 2 PM", done: false },
        ];
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("studentos_notes");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Revise DBMS normalization before Friday." },
          { id: 2, text: "Ask professor about OS lab submission." },
        ];
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("studentos_goals");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Maintain 85%+ attendance", progress: 85 },
          { id: 2, text: "Finish 50 DSA problems this month", progress: 64 },
          { id: 3, text: "Study 2 hours daily", progress: 78 },
        ];
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("studentos_attendance");
    return saved
      ? JSON.parse(saved)
      : [
          { subject: "DBMS", present: 18, total: 20 },
          { subject: "OS", present: 16, total: 19 },
          { subject: "CN", present: 15, total: 18 },
          { subject: "DSA", present: 19, total: 22 },
        ];
  });

  const [studyData] = useState([
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.1 },
    { day: "Fri", hours: 2.9 },
    { day: "Sat", hours: 4.0 },
    { day: "Sun", hours: 1.5 },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newNote, setNewNote] = useState("");
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem("studentos_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("studentos_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("studentos_goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("studentos_attendance", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    let timer;
    if (isRunning && pomodoroSeconds > 0) {
      timer = setInterval(() => {
        setPomodoroSeconds((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0) {
      setIsRunning(false);
      alert("Pomodoro session completed! 🎉");
    }
    return () => clearInterval(timer);
  }, [isRunning, pomodoroSeconds]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done).length;
  const attendanceAverage = useMemo(() => {
    const totalPresent = attendance.reduce(
      (sum, item) => sum + item.present,
      0,
    );
    const totalClasses = attendance.reduce((sum, item) => sum + item.total, 0);
    return totalClasses ? Math.round((totalPresent / totalClasses) * 100) : 0;
  }, [attendance]);

  const weeklyStudyHours = useMemo(() => {
    return studyData.reduce((sum, item) => sum + item.hours, 0).toFixed(1);
  }, [studyData]);

  const focusScore = useMemo(() => {
    if (totalTasks === 0) return 100;
    return Math.round((completedTasks / totalTasks) * 100);
  }, [completedTasks, totalTasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([...notes, { id: Date.now(), text: newNote.trim() }]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateAttendance = (subject, type) => {
    setAttendance((prev) =>
      prev.map((item) => {
        if (item.subject !== subject) return item;
        if (type === "present") {
          return { ...item, present: item.present + 1, total: item.total + 1 };
        }
        return { ...item, total: item.total + 1 };
      }),
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const navItems = [
    "Dashboard",
    "Tasks",
    "Notes",
    "Study",
    "Attendance",
    "Goals",
    "Pomodoro",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="grid-layout">
            <div className="card card-large hero-card">
              <div className="hero-top">
                <div>
                  <p className="eyebrow">StudentOS v6</p>
                  <h1>Welcome back 👋</h1>
                  <p className="muted">
                    Manage tasks, notes, attendance, goals, and focus sessions
                    in one beautiful dashboard.
                  </p>
                </div>
                <div className="hero-badge">Productive Mode</div>
              </div>

              <div className="stats-grid">
                <div className="stat-box">
                  <span>Today’s Tasks</span>
                  <h2>{totalTasks}</h2>
                  <p>{completedTasks} completed</p>
                </div>
                <div className="stat-box">
                  <span>Study Time</span>
                  <h2>{weeklyStudyHours} hrs</h2>
                  <p>This week</p>
                </div>
                <div className="stat-box">
                  <span>Attendance</span>
                  <h2>{attendanceAverage}%</h2>
                  <p>Average across subjects</p>
                </div>
                <div className="stat-box">
                  <span>Focus Score</span>
                  <h2>{focusScore}%</h2>
                  <p>Based on completed tasks</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <h3>Task Manager ✅</h3>
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Enter your task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
              </div>

              <div className="list-wrap">
                {tasks.map((task) => (
                  <div className="list-item" key={task.id}>
                    <div className="list-left">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span className={task.done ? "done" : ""}>
                        {task.text}
                      </span>
                    </div>
                    <button
                      className="danger-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <h3>Quick Notes 📝</h3>
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Write a quick note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button onClick={addNote}>Add</button>
              </div>

              <div className="list-wrap">
                {notes.map((note) => (
                  <div className="list-item" key={note.id}>
                    <span>{note.text}</span>
                    <button
                      className="danger-btn"
                      onClick={() => deleteNote(note.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <h3>Focus Timer ⏳</h3>
              </div>

              <div className="timer-box">
                <h1>{formatTime(pomodoroSeconds)}</h1>
                <div className="timer-actions">
                  <button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? "Pause" : "Start"}
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() => {
                      setIsRunning(false);
                      setPomodoroSeconds(25 * 60);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "Tasks":
        return (
          <div className="single-page">
            <div className="card">
              <div className="section-title">
                <h2>Task Manager</h2>
                <p>Stay organized and finish your work on time.</p>
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
              </div>

              <div className="list-wrap">
                {tasks.map((task) => (
                  <div className="list-item" key={task.id}>
                    <div className="list-left">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span className={task.done ? "done" : ""}>
                        {task.text}
                      </span>
                    </div>
                    <button
                      className="danger-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Notes":
        return (
          <div className="single-page">
            <div className="card">
              <div className="section-title">
                <h2>Quick Notes</h2>
                <p>Capture important reminders instantly.</p>
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Write your note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button onClick={addNote}>Add Note</button>
              </div>

              <div className="list-wrap">
                {notes.map((note) => (
                  <div className="list-item" key={note.id}>
                    <span>{note.text}</span>
                    <button
                      className="danger-btn"
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Study":
        return (
          <div className="single-page">
            <div className="card">
              <div className="section-title">
                <h2>Study Tracker</h2>
                <p>Your weekly learning consistency.</p>
              </div>

              <div className="chart-wrap">
                {studyData.map((item) => (
                  <div className="bar-item" key={item.day}>
                    <span className="bar-label">{item.day}</span>
                    <div className="bar-bg">
                      <div
                        className="bar-fill"
                        style={{ height: `${item.hours * 20}px` }}
                      ></div>
                    </div>
                    <small>{item.hours}h</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Attendance":
        return (
          <div className="single-page">
            <div className="card">
              <div className="section-title">
                <h2>Attendance Tracker</h2>
                <p>Track your subject-wise attendance.</p>
              </div>

              <div className="attendance-list">
                {attendance.map((item) => {
                  const percent = Math.round((item.present / item.total) * 100);
                  return (
                    <div className="attendance-card" key={item.subject}>
                      <div className="attendance-head">
                        <h4>{item.subject}</h4>
                        <span>{percent}%</span>
                      </div>
                      <p>
                        {item.present} / {item.total} classes attended
                      </p>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="attendance-actions">
                        <button
                          onClick={() =>
                            updateAttendance(item.subject, "present")
                          }
                        >
                          Mark Present
                        </button>
                        <button
                          className="secondary-btn"
                          onClick={() =>
                            updateAttendance(item.subject, "absent")
                          }
                        >
                          Mark Absent
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "Goals":
        return (
          <div className="single-page">
            <div className="card">
              <div className="section-title">
                <h2>Goals Tracker</h2>
                <p>Track your academic targets and progress.</p>
              </div>

              <div className="goals-list">
                {goals.map((goal) => (
                  <div className="goal-card" key={goal.id}>
                    <div className="goal-head">
                      <h4>{goal.text}</h4>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill goal-fill"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Pomodoro":
        return (
          <div className="single-page">
            <div className="card pomodoro-page">
              <div className="section-title">
                <h2>Pomodoro Focus Timer</h2>
                <p>Boost concentration with focused study sessions.</p>
              </div>

              <div className="big-timer">
                <h1>{formatTime(pomodoroSeconds)}</h1>
                <div className="timer-actions">
                  <button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? "Pause Session" : "Start Session"}
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() => {
                      setIsRunning(false);
                      setPomodoroSeconds(25 * 60);
                    }}
                  >
                    Reset Timer
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🎓</div>
          <div>
            <h2>StudentOS</h2>
            <p>v6 Pro</p>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activeTab === item ? "active" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Focus Time</p>
          <h3>{formatTime(pomodoroSeconds)}</h3>
          <button onClick={() => setActiveTab("Pomodoro")}>
            Open Focus Session
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h2>{activeTab}</h2>
          </div>
          <div className="profile-pill">Kritika Manani</div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;

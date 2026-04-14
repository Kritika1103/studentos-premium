import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("studentos_loggedin") === "true";
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("studentos_username") || "Kritika";
  });

  const [loginInput, setLoginInput] = useState("");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("studentos_theme") || "dark";
  });

  const [activeTab, setActiveTab] = useState("Dashboard");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("studentos_tasks_v7");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Complete DBMS notes", done: false },
          { id: 2, text: "Practice 2 coding questions", done: true },
          { id: 3, text: "Attend OS lecture at 2 PM", done: false },
        ];
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("studentos_notes_v7");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Revise DBMS normalization before Friday." },
          { id: 2, text: "Ask professor about OS lab submission." },
        ];
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("studentos_goals_v7");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Maintain 85%+ attendance", progress: 85 },
          { id: 2, text: "Finish 50 DSA problems this month", progress: 64 },
          { id: 3, text: "Study 2 hours daily", progress: 78 },
        ];
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("studentos_attendance_v7");
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

  const quotes = [
    "Success is the sum of small efforts repeated daily.",
    "Discipline beats motivation when motivation fades.",
    "Study now so your future self says thank you.",
    "Small progress each day adds up to big results.",
    "Focus on consistency, not perfection.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(() => {
    return Number(localStorage.getItem("studentos_quote_index")) || 0;
  });

  const [newTask, setNewTask] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newGoalProgress, setNewGoalProgress] = useState("");
  const [pomodoroSeconds, setPomodoroSeconds] = useState(() => {
    const saved = localStorage.getItem("studentos_pomodoro_v7");
    return saved ? Number(saved) : 25 * 60;
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    document.body.className = theme === "dark" ? "theme-dark" : "theme-light";
    localStorage.setItem("studentos_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("studentos_tasks_v7", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("studentos_notes_v7", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("studentos_goals_v7", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("studentos_attendance_v7", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("studentos_pomodoro_v7", pomodoroSeconds.toString());
  }, [pomodoroSeconds]);

  useEffect(() => {
    localStorage.setItem("studentos_quote_index", quoteIndex.toString());
  }, [quoteIndex]);

  useEffect(() => {
    localStorage.setItem("studentos_loggedin", isLoggedIn.toString());
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("studentos_username", username);
  }, [username]);

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

  const today = new Date();
  const currentDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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

  const addSubject = () => {
    if (!newSubject.trim()) return;
    const exists = attendance.some(
      (item) => item.subject.toLowerCase() === newSubject.trim().toLowerCase(),
    );
    if (exists) {
      alert("Subject already exists!");
      return;
    }
    setAttendance([
      ...attendance,
      { subject: newSubject.trim(), present: 0, total: 0 },
    ]);
    setNewSubject("");
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

  const addGoal = () => {
    if (!newGoal.trim() || newGoalProgress === "") return;
    const progress = Math.max(0, Math.min(100, Number(newGoalProgress)));
    setGoals([...goals, { id: Date.now(), text: newGoal.trim(), progress }]);
    setNewGoal("");
    setNewGoalProgress("");
  };

  const updateGoalProgress = (id, value) => {
    const progress = Math.max(0, Math.min(100, Number(value)));
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, progress } : goal)),
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const exportData = () => {
    const content = `
StudentOS v7 Export
===================

User: ${username}
Date: ${currentDate}

TASKS
-----
${tasks.map((t) => `- [${t.done ? "x" : " "}] ${t.text}`).join("\n")}

NOTES
-----
${notes.map((n) => `- ${n.text}`).join("\n")}

GOALS
-----
${goals.map((g) => `- ${g.text} (${g.progress}%)`).join("\n")}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "studentos-v7-data.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const login = () => {
    const name = loginInput.trim() || "Kritika";
    setUsername(name);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActiveTab("Dashboard");
  };

  const navItems = [
    "Dashboard",
    "Tasks",
    "Notes",
    "Study",
    "Attendance",
    "Goals",
    "Calendar",
    "Pomodoro",
  ];

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-icon">🎓</div>
          <h1>StudentOS v7</h1>
          <p>Your smart student productivity dashboard</p>

          <input
            type="text"
            placeholder="Enter your name..."
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />

          <button onClick={login}>Enter Dashboard</button>

          <div className="login-note">
            <span>✨ Portfolio Edition</span>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="grid-layout">
            <div className="card card-large hero-card">
              <div className="hero-top">
                <div>
                  <p className="eyebrow">StudentOS v7</p>
                  <h1>Welcome back, {username} 👋</h1>
                  <p className="muted">
                    Stay productive with tasks, notes, attendance, goals, focus
                    sessions, and smarter student tools.
                  </p>
                  <p className="date-line">{currentDate}</p>
                </div>
                <div className="hero-actions">
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                  </button>
                  <button className="secondary-btn" onClick={exportData}>
                    Export Data
                  </button>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-box">
                  <span>Tasks</span>
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
                <h3>Quote of the Day 💬</h3>
              </div>
              <div className="quote-box">
                <p>“{quotes[quoteIndex % quotes.length]}”</p>
                <button onClick={() => setQuoteIndex((prev) => prev + 1)}>
                  New Quote
                </button>
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <h3>Mini Calendar 📅</h3>
              </div>
              <div className="calendar-box">
                <div className="calendar-date">{today.getDate()}</div>
                <div>
                  <h4>{today.toLocaleString("en-IN", { month: "long" })}</h4>
                  <p>{today.toLocaleString("en-IN", { weekday: "long" })}</p>
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
                <p>Track all your daily tasks here.</p>
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Add a task..."
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
                <p>Save important reminders and study points.</p>
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Write a note..."
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
                <p>See your weekly study consistency.</p>
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
                <p>Add subjects and update your class attendance.</p>
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Add new subject..."
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                />
                <button onClick={addSubject}>Add Subject</button>
              </div>

              <div className="attendance-list">
                {attendance.map((item) => {
                  const percent = item.total
                    ? Math.round((item.present / item.total) * 100)
                    : 0;
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
                <p>Create and update your academic goals.</p>
              </div>

              <div className="goal-form">
                <input
                  type="text"
                  placeholder="Goal title..."
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Progress %"
                  value={newGoalProgress}
                  onChange={(e) => setNewGoalProgress(e.target.value)}
                />
                <button onClick={addGoal}>Add Goal</button>
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

                    <div className="goal-actions">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={(e) =>
                          updateGoalProgress(goal.id, e.target.value)
                        }
                      />
                      <button
                        className="danger-btn"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Calendar":
        return (
          <div className="single-page">
            <div className="card calendar-page">
              <div className="section-title">
                <h2>Calendar View</h2>
                <p>Simple academic date widget for your daily planning.</p>
              </div>

              <div className="calendar-big">
                <div className="calendar-big-number">{today.getDate()}</div>
                <div className="calendar-big-info">
                  <h3>{today.toLocaleString("en-IN", { month: "long" })}</h3>
                  <p>{today.toLocaleString("en-IN", { weekday: "long" })}</p>
                  <span>{today.getFullYear()}</span>
                </div>
              </div>

              <div className="calendar-tips">
                <div className="tip-card">
                  <h4>📘 Study Tip</h4>
                  <p>Plan 3 important tasks every morning.</p>
                </div>
                <div className="tip-card">
                  <h4>🎯 Focus Tip</h4>
                  <p>Use 25-minute focus blocks with 5-minute breaks.</p>
                </div>
                <div className="tip-card">
                  <h4>📝 Reminder</h4>
                  <p>Review your notes before sleeping for better retention.</p>
                </div>
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
                <p>Use focused study sessions to improve concentration.</p>
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
    <div className={`app-shell ${theme === "light" ? "light-shell" : ""}`}>
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">🎓</div>
            <div>
              <h2>StudentOS</h2>
              <p>v7 Premium</p>
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
        </div>

        <div className="sidebar-footer">
          <p>Focus Time</p>
          <h3>{formatTime(pomodoroSeconds)}</h3>
          <button onClick={() => setActiveTab("Pomodoro")}>
            Open Focus Session
          </button>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Productivity Dashboard</p>
            <h2>{activeTab}</h2>
          </div>
          <div className="topbar-actions">
            <div className="profile-pill">{username}</div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;

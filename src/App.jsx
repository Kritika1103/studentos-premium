import { useEffect, useMemo, useState } from "react";

export default function App() {
  // ---------------------------
  // LocalStorage helpers
  // ---------------------------
  const loadData = (key, fallback) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  };

  // ---------------------------
  // State
  // ---------------------------
  const [activeTab, setActiveTab] = useState("dashboard");

  const [tasks, setTasks] = useState(() =>
    loadData("studentos_v5_tasks", [
      { id: 1, text: "Complete DBMS notes", completed: false },
      { id: 2, text: "Practice 2 coding questions", completed: true },
      { id: 3, text: "Attend OS lecture at 2 PM", completed: false },
    ]),
  );
  const [newTask, setNewTask] = useState("");

  const [notes, setNotes] = useState(() =>
    loadData("studentos_v5_notes", [
      { id: 1, text: "Revise DBMS normalization before Friday." },
      { id: 2, text: "Ask professor about OS lab submission." },
    ]),
  );
  const [newNote, setNewNote] = useState("");

  const [studySessions, setStudySessions] = useState(() =>
    loadData("studentos_v5_study", [
      { id: 1, subject: "DBMS", minutes: 45 },
      { id: 2, subject: "Operating Systems", minutes: 30 },
    ]),
  );
  const [studySubject, setStudySubject] = useState("");
  const [studyMinutes, setStudyMinutes] = useState("");

  const [attendance, setAttendance] = useState(() =>
    loadData("studentos_v5_attendance", [
      { id: 1, subject: "DBMS", attended: 18, total: 20 },
      { id: 2, subject: "Operating Systems", attended: 16, total: 20 },
    ]),
  );
  const [attendanceSubject, setAttendanceSubject] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");
  const [totalClasses, setTotalClasses] = useState("");

  const [goals, setGoals] = useState(() =>
    loadData("studentos_v5_goals", [
      { id: 1, text: "Finish CN unit 3", completed: false },
      { id: 2, text: "Complete 5 DSA problems", completed: true },
    ]),
  );
  const [newGoal, setNewGoal] = useState("");

  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // ---------------------------
  // Save to LocalStorage
  // ---------------------------
  useEffect(() => {
    localStorage.setItem("studentos_v5_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("studentos_v5_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("studentos_v5_study", JSON.stringify(studySessions));
  }, [studySessions]);

  useEffect(() => {
    localStorage.setItem("studentos_v5_attendance", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("studentos_v5_goals", JSON.stringify(goals));
  }, [goals]);

  // ---------------------------
  // Pomodoro timer
  // ---------------------------
  useEffect(() => {
    let timer;
    if (isRunning && pomodoroSeconds > 0) {
      timer = setInterval(() => {
        setPomodoroSeconds((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0) {
      setIsRunning(false);
      alert("🎉 Focus session completed! Take a short break.");
    }
    return () => clearInterval(timer);
  }, [isRunning, pomodoroSeconds]);

  // ---------------------------
  // Calculations
  // ---------------------------
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalStudyTime = studySessions.reduce(
    (sum, session) => sum + Number(session.minutes),
    0,
  );

  const averageAttendance = useMemo(() => {
    if (attendance.length === 0) return 0;
    const totalPercentage = attendance.reduce((sum, item) => {
      if (Number(item.total) === 0) return sum;
      return sum + (Number(item.attended) / Number(item.total)) * 100;
    }, 0);
    return Math.round(totalPercentage / attendance.length);
  }, [attendance]);

  const completedGoals = goals.filter((goal) => goal.completed).length;

  const focusScore = Math.min(
    100,
    Math.round(
      completedTasks * 15 +
        completedGoals * 15 +
        totalStudyTime * 0.6 +
        averageAttendance * 0.3,
    ),
  );

  const formattedTime = `${String(Math.floor(pomodoroSeconds / 60)).padStart(
    2,
    "0",
  )}:${String(pomodoroSeconds % 60).padStart(2, "0")}`;

  // ---------------------------
  // Actions
  // ---------------------------
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
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

  const addStudySession = () => {
    if (!studySubject.trim() || !studyMinutes || Number(studyMinutes) <= 0)
      return;
    setStudySessions([
      ...studySessions,
      {
        id: Date.now(),
        subject: studySubject.trim(),
        minutes: Number(studyMinutes),
      },
    ]);
    setStudySubject("");
    setStudyMinutes("");
  };

  const deleteStudySession = (id) => {
    setStudySessions(studySessions.filter((session) => session.id !== id));
  };

  const addAttendance = () => {
    if (
      !attendanceSubject.trim() ||
      !attendedClasses ||
      !totalClasses ||
      Number(totalClasses) <= 0 ||
      Number(attendedClasses) > Number(totalClasses)
    )
      return;

    setAttendance([
      ...attendance,
      {
        id: Date.now(),
        subject: attendanceSubject.trim(),
        attended: Number(attendedClasses),
        total: Number(totalClasses),
      },
    ]);

    setAttendanceSubject("");
    setAttendedClasses("");
    setTotalClasses("");
  };

  const deleteAttendance = (id) => {
    setAttendance(attendance.filter((item) => item.id !== id));
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals([
      ...goals,
      { id: Date.now(), text: newGoal.trim(), completed: false },
    ]);
    setNewGoal("");
  };

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const startPomodoro = () => setIsRunning(true);
  const pausePomodoro = () => setIsRunning(false);
  const resetPomodoro = () => {
    setIsRunning(false);
    setPomodoroSeconds(25 * 60);
  };

  // ---------------------------
  // UI helpers
  // ---------------------------
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "tasks", label: "Tasks", icon: "✅" },
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "study", label: "Study", icon: "📚" },
    { id: "attendance", label: "Attendance", icon: "📊" },
    { id: "goals", label: "Goals", icon: "🎯" },
    { id: "pomodoro", label: "Pomodoro", icon: "⏱️" },
  ];

  const StatCard = ({ title, value, subtitle }) => (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md">
      <p className="text-sm text-slate-300">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );

  const SectionCard = ({ title, icon, children }) => (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md">
      <h2 className="mb-4 text-2xl font-bold text-cyan-300">
        {title} <span>{icon}</span>
      </h2>
      {children}
    </div>
  );

  const Input = (props) => (
    <input
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400 ${props.className || ""}`}
    />
  );

  const Button = ({ children, className = "", ...props }) => (
    <button
      {...props}
      className={`rounded-2xl px-5 py-3 font-semibold transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );

  // ---------------------------
  // Render sections
  // ---------------------------
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's Tasks"
          value={tasks.length}
          subtitle={`${completedTasks} completed`}
        />
        <StatCard
          title="Study Time"
          value={`${totalStudyTime} mins`}
          subtitle="Tracked sessions"
        />
        <StatCard
          title="Attendance"
          value={`${averageAttendance}%`}
          subtitle="Average across subjects"
        />
        <StatCard
          title="Focus Score"
          value={`${focusScore}%`}
          subtitle="Smart productivity score"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {renderTasks(true)}
        {renderNotes(true)}
        {renderStudy(true)}
        {renderAttendance(true)}
        {renderGoals(true)}
        {renderPomodoro(true)}
      </div>
    </div>
  );

  const renderTasks = (compact = false) => (
    <SectionCard title="Task Manager" icon="✅">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Enter your task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Button
          onClick={addTask}
          className="bg-cyan-400 text-slate-900 hover:bg-cyan-300"
        >
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-slate-400">No tasks yet.</p>
        ) : (
          tasks.slice(0, compact ? 4 : tasks.length).map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div
                className="flex cursor-pointer items-center gap-3"
                onClick={() => toggleTask(task.id)}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                    task.completed
                      ? "border-lime-400 bg-lime-400 text-slate-900"
                      : "border-lime-400"
                  }`}
                >
                  {task.completed ? "✓" : ""}
                </div>
                <span
                  className={`text-base ${
                    task.completed
                      ? "text-slate-400 line-through"
                      : "text-white"
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <Button
                onClick={() => deleteTask(task.id)}
                className="bg-red-400/20 text-red-200 hover:bg-red-400/30"
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );

  const renderNotes = (compact = false) => (
    <SectionCard title="Quick Notes" icon="📝">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Write a quick note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
        />
        <Button
          onClick={addNote}
          className="bg-cyan-400 text-slate-900 hover:bg-cyan-300"
        >
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-slate-400">No notes yet.</p>
        ) : (
          notes.slice(0, compact ? 4 : notes.length).map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-white">{note.text}</p>
              <button
                onClick={() => deleteNote(note.id)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-400/20 text-red-200 hover:bg-red-400/30"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );

  const renderStudy = (compact = false) => (
    <SectionCard title="Study Tracker" icon="📚">
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Input
          placeholder="Subject name"
          value={studySubject}
          onChange={(e) => setStudySubject(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Minutes"
          value={studyMinutes}
          onChange={(e) => setStudyMinutes(e.target.value)}
        />
        <Button
          onClick={addStudySession}
          className="bg-cyan-400 text-slate-900 hover:bg-cyan-300"
        >
          Add Session
        </Button>
      </div>

      <div className="mb-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-white">
        Total Study Time:{" "}
        <span className="font-bold">{totalStudyTime} mins</span>
      </div>

      <div className="space-y-3">
        {studySessions.length === 0 ? (
          <p className="text-slate-400">No study sessions yet.</p>
        ) : (
          studySessions
            .slice(0, compact ? 4 : studySessions.length)
            .map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="text-xl font-bold text-white">
                    {session.subject}
                  </p>
                  <p className="text-slate-300">{session.minutes} minutes</p>
                </div>
                <Button
                  onClick={() => deleteStudySession(session.id)}
                  className="bg-red-400/20 text-red-200 hover:bg-red-400/30"
                >
                  Delete
                </Button>
              </div>
            ))
        )}
      </div>
    </SectionCard>
  );

  const renderAttendance = (compact = false) => (
    <SectionCard title="Attendance Tracker" icon="📊">
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <Input
          placeholder="Subject"
          value={attendanceSubject}
          onChange={(e) => setAttendanceSubject(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Attended"
          value={attendedClasses}
          onChange={(e) => setAttendedClasses(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Total"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
        />
        <Button
          onClick={addAttendance}
          className="bg-cyan-400 text-slate-900 hover:bg-cyan-300"
        >
          Add
        </Button>
      </div>

      <div className="mb-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-white">
        Average Attendance:{" "}
        <span className="font-bold">{averageAttendance}%</span>
      </div>

      <div className="space-y-3">
        {attendance.length === 0 ? (
          <p className="text-slate-400">No attendance records yet.</p>
        ) : (
          attendance.slice(0, compact ? 4 : attendance.length).map((item) => {
            const percentage = Math.round(
              (Number(item.attended) / Number(item.total)) * 100,
            );
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="text-xl font-bold text-white">{item.subject}</p>
                  <p className="text-slate-300">
                    {item.attended}/{item.total} classes ({percentage}%)
                  </p>
                </div>
                <Button
                  onClick={() => deleteAttendance(item.id)}
                  className="bg-red-400/20 text-red-200 hover:bg-red-400/30"
                >
                  Delete
                </Button>
              </div>
            );
          })
        )}
      </div>
    </SectionCard>
  );

  const renderGoals = (compact = false) => (
    <SectionCard title="Goals Tracker" icon="🎯">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Enter your goal..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
        />
        <Button
          onClick={addGoal}
          className="bg-cyan-400 text-slate-900 hover:bg-cyan-300"
        >
          Add
        </Button>
      </div>

      <div className="mb-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-white">
        Completed Goals:{" "}
        <span className="font-bold">
          {completedGoals} / {goals.length}
        </span>
      </div>

      <div className="space-y-3">
        {goals.length === 0 ? (
          <p className="text-slate-400">No goals yet.</p>
        ) : (
          goals.slice(0, compact ? 4 : goals.length).map((goal) => (
            <div
              key={goal.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div
                className="flex cursor-pointer items-center gap-3"
                onClick={() => toggleGoal(goal.id)}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                    goal.completed
                      ? "border-cyan-400 bg-cyan-400 text-slate-900"
                      : "border-cyan-400"
                  }`}
                >
                  {goal.completed ? "✓" : ""}
                </div>
                <span
                  className={`text-base ${
                    goal.completed
                      ? "text-slate-400 line-through"
                      : "text-white"
                  }`}
                >
                  {goal.text}
                </span>
              </div>

              <Button
                onClick={() => deleteGoal(goal.id)}
                className="bg-red-400/20 text-red-200 hover:bg-red-400/30"
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );

  const renderPomodoro = (compact = false) => (
    <SectionCard title="Pomodoro Timer" icon="⏱️">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 flex h-56 w-56 items-center justify-center rounded-full border-8 border-cyan-300/60 bg-white/5 text-5xl font-bold text-white shadow-2xl">
          {formattedTime}
        </div>

        <p className="mb-6 text-center text-slate-300">
          Focus for 25 minutes, then take a short break.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={startPomodoro}
            className="bg-cyan-400 text-slate-900 hover:bg-cyan-300"
          >
            Start
          </Button>
          <Button
            onClick={pausePomodoro}
            className="bg-yellow-400/20 text-yellow-200 hover:bg-yellow-400/30"
          >
            Pause
          </Button>
          <Button
            onClick={resetPomodoro}
            className="bg-red-400/20 text-red-200 hover:bg-red-400/30"
          >
            Reset
          </Button>
        </div>
      </div>
    </SectionCard>
  );

  const renderMainContent = () => {
    switch (activeTab) {
      case "tasks":
        return renderTasks();
      case "notes":
        return renderNotes();
      case "study":
        return renderStudy();
      case "attendance":
        return renderAttendance();
      case "goals":
        return renderGoals();
      case "pomodoro":
        return renderPomodoro();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_25%),linear-gradient(135deg,#020617_0%,#0f172a_40%,#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="border-b border-white/10 bg-black/20 p-4 backdrop-blur-xl lg:min-h-screen lg:w-80 lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-cyan-300">
              StudentOS
            </h1>
            <p className="mt-1 text-slate-400">Professional v5</p>
          </div>

          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition-all ${
                  activeTab === item.id
                    ? "border border-cyan-300/40 bg-cyan-400/20 text-cyan-200 shadow-lg"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">Quick Focus</p>
            <h3 className="mt-2 text-4xl font-bold">{formattedTime}</h3>
            <Button
              onClick={() => {
                setActiveTab("pomodoro");
                startPomodoro();
              }}
              className="mt-4 w-full bg-cyan-400 text-slate-900 hover:bg-cyan-300"
            >
              Start Focus Session
            </Button>
          </div>

          <p className="mt-8 text-xs text-slate-500">
            Built with React + Tailwind + LocalStorage
          </p>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-4xl font-bold sm:text-5xl">
                Welcome back 👋
              </h2>
              <p className="mt-2 text-lg text-slate-300">
                Manage tasks, study, attendance, goals, and focus sessions in
                one beautiful productivity dashboard.
              </p>
            </div>

            <Button
              onClick={() => {
                setActiveTab("pomodoro");
                startPomodoro();
              }}
              className="bg-cyan-400 px-6 py-4 text-slate-900 hover:bg-cyan-300"
            >
              Start Focus Session
            </Button>
          </div>

          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

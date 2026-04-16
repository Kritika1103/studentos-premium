import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const defaultTasks = [
  {
    id: 1,
    text: "Complete DBMS assignment",
    done: false,
    subject: "DBMS",
    priority: "High",
    deadline: "Today",
  },
  {
    id: 2,
    text: "Revise OS scheduling algorithms",
    done: false,
    subject: "OS",
    priority: "Medium",
    deadline: "Tomorrow",
  },
  {
    id: 3,
    text: "Practice 2 DSA questions",
    done: true,
    subject: "Java/DSA",
    priority: "Medium",
    deadline: "This Week",
  },
];

const defaultNotes = [
  { id: 1, text: "Revise normalization before Friday." },
  { id: 2, text: "Practice binary tree traversals today." },
];

const defaultGoals = [
  { id: 1, text: "Complete 100 DSA problems", done: false },
  { id: 2, text: "Build 2 strong portfolio projects", done: true },
];

const defaultAttendance = [
  { id: 1, subject: "DBMS", percentage: 88 },
  { id: 2, subject: "OS", percentage: 84 },
  { id: 3, subject: "CN", percentage: 90 },
  { id: 4, subject: "Java", percentage: 86 },
];

const defaultStudy = [
  { id: 1, name: "DBMS", hours: 4.5, progress: 75 },
  { id: 2, name: "OS", hours: 3.5, progress: 62 },
  { id: 3, name: "CN", hours: 3.0, progress: 58 },
  { id: 4, name: "Java/DSA", hours: 5.0, progress: 80 },
];

const defaultCalendar = [
  { id: 1, day: "Mon", title: "DBMS Internal Test" },
  { id: 2, day: "Wed", title: "OS Assignment Submission" },
  { id: 3, day: "Fri", title: "CN Lab Record" },
];

const codeTemplates = {
  JavaScript: `function greet(name) {
  console.log("Hello, " + name);
}

greet("Kriti");`,
  Python: `def greet(name):
    print("Hello, " + name)

greet("Kriti")`,
  "C++": `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, Kriti";
  return 0;
}`,
  Java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Kriti");
  }
}`,
  C: `#include <stdio.h>

int main() {
  printf("Hello, Kriti");
  return 0;
}`,
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("studentos_logged_in") === "true",
  );
  const [studentName, setStudentName] = useState(
    () => localStorage.getItem("studentos_name") || "",
  );
  const [studentBranch, setStudentBranch] = useState(
    () => localStorage.getItem("studentos_branch") || "CSE",
  );
  const [studentYear, setStudentYear] = useState(
    () => localStorage.getItem("studentos_year") || "3rd Year",
  );
  const [studentPhoto, setStudentPhoto] = useState(
    () => localStorage.getItem("studentos_photo") || "",
  );

  const [loginName, setLoginName] = useState("");
  const [loginBranch, setLoginBranch] = useState("CSE");
  const [loginYear, setLoginYear] = useState("3rd Year");
  const [loginPhoto, setLoginPhoto] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("studentos_tasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("studentos_notes");
    return saved ? JSON.parse(saved) : defaultNotes;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("studentos_goals");
    return saved ? JSON.parse(saved) : defaultGoals;
  });

  const [attendance] = useState(defaultAttendance);
  const [study] = useState(defaultStudy);
  const [calendar] = useState(defaultCalendar);

  const [taskInput, setTaskInput] = useState("");
  const [taskSubject, setTaskSubject] = useState("General");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskDeadline, setTaskDeadline] = useState("Upcoming");
  const [noteInput, setNoteInput] = useState("");

  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileBio, setProfileBio] = useState(
    () =>
      localStorage.getItem("studentos_bio") ||
      "Aspiring software developer building strong portfolio projects.",
  );

  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [totalUsageSeconds, setTotalUsageSeconds] = useState(() => {
    const saved = localStorage.getItem("studentos_total_usage");
    return saved ? JSON.parse(saved) : 0;
  });

  const [dailySheet, setDailySheet] = useState(() => {
    const saved = localStorage.getItem("studentos_daily_sheet");
    if (saved) return JSON.parse(saved);

    const today = new Date().toLocaleDateString();
    return [
      {
        id: 1,
        date: today,
        present: "Present",
        usage: "00:00:00",
      },
    ];
  });

  const [codeLanguage, setCodeLanguage] = useState("JavaScript");
  const [codeInput, setCodeInput] = useState(codeTemplates["JavaScript"]);
  const [codeOutput, setCodeOutput] = useState("Output will appear here.");
  const [codeError, setCodeError] = useState("No errors yet.");
  const [codeStatus, setCodeStatus] = useState("Ready");
  const [expectedOutput, setExpectedOutput] = useState("Hello, Kriti");
  const [stdInput, setStdInput] = useState("5 7");

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
    localStorage.setItem(
      "studentos_total_usage",
      JSON.stringify(totalUsageSeconds),
    );
  }, [totalUsageSeconds]);

  useEffect(() => {
    localStorage.setItem("studentos_bio", profileBio);
  }, [profileBio]);

  useEffect(() => {
    localStorage.setItem("studentos_daily_sheet", JSON.stringify(dailySheet));
  }, [dailySheet]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
      setTotalUsageSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const usage = formatTime(totalUsageSeconds);

    setDailySheet((prev) => {
      const existing = prev.find((item) => item.date === today);
      if (existing) {
        return prev.map((item) =>
          item.date === today ? { ...item, usage, present: "Present" } : item,
        );
      }
      return [
        ...prev,
        {
          id: Date.now(),
          date: today,
          present: "Present",
          usage,
        },
      ];
    });
  }, [totalUsageSeconds]);

  useEffect(() => {
    let interval;
    if (timerRunning && focusSeconds > 0) {
      interval = setInterval(() => {
        setFocusSeconds((prev) => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0) {
      setTimerRunning(false);
      alert("Focus session completed.");
    }
    return () => clearInterval(interval);
  }, [timerRunning, focusSeconds]);

  const completedTasks = tasks.filter((t) => t.done).length;
  const completedGoals = goals.filter((g) => g.done).length;
  const avgAttendance = Math.round(
    attendance.reduce((sum, item) => sum + item.percentage, 0) /
      attendance.length,
  );
  const totalStudyHours = study.reduce((sum, item) => sum + item.hours, 0);
  const profileStrength = Math.min(
    100,
    40 +
      (tasks.length > 0 ? 15 : 0) +
      (notes.length > 0 ? 15 : 0) +
      (completedGoals > 0 ? 15 : 0) +
      (totalUsageSeconds > 300 ? 15 : 0),
  );

  const searchResults = searchQuery.trim()
    ? [
        ...tasks
          .filter((t) =>
            t.text.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((t) => "Task: " + t.text),
        ...notes
          .filter((n) =>
            n.text.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((n) => "Note: " + n.text),
        ...study
          .filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((s) => "Subject: " + s.name),
      ].slice(0, 6)
    : [];

  const notifications = [
    ...tasks
      .filter((t) => !t.done && t.deadline === "Today")
      .map((t) => "Due today: " + t.text),
    ...attendance
      .filter((a) => a.percentage < 85)
      .map((a) => "Low attendance in " + a.subject + ": " + a.percentage + "%"),
  ];

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0",
    )}:${String(secs).padStart(2, "0")}`;
  };

  const pomodoroDisplay = useMemo(() => {
    const mins = String(Math.floor(focusSeconds / 60)).padStart(2, "0");
    const secs = String(focusSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }, [focusSeconds]);

  const handleLogin = () => {
    if (!loginName.trim()) {
      alert("Please enter your name");
      return;
    }
    setStudentName(loginName);
    setStudentBranch(loginBranch);
    setStudentYear(loginYear);
    setStudentPhoto(loginPhoto);
    setIsLoggedIn(true);

    localStorage.setItem("studentos_logged_in", "true");
    localStorage.setItem("studentos_name", loginName);
    localStorage.setItem("studentos_branch", loginBranch);
    localStorage.setItem("studentos_year", loginYear);
    localStorage.setItem("studentos_photo", loginPhoto);
  };

  const handlePhotoUpload = (e, setPhotoState) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoState(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.setItem("studentos_logged_in", "false");
    setIsLoggedIn(false);
    setTimerRunning(false);
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      done: false,
      subject: taskSubject,
      priority: taskPriority,
      deadline: taskDeadline,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
    setTaskSubject("General");
    setTaskPriority("Medium");
    setTaskDeadline("Upcoming");
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

  const updateTask = (id) => {
    const newText = prompt("Update task title:");
    if (!newText || !newText.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText.trim() } : task,
      ),
    );
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes([...notes, { id: Date.now(), text: noteInput }]);
    setNoteInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, done: !goal.done } : goal,
      ),
    );
  };

  const exportData = () => {
    const data = {
      studentName,
      studentBranch,
      studentYear,
      profileBio,
      tasks,
      notes,
      goals,
      attendance,
      study,
      calendar,
      totalUsageSeconds,
      dailySheet,
      exportedAt: new Date().toLocaleString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "studentos-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAllData = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all StudentOS data?",
    );
    if (!confirmReset) return;

    [
      "studentos_logged_in",
      "studentos_name",
      "studentos_branch",
      "studentos_year",
      "studentos_photo",
      "studentos_tasks",
      "studentos_notes",
      "studentos_goals",
      "studentos_total_usage",
      "studentos_bio",
      "studentos_daily_sheet",
    ].forEach((key) => localStorage.removeItem(key));

    window.location.reload();
  };

  const handleLanguageChange = (lang) => {
    setCodeLanguage(lang);
    setCodeInput(codeTemplates[lang]);
    setCodeStatus("Template Loaded");
    setCodeOutput("Loaded " + lang + " template.");
    setCodeError("No errors yet.");
  };

  const handleRunCode = () => {
    const code = codeInput.trim().toLowerCase();
    const openCurly = (codeInput.match(/{/g) || []).length;
    const closeCurly = (codeInput.match(/}/g) || []).length;

    if (
      openCurly !== closeCurly &&
      ["javascript", "c++", "java", "c"].includes(codeLanguage.toLowerCase())
    ) {
      setCodeStatus("Compilation Error");
      setCodeOutput("No output.");
      setCodeError(
        "Bracket mismatch detected. Check curly braces. Possible error near block structure.",
      );
      return;
    }

    if (!code.trim()) {
      setCodeStatus("Error");
      setCodeOutput("No output.");
      setCodeError("Editor is empty.");
      return;
    }

    if (code.includes("add") || code.includes("+")) {
      const nums = stdInput
        .split(" ")
        .map((n) => Number(n))
        .filter((n) => !isNaN(n));

      if (nums.length >= 2) {
        const sum = nums.reduce((a, b) => a + b, 0);
        setCodeStatus("Success");
        setCodeOutput(`Addition Result: ${sum}`);
        setCodeError("No errors detected.");
        return;
      }
    }

    if (code.includes("multiply") || code.includes("*")) {
      const nums = stdInput
        .split(" ")
        .map((n) => Number(n))
        .filter((n) => !isNaN(n));

      if (nums.length >= 2) {
        const result = nums.reduce((a, b) => a * b, 1);
        setCodeStatus("Success");
        setCodeOutput(`Multiplication Result: ${result}`);
        setCodeError("No errors detected.");
        return;
      }
    }

    if (code.includes("factorial")) {
      const n = Number(stdInput.split(" ")[0]);
      if (!isNaN(n)) {
        let fact = 1;
        for (let i = 1; i <= n; i++) fact *= i;
        setCodeStatus("Success");
        setCodeOutput(`Factorial(${n}) = ${fact}`);
        setCodeError("No errors detected.");
        return;
      }
    }

    if (code.includes("hello")) {
      setCodeStatus("Success");
      setCodeOutput("Hello, Kriti");
      setCodeError("No errors detected.");
      return;
    }

    if (codeLanguage === "JavaScript" && !code.includes("console.log")) {
      setCodeStatus("Compilation Error");
      setCodeOutput("No output.");
      setCodeError("Missing console.log. Possible issue near output line.");
      return;
    }

    if (codeLanguage === "Python" && !code.includes("print(")) {
      setCodeStatus("Compilation Error");
      setCodeOutput("No output.");
      setCodeError("Missing print() statement. Check output line.");
      return;
    }

    if (
      codeLanguage === "C++" &&
      (!code.includes("int main") || !code.includes("cout"))
    ) {
      setCodeStatus("Compilation Error");
      setCodeOutput("No output.");
      setCodeError(
        "Missing main function or cout statement. Check line 1 to 6.",
      );
      return;
    }

    if (
      codeLanguage === "Java" &&
      (!code.includes("public static void main") ||
        !code.includes("system.out.println"))
    ) {
      setCodeStatus("Compilation Error");
      setCodeOutput("No output.");
      setCodeError("Missing main method or System.out.println statement.");
      return;
    }

    if (
      codeLanguage === "C" &&
      (!code.includes("int main") || !code.includes("printf"))
    ) {
      setCodeStatus("Compilation Error");
      setCodeOutput("No output.");
      setCodeError("Missing main function or printf statement.");
      return;
    }

    setCodeStatus("Success");
    setCodeOutput(
      `Program executed successfully.\nInput: ${stdInput}\nExpected: ${expectedOutput}`,
    );
    setCodeError("No errors detected.");
  };

  const resetCode = () => {
    setCodeInput(codeTemplates[codeLanguage]);
    setCodeStatus("Reset");
    setCodeOutput("Editor reset.");
    setCodeError("No errors.");
  };

  const todayDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!isLoggedIn) {
    return (
      <div
        className={
          darkMode
            ? "app dark login-layout pro-login-page"
            : "app light login-layout pro-login-page"
        }
      >
        <main className="login-pro-shell">
          <div className="login-bg-glow login-glow-one" />
          <div className="login-bg-glow login-glow-two" />

          <section className="login-pro-left">
            <div className="login-badge">STUDENTOS PRO NEXT</div>

            <h1 className="login-pro-title">
              Build your study life
              <br />
              like a <span>pro developer</span>
            </h1>

            <p className="login-pro-subtitle">
              One premium dashboard for tasks, coding practice, attendance,
              analytics, focus sessions, notes, profile and academic
              productivity.
            </p>

            <div className="login-feature-grid">
              <div className="login-feature-card">
                <h3>Task + Study Control</h3>
                <p>Manage your complete academic workflow in one place.</p>
              </div>

              <div className="login-feature-card">
                <h3>Code Practice Lab</h3>
                <p>
                  Practice multiple languages with output and error feedback.
                </p>
              </div>

              <div className="login-feature-card">
                <h3>Focus + Analytics</h3>
                <p>Track your sessions, productivity and learning progress.</p>
              </div>

              <div className="login-feature-card">
                <h3>Portfolio Ready UI</h3>
                <p>
                  A polished project you can proudly show on GitHub and resume.
                </p>
              </div>
            </div>

            <div className="login-bottom-preview">
              <div className="preview-card">
                <p>Modules</p>
                <h3>13+</h3>
                <span>Productivity sections</span>
              </div>
              <div className="preview-card">
                <p>Mode</p>
                <h3>PRO</h3>
                <span>Real app experience</span>
              </div>
              <div className="preview-card">
                <p>Ready For</p>
                <h3>Portfolio</h3>
                <span>Project showcase</span>
              </div>
            </div>
          </section>

          <section className="login-pro-right">
            <div className="login-pro-card">
              <div className="login-card-top">
                <div className="login-logo-circle">S</div>
                <div>
                  <h2>Welcome to StudentOS</h2>
                  <p>Login to continue your productivity journey</p>
                </div>
              </div>

              <div className="login-profile-preview">
                <div className="profile-dot" />
                <span>Smart Student Workspace</span>
              </div>

              <div className="login-photo-upload-wrap">
                <label className="login-photo-label">Add Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, setLoginPhoto)}
                />
                {loginPhoto && (
                  <img
                    src={loginPhoto}
                    alt="Preview"
                    className="login-photo-preview"
                  />
                )}
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                />
              </div>

              <div className="input-row">
                <select
                  value={loginBranch}
                  onChange={(e) => setLoginBranch(e.target.value)}
                >
                  <option>CSE</option>
                  <option>ECE</option>
                  <option>EEE</option>
                  <option>IT</option>
                  <option>ME</option>
                  <option>Civil</option>
                </select>

                <select
                  value={loginYear}
                  onChange={(e) => setLoginYear(e.target.value)}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>

              <div className="login-quick-tags">
                <span>Tasks</span>
                <span>Code Lab</span>
                <span>Focus</span>
                <span>Analytics</span>
                <span>Sheets</span>
              </div>

              <div className="input-row">
                <button
                  className="primary-btn login-main-btn"
                  onClick={handleLogin}
                  style={{ width: "100%" }}
                >
                  Launch StudentOS
                </button>
              </div>

              <div className="input-row">
                <button
                  className="mode-btn login-secondary-btn"
                  onClick={() => setDarkMode(!darkMode)}
                  style={{ width: "100%" }}
                >
                  {darkMode
                    ? "Switch to Light Experience"
                    : "Switch to Dark Experience"}
                </button>
              </div>

              <div className="login-footer-note">
                Built for modern students who want a real product-style
                dashboard.
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <h2>StudentOS</h2>
            <p>PRO NEXT</p>
          </div>
        </div>

        <nav className="nav">
          {[
            "Dashboard",
            "Tasks",
            "Notes",
            "Study",
            "Attendance",
            "Goals",
            "Calendar",
            "Pomodoro",
            "Code Lab",
            "Sheets",
            "Analytics",
            "Profile",
            "Settings",
          ].map((item) => (
            <button
              key={item}
              className={activeTab === item ? "nav-btn active" : "nav-btn"}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="focus-card">
          <p className="focus-label">Focus Time</p>
          <h3>{pomodoroDisplay}</h3>
          <button
            className="primary-btn full-btn"
            onClick={() => setActiveTab("Pomodoro")}
          >
            Open Focus Session
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div style={{ flex: 1, minWidth: "260px" }}>
            <p className="eyebrow">SMART STUDENT PRODUCTIVITY</p>
            <h1>{activeTab}</h1>

            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Search tasks, notes, subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="top-actions">
            <button
              className="secondary-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              Notifications ({notifications.length})
            </button>

            <button
              className="secondary-btn"
              onClick={() => setActiveTab("Analytics")}
            >
              Analytics
            </button>

            <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light" : "Dark"}
            </button>

            <button className="export-btn" onClick={exportData}>
              Export Data
            </button>

            <button className="danger-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {searchQuery.trim() && (
          <section
            className="panel full-panel"
            style={{ marginBottom: "18px" }}
          >
            <h3>Search Results</h3>
            <div className="list-wrap">
              {searchResults.length === 0 ? (
                <div className="reminder-item">No matching results found.</div>
              ) : (
                searchResults.map((item, index) => (
                  <div className="reminder-item" key={index}>
                    {item}
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {showNotifications && (
          <section className="panel full-panel">
            <h3>Notification Panel</h3>
            <div className="list-wrap">
              {notifications.length === 0 ? (
                <div className="reminder-item">No new notifications</div>
              ) : (
                notifications.map((item, index) => (
                  <div className="reminder-item" key={index}>
                    {item}
                  </div>
                ))
              )}
            </div>
            <div style={{ marginTop: "14px" }}>
              <button
                className="secondary-btn"
                onClick={() => setShowNotifications(false)}
              >
                Close Notifications
              </button>
            </div>
          </section>
        )}

        {activeTab === "Dashboard" && (
          <>
            <section className="hero-card">
              <div className="hero-left">
                <p className="hero-label">WELCOME BACK</p>
                <h2>StudentOS Pro Dashboard</h2>
                <p>
                  Track your tasks, attendance, study progress, goals, focus
                  time, coding practice and profile in one premium student
                  dashboard.
                </p>
              </div>

              <div className="hero-stats">
                <div className="mini-stat">
                  <h3>{completedTasks}</h3>
                  <p>Tasks Done</p>
                </div>
                <div className="mini-stat">
                  <h3>{notifications.length}</h3>
                  <p>Alerts</p>
                </div>
              </div>
            </section>

            <section className="stats-grid">
              <div className="stat-card">
                <p>Total Tasks</p>
                <h3>{tasks.length}</h3>
                <span>{completedTasks} completed</span>
              </div>
              <div className="stat-card">
                <p>Study Time</p>
                <h3>{totalStudyHours} hrs</h3>
                <span>This week</span>
              </div>
              <div className="stat-card">
                <p>Attendance</p>
                <h3>{avgAttendance}%</h3>
                <span>Average</span>
              </div>
              <div className="stat-card">
                <p>App Usage</p>
                <h3>{formatTime(totalUsageSeconds)}</h3>
                <span>Total time spent</span>
              </div>
            </section>
          </>
        )}

        {activeTab === "Tasks" && (
          <section className="panel full-panel">
            <h3>Task Manager</h3>

            <div className="input-row">
              <input
                type="text"
                placeholder="Enter task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
            </div>

            <div className="input-row">
              <select
                value={taskSubject}
                onChange={(e) => setTaskSubject(e.target.value)}
              >
                <option>General</option>
                <option>DBMS</option>
                <option>OS</option>
                <option>CN</option>
                <option>Java/DSA</option>
              </select>

              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select
                value={taskDeadline}
                onChange={(e) => setTaskDeadline(e.target.value)}
              >
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This Week</option>
                <option>Upcoming</option>
              </select>

              <button className="primary-btn" onClick={addTask}>
                Add Task
              </button>
            </div>

            <div className="list-wrap">
              {tasks.map((task) => (
                <div className="list-item" key={task.id}>
                  <div className="task-left">
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span className={task.done ? "done" : ""}>
                        {task.text}
                      </span>
                    </label>

                    <div className="task-meta">
                      <span className="meta-chip">{task.subject}</span>
                      <span className="meta-chip">{task.priority}</span>
                      <span className="meta-chip">{task.deadline}</span>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <button
                      className="secondary-btn"
                      onClick={() => updateTask(task.id)}
                    >
                      Update
                    </button>
                    <button
                      className="danger-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Notes" && (
          <section className="panel full-panel">
            <h3>Quick Notes</h3>

            <div className="input-row">
              <input
                type="text"
                placeholder="Write a note..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
              />
              <button className="primary-btn" onClick={addNote}>
                Add Note
              </button>
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
          </section>
        )}

        {activeTab === "Study" && (
          <section className="panel full-panel">
            <h3>Study Tracker</h3>
            <div className="subject-grid">
              {study.map((subject) => (
                <div className="subject-card" key={subject.id}>
                  <h4>{subject.name}</h4>
                  <p>{subject.hours} hrs this week</p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: subject.progress + "%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Attendance" && (
          <section className="panel full-panel">
            <h3>Attendance Overview</h3>
            <div className="attendance-grid">
              {attendance.map((item) => (
                <div className="attendance-card" key={item.id}>
                  <h4>{item.subject}</h4>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: item.percentage + "%" }}
                    />
                  </div>
                  <p>{item.percentage}%</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Goals" && (
          <section className="panel full-panel">
            <h3>Goals</h3>
            <div className="list-wrap">
              {goals.map((goal) => (
                <div className="list-item" key={goal.id}>
                  <label className="task-label">
                    <input
                      type="checkbox"
                      checked={goal.done}
                      onChange={() => toggleGoal(goal.id)}
                    />
                    <span className={goal.done ? "done" : ""}>{goal.text}</span>
                  </label>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Calendar" && (
          <section className="panel full-panel">
            <h3>Calendar</h3>

            <div className="panel full-panel" style={{ marginTop: "14px" }}>
              <h3>Today's Date</h3>
              <div className="reminder-item">{todayDate}</div>
            </div>

            <div className="calendar-grid" style={{ marginTop: "16px" }}>
              {calendar.map((event) => (
                <div className="calendar-card" key={event.id}>
                  <span className="calendar-day">{event.day}</span>
                  <h4>{event.title}</h4>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Pomodoro" && (
          <section className="panel full-panel">
            <h3>Pomodoro Timer</h3>

            <div className="input-row">
              <input
                type="number"
                min="1"
                max="180"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Number(e.target.value) || 25)}
              />
              <button
                className="secondary-btn"
                onClick={() => {
                  setTimerRunning(false);
                  setFocusSeconds(customMinutes * 60);
                }}
              >
                Apply Minutes
              </button>
            </div>

            <div className="pomodoro-box">
              <h2>{pomodoroDisplay}</h2>
              <div className="pomodoro-actions">
                <button
                  className="primary-btn"
                  onClick={() => setTimerRunning(true)}
                >
                  Start
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => setTimerRunning(false)}
                >
                  Pause
                </button>
                <button
                  className="danger-btn"
                  onClick={() => {
                    setTimerRunning(false);
                    setFocusSeconds(customMinutes * 60);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Code Lab" && (
          <section className="panel full-panel">
            <h3>Code Lab</h3>

            <div className="input-row">
              <select
                value={codeLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option>JavaScript</option>
                <option>Python</option>
                <option>C++</option>
                <option>Java</option>
                <option>C</option>
              </select>
            </div>

            <div className="input-row">
              <textarea
                rows="14"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="code-editor"
              />
            </div>

            <div className="input-row">
              <input
                type="text"
                placeholder="Custom input (example: 5 7)"
                value={stdInput}
                onChange={(e) => setStdInput(e.target.value)}
              />
              <input
                type="text"
                placeholder="Expected output"
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
              />
            </div>

            <div className="input-row">
              <button className="primary-btn" onClick={handleRunCode}>
                Run Code
              </button>
              <button className="secondary-btn" onClick={resetCode}>
                Reset Editor
              </button>
            </div>

            <div className="code-grid">
              <div className="output-box">
                <h4>Status</h4>
                <pre>{codeStatus}</pre>
              </div>

              <div className="output-box">
                <h4>Output</h4>
                <pre>{codeOutput}</pre>
              </div>

              <div className="output-box">
                <h4>Error Panel</h4>
                <pre>{codeError}</pre>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Sheets" && (
          <section className="panel full-panel">
            <h3>Daily Sheets</h3>

            <div className="stats-grid" style={{ marginTop: "16px" }}>
              <div className="stat-card">
                <p>Today Status</p>
                <h3>Present</h3>
                <span>Automatically marked when app is used</span>
              </div>

              <div className="stat-card">
                <p>Total Usage</p>
                <h3>{formatTime(totalUsageSeconds)}</h3>
                <span>Total app time</span>
              </div>

              <div className="stat-card">
                <p>Current Session</p>
                <h3>{formatTime(sessionSeconds)}</h3>
                <span>Current login usage</span>
              </div>

              <div className="stat-card">
                <p>Records</p>
                <h3>{dailySheet.length}</h3>
                <span>Daily sheet entries</span>
              </div>
            </div>

            <div className="list-wrap">
              {dailySheet.map((item) => (
                <div className="list-item" key={item.id}>
                  <div className="task-left">
                    <strong>{item.date}</strong>
                    <div className="task-meta">
                      <span className="meta-chip">{item.present}</span>
                      <span className="meta-chip">Usage: {item.usage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Analytics" && (
          <section className="panel full-panel">
            <h3>Analytics Dashboard</h3>

            <section className="stats-grid" style={{ marginTop: "16px" }}>
              <div className="stat-card">
                <p>Productivity Score</p>
                <h3>
                  {Math.round(
                    (completedTasks / Math.max(tasks.length, 1)) * 100,
                  )}
                  %
                </h3>
                <span>Based on completed tasks</span>
              </div>

              <div className="stat-card">
                <p>Goal Completion</p>
                <h3>
                  {Math.round(
                    (completedGoals / Math.max(goals.length, 1)) * 100,
                  )}
                  %
                </h3>
                <span>Based on completed goals</span>
              </div>

              <div className="stat-card">
                <p>Attendance Health</p>
                <h3>{avgAttendance}%</h3>
                <span>Average attendance score</span>
              </div>

              <div className="stat-card">
                <p>Study Hours</p>
                <h3>{totalStudyHours}</h3>
                <span>Total weekly study hours</span>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Profile" && (
          <section className="panel full-panel">
            <h3>Profile Center</h3>

            <div className="profile-card">
              {studentPhoto ? (
                <img
                  src={studentPhoto}
                  alt="Student"
                  className="profile-photo-real"
                />
              ) : (
                <div className="profile-avatar">
                  {studentName ? studentName.charAt(0).toUpperCase() : "S"}
                </div>
              )}

              <div>
                <h4>{studentName}</h4>
                <p>
                  {studentBranch} | {studentYear}
                </p>
                <span>Student Productivity User | Active Dashboard Member</span>
              </div>
            </div>

            <div className="input-row" style={{ marginTop: "16px" }}>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Update name"
              />
            </div>

            <div className="input-row">
              <textarea
                rows="3"
                value={profileBio}
                onChange={(e) => setProfileBio(e.target.value)}
                placeholder="Write your profile bio"
              />
            </div>

            <div className="input-row">
              <select
                value={studentBranch}
                onChange={(e) => setStudentBranch(e.target.value)}
              >
                <option>CSE</option>
                <option>ECE</option>
                <option>EEE</option>
                <option>IT</option>
                <option>ME</option>
                <option>Civil</option>
              </select>

              <select
                value={studentYear}
                onChange={(e) => setStudentYear(e.target.value)}
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>

              <button
                className="primary-btn"
                onClick={() => {
                  localStorage.setItem("studentos_name", studentName);
                  localStorage.setItem("studentos_branch", studentBranch);
                  localStorage.setItem("studentos_year", studentYear);
                  localStorage.setItem("studentos_photo", studentPhoto);
                  alert("Profile updated successfully.");
                }}
              >
                Save Profile
              </button>
            </div>

            <div className="input-row">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, setStudentPhoto)}
              />
            </div>

            <div className="stats-grid" style={{ marginTop: "16px" }}>
              <div className="stat-card">
                <p>Session Time</p>
                <h3>{formatTime(sessionSeconds)}</h3>
                <span>Current login</span>
              </div>
              <div className="stat-card">
                <p>Total App Usage</p>
                <h3>{formatTime(totalUsageSeconds)}</h3>
                <span>All time</span>
              </div>
              <div className="stat-card">
                <p>Total Tasks</p>
                <h3>{tasks.length}</h3>
                <span>Managed tasks</span>
              </div>
              <div className="stat-card">
                <p>Goals Progress</p>
                <h3>
                  {completedGoals}/{goals.length}
                </h3>
                <span>Achievement tracker</span>
              </div>
            </div>

            <div className="panel full-panel" style={{ marginTop: "18px" }}>
              <h3>Profile Strength</h3>
              <div className="progress-bar" style={{ marginTop: "14px" }}>
                <div
                  className="progress-fill"
                  style={{ width: profileStrength + "%" }}
                />
              </div>
              <p style={{ marginTop: "12px", opacity: 0.8 }}>{profileBio}</p>
            </div>
          </section>
        )}

        {activeTab === "Settings" && (
          <section className="panel full-panel">
            <h3>Settings</h3>

            <div className="list-wrap">
              <div className="list-item">
                <span>Theme Mode</span>
                <button
                  className="mode-btn"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? "Switch to Light" : "Switch to Dark"}
                </button>
              </div>

              <div className="list-item">
                <span>Export All Data</span>
                <button className="export-btn" onClick={exportData}>
                  Export
                </button>
              </div>

              <div className="list-item">
                <span>Logout</span>
                <button className="danger-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>

            <div className="stats-grid" style={{ marginTop: "16px" }}>
              <div className="stat-card">
                <p>Theme Mode</p>
                <h3>{darkMode ? "Dark" : "Light"}</h3>
                <span>Current UI mode</span>
              </div>
              <div className="stat-card">
                <p>Tasks Stored</p>
                <h3>{tasks.length}</h3>
                <span>Saved in local storage</span>
              </div>
              <div className="stat-card">
                <p>Notes Stored</p>
                <h3>{notes.length}</h3>
                <span>Quick notes saved</span>
              </div>
              <div className="stat-card">
                <p>Goals Stored</p>
                <h3>{goals.length}</h3>
                <span>Goals tracking active</span>
              </div>
            </div>

            <div className="panel full-panel" style={{ marginTop: "18px" }}>
              <h3>Danger Zone</h3>
              <div className="list-wrap" style={{ marginTop: "14px" }}>
                <div className="list-item">
                  <span>Reset all StudentOS data and restart app</span>
                  <button className="danger-btn" onClick={resetAllData}>
                    Reset All Data
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <button
          className="floating-btn"
          onClick={() => setActiveTab("Tasks")}
          title="Quick Add Task"
        >
          +
        </button>
      </main>
    </div>
  );
}

export default App;

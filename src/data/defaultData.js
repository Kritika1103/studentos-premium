export const defaultTasks = [
  { id: 1, text: "Complete DBMS notes", done: false },
  { id: 2, text: "Practice 3 DSA questions", done: true },
  { id: 3, text: "Attend OS lab submission", done: false },
];

export const defaultNotes = [
  { id: 1, text: "Revise DBMS normalization before Friday." },
  { id: 2, text: "Ask professor about OS lab submission." },
];

export const defaultSubjects = [
  { id: 1, name: "DBMS", hours: 4.5 },
  { id: 2, name: "Operating Systems", hours: 5.0 },
  { id: 3, name: "DSA", hours: 3.5 },
  { id: 4, name: "Computer Networks", hours: 2.5 },
];

export const defaultAttendance = [
  { id: 1, subject: "DBMS", percent: 88 },
  { id: 2, subject: "Operating Systems", percent: 84 },
  { id: 3, subject: "DSA", percent: 92 },
  { id: 4, subject: "Computer Networks", percent: 80 },
];

export const defaultGoals = [
  { id: 1, text: "Score above 90% in DBMS", done: false },
  { id: 2, text: "Complete DSA sheet this month", done: true },
];

export const defaultCalendarEvents = [
  { id: 1, date: "2026-04-18", title: "DBMS Internal Test" },
  { id: 2, date: "2026-04-20", title: "OS Lab Submission" },
  { id: 3, date: "2026-04-24", title: "DSA Mock Test" },
];

export const defaultQuotes = [
  "Success is the sum of small efforts repeated daily.",
  "Discipline beats motivation when motivation disappears.",
  "Small progress each day adds up to big results.",
  "Focus on becoming better, not just busy.",
];

export const defaultUser = {
  name: "Kritika",
  semester: "7th Semester",
  branch: "Computer Science",
};

export const defaultPomodoro = {
  minutes: 40,
  seconds: 0,
  sessionsCompleted: 0,
};

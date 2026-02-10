import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TaskPanel from "./components/TaskPanel";
import AddTask from "./components/AddTask";
import type { Task } from "./types";

function addDays(base: string, n: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

export default function App() {
  const [view, setView] = useState<
    "all" | "today" | "upcoming" | "completed" | "add"
  >("today");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [checkingIds, setCheckingIds] = useState<number[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const todayStr = new Date().toISOString().split("T")[0];



  useEffect(() => {
    const saved = localStorage.getItem("theme") as any;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  

  useEffect(() => {
    async function fetchDefaultTasks() {
      const res = await fetch("https://dummyjson.com/todos?limit=9");
      const data = await res.json();

      const mapped: Task[] = data.todos.map((t: any, i: number) => ({
        id: t.id,
        text: t.todo,
        done: t.completed,
        dueDate: addDays(todayStr, i % 3) 
      }));

      setTasks(mapped);
    }

    fetchDefaultTasks();
  }, [todayStr]);

 

  function addTask(text: string, dueDate: string) {
    setTasks(prev => [
      { id: Date.now(), text, done: false, dueDate },
      ...prev
    ]);
  }

  function toggleTask(id: number) {
    setCheckingIds(prev => [...prev, id]);

    setTimeout(() => {
      setTasks(prev =>
        prev.map(t =>
          t.id === id
            ? { ...t, done: true, completedAt: new Date().toISOString() }
            : t
        )
      );

      setCheckingIds(prev => prev.filter(x => x !== id));
    }, 450);
  }

  function deleteTask(id: number) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

 

  return (
    <div className="app-layout">
      <Sidebar
        view={view}
        setView={setView}
        addTask={addTask}
        theme={theme}
        setTheme={setTheme}
      />

      {view === "add" ? (
        <div className="task-panel">
          <h3 className="mb-4">Add Task</h3>

          <AddTask
            addTask={(text: string, date: string) => {
              addTask(text, date);
              setView("today");
            }}
          />
        </div>
      ) : (
        <TaskPanel
          view={view}
          tasks={tasks}
          todayStr={todayStr}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          checkingIds={checkingIds}
        />
      )}
    </div>
  );
}

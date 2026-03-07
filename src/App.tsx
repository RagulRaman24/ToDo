import { useState, useEffect, useReducer, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import TaskPanel from "./components/TaskPanel";
import AddTask from "./components/AddTask";
import type { Task } from "./types";
import styles from "./App.module.css";
import { TaskContext } from "./context/TaskContext";

function addDays(base: string, n: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}


type Action =
  | { type: "SET_TASKS"; tasks: Task[] }
  | { type: "ADD_TASK"; text: string; dueDate: string }
  | { type: "DELETE_TASK"; id: number }
  | { type: "TOGGLE_TASK"; id: number };

function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "SET_TASKS":
      return action.tasks;

    case "ADD_TASK":
      return [
        { id: Date.now(), text: action.text, done: false, dueDate: action.dueDate },
        ...state
      ];

    case "DELETE_TASK":
      return state.filter(t => t.id !== action.id);

    case "TOGGLE_TASK":
      return state.map(t =>
        t.id === action.id
          ? { ...t, done: true, completedAt: new Date().toISOString() }
          : t
      );

    default:
      return state;
  }
}


export default function App() {

  const [view, setView] = useState<
    "all" | "today" | "upcoming" | "completed" | "add"
  >("today");

  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [checkingIds, setCheckingIds] = useState<number[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const todayStr = new Date().toISOString().split("T")[0];


  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setTheme("dark");
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

      dispatch({ type: "SET_TASKS", tasks: mapped });
    }

    fetchDefaultTasks();
  }, [todayStr]);


  const addTask = useCallback((text: string, dueDate: string) => {
    dispatch({ type: "ADD_TASK", text, dueDate });
  }, []);

  const deleteTask = useCallback((id: number) => {
    dispatch({ type: "DELETE_TASK", id });
  }, []);

  const toggleTask = useCallback((id: number) => {
    setCheckingIds(prev => [...prev, id]);

    setTimeout(() => {
      dispatch({ type: "TOGGLE_TASK", id });
      setCheckingIds(prev => prev.filter(x => x !== id));
    }, 450);
  }, []);


  return (
    <TaskContext.Provider value={{ addTask }}>

      <div className={styles.appLayout}>

        <Sidebar
          view={view}
          setView={setView}
          addTask={addTask}
          theme={theme}
          setTheme={setTheme}
        />

        {view === "add" ? (
          <div className={styles.addView}>
            <h3 className={styles.addTitle}>Add Task</h3>

            <AddTask />

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

    </TaskContext.Provider>
  );
}
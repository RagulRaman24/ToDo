import { useState, useContext } from "react";
import styles from "./AddTask.module.css";
import { TaskContext } from "../context/TaskContext";
export default function AddTask() {

const { addTask } = useContext(TaskContext)!;
  const [text, setText] = useState("");

  const [dateMode, setDateMode] =
    useState<"today" | "tomorrow" | "custom">("today");

  const [customDate, setCustomDate] = useState("");

  function getDueDate() {
    const d = new Date();

    if (dateMode === "today") {
      return d.toISOString().split("T")[0];
    }

    if (dateMode === "tomorrow") {
      d.setDate(d.getDate() + 1);
      return d.toISOString().split("T")[0];
    }

    return customDate;
  }

  function handleAdd() {
    if (!text.trim()) return;

    addTask(text, getDueDate());

    setText("");
  }

  return (
    <div className={styles.addTaskBox}>

      <input
        className={`form-control ${styles.input}`}
        placeholder="Add task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className={styles.dateRow}>

        <select
          className={`form-select ${styles.select}`}
          value={dateMode}
          onChange={(e) =>
            setDateMode(e.target.value as "today" | "tomorrow" | "custom")
          }
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="custom">Pick Date</option>
        </select>

        {dateMode === "custom" && (
          <input
            type="date"
            className={`form-control ${styles.input}`}
            onChange={(e) => setCustomDate(e.target.value)}
          />
        )}

        <button
          className={`btn btn-primary ${styles.addButton}`}
          onClick={handleAdd}
        >
          Add
        </button>

      </div>
    </div>
  );
}
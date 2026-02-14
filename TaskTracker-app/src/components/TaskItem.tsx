import type { Task } from "../types";
import styles from "./TaskItem.module.css";

type Props = {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  checking: boolean;
};

export default function TaskItem({
  task,
  toggleTask,
  deleteTask,
  checking
}: Props) {
  const done = task.done || checking;

  return (
    <div className={`${styles.taskCard} card shadow-sm mb-3`}>
      <div className={`card-body d-flex align-items-center gap-3 ${styles.body}`}>

        <input
          type="checkbox"
          checked={done}
          onChange={() => toggleTask(task.id)}
        />

        <span
          className={`${styles.text} ${done ? styles.completedText : ""}`}
          style={{
            textDecoration: done ? "line-through" : "none"
          }}
        >
          {task.text}
        </span>

        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => deleteTask(task.id)}
        >
          ✕
        </button>

      </div>
    </div>
  );
}

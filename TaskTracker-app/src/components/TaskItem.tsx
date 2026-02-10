import type { Task } from "../types";

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
  return (
    <div className="card task-card shadow-sm mb-3">
      <div className="card-body d-flex align-items-center gap-3">

        <input
          type="checkbox"
          checked={task.done || checking}
          onChange={() => toggleTask(task.id)}
        />

        <span
          className={`flex-grow-1 ${
            task.done || checking
              ? "text-decoration-line-through text-muted"
              : ""
          }`}
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

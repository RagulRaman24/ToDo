import TaskItem from "./TaskItem";
import type { Task } from "../types";

type Props = {
  view: "all" | "today" | "upcoming" | "completed";
  tasks: Task[];
  todayStr: string;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  checkingIds: number[];
};

function dayLabel(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric"
  });
}

export default function TaskPanel({
  view,
  tasks,
  todayStr,
  toggleTask,
  deleteTask,
  checkingIds
}: Props) {

  /* ===== NORMAL FILTERS ===== */

  if (view !== "all") {
    let filtered: Task[] = [];

    if (view === "today") {
      filtered = tasks.filter(t => !t.done && t.dueDate === todayStr);
    }

    if (view === "upcoming") {
      filtered = tasks.filter(t => !t.done && t.dueDate > todayStr);
    }

    if (view === "completed") {
      filtered = tasks.filter(t => t.done);
    }

    return (
      <div className="task-panel">
        <h3 className="mb-4 text-capitalize">{view}</h3>

        {filtered.map(t => (
          <TaskItem
            key={t.id}
            task={t}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            checking={checkingIds.includes(t.id)}
          />
        ))}
      </div>
    );
  }

  const groups: Record<string, Task[]> = {};

  tasks.forEach(t => {
    if (!groups[t.dueDate]) groups[t.dueDate] = [];
    groups[t.dueDate].push(t);
  });

  const sortedDates = Object.keys(groups).sort();

  return (
    <div className="task-panel">
      <h3 className="mb-4">All Tasks</h3>

      <div className="day-board">

        {sortedDates.map(date => (
          <div key={date} className="day-column">

            <div className="day-header">
              {dayLabel(date)}
            </div>

            {groups[date].map(t => (
              <TaskItem
                key={t.id}
                task={t}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                checking={checkingIds.includes(t.id)}
              />
            ))}

          </div>
        ))}

      </div>
    </div>
  );
}

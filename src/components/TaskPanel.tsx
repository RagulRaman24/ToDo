import { useMemo } from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../types";
import styles from "./TaskPanel.module.css";

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

  const filteredTasks = useMemo(() => {
    if (view === "today")
      return tasks.filter(t => !t.done && t.dueDate === todayStr);

    if (view === "upcoming")
      return tasks.filter(t => !t.done && t.dueDate > todayStr);

    if (view === "completed")
      return tasks.filter(t => t.done);

    return tasks;
  }, [tasks, view, todayStr]);

  const groupedTasks = useMemo(() => {
    const groups: Record<string, Task[]> = {};

    tasks.forEach(t => {
      if (!groups[t.dueDate]) groups[t.dueDate] = [];
      groups[t.dueDate].push(t);
    });

    return groups;
  }, [tasks]);

  const sortedDates = useMemo(() => {
    return Object.keys(groupedTasks).sort();
  }, [groupedTasks]);

  if (view !== "all") {
    return (
      <div className={styles.taskPanel}>
        <h3 className={styles.title}>{view}</h3>

        {filteredTasks.map(t => (
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

  return (
    <div className={styles.taskPanel}>
      <h3 className={styles.title}>All Tasks</h3>

      <div className={styles.dayBoard}>
        {sortedDates.map(date => (
          <div key={date} className={styles.dayColumn}>

            <div className={styles.dayHeader}>
              {dayLabel(date)}
            </div>

            {groupedTasks[date].map(t => (
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
import styles from "./Sidebar.module.css";

type Props = {
  view: string;
  setView: (v: any) => void;
  addTask: any;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
};

export default function Sidebar({ view, setView, theme, setTheme }: Props) {
  return (
    <div className={styles.sidebar}>
      <h4 className={styles.title}>TaskFlow</h4>

      <button
        className={`${styles.listBtn} ${styles.addBtn} ${view==="add" ? styles.active : ""}`}
        onClick={() => setView("add")}
      >
        + Add Task
      </button>

      <button className={`${styles.listBtn} ${view==="all" ? styles.active : ""}`}
        onClick={() => setView("all")}>
        All Tasks
      </button>

      <button className={`${styles.listBtn} ${view==="today" ? styles.active : ""}`}
        onClick={() => setView("today")}>
        Today
      </button>

      <button className={`${styles.listBtn} ${view==="upcoming" ? styles.active : ""}`}
        onClick={() => setView("upcoming")}>
        Upcoming
      </button>

      <button className={`${styles.listBtn} ${view==="completed" ? styles.active : ""}`}
        onClick={() => setView("completed")}>
        Completed
      </button>

      <button
        className="btn btn-outline-secondary mt-auto"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}

type Props = {
  view: string;
  setView: (v: any) => void;
  addTask: any;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
};

export default function Sidebar({ view, setView, theme, setTheme }: Props) {
  return (
    <div className="sidebar shadow-sm">

      <h4 className="fw-bold mb-2">TaskFlow</h4>

      <button
        className={`list-btn add-task-menu ${view==="add" && "active"}`}
        onClick={() => setView("add")}
      >
        + Add Task
      </button>

     
      <button
        className={`list-btn ${view==="all" && "active"}`}
        onClick={() => setView("all")}
      >
        All Tasks
      </button>

      <button className={`list-btn ${view==="today" && "active"}`} onClick={()=>setView("today")}>
        Today
      </button>

      <button className={`list-btn ${view==="upcoming" && "active"}`} onClick={()=>setView("upcoming")}>
        Upcoming
      </button>

      <button className={`list-btn ${view==="completed" && "active"}`} onClick={()=>setView("completed")}>
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

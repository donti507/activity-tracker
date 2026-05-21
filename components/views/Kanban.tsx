"use client";
import { useZenos } from "@/context/ZenosContext";
import TaskCard from "../ui/TaskCard";

export default function Kanban() {
  const { state } = useZenos();
  const tasks = state.filterCat ? state.tasks.filter(t => t.cat === state.filterCat) : state.tasks;
  const cols = [
    { key: 'todo', label: 'To Do', color: 'var(--text3)' },
    { key: 'inprogress', label: 'In Progress', color: 'var(--primary)' },
    { key: 'done', label: 'Done', color: 'var(--green)' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
      {cols.map(col => {
        const colTasks = tasks.filter(t => t.status === col.key);
        return (
          <div key={col.key} className="bg-surface-low border border-border p-3 min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-border">
              <span className="text-[11px] font-bold uppercase tracking-wide font-mono" style={{ color: col.color }}>{col.label}</span>
              <span className="text-[10px] font-mono bg-surface-highest px-1.5 py-px text-text3">{colTasks.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {colTasks.length ? colTasks.map(t => <TaskCard key={t.id} task={t} />) : (
                <div className="text-center py-6 text-text3 text-[11px] font-mono opacity-50">Empty</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

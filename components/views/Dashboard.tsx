"use client";
import { useZenos } from "@/context/ZenosContext";
import TaskCard from "../ui/TaskCard";
import { today } from "@/lib/utils";

export default function Dashboard() {
  const { state, updateState } = useZenos();
  const tasks = state.filterCat ? state.tasks.filter(t => t.cat === state.filterCat) : state.tasks;

  const done = tasks.filter(t => t.status === 'done').length;
  const prog = tasks.filter(t => t.status === 'inprogress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const todayTasks = tasks.filter(t => t.date === today());

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
        {[
          { num: tasks.length, label: 'Total Tasks', color: 'text-text' },
          { num: done, label: 'Completed', color: 'text-green' },
          { num: prog, label: 'In Progress', color: 'text-primary' },
          { num: todo, label: 'To Do', color: 'text-amber' },
        ].map(s => (
          <div key={s.label} className="bg-surface-low border border-border p-3.5">
            <div className={`font-anton text-[30px] tracking-wide ${s.color}`}>{s.num}</div>
            <div className="font-mono text-[9px] text-text3 mt-0.5 uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-surface-low border border-border p-3.5 mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[10px] text-text3 uppercase tracking-wide">Overall Progress</span>
          <span className="font-mono text-[12px] text-secondary">{pct}% OPTIMIZED</span>
        </div>
        <div className="h-2 bg-surface-high border border-border overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {todayTasks.length > 0 && (
        <>
          <div className="section-header mt-1"><div className="section-title">Today</div></div>
          {todayTasks.map(t => <TaskCard key={t.id} task={t} />)}
          <div className="h-2" />
        </>
      )}

      <div className="section-header">
        <div className="section-title">
          All Tasks {state.filterCat && `// ${state.categories.find(c => c.id === state.filterCat)?.label}`}
        </div>
        {state.filterCat && (
          <button className="font-mono text-[10px] text-text3 border border-dashed border-border px-2.5 py-1 hover:text-primary hover:border-primary bg-transparent cursor-pointer" onClick={() => updateState({ filterCat: null })}>
            ✕ Clear
          </button>
        )}
      </div>

      {tasks.length ? tasks.map(t => <TaskCard key={t.id} task={t} />) : (
        <div className="text-center py-12 text-text3 text-[11px] font-mono">
          <span className="material-symbols-outlined text-[32px] block mb-2.5 opacity-20 mx-auto">inbox</span>
          No tasks yet — press ⌘K to add one
        </div>
      )}
    </>
  );
}

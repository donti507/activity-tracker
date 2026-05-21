"use client";
import { Task } from "@/types";
import { useZenos } from "@/context/ZenosContext";
import { fmtDate, fmtDateTime } from "@/lib/utils";

export default function TaskCard({ task }: { task: Task }) {
  const { state, toggleTaskDone, deleteTask, setEditTaskId, setShowModal } = useZenos();
  const cat = state.categories.find(c => c.id === task.cat) || { label: 'Unknown', color: '#888' };

  const getTagClass = (id: string) => {
    const map: Record<string, string> = {
      radio: 'bg-[rgba(213,195,255,0.08)] text-tertiary border-[rgba(213,195,255,0.3)]',
      research: 'bg-secondary-dim text-secondary border-[rgba(165,231,255,0.3)]',
      application: 'bg-amber-dim text-amber border-[rgba(255,152,0,0.3)]',
      other: 'bg-[rgba(255,255,255,0.04)] text-text3 border-border',
    };
    return map[id] || 'bg-primary-dim text-primary border-[rgba(255,192,129,0.3)]';
  };

  return (
    <div className="task-card" onClick={() => { setEditTaskId(task.id); setShowModal('editTask'); }}>
      <div className="flex items-start gap-2.5">
        <div
          className={`w-4 h-4 border-[1.5px] border-border2 shrink-0 mt-0.5 cursor-pointer flex items-center justify-center transition-all hover:border-secondary ${task.status === 'done' ? 'bg-secondary border-secondary' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleTaskDone(task.id); }}
        >
          {task.status === 'done' && <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-[13px] font-bold leading-tight ${task.status === 'done' ? 'line-through text-text3' : ''}`}>{task.title}</div>
          <div className="flex gap-1.5 items-center mt-1.5 flex-wrap">
            <span className={`text-[10px] px-1.5 py-0.5 font-medium font-mono tracking-wide border ${getTagClass(task.cat)}`}>{cat.label}</span>
            {task.date && <span className="text-[10px] text-text3 flex items-center gap-0.5 font-mono"><span className="material-symbols-outlined text-[11px]">calendar_today</span>{fmtDate(task.date)}</span>}
            {task.reminder && <span className="text-[10px] text-text3 flex items-center gap-0.5 font-mono"><span className="material-symbols-outlined text-[11px]">alarm</span>{fmtDateTime(task.reminder)}</span>}
          </div>
          {task.note && <div className="text-[11px] text-text3 mt-1 italic">{task.note}</div>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] font-mono text-text3">{task.progress}%</span>
          <button className="text-text3 hover:text-error p-0.5 bg-transparent border-none cursor-pointer" onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}>
            <span className="material-symbols-outlined text-[15px]">delete</span>
          </button>
        </div>
      </div>
      <div className="h-[3px] bg-surface-high mt-2 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300" style={{ width: `${task.progress}%` }} />
      </div>
    </div>
  );
}

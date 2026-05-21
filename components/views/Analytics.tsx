"use client";
import { useZenos } from "@/context/ZenosContext";

export default function Analytics() {
  const { state } = useZenos();
  const { tasks, completionLog } = state;

  const done = tasks.filter(t => t.status === 'done').length;
  const prog = tasks.filter(t => t.status === 'inprogress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const total = tasks.length || 1;

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const weekCounts = days.map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().split('T')[0];
    return completionLog.filter(l => l === ds).length;
  });
  const maxW = Math.max(...weekCounts, 1);

  const streakDays = new Set(completionLog);
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    if (streakDays.has(d.toISOString().split('T')[0])) streak++;
    else break;
  }

  const catStats = state.categories.map(c => ({
    ...c,
    count: tasks.filter(t => t.cat === c.id).length,
  })).filter(c => c.count > 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-4">
      {/* Weekly completions bar chart */}
      <div className="bg-surface-low border border-border p-4">
        <div className="font-mono text-[10px] text-text3 uppercase tracking-wide mb-3.5">Weekly Completions</div>
        <div className="flex items-end gap-1.5 h-20">
          {weekCounts.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="font-mono text-[9px] text-primary">{v || ''}</span>
              <div className="w-full bg-primary hover:brightness-125 transition-all min-h-[2px]" style={{ height: `${(v / maxW) * 60}px` }} />
              <span className="font-mono text-[9px] text-text3">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-surface-low border border-border p-4">
        <div className="font-mono text-[10px] text-text3 uppercase tracking-wide mb-3.5">By Category</div>
        <div className="flex flex-col gap-1.5">
          {catStats.map(c => (
            <div key={c.id} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
              <span className="text-[11px] flex-1">{c.label}</span>
              <span className="font-mono text-[10px] text-text3">{c.count}</span>
              <div className="w-16 h-[3px] bg-surface-high overflow-hidden">
                <div className="h-full" style={{ width: `${(c.count / total) * 100}%`, background: c.color }} />
              </div>
            </div>
          ))}
          {catStats.length === 0 && <div className="text-[11px] text-text3 font-mono">No data yet</div>}
        </div>
      </div>

      {/* Status breakdown */}
      <div className="bg-surface-low border border-border p-4">
        <div className="font-mono text-[10px] text-text3 uppercase tracking-wide mb-3.5">Status Breakdown</div>
        {[
          { label: 'Done', val: done, color: 'var(--green)' },
          { label: 'In Progress', val: prog, color: 'var(--primary)' },
          { label: 'To Do', val: todo, color: 'var(--text3)' },
        ].map(s => (
          <div key={s.label} className="mb-2.5">
            <div className="flex justify-between font-mono text-[10px] mb-1">
              <span className="text-text2">{s.label}</span>
              <span style={{ color: s.color }}>{s.val} / {tasks.length}</span>
            </div>
            <div className="h-[3px] bg-surface-high overflow-hidden">
              <div className="h-full transition-all duration-300" style={{ width: `${(s.val / total) * 100}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div className="bg-surface-low border border-border p-4 flex flex-col items-center justify-center">
        <div className="font-mono text-[10px] text-text3 uppercase tracking-wide mb-3">Completion Streak</div>
        <div className="text-4xl mb-1">🔥</div>
        <div className="font-anton text-[48px] text-primary leading-none tracking-wide">{streak}</div>
        <div className="font-mono text-[10px] text-text3 mt-1.5 uppercase tracking-wide">Days in a row</div>
      </div>
    </div>
  );
}

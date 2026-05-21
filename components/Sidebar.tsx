"use client";
import { useZenos } from "@/context/ZenosContext";
import { fmtDateTime } from "@/lib/utils";

export default function Sidebar() {
  const { state, updateState, setShowModal } = useZenos();

  const views = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'kanban', icon: 'view_kanban', label: 'Board' },
    { id: 'calendar', icon: 'calendar_today', label: 'Calendar' },
    { id: 'analytics', icon: 'analytics', label: 'Analytics' },
    { id: 'vault', icon: 'folder_open', label: 'Vault' },
  ];

  const upcoming = state.tasks
    .filter(t => t.reminder && new Date(t.reminder) > new Date() && t.status !== 'done')
    .sort((a, b) => new Date(a.reminder).getTime() - new Date(b.reminder).getTime())
    .slice(0, 4);

  return (
    <div className="w-[220px] shrink-0 bg-surface-low border-r border-border flex-col py-4 overflow-y-auto hidden md:flex">
      <div className="px-4 pb-3.5 border-b border-border mb-2.5">
        <div className="font-anton text-xl text-primary tracking-[3px]">ZEN_OS</div>
        <div className="font-mono text-[9px] text-text3 tracking-[1px] mt-px opacity-70">POWERED BY DANTE</div>
      </div>

      <div className="px-2.5 mb-3.5">
        <div className="font-mono text-[9px] text-text3 uppercase tracking-[1.5px] px-1.5 mb-1">Views</div>
        {views.map(v => (
          <button key={v.id} onClick={() => updateState({ view: v.id })} className={`nav-item ${state.view === v.id ? 'active' : ''}`}>
            <span className="material-symbols-outlined text-[17px]">{v.icon}</span> {v.label}
          </button>
        ))}
        <button onClick={() => updateState({ view: 'dante' })} className={`nav-item mt-1.5 border-t border-border pt-2.5 ${state.view === 'dante' ? 'active' : ''}`}>
          <span className="material-symbols-outlined text-[17px] text-primary">psychology</span>
          <span className="text-primary">Dante AI</span>
        </button>
      </div>

      <div className="px-2.5 mb-3.5">
        <div className="font-mono text-[9px] text-text3 uppercase tracking-[1.5px] px-1.5 mb-1">Categories</div>
        {state.categories.map(c => (
          <button key={c.id} onClick={() => updateState({ filterCat: state.filterCat === c.id ? null : c.id })} className={`nav-item ${state.filterCat === c.id ? 'active' : ''}`}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.color }} />
            <span className="flex-1 truncate">{c.label}</span>
            <span className="ml-auto text-[10px] text-text3 bg-surface-highest px-1.5 py-[1px] font-mono">{state.tasks.filter(t => t.cat === c.id).length}</span>
          </button>
        ))}
        <button onClick={() => setShowModal('addCategory')} className="nav-item text-text3 mt-1">
          <span className="material-symbols-outlined text-[17px]">add</span> New category
        </button>
      </div>

      <div className="mt-auto px-4 pt-3 border-t border-border">
        <div className="font-mono text-[9px] text-text3 uppercase tracking-[1.5px] mb-1.5">Reminders</div>
        {upcoming.length ? upcoming.map(t => (
          <div key={t.id} className="flex items-center gap-1.5 py-1 text-[11px] text-text2 border-b border-border last:border-b-0">
            <span className="material-symbols-outlined text-[13px] text-amber">alarm</span>
            <div className="flex-1 min-w-0">
              <div className="truncate">{t.title}</div>
              <div className="text-[9px] text-text3 font-mono">{fmtDateTime(t.reminder)}</div>
            </div>
          </div>
        )) : <div className="text-[10px] text-text3 font-mono">No upcoming</div>}
      </div>
    </div>
  );
}

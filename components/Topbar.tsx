"use client";
import { useZenos } from "@/context/ZenosContext";
import { useEffect } from "react";

export default function Topbar() {
  const { state, updateState, toggleTheme, setShowModal } = useZenos();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setShowModal('addTask'); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setShowModal]);

  return (
    <div className="px-5 py-2.5 border-b border-border flex items-center justify-between bg-surface-low shrink-0 gap-2.5 overflow-x-auto">
      <div className="md:hidden">
        <span className="font-anton text-primary text-lg tracking-widest mr-4">ZEN_OS</span>
      </div>
      <div className="gap-0.5 flex-wrap hidden md:flex">
        {['dashboard', 'kanban', 'calendar', 'analytics', 'vault'].map(v => (
          <button key={v} onClick={() => updateState({ view: v })} className={`view-tab ${state.view === v ? 'active' : ''}`}>
            {v}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1.5 shrink-0 ml-auto">
        <span className="hidden md:inline-block font-mono text-[9px] text-text3 border border-border px-1.5 py-0.5">⌘K</span>
        <button className="icon-btn" onClick={toggleTheme}>
          <span className="material-symbols-outlined text-[18px]">{state.theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
        </button>
        <button
          className="flex items-center gap-1 px-3.5 py-1.5 bg-primary text-[#2c1600] text-[11px] font-mono font-bold tracking-wide uppercase hover:brightness-110 transition-all"
          onClick={() => setShowModal('addTask')}
        >
          <span className="material-symbols-outlined text-[15px]">add</span> Add Task
        </button>
      </div>
    </div>
  );
}

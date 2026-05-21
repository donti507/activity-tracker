"use client";
import { useZenos } from "@/context/ZenosContext";
import { useState, useEffect } from "react";

export default function Modals() {
  const { state, showModal, setShowModal, editTaskId, setEditTaskId, addTask, updateState } = useZenos();
  const [taskData, setTaskData] = useState({ title: '', cat: 'radio', status: 'todo', date: '', reminder: '', note: '', progress: 0 });
  const [newCat, setNewCat] = useState({ label: '', color: '#ffc081' });

  useEffect(() => {
    if (showModal === 'editTask' && editTaskId) {
      const t = state.tasks.find(x => x.id === editTaskId);
      if (t) setTaskData(t as any);
    } else if (showModal === 'addTask') {
      setTaskData({ title: '', cat: state.categories[0]?.id || 'other', status: 'todo', date: '', reminder: '', note: '', progress: 0 });
    }
  }, [showModal, editTaskId]);

  if (!showModal) return null;

  const handleSaveTask = () => {
    if (!taskData.title.trim()) return;
    if (showModal === 'addTask') {
      addTask({ ...taskData, steps: [] } as any);
    } else if (showModal === 'editTask' && editTaskId) {
      updateState({ tasks: state.tasks.map(t => t.id === editTaskId ? { ...t, ...taskData } as any : t) });
    }
    setShowModal(null);
    setEditTaskId(null);
  };

  const handleAddCategory = () => {
    if (!newCat.label.trim()) return;
    const id = newCat.label.toLowerCase().replace(/\s+/g, '-');
    updateState({ categories: [...state.categories, { id, label: newCat.label, color: newCat.color }] });
    setNewCat({ label: '', color: '#ffc081' });
    setShowModal(null);
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm" onClick={() => { setShowModal(null); setEditTaskId(null); }}>
      <div className="bg-surface-low border border-border p-5 w-[420px] max-w-[95vw] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

        {/* ADD / EDIT TASK */}
        {(showModal === 'addTask' || showModal === 'editTask') && (
          <>
            <div className="font-anton text-[18px] tracking-widest text-primary mb-4">{showModal === 'addTask' ? 'NEW TASK' : 'EDIT TASK'}</div>
            <div className="mb-3">
              <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Title *</label>
              <input className="form-input" value={taskData.title} onChange={e => setTaskData({...taskData, title: e.target.value})} autoFocus onKeyDown={e => e.key === 'Enter' && handleSaveTask()} />
            </div>
            <div className="mb-3">
              <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Category</label>
              <select className="form-select" value={taskData.cat} onChange={e => setTaskData({...taskData, cat: e.target.value})}>
                {state.categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Status</label>
              <select className="form-select" value={taskData.status} onChange={e => setTaskData({...taskData, status: e.target.value as any})}>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Date</label>
                <input type="date" className="form-input" value={taskData.date} onChange={e => setTaskData({...taskData, date: e.target.value})} />
              </div>
              <div>
                <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Reminder</label>
                <input type="datetime-local" className="form-input" value={taskData.reminder} onChange={e => setTaskData({...taskData, reminder: e.target.value})} />
              </div>
            </div>
            <div className="mb-3">
              <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Progress ({taskData.progress}%)</label>
              <input type="range" min={0} max={100} className="w-full accent-[var(--primary)]" value={taskData.progress} onChange={e => setTaskData({...taskData, progress: Number(e.target.value)})} />
            </div>
            <div className="mb-4">
              <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Note</label>
              <textarea className="form-textarea min-h-[60px]" value={taskData.note} onChange={e => setTaskData({...taskData, note: e.target.value})} />
            </div>
            <div className="flex justify-end gap-2">
              <button className="btn border border-border text-text2 hover:bg-surface-high hover:text-text cursor-pointer" onClick={() => { setShowModal(null); setEditTaskId(null); }}>Cancel</button>
              <button className="btn bg-primary text-[#2c1600] hover:brightness-110 cursor-pointer" onClick={handleSaveTask}>Save</button>
            </div>
          </>
        )}

        {/* ADD CATEGORY */}
        {showModal === 'addCategory' && (
          <>
            <div className="font-anton text-[18px] tracking-widest text-primary mb-4">NEW CATEGORY</div>
            <div className="mb-3">
              <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Name *</label>
              <input className="form-input" value={newCat.label} onChange={e => setNewCat({...newCat, label: e.target.value})} autoFocus />
            </div>
            <div className="mb-4">
              <label className="block font-mono text-[9px] text-text3 uppercase tracking-wide mb-1">Color</label>
              <div className="flex items-center gap-2">
                <input type="color" className="w-10 h-8 cursor-pointer border border-border bg-surface-mid" value={newCat.color} onChange={e => setNewCat({...newCat, color: e.target.value})} />
                <span className="font-mono text-[11px] text-text3">{newCat.color}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="btn border border-border text-text2 hover:bg-surface-high cursor-pointer" onClick={() => setShowModal(null)}>Cancel</button>
              <button className="btn bg-primary text-[#2c1600] hover:brightness-110 cursor-pointer" onClick={handleAddCategory}>Add</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ZenosState, Task, Category, SpecialTask, VaultItem } from '@/types';
import { today } from '@/lib/utils';

const DEFAULT_STATE: ZenosState = {
  view: 'dashboard',
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
  theme: 'dark',
  filterCat: null,
  tasks: [
    { id: 1, title: 'Record episode 12', cat: 'radio', status: 'inprogress', date: '2026-05-18', reminder: '2026-05-18T09:00', note: 'Prepare script first', progress: 60, steps: [] },
    { id: 2, title: 'Literature review — AI agents', cat: 'research', status: 'todo', date: '2026-05-20', reminder: '2026-05-20T10:00', note: 'Focus on 2024-2025 papers', progress: 20, steps: [] },
  ],
  categories: [
    { id: 'radio', label: 'Radio Work', color: '#d5c3ff' },
    { id: 'research', label: 'Research', color: '#a5e7ff' },
    { id: 'application', label: 'Application', color: '#ff9800' },
    { id: 'other', label: 'Other', color: '#888' },
  ],
  specialTasks: [],
  vault: [],
  danteHistory: [],
  completionLog: [],
};

const ZenosContext = createContext<{
  state: ZenosState;
  updateState: (updates: Partial<ZenosState>) => void;
  toggleTheme: () => void;
  toggleTaskDone: (id: number) => void;
  deleteTask: (id: number) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  showModal: string | null;
  setShowModal: (m: string | null) => void;
  editTaskId: number | null;
  setEditTaskId: (id: number | null) => void;
} | null>(null);

export const ZenosProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ZenosState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('zen-os-v4');
    if (saved) setState(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('zen-os-v4', JSON.stringify(state));
      document.body.classList.toggle('light-mode', state.theme === 'light');
    }
  }, [state, mounted]);

  const updateState = (updates: Partial<ZenosState>) => setState(s => ({ ...s, ...updates }));

  const toggleTheme = () => updateState({ theme: state.theme === 'dark' ? 'light' : 'dark' });

  const toggleTaskDone = (id: number) => {
    setState(s => {
      const newTasks = s.tasks.map(t => {
        if (t.id !== id) return t;
        const isDone = t.status === 'done';
        return { ...t, status: isDone ? 'inprogress' as const : 'done' as const, progress: isDone ? t.progress : 100 };
      });
      return { ...s, tasks: newTasks, completionLog: [...s.completionLog, today()] };
    });
  };

  const deleteTask = (id: number) => setState(s => ({ ...s, tasks: s.tasks.filter(t => t.id !== id) }));

  const addTask = (taskData: Omit<Task, 'id'>) => {
    setState(s => ({
      ...s,
      tasks: [...s.tasks, { ...taskData, id: Date.now() }]
    }));
  };

  if (!mounted) return null;

  return (
    <ZenosContext.Provider value={{ state, updateState, toggleTheme, toggleTaskDone, deleteTask, addTask, showModal, setShowModal, editTaskId, setEditTaskId }}>
      {children}
    </ZenosContext.Provider>
  );
};

export const useZenos = () => {
  const ctx = useContext(ZenosContext);
  if (!ctx) throw new Error("useZenos must be used within ZenosProvider");
  return ctx;
};

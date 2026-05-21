export interface Task {
  id: number;
  title: string;
  cat: string;
  status: 'todo' | 'inprogress' | 'done';
  date: string;
  reminder: string;
  note: string;
  progress: number;
  steps?: { label: string; done: boolean }[];
}

export interface Category {
  id: string;
  label: string;
  color: string;
}

export interface SpecialTask {
  id: string;
  title: string;
  cat: string;
  deadline: string;
  steps: { label: string; done: boolean }[];
}

export interface VaultItem {
  id: string;
  type: 'file' | 'link';
  name: string;
  detail: string;
  url?: string;
  fileType?: string;
  size?: number;
  data?: string;
  addedAt: string;
}

export interface ZenosState {
  view: string;
  calYear: number;
  calMonth: number;
  theme: 'dark' | 'light';
  tasks: Task[];
  categories: Category[];
  specialTasks: SpecialTask[];
  vault: VaultItem[];
  danteHistory: { role: 'user' | 'assistant'; content: string; ts: number }[];
  completionLog: string[];
  filterCat: string | null;
}

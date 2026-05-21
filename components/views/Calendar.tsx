"use client";
import { useZenos } from "@/context/ZenosContext";

export default function Calendar() {
  const { state, updateState } = useZenos();
  const { calYear, calMonth, tasks } = state;

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrev = new Date(calYear, calMonth, 0).getDate();
  const todayStr = new Date().toISOString().split('T')[0];

  const prevMonth = () => {
    if (calMonth === 0) updateState({ calMonth: 11, calYear: calYear - 1 });
    else updateState({ calMonth: calMonth - 1 });
  };
  const nextMonth = () => {
    if (calMonth === 11) updateState({ calMonth: 0, calYear: calYear + 1 });
    else updateState({ calMonth: calMonth + 1 });
  };

  const cells: { day: number; month: 'prev' | 'cur' | 'next'; dateStr: string }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    const m = calMonth === 0 ? 11 : calMonth - 1;
    const y = calMonth === 0 ? calYear - 1 : calYear;
    cells.push({ day: d, month: 'prev', dateStr: `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: 'cur', dateStr: `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}` });
  }
  let next = 1;
  while (cells.length % 7 !== 0) {
    const m = calMonth === 11 ? 0 : calMonth + 1;
    const y = calMonth === 11 ? calYear + 1 : calYear;
    cells.push({ day: next++, month: 'next', dateStr: `${y}-${String(m+1).padStart(2,'0')}-${String(next-1).padStart(2,'0')}` });
  }

  const getTasksForDate = (dateStr: string) => tasks.filter(t => t.date === dateStr);

  return (
    <>
      <div className="flex items-center justify-between mb-3.5">
        <button className="bg-transparent border border-border text-text2 px-2.5 py-1 cursor-pointer text-[12px] font-mono hover:bg-surface-high hover:text-text" onClick={prevMonth}>←</button>
        <span className="font-mono text-[13px] text-text uppercase tracking-wider">{monthNames[calMonth]} {calYear}</span>
        <button className="bg-transparent border border-border text-text2 px-2.5 py-1 cursor-pointer text-[12px] font-mono hover:bg-surface-high hover:text-text" onClick={nextMonth}>→</button>
      </div>

      <div className="grid grid-cols-7 gap-[3px]">
        {dayNames.map(d => (
          <div key={d} className="text-center text-[9px] text-text3 py-1 uppercase tracking-wide font-mono">{d}</div>
        ))}
        {cells.map((cell, i) => {
          const cellTasks = getTasksForDate(cell.dateStr);
          const isToday = cell.dateStr === todayStr && cell.month === 'cur';
          return (
            <div
              key={i}
              className={`bg-surface-low border border-border p-1 min-h-[52px] cursor-pointer transition-colors hover:border-border2
                ${isToday ? 'border-primary bg-primary-dim' : ''}
                ${cellTasks.length > 0 && !isToday ? 'border-l-2 border-l-secondary' : ''}
                ${cell.month !== 'cur' ? 'opacity-25' : ''}
              `}
            >
              <div className={`text-[10px] font-mono mb-0.5 ${isToday ? 'text-primary font-bold' : 'text-text2'}`}>{cell.day}</div>
              {cellTasks.slice(0,3).map(t => (
                <div key={t.id} className="w-[5px] h-[5px] rounded-full my-px" style={{ background: state.categories.find(c => c.id === t.cat)?.color || 'var(--primary)' }} />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

"use client";
import { useZenos } from "@/context/ZenosContext";
import { useState, useRef, useEffect } from "react";

export default function DanteAI() {
  const { state, updateState } = useZenos();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.danteHistory, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const newHistory = [...state.danteHistory, { role: 'user' as const, content: input, ts: Date.now() }];
    updateState({ danteHistory: newHistory });
    setInput('');
    setLoading(true);

    // Replace with your API route: app/api/dante/route.ts -> Anthropic API
    setTimeout(() => {
      updateState({
        danteHistory: [...newHistory, {
          role: 'assistant' as const,
          content: `I'm Dante, your ZEN_OS AI. You have ${state.tasks.length} tasks (${state.tasks.filter(t => t.status === 'done').length} done). Connect me to the Anthropic API for full intelligence.`,
          ts: Date.now()
        }]
      });
      setLoading(false);
    }, 1200);
  };

  const suggestions = ['Summarize my tasks', 'What's overdue?', 'Show my progress', 'Help me prioritize'];

  return (
    <div className="flex flex-col -m-4 md:-m-5 border border-border" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-3 bg-surface-low shrink-0">
        <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-anton text-[#1a0a00] text-[14px] shadow-[0_0_14px_rgba(255,192,129,0.3)]">D</div>
        <div>
          <div className="font-anton text-[16px] tracking-widest text-primary">DANTE</div>
          <div className="font-mono text-[9px] text-text3 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" /> Online · Full data access
          </div>
        </div>
        <button className="icon-btn ml-auto" onClick={() => updateState({ danteHistory: [] })}>
          <span className="material-symbols-outlined text-[17px]">delete_sweep</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {state.danteHistory.length === 0 && (
          <div className="flex gap-2.5 max-w-[85%]">
            <div className="w-7 h-7 bg-gradient-to-br from-primary to-secondary text-[#1a0a00] flex items-center justify-center font-anton text-[11px] shrink-0 mt-0.5">D</div>
            <div className="bg-surface-low border border-border p-2.5 text-[13px] leading-relaxed">
              Hey. I'm Dante — I've got full access to everything in your ZEN_OS. Ask me anything.
            </div>
          </div>
        )}
        {state.danteHistory.map((m, i) => (
          <div key={i} className={`flex gap-2.5 max-w-[85%] ${m.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 flex items-center justify-center font-anton text-[11px] shrink-0 mt-0.5 ${m.role === 'user' ? 'bg-surface-highest text-text2' : 'bg-gradient-to-br from-primary to-secondary text-[#1a0a00]'}`}>
              {m.role === 'user' ? 'U' : 'D'}
            </div>
            <div className={`p-2.5 text-[13px] leading-relaxed border ${m.role === 'user' ? 'bg-primary-dim border-border2 text-text' : 'bg-surface-low border-border text-text'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5 max-w-[85%]">
            <div className="w-7 h-7 bg-gradient-to-br from-primary to-secondary text-[#1a0a00] flex items-center justify-center font-anton text-[11px] shrink-0 mt-0.5">D</div>
            <div className="p-3 flex gap-1 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-text3 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-text3 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-text3 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      {state.danteHistory.length === 0 && (
        <div className="flex gap-1.5 px-4 pb-2.5 flex-wrap shrink-0">
          {suggestions.map(s => (
            <button key={s} className="px-2.5 py-1 bg-surface-mid border border-border text-text3 text-[10px] font-mono cursor-pointer hover:text-primary hover:border-primary transition-all" onClick={() => setInput(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3.5 border-t border-border flex gap-2 bg-surface-low shrink-0">
        <textarea
          className="form-textarea flex-1 min-h-[42px] max-h-[100px] resize-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Ask Dante anything..."
        />
        <button
          className="bg-primary text-[#2c1600] px-4 font-mono text-[11px] font-bold tracking-wide uppercase hover:brightness-110 flex items-center gap-1 border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={loading}
        >
          <span className="material-symbols-outlined text-[16px]">send</span>Send
        </button>
      </div>
    </div>
  );
}

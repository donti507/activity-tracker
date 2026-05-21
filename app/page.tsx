"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useZenos } from "@/context/ZenosContext";
import Dashboard from "@/components/views/Dashboard";
import Kanban from "@/components/views/Kanban";
import Calendar from "@/components/views/Calendar";
import Analytics from "@/components/views/Analytics";
import Vault from "@/components/views/Vault";
import DanteAI from "@/components/views/DanteAI";
import Modals from "@/components/Modals";

export default function Home() {
  const { state } = useZenos();

  const renderView = () => {
    switch (state.view) {
      case 'dashboard': return <Dashboard />;
      case 'kanban': return <Kanban />;
      case 'calendar': return <Calendar />;
      case 'analytics': return <Analytics />;
      case 'vault': return <Vault />;
      case 'dante': return <DanteAI />;
      default: return <Dashboard />;
    }
  };

  return (
    <main className="flex h-screen overflow-hidden relative z-10">
      <div className="absolute inset-0 pointer-events-none bg-speed-lines z-0" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-4 md:p-5 bg-bg transition-colors duration-200">
          {renderView()}
        </div>
      </div>
      <Modals />
    </main>
  );
}

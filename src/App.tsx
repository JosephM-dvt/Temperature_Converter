import { useState } from "react";
import TemperatureConverter from "./components/tempConverter";
import TeamDirectory from "./components/teamDirectory";
import { Thermometer } from "lucide-react";

type Tab = "converter" | "directory";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("converter");

  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 border-b border-base-300 shadow-sm">
        <div className="container mx-auto max-w-2xl flex justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded">
              <Thermometer size={20} className="text-primary-content" />
            </div>
            <span className="text-lg font-black uppercase tracking-tighter">TempKit</span>
          </div>
          <div className="join border border-primary">
            <button
              onClick={() => setActiveTab("converter")}
              className={`join-item btn btn-xs px-4 ${activeTab === "converter" ? "btn-primary" : "btn-ghost"}`}
            >
              Converter
            </button>
            <button
              onClick={() => setActiveTab("directory")}
              className={`join-item btn btn-xs px-4 ${activeTab === "directory" ? "btn-primary" : "btn-ghost"}`}
            >
              Team
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-6">
            {activeTab === "converter" ? <TemperatureConverter /> : <TeamDirectory />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
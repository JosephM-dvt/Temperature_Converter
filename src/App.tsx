import { useState } from "react";
import TemperatureConverter from "./components/tempConverter";
import TeamDirectory from "./components/teamDirectory";
import { Thermometer } from "lucide-react";

type Tab = "converter" | "directory";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("converter");

  return (
    <div className="min-h-screen bg-gray-100" >
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Thermometer size={22} />
            <span className="text-xl font-bold">TempKit</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("converter")}
              className={`px-3 py-1 rounded text-sm font-medium border border-white ${activeTab === "converter" ? "bg-white text-blue-600" : "text-white"}`}
            >
              Converter
            </button>
            <button
              onClick={() => setActiveTab("directory")}
              className={`px-3 py-1 rounded text-sm font-medium border border-white ${activeTab === "directory" ? "bg-white text-blue-600" : "text-white"}`}
            >
              Team
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {activeTab === "converter" ? <TemperatureConverter /> : <TeamDirectory />}
      </main>
    </div>
  );
};

export default Index;

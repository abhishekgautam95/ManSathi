
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  Search, 
  FileText, 
  Settings,
  ShieldCheck,
  CheckCircle,
  Video
} from 'lucide-react';
import { Button } from '../components/Button';
import { GeminiService } from '../services/geminiService';

const TherapistDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    // Mock notes
    const notes = "Patient mentioned high stress at work due to a new manager. Sleep has been erratic. Feeling anxious in the mornings.";
    const result = await GeminiService.summarizeSession(notes);
    setSummary(result);
    setIsSummarizing(false);
    setShowSummary(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Psychologist Portal</h1>
          <p className="text-teal-600 flex items-center gap-1 text-sm font-semibold">
            <ShieldCheck size={16} /> Verified RCI License Holder
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary"><Settings size={18} /> Availability</Button>
          <Button><Calendar size={18} /> View Schedule</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {[
            { id: 'patients', label: 'My Patients', icon: Users },
            { id: 'calendar', label: 'Upcoming Sessions', icon: Clock },
            { id: 'analytics', label: 'Growth & Insights', icon: FileText }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Active Cases</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search patient UID..." 
                  className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 ring-teal-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-xs text-gray-400 font-bold uppercase tracking-wider">
                    <th className="pb-4">Patient UID</th>
                    <th className="pb-4">Last Session</th>
                    <th className="pb-4">Session Status</th>
                    <th className="pb-4">AI Insight</th>
                    <th className="pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { uid: 'USR-8912 (Anon)', date: 'Oct 12, 2023', status: 'Completed', insight: 'High Anxiety Trend' },
                    { uid: 'USR-4421 (Anon)', date: 'Oct 10, 2023', status: 'Completed', insight: 'Stable Mood' },
                    { uid: 'Rajesh M.', date: 'Oct 08, 2023', status: 'Follow-up', insight: 'Recent Trauma Trigger' }
                  ].map((p, i) => (
                    <tr key={i} className="group hover:bg-gray-50">
                      <td className="py-4 font-medium text-gray-800">{p.uid}</td>
                      <td className="py-4 text-sm text-gray-500">{p.date}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold">{p.status}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-xs text-orange-600 font-semibold">{p.insight}</span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" className="p-2" onClick={handleSummarize}>
                            <FileText size={16} />
                          </Button>
                          <Button variant="ghost" className="p-2">
                            <Video size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Session Intelligence Panel */}
          {showSummary && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-teal-900 font-bold flex items-center gap-2">
                  <Zap size={20} className="fill-teal-500" /> AI Session Summary
                </h3>
                <Button variant="ghost" onClick={() => setShowSummary(false)} className="text-teal-900">Close</Button>
              </div>
              <div className="prose prose-sm text-teal-800 max-w-none">
                <p>{summary || "Generating deep clinical insights..."}</p>
              </div>
              <div className="mt-4 flex gap-4">
                <Button className="bg-teal-700 hover:bg-teal-800 text-white border-none text-xs">Append to Clinical Notes</Button>
                <Button variant="secondary" className="text-xs">Edit Summary</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Zap = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13 2L3 14H12V22L22 10H13V2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default TherapistDashboard;


import React, { useState } from 'react';
import { 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Plus, 
  Info,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { MOCK_MOODS, COLORS } from '../constants';
import { Button } from '../components/Button';
import { CrisisAlert } from '../components/CrisisAlert';

const PatientDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome back, Friend</h1>
          <div className="flex items-center gap-3">
             <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
               <ShieldAlert size={12} /> Anonymous Mode
             </span>
             <span className="text-gray-400 text-sm font-medium">UID: MannSathi-9921-A</span>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="secondary" className="flex-1 md:flex-none h-12 rounded-xl">
             History
          </Button>
          <Button variant="primary" className="flex-1 md:flex-none h-12 rounded-xl shadow-lg">
            <Plus size={18} /> Book Session
          </Button>
        </div>
      </div>

      <CrisisAlert />

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main Stats Area */}
        <div className="lg:col-span-2 space-y-10">
          {/* Mood Trend Chart */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-black text-xl flex items-center gap-2 text-gray-900">
                <TrendingUp size={24} className="text-teal-600" /> Your Emotional Flow
              </h3>
              <select className="text-xs font-bold border border-gray-100 bg-gray-50 rounded-xl px-4 py-2 outline-none text-gray-600 focus:ring-2 ring-teal-500">
                <option>Past 7 Days</option>
                <option>Past 30 Days</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_MOODS}>
                  <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tick={{fontSize: 11, fontWeight: 600, fill: '#94a3b8'}} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10}
                  />
                  <YAxis domain={[0, 10]} hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1.25rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                    itemStyle={{ fontWeight: 800, color: COLORS.primary }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke={COLORS.primary} 
                    strokeWidth={4} 
                    dot={{ fill: COLORS.primary, strokeWidth: 2, stroke: '#fff', r: 6 }} 
                    activeDot={{ r: 8, strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="font-black text-xl mb-6 flex items-center gap-2 text-gray-900">
              <Calendar size={24} className="text-teal-600" /> Your Next Sessions
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-teal-50/50 rounded-[1.5rem] border border-teal-100 group hover:border-teal-300 transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 font-black border border-teal-100 shadow-sm text-lg">
                    AS
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg">Dr. Ananya Sharma</p>
                    <p className="text-sm text-gray-500 font-medium">Tomorrow • 4:30 PM (Video Session)</p>
                  </div>
                </div>
                <Button variant="primary" className="h-11 rounded-xl shadow-teal-100 shadow-md">Join Call</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-10">
          {/* Quick AI Triage */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
               <Sparkles size={80} />
            </div>
            <h3 className="font-black text-2xl mb-3 relative z-10">Need a listener?</h3>
            <p className="text-teal-100 text-sm mb-8 leading-relaxed relative z-10 font-medium">Our MannSathi AI is trained to guide you through anxiety or just listen to your day.</p>
            <Button variant="secondary" className="w-full bg-white text-teal-700 border-none h-14 rounded-2xl font-black relative z-10 shadow-lg hover:shadow-xl transition-all" onClick={() => window.location.hash = '#/chat'}>
              <MessageCircle size={20} className="mr-2" /> Start Chatting
            </Button>
          </div>

          {/* Quick Journal */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="font-black text-xl mb-6 text-gray-900">Today's Pulse</h3>
            <div className="flex gap-3 justify-between mb-8">
              {['😔', '😐', '😊', '🤩'].map((emoji, i) => (
                <button key={i} className="text-3xl p-4 bg-gray-50 rounded-2xl hover:bg-teal-50 hover:scale-110 transition-all duration-200">{emoji}</button>
              ))}
            </div>
            <textarea 
              className="w-full border-2 border-gray-50 p-4 rounded-2xl text-sm bg-gray-50 focus:bg-white focus:border-teal-200 transition-all h-32 outline-none font-medium text-gray-700" 
              placeholder="What's been happening?"
            />
            <Button className="w-full mt-4 h-12 rounded-xl font-black">Save to Journal</Button>
          </div>

          <div className="bg-orange-50 p-6 rounded-[1.5rem] flex items-start gap-4 border border-orange-100">
            <div className="bg-orange-100 p-2 rounded-xl">
               <Info size={20} className="text-orange-600 flex-shrink-0" />
            </div>
            <p className="text-xs text-orange-800 leading-relaxed font-semibold">
              <strong>Smart Matching:</strong> MannSathi uses your journal entries to match you with psychologists who specialize in your specific emotional patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

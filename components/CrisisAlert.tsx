
import React from 'react';
import { Phone, AlertTriangle } from 'lucide-react';

export const CrisisAlert: React.FC = () => {
  return (
    <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-lg flex items-start gap-4 shadow-sm animate-pulse">
      <div className="bg-red-100 p-2 rounded-full">
        <AlertTriangle className="text-red-600 w-6 h-6" />
      </div>
      <div>
        <h3 className="text-red-800 font-bold">In Crisis or Emergency?</h3>
        <p className="text-red-700 text-sm mb-2">
          If you are feeling suicidal or need immediate help, please call:
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="tel:9152987821" className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-red-700">
            <Phone size={14} /> AASRA (24/7): 91-52987821
          </a>
          <a href="tel:14416" className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-red-700">
            <Phone size={14} /> Tele-MANAS: 14416
          </a>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  Menu, 
  X,
  Plus,
  ShieldCheck,
  Zap
} from 'lucide-react';

import { UserRole, User as UserType } from './types';
import Landing from './views/Landing';
import PatientDashboard from './views/PatientDashboard';
import TherapistDashboard from './views/TherapistDashboard';
import AIChat from './views/AIChat';
import { Button } from './components/Button';

const Navbar = ({ user, onLogout }: { user: UserType | null, onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-teal-600 p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900">MannSathi</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/dashboard" className={`text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'}`}>Dashboard</Link>
                <Link to="/chat" className={`text-sm font-semibold transition-colors ${isActive('/chat') ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'}`}>MannSathi AI</Link>
                <div className="flex items-center gap-4 pl-6 border-l">
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 bg-teal-50 text-teal-700 rounded-lg font-black border border-teal-100">
                    <ShieldCheck size={12} /> {user.role}
                  </span>
                  <button onClick={onLogout} className="text-sm font-medium text-gray-400 hover:text-red-600 transition-colors">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-gray-500 hover:text-teal-600">For Psychologists</Link>
                <Button variant="primary" className="rounded-full px-6">Seek Help</Button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-2 bg-gray-50 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-b px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-900">Dashboard</Link>
              <Link to="/chat" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-900">MannSathi AI</Link>
              <button onClick={() => { onLogout(); setIsOpen(false); }} className="block w-full text-left text-lg font-bold text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-gray-900">For Psychologists</Link>
              <Button onClick={() => setIsOpen(false)} className="w-full">Get Started</Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white border-t py-16">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex justify-center items-center gap-2 mb-6">
        <div className="bg-teal-600 p-1.5 rounded-lg">
           <Heart className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-black text-gray-900">MannSathi</span>
      </div>
      <p className="text-gray-500 text-sm max-w-lg mx-auto mb-10 leading-relaxed">
        Building the future of mental healthcare in India. 
        Where technology meets empathy, and every mind finds a safe harbor.
      </p>
      <div className="flex justify-center flex-wrap gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
        <a href="#" className="hover:text-teal-600 transition-colors">Privacy First</a>
        <a href="#" className="hover:text-teal-600 transition-colors">RCI Licensed</a>
        <a href="#" className="hover:text-teal-600 transition-colors">Crisis Support</a>
      </div>
      <p className="mt-12 text-xs text-gray-400">© 2024 MannSathi Health. Crafted with care in India.</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogin = (role: UserRole) => {
    setUser({
      id: 'u1',
      name: role === UserRole.THERAPIST ? 'Dr. Rahul' : 'Anonymous User',
      role,
      isAnonymous: role === UserRole.PATIENT
    });
  };

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-teal-100 selection:text-teal-900">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing onLogin={handleLogin} />} />
            <Route 
              path="/dashboard" 
              element={
                user?.role === UserRole.THERAPIST 
                  ? <TherapistDashboard /> 
                  : <PatientDashboard />
              } 
            />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/login" element={<Landing onLogin={handleLogin} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

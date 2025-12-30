
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Heart, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { UserRole } from '../types';

interface LandingProps {
  onLogin: (role: UserRole) => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handlePatientEntry = () => {
    onLogin(UserRole.PATIENT);
    navigate('/dashboard');
  };

  const handleTherapistEntry = () => {
    onLogin(UserRole.THERAPIST);
    navigate('/dashboard');
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles size={14} className="animate-pulse" /> India's Trustworthy Mental Health Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-8">
              Every mind deserves a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">safe companion.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              MannSathi combines deep cultural empathy with clinical excellence. Speak to an AI companion or book a session with licensed psychologists—anonymously.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button onClick={handlePatientEntry} className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg group">
                Seek Support Anonymously <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick={handleTherapistEntry} variant="secondary" className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg">
                For Psychologists
              </Button>
            </div>
          </div>
          
          <div className="relative mt-12 max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-teal-600/5 blur-3xl rounded-full translate-y-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop" 
              alt="Mental Wellness" 
              className="w-full h-[500px] object-cover rounded-[2.5rem] shadow-2xl border-8 border-white relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: Shield, label: 'Military Grade Privacy', sub: 'Your identity stays with you.' },
              { icon: Users, label: 'Licensed Experts', sub: 'RCI registered psychologists.' },
              { icon: CheckCircle2, label: 'Hinglish Support', sub: 'We speak your language.' },
              { icon: Heart, label: 'Compassionate AI', sub: 'Available 24/7 for you.' }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-gray-50 text-teal-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <item.icon size={30} />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

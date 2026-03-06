import React from 'react';
import { 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  LayoutDashboard, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  Globe2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Feature Card Component
const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export const Home = () => {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fafbff] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-700">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-6 md:px-16 py-5 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <Globe2 className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-gray-900">GLOBE<span className="text-blue-600">PAY.</span></h1>
        </div>
        
        <div className="hidden md:flex gap-10 items-center font-bold text-sm text-gray-500">
          <span className="cursor-pointer hover:text-blue-600 transition-colors">Network</span>
          <span className="cursor-pointer hover:text-blue-600 transition-colors">Developers</span>
          <span className="cursor-pointer hover:text-blue-600 transition-colors">Pricing</span>
          <button className="bg-gray-900 hover:bg-blue-600 text-white py-3 px-8 rounded-full text-sm font-bold transition-all active:scale-95 shadow-xl shadow-gray-200">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 pt-16 md:pt-24 gap-16">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[10px] md:text-xs font-black tracking-[0.2em] text-blue-700 uppercase bg-blue-50 rounded-full border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Global Infrastructure 2.0
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 leading-[0.95] tracking-tighter">
            Money moving <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">at light speed.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Accept payments from anywhere, send payouts to everywhere. A unified platform built for the next generation of global commerce.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <button 
                onClick={() => navigate("/signup")}
            className="group bg-blue-600 hover:bg-blue-700 text-white py-5 px-10 rounded-[1.5rem] font-black transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95">
              Start Now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border-2 border-gray-100 hover:border-blue-100 hover:bg-blue-50 text-gray-700 py-5 px-10 rounded-[1.5rem] font-black transition-all active:scale-95">
              Contact Sales
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale font-black text-xl italic text-gray-400">
            <span>STRIPE</span>
            <span>PAYPAL</span>
            <span>VISA</span>
            <span>AMEX</span>
          </div>
        </div>

        {/* Illustration Area / Card Mockup */}
        <div className="flex-1 flex justify-center relative w-full">
          <div className="relative w-full max-w-md aspect-square">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/40 rounded-full blur-[100px]"></div>
            
            {/* Main Dashboard Card */}
            <div className="relative bg-white border border-gray-100 rounded-[3rem] p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
                <div className="flex justify-between items-start mb-12">
                   <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-100 text-white">
                      <Zap className="w-6 h-6 fill-current" />
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Volume</p>
                      <p className="text-3xl font-black text-gray-900 mt-1">$1.2M+</p>
                   </div>
                </div>

                <div className="space-y-4">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-white">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                               <CreditCard className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                               <p className="text-sm font-black text-gray-900">Payment #829{i}</p>
                               <p className="text-[10px] text-green-500 font-bold uppercase">Completed</p>
                            </div>
                         </div>
                         <p className="font-black text-gray-900">+$250.00</p>
                      </div>
                   ))}
                </div>

                {/* Secure Badge */}
                <div className="mt-10 flex items-center justify-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                   <Lock className="w-3 h-3" /> Encrypted Endpoint
                </div>
            </div>

            {/* Floating Floaties */}
            <div className="absolute -top-6 -right-6 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce">
               <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">Live Feed</p>
               <p className="text-sm font-bold">New payout to London 🇬🇧</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mt-40 px-6 md:px-16 mb-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">
            One platform, <span className="text-blue-600">limitless</span> scale.
          </h2>
          <p className="text-gray-500 text-lg font-medium">We handle the complexity so you can focus on your code.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-blue-600" />} 
            title="Ironclad Security" 
            desc="PCI-DSS Level 1 compliance and military-grade encryption for every single packet."
            color="bg-blue-50"
          />
          <FeatureCard 
            icon={<Globe className="w-8 h-8 text-indigo-600" />} 
            title="Global Routing" 
            desc="Intelligent payment routing that finds the fastest path through 135+ currencies."
            color="bg-indigo-50"
          />
          <FeatureCard 
            icon={<LayoutDashboard className="text-emerald-600 w-8 h-8" />} 
            title="Dev First API" 
            desc="A world-class API documentation that lets you integrate in minutes, not days."
            color="bg-emerald-50"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16 px-6 md:px-16 mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-2 rounded-xl">
              <Globe2 className="text-gray-400 w-5 h-5" />
            </div>
            <span className="font-black text-gray-900 tracking-tighter text-xl uppercase">Globepay.</span>
          </div>
          
          <div className="flex gap-12 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Security</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Terms</span>
          </div>

          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">© 2026 GLOBEPAY INFRASTRUCTURE</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
import React from 'react';
import { LayoutDashboard, BookOpen, Layers, BarChart3, Settings } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'courses', label: 'Course Curriculum', icon: BookOpen },
    { id: 'exercises', label: 'Exercise Builder', icon: Layers },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-green flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            L
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">LingoPulse</h1>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">CMS & Admin</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-extrabold border-2 border-emerald-500'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-emerald-600' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 p-3 rounded-xl flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">Administrator</p>
            <p className="text-[10px] text-slate-400 truncate">admin@lingopulse.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

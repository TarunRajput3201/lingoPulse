import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Users, Flame, BookCheck, Sparkles, TrendingUp } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalytics()
      .then((data) => {
        setAnalytics(data.analytics);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-slate-500 font-bold">Loading system analytics...</div>;
  }

  const statCards = [
    {
      title: 'Total Learners',
      value: analytics?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: '+14% this week',
    },
    {
      title: 'Active Streaks',
      value: analytics?.activeUsers || 0,
      icon: Flame,
      color: 'bg-amber-500',
      change: 'Learners on active fire',
    },
    {
      title: 'Published Courses',
      value: analytics?.totalCourses || 0,
      icon: Sparkles,
      color: 'bg-emerald-500',
      change: 'Curriculum catalogs',
    },
    {
      title: 'Lessons Completed',
      value: analytics?.totalLessonsCompleted || 0,
      icon: BookCheck,
      color: 'bg-purple-500',
      change: 'Lifetime completions',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Platform Overview & Metrics</h2>
        <p className="text-sm text-slate-500 mt-1">
          Real-time metrics on user acquisition, daily streaks, and learning engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:border-slate-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.title}</span>
                <div className={`w-10 h-10 rounded-xl ${card.color} text-white flex items-center justify-center shadow`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-slate-800">{card.value}</div>
                <div className="flex items-center space-x-1 mt-2 text-xs font-semibold text-emerald-600">
                  <TrendingUp size={14} />
                  <span>{card.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engagement tips banner */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-emerald-900 text-base">Instant Curriculum Publishing</h3>
          <p className="text-xs text-emerald-700 mt-1 max-w-xl">
            Any course, unit, or exercise published in this administrative CMS is immediately delivered live to mobile learners via REST APIs with zero app redeployments required.
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm">
          Live Synced
        </span>
      </div>
    </div>
  );
};

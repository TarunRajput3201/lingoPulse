import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AnalyticsView } from './components/AnalyticsView';
import { CourseManager } from './components/CourseManager';
import { ExerciseEditor } from './components/ExerciseEditor';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('analytics');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1 overflow-y-auto">
        {currentTab === 'analytics' && <AnalyticsView />}
        {currentTab === 'courses' && <CourseManager />}
        {currentTab === 'exercises' && <ExerciseEditor />}
      </main>
    </div>
  );
};
export default App;

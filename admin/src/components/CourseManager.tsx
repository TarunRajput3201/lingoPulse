import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Plus, CheckCircle, Globe, ChevronRight, Layers, Sparkles } from 'lucide-react';

export const CourseManager: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [units, setUnits] = useState<any[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New course modal state
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseFlag, setNewCourseFlag] = useState('🇩🇪');

  // New unit state
  const [showNewUnitModal, setShowNewUnitModal] = useState(false);
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [newUnitNumber, setNewUnitNumber] = useState(1);

  // New lesson state
  const [showNewLessonModal, setShowNewLessonModal] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonXp, setNewLessonXp] = useState(15);

  const loadCourses = () => {
    setLoading(true);
    api.getCourses().then((data) => {
      const fetchedCourses = data.courses || [];
      setCourses(fetchedCourses);
      if (fetchedCourses.length > 0) {
        if (!selectedCourse) {
          selectCourse(fetchedCourses[0]);
        } else {
          const updated = fetchedCourses.find((c: any) => c._id === selectedCourse._id);
          if (updated) setSelectedCourse(updated);
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const selectCourse = (course: any) => {
    setSelectedCourse(course);
    setSelectedUnit(null);
    setLessons([]);
    api.getUnits(course._id).then((data) => {
      setUnits(data.units || []);
      if (data.units?.length > 0) {
        selectUnit(data.units[0]);
      }
    });
  };

  const selectUnit = (unit: any) => {
    setSelectedUnit(unit);
    api.getLessons(unit._id).then((data) => {
      setLessons(data.lessons || []);
    });
  };

  const handleTogglePublishCourse = async (course: any) => {
    const nextStatus = course.status === 'published' ? 'draft' : 'published';
    await api.updateCourse(course._id, { status: nextStatus });
    loadCourses();
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle || !newCourseCode) return;
    await api.createCourse({
      title: newCourseTitle,
      code: newCourseCode,
      flagIcon: newCourseFlag,
      fromLanguage: 'en',
      toLanguage: newCourseCode.split('-')[0] || 'de',
      status: 'published',
    });
    setNewCourseTitle('');
    setNewCourseCode('');
    setShowNewCourseModal(false);
    loadCourses();
  };

  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitTitle || !selectedCourse) return;
    await api.createUnit({
      courseId: selectedCourse._id,
      unitNumber: newUnitNumber,
      title: newUnitTitle,
      themeColor: '#58CC02',
      status: 'published',
    });
    setNewUnitTitle('');
    setShowNewUnitModal(false);
    selectCourse(selectedCourse);
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle || !selectedUnit) return;
    await api.createLesson({
      unitId: selectedUnit._id,
      lessonNumber: lessons.length + 1,
      title: newLessonTitle,
      xpReward: newLessonXp,
      type: 'standard',
      status: 'published',
    });
    setNewLessonTitle('');
    setShowNewLessonModal(false);
    selectUnit(selectedUnit);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Curriculum Hierarchy</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage Courses, Units, and Lessons. Published items appear instantly in the mobile learning path.
          </p>
        </div>
        <button
          onClick={() => setShowNewCourseModal(true)}
          className="btn-duo-green text-white font-extrabold px-5 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow"
        >
          <Plus size={18} />
          <span>New Course</span>
        </button>
      </div>

      {/* Grid of 3 columns: Courses | Units | Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Courses */}
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <h3 className="font-bold text-slate-700 text-sm flex items-center space-x-2">
              <Globe size={16} className="text-blue-500" />
              <span>Available Courses ({courses.length})</span>
            </h3>
          </div>

          <div className="space-y-2">
            {courses.map((course) => {
              const isSelected = selectedCourse?._id === course._id;
              return (
                <div
                  key={course._id}
                  onClick={() => selectCourse(course)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{course.flagIcon}</span>
                    <div>
                      <p className="font-extrabold text-sm text-slate-800">{course.title}</p>
                      <p className="text-xs text-slate-400 font-semibold">{course.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePublishCourse(course);
                      }}
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        course.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {course.status}
                    </button>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Units */}
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <h3 className="font-bold text-slate-700 text-sm flex items-center space-x-2">
              <Sparkles size={16} className="text-emerald-500" />
              <span>Units in {selectedCourse?.title || 'Selected'}</span>
            </h3>
            {selectedCourse && (
              <button
                onClick={() => {
                  setNewUnitNumber(units.length + 1);
                  setShowNewUnitModal(true);
                }}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Add Unit</span>
              </button>
            )}
          </div>

          <div className="space-y-2">
            {units.map((unit) => {
              const isSelected = selectedUnit?._id === unit._id;
              return (
                <div
                  key={unit._id}
                  onClick={() => selectUnit(unit)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Unit {unit.unitNumber}
                    </span>
                    <p className="font-extrabold text-sm text-slate-800 mt-1">{unit.title}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              );
            })}
            {units.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-400">No units in this course yet.</div>
            )}
          </div>
        </div>

        {/* Column 3: Lessons */}
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <h3 className="font-bold text-slate-700 text-sm flex items-center space-x-2">
              <Layers size={16} className="text-purple-500" />
              <span>Lessons in {selectedUnit?.title || 'Selected'}</span>
            </h3>
            {selectedUnit && (
              <button
                onClick={() => setShowNewLessonModal(true)}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Add Lesson</span>
              </button>
            )}
          </div>

          <div className="space-y-2">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="p-3 rounded-xl border-2 border-slate-100 flex items-center justify-between bg-slate-50/50"
              >
                <div>
                  <p className="font-extrabold text-sm text-slate-800">
                    Lesson {lesson.lessonNumber}: {lesson.title}
                  </p>
                  <p className="text-xs text-amber-600 font-bold mt-0.5">+{lesson.xpReward} XP</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                  {lesson.type}
                </span>
              </div>
            ))}
            {lessons.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-400">No lessons in this unit yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: New Course */}
      {showNewCourseModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border-2 border-slate-100 space-y-4">
            <h3 className="text-lg font-black text-slate-800">Create New Course</h3>
            <form onSubmit={handleCreateCourse} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600">Course Title</label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. German A1"
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-emerald-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Course Code</label>
                <input
                  type="text"
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  placeholder="e.g. de-en"
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-emerald-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Flag Emoji</label>
                <input
                  type="text"
                  value={newCourseFlag}
                  onChange={(e) => setNewCourseFlag(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-emerald-500 outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCourseModal(false)}
                  className="px-4 py-2 font-bold text-sm text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-duo-green px-5 py-2 text-white font-extrabold text-sm rounded-xl shadow"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Unit */}
      {showNewUnitModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border-2 border-slate-100 space-y-4">
            <h3 className="text-lg font-black text-slate-800">Add Unit to {selectedCourse?.title}</h3>
            <form onSubmit={handleCreateUnit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600">Unit Number</label>
                <input
                  type="number"
                  value={newUnitNumber}
                  onChange={(e) => setNewUnitNumber(parseInt(e.target.value, 10))}
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-emerald-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Unit Title</label>
                <input
                  type="text"
                  value={newUnitTitle}
                  onChange={(e) => setNewUnitTitle(e.target.value)}
                  placeholder="e.g. Unit 3: Shopping & Clothes"
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-emerald-500 outline-none"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewUnitModal(false)}
                  className="px-4 py-2 font-bold text-sm text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-duo-green px-5 py-2 text-white font-extrabold text-sm rounded-xl shadow"
                >
                  Save Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Lesson */}
      {showNewLessonModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border-2 border-slate-100 space-y-4">
            <h3 className="text-lg font-black text-slate-800">Add Lesson to {selectedUnit?.title}</h3>
            <form onSubmit={handleCreateLesson} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600">Lesson Title</label>
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="e.g. Asking Prices"
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-emerald-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">XP Reward</label>
                <input
                  type="number"
                  value={newLessonXp}
                  onChange={(e) => setNewLessonXp(parseInt(e.target.value, 10))}
                  className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 text-sm font-semibold focus:border-emerald-500 outline-none"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewLessonModal(false)}
                  className="px-4 py-2 font-bold text-sm text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-duo-green px-5 py-2 text-white font-extrabold text-sm rounded-xl shadow"
                >
                  Save Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

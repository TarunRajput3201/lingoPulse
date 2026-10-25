import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Plus, Trash2, Smartphone, Volume2, CheckCircle2, HelpCircle } from 'lucide-react';

export const ExerciseEditor: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [units, setUnits] = useState<any[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const [lessons, setLessons] = useState<any[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [exercises, setExercises] = useState<any[]>([]);

  // Form fields for creating a new exercise
  const [type, setType] = useState('MULTIPLE_CHOICE');
  const [prompt, setPrompt] = useState('');
  const [instruction, setInstruction] = useState('Select the correct translation');
  const [audioUrl, setAudioUrl] = useState('');
  const [hint, setHint] = useState('');
  const [explanation, setExplanation] = useState('');

  // Type-specific inputs
  const [mcOption1, setMcOption1] = useState('Hola');
  const [mcOption2, setMcOption2] = useState('Adiós');
  const [mcOption3, setMcOption3] = useState('Gracias');
  const [mcCorrectId, setMcCorrectId] = useState('opt-1');

  const [acceptableAnswer, setAcceptableAnswer] = useState('Buenos días');
  const [scrambledWords, setScrambledWords] = useState('Mucho, gusto, tarde, hola');
  const [wordOrderCorrect, setWordOrderCorrect] = useState('Mucho, gusto');
  const [trueFalseVal, setTrueFalseVal] = useState(true);

  // Load initial courses
  useEffect(() => {
    api.getCourses().then((data) => {
      setCourses(data.courses || []);
      if (data.courses?.length > 0) {
        setSelectedCourseId(data.courses[0]._id);
      }
    });
  }, []);

  // When course changes, load units
  useEffect(() => {
    if (!selectedCourseId) return;
    api.getUnits(selectedCourseId).then((data) => {
      setUnits(data.units || []);
      if (data.units?.length > 0) {
        setSelectedUnitId(data.units[0]._id);
      }
    });
  }, [selectedCourseId]);

  // When unit changes, load lessons
  useEffect(() => {
    if (!selectedUnitId) return;
    api.getLessons(selectedUnitId).then((data) => {
      setLessons(data.lessons || []);
      if (data.lessons?.length > 0) {
        setSelectedLessonId(data.lessons[0]._id);
      }
    });
  }, [selectedUnitId]);

  // When lesson changes, load exercises
  const loadExercises = () => {
    if (!selectedLessonId) return;
    api.getExercises(selectedLessonId).then((data) => {
      setExercises(data.exercises || []);
    });
  };

  useEffect(() => {
    loadExercises();
  }, [selectedLessonId]);

  const handleSaveExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLessonId || !prompt) return;

    let exerciseData: any = {};
    if (type === 'MULTIPLE_CHOICE') {
      exerciseData = {
        correctOptionId: mcCorrectId,
        options: [
          { id: 'opt-1', text: mcOption1 },
          { id: 'opt-2', text: mcOption2 },
          { id: 'opt-3', text: mcOption3 },
        ],
      };
    } else if (type === 'TRANSLATION' || type === 'FILL_IN_THE_BLANK') {
      exerciseData = {
        acceptableAnswers: acceptableAnswer.split(',').map((s) => s.trim()),
        sentenceWithBlank: prompt,
      };
    } else if (type === 'WORD_ORDER') {
      exerciseData = {
        scrambledWords: scrambledWords.split(',').map((s) => s.trim()),
        correctOrder: wordOrderCorrect.split(',').map((s) => s.trim()),
        fullSentence: wordOrderCorrect.replace(/,/g, ' ').replace(/\s+/g, ' ').trim(),
      };
    } else if (type === 'TRUE_FALSE') {
      exerciseData = {
        statement: prompt,
        isTrue: trueFalseVal,
      };
    }

    await api.createExercise({
      lessonId: selectedLessonId,
      type,
      prompt,
      instruction,
      audioUrl,
      hint,
      explanation,
      order: exercises.length + 1,
      data: exerciseData,
    });

    setPrompt('');
    loadExercises();
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    if (confirm('Are you sure you want to delete this exercise?')) {
      await api.deleteExercise(exerciseId);
      loadExercises();
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Interactive Exercise Authoring</h2>
        <p className="text-sm text-slate-500 mt-1">
          Build questions with multi-choice, typing, word ordering, hints, and live mobile preview.
        </p>
      </div>

      {/* Target Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Course</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="mt-1 font-bold text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none"
          >
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.flagIcon} {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Unit</label>
          <select
            value={selectedUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value)}
            className="mt-1 font-bold text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none"
          >
            {units.map((u) => (
              <option key={u._id} value={u._id}>
                Unit {u.unitNumber}: {u.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Lesson</label>
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="mt-1 font-bold text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 outline-none"
          >
            {lessons.map((l) => (
              <option key={l._id} value={l._id}>
                Lesson {l.lessonNumber}: {l.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
          <h3 className="font-black text-slate-800 text-lg">New Exercise Configuration</h3>
          <form onSubmit={handleSaveExercise} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600">Exercise Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold outline-none focus:border-emerald-500"
                >
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  <option value="TRANSLATION">Sentence Translation</option>
                  <option value="WORD_ORDER">Word Ordering</option>
                  <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
                  <option value="TRUE_FALSE">True / False</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Audio URL (Optional)</label>
                <input
                  type="text"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  placeholder="https://... audio.mp3"
                  className="w-full mt-1 p-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600">Question Prompt / Sentence</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. How do you say 'Water' in Spanish?"
                className="w-full mt-1 p-3 rounded-xl border-2 border-slate-200 text-sm font-semibold outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Dynamic fields based on type */}
            {type === 'MULTIPLE_CHOICE' && (
              <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-extrabold text-slate-700">Answer Options & Correct Choice:</span>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correctMC"
                      checked={mcCorrectId === 'opt-1'}
                      onChange={() => setMcCorrectId('opt-1')}
                    />
                    <input
                      type="text"
                      value={mcOption1}
                      onChange={(e) => setMcOption1(e.target.value)}
                      className="flex-1 p-2 rounded-lg border border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correctMC"
                      checked={mcCorrectId === 'opt-2'}
                      onChange={() => setMcCorrectId('opt-2')}
                    />
                    <input
                      type="text"
                      value={mcOption2}
                      onChange={(e) => setMcOption2(e.target.value)}
                      className="flex-1 p-2 rounded-lg border border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correctMC"
                      checked={mcCorrectId === 'opt-3'}
                      onChange={() => setMcCorrectId('opt-3')}
                    />
                    <input
                      type="text"
                      value={mcOption3}
                      onChange={(e) => setMcOption3(e.target.value)}
                      className="flex-1 p-2 rounded-lg border border-slate-300 text-sm font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {type === 'TRANSLATION' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-slate-600">Acceptable Answers (comma separated)</label>
                <input
                  type="text"
                  value={acceptableAnswer}
                  onChange={(e) => setAcceptableAnswer(e.target.value)}
                  placeholder="e.g. Buenos días, buenos dias"
                  className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm font-bold"
                />
              </div>
            )}

            {type === 'WORD_ORDER' && (
              <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-xs font-bold text-slate-600">Scrambled Tokens (comma-separated)</label>
                  <input
                    type="text"
                    value={scrambledWords}
                    onChange={(e) => setScrambledWords(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600">Correct Order (comma-separated)</label>
                  <input
                    type="text"
                    value={wordOrderCorrect}
                    onChange={(e) => setWordOrderCorrect(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600">Contextual Hint</label>
                <input
                  type="text"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  placeholder="e.g. Starts with 'B'..."
                  className="w-full mt-1 p-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600">Educational Explanation</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Why this answer is correct"
                  className="w-full mt-1 p-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-duo-green w-full py-3 text-white font-black text-sm rounded-xl shadow mt-2"
            >
              Add Exercise to Lesson
            </button>
          </form>

          {/* List of existing exercises in this lesson */}
          <div className="mt-6 border-t pt-4 border-slate-100">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Existing Exercises in this Lesson ({exercises.length})
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {exercises.map((ex, index) => (
                <div
                  key={ex._id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded mr-2">
                      {ex.type}
                    </span>
                    <span className="text-xs font-extrabold text-slate-800">{ex.prompt}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteExercise(ex._id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Mobile Phone Preview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1">
            <Smartphone size={16} />
            <span>Learner Mobile Preview</span>
          </div>

          {/* Phone Frame */}
          <div className="w-[320px] h-[580px] bg-white rounded-[40px] border-[10px] border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between relative">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-xl z-20" />

            {/* In-app header */}
            <div className="pt-8 px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black text-slate-400">✕</span>
              <div className="h-3 flex-1 mx-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-brand-green rounded-full" />
              </div>
              <span className="text-xs font-black text-red-500">❤️ 5</span>
            </div>

            {/* In-app lesson body */}
            <div className="p-4 flex-1 flex flex-col justify-center space-y-4">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                {instruction || 'Select the correct answer'}
              </span>

              <h4 className="text-lg font-black text-slate-800 leading-snug">
                {prompt || 'How do you say "Hello" in Spanish?'}
              </h4>

              {type === 'MULTIPLE_CHOICE' && (
                <div className="space-y-2">
                  {[mcOption1, mcOption2, mcOption3].map((opt, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl border-2 border-slate-200 bg-white font-extrabold text-sm text-slate-700 shadow-sm cursor-pointer hover:border-blue-400"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              {type === 'WORD_ORDER' && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {scrambledWords.split(',').map((word, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-slate-100 border-2 border-slate-200 rounded-xl font-bold text-xs text-slate-800 shadow-sm"
                    >
                      {word.trim()}
                    </span>
                  ))}
                </div>
              )}

              {hint && (
                <div className="flex items-center space-x-1 text-xs text-amber-600 font-bold bg-amber-50 p-2 rounded-xl">
                  <HelpCircle size={14} />
                  <span>Hint: {hint}</span>
                </div>
              )}
            </div>

            {/* In-app Bottom Continue Bar */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="btn-duo-green w-full py-3 rounded-2xl text-center text-white font-black text-sm uppercase tracking-wider shadow">
                Check Answer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

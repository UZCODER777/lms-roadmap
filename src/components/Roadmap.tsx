import React, { useState } from 'react';
import { Plus, Search, Filter, SortAsc } from 'lucide-react';
import { useLMS } from '../contexts/LMSContext';
import ModuleCard from './ModuleCard';

const Roadmap: React.FC = () => {
  const { modules, studentStats } = useLMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('order');
  const [showAddModule, setShowAddModule] = useState(false);

  const filteredAndSortedModules = modules
    .filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'all' || module.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return a.order - b.order;
      }
    });

  const completionStats = {
    total: modules.length,
    completed: modules.filter(m => m.completed).length,
    inProgress: modules.filter(m => m.progress > 0 && !m.completed).length,
    notStarted: modules.filter(m => m.progress === 0).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Roadmap</h1>
          <p className="text-gray-600 mt-1">O'quv yo'nalishingizni tanlang va maqsadli rivojlaning</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
            <span className="text-sm font-medium text-gray-600">Umumiy progress:</span>
            <span className="ml-2 text-lg font-bold text-indigo-600">{studentStats.overallProgress}%</span>
          </div>
          <button
            onClick={() => setShowAddModule(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Modul</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jami Modullar</p>
              <p className="text-2xl font-bold text-gray-900">{completionStats.total}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tugallangan</p>
              <p className="text-2xl font-bold text-emerald-600">{completionStats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Jarayonda</p>
              <p className="text-2xl font-bold text-orange-600">{completionStats.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Boshlanmagan</p>
              <p className="text-2xl font-bold text-gray-600">{completionStats.notStarted}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭕</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Modullarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Barcha darajalar</option>
                <option value="Beginner">Boshlang'ich</option>
                <option value="Intermediate">O'rta</option>
                <option value="Advanced">Ilg'or</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <SortAsc className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="order">Tartib bo'yicha</option>
              <option value="progress">Progress bo'yicha</option>
              <option value="difficulty">Qiyinchilik bo'yicha</option>
              <option value="alphabetical">Alifbo bo'yicha</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid gap-6">
        {filteredAndSortedModules.length > 0 ? (
          filteredAndSortedModules.map((module, index) => (
            <div key={module.id} className="relative">
              {index < filteredAndSortedModules.length - 1 && (
                <div className="absolute left-6 top-full w-0.5 h-6 bg-gray-300 z-0" />
              )}
              <ModuleCard module={module} showActions={true} />
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hech narsa topilmadi</h3>
            <p className="text-gray-600">Qidiruv shartlaringizni o'zgartiring yoki yangi modul qo'shing</p>
          </div>
        )}
      </div>

      {/* Completion Message */}
      {studentStats.overallProgress === 100 && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-white text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">🏆</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Tabriklaymiz! 🎉</h3>
          <p className="text-emerald-100 text-lg mb-4">
            Siz barcha mavzularni muvaffaqiyatli tugalladingiz!
          </p>
          <div className="flex items-center justify-center space-x-4 text-emerald-100">
            <span>🎯 {studentStats.totalLessons} dars tugallandi</span>
            <span>•</span>
            <span>⏱️ {studentStats.totalStudyHours} soat o'qildi</span>
            <span>•</span>
            <span>🏅 {studentStats.completedModules} modul yakunlandi</span>
          </div>
        </div>
      )}

      {/* Learning Path Recommendation */}
      {studentStats.overallProgress < 100 && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Keyingi Qadam</h3>
              <p className="text-indigo-100 mb-4">
                Sizga tavsiya etilgan keyingi modul: 
                <span className="font-semibold text-white ml-1">
                  {modules.find(m => m.progress > 0 && !m.completed)?.title || 
                   modules.find(m => m.progress === 0)?.title || 
                   'Barcha modullar tugallangan!'}
                </span>
              </p>
              <div className="flex items-center space-x-4 text-sm text-indigo-100">
                <span>📈 Sizning darajangiz: {studentStats.overallProgress}%</span>
                <span>🎯 Keyingi maqsad: {Math.min(studentStats.overallProgress + 10, 100)}%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-2">🚀</div>
              <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-200">
                Davom etish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
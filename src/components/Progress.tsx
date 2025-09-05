import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  CheckCircle,
  Star,
  Filter,
  Download
} from 'lucide-react';
import { useLMS } from '../contexts/LMSContext';
import ProgressBar from './ProgressBar';
import StatCard from './StatCard';

const Progress: React.FC = () => {
  const { studentStats, modules } = useLMS();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedModule, setSelectedModule] = useState('all');

  // Mock data for charts and detailed analytics
  const weeklyProgress = [
    { day: 'Dush', completed: 2, target: 3 },
    { day: 'Sesh', completed: 1, target: 3 },
    { day: 'Chor', completed: 4, target: 3 },
    { day: 'Pay', completed: 3, target: 3 },
    { day: 'Jum', completed: 2, target: 3 },
    { day: 'Shan', completed: 1, target: 3 },
    { day: 'Yak', completed: 3, target: 3 }
  ];

  const monthlyStats = [
    { month: 'Dekabr', lessons: 45, hours: 38 },
    { month: 'Yanvar', lessons: 52, hours: 44 },
    { month: 'Fevral', lessons: 38, hours: 32 },
    { month: 'Mart', lessons: 61, hours: 51 }
  ];

  const skillProgress = [
    { skill: 'HTML/CSS', level: 85, category: 'Frontend' },
    { skill: 'JavaScript', level: 65, category: 'Frontend' },
    { skill: 'React', level: 40, category: 'Frontend' },
    { skill: 'Node.js', level: 55, category: 'Backend' },
    { skill: 'Express.js', level: 30, category: 'Backend' },
    { skill: 'Git', level: 80, category: 'Tools' },
    { skill: 'Docker', level: 70, category: 'Tools' }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'from-emerald-500 to-emerald-600';
    if (level >= 60) return 'from-indigo-500 to-indigo-600';
    if (level >= 40) return 'from-orange-500 to-orange-600';
    return 'from-gray-400 to-gray-500';
  };

  const filteredModules = selectedModule === 'all' 
    ? modules 
    : modules.filter(module => module.id === selectedModule);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Analytics</h1>
          <p className="text-gray-600 mt-1">O'quv jarayonigizning batafsil tahlili va statistikasi</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="week">Bu hafta</option>
            <option value="month">Bu oy</option>
            <option value="quarter">Bu chorak</option>
            <option value="year">Bu yil</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Umumiy Progress"
          value={`${studentStats.overallProgress}%`}
          subtitle={`${studentStats.completedLessons}/${studentStats.totalLessons} dars`}
          icon={Target}
          color="indigo"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Bu Haftada"
          value="16 dars"
          subtitle="Maqsad: 21 dars"
          icon={Calendar}
          color="emerald"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="O'rtacha Ball"
          value={`${studentStats.averageScore}%`}
          subtitle="Oxirgi 30 kun"
          icon={Star}
          color="orange"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Davomiylik"
          value={`${studentStats.studyStreak} kun`}
          subtitle="Eng uzun: 15 kun"
          icon={Award}
          color="red"
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Haftalik Faoliyat</h3>
            <BarChart3 className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{day.completed}/{day.target} dars</span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round((day.completed / day.target) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        day.completed >= day.target 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                          : 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                      }`}
                      style={{ width: `${Math.min((day.completed / day.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Filter & Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Modul bo'yicha Filter</h3>
            <select 
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Barcha modullar</option>
              {modules.map(module => (
                <option key={module.id} value={module.id}>{module.title}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tezkor Statistika</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bugun tugallangan</span>
                <span className="font-semibold text-gray-900">3 dars</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bu hafta o'rtacha</span>
                <span className="font-semibold text-gray-900">2.3 dars/kun</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Eng faol kun</span>
                <span className="font-semibold text-gray-900">Chorshanba</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Jami ball</span>
                <span className="font-semibold text-indigo-600">1,247</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Ko'nikmalar Darajasi</h3>
          <TrendingUp className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillProgress.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                  <p className="text-sm text-gray-500">{skill.category}</p>
                </div>
                <span className="text-lg font-bold text-gray-900">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-700`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Module Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Batafsil Modul Progress</h3>
          <BookOpen className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="space-y-6">
          {filteredModules.map((module) => {
            const totalLessons = module.topics.reduce((acc, topic) => acc + topic.lessons.length, 0);
            const completedLessons = module.topics.reduce(
              (acc, topic) => acc + topic.lessons.filter(lesson => lesson.completed).length, 
              0
            );
            
            return (
              <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{module.title}</h4>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-indigo-600">{module.progress}%</span>
                    <p className="text-sm text-gray-500">{completedLessons}/{totalLessons} dars</p>
                  </div>
                </div>
                
                <ProgressBar progress={module.progress} showLabel={false} className="mb-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-600">
                      {module.topics.filter(t => t.completed).length}/{module.topics.length} mavzu
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-600">{module.estimatedHours} soat</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600">{module.difficulty}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Oylik Taqqoslash</h3>
          <Calendar className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {monthlyStats.map((month, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{month.month}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Darslar</span>
                  <span className="font-medium text-gray-900">{month.lessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Soatlar</span>
                  <span className="font-medium text-gray-900">{month.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
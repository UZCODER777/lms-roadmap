import React from 'react';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Flame, 
  TrendingUp, 
  Calendar,
  Clock,
  Award,
  Users,
  Star,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { useLMS } from '../contexts/LMSContext';
import StatCard from './StatCard';
import ProgressBar from './ProgressBar';

const Dashboard: React.FC = () => {
  const { studentStats, modules } = useLMS();

  const recentActivity = [
    { 
      id: 1, 
      action: 'HTML formalar darsini tugalladingiz', 
      time: '2 soat oldin', 
      type: 'completed',
      module: 'Frontend Development',
      points: 50
    },
    { 
      id: 2, 
      action: 'CSS Layout mavzusini boshladingiz', 
      time: '5 soat oldin', 
      type: 'started',
      module: 'Frontend Development',
      points: 0
    },
    { 
      id: 3, 
      action: 'JavaScript Asoslari moduliga yozildingiz', 
      time: '1 kun oldin', 
      type: 'enrolled',
      module: 'Frontend Development',
      points: 25
    },
    { 
      id: 4, 
      action: 'Git buyruqlari darsini tugalladingiz', 
      time: '2 kun oldin', 
      type: 'completed',
      module: 'Development Tools',
      points: 75
    },
    { 
      id: 5, 
      action: 'Docker ga kirish darsini ko\'rdingiz', 
      time: '3 kun oldin', 
      type: 'viewed',
      module: 'Development Tools',
      points: 10
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'JavaScript DOM manipulatsiyasi',
      module: 'Frontend Development',
      dueDate: '2024-01-15',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Express.js routing',
      module: 'Backend Development',
      dueDate: '2024-01-18',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Unit Testing',
      module: 'Development Tools',
      dueDate: '2024-01-22',
      priority: 'low'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Frontend Boshlang\'ich',
      description: 'HTML va CSS asoslarini o\'rgandingiz',
      icon: '🎯',
      earned: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'Doimiy O\'quvchi',
      description: '7 kun ketma-ket o\'qidingiz',
      icon: '🔥',
      earned: true,
      date: '2024-01-12'
    },
    {
      id: 3,
      title: 'JavaScript Ustasi',
      description: 'JavaScript asoslarini tugallang',
      icon: '⚡',
      earned: false,
      date: null
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'started': return <PlayCircle className="w-4 h-4 text-indigo-500" />;
      case 'enrolled': return <BookOpen className="w-4 h-4 text-orange-500" />;
      case 'viewed': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-orange-500 bg-orange-50';
      case 'low': return 'border-l-emerald-500 bg-emerald-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">O'quv jarayonigizni kuzatib boring va maqsadlaringizga erishing</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Bugun</p>
          <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString('uz-UZ')}</p>
          <p className="text-sm text-indigo-600 font-medium">Xush kelibsiz! 👋</p>
        </div>
      </div>

      {/* Stats Grid */}
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
          title="Tugallangan Modullar"
          value={`${studentStats.completedModules}/${studentStats.totalModules}`}
          subtitle={`${Math.round((studentStats.completedModules / studentStats.totalModules) * 100)}% tugallandi`}
          icon={BookOpen}
          color="emerald"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="O'quv Soatlari"
          value={`${Math.round(studentStats.totalStudyHours * (studentStats.overallProgress / 100))} soat`}
          subtitle={`${studentStats.totalStudyHours} soatdan`}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="O'quv Davomiyligi"
          value={`${studentStats.studyStreak} kun`}
          subtitle="Davom eting! 🔥"
          icon={Flame}
          color="red"
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Module Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Modullar Bo'yicha Progress</h3>
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">{module.title}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          module.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                          module.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {module.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{module.estimatedHours} soat</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{module.progress}%</span>
                  </div>
                  <ProgressBar progress={module.progress} showLabel={false} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">So'nggi Faoliyat</h3>
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-500">{activity.module}</p>
                      <span className="text-xs text-gray-300">•</span>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      {activity.points > 0 && (
                        <>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs font-medium text-indigo-600">+{activity.points} ball</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Weekly Goal */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Haftalik Maqsad</h3>
              <Trophy className="w-6 h-6 text-indigo-200" />
            </div>
            <p className="text-indigo-100 mb-4">Bu haftada 8 ta dars tugallang</p>
            <div className="bg-white bg-opacity-20 rounded-full h-3 mb-3">
              <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: '62%' }} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-indigo-100">5/8 dars tugallandi</span>
              <span className="font-semibold">62%</span>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Yaqin Muddat</h3>
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(deadline.priority)}`}>
                  <h4 className="text-sm font-medium text-gray-900">{deadline.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{deadline.module}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(deadline.dueDate).toLocaleDateString('uz-UZ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Yutuqlar</h3>
              <Award className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-3 rounded-lg border ${
                  achievement.earned ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${
                        achievement.earned ? 'text-emerald-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${
                        achievement.earned ? 'text-emerald-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-emerald-600 mt-1">
                          {new Date(achievement.date).toLocaleDateString('uz-UZ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
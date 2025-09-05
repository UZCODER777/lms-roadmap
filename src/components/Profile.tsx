import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Settings, 
  Bell, 
  Shield, 
  Globe,
  Camera,
  Edit3,
  Save,
  X,
  Star,
  Trophy,
  Target,
  Clock
} from 'lucide-react';
import { useLMS } from '../contexts/LMSContext';

const Profile: React.FC = () => {
  const { studentStats } = useLMS();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [profile, setProfile] = useState({
    name: 'Aziz Karimov',
    email: 'aziz.karimov@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    joinDate: '2023-09-15',
    level: 'Intermediate Developer',
    points: 1247,
    bio: 'Web development sohasida o\'z bilimlarimni oshirishga intilaman. Frontend va backend texnologiyalarini o\'rganishga qiziqaman.',
    location: 'Toshkent, O\'zbekiston',
    website: 'https://azizkarimov.dev',
    preferences: {
      language: 'uz',
      notifications: true,
      theme: 'light' as const,
      emailUpdates: true,
      weeklyReport: true
    }
  });

  const badges = [
    {
      id: 1,
      name: 'Frontend Boshlang\'ich',
      description: 'HTML va CSS asoslarini o\'rgandingiz',
      icon: '🎯',
      earned: true,
      date: '2024-01-10',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Doimiy O\'quvchi',
      description: '7 kun ketma-ket o\'qidingiz',
      icon: '🔥',
      earned: true,
      date: '2024-01-12',
      rarity: 'uncommon'
    },
    {
      id: 3,
      name: 'JavaScript Ustasi',
      description: 'JavaScript asoslarini tugallang',
      icon: '⚡',
      earned: false,
      date: null,
      rarity: 'rare'
    },
    {
      id: 4,
      name: 'Tez O\'rganuvchi',
      description: 'Bir kunda 5 ta dars tugallang',
      icon: '🚀',
      earned: true,
      date: '2024-01-08',
      rarity: 'epic'
    },
    {
      id: 5,
      name: 'Mukammal Student',
      description: 'Barcha testlardan 90%+ ball oling',
      icon: '👑',
      earned: false,
      date: null,
      rarity: 'legendary'
    }
  ];

  const achievements = [
    {
      title: 'Birinchi Modul',
      description: 'Birinchi modulni tugalladingiz',
      date: '2024-01-05',
      points: 100
    },
    {
      title: 'Haftalik Maqsad',
      description: 'Haftalik maqsadni bajardingiz',
      date: '2024-01-12',
      points: 150
    },
    {
      title: 'Perfect Score',
      description: 'Testdan 100% ball oldingiz',
      date: '2024-01-10',
      points: 200
    }
  ];

  const learningStats = [
    { label: 'Jami O\'qilgan Soat', value: `${Math.round(studentStats.totalStudyHours * (studentStats.overallProgress / 100))}`, icon: Clock },
    { label: 'Tugallangan Darslar', value: studentStats.completedLessons, icon: Target },
    { label: 'Olingan Balllar', value: profile.points, icon: Star },
    { label: 'Darajangiz', value: profile.level, icon: Trophy }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'uncommon': return 'border-emerald-300 bg-emerald-50';
      case 'rare': return 'border-indigo-300 bg-indigo-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profil</h1>
          <p className="text-gray-600 mt-1">Shaxsiy ma'lumotlaringiz va yutuqlaringiz</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Bekor qilish' : 'Tahrirlash'}</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-indigo-500 focus:outline-none"
                />
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  placeholder="O'zingiz haqingizda qisqacha..."
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    <Save className="w-4 h-4" />
                    <span>Saqlash</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Bekor qilish</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-indigo-600 font-medium mt-1">{profile.level}</p>
                <p className="text-gray-600 mt-2">{profile.bio}</p>
                
                <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Qo'shilgan: {new Date(profile.joinDate).toLocaleDateString('uz-UZ')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{profile.points} ball</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {learningStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Umumiy', icon: User },
              { id: 'badges', label: 'Nishonlar', icon: Award },
              { id: 'achievements', label: 'Yutuqlar', icon: Trophy },
              { id: 'settings', label: 'Sozlamalar', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">So'nggi Yutuqlar</h3>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Trophy className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-indigo-600">+{achievement.points} ball</p>
                        <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString('uz-UZ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nishonlar Kolleksiyasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        badge.earned 
                          ? `${getRarityColor(badge.rarity)} hover:shadow-md` 
                          : 'border-gray-200 bg-gray-100 opacity-60'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <h4 className={`font-semibold ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                          {badge.name}
                        </h4>
                        <p className={`text-sm mt-1 ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                          {badge.description}
                        </p>
                        {badge.earned && badge.date && (
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(badge.date).toLocaleDateString('uz-UZ')}
                          </p>
                        )}
                        {!badge.earned && (
                          <p className="text-xs text-gray-400 mt-2">Hali olinmagan</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Barcha Yutuqlar</h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <Trophy className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-gray-600">{achievement.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(achievement.date).toLocaleDateString('uz-UZ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-indigo-600">+{achievement.points}</span>
                        <p className="text-sm text-gray-500">ball</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sozlamalar</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Bildirishnomalar</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={profile.preferences.notifications}
                          onChange={(e) => setProfile(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, notifications: e.target.checked }
                          }))}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">Push bildirishnomalar</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={profile.preferences.emailUpdates}
                          onChange={(e) => setProfile(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, emailUpdates: e.target.checked }
                          }))}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">Email yangilanishlar</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={profile.preferences.weeklyReport}
                          onChange={(e) => setProfile(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, weeklyReport: e.target.checked }
                          }))}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">Haftalik hisobot</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Til va Hudud</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Til</label>
                        <select
                          value={profile.preferences.language}
                          onChange={(e) => setProfile(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, language: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="uz">O'zbek</option>
                          <option value="ru">Русский</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mavzu</label>
                        <select
                          value={profile.preferences.theme}
                          onChange={(e) => setProfile(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, theme: e.target.value as 'light' | 'dark' }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="light">Yorug'</option>
                          <option value="dark">Qorong'u</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
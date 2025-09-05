import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen, 
  Play,
  Edit3,
  Trash2,
  Plus,
  Users,
  Award
} from 'lucide-react';
import { Module, Topic, Lesson } from '../types';
import { useLMS } from '../contexts/LMSContext';
import ProgressBar from './ProgressBar';

interface ModuleCardProps {
  module: Module;
  showActions?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, showActions = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const { toggleTopicCompletion, toggleLessonCompletion } = useLMS();

  const toggleTopicExpansion = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-700';
      case 'Intermediate': return 'bg-orange-100 text-orange-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalLessons = module.topics.reduce((acc, topic) => acc + topic.lessons.length, 0);
  const completedLessons = module.topics.reduce(
    (acc, topic) => acc + topic.lessons.filter(lesson => lesson.completed).length, 
    0
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className={`p-3 rounded-lg ${module.completed ? 'bg-emerald-100' : 'bg-indigo-100'}`}>
              <BookOpen className={`w-6 h-6 ${module.completed ? 'text-emerald-600' : 'text-indigo-600'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{module.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{module.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{module.estimatedHours} soat</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{module.topics.length} mavzu</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Play className="w-4 h-4" />
                  <span>{totalLessons} dars</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {showActions && (
              <>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Edit3 className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <ProgressBar progress={module.progress} className="mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{module.topics.filter(t => t.completed).length} / {module.topics.length} mavzu</span>
            <span>{completedLessons} / {totalLessons} dars</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            module.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {module.completed ? 'Tugallandi' : 'Jarayonda'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200">
          {module.topics.map((topic, topicIndex) => (
            <div key={topic.id} className="border-b border-gray-100 last:border-b-0">
              <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => toggleTopicCompletion(module.id, topic.id)}
                      className="flex-shrink-0"
                    >
                      {topic.completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 hover:text-indigo-500" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h4 className={`font-medium ${topic.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {topic.title}
                      </h4>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{topic.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Play className="w-3 h-3" />
                          <span>{topic.lessons.length} dars</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>{topic.lessons.filter(l => l.completed).length} tugallandi</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTopicExpansion(topic.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                  >
                    {expandedTopics.has(topic.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>

                {expandedTopics.has(topic.id) && (
                  <div className="mt-4 ml-8 space-y-2">
                    {topic.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <button
                          onClick={() => toggleLessonCompletion(module.id, topic.id, lesson.id)}
                          className="flex-shrink-0"
                        >
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300 hover:text-indigo-500" />
                          )}
                        </button>
                        <div className="flex-1">
                          <h5 className={`text-sm font-medium ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                            {lesson.title}
                          </h5>
                          <p className="text-xs text-gray-500">{lesson.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                    
                    {showActions && (
                      <button className="flex items-center space-x-2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 text-sm">
                        <Plus className="w-4 h-4" />
                        <span>Yangi dars qo'shish</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {showActions && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors duration-200 text-sm font-medium">
                <Plus className="w-4 h-4" />
                <span>Yangi mavzu qo'shish</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
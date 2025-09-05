import React, { createContext, useContext, useEffect, useState } from 'react';
import { Module, StudentStats, Topic, Lesson } from '../types';
import { roadmapData } from '../data/roadmapData';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface LMSContextType {
  modules: Module[];
  studentStats: StudentStats;
  toggleTopicCompletion: (moduleId: string, topicId: string) => void;
  toggleLessonCompletion: (moduleId: string, topicId: string, lessonId: string) => void;
  addModule: (module: Omit<Module, 'id'>) => void;
  updateModule: (moduleId: string, updates: Partial<Module>) => void;
  deleteModule: (moduleId: string) => void;
  addTopic: (moduleId: string, topic: Omit<Topic, 'id'>) => void;
  updateTopic: (moduleId: string, topicId: string, updates: Partial<Topic>) => void;
  deleteTopic: (moduleId: string, topicId: string) => void;
  addLesson: (moduleId: string, topicId: string, lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (moduleId: string, topicId: string, lessonId: string, updates: Partial<Lesson>) => void;
  deleteLesson: (moduleId: string, topicId: string, lessonId: string) => void;
  calculateStats: () => void;
}

const LMSContext = createContext<LMSContextType | undefined>(undefined);

export const useLMS = () => {
  const context = useContext(LMSContext);
  if (!context) {
    throw new Error('useLMS must be used within an LMSProvider');
  }
  return context;
};

export const LMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useLocalStorage<Module[]>('lms-modules', roadmapData);
  const [studentStats, setStudentStats] = useState<StudentStats>({
    totalModules: 0,
    completedModules: 0,
    totalTopics: 0,
    completedTopics: 0,
    totalLessons: 0,
    completedLessons: 0,
    overallProgress: 0,
    studyStreak: 7,
    totalStudyHours: 0,
    averageScore: 85
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const calculateStats = () => {
    const totalModules = modules.length;
    const totalTopics = modules.reduce((acc, module) => acc + module.topics.length, 0);
    const totalLessons = modules.reduce(
      (acc, module) => acc + module.topics.reduce((topicAcc, topic) => topicAcc + topic.lessons.length, 0),
      0
    );
    
    const completedTopics = modules.reduce(
      (acc, module) => acc + module.topics.filter(topic => topic.completed).length,
      0
    );
    
    const completedLessons = modules.reduce(
      (acc, module) => acc + module.topics.reduce(
        (topicAcc, topic) => topicAcc + topic.lessons.filter(lesson => lesson.completed).length,
        0
      ),
      0
    );
    
    const completedModules = modules.filter(module => 
      module.topics.every(topic => topic.completed)
    ).length;
    
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    const totalStudyHours = modules.reduce(
      (acc, module) => acc + module.estimatedHours,
      0
    );

    setStudentStats({
      totalModules,
      completedModules,
      totalTopics,
      completedTopics,
      totalLessons,
      completedLessons,
      overallProgress,
      studyStreak: 7,
      totalStudyHours,
      averageScore: 85
    });
  };

  const toggleTopicCompletion = (moduleId: string, topicId: string) => {
    setModules(prevModules => 
      prevModules.map(module => {
        if (module.id === moduleId) {
          const updatedTopics = module.topics.map(topic => {
            if (topic.id === topicId) {
              const newCompleted = !topic.completed;
              // If marking as completed, mark all lessons as completed too
              const updatedLessons = newCompleted 
                ? topic.lessons.map(lesson => ({ ...lesson, completed: true }))
                : topic.lessons.map(lesson => ({ ...lesson, completed: false }));
              
              return { ...topic, completed: newCompleted, lessons: updatedLessons };
            }
            return topic;
          });
          
          const completedTopics = updatedTopics.filter(topic => topic.completed).length;
          const progress = Math.round((completedTopics / updatedTopics.length) * 100);
          const completed = updatedTopics.every(topic => topic.completed);
          
          return { ...module, topics: updatedTopics, progress, completed };
        }
        return module;
      })
    );
  };

  const toggleLessonCompletion = (moduleId: string, topicId: string, lessonId: string) => {
    setModules(prevModules => 
      prevModules.map(module => {
        if (module.id === moduleId) {
          const updatedTopics = module.topics.map(topic => {
            if (topic.id === topicId) {
              const updatedLessons = topic.lessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
              );
              
              const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;
              const topicCompleted = completedLessons === updatedLessons.length;
              
              return { ...topic, lessons: updatedLessons, completed: topicCompleted };
            }
            return topic;
          });
          
          const completedTopics = updatedTopics.filter(topic => topic.completed).length;
          const progress = Math.round((completedTopics / updatedTopics.length) * 100);
          const completed = updatedTopics.every(topic => topic.completed);
          
          return { ...module, topics: updatedTopics, progress, completed };
        }
        return module;
      })
    );
  };

  // CRUD Operations for Modules
  const addModule = (moduleData: Omit<Module, 'id'>) => {
    const newModule: Module = {
      ...moduleData,
      id: generateId(),
    };
    setModules(prev => [...prev, newModule]);
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, ...updates } : module
    ));
  };

  const deleteModule = (moduleId: string) => {
    setModules(prev => prev.filter(module => module.id !== moduleId));
  };

  // CRUD Operations for Topics
  const addTopic = (moduleId: string, topicData: Omit<Topic, 'id'>) => {
    const newTopic: Topic = {
      ...topicData,
      id: generateId(),
    };
    
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, topics: [...module.topics, newTopic] }
        : module
    ));
  };

  const updateTopic = (moduleId: string, topicId: string, updates: Partial<Topic>) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            topics: module.topics.map(topic => 
              topic.id === topicId ? { ...topic, ...updates } : topic
            )
          }
        : module
    ));
  };

  const deleteTopic = (moduleId: string, topicId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, topics: module.topics.filter(topic => topic.id !== topicId) }
        : module
    ));
  };

  // CRUD Operations for Lessons
  const addLesson = (moduleId: string, topicId: string, lessonData: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: generateId(),
    };
    
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            topics: module.topics.map(topic => 
              topic.id === topicId 
                ? { ...topic, lessons: [...topic.lessons, newLesson] }
                : topic
            )
          }
        : module
    ));
  };

  const updateLesson = (moduleId: string, topicId: string, lessonId: string, updates: Partial<Lesson>) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            topics: module.topics.map(topic => 
              topic.id === topicId 
                ? {
                    ...topic,
                    lessons: topic.lessons.map(lesson => 
                      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
                    )
                  }
                : topic
            )
          }
        : module
    ));
  };

  const deleteLesson = (moduleId: string, topicId: string, lessonId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            topics: module.topics.map(topic => 
              topic.id === topicId 
                ? { ...topic, lessons: topic.lessons.filter(lesson => lesson.id !== lessonId) }
                : topic
            )
          }
        : module
    ));
  };

  useEffect(() => {
    calculateStats();
  }, [modules]);

  return (
    <LMSContext.Provider value={{ 
      modules, 
      studentStats, 
      toggleTopicCompletion, 
      toggleLessonCompletion,
      addModule,
      updateModule,
      deleteModule,
      addTopic,
      updateTopic,
      deleteTopic,
      addLesson,
      updateLesson,
      deleteLesson,
      calculateStats 
    }}>
      {children}
    </LMSContext.Provider>
  );
};
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Gamepad2, 
  Trophy, 
  Clock, 
  Target,
  Shield,
  ChevronRight,
  Star,
  Flame,
  Award,
  TrendingUp,
  User,
  Settings
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { getTranslation, type Country, type Language } from '../../lib/data';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [userCountry, setUserCountry] = useState<Country | null>(null);
  const [userLanguage, setUserLanguage] = useState<Language | null>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const country = localStorage.getItem('selectedCountry');
    const language = localStorage.getItem('selectedLanguage');
    const name = localStorage.getItem('username');
    
    if (country && language && name) {
      setUserCountry(JSON.parse(country));
      setUserLanguage(JSON.parse(language));
      setUsername(name);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const currentLang = userLanguage?.code || 'en';

  const stats = {
    lessonsCompleted: 3,
    totalLessons: 5,
    quizScore: 85,
    streakDays: 7,
    totalPoints: 1250
  };

  const activities = [
    {
      icon: BookOpen,
      title: getTranslation(currentLang, 'ui', 'interactiveLessons', 'Interactive Lessons'),
      description: 'Learn road safety through engaging animated lessons',
      progress: (stats.lessonsCompleted / stats.totalLessons) * 100,
      action: () => navigate('/lessons'),
      gradient: 'from-blue-500 to-cyan-500',
      completedText: `${stats.lessonsCompleted}/${stats.totalLessons} completed`,
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: Brain,
      title: getTranslation(currentLang, 'ui', 'knowledgeQuiz', 'Knowledge Quiz'),
      description: 'Test your understanding with interactive quizzes',
      progress: stats.quizScore,
      action: () => navigate('/quiz'),
      gradient: 'from-green-500 to-emerald-500',
      completedText: `${stats.quizScore}% average score`,
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      icon: Gamepad2,
      title: getTranslation(currentLang, 'ui', 'safetySimulation', 'Safety Simulation'),
      description: 'Practice real-world scenarios in a safe environment',
      progress: 45,
      action: () => navigate('/game'),
      gradient: 'from-purple-500 to-pink-500',
      completedText: '3 scenarios completed',
      bgGradient: 'from-purple-500/10 to-pink-500/10'
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Completed your first lesson', earned: true, icon: '🎯' },
    { name: 'Quiz Master', description: 'Scored 80% or higher on a quiz', earned: true, icon: '🧠' },
    { name: 'Streak Keeper', description: '7 days learning streak', earned: true, icon: '🔥' },
    { name: 'Safety Expert', description: 'Complete all lessons', earned: false, icon: '🏆' }
  ];

  if (!userCountry || !userLanguage || !username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white mb-1"
                >
                  {getTranslation(currentLang, 'ui', 'welcome', 'Welcome back')}, {username}! {userCountry.flag}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-300"
                >
                  {getTranslation(currentLang, 'ui', 'continueJourney', 'Continue your road safety journey')} in {userLanguage.nativeName}
                </motion.p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: BookOpen, value: stats.lessonsCompleted, label: getTranslation(currentLang, 'ui', 'lessonsDone', 'Lessons Done'), gradient: 'from-blue-500 to-cyan-500' },
            { icon: Target, value: `${stats.quizScore}%`, label: getTranslation(currentLang, 'ui', 'quizScore', 'Quiz Score'), gradient: 'from-green-500 to-emerald-500' },
            { icon: Flame, value: stats.streakDays, label: getTranslation(currentLang, 'ui', 'dayStreak', 'Day Streak'), gradient: 'from-orange-500 to-red-500' },
            { icon: Trophy, value: stats.totalPoints, label: getTranslation(currentLang, 'ui', 'totalPoints', 'Total Points'), gradient: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activities */}
          <div className="lg:col-span-2">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-6 flex items-center gap-2"
            >
              <TrendingUp className="w-6 h-6 text-blue-400" />
              {getTranslation(currentLang, 'ui', 'learningActivities', 'Learning Activities')}
            </motion.h2>
            
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={activity.action}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className={`p-4 bg-gradient-to-br ${activity.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <activity.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {activity.title}
                        </h3>
                        <p className="text-slate-300 mb-4">{activity.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">{activity.completedText}</span>
                            <span className="text-sm font-semibold text-white">{Math.round(activity.progress)}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${activity.progress}%` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                              className={`h-full bg-gradient-to-r ${activity.gradient} rounded-full`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">
                  {getTranslation(currentLang, 'ui', 'achievements', 'Achievements')}
                </h3>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30' 
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className={`text-2xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold ${achievement.earned ? 'text-green-300' : 'text-slate-400'}`}>
                        {achievement.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {achievement.description}
                      </div>
                    </div>
                    {achievement.earned && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Award className="w-5 h-5 text-green-400" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                {getTranslation(currentLang, 'ui', 'quickActions', 'Quick Actions')}
              </h3>
              
              <div className="space-y-3">
                {[
                  { icon: BookOpen, label: getTranslation(currentLang, 'ui', 'continueLearning', 'Continue Learning'), action: () => navigate('/lessons'), gradient: 'from-blue-500 to-cyan-500' },
                  { icon: Brain, label: getTranslation(currentLang, 'ui', 'takeQuiz', 'Take Quiz'), action: () => navigate('/quiz'), gradient: 'from-green-500 to-emerald-500' },
                  { icon: Gamepad2, label: getTranslation(currentLang, 'ui', 'playSimulation', 'Play Simulation'), action: () => navigate('/game'), gradient: 'from-purple-500 to-pink-500' }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.action}
                    className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white transition-all duration-300 group"
                  >
                    <div className={`p-2 bg-gradient-to-br ${action.gradient} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
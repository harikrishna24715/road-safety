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
  Settings,
  Sparkles,
  Gift,
  Puzzle
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
  const [isNewUser, setIsNewUser] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userStats, setUserStats] = useState({
    lessonsCompleted: 0,
    totalLessons: 6, // 2 modules × 3 steps each
    quizScore: 0,
    streakDays: 0,
    totalPoints: 0,
    completedSteps: 0
  });

  useEffect(() => {
    const country = localStorage.getItem('selectedCountry');
    const language = localStorage.getItem('selectedLanguage');
    const name = localStorage.getItem('username');
    const userProgress = localStorage.getItem('userProgress');
    const learningProgress = localStorage.getItem('learningProgress');
    
    if (country && language && name) {
      setUserCountry(JSON.parse(country));
      setUserLanguage(JSON.parse(language));
      setUsername(name);
      
      // Load user progress
      if (userProgress) {
        const progress = JSON.parse(userProgress);
        setIsNewUser(progress.isNewUser || false);
        setUserStats(prev => ({
          ...prev,
          totalPoints: progress.totalPoints || 0,
          quizScore: progress.quizScore || 0,
          streakDays: progress.streakDays || 0
        }));
      }
      
      // Load learning progress
      if (learningProgress) {
        const learning = JSON.parse(learningProgress);
        let completedSteps = 0;
        Object.values(learning).forEach((module: any) => {
          completedSteps += Object.keys(module).length;
        });
        
        setUserStats(prev => ({
          ...prev,
          completedSteps,
          lessonsCompleted: Math.floor(completedSteps / 3) // Each module has 3 steps
        }));
        
        if (completedSteps > 0) {
          setIsNewUser(false);
          setShowWelcome(false);
        }
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const currentLang = userLanguage?.code || 'en';

  const activities = [
    {
      icon: BookOpen,
      title: getTranslation(currentLang, 'ui', 'interactiveLessons', 'Interactive Learning'),
      description: 'Complete lessons, puzzles, and games in sequence',
      progress: (userStats.completedSteps / userStats.totalLessons) * 100,
      action: () => navigate('/lessons'),
      gradient: 'from-blue-500 to-cyan-500',
      completedText: `${userStats.completedSteps}/${userStats.totalLessons} steps completed`,
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      isNew: userStats.completedSteps === 0
    },
    {
      icon: Brain,
      title: getTranslation(currentLang, 'ui', 'knowledgeQuiz', 'Knowledge Quiz'),
      description: 'Test your knowledge after completing lessons',
      progress: userStats.quizScore,
      action: () => navigate('/quiz'),
      gradient: 'from-green-500 to-emerald-500',
      completedText: userStats.lessonsCompleted > 0 ? `Best score: ${userStats.quizScore}%` : 'Complete lessons first',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      isLocked: userStats.lessonsCompleted === 0
    },
    {
      icon: Gamepad2,
      title: getTranslation(currentLang, 'ui', 'safetySimulation', 'Safety Simulation'),
      description: 'Advanced simulations (unlocks after completing modules)',
      progress: 0,
      action: () => navigate('/game'),
      gradient: 'from-purple-500 to-pink-500',
      completedText: userStats.lessonsCompleted >= 2 ? 'Advanced simulations available' : 'Complete 2 modules to unlock',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      isLocked: userStats.lessonsCompleted < 2
    }
  ];

  // Enhanced achievements based on learning flow
  const achievements = [
    { name: 'Welcome Aboard', description: 'Complete your profile setup', earned: true, icon: '🎯' },
    { name: 'First Lesson', description: 'Complete your first lesson', earned: userStats.completedSteps >= 1, icon: '📚' },
    { name: 'Puzzle Solver', description: 'Complete your first puzzle', earned: userStats.completedSteps >= 2, icon: '🧩' },
    { name: 'Game Master', description: 'Complete your first game', earned: userStats.completedSteps >= 3, icon: '🎮' },
    { name: 'Module Complete', description: 'Complete an entire module', earned: userStats.lessonsCompleted >= 1, icon: '🏆' },
    { name: 'Safety Expert', description: 'Complete all modules', earned: userStats.lessonsCompleted >= 2, icon: '🌟' }
  ];

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    userProgress.isNewUser = false;
    userProgress.welcomeDismissed = true;
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  };

  const getWelcomeMessage = () => {
    switch (currentLang) {
      case 'hi':
        return {
          title: 'रोड सेफ्टी 2.0 में आपका स्वागत है! 🎉',
          subtitle: `नमस्ते ${username}! आप बिल्कुल शुरुआत से शुरू कर रहे हैं।`,
          description: 'हम आपको ${userLanguage.nativeName} में सड़क सुरक्षा की यात्रा में कदम दर कदम मार्गदर्शन करेंगे।'
        };
      case 'te':
        return {
          title: 'రోడ్ సేఫ్టీ 2.0కి స్వాగతం! 🎉',
          subtitle: `నమస్కారం ${username}! మీరు పూర్తిగా కొత్తగా ప్రారంభిస్తున్నారు।`,
          description: 'మేము మిమ్మల్ని ${userLanguage.nativeName}లో రోడ్డు భద్రత ప్రయాణంలో అడుగు అడుగునా మార్గనిర్దేశనం చేస్తాము।'
        };
      case 'es':
        return {
          title: '¡Bienvenido a Road Safety 2.0! 🎉',
          subtitle: `¡Hola ${username}! Estás empezando completamente desde cero.`,
          description: 'Te guiaremos paso a paso en tu viaje de seguridad vial en ${userLanguage.nativeName}.'
        };
      default:
        return {
          title: 'Welcome to Road Safety 2.0! 🎉',
          subtitle: `Hi ${username}! You're starting fresh with zero knowledge.`,
          description: `We'll guide you step by step through your road safety journey in ${userLanguage?.nativeName}.`
        };
    }
  };

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

  const welcomeMessage = getWelcomeMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Modal for New Users */}
        {showWelcome && isNewUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                {welcomeMessage.title}
              </h2>
              <p className="text-slate-300 mb-2 font-medium">
                {welcomeMessage.subtitle}
              </p>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {welcomeMessage.description}
              </p>
              
              <div className="space-y-3 mb-6 text-sm text-slate-300">
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span>Learn with interactive lessons</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                  <Puzzle className="w-5 h-5 text-purple-400" />
                  <span>Solve puzzles to practice</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                  <Gamepad2 className="w-5 h-5 text-green-400" />
                  <span>Play games to apply knowledge</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>Earn achievements and points</span>
                </div>
              </div>
              
              <Button 
                onClick={handleDismissWelcome}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3"
              >
                <Gift className="w-4 h-4 mr-2" />
                Let's Begin My Journey!
              </Button>
            </motion.div>
          </motion.div>
        )}

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
                  Welcome, {username}! {userCountry.flag}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-300"
                >
                  {userStats.completedSteps === 0 
                    ? `🌟 Starting fresh in ${userLanguage.nativeName} - Let's learn together!`
                    : `📚 Learning in ${userLanguage.nativeName} - ${userStats.completedSteps} steps completed!`
                  }
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

        {/* Progress Banner */}
        {userStats.completedSteps > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Great Progress! 🚀</h3>
                  <p className="text-green-200">
                    You've completed {userStats.completedSteps} learning steps and earned {userStats.totalPoints} points. 
                    Keep going to unlock more features!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: BookOpen, value: userStats.completedSteps, label: 'Steps Done', gradient: 'from-blue-500 to-cyan-500' },
            { icon: Target, value: `${userStats.quizScore}%`, label: getTranslation(currentLang, 'ui', 'quizScore', 'Quiz Score'), gradient: 'from-green-500 to-emerald-500' },
            { icon: Flame, value: userStats.streakDays, label: getTranslation(currentLang, 'ui', 'dayStreak', 'Day Streak'), gradient: 'from-orange-500 to-red-500' },
            { icon: Trophy, value: userStats.totalPoints, label: getTranslation(currentLang, 'ui', 'totalPoints', 'Total Points'), gradient: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
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
              transition={{ delay: 0.4 }}
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
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={!activity.isLocked ? { scale: 1.02, y: -5 } : {}}
                  onClick={!activity.isLocked ? activity.action : undefined}
                  className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-300 ${
                    activity.isLocked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:shadow-3xl cursor-pointer group'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className={`p-4 bg-gradient-to-br ${activity.gradient} rounded-2xl shadow-lg ${
                        !activity.isLocked ? 'group-hover:scale-110' : ''
                      } transition-transform duration-300 relative`}>
                        <activity.icon className="w-8 h-8 text-white" />
                        {activity.isNew && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl font-semibold text-white mb-2 ${
                          !activity.isLocked ? 'group-hover:text-blue-300' : ''
                        } transition-colors flex items-center gap-2`}>
                          {activity.title}
                          {activity.isNew && <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">NEW</Badge>}
                          {activity.isLocked && <Badge className="bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 text-xs">LOCKED</Badge>}
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
                              transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                              className={`h-full bg-gradient-to-r ${activity.gradient} rounded-full`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {!activity.isLocked && (
                      <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    )}
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
              transition={{ delay: 0.6 }}
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
                    transition={{ delay: 0.7 + index * 0.1 }}
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
                        transition={{ delay: 0.8 + index * 0.1 }}
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
              transition={{ delay: 0.7 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                {getTranslation(currentLang, 'ui', 'quickActions', 'Quick Actions')}
              </h3>
              
              <div className="space-y-3">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/lessons')}
                  className="w-full flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white transition-all duration-300 group"
                >
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">
                    {userStats.completedSteps === 0 ? 'Start Learning' : 'Continue Learning'}
                  </span>
                  <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  onClick={() => userStats.lessonsCompleted > 0 && navigate('/quiz')}
                  disabled={userStats.lessonsCompleted === 0}
                  className={`w-full flex items-center gap-3 p-4 border rounded-xl transition-all duration-300 ${
                    userStats.lessonsCompleted > 0 
                      ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white cursor-pointer group'
                      : 'bg-white/5 border-white/10 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    userStats.lessonsCompleted > 0 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 group-hover:scale-110 transition-transform duration-300'
                      : 'bg-gradient-to-br from-gray-500 to-slate-500'
                  }`}>
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">
                    {userStats.lessonsCompleted > 0 ? 'Take Quiz' : 'Quiz (Complete lessons first)'}
                  </span>
                  {userStats.lessonsCompleted > 0 && (
                    <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  onClick={() => userStats.lessonsCompleted >= 2 && navigate('/game')}
                  disabled={userStats.lessonsCompleted < 2}
                  className={`w-full flex items-center gap-3 p-4 border rounded-xl transition-all duration-300 ${
                    userStats.lessonsCompleted >= 2 
                      ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white cursor-pointer group'
                      : 'bg-white/5 border-white/10 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    userStats.lessonsCompleted >= 2 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300'
                      : 'bg-gradient-to-br from-gray-500 to-slate-500'
                  }`}>
                    <Gamepad2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">
                    {userStats.lessonsCompleted >= 2 ? 'Play Simulation' : 'Simulation (Complete 2 modules)'}
                  </span>
                  {userStats.lessonsCompleted >= 2 && (
                    <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
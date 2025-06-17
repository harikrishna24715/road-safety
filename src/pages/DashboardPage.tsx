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
  Star
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

  useEffect(() => {
    const country = localStorage.getItem('selectedCountry');
    const language = localStorage.getItem('selectedLanguage');
    
    if (country && language) {
      setUserCountry(JSON.parse(country));
      setUserLanguage(JSON.parse(language));
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
      color: 'bg-blue-500',
      completedText: `${stats.lessonsCompleted}/${stats.totalLessons} completed`
    },
    {
      icon: Brain,
      title: getTranslation(currentLang, 'ui', 'knowledgeQuiz', 'Knowledge Quiz'),
      description: 'Test your understanding with interactive quizzes',
      progress: stats.quizScore,
      action: () => navigate('/quiz'),
      color: 'bg-green-500',
      completedText: `${stats.quizScore}% average score`
    },
    {
      icon: Gamepad2,
      title: getTranslation(currentLang, 'ui', 'safetySimulation', 'Safety Simulation'),
      description: 'Practice real-world scenarios in a safe environment',
      progress: 45,
      action: () => navigate('/game'),
      color: 'bg-purple-500',
      completedText: '3 scenarios completed'
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Completed your first lesson', earned: true },
    { name: 'Quiz Master', description: 'Scored 80% or higher on a quiz', earned: true },
    { name: 'Streak Keeper', description: '7 days learning streak', earned: true },
    { name: 'Safety Expert', description: 'Complete all lessons', earned: false }
  ];

  if (!userCountry || !userLanguage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getTranslation(currentLang, 'ui', 'welcome', 'Welcome back!')} {userCountry.flag}
              </h1>
              <p className="text-gray-600">
                {getTranslation(currentLang, 'ui', 'continueJourney', 'Continue your road safety journey')} in {userLanguage.nativeName}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalPoints}</div>
                <div className="text-sm text-gray-500">
                  {getTranslation(currentLang, 'ui', 'points', 'Points')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.streakDays}</div>
                <div className="text-sm text-gray-500">
                  {getTranslation(currentLang, 'ui', 'dayStreak', 'Day Streak')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.lessonsCompleted}</div>
                  <div className="text-sm text-gray-500">
                    {getTranslation(currentLang, 'ui', 'lessonsDone', 'Lessons Done')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.quizScore}%</div>
                  <div className="text-sm text-gray-500">
                    {getTranslation(currentLang, 'ui', 'quizScore', 'Quiz Score')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.streakDays}</div>
                  <div className="text-sm text-gray-500">
                    {getTranslation(currentLang, 'ui', 'dayStreak', 'Day Streak')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalPoints}</div>
                  <div className="text-sm text-gray-500">
                    {getTranslation(currentLang, 'ui', 'totalPoints', 'Total Points')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activities */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {getTranslation(currentLang, 'ui', 'learningActivities', 'Learning Activities')}
            </h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={activity.action}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`p-3 ${activity.color} rounded-lg`}>
                            <activity.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {activity.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{activity.description}</p>
                            <div className="flex items-center gap-4">
                              <Progress value={activity.progress} className="flex-1" />
                              <span className="text-sm text-gray-500 min-w-fit">
                                {activity.completedText}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
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
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    {getTranslation(currentLang, 'ui', 'achievements', 'Achievements')}
                  </CardTitle>
                  <CardDescription>Your road safety milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={achievement.name}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`p-1 rounded-full ${
                        achievement.earned ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <Star className={`w-3 h-3 ${
                          achievement.earned ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          achievement.earned ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{getTranslation(currentLang, 'ui', 'quickActions', 'Quick Actions')}</CardTitle>
                  <CardDescription>Jump into learning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigate('/lessons')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {getTranslation(currentLang, 'ui', 'continueLearning', 'Continue Learning')}
                  </Button>
                  <Button 
                    onClick={() => navigate('/quiz')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {getTranslation(currentLang, 'ui', 'takeQuiz', 'Take Quiz')}
                  </Button>
                  <Button 
                    onClick={() => navigate('/game')} 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    {getTranslation(currentLang, 'ui', 'playSimulation', 'Play Simulation')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
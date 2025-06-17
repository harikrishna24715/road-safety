import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Lock,
  Star,
  Users,
  Target,
  Volume2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { sampleLessons, getTranslation, translations, languageMap, type Country, type Language } from '../../lib/data';
import { trafficLightAnimation, pedestrianCrossingAnimation, bicycleSafetyAnimation } from '../../lib/animations';
import { updateProgress, getProgress } from '../../lib/supabase';

const LessonsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['1', '2', '3']);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userCountry, setUserCountry] = useState<Country | null>(null);
  const [userLanguage, setUserLanguage] = useState<Language | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const country = localStorage.getItem('selectedCountry');
    const language = localStorage.getItem('selectedLanguage');
    
    if (country && language) {
      setUserCountry(JSON.parse(country));
      setUserLanguage(JSON.parse(language));
      
      // Load progress from Supabase
      const loadProgress = async () => {
        const progress = await getProgress(JSON.parse(language).code);
        setCurrentLevel(progress);
      };
      loadProgress();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const currentLang = userLanguage?.code || 'en';
  const lessonLevels = translations.lessonLevels[currentLang] || translations.lessonLevels.en;

  // Speech synthesis function
  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageMap[lang] || 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis not supported in this browser');
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleLevelChange = async (newLevel: number) => {
    if (newLevel >= 0 && newLevel < lessonLevels.length) {
      setCurrentLevel(newLevel);
      // Update progress in Supabase
      await updateProgress(newLevel, currentLang);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isLessonUnlocked = (lessonId: string, index: number) => {
    if (index === 0) return true;
    const previousLessonId = sampleLessons[index - 1].id;
    return completedLessons.includes(previousLessonId);
  };

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const getAnimationForLevel = (level: number) => {
    switch (level % 3) {
      case 0: return trafficLightAnimation;
      case 1: return pedestrianCrossingAnimation;
      case 2: return bicycleSafetyAnimation;
      default: return trafficLightAnimation;
    }
  };

  const LessonModal = ({ lessonId }: { lessonId: string }) => {
    const lesson = sampleLessons.find(l => l.id === lessonId);
    if (!lesson) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={() => setSelectedLesson(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
              <Button variant="ghost" onClick={() => setSelectedLesson(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Animation Section */}
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                  <Lottie 
                    animationData={getAnimationForLevel(currentLevel)} 
                    loop 
                    className="w-full h-full max-w-sm max-h-sm"
                  />
                </div>
                
                {/* Voiceover Controls */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => speak(lessonLevels[currentLevel]?.content || '', currentLang)}
                    disabled={isPlaying}
                    className="flex-1"
                    variant={isPlaying ? "secondary" : "default"}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    {getTranslation(currentLang, 'ui', 'listenVoiceover', '🔊 Listen to Voiceover')}
                  </Button>
                  {isPlaying && (
                    <Button onClick={stopSpeech} variant="outline">
                      Stop
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {getTranslation(currentLang, 'ui', 'lessonProgress', 'Lesson Progress')}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Level {currentLevel + 1} of {lessonLevels.length}
                    </span>
                    <span className="text-sm text-gray-600">
                      {Math.round(((currentLevel + 1) / lessonLevels.length) * 100)}%
                    </span>
                  </div>
                  <Progress value={((currentLevel + 1) / lessonLevels.length) * 100} className="mb-4" />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {lessonLevels[currentLevel]?.title}
                  </h4>
                  <p className="text-blue-800 leading-relaxed">
                    {lessonLevels[currentLevel]?.content}
                  </p>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleLevelChange(currentLevel - 1)}
                    disabled={currentLevel === 0}
                    variant="outline"
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {getTranslation(currentLang, 'ui', 'previousLesson', '⬅️ Previous')}
                  </Button>
                  <Button
                    onClick={() => handleLevelChange(currentLevel + 1)}
                    disabled={currentLevel === lessonLevels.length - 1}
                    variant="outline"
                    className="flex-1"
                  >
                    {getTranslation(currentLang, 'ui', 'nextLesson', '➡️ Next')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => handleLessonComplete(lesson.id)}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Complete
              </Button>
              <Button variant="outline" onClick={() => setSelectedLesson(null)}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (!userCountry || !userLanguage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {getTranslation(currentLang, 'ui', 'backToDashboard', 'Back to Dashboard')}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getTranslation(currentLang, 'ui', 'interactiveLessons', 'Interactive Lessons')} {userCountry.flag}
              </h1>
              <p className="text-gray-600">
                Learn road safety through engaging animated content in {userLanguage.nativeName}
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {completedLessons.length}/{sampleLessons.length}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>
        </motion.div>

        {/* Current Level Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Current Lesson</h3>
                    <Badge variant="secondary">Level {currentLevel + 1}</Badge>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {lessonLevels[currentLevel]?.title}
                    </h4>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      {lessonLevels[currentLevel]?.content}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => speak(lessonLevels[currentLevel]?.content || '', currentLang)}
                      disabled={isPlaying}
                      variant={isPlaying ? "secondary" : "default"}
                      size="sm"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      {getTranslation(currentLang, 'ui', 'listenVoiceover', '🔊 Listen')}
                    </Button>
                    {isPlaying && (
                      <Button onClick={stopSpeech} variant="outline" size="sm">
                        Stop
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                    <Lottie 
                      animationData={getAnimationForLevel(currentLevel)} 
                      loop 
                      className="w-full h-full max-w-xs max-h-xs"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleLevelChange(currentLevel - 1)}
                      disabled={currentLevel === 0}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      {getTranslation(currentLang, 'ui', 'previousLesson', 'Previous')}
                    </Button>
                    <Button
                      onClick={() => handleLevelChange(currentLevel + 1)}
                      disabled={currentLevel === lessonLevels.length - 1}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      {getTranslation(currentLang, 'ui', 'nextLesson', 'Next')}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Progress</h3>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentLevel + 1) / lessonLevels.length) * 100)}% Complete
                </span>
              </div>
              <Progress value={((currentLevel + 1) / lessonLevels.length) * 100} className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">{currentLevel + 1} Levels Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">{lessonLevels.length - currentLevel - 1} Remaining</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">Learning in {userLanguage.nativeName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isUnlocked = isLessonUnlocked(lesson.id, index);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card 
                  className={`h-full transition-all duration-300 ${
                    isUnlocked 
                      ? 'hover:shadow-lg cursor-pointer hover:scale-105' 
                      : 'opacity-60 cursor-not-allowed'
                  } ${isCompleted ? 'ring-2 ring-green-500' : ''}`}
                  onClick={() => isUnlocked && setSelectedLesson(lesson.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getDifficultyColor(lesson.difficulty)}>
                        {lesson.difficulty}
                      </Badge>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : !isUnlocked ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : null}
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {lesson.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        {isUnlocked ? (
                          <Play className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                        ) : (
                          <Lock className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                        )}
                        <p className="text-xs text-gray-500">
                          {isUnlocked ? 'Click to start' : 'Complete previous lesson'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {lesson.duration}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {lesson.topics.slice(0, 2).map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {lesson.topics.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{lesson.topics.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Lesson Modal */}
        <AnimatePresence>
          {selectedLesson && <LessonModal lessonId={selectedLesson} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LessonsPage;
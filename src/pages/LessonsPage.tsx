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
  ChevronRight,
  Award,
  Zap,
  Shield,
  Sparkles,
  Gift
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
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userCountry, setUserCountry] = useState<Country | null>(null);
  const [userLanguage, setUserLanguage] = useState<Language | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFirstLessonPrompt, setShowFirstLessonPrompt] = useState(true);

  useEffect(() => {
    const country = localStorage.getItem('selectedCountry');
    const language = localStorage.getItem('selectedLanguage');
    const name = localStorage.getItem('username');
    const userProgress = localStorage.getItem('userProgress');
    
    if (country && language && name) {
      setUserCountry(JSON.parse(country));
      setUserLanguage(JSON.parse(language));
      setUsername(name);
      
      // Load fresh user progress
      if (userProgress) {
        const progress = JSON.parse(userProgress);
        setCurrentLevel(progress.currentLevel || 0);
        setCompletedLessons(progress.completedLessons || []);
        setShowFirstLessonPrompt(progress.completedLessons?.length === 0);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const currentLang = userLanguage?.code || 'en';
  const lessonLevels = translations.lessonLevels[currentLang] || translations.lessonLevels.en;

  // Enhanced speech synthesis function with better voice selection
  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get available voices and find the best match for the language
      const voices = speechSynthesis.getVoices();
      const targetLang = languageMap[lang] || 'en-US';
      
      // Find voice that matches the language
      const voice = voices.find(v => v.lang === targetLang) || 
                   voices.find(v => v.lang.startsWith(lang)) ||
                   voices.find(v => v.lang.startsWith('en'));
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.lang = targetLang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
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
      
      // Update user progress
      const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
      userProgress.currentLevel = newLevel;
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
      
      await updateProgress(newLevel, currentLang);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const isLessonUnlocked = (lessonId: string, index: number) => {
    // First lesson is always unlocked for new users
    if (index === 0) return true;
    // Other lessons unlock after completing previous ones
    const previousLessonId = sampleLessons[index - 1].id;
    return completedLessons.includes(previousLessonId);
  };

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(newCompletedLessons);
      
      // Update user progress
      const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
      userProgress.completedLessons = newCompletedLessons;
      userProgress.lessonsCompleted = newCompletedLessons.length;
      userProgress.totalPoints = newCompletedLessons.length * 100; // 100 points per lesson
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
      
      // Update individual storage items
      localStorage.setItem('completedLessons', JSON.stringify(newCompletedLessons));
      localStorage.setItem('totalPoints', String(newCompletedLessons.length * 100));
      
      setShowFirstLessonPrompt(false);
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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={() => setSelectedLesson(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
                  <p className="text-slate-300">Your First Interactive Learning Experience</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedLesson(null)}
                className="text-white hover:bg-white/10 text-2xl w-12 h-12 rounded-xl"
              >
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Animation Section */}
              <div className="space-y-6">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Lottie 
                    animationData={getAnimationForLevel(currentLevel)} 
                    loop 
                    className="w-full h-full max-w-sm max-h-sm"
                  />
                </div>
                
                {/* Voiceover Controls */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => speak(lessonLevels[currentLevel]?.content || '', currentLang)}
                    disabled={isPlaying}
                    className={`flex-1 ${isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} transition-all duration-300`}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    {isPlaying ? 'Playing...' : getTranslation(currentLang, 'ui', 'listenVoiceover', '🔊 Listen to Voiceover')}
                  </Button>
                  {isPlaying && (
                    <Button 
                      onClick={stopSpeech} 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Stop
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    {getTranslation(currentLang, 'ui', 'lessonProgress', 'Lesson Progress')}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-300">
                      Level {currentLevel + 1} of {lessonLevels.length}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {Math.round(((currentLevel + 1) / lessonLevels.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentLevel + 1) / lessonLevels.length) * 100}%` }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    {lessonLevels[currentLevel]?.title}
                  </h4>
                  <p className="text-slate-200 leading-relaxed">
                    {lessonLevels[currentLevel]?.content}
                  </p>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleLevelChange(currentLevel - 1)}
                    disabled={currentLevel === 0}
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {getTranslation(currentLang, 'ui', 'previousLesson', '⬅️ Previous')}
                  </Button>
                  <Button
                    onClick={() => handleLevelChange(currentLevel + 1)}
                    disabled={currentLevel === lessonLevels.length - 1}
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    {getTranslation(currentLang, 'ui', 'nextLesson', '➡️ Next')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={() => handleLessonComplete(lesson.id)}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Lesson & Earn Points
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedLesson(null)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* First Lesson Prompt */}
        {showFirstLessonPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Ready to Start Your First Lesson? 🎯</h3>
                  <p className="text-blue-200">
                    Click on "Traffic Signs and Signals" below to begin your road safety journey. 
                    You'll earn points and unlock new content as you progress!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/10 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {getTranslation(currentLang, 'ui', 'backToDashboard', 'Back to Dashboard')}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <BookOpen className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {getTranslation(currentLang, 'ui', 'interactiveLessons', 'Interactive Lessons')} {userCountry.flag}
                </h1>
                <p className="text-slate-300">
                  Start your journey in {userLanguage.nativeName} - Begin with zero knowledge!
                </p>
              </div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
              <div className="text-2xl font-bold text-white">
                {completedLessons.length}/{sampleLessons.length}
              </div>
              <div className="text-sm text-slate-300">Completed</div>
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
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-400" />
                    Current Lesson
                  </h3>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                    Level {currentLevel + 1}
                  </Badge>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h4 className="font-semibold text-white mb-3">
                    {lessonLevels[currentLevel]?.title}
                  </h4>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {lessonLevels[currentLevel]?.content}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => speak(lessonLevels[currentLevel]?.content || '', currentLang)}
                    disabled={isPlaying}
                    className={`${isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} transition-all duration-300`}
                    size="sm"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    {isPlaying ? 'Playing...' : getTranslation(currentLang, 'ui', 'listenVoiceover', '🔊 Listen')}
                  </Button>
                  {isPlaying && (
                    <Button 
                      onClick={stopSpeech} 
                      variant="outline" 
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Stop
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Lottie 
                    animationData={getAnimationForLevel(currentLevel)} 
                    loop 
                    className="w-full h-full max-w-xs max-h-xs"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleLevelChange(currentLevel - 1)}
                    disabled={currentLevel === 0}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {getTranslation(currentLang, 'ui', 'previousLesson', 'Previous')}
                  </Button>
                  <Button
                    onClick={() => handleLevelChange(currentLevel + 1)}
                    disabled={currentLevel === lessonLevels.length - 1}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
                  >
                    {getTranslation(currentLang, 'ui', 'nextLesson', 'Next')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Your Fresh Start Progress
              </h3>
              <span className="text-sm text-slate-300">
                {Math.round((completedLessons.length / sampleLessons.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedLessons.length / sampleLessons.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">{completedLessons.length} Lessons Completed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-sm">{sampleLessons.length - completedLessons.length} Remaining</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Learning in {userLanguage.nativeName}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isUnlocked = isLessonUnlocked(lesson.id, index);
            const isFirst = index === 0;
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                className={`transition-all duration-300 ${
                  isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                onClick={() => isUnlocked && setSelectedLesson(lesson.id)}
              >
                <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl h-full transition-all duration-300 ${
                  isUnlocked ? 'hover:shadow-3xl hover:bg-white/15' : 'opacity-60'
                } ${isCompleted ? 'ring-2 ring-green-500/50' : ''} ${
                  isFirst && !isCompleted ? 'ring-2 ring-blue-500/50 ring-pulse' : ''
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge className={`bg-gradient-to-r ${getDifficultyColor(lesson.difficulty)} text-white border-0`}>
                        {lesson.difficulty}
                      </Badge>
                      {isFirst && !isCompleted && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 text-xs animate-pulse">
                          START HERE
                        </Badge>
                      )}
                    </div>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : !isUnlocked ? (
                      <Lock className="w-6 h-6 text-slate-400" />
                    ) : isFirst ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-6 h-6 text-blue-400" />
                      </motion.div>
                    ) : null}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{lesson.title}</h3>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {lesson.description}
                  </p>
                  
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                    <div className="text-center">
                      {isUnlocked ? (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex flex-col items-center"
                        >
                          <Play className="w-8 h-8 text-blue-400 mb-2" />
                          <p className="text-xs text-slate-400">
                            {isFirst && !isCompleted ? 'Start your journey!' : 'Click to start'}
                          </p>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Lock className="w-8 h-8 text-slate-400 mb-2" />
                          <p className="text-xs text-slate-400">Complete previous lesson</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {lesson.topics.slice(0, 2).map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="outline" className="text-xs bg-white/5 border-white/20 text-slate-300">
                          {topic}
                        </Badge>
                      ))}
                      {lesson.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-slate-300">
                          +{lesson.topics.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
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
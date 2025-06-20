import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Trophy,
  Target,
  Brain,
  Zap,
  Award,
  Star,
  Shield,
  Lock,
  BookOpen
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { sampleQuizQuestions, type QuizQuestion } from '../../lib/data';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [canTakeQuiz, setCanTakeQuiz] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const question = sampleQuizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuizQuestions.length) * 100;

  useEffect(() => {
    const name = localStorage.getItem('username');
    const userProgress = localStorage.getItem('userProgress');
    const completed = localStorage.getItem('completedLessons');
    
    if (name) {
      setUsername(name);
    }
    
    if (completed) {
      const completedArray = JSON.parse(completed);
      setCompletedLessons(completedArray);
      // Allow quiz only if at least one lesson is completed
      setCanTakeQuiz(completedArray.length > 0);
    }
  }, []);

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, quizCompleted, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null || timeLeft === 0) {
      const newAnswers = [...answers, selectedAnswer ?? -1];
      setAnswers(newAnswers);
      setShowResult(true);
      
      setTimeout(() => {
        if (currentQuestion < sampleQuizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
          setTimeLeft(30);
        } else {
          setQuizCompleted(true);
          // Update user progress with quiz score
          const score = calculateScore();
          const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
          userProgress.quizScore = score;
          userProgress.totalPoints = (userProgress.totalPoints || 0) + (score * 10); // Bonus points for quiz
          localStorage.setItem('userProgress', JSON.stringify(userProgress));
          localStorage.setItem('quizScore', String(score));
        }
      }, 2000);
    }
  };

  const calculateScore = () => {
    const correct = answers.filter((answer, index) => 
      answer === sampleQuizQuestions[index].correctAnswer
    ).length;
    return Math.round((correct / sampleQuizQuestions.length) * 100);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
    setTimeLeft(30);
    setQuizStarted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-emerald-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  // Show locked state if no lessons completed
  if (!canTakeQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
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
                Back to Dashboard
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl mb-6 shadow-2xl"
              >
                <Lock className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-white mb-3">Quiz Locked 🔒</h1>
              <p className="text-slate-300 text-lg mb-8">
                Complete at least one lesson before taking the quiz!
              </p>
              
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center justify-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  How to Unlock Quizzes
                </h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</span>
                    <span>Complete your first lesson</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</span>
                    <span>Return here to test your knowledge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</span>
                    <span>Earn bonus points for good scores</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    onClick={() => navigate('/lessons')} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-4 text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button 
                    onClick={() => navigate('/dashboard')} 
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 py-4 text-lg"
                  >
                    Back to Dashboard
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
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
                Back to Dashboard
              </Button>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-bold text-white mb-3"
              >
                Road Safety Quiz
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-300 text-lg mb-8"
              >
                Test your knowledge from the lessons you've completed
              </motion.p>
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Quiz Unlocked! 🎉</h3>
                  <p className="text-green-200">
                    You've completed {completedLessons.length} lesson{completedLessons.length !== 1 ? 's' : ''}. 
                    Now test your knowledge and earn bonus points!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Quiz Instructions</h2>
                <p className="text-slate-300">
                  Answer {sampleQuizQuestions.length} questions about road safety
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                >
                  <Target className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <div className="font-semibold text-white text-lg">{sampleQuizQuestions.length} Questions</div>
                  <div className="text-sm text-slate-300">Multiple choice</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                >
                  <Clock className="w-10 h-10 text-green-400 mx-auto mb-3" />
                  <div className="font-semibold text-white text-lg">30 Seconds</div>
                  <div className="text-sm text-slate-300">Per question</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                >
                  <Trophy className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                  <div className="font-semibold text-white text-lg">Bonus Points</div>
                  <div className="text-sm text-slate-300">For good scores</div>
                </motion.div>
              </div>
              
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Question Difficulties:
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2">Easy</Badge>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-4 py-2">Medium</Badge>
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 px-4 py-2">Hard</Badge>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setQuizStarted(true)} 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6 transition-all duration-300 shadow-xl hover:shadow-2xl" 
                  size="lg"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Start Quiz
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const correctAnswers = answers.filter((answer, index) => 
      answer === sampleQuizQuestions[index].correctAnswer
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-8 shadow-2xl"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold text-white mb-3"
            >
              Quiz Complete!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-300 text-xl mb-8"
            >
              {username ? `Great job, ${username}!` : 'Great job!'} You've earned bonus points!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
                  >
                    {score}%
                  </motion.div>
                  <div className="text-xl text-slate-300">
                    {correctAnswers} out of {sampleQuizQuestions.length} correct
                  </div>
                  <div className="text-sm text-green-300 mt-2">
                    +{score * 10} bonus points earned!
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                  >
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{correctAnswers}</div>
                    <div className="text-sm text-slate-300">Correct</div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="text-center p-4 bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                  >
                    <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {sampleQuizQuestions.length - correctAnswers}
                    </div>
                    <div className="text-sm text-slate-300">Incorrect</div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                  >
                    <Star className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{score * 10}</div>
                    <div className="text-sm text-slate-300">Bonus Points</div>
                  </motion.div>
                </div>
                
                <div className="flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button 
                      onClick={restartQuiz} 
                      variant="outline" 
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 py-3"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retake Quiz
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button 
                      onClick={() => navigate('/dashboard')} 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3"
                    >
                      Back to Dashboard
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/10 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit Quiz
            </Button>
            <div className="flex items-center gap-6">
              <div className="text-sm text-slate-300 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
                Question {currentQuestion + 1} of {sampleQuizQuestions.length}
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm border ${
                timeLeft <= 10 
                  ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                  : 'bg-white/10 border-white/20 text-white'
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <Badge className={`bg-gradient-to-r ${getDifficultyColor(question.difficulty)} text-white border-0 px-4 py-2`}>
                {question.difficulty}
              </Badge>
              <div className="text-sm text-slate-300">
                {currentQuestion + 1}/{sampleQuizQuestions.length}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-8">{question.question}</h2>
            
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-500/20 text-green-300'
                          : 'border-red-500 bg-red-500/20 text-red-300'
                        : 'border-blue-500 bg-blue-500/20 text-blue-300'
                      : showResult && index === question.correctAnswer
                      ? 'border-green-500 bg-green-500/20 text-green-300'
                      : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
                  }`}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showResult && (
                      <div>
                        {index === question.correctAnswer ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="w-6 h-6 text-red-400" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                >
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Explanation:
                  </h4>
                  <p className="text-slate-200 leading-relaxed">{question.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-8 flex justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null && timeLeft > 0}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 px-8 py-3 transition-all duration-300"
                >
                  {currentQuestion === sampleQuizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
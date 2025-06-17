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
  Brain
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

  const question = sampleQuizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuizQuestions.length) * 100;

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
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4"
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Road Safety Quiz</h1>
              <p className="text-gray-600 mb-8">Test your knowledge with interactive questions</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Quiz Instructions</CardTitle>
                <CardDescription>
                  Answer {sampleQuizQuestions.length} questions about road safety
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">{sampleQuizQuestions.length} Questions</div>
                    <div className="text-sm text-gray-600">Multiple choice</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">30 Seconds</div>
                    <div className="text-sm text-gray-600">Per question</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold">Instant Results</div>
                    <div className="text-sm text-gray-600">With explanations</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Question Difficulties:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-100 text-green-800">Easy</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                    <Badge className="bg-red-100 text-red-800">Hard</Badge>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setQuizStarted(true)} 
                  className="w-full" 
                  size="lg"
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
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
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className="text-gray-600 mb-8">Here are your results</p>
            
            <Card className="max-w-2xl mx-auto mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
                  <div className="text-lg text-gray-600">
                    {correctAnswers} out of {sampleQuizQuestions.length} correct
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                    <div className="text-sm text-gray-500">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {sampleQuizQuestions.length - correctAnswers}
                    </div>
                    <div className="text-sm text-gray-500">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{score}%</div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={restartQuiz} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                  <Button onClick={() => navigate('/dashboard')} className="flex-1">
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Quiz
            </Button>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {sampleQuizQuestions.length}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className={`font-mono ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getDifficultyColor(question.difficulty)}>
                  {question.difficulty}
                </Badge>
                <div className="text-sm text-gray-500">
                  {currentQuestion + 1}/{sampleQuizQuestions.length}
                </div>
              </div>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? showResult
                          ? index === question.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-blue-500 bg-blue-50'
                        : showResult && index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    disabled={showResult}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && (
                        <div>
                          {index === question.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : selectedAnswer === index ? (
                            <XCircle className="w-5 h-5 text-red-600" />
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
                    className="mt-6 p-4 bg-blue-50 rounded-lg"
                  >
                    <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                    <p className="text-blue-800">{question.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null && timeLeft > 0}
                >
                  {currentQuestion === sampleQuizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
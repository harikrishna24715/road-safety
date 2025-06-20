import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Puzzle, 
  Gamepad2, 
  CheckCircle, 
  Lock, 
  Play, 
  Clock,
  Star,
  Trophy,
  Target,
  Volume2,
  ChevronRight,
  Award,
  Sparkles,
  Gift,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { learningModules, puzzleQuestions, gameScenarios } from '../../lib/learningData';
import { LearningModule, LearningStep } from '../types/learning';
import { getTranslation, languageMap } from '../../lib/data';

interface LearningFlowProps {
  language: string;
  onComplete: (stepId: string, type: 'lesson' | 'puzzle' | 'game') => void;
}

const LearningFlow: React.FC<LearningFlowProps> = ({ language, onComplete }) => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [selectedStep, setSelectedStep] = useState<LearningStep | null>(null);
  const [currentModule, setCurrentModule] = useState<LearningModule | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedStep, setCompletedStep] = useState<LearningStep | null>(null);
  const [showNextLessonPrompt, setShowNextLessonPrompt] = useState(false);

  useEffect(() => {
    const moduleData = learningModules[language] || learningModules.en;
    const userProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    
    // Update modules with user progress
    const updatedModules = moduleData.map(module => {
      const moduleProgress = userProgress[module.id] || {};
      const updatedSteps = module.steps.map(step => {
        const isCompleted = moduleProgress[step.id] || false;
        const isUnlocked = step.isUnlocked || 
          (step.requiredSteps?.every(reqId => moduleProgress[reqId]) ?? false);
        
        return { ...step, isCompleted, isUnlocked };
      });
      
      const completedSteps = updatedSteps.filter(step => step.isCompleted).length;
      const progress = (completedSteps / updatedSteps.length) * 100;
      const isCompleted = completedSteps === updatedSteps.length;
      
      return { ...module, steps: updatedSteps, progress, isCompleted };
    });
    
    setModules(updatedModules);
  }, [language]);

  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      const targetLang = languageMap[lang] || 'en-US';
      
      const voice = voices.find(v => v.lang === targetLang) || 
                   voices.find(v => v.lang.startsWith(lang)) ||
                   voices.find(v => v.lang.startsWith('en'));
      
      if (voice) utterance.voice = voice;
      utterance.lang = targetLang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const handleStepComplete = (step: LearningStep) => {
    // Update local storage
    const userProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    if (!userProgress[currentModule!.id]) {
      userProgress[currentModule!.id] = {};
    }
    userProgress[currentModule!.id][step.id] = true;
    localStorage.setItem('learningProgress', JSON.stringify(userProgress));
    
    // Update state
    setCompletedStep(step);
    setShowCompletionModal(true);
    onComplete(step.id, step.type);
    
    // Update modules
    const updatedModules = modules.map(module => {
      if (module.id === currentModule!.id) {
        const updatedSteps = module.steps.map(s => {
          if (s.id === step.id) {
            return { ...s, isCompleted: true };
          }
          // Unlock next steps
          const isUnlocked = s.isUnlocked || 
            (s.requiredSteps?.every(reqId => 
              reqId === step.id || userProgress[module.id]?.[reqId]
            ) ?? false);
          return { ...s, isUnlocked };
        });
        
        const completedSteps = updatedSteps.filter(s => s.isCompleted).length;
        const progress = (completedSteps / updatedSteps.length) * 100;
        const isCompleted = completedSteps === updatedSteps.length;
        
        return { ...module, steps: updatedSteps, progress, isCompleted };
      }
      return module;
    });
    
    setModules(updatedModules);
    
    // Check if module is complete and show next lesson prompt
    const currentModuleUpdated = updatedModules.find(m => m.id === currentModule!.id);
    if (currentModuleUpdated?.isCompleted) {
      setTimeout(() => {
        setShowNextLessonPrompt(true);
      }, 3000);
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'lesson': return BookOpen;
      case 'puzzle': return Puzzle;
      case 'game': return Gamepad2;
      default: return BookOpen;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'from-blue-500 to-cyan-500';
      case 'puzzle': return 'from-purple-500 to-pink-500';
      case 'game': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const NextLessonPrompt = () => {
    const nextModule = modules.find(module => !module.isCompleted && module.id !== currentModule?.id);
    
    if (!nextModule) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-2xl"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-3">
            Module Complete! 🎉
          </h2>
          <p className="text-slate-300 mb-6">
            Great job! You've completed all steps in this module. Ready to start the next lesson?
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-green-500/20 rounded-xl">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-300">Module Completed!</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-500/20 rounded-xl">
              <ArrowRight className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300">Next: {nextModule.title}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowNextLessonPrompt(false)}
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Continue Later
            </Button>
            <Button 
              onClick={() => {
                setShowNextLessonPrompt(false);
                const firstStep = nextModule.steps.find(step => step.isUnlocked);
                if (firstStep) {
                  setSelectedStep(firstStep);
                  setCurrentModule(nextModule);
                }
              }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Start Next Lesson
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const CompletionModal = () => {
    if (!completedStep) return null;

    const nextStep = currentModule?.steps.find(step => 
      step.requiredSteps?.includes(completedStep.id) && !step.isCompleted
    );

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-md w-full p-8 shadow-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-2xl"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-3">
            {getTranslation(language, 'ui', 'stepComplete', 'Step Complete!')} 🎉
          </h2>
          <p className="text-slate-300 mb-6">
            You've successfully completed the {completedStep.type}!
            {nextStep && ` Ready for the ${nextStep.type}?`}
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-green-500/20 rounded-xl">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-300">+100 Points Earned!</span>
            </div>
            {nextStep && (
              <div className="flex items-center gap-2 p-3 bg-blue-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300">Next: {nextStep.title}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowCompletionModal(false)}
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Continue Learning
            </Button>
            {nextStep && (
              <Button 
                onClick={() => {
                  setShowCompletionModal(false);
                  setSelectedStep(nextStep);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Start {nextStep.type}
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const StepModal = ({ step }: { step: LearningStep }) => {
    const StepIcon = getStepIcon(step.type);
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={() => setSelectedStep(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getStepColor(step.type)} rounded-2xl flex items-center justify-center`}>
                  <StepIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                  <p className="text-slate-300">{step.description}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedStep(null)}
                className="text-white hover:bg-white/10 text-2xl w-12 h-12 rounded-xl"
              >
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Image/Visual Section */}
              <div className="space-y-6">
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
                  <img 
                    src={step.imageUrl} 
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {step.type === 'lesson' && step.content && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => speak(step.content!, language)}
                      disabled={isPlaying}
                      className={`flex-1 ${isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} transition-all duration-300`}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      {isPlaying ? 'Playing...' : getTranslation(language, 'ui', 'listenVoiceover', '🔊 Listen')}
                    </Button>
                    {isPlaying && (
                      <Button 
                        onClick={() => speechSynthesis.cancel()} 
                        variant="outline" 
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Stop
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="space-y-6">
                {step.type === 'lesson' && step.content && (
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      Lesson Content
                    </h4>
                    <p className="text-slate-200 leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                )}
                
                {step.type === 'puzzle' && (
                  <PuzzleComponent stepId={step.id} language={language} onComplete={() => handleStepComplete(step)} />
                )}
                
                {step.type === 'game' && (
                  <GameComponent stepId={step.id} language={language} onComplete={() => handleStepComplete(step)} />
                )}
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4" />
                      <span>{step.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Target className="w-4 h-4" />
                      <span className="capitalize">{step.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {step.type === 'lesson' && (
              <div className="flex gap-4">
                <Button 
                  onClick={() => handleStepComplete(step)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Lesson
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedStep(null)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {modules.map((module, moduleIndex) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: moduleIndex * 0.1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden">
                <img 
                  src={module.imageUrl} 
                  alt={module.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{module.title}</h3>
                <p className="text-slate-300">{module.description}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(module.progress)}%
              </div>
              <div className="text-sm text-slate-300">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${module.progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              transition={{ duration: 1, delay: moduleIndex * 0.2 }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {module.steps.map((step, stepIndex) => {
              const StepIcon = getStepIcon(step.type);
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (moduleIndex * 0.1) + (stepIndex * 0.1) }}
                  whileHover={step.isUnlocked ? { scale: 1.05, y: -5 } : {}}
                  onClick={() => {
                    if (step.isUnlocked) {
                      setSelectedStep(step);
                      setCurrentModule(module);
                    }
                  }}
                  className={`transition-all duration-300 ${
                    step.isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl h-full transition-all duration-300 ${
                    step.isUnlocked ? 'hover:shadow-3xl hover:bg-white/15' : ''
                  } ${step.isCompleted ? 'ring-2 ring-green-500/50' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${getStepColor(step.type)} rounded-xl shadow-lg`}>
                        <StepIcon className="w-6 h-6 text-white" />
                      </div>
                      {step.isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : !step.isUnlocked ? (
                        <Lock className="w-6 h-6 text-slate-400" />
                      ) : (
                        <Play className="w-6 h-6 text-blue-400" />
                      )}
                    </div>
                    
                    <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                      {step.description}
                    </p>
                    
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-4">
                      <img 
                        src={step.imageUrl} 
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Clock className="w-4 h-4" />
                        {step.estimatedTime}
                      </div>
                      <Badge className={`bg-gradient-to-r ${getStepColor(step.type)} text-white border-0 w-full justify-center`}>
                        {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
      
      <AnimatePresence>
        {selectedStep && <StepModal step={selectedStep} />}
        {showCompletionModal && <CompletionModal />}
        {showNextLessonPrompt && <NextLessonPrompt />}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Puzzle Component with blinking transitions
const PuzzleComponent: React.FC<{ stepId: string; language: string; onComplete: () => void }> = ({ stepId, language, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  
  const questions = puzzleQuestions[language]?.[stepId] || puzzleQuestions.en?.[stepId] || [];
  const question = questions[currentQuestion];
  
  if (!question) {
    return (
      <div className="text-center p-6">
        <Puzzle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <p className="text-white">Puzzle content coming soon!</p>
        <Button onClick={onComplete} className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600">
          Complete Puzzle
        </Button>
      </div>
    );
  }
  
  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        // Trigger blinking effect for next round
        setIsBlinking(true);
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
          setIsBlinking(false);
        }, 1000);
      } else {
        onComplete();
      }
    }, 2000);
  };
  
  return (
    <motion.div 
      className="space-y-6"
      animate={isBlinking ? {
        opacity: [1, 0.3, 1, 0.3, 1],
        scale: [1, 0.95, 1, 0.95, 1]
      } : {}}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        <h4 className="text-lg font-semibold text-white mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </h4>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-4" />
        {isBlinking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-blue-300 font-semibold"
          >
            🔄 Moving to next question...
          </motion.div>
        )}
      </div>
      
      {question.imageUrl && (
        <div className="aspect-video rounded-xl overflow-hidden">
          <img src={question.imageUrl} alt="Question" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h5 className="text-white font-semibold mb-4">{question.question}</h5>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
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
            >
              {option}
            </button>
          ))}
        </div>
        
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-blue-500/20 rounded-xl"
          >
            <p className="text-blue-200">{question.explanation}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Game Component (unchanged)
const GameComponent: React.FC<{ stepId: string; language: string; onComplete: () => void }> = ({ stepId, language, onComplete }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLight, setCurrentLight] = useState<'red' | 'yellow' | 'green'>('red');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  
  const scenario = gameScenarios[language]?.[stepId] || gameScenarios.en?.[stepId];
  
  useEffect(() => {
    if (gameStarted && !gameComplete) {
      const interval = setInterval(() => {
        const lights: ('red' | 'yellow' | 'green')[] = ['red', 'yellow', 'green'];
        setCurrentLight(lights[Math.floor(Math.random() * lights.length)]);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameComplete]);
  
  const handleAction = (action: 'stop' | 'prepare' | 'go') => {
    const correctActions = {
      red: 'stop',
      yellow: 'prepare',
      green: 'go'
    };
    
    if (correctActions[currentLight] === action) {
      setScore(score + 1);
    }
    
    if (round >= 10) {
      setGameComplete(true);
      setTimeout(() => onComplete(), 2000);
    } else {
      setRound(round + 1);
    }
  };
  
  if (!scenario) {
    return (
      <div className="text-center p-6">
        <Gamepad2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <p className="text-white">Game content coming soon!</p>
        <Button onClick={onComplete} className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600">
          Complete Game
        </Button>
      </div>
    );
  }
  
  if (!gameStarted) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-white mb-2">{scenario.title}</h4>
          <p className="text-slate-300">{scenario.description}</p>
        </div>
        
        <div className="aspect-video rounded-xl overflow-hidden">
          <img src={scenario.imageUrl} alt={scenario.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h5 className="text-white font-semibold mb-4">Instructions:</h5>
          <ul className="space-y-2 text-slate-300">
            {scenario.instructions.map((instruction, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </span>
                {instruction}
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          onClick={() => setGameStarted(true)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-4"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Game
        </Button>
      </div>
    );
  }
  
  if (gameComplete) {
    return (
      <div className="text-center space-y-6">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
        <h4 className="text-2xl font-bold text-white">Game Complete!</h4>
        <p className="text-slate-300">Score: {score}/10</p>
        <div className="text-green-300">
          {score >= 8 ? 'Excellent!' : score >= 6 ? 'Good job!' : 'Keep practicing!'}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-white mb-2">Round {round}/10</h4>
        <p className="text-slate-300">Score: {score}</p>
      </div>
      
      <div className="text-center">
        <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold ${
          currentLight === 'red' ? 'bg-red-500' : 
          currentLight === 'yellow' ? 'bg-yellow-500' : 
          'bg-green-500'
        }`}>
          {currentLight.toUpperCase()}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <Button 
          onClick={() => handleAction('stop')}
          className="bg-red-500 hover:bg-red-600 py-4"
        >
          STOP
        </Button>
        <Button 
          onClick={() => handleAction('prepare')}
          className="bg-yellow-500 hover:bg-yellow-600 py-4"
        >
          PREPARE
        </Button>
        <Button 
          onClick={() => handleAction('go')}
          className="bg-green-500 hover:bg-green-600 py-4"
        >
          GO
        </Button>
      </div>
    </div>
  );
};

export default LearningFlow;
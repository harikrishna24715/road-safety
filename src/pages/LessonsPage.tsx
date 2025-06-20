import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  Shield,
  Sparkles,
  Trophy,
  Target,
  Award
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { getTranslation, type Country, type Language } from '../../lib/data';
import LearningFlow from '../components/LearningFlow';

const LessonsPage: React.FC = () => {
  const navigate = useNavigate();
  const [userCountry, setUserCountry] = useState<Country | null>(null);
  const [userLanguage, setUserLanguage] = useState<Language | null>(null);
  const [username, setUsername] = useState<string>('');
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(true);

  useEffect(() => {
    const country = localStorage.getItem('selectedCountry');
    const language = localStorage.getItem('selectedLanguage');
    const name = localStorage.getItem('username');
    const learningProgress = localStorage.getItem('learningProgress');
    
    if (country && language && name) {
      setUserCountry(JSON.parse(country));
      setUserLanguage(JSON.parse(language));
      setUsername(name);
      
      // Check if user has any progress
      if (learningProgress && Object.keys(JSON.parse(learningProgress)).length > 0) {
        setShowWelcomePrompt(false);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const currentLang = userLanguage?.code || 'en';

  const handleStepComplete = (stepId: string, type: 'lesson' | 'puzzle' | 'game') => {
    // Update user progress
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    userProgress.totalPoints = (userProgress.totalPoints || 0) + 100;
    
    if (type === 'lesson') {
      userProgress.lessonsCompleted = (userProgress.lessonsCompleted || 0) + 1;
    }
    
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    localStorage.setItem('totalPoints', String(userProgress.totalPoints));
    
    // Dismiss welcome prompt after first completion
    setShowWelcomePrompt(false);
  };

  const getWelcomeMessage = () => {
    switch (currentLang) {
      case 'hi':
        return {
          title: 'अपनी सीखने की यात्रा शुरू करने के लिए तैयार हैं? 🎯',
          description: 'नीचे दिए गए पहले पाठ पर क्लिक करें। प्रत्येक मॉड्यूल में पाठ, पहेली और गेम शामिल हैं। सभी तीनों को पूरा करने के बाद ही अगला मॉड्यूल अनलॉक होगा!'
        };
      case 'te':
        return {
          title: 'మీ అభ్యాస ప్రయాణాన్ని ప్రారంభించడానికి సిద్ధంగా ఉన్నారా? 🎯',
          description: 'క్రింద ఉన్న మొదటి పాఠంపై క్లిక్ చేయండి. ప్రతి మాడ్యూల్‌లో పాఠం, పజిల్ మరియు గేమ్ ఉంటాయి. మూడింటినీ పూర్తి చేసిన తర్వాత మాత్రమే తదుపరి మాడ్యూల్ అన్‌లాక్ అవుతుంది!'
        };
      case 'es':
        return {
          title: '¿Listo para comenzar tu viaje de aprendizaje? 🎯',
          description: 'Haz clic en la primera lección a continuación. Cada módulo incluye lección, rompecabezas y juego. ¡Solo después de completar los tres se desbloqueará el siguiente módulo!'
        };
      default:
        return {
          title: 'Ready to Start Your Learning Journey? 🎯',
          description: 'Click on the first lesson below. Each module includes lesson, puzzle, and game. Only after completing all three will the next module unlock!'
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
      <div className="max-w-6xl mx-auto">
        {/* Welcome Prompt */}
        {showWelcomePrompt && (
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
                  <h3 className="text-xl font-semibold text-white mb-1">{welcomeMessage.title}</h3>
                  <p className="text-blue-200">
                    {welcomeMessage.description}
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
                  {getTranslation(currentLang, 'ui', 'interactiveLessons', 'Interactive Learning')} {userCountry.flag}
                </h1>
                <p className="text-slate-300">
                  Complete lessons, puzzles, and games in {userLanguage.nativeName}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Learning Flow Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              How Learning Works
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
              >
                <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="font-semibold text-white text-lg mb-2">1. Learn</div>
                <div className="text-sm text-slate-300">
                  Start with interactive lessons with images and audio
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
              >
                <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <div className="font-semibold text-white text-lg mb-2">2. Practice</div>
                <div className="text-sm text-slate-300">
                  Solve puzzles to test your understanding
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
              >
                <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="font-semibold text-white text-lg mb-2">3. Apply</div>
                <div className="text-sm text-slate-300">
                  Play interactive games to apply knowledge
                </div>
              </motion.div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl">
              <div className="flex items-center gap-2 text-yellow-300 font-semibold mb-2">
                <Award className="w-5 h-5" />
                Important: Complete All Three Steps
              </div>
              <p className="text-yellow-200 text-sm">
                You must complete the lesson, puzzle, AND game in each module before the next module unlocks. 
                This ensures thorough understanding of each topic.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Learning Flow Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LearningFlow 
            language={currentLang} 
            onComplete={handleStepComplete}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LessonsPage;
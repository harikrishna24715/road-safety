import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Globe, ChevronDown, User, MapPin, Languages } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { countries, getTranslation, type Country, type Language } from '../../lib/data';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showCountries, setShowCountries] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [error, setError] = useState('');
  const [shakeButton, setShakeButton] = useState(false);
  const [dodgeButton, setDodgeButton] = useState(false);

  // Default to English for initial UI
  const currentLang = selectedLanguage?.code || 'en';

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    // Auto-select English if available, otherwise first language
    const defaultLang = country.languages.find(lang => lang.code === 'en') || country.languages[0];
    setSelectedLanguage(defaultLang);
    setShowCountries(false);
    setShowLanguages(false);
    setError('');
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setShowLanguages(false);
    setError('');
  };

  const resetUserProgress = () => {
    // Clear all existing progress and data
    localStorage.removeItem('userId');
    localStorage.removeItem('userProgress');
    localStorage.removeItem('completedLessons');
    localStorage.removeItem('quizScores');
    localStorage.removeItem('achievements');
    localStorage.removeItem('streakData');
    localStorage.removeItem('totalPoints');
    localStorage.removeItem('currentLevel');
    localStorage.removeItem('lastLoginDate');
    
    // Clear any cached lesson data
    localStorage.removeItem('lessonProgress');
    localStorage.removeItem('currentLessonIndex');
    localStorage.removeItem('unlockedLessons');
    
    // Clear quiz data
    localStorage.removeItem('quizProgress');
    localStorage.removeItem('bestScores');
    
    // Clear game data
    localStorage.removeItem('gameProgress');
    localStorage.removeItem('simulationScores');
  };

  const initializeNewUser = () => {
    // Set fresh user data with zero progress
    const newUserData = {
      isNewUser: true,
      startDate: new Date().toISOString(),
      currentLevel: 0,
      totalPoints: 0,
      streakDays: 0,
      lessonsCompleted: 0,
      quizScore: 0,
      achievements: [],
      completedLessons: [],
      unlockedLessons: ['1'], // Only first lesson unlocked
      lastLoginDate: new Date().toISOString()
    };
    
    // Store initial progress
    localStorage.setItem('userProgress', JSON.stringify(newUserData));
    localStorage.setItem('currentLevel', '0');
    localStorage.setItem('totalPoints', '0');
    localStorage.setItem('streakDays', '0');
    localStorage.setItem('completedLessons', JSON.stringify([]));
    localStorage.setItem('unlockedLessons', JSON.stringify(['1']));
  };

  const handleLogin = () => {
    if (!username.trim() || !selectedCountry || !selectedLanguage) {
      setError('⚠️ Please fill all fields before proceeding');
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 600);
      return;
    }

    setError('');
    
    // Reset all progress for fresh start
    resetUserProgress();
    
    // Store new user selections
    localStorage.setItem('username', username.trim());
    localStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
    localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
    
    // Initialize fresh user data
    initializeNewUser();
    
    // Navigate to dashboard with fresh start
    navigate('/dashboard');
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  const handleButtonHover = () => {
    if (!username.trim() || !selectedCountry || !selectedLanguage) {
      setDodgeButton(true);
      setTimeout(() => setDodgeButton(false), 300);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Road Safety 2.0
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-300 text-lg"
          >
            Start your road safety journey from zero
          </motion.p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-white text-2xl">
                <Globe className="w-6 h-6 text-blue-400" />
                Begin Your Journey
              </CardTitle>
              <CardDescription className="text-slate-300 text-base">
                🌟 Start fresh with personalized road safety learning
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center backdrop-blur-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Username Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your name to start fresh"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
              </div>

              {/* Country Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {getTranslation(currentLang, 'ui', 'chooseCountry', 'Choose your Country')}
                </label>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCountries(!showCountries)}
                    className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <span className="flex items-center gap-3">
                      {selectedCountry ? (
                        <>
                          <span className="text-2xl">{selectedCountry.flag}</span>
                          <span>{selectedCountry.name}</span>
                        </>
                      ) : (
                        <span className="text-slate-400">
                          {getTranslation(currentLang, 'ui', 'selectCountry', 'Select your country')}
                        </span>
                      )}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showCountries ? 'rotate-180' : ''}`} />
                  </motion.button>
                  
                  {showCountries && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto"
                    >
                      {countries.map((country) => (
                        <motion.button
                          key={country.code}
                          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          onClick={() => handleCountrySelect(country)}
                          className="w-full flex items-center gap-3 p-4 text-slate-800 hover:text-blue-600 transition-colors text-left border-b border-slate-200/50 last:border-b-0"
                        >
                          <span className="text-2xl">{country.flag}</span>
                          <span className="font-medium">{country.name}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Language Selection */}
              {selectedCountry && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-slate-200 flex items-center gap-2">
                    <Languages className="w-4 h-4" />
                    {getTranslation(currentLang, 'ui', 'preferredLanguage', 'Preferred Language')}
                  </label>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowLanguages(!showLanguages)}
                      className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <span className="flex items-center gap-3">
                        {selectedLanguage ? (
                          <>
                            <span className="font-medium">{selectedLanguage.nativeName}</span>
                            <span className="text-sm text-slate-400">({selectedLanguage.name})</span>
                          </>
                        ) : (
                          <span className="text-slate-400">
                            {getTranslation(currentLang, 'ui', 'selectLanguage', 'Select your language')}
                          </span>
                        )}
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showLanguages ? 'rotate-180' : ''}`} />
                    </motion.button>
                    
                    {showLanguages && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl"
                      >
                        {selectedCountry.languages.map((language) => (
                          <motion.button
                            key={language.code}
                            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                            onClick={() => handleLanguageSelect(language)}
                            className="w-full flex items-center justify-between p-4 text-slate-800 hover:text-blue-600 transition-colors text-left border-b border-slate-200/50 last:border-b-0"
                          >
                            <span className="font-medium">{language.nativeName}</span>
                            <span className="text-sm text-slate-500">{language.name}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Login Button */}
              <motion.div
                animate={shakeButton ? {
                  x: [-10, 10, -10, 10, 0],
                  transition: { duration: 0.6 }
                } : dodgeButton ? {
                  x: [0, 20, -20, 0],
                  transition: { duration: 0.3 }
                } : {}}
              >
                <Button
                  onClick={handleLogin}
                  onMouseEnter={handleButtonHover}
                  disabled={!username.trim() || !selectedCountry || !selectedLanguage}
                  className="w-full p-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 rounded-xl"
                  size="lg"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    🚀 {getTranslation(currentLang, 'ui', 'startLearning', 'Start Fresh Journey')}
                  </motion.span>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-slate-400 text-sm">
            🌟 Every journey begins with a single step 🌟
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
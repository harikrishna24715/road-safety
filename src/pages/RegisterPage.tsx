import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Globe, 
  ChevronDown, 
  User, 
  MapPin, 
  Languages, 
  Mail,
  UserPlus,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { countries, type Country, type Language } from '../../lib/data';
import { userManager } from '../../lib/userManager';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showCountries, setShowCountries] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
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

  const checkUsername = (username: string) => {
    if (username.length >= 3) {
      const exists = userManager.usernameExists(username);
      setUsernameAvailable(!exists);
      setUsernameChecked(true);
      
      if (exists) {
        setError('Username already taken. Please choose a different one.');
      } else {
        setError('');
      }
    } else {
      setUsernameChecked(false);
      setUsernameAvailable(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setFormData(prev => ({ ...prev, username }));
    
    // Debounce username check
    setTimeout(() => checkUsername(username), 500);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      return false;
    }
    
    if (!usernameAvailable) {
      setError('Please choose an available username');
      return false;
    }
    
    if (!selectedCountry) {
      setError('Please select your country');
      return false;
    }
    
    if (!selectedLanguage) {
      setError('Please select your language');
      return false;
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = userManager.registerUser({
        username: formData.username.trim(),
        email: formData.email.trim() || undefined,
        country: selectedCountry!.name,
        language: selectedLanguage!.code
      });
      
      if (result.success) {
        setSuccess(result.message);
        
        // Auto-login the new user
        const loginResult = userManager.loginUser(formData.username.trim());
        
        if (loginResult.success) {
          // Store selections for compatibility
          localStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
          localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
          localStorage.setItem('username', formData.username.trim());
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-white mb-3">Registration Successful! 🎉</h2>
              <p className="text-slate-300 mb-6">{success}</p>
              <p className="text-green-300 text-sm">Redirecting to your dashboard...</p>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mt-4"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl"
          >
            <UserPlus className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
          >
            Create Account
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-300 text-lg"
          >
            Join Road Safety 2.0 and start your learning journey
          </motion.p>
        </div>

        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-white text-2xl">
                <Globe className="w-6 h-6 text-green-400" />
                Register Your Account
              </CardTitle>
              <CardDescription className="text-slate-300 text-base">
                🌟 Create your personalized learning profile
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center backdrop-blur-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </motion.div>
              )}

              {/* Username Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username (This will be your unique ID)
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={formData.username}
                    onChange={handleUsernameChange}
                    placeholder="Choose a unique username"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 pr-12"
                  />
                  {usernameChecked && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {usernameAvailable ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  )}
                </div>
                {usernameChecked && usernameAvailable && (
                  <p className="text-green-300 text-sm flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Username is available!
                  </p>
                )}
              </div>

              {/* Email Input (Optional) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email (Optional)
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder="your.email@example.com"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                />
              </div>

              {/* Country Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Your Country
                </label>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCountries(!showCountries)}
                    className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  >
                    <span className="flex items-center gap-3">
                      {selectedCountry ? (
                        <>
                          <span className="text-2xl">{selectedCountry.flag}</span>
                          <span>{selectedCountry.name}</span>
                        </>
                      ) : (
                        <span className="text-slate-400">Select your country</span>
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
                          whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                          onClick={() => handleCountrySelect(country)}
                          className="w-full flex items-center gap-3 p-4 text-slate-800 hover:text-green-600 transition-colors text-left border-b border-slate-200/50 last:border-b-0"
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
                    Preferred Language
                  </label>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowLanguages(!showLanguages)}
                      className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    >
                      <span className="flex items-center gap-3">
                        {selectedLanguage ? (
                          <>
                            <span className="font-medium">{selectedLanguage.nativeName}</span>
                            <span className="text-sm text-slate-400">({selectedLanguage.name})</span>
                          </>
                        ) : (
                          <span className="text-slate-400">Select your language</span>
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
                            whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                            onClick={() => handleLanguageSelect(language)}
                            className="w-full flex items-center justify-between p-4 text-slate-800 hover:text-green-600 transition-colors text-left border-b border-slate-200/50 last:border-b-0"
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

              {/* Register Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleRegister}
                  disabled={isLoading || !usernameAvailable || !selectedCountry || !selectedLanguage}
                  className="w-full p-4 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 rounded-xl"
                  size="lg"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <UserPlus className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </motion.div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-green-400 hover:text-green-300 font-medium transition-colors"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
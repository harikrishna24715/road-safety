import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, AlertCircle, CheckCircle, UserPlus, Loader } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { userManager } from '../../lib/userManager';
import { replicateImageGenerator } from '../../lib/replicateImageGenerator';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloadingImages, setIsPreloadingImages] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);

  useEffect(() => {
    // Migrate old user data if exists
    userManager.migrateOldUserData();
    
    // Check if user is already logged in
    const currentUser = userManager.getCurrentUser();
    if (currentUser) {
      navigate('/dashboard');
      return;
    }

    // Pre-load images on app start
    preloadImages();
  }, [navigate]);

  const preloadImages = async () => {
    try {
      setIsPreloadingImages(true);
      setPreloadProgress(0);
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setPreloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      await replicateImageGenerator.preloadAllImages();
      
      clearInterval(progressInterval);
      setPreloadProgress(100);
      
      setTimeout(() => {
        setIsPreloadingImages(false);
      }, 500);
      
    } catch (error) {
      console.error('Error preloading images:', error);
      setIsPreloadingImages(false);
    }
  };

  const handleLogin = async () => {
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = userManager.loginUser(username.trim());
      
      if (result.success && result.user) {
        // Store compatibility data
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('selectedCountry', JSON.stringify({
          name: result.user.country,
          flag: '🌍' // Default flag
        }));
        localStorage.setItem('selectedLanguage', JSON.stringify({
          code: result.user.language,
          name: result.user.language,
          nativeName: result.user.language
        }));
        
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Show loading screen
  if (isPreloadingImages) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-64 mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Loading Images</span>
              <span className="text-sm text-slate-400">{preloadProgress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${preloadProgress}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm">Optimizing for better performance...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/ChatGPT Image Jun 21, 2025, 04_01_07 PM copy copy.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <motion.img 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            src="/ChatGPT Image Jun 21, 2025, 03_33_49 PM copy.png" 
            alt="Learn2Go Logo" 
            className="w-64 h-auto"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="flex items-center justify-center gap-3 text-white text-2xl">
                <User className="w-6 h-6 text-blue-400" />
                Login to Your Account
              </CardTitle>
              <CardDescription className="text-slate-300 text-base">
                🔐 Enter your username to continue learning
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
                  Username
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your username"
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
              </div>

              {/* Login Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleLogin}
                  disabled={isLoading || !username.trim()}
                  className="w-full p-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 rounded-xl"
                  size="lg"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </motion.div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Create one here
                  </Link>
                </p>
              </div>

              {/* Quick Register Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => navigate('/register')}
                  variant="outline"
                  className="w-full p-4 text-lg font-semibold bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-xl"
                  size="lg"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create New Account
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
            🌟 Your progress is saved and will continue where you left off 🌟
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
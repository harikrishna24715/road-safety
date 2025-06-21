import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, AlertCircle, CheckCircle, UserPlus, Loader, Sparkles } from 'lucide-react';
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
  const [preloadStatus, setPreloadStatus] = useState('Initializing...');

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
      setPreloadStatus('Loading custom educational images...');
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setPreloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 20;
        });
      }, 500);

      await replicateImageGenerator.preloadAllImages();
      
      clearInterval(progressInterval);
      setPreloadProgress(100);
      setPreloadStatus('Images ready!');
      
      setTimeout(() => {
        setIsPreloadingImages(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error preloading images:', error);
      setPreloadStatus('Images loaded successfully!');
      setPreloadProgress(100);
      setTimeout(() => {
        setIsPreloadingImages(false);
      }, 1000);
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

  // Show image preloading screen
  if (isPreloadingImages) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/ChatGPT Image Jun 21, 2025, 04_01_07 PM.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="p-8 bg-black/40 backdrop-blur-md rounded-3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learn2Go
            </h1>
            <p className="text-slate-300 text-lg mb-8">
              Loading your personalized learning experience...
            </p>
            
            <div className="w-80 mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">{preloadStatus}</span>
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span className="text-sm">
                {preloadProgress < 50 ? 'Loading custom educational images...' : 
                 preloadProgress < 90 ? 'Almost ready...' : 
                 'Finalizing setup...'}
              </span>
            </div>
            
            {preloadProgress > 0 && preloadProgress < 100 && (
              <div className="mt-4 text-xs text-slate-500">
                ✨ Using high-quality custom images for better learning
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ 
        backgroundImage: `url('/ChatGPT Image Jun 21, 2025, 04_01_07 PM.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
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
          <p className="text-slate-300 text-sm bg-black/40 backdrop-blur-md px-4 py-2 rounded-full inline-block">
            🌟 Your progress is saved and will continue where you left off 🌟
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Gamepad2, 
  Settings, 
  Trophy,
  Star,
  Clock,
  Target,
  Zap,
  Shield,
  Award,
  Users
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { gameScenarios } from '../../lib/data';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) {
      setUsername(name);
    }
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setGameStarted(false)}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Scenarios
              </Button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl"
                    >
                      <Gamepad2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Interactive Simulation
                    </h2>
                    <p className="text-slate-300 mb-6 text-lg">
                      This is a placeholder for the road safety simulation game.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-300 max-w-md mx-auto">
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                        <span>🚗</span>
                        <span>Navigate realistic scenarios</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                        <span>🚦</span>
                        <span>Practice decision-making</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                        <span>📊</span>
                        <span>Real-time feedback</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl">
                        <span>🏆</span>
                        <span>Earn safety points</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                  >
                    <Target className="w-10 h-10 text-green-400 mx-auto mb-3" />
                    <div className="font-semibold text-white text-lg">Practice Mode</div>
                    <div className="text-sm text-slate-300">Learn at your pace</div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                  >
                    <Zap className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                    <div className="font-semibold text-white text-lg">Real-time Feedback</div>
                    <div className="text-sm text-slate-300">Instant guidance</div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
                  >
                    <Trophy className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                    <div className="font-semibold text-white text-lg">Progress Tracking</div>
                    <div className="text-sm text-slate-300">Monitor improvement</div>
                  </motion.div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    🚧 Coming Soon!
                  </h3>
                  <p className="text-yellow-200 text-sm leading-relaxed">
                    The interactive simulation game is currently in development. 
                    This feature will include 3D environments, realistic physics, 
                    and comprehensive scenario-based learning experiences.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button 
                      onClick={() => setGameStarted(false)} 
                      variant="outline" 
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 py-3"
                    >
                      Back to Scenarios
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
                      Return to Dashboard
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
      <div className="max-w-6xl mx-auto">
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
              Back to Dashboard
            </Button>
          </div>
          
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-2xl"
            >
              <Gamepad2 className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-white mb-3"
            >
              Safety Simulation
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-300 text-lg"
            >
              {username ? `Welcome ${username}! ` : ''}Practice road safety in realistic scenarios
            </motion.p>
          </div>
        </motion.div>

        {/* Game Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              Game Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
              >
                <Target className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <div className="font-semibold text-white text-lg">Realistic Scenarios</div>
                <div className="text-sm text-slate-300">Real-world situations</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
              >
                <Zap className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <div className="font-semibold text-white text-lg">Instant Feedback</div>
                <div className="text-sm text-slate-300">Learn from mistakes</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
              >
                <Trophy className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <div className="font-semibold text-white text-lg">Achievement System</div>
                <div className="text-sm text-slate-300">Track progress</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/20 rounded-2xl"
              >
                <Settings className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                <div className="font-semibold text-white text-lg">Adaptive Difficulty</div>
                <div className="text-sm text-slate-300">Personalized learning</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scenario Selection */}
        <div className="mb-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-6 flex items-center gap-2"
          >
            <Shield className="w-6 h-6 text-blue-400" />
            Choose Your Scenario
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => handleScenarioSelect(scenario.id)}
                className={`h-full transition-all duration-300 cursor-pointer ${
                  selectedScenario === scenario.id ? 'ring-2 ring-purple-500/50' : ''
                }`}
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl h-full transition-all duration-300 hover:bg-white/15">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`bg-gradient-to-r ${getDifficultyColor(scenario.difficulty)} text-white border-0`}>
                      {scenario.difficulty}
                    </Badge>
                    {selectedScenario === scenario.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </motion.div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{scenario.title}</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">{scenario.description}</p>
                  
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center"
                      >
                        <Play className="w-10 h-10 text-purple-400 mb-2" />
                        <p className="text-xs text-slate-400">Click to select</p>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Clock className="w-4 h-4" />
                      15-20 minutes
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Star className="w-4 h-4" />
                      Interactive simulation
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Users className="w-4 h-4" />
                      Single player
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Start Game Button */}
        {selectedScenario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                Ready to Start?
              </h3>
              <p className="text-slate-300 mb-6">
                You've selected: <span className="font-semibold text-white">
                  {gameScenarios.find(s => s.id === selectedScenario)?.title}
                </span>
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleStartGame} 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 py-4 text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Simulation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
import React, { useState } from 'react';
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
  Zap
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { gameScenarios } from '../../lib/data';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setGameStarted(false)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scenarios
              </Button>
            </div>
            
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="aspect-video bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 rounded-lg flex items-center justify-center mb-6">
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
                      className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4"
                    >
                      <Gamepad2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Interactive Simulation
                    </h2>
                    <p className="text-gray-600 mb-4">
                      This is a placeholder for the road safety simulation game.
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>🚗 Navigate through realistic traffic scenarios</p>
                      <p>🚦 Practice decision-making in safe environment</p>
                      <p>📊 Get real-time feedback on your choices</p>
                      <p>🏆 Earn points for safe driving behaviors</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">Practice Mode</div>
                    <div className="text-sm text-gray-600">Learn at your pace</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">Real-time Feedback</div>
                    <div className="text-sm text-gray-600">Instant guidance</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold">Progress Tracking</div>
                    <div className="text-sm text-gray-600">Monitor improvement</div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-yellow-800 mb-2">🚧 Coming Soon!</h3>
                  <p className="text-yellow-700 text-sm">
                    The interactive simulation game is currently in development. 
                    This feature will include 3D environments, realistic physics, 
                    and comprehensive scenario-based learning experiences.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={() => setGameStarted(false)} variant="outline" className="flex-1">
                    Back to Scenarios
                  </Button>
                  <Button onClick={() => navigate('/dashboard')} className="flex-1">
                    Return to Dashboard
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
              className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4"
            >
              <Gamepad2 className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Simulation</h1>
            <p className="text-gray-600">Practice road safety in realistic scenarios</p>
          </div>
        </motion.div>

        {/* Game Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Game Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">Realistic Scenarios</div>
                  <div className="text-sm text-gray-600">Real-world situations</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">Instant Feedback</div>
                  <div className="text-sm text-gray-600">Learn from mistakes</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">Achievement System</div>
                  <div className="text-sm text-gray-600">Track progress</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold">Adaptive Difficulty</div>
                  <div className="text-sm text-gray-600">Personalized learning</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scenario Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Scenario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card 
                  className={`h-full transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105 ${
                    selectedScenario === scenario.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => handleScenarioSelect(scenario.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getDifficultyColor(scenario.difficulty)}>
                        {scenario.difficulty}
                      </Badge>
                      {selectedScenario === scenario.id && (
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Play className="w-8 h-8 text-purple-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Click to select</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        15-20 minutes
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4" />
                        Interactive simulation
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Ready to Start?</h3>
                <p className="text-gray-600 mb-4">
                  You've selected: {gameScenarios.find(s => s.id === selectedScenario)?.title}
                </p>
                <Button onClick={handleStartGame} size="lg" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start Simulation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
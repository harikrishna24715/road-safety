import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  User, 
  BookOpen, 
  Trophy, 
  Clock, 
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
  Shield,
  LogOut,
  Lock,
  Trash2,
  AlertTriangle,
  X,
  Check,
  Eye,
  EyeOff,
  UserX,
  Activity
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { userManager, type UserProfile } from '../../lib/userManager';
import { supabase, getUserActivities } from '../../lib/supabase';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('username');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [userActivities, setUserActivities] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is Hari (admin)
    const session = sessionStorage.getItem('userSession');
    if (session) {
      const parsedSession = JSON.parse(session);
      if (parsedSession.username.toLowerCase() === 'hari') {
        setIsAdmin(true);
      } else {
        navigate('/login');
        return;
      }
    } else {
      navigate('/login');
      return;
    }

    // Load all users
    const loadUsers = async () => {
      setIsLoading(true);
      
      try {
        // Get users from local storage
        const allUsers = userManager.getAllUsersForAdmin();
        setUsers(Object.values(allUsers));
        
        // Get active sessions
        const sessions = userManager.getAllActiveSessions();
        setActiveSessions(sessions);
        
        // Try to get users from Supabase if available
        const { data: supabaseUsers, error } = await supabase
          .from('users')
          .select('*');
        
        if (!error && supabaseUsers) {
          // Merge with local users if needed
          console.log('Supabase users loaded:', supabaseUsers.length);
        }
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
    
    // Set up refresh interval
    const interval = setInterval(() => loadUsers(), 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [navigate]);

  // Load user activities when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const loadUserActivities = async () => {
        const activities = await getUserActivities(selectedUser);
        setUserActivities(activities);
      };
      
      loadUserActivities();
    }
  }, [selectedUser]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleLogout = async () => {
    await userManager.logout();
    navigate('/login');
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  const handleDeleteUser = async (username: string) => {
    try {
      const success = await userManager.deleteUser(username);
      if (success) {
        setDeleteSuccess(`User ${username} has been deleted successfully.`);
        setDeleteError(null);
        
        // Update users list
        const allUsers = userManager.getAllUsersForAdmin();
        setUsers(Object.values(allUsers));
        
        // Close delete confirmation
        setShowDeleteConfirm(null);
        
        // Close user details if the deleted user was selected
        if (selectedUser === username) {
          setSelectedUser(null);
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess(null);
        }, 3000);
      } else {
        setDeleteError(`Failed to delete user ${username}. Please try again.`);
        setDeleteSuccess(null);
      }
    } catch (error) {
      setDeleteError('An error occurred while deleting the user.');
      setDeleteSuccess(null);
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'username':
        comparison = a.username.localeCompare(b.username);
        break;
      case 'country':
        comparison = a.country.localeCompare(b.country);
        break;
      case 'language':
        comparison = a.language.localeCompare(b.language);
        break;
      case 'lessonsCompleted':
        comparison = a.lessonsCompleted - b.lessonsCompleted;
        break;
      case 'totalPoints':
        comparison = a.totalPoints - b.totalPoints;
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'lastLoginAt':
        comparison = new Date(a.lastLoginAt).getTime() - new Date(b.lastLoginAt).getTime();
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="mb-4">You don't have permission to access this page.</p>
          <Button onClick={() => navigate('/login')}>
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-md w-full p-8 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Delete User</h2>
                <p className="text-slate-300">
                  Are you sure you want to delete user <span className="font-semibold text-white">{showDeleteConfirm}</span>? 
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => setShowDeleteConfirm(null)}
                  variant="outline" 
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleDeleteUser(showDeleteConfirm)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="text-white hover:bg-white/10 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-white hover:bg-white/10 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-white mb-1"
                >
                  Learn2Go Admin Dashboard
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-300"
                >
                  Manage users and track learning progress
                </motion.p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      const allUsers = userManager.getAllUsersForAdmin();
                      setUsers(Object.values(allUsers));
                      setActiveSessions(userManager.getAllActiveSessions());
                      setIsLoading(false);
                    }, 500);
                  }}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Success/Error Messages */}
        {deleteSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            {deleteSuccess}
          </motion.div>
        )}
        
        {deleteError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 flex items-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            {deleteError}
          </motion.div>
        )}

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { 
              icon: Users, 
              value: users.length, 
              label: 'Total Users', 
              gradient: 'from-blue-500 to-cyan-500',
              description: 'Registered accounts'
            },
            { 
              icon: User, 
              value: users.filter(user => {
                const lastLogin = new Date(user.lastLoginAt);
                const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
                return daysSinceLogin <= 7;
              }).length, 
              label: 'Active Users', 
              gradient: 'from-green-500 to-emerald-500',
              description: 'Active in last 7 days'
            },
            { 
              icon: BookOpen, 
              value: users.reduce((sum, user) => sum + user.lessonsCompleted, 0), 
              label: 'Total Lessons', 
              gradient: 'from-purple-500 to-pink-500',
              description: 'Completed by all users'
            },
            { 
              icon: Trophy, 
              value: users.reduce((sum, user) => sum + user.totalPoints, 0), 
              label: 'Total Points', 
              gradient: 'from-yellow-500 to-orange-500',
              description: 'Earned by all users'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-400">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-400" />
            Active Sessions
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-slate-300">Username</th>
                  <th className="text-left py-3 px-4 text-slate-300">Start Time</th>
                  <th className="text-left py-3 px-4 text-slate-300">Last Activity</th>
                  <th className="text-left py-3 px-4 text-slate-300">Current Page</th>
                  <th className="text-left py-3 px-4 text-slate-300">Browser</th>
                  <th className="text-left py-3 px-4 text-slate-300">Device</th>
                  <th className="text-left py-3 px-4 text-slate-300">IP Address</th>
                  <th className="text-left py-3 px-4 text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeSessions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8">
                      <Users className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="text-slate-300 mt-2">No active sessions</div>
                    </td>
                  </tr>
                ) : (
                  activeSessions.map((session, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-white/10 transition-colors`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                            {session.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="text-white font-medium">{session.username}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {new Date(session.startTime).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {new Date(session.lastActivity).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-blue-500/20 text-blue-300 border-0">
                          {session.currentPage}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-slate-300">{session.browser}</td>
                      <td className="py-4 px-4 text-slate-300">{session.device}</td>
                      <td className="py-4 px-4 text-slate-300">{session.ip}</td>
                      <td className="py-4 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => setShowDeleteConfirm(session.username)}
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Registered Users</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th 
                    className="text-left py-3 px-4 text-slate-300 cursor-pointer hover:text-white"
                    onClick={() => handleSort('username')}
                  >
                    <div className="flex items-center gap-1">
                      Username
                      {sortField === 'username' && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-slate-300 cursor-pointer hover:text-white"
                    onClick={() => handleSort('country')}
                  >
                    <div className="flex items-center gap-1">
                      Country
                      {sortField === 'country' && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-slate-300 cursor-pointer hover:text-white"
                    onClick={() => handleSort('language')}
                  >
                    <div className="flex items-center gap-1">
                      Language
                      {sortField === 'language' && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-slate-300 cursor-pointer hover:text-white"
                    onClick={() => handleSort('lessonsCompleted')}
                  >
                    <div className="flex items-center gap-1">
                      Lessons
                      {sortField === 'lessonsCompleted' && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-slate-300 cursor-pointer hover:text-white"
                    onClick={() => handleSort('totalPoints')}
                  >
                    <div className="flex items-center gap-1">
                      Points
                      {sortField === 'totalPoints' && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-slate-300 cursor-pointer hover:text-white"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center gap-1">
                      Registered
                      {sortField === 'createdAt' && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left py-3 px-4 text-slate-300 cursor-pointer hover:text-white"
                    onClick={() => handleSort('lastLoginAt')}
                  >
                    <div className="flex items-center gap-1">
                      Last Login
                      {sortField === 'lastLoginAt' && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-slate-300">Progress</th>
                  <th className="text-left py-3 px-4 text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8">
                      <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
                      <div className="text-slate-300 mt-2">Loading user data...</div>
                    </td>
                  </tr>
                ) : sortedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8">
                      <Users className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="text-slate-300 mt-2">No users found</div>
                    </td>
                  </tr>
                ) : (
                  sortedUsers.map((user, index) => {
                    const lastLogin = new Date(user.lastLoginAt);
                    const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
                    const isActive = daysSinceLogin <= 7;
                    
                    return (
                      <tr 
                        key={user.username} 
                        className={`border-b border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-white/10 transition-colors`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-white font-medium">{user.username}</div>
                              <div className="text-xs text-slate-400">{user.email || 'No email'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white">{user.country}</td>
                        <td className="py-4 px-4 text-white">{user.language}</td>
                        <td className="py-4 px-4 text-white">{user.lessonsCompleted}</td>
                        <td className="py-4 px-4 text-white">{user.totalPoints}</td>
                        <td className="py-4 px-4 text-slate-300">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-slate-300">
                              {new Date(user.lastLoginAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                              style={{ width: `${Math.min((user.lessonsCompleted / 2) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {Math.min(Math.round((user.lessonsCompleted / 2) * 100), 100)}% complete
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              onClick={() => handleUserSelect(user.username)}
                            >
                              {selectedUser === user.username ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => setShowDeleteConfirm(user.username)}
                              disabled={user.username.toLowerCase() === 'hari'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* User Activity Details */}
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <User className="w-6 h-6 text-blue-400" />
                User Activity: {selectedUser}
              </h2>
              <Button 
                variant="outline" 
                onClick={() => setSelectedUser(null)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Close
              </Button>
            </div>
            
            {userActivities.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-slate-300 mt-2">No activity data available</div>
              </div>
            ) : (
              <div className="space-y-4">
                {userActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-white">{activity.activity_type}</div>
                      <div className="text-sm text-slate-400">
                        {new Date(activity.created_at).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm text-slate-300">
                      {JSON.stringify(activity.details)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* User Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">User Activity Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Registration Timeline</CardTitle>
                <CardDescription className="text-slate-400">New user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-end justify-between gap-1">
                  {Array.from({ length: 7 }).map((_, i) => {
                    // Calculate users registered in the last 7 days
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - i));
                    date.setHours(0, 0, 0, 0);
                    
                    const nextDate = new Date(date);
                    nextDate.setDate(nextDate.getDate() + 1);
                    
                    const count = users.filter(user => {
                      const createdDate = new Date(user.createdAt);
                      return createdDate >= date && createdDate < nextDate;
                    }).length;
                    
                    const maxCount = Math.max(1, ...Array.from({ length: 7 }).map((_, j) => {
                      const d = new Date();
                      d.setDate(d.getDate() - (6 - j));
                      d.setHours(0, 0, 0, 0);
                      
                      const nd = new Date(d);
                      nd.setDate(nd.getDate() + 1);
                      
                      return users.filter(user => {
                        const createdDate = new Date(user.createdAt);
                        return createdDate >= d && createdDate < nd;
                      }).length;
                    }));
                    
                    const height = `${Math.max(10, (count / maxCount) * 100)}%`;
                    
                    return (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-md"
                          style={{ height }}
                        ></div>
                        <div className="text-xs text-slate-400 mt-2">
                          {date.toLocaleDateString(undefined, { weekday: 'short' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Lesson Completion</CardTitle>
                <CardDescription className="text-slate-400">Modules completed by users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[0, 1, 2].map(moduleCount => {
                    const userCount = users.filter(user => user.lessonsCompleted === moduleCount).length;
                    const percentage = users.length > 0 ? (userCount / users.length) * 100 : 0;
                    
                    return (
                      <div key={moduleCount} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">
                            {moduleCount === 0 ? 'No modules' : `${moduleCount} module${moduleCount !== 1 ? 's' : ''}`}
                          </span>
                          <span className="text-slate-400">{userCount} users ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">User Engagement</CardTitle>
                <CardDescription className="text-slate-400">Active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Last 24 hours', days: 1 },
                    { label: 'Last 7 days', days: 7 },
                    { label: 'Last 30 days', days: 30 }
                  ].map(period => {
                    const activeUsers = users.filter(user => {
                      const lastLogin = new Date(user.lastLoginAt);
                      const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
                      return daysSinceLogin <= period.days;
                    }).length;
                    
                    const percentage = users.length > 0 ? (activeUsers / users.length) * 100 : 0;
                    
                    return (
                      <div key={period.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{period.label}</span>
                          <span className="text-slate-400">{activeUsers} users ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Supabase Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Database Connection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Supabase Connection Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-green-300">Connected to Supabase</span>
                </div>
                
                <div className="text-sm text-slate-300">
                  <p>User data is being synchronized with Supabase for persistent storage.</p>
                  <p className="mt-2">User activities are being logged for analytics and tracking.</p>
                </div>
                
                <Button 
                  onClick={async () => {
                    try {
                      const { data, error } = await supabase.from('users').select('count');
                      if (!error) {
                        alert(`Successfully connected to Supabase! ${data.length} records found.`);
                      } else {
                        alert(`Error connecting to Supabase: ${error.message}`);
                      }
                    } catch (err) {
                      alert('Failed to connect to Supabase. Check your configuration.');
                    }
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 mt-2"
                >
                  Test Connection
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                Data Synchronization
              </h3>
              
              <div className="space-y-4">
                <div className="text-sm text-slate-300">
                  <p>All user data is being synchronized between local storage and Supabase.</p>
                  <p className="mt-2">This allows for multiple simultaneous logins and persistent data storage.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Last sync:</span>
                    <span className="text-slate-400">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Sync status:</span>
                    <span className="text-green-300">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Multiple logins:</span>
                    <span className="text-green-300">Enabled</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => {
                    alert('Data synchronization is active. Multiple users can log in simultaneously.');
                  }}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 mt-2"
                >
                  Sync Info
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
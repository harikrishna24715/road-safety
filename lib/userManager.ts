import { supabase, logUserActivity } from './supabase';

export interface UserProfile {
  username: string;
  email?: string;
  country: string;
  language: string;
  createdAt: string;
  lastLoginAt: string;
  totalPoints: number;
  streakDays: number;
  lessonsCompleted: number;
  quizScore: number;
  learningProgress: Record<string, Record<string, boolean>>;
  achievements: string[];
  currentLevel: number;
}

export class UserManager {
  private readonly USERS_KEY = 'registeredUsers';
  private readonly SESSION_KEY = 'userSession';
  private readonly SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

  // Register a new user
  async registerUser(userData: {
    username: string;
    email?: string;
    country: string;
    language: string;
  }): Promise<{ success: boolean; message: string }> {
    const users = this.getAllUsers();
    
    // Check if username already exists
    if (users[userData.username.toLowerCase()]) {
      return { success: false, message: 'Username already exists. Please choose a different username.' };
    }

    // Create new user profile
    const newUser: UserProfile = {
      username: userData.username,
      email: userData.email,
      country: userData.country,
      language: userData.language,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      totalPoints: 0,
      streakDays: 0,
      lessonsCompleted: 0,
      quizScore: 0,
      learningProgress: {},
      achievements: ['welcome-aboard'],
      currentLevel: 0
    };

    // Save user locally
    users[userData.username.toLowerCase()] = newUser;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // Try to save to Supabase
    try {
      const { error } = await supabase
        .from('users')
        .insert({
          username: userData.username,
          email: userData.email || null,
          country: userData.country,
          language: userData.language,
          created_at: newUser.createdAt,
          last_login_at: newUser.lastLoginAt,
          total_points: 0,
          streak_days: 0,
          lessons_completed: 0,
          quiz_score: 0,
          learning_progress: {},
          achievements: ['welcome-aboard'],
          current_level: 0
        });
      
      if (error) {
        console.log('Error saving user to Supabase:', error.message);
      } else {
        // Log registration activity
        await logUserActivity('registration', {
          username: userData.username,
          country: userData.country,
          language: userData.language,
          timestamp: newUser.createdAt
        });
      }
    } catch (err) {
      console.log('Error saving user to Supabase');
    }

    return { success: true, message: 'Account created successfully!' };
  }

  // Login user and create a session
  async loginUser(username: string): Promise<{ success: boolean; message: string; user?: UserProfile }> {
    const users = this.getAllUsers();
    const user = users[username.toLowerCase()];

    if (!user) {
      // Special case for admin user 'Hari'
      if (username.toLowerCase() === 'hari') {
        // Create admin user if it doesn't exist
        const adminUser: UserProfile = {
          username: 'Hari',
          country: 'India',
          language: 'en',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          totalPoints: 9999,
          streakDays: 999,
          lessonsCompleted: 10,
          quizScore: 100,
          learningProgress: {},
          achievements: ['admin'],
          currentLevel: 10
        };
        
        users['hari'] = adminUser;
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        
        // Create admin session
        this.createSession(adminUser);
        
        return { success: true, message: 'Admin login successful', user: adminUser };
      }
      
      return { success: false, message: 'Username not found. Please register first or check your username.' };
    }

    // Update last login
    user.lastLoginAt = new Date().toISOString();
    users[username.toLowerCase()] = user;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // Create a new session
    this.createSession(user);

    // Try to update in Supabase
    try {
      const { error } = await supabase
        .from('users')
        .update({ last_login_at: user.lastLoginAt })
        .eq('username', username.toLowerCase());
      
      if (error) {
        console.log('Error updating last login in Supabase:', error.message);
      } else {
        // Log login activity
        await logUserActivity('login', {
          username: user.username,
          timestamp: user.lastLoginAt
        });
      }
    } catch (err) {
      console.log('Error updating last login in Supabase');
    }

    return { success: true, message: 'Login successful!', user };
  }

  // Create a new session
  private createSession(user: UserProfile): void {
    const sessionToken = this.generateSessionToken();
    const session = {
      token: sessionToken,
      username: user.username,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + this.SESSION_EXPIRY).toISOString()
    };
    
    // Store session in sessionStorage (not localStorage) for tab isolation
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  // Get current logged-in user
  getCurrentUser(): UserProfile | null {
    const session = this.getSession();
    if (!session) return null;
    
    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      this.logout();
      return null;
    }
    
    const users = this.getAllUsers();
    return users[session.username.toLowerCase()] || null;
  }

  // Update user progress
  async updateUserProgress(updates: Partial<UserProfile>): Promise<void> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    
    // Update in users database
    const users = this.getAllUsers();
    users[currentUser.username.toLowerCase()] = updatedUser;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // Try to update in Supabase
    try {
      const { error } = await supabase
        .from('users')
        .update({
          total_points: updatedUser.totalPoints,
          streak_days: updatedUser.streakDays,
          lessons_completed: updatedUser.lessonsCompleted,
          quiz_score: updatedUser.quizScore,
          learning_progress: updatedUser.learningProgress,
          achievements: updatedUser.achievements,
          current_level: updatedUser.currentLevel
        })
        .eq('username', currentUser.username.toLowerCase());
      
      if (error) {
        console.log('Error updating user progress in Supabase:', error.message);
      } else {
        // Log progress update activity
        await logUserActivity('progress_update', {
          username: currentUser.username,
          updates: Object.keys(updates),
          timestamp: new Date().toISOString()
        });
      }
    } catch (err) {
      console.log('Error updating user progress in Supabase');
    }
  }

  // Update learning progress
  async updateLearningProgress(moduleId: string, stepId: string, completed: boolean): Promise<void> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    if (!currentUser.learningProgress[moduleId]) {
      currentUser.learningProgress[moduleId] = {};
    }
    
    currentUser.learningProgress[moduleId][stepId] = completed;

    // Calculate total completed lessons
    let totalCompleted = 0;
    Object.values(currentUser.learningProgress).forEach(module => {
      totalCompleted += Object.values(module).filter(Boolean).length;
    });

    await this.updateUserProgress({
      learningProgress: currentUser.learningProgress,
      lessonsCompleted: Math.floor(totalCompleted / 3), // Each module has 3 steps
      totalPoints: currentUser.totalPoints + (completed ? 100 : 0)
    });

    // Log learning progress activity
    await logUserActivity('learning_progress', {
      username: currentUser.username,
      moduleId,
      stepId,
      completed,
      timestamp: new Date().toISOString()
    });
  }

  // Check if username exists
  usernameExists(username: string): boolean {
    const users = this.getAllUsers();
    return !!users[username.toLowerCase()];
  }

  // Get all users (for admin purposes)
  getAllUsers(): Record<string, UserProfile> {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : {};
  }
  
  // Get all users for admin dashboard
  getAllUsersForAdmin(): Record<string, UserProfile> {
    return this.getAllUsers();
  }

  // Logout current user
  async logout(): Promise<void> {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      // Log logout activity
      await logUserActivity('logout', {
        username: currentUser.username,
        timestamp: new Date().toISOString()
      });
    }
    
    // Remove session from sessionStorage
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  // Get user statistics
  getUserStats(): {
    totalUsers: number;
    activeUsers: number;
    averageProgress: number;
  } {
    const users = this.getAllUsers();
    const userList = Object.values(users);
    
    const totalUsers = userList.length;
    const activeUsers = userList.filter(user => {
      const lastLogin = new Date(user.lastLoginAt);
      const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceLogin <= 7; // Active in last 7 days
    }).length;
    
    const averageProgress = userList.length > 0 
      ? userList.reduce((sum, user) => sum + user.lessonsCompleted, 0) / userList.length 
      : 0;

    return { totalUsers, activeUsers, averageProgress };
  }

  // Migrate old user data to new system
  migrateOldUserData(): void {
    const oldUsername = localStorage.getItem('username');
    const oldCountry = localStorage.getItem('selectedCountry');
    const oldLanguage = localStorage.getItem('selectedLanguage');
    const oldProgress = localStorage.getItem('userProgress');
    const oldLearningProgress = localStorage.getItem('learningProgress');

    if (oldUsername && oldCountry && oldLanguage && !this.getCurrentUser()) {
      const country = JSON.parse(oldCountry);
      const language = JSON.parse(oldLanguage);
      const progress = oldProgress ? JSON.parse(oldProgress) : {};
      const learningProgress = oldLearningProgress ? JSON.parse(oldLearningProgress) : {};

      // Register the old user
      this.registerUser({
        username: oldUsername,
        country: country.name,
        language: language.code
      });

      // Update with old progress
      this.updateUserProgress({
        totalPoints: progress.totalPoints || 0,
        streakDays: progress.streakDays || 0,
        lessonsCompleted: progress.lessonsCompleted || 0,
        quizScore: progress.quizScore || 0,
        learningProgress: learningProgress
      });

      // Login the migrated user
      this.loginUser(oldUsername);

      console.log('Successfully migrated old user data');
    }
  }

  // Sync with Supabase
  async syncWithSupabase(): Promise<void> {
    try {
      // Get all local users
      const localUsers = this.getAllUsers();
      
      // Get all Supabase users
      const { data: supabaseUsers, error } = await supabase
        .from('users')
        .select('*');
      
      if (error) {
        console.error('Error fetching users from Supabase:', error);
        return;
      }
      
      // Sync Supabase users to local
      if (supabaseUsers) {
        for (const user of supabaseUsers) {
          const localUser = localUsers[user.username.toLowerCase()];
          
          // If user exists locally, merge data (prefer newer data)
          if (localUser) {
            const localLastUpdated = new Date(localUser.lastLoginAt).getTime();
            const supabaseLastUpdated = new Date(user.last_login_at).getTime();
            
            // If Supabase data is newer, update local
            if (supabaseLastUpdated > localLastUpdated) {
              localUsers[user.username.toLowerCase()] = {
                ...localUser,
                lastLoginAt: user.last_login_at,
                totalPoints: user.total_points,
                streakDays: user.streak_days,
                lessonsCompleted: user.lessons_completed,
                quizScore: user.quiz_score,
                learningProgress: user.learning_progress || {},
                achievements: user.achievements || [],
                currentLevel: user.current_level
              };
            }
          } 
          // If user doesn't exist locally, add it
          else {
            localUsers[user.username.toLowerCase()] = {
              username: user.username,
              email: user.email,
              country: user.country,
              language: user.language,
              createdAt: user.created_at,
              lastLoginAt: user.last_login_at,
              totalPoints: user.total_points,
              streakDays: user.streak_days,
              lessonsCompleted: user.lessons_completed,
              quizScore: user.quiz_score,
              learningProgress: user.learning_progress || {},
              achievements: user.achievements || [],
              currentLevel: user.current_level
            };
          }
        }
        
        // Save updated local users
        localStorage.setItem(this.USERS_KEY, JSON.stringify(localUsers));
      }
      
      // Sync local users to Supabase
      for (const username in localUsers) {
        const localUser = localUsers[username];
        const supabaseUser = supabaseUsers?.find(u => u.username.toLowerCase() === username);
        
        // If user doesn't exist in Supabase or local data is newer, update Supabase
        if (!supabaseUser || new Date(localUser.lastLoginAt) > new Date(supabaseUser.last_login_at)) {
          const { error } = await supabase
            .from('users')
            .upsert({
              username: localUser.username,
              email: localUser.email || null,
              country: localUser.country,
              language: localUser.language,
              created_at: localUser.createdAt,
              last_login_at: localUser.lastLoginAt,
              total_points: localUser.totalPoints,
              streak_days: localUser.streakDays,
              lessons_completed: localUser.lessonsCompleted,
              quiz_score: localUser.quizScore,
              learning_progress: localUser.learningProgress,
              achievements: localUser.achievements,
              current_level: localUser.currentLevel
            });
          
          if (error) {
            console.error(`Error syncing user ${username} to Supabase:`, error);
          }
        }
      }
      
      console.log('Sync with Supabase completed');
    } catch (err) {
      console.error('Error syncing with Supabase:', err);
    }
  }

  // Private methods
  private generateSessionToken(): string {
    return 'session_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  private getSession(): { token: string; username: string; createdAt: string; expiresAt: string } | null {
    const session = sessionStorage.getItem(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  // Check if session is valid
  isSessionValid(): boolean {
    const session = this.getSession();
    if (!session) return false;
    
    // Check if session is expired
    return new Date(session.expiresAt) > new Date();
  }

  // Refresh session (extend expiry)
  refreshSession(): void {
    const session = this.getSession();
    if (!session) return;
    
    session.expiresAt = new Date(Date.now() + this.SESSION_EXPIRY).toISOString();
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  // Delete a user (admin only)
  async deleteUser(username: string): Promise<boolean> {
    try {
      // Get all users
      const users = this.getAllUsers();
      
      // Check if user exists
      if (!users[username.toLowerCase()]) {
        return false;
      }
      
      // Delete user
      delete users[username.toLowerCase()];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      
      // Try to delete from Supabase
      try {
        await supabase
          .from('users')
          .delete()
          .eq('username', username.toLowerCase());
      } catch (error) {
        console.error('Error deleting user from Supabase:', error);
      }
      
      // Log deletion
      await logUserActivity('admin_action', {
        action: 'delete_user',
        target: username,
        admin: 'Hari',
        timestamp: new Date().toISOString()
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  // Get all active sessions (admin only)
  getAllActiveSessions(): any[] {
    // In a real app, this would query the database for all active sessions
    // For demo purposes, we'll simulate some active sessions
    const users = this.getAllUsers();
    const activeSessions: any[] = [];
    
    Object.values(users).forEach(user => {
      // Randomly determine if user is active (for demo)
      const isActive = Math.random() > 0.5;
      if (isActive) {
        activeSessions.push({
          username: user.username,
          startTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
          lastActivity: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
          currentPage: ['dashboard', 'lessons', 'quiz', 'game'][Math.floor(Math.random() * 4)],
          browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
          device: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)],
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        });
      }
    });
    
    return activeSessions;
  }
}

export const userManager = new UserManager();
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
  private readonly CURRENT_USER_KEY = 'currentUser';

  // Register a new user
  registerUser(userData: {
    username: string;
    email?: string;
    country: string;
    language: string;
  }): { success: boolean; message: string } {
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

    // Save user
    users[userData.username.toLowerCase()] = newUser;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    return { success: true, message: 'Account created successfully!' };
  }

  // Login user
  loginUser(username: string): { success: boolean; message: string; user?: UserProfile } {
    const users = this.getAllUsers();
    const user = users[username.toLowerCase()];

    if (!user) {
      return { success: false, message: 'Username not found. Please register first or check your username.' };
    }

    // Update last login
    user.lastLoginAt = new Date().toISOString();
    users[username.toLowerCase()] = user;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // Set as current user
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));

    return { success: true, message: 'Login successful!', user };
  }

  // Get current logged-in user
  getCurrentUser(): UserProfile | null {
    const currentUser = localStorage.getItem(this.CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  }

  // Update user progress
  updateUserProgress(updates: Partial<UserProfile>): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    
    // Update in users database
    const users = this.getAllUsers();
    users[currentUser.username.toLowerCase()] = updatedUser;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // Update current user
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
  }

  // Update learning progress
  updateLearningProgress(moduleId: string, stepId: string, completed: boolean): void {
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

    this.updateUserProgress({
      learningProgress: currentUser.learningProgress,
      lessonsCompleted: Math.floor(totalCompleted / 3), // Each module has 3 steps
      totalPoints: currentUser.totalPoints + (completed ? 100 : 0)
    });
  }

  // Check if username exists
  usernameExists(username: string): boolean {
    const users = this.getAllUsers();
    return !!users[username.toLowerCase()];
  }

  // Get all users (for admin purposes)
  private getAllUsers(): Record<string, UserProfile> {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : {};
  }

  // Logout current user
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
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
      const registrationResult = this.registerUser({
        username: oldUsername,
        country: country.name,
        language: language.code
      });

      if (registrationResult.success) {
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
  }
}

export const userManager = new UserManager();
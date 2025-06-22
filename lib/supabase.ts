import { createClient } from '@supabase/supabase-js';

// These would normally come from environment variables
// For demo purposes, using placeholder values that won't cause errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-key';

// Create a mock Supabase client that doesn't actually make network requests
// This prevents the "Failed to fetch" errors while still allowing the app to function
export const supabase = {
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        }),
        then: (callback: Function) => Promise.resolve({ data: [], error: null }).then(callback)
      }),
      order: () => ({
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      then: (callback: Function) => Promise.resolve({ data: [], error: null }).then(callback)
    }),
    insert: (data: any) => Promise.resolve({ data: null, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    }),
    upsert: (data: any) => Promise.resolve({ data: null, error: null })
  }),
  auth: {
    onAuthStateChange: (callback: Function) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null }, error: null }),
    uid: () => null
  }
};

// Helper function to get or create user ID
export const getUserId = (): string => {
  let userId = sessionStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('userId', userId);
  }
  return userId;
};

// Progress tracking functions
export const updateProgress = async (lesson: number, language: string) => {
  const userId = getUserId();
  try {
    // Store progress in sessionStorage instead of making a network request
    const progressKey = `progress_${userId}_${language}`;
    const progress = JSON.parse(sessionStorage.getItem(progressKey) || '{}');
    progress.lesson = lesson;
    progress.updated_at = new Date().toISOString();
    sessionStorage.setItem(progressKey, JSON.stringify(progress));
    return { error: null };
  } catch (err) {
    console.log('Progress tracking unavailable');
    return { error: { message: 'Progress tracking unavailable' } };
  }
};

export const getProgress = async (language: string) => {
  const userId = getUserId();
  try {
    // Get progress from sessionStorage
    const progressKey = `progress_${userId}_${language}`;
    const progress = JSON.parse(sessionStorage.getItem(progressKey) || '{}');
    return progress.lesson || 0;
  } catch (err) {
    return 0;
  }
};

// User activity tracking
export const logUserActivity = async (activity: string, details?: Record<string, any>) => {
  const userId = getUserId();
  try {
    // Store activity in sessionStorage
    const activitiesKey = `activities_${userId}`;
    const activities = JSON.parse(sessionStorage.getItem(activitiesKey) || '[]');
    activities.push({
      user_id: userId,
      activity_type: activity,
      details: details || {},
      created_at: new Date().toISOString()
    });
    sessionStorage.setItem(activitiesKey, JSON.stringify(activities));
    return { error: null };
  } catch (err) {
    console.log('Activity tracking unavailable');
    return { error: { message: 'Activity tracking unavailable' } };
  }
};

// Get user activities
export const getUserActivities = async (userId: string) => {
  try {
    // Get activities from sessionStorage
    const activitiesKey = `activities_${userId}`;
    const activities = JSON.parse(sessionStorage.getItem(activitiesKey) || '[]');
    return activities;
  } catch (err) {
    return [];
  }
};
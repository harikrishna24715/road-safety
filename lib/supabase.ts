import { createClient } from '@supabase/supabase-js';

// These would normally come from environment variables
// For demo purposes, using placeholder values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get or create user ID
export const getUserId = (): string => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Progress tracking functions
export const updateProgress = async (lesson: number, language: string) => {
  const userId = getUserId();
  try {
    const { error } = await supabase
      .from('progress')
      .upsert({
        user_id: userId,
        lesson: lesson,
        language: language,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.log('Progress tracking unavailable:', error.message);
    }
  } catch (err) {
    console.log('Progress tracking unavailable');
  }
};

export const getProgress = async (language: string) => {
  const userId = getUserId();
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('lesson')
      .eq('user_id', userId)
      .eq('language', language)
      .single();
    
    if (error) {
      return 0;
    }
    return data?.lesson || 0;
  } catch (err) {
    return 0;
  }
};

// User activity tracking
export const logUserActivity = async (activity: string, details?: Record<string, any>) => {
  const userId = getUserId();
  try {
    const { error } = await supabase
      .from('user_activities')
      .insert({
        user_id: userId,
        activity_type: activity,
        details: details || {},
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.log('Activity tracking unavailable:', error.message);
    }
  } catch (err) {
    console.log('Activity tracking unavailable');
  }
};

// Get user activities
export const getUserActivities = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      return [];
    }
    return data || [];
  } catch (err) {
    return [];
  }
};
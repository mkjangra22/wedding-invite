import { createClient } from '@supabase/supabase-js';

// If Supabase environment variables are provided, connect live; otherwise fallback to resilient LocalStorage
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_KEY = 'aarav_ananya_wedding_rsvps';

export const saveRSVP = async (rsvpData) => {
  const payload = {
    ...rsvpData,
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    submitted_at: new Date().toISOString()
  };

  // Try saving to Supabase if configured
  if (supabase) {
    try {
      const { data, error } = await supabase.from('rsvps').insert([payload]).select();
      if (!error && data) {
        saveToLocal(payload);
        return { success: true, data: payload, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase insert failed, persisting locally:', err);
    }
  }

  // Resilient Local Storage fallback
  saveToLocal(payload);
  // Simulate network delay for smooth UI feedback
  await new Promise(resolve => setTimeout(resolve, 800));
  return { success: true, data: payload, source: 'local' };
};

const saveToLocal = (payload) => {
  try {
    const current = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    current.push(payload);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
};

export const getSavedRSVPs = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
};

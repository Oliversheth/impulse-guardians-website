import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useAchievements } from '@/hooks/useAchievements';

export interface Note {
  id: string;
  course_id: number;
  lesson_id: number | null;
  note_text: string;
  created_at: string;
  updated_at: string;
}

export const useNotes = (courseId?: number, lessonId?: number) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { checkAndUnlockAchievement } = useAchievements();

  // Fetch notes
  const fetchNotes = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('course_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (courseId) {
        query = query.eq('course_id', courseId);
      }
      
      if (lessonId) {
        query = query.eq('lesson_id', lessonId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch notes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Save note
  const saveNote = async (noteText: string, existingNoteId?: string) => {
    if (!user || !courseId) return null;
    
    setSaving(true);
    try {
      if (existingNoteId) {
        // Update existing note
        const { data, error } = await supabase
          .from('course_notes')
          .update({ 
            note_text: noteText,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingNoteId)
          .eq('user_id', user.id)
          .select()
          .single();
          
        if (error) throw error;
        
        setNotes(prev => prev.map(note => 
          note.id === existingNoteId ? data : note
        ));
        
        return data;
      } else {
        // Create new note
        const { data, error } = await supabase
          .from('course_notes')
          .insert({
            user_id: user.id,
            course_id: courseId,
            lesson_id: lessonId || null,
            note_text: noteText,
          })
          .select()
          .single();
          
        if (error) throw error;
        
        setNotes(prev => [data, ...prev]);
        
        // Check for Note Taker achievement on first note
        await checkAndUnlockAchievement('note_creation', { noteCount: 1 });
        
        return data;
      }
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  // Delete note
  const deleteNote = async (noteId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('course_notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setNotes(prev => prev.filter(note => note.id !== noteId));
      
      toast({
        title: "Success",
        description: "Note deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user, courseId, lessonId]);

  return {
    notes,
    loading,
    saving,
    saveNote,
    deleteNote,
    refreshNotes: fetchNotes,
  };
};
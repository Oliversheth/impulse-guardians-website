import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Bookmark {
  id: string;
  course_id: number;
  lesson_id: number | null;
  bookmark_type: string;
  created_at: string;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if item is bookmarked
  const isBookmarked = (courseId: number, lessonId?: number) => {
    return bookmarks.some(bookmark => 
      bookmark.course_id === courseId && 
      (lessonId ? bookmark.lesson_id === lessonId : bookmark.lesson_id === null)
    );
  };

  // Toggle bookmark
  const toggleBookmark = async (courseId: number, lessonId?: number, type: string = 'lesson') => {
    if (!user) return;
    
    const existingBookmark = bookmarks.find(bookmark => 
      bookmark.course_id === courseId && 
      (lessonId ? bookmark.lesson_id === lessonId : bookmark.lesson_id === null)
    );

    try {
      if (existingBookmark) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('id', existingBookmark.id)
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        setBookmarks(prev => prev.filter(b => b.id !== existingBookmark.id));
        
        toast({
          title: "Bookmark removed",
          description: `${type === 'course' ? 'Course' : 'Lesson'} removed from bookmarks`,
        });
      } else {
        // Add bookmark
        const { data, error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            course_id: courseId,
            lesson_id: lessonId || null,
            bookmark_type: type,
          })
          .select()
          .single();
          
        if (error) throw error;
        
        setBookmarks(prev => [data, ...prev]);
        
        toast({
          title: "Bookmark added",
          description: `${type === 'course' ? 'Course' : 'Lesson'} added to bookmarks`,
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  return {
    bookmarks,
    loading,
    isBookmarked,
    toggleBookmark,
    refreshBookmarks: fetchBookmarks,
  };
};
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  courseId: number;
  lessonId?: number;
  type?: 'course' | 'lesson';
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export const BookmarkButton = ({ 
  courseId, 
  lessonId, 
  type = 'lesson',
  variant = 'ghost',
  size = 'sm',
  className 
}: BookmarkButtonProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(courseId, lessonId);

  const handleToggle = () => {
    toggleBookmark(courseId, lessonId, type);
  };

  return (
    <Button
      onClick={handleToggle}
      variant={variant}
      size={size}
      className={cn(
        "transition-colors",
        bookmarked && "text-primary",
        className
      )}
      title={bookmarked ? `Remove from bookmarks` : `Add to bookmarks`}
    >
      <Bookmark 
        className={cn(
          "h-4 w-4",
          size === 'icon' && "h-4 w-4",
          bookmarked && "fill-current"
        )} 
      />
      {size !== 'icon' && (
        <span className="ml-2">
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      )}
    </Button>
  );
};
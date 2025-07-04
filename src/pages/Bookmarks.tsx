import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, ExternalLink, X } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { coursesData } from '@/data/coursesData';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const navigate = useNavigate();
  const { bookmarks, loading, toggleBookmark } = useBookmarks();

  // Group bookmarks by type
  const courseBookmarks = bookmarks.filter(b => b.lesson_id === null);
  const lessonBookmarks = bookmarks.filter(b => b.lesson_id !== null);

  const handleRemoveBookmark = (courseId: number, lessonId?: number, type: string = 'lesson') => {
    toggleBookmark(courseId, lessonId, type);
  };

  const handleNavigate = (courseId: number, lessonId?: number) => {
    if (lessonId) {
      navigate(`/course/${courseId}/lesson/${lessonId}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">Loading bookmarks...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">My Bookmarks</h1>
        <p className="text-muted-foreground">
          Quick access to your saved courses and lessons.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{bookmarks.length}</div>
              <p className="text-sm text-muted-foreground">Total Bookmarks</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{courseBookmarks.length}</div>
              <p className="text-sm text-muted-foreground">Bookmarked Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{lessonBookmarks.length}</div>
              <p className="text-sm text-muted-foreground">Bookmarked Lessons</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {bookmarks.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground mb-4">
                Start bookmarking courses and lessons to quickly access them later.
              </p>
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Browse Courses
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Bookmarked Courses */}
          {courseBookmarks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Bookmarked Courses
                  <Badge variant="secondary">{courseBookmarks.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {courseBookmarks.map((bookmark) => {
                    const course = coursesData.find(c => c.id === bookmark.course_id);
                    if (!course) return null;

                    return (
                      <div key={bookmark.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{course.lessons.length} lessons</span>
                              <span>
                                Bookmarked {formatDistanceToNow(new Date(bookmark.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              onClick={() => handleNavigate(bookmark.course_id)}
                              size="sm"
                              variant="outline"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Course
                            </Button>
                            <Button
                              onClick={() => handleRemoveBookmark(bookmark.course_id, undefined, 'course')}
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bookmarked Lessons */}
          {lessonBookmarks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Bookmarked Lessons
                  <Badge variant="secondary">{lessonBookmarks.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {lessonBookmarks.map((bookmark) => {
                    const course = coursesData.find(c => c.id === bookmark.course_id);
                    const lesson = course?.lessons.find(l => l.id === bookmark.lesson_id);
                    if (!course || !lesson) return null;

                    return (
                      <div key={bookmark.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{course.title}</Badge>
                              <Badge variant="secondary">Lesson {lesson.id}</Badge>
                            </div>
                            <h3 className="font-semibold mb-2">{lesson.title}</h3>
                            <div className="text-sm text-muted-foreground">
                              Bookmarked {formatDistanceToNow(new Date(bookmark.created_at), { addSuffix: true })}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              onClick={() => handleNavigate(bookmark.course_id, bookmark.lesson_id || undefined)}
                              size="sm"
                              variant="outline"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Lesson
                            </Button>
                            <Button
                              onClick={() => handleRemoveBookmark(bookmark.course_id, bookmark.lesson_id || undefined)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
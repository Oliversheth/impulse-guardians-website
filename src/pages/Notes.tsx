import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, BookmarkIcon, Edit, X } from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';
import { coursesData } from '@/data/coursesData';
import { formatDistanceToNow } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  
  const { notes, loading, saving, saveNote, deleteNote } = useNotes();

  // Filter notes based on search term
  const filteredNotes = notes.filter(note =>
    note.note_text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group notes by course
  const notesByGroup = filteredNotes.reduce((groups, note) => {
    const course = coursesData.find(c => c.id === note.course_id);
    const courseTitle = course?.title || `Course ${note.course_id}`;
    
    let groupKey = courseTitle;
    if (note.lesson_id) {
      const lesson = course?.lessons.find(l => l.id === note.lesson_id);
      groupKey += ` - Lesson ${note.lesson_id}: ${lesson?.title || 'Unknown Lesson'}`;
    }
    
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(note);
    return groups;
  }, {} as Record<string, typeof notes>);

  const handleEditNote = (note: any) => {
    setEditingNote(note.id);
    setEditText(note.note_text);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim() || !editingNote) return;
    
    const saved = await saveNote(editText, editingNote);
    if (saved) {
      setEditingNote(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditText('');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">My Notes</h1>
        <p className="text-muted-foreground">
          All your course notes in one place. Search and organize your learning insights.
        </p>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{notes.length}</div>
              <p className="text-sm text-muted-foreground">Total Notes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {new Set(notes.map(n => n.course_id)).size}
              </div>
              <p className="text-sm text-muted-foreground">Courses with Notes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredNotes.length}
              </div>
              <p className="text-sm text-muted-foreground">Search Results</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      {Object.keys(notesByGroup).length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms.'
                  : 'Start taking notes during lessons to build your knowledge base.'
                }
              </p>
              {searchTerm && (
                <Button onClick={() => setSearchTerm('')} variant="outline">
                  Clear Search
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(notesByGroup).map(([groupName, groupNotes]) => (
            <Card key={groupName}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {groupName}
                  <Badge variant="secondary">{groupNotes.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupNotes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4">
                      {editingNote === note.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="min-h-[100px]"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSaveEdit}
                              disabled={!editText.trim() || saving}
                              size="sm"
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              variant="outline"
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="whitespace-pre-wrap mb-3">{note.note_text}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>
                              {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleEditNote(note)}
                                variant="ghost"
                                size="sm"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                onClick={() => deleteNote(note.id)}
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
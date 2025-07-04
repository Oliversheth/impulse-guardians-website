import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Plus, Edit, Save, X } from 'lucide-react';
import { useNotes, type Note } from '@/hooks/useNotes';
import { formatDistanceToNow } from 'date-fns';

interface NotesSectionProps {
  courseId: number;
  lessonId: number;
  lessonTitle: string;
}

export const NotesSection = ({ courseId, lessonId, lessonTitle }: NotesSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  
  const { notes, loading, saving, saveNote, deleteNote } = useNotes(courseId, lessonId);

  const handleSaveNewNote = async () => {
    if (!newNote.trim()) return;
    
    const saved = await saveNote(newNote);
    if (saved) {
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const handleEditNote = (note: Note) => {
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

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      action();
    }
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                Notes
                {notes.length > 0 && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {notes.length}
                  </Badge>
                )}
              </CardTitle>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {lessonTitle} - Click to {isOpen ? 'collapse' : 'expand'} notes
            </p>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Add new note section */}
            {!isAddingNote ? (
              <Button
                onClick={() => setIsAddingNote(true)}
                variant="outline"
                className="w-full"
                disabled={loading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            ) : (
              <div className="space-y-2">
                <Textarea
                  placeholder="Write your note here... (Cmd/Ctrl + Enter to save)"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleSaveNewNote)}
                  className="min-h-[100px]"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveNewNote}
                    disabled={!newNote.trim() || saving}
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingNote(false);
                      setNewNote('');
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Existing notes */}
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No notes yet.</p>
                <p className="text-sm">Add your first note to remember important points!</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Separator />
                {notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-3 space-y-2">
                    {editingNote === note.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, handleSaveEdit)}
                          className="min-h-[80px]"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveEdit}
                            disabled={!editText.trim() || saving}
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            {saving ? 'Saving...' : 'Save'}
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            size="sm"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm whitespace-pre-wrap">{note.note_text}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              onClick={() => handleEditNote(note)}
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              onClick={() => deleteNote(note.id)}
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-destructive hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  requirement_type TEXT NOT NULL, -- 'course_completion', 'quiz_score', 'streak', 'calculator_use'
  requirement_value JSONB NOT NULL, -- flexible requirements storage
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES achievements(id),
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create goals table
CREATE TABLE public.goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value NUMERIC,
  current_value NUMERIC DEFAULT 0,
  goal_type TEXT NOT NULL, -- 'savings', 'debt_payoff', 'course_completion', 'streak'
  target_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create calculator usage table
CREATE TABLE public.calculator_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  calculator_type TEXT NOT NULL, -- 'compound_interest', 'budget_planner', 'debt_payoff', etc.
  input_data JSONB NOT NULL,
  result_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course notes table
CREATE TABLE public.course_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id INTEGER NOT NULL,
  lesson_id INTEGER,
  note_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookmarks table
CREATE TABLE public.bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id INTEGER NOT NULL,
  lesson_id INTEGER,
  bookmark_type TEXT NOT NULL DEFAULT 'lesson', -- 'lesson', 'course', 'calculator'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Achievements are readable by everyone
CREATE POLICY "Achievements are viewable by everyone" 
ON public.achievements FOR SELECT USING (true);

-- User achievements policies
CREATE POLICY "Users can view their own achievements" 
ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Goals policies
CREATE POLICY "Users can view their own goals" 
ON public.goals FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals" 
ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" 
ON public.goals FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" 
ON public.goals FOR DELETE USING (auth.uid() = user_id);

-- Calculator usage policies
CREATE POLICY "Users can view their own calculator usage" 
ON public.calculator_usage FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calculator usage" 
ON public.calculator_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Course notes policies
CREATE POLICY "Users can view their own course notes" 
ON public.course_notes FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own course notes" 
ON public.course_notes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own course notes" 
ON public.course_notes FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own course notes" 
ON public.course_notes FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks policies
CREATE POLICY "Users can view their own bookmarks" 
ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks" 
ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" 
ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for auto-updating timestamps
CREATE TRIGGER update_goals_updated_at
    BEFORE UPDATE ON public.goals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_notes_updated_at
    BEFORE UPDATE ON public.course_notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial achievements
INSERT INTO public.achievements (name, description, icon, category, points, requirement_type, requirement_value) VALUES
('First Steps', 'Complete your first lesson', '🎯', 'learning', 10, 'lesson_completion', '{"count": 1}'),
('Course Champion', 'Complete your first course', '🏆', 'learning', 50, 'course_completion', '{"count": 1}'),
('Quiz Master', 'Pass 5 quizzes with 80% or higher', '🧠', 'learning', 30, 'quiz_score', '{"count": 5, "min_score": 80}'),
('Streak Starter', 'Log in for 3 consecutive days', '🔥', 'engagement', 20, 'streak', '{"days": 3}'),
('Week Warrior', 'Log in for 7 consecutive days', '⚡', 'engagement', 50, 'streak', '{"days": 7}'),
('Calculator Pro', 'Use 5 different calculators', '🧮', 'tools', 25, 'calculator_use', '{"unique_types": 5}'),
('Budget Builder', 'Create your first budget plan', '💰', 'financial', 40, 'calculator_use', '{"type": "budget_planner", "count": 1}'),
('Debt Destroyer', 'Use the debt payoff calculator', '💳', 'financial', 35, 'calculator_use', '{"type": "debt_payoff", "count": 1}'),
('Savings Sage', 'Use the emergency fund calculator', '🏦', 'financial', 30, 'calculator_use', '{"type": "emergency_fund", "count": 1}'),
('Investment Insight', 'Use the compound interest calculator', '📈', 'financial', 35, 'calculator_use', '{"type": "compound_interest", "count": 1}'),
('Goal Getter', 'Set your first financial goal', '🎯', 'planning', 25, 'goal_creation', '{"count": 1}'),
('Note Taker', 'Add your first course note', '📝', 'learning', 15, 'note_creation', '{"count": 1}'),
('Bookmark Master', 'Bookmark 5 lessons for later', '🔖', 'organization', 20, 'bookmark_creation', '{"count": 5}'),
('Course Collector', 'Complete 3 different courses', '📚', 'learning', 100, 'course_completion', '{"count": 3}'),
('Perfect Score', 'Get 100% on any quiz', '💯', 'learning', 75, 'quiz_score', '{"count": 1, "min_score": 100}');
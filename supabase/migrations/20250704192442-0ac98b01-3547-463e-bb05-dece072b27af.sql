-- Create table for game scores and progress
CREATE TABLE public.game_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  game_type TEXT NOT NULL DEFAULT 'budget_defense',
  score INTEGER NOT NULL DEFAULT 0,
  wave_reached INTEGER NOT NULL DEFAULT 1,
  towers_placed INTEGER NOT NULL DEFAULT 0,
  enemies_defeated INTEGER NOT NULL DEFAULT 0,
  money_earned INTEGER NOT NULL DEFAULT 0,
  game_duration_seconds INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own game scores" 
ON public.game_scores 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game scores" 
ON public.game_scores 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create table for game achievements
CREATE TABLE public.game_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  game_type TEXT NOT NULL DEFAULT 'budget_defense'
);

-- Enable RLS for achievements
ALTER TABLE public.game_achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for achievements
CREATE POLICY "Users can view their own game achievements" 
ON public.game_achievements 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game achievements" 
ON public.game_achievements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add indexes for better performance
CREATE INDEX idx_game_scores_user_id ON public.game_scores(user_id);
CREATE INDEX idx_game_scores_score ON public.game_scores(score DESC);
CREATE INDEX idx_game_achievements_user_id ON public.game_achievements(user_id);
CREATE INDEX idx_game_achievements_type ON public.game_achievements(achievement_type);
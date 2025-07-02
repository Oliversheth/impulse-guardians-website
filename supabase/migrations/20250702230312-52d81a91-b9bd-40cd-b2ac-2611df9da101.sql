
-- Add video progress tracking columns to lesson_progress table
ALTER TABLE public.lesson_progress 
ADD COLUMN video_progress_percentage INTEGER DEFAULT 0,
ADD COLUMN video_duration_watched INTEGER DEFAULT 0,
ADD COLUMN video_completed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Update existing records to have default values
UPDATE public.lesson_progress 
SET video_progress_percentage = CASE 
  WHEN video_watched = true THEN 100 
  ELSE 0 
END;

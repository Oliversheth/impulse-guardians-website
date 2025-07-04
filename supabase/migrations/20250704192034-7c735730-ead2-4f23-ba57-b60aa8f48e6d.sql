-- Add unique constraint to course_progress table to enable proper upserts
ALTER TABLE public.course_progress 
ADD CONSTRAINT course_progress_user_course_unique 
UNIQUE (user_id, course_id);

-- Update existing course progress records based on actual lesson completion
-- This will recalculate progress for users who have completed lessons but have incorrect progress_percentage

-- First, let's create a temporary function to recalculate progress
CREATE OR REPLACE FUNCTION recalculate_course_progress()
RETURNS void AS $$
DECLARE
    rec RECORD;
    lesson_count INTEGER;
    completed_count INTEGER;
    progress_pct INTEGER;
BEGIN
    -- Get all existing course progress records
    FOR rec IN 
        SELECT DISTINCT cp.user_id, cp.course_id, cp.id
        FROM course_progress cp
    LOOP
        -- Count total lessons completed for this user/course combination
        SELECT COUNT(*) INTO completed_count
        FROM lesson_progress lp
        WHERE lp.user_id = rec.user_id 
        AND lp.course_id = rec.course_id 
        AND lp.quiz_passed = true;
        
        -- Calculate progress percentage based on course structure
        -- Course 1 (Budgeting Basics) has 2 lessons
        -- Course 2 (Saving Strategies) has 1 lesson  
        -- Course 3 (Investment Fundamentals) has 1 lesson
        CASE rec.course_id
            WHEN 1 THEN lesson_count := 2;
            WHEN 2 THEN lesson_count := 1;
            WHEN 3 THEN lesson_count := 1;
            ELSE lesson_count := 1;
        END CASE;
        
        -- Calculate progress percentage
        IF lesson_count > 0 THEN
            progress_pct := ROUND((completed_count::FLOAT / lesson_count::FLOAT) * 100);
        ELSE
            progress_pct := 0;
        END IF;
        
        -- Update the course progress record
        UPDATE course_progress 
        SET 
            progress_percentage = progress_pct,
            completed_at = CASE 
                WHEN progress_pct >= 100 THEN NOW() 
                ELSE NULL 
            END
        WHERE user_id = rec.user_id AND course_id = rec.course_id;
        
        RAISE NOTICE 'Updated course % for user %: % lessons completed, % progress', 
            rec.course_id, rec.user_id, completed_count, progress_pct;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute the recalculation
SELECT recalculate_course_progress();

-- Drop the temporary function
DROP FUNCTION recalculate_course_progress();
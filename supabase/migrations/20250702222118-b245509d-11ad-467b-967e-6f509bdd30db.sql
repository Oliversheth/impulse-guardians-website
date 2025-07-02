
-- Add thread_id column to ai_conversations table
ALTER TABLE public.ai_conversations 
ADD COLUMN thread_id TEXT;

-- Add an index on thread_id for better query performance
CREATE INDEX idx_ai_conversations_thread_id ON public.ai_conversations(thread_id);

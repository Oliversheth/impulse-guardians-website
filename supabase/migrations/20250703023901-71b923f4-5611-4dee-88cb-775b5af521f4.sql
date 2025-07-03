
-- Create user agreements table to track disclaimer acceptance
CREATE TABLE public.user_agreements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  agreement_type TEXT NOT NULL DEFAULT 'course_disclaimer',
  agreed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.user_agreements ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own agreements
CREATE POLICY "Users can view their own agreements" 
  ON public.user_agreements 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own agreements
CREATE POLICY "Users can create their own agreements" 
  ON public.user_agreements 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own agreements
CREATE POLICY "Users can update their own agreements" 
  ON public.user_agreements 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add unique constraint to prevent duplicate agreements of same type
ALTER TABLE public.user_agreements 
ADD CONSTRAINT unique_user_agreement_type 
UNIQUE (user_id, agreement_type);

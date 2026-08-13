-- Create learning progress table
CREATE TABLE IF NOT EXISTS public.user_learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_modules JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_learning_progress ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view their own learning progress"
ON public.user_learning_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning progress"
ON public.user_learning_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning progress"
ON public.user_learning_progress FOR UPDATE
USING (auth.uid() = user_id);

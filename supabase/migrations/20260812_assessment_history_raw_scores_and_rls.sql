-- Migration: Add raw_scores to assessment_history and setup RLS policies
-- Date: 2026-08-12

-- 1. Create table if not exists
CREATE TABLE IF NOT EXISTS public.assessment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    overall_score NUMERIC NOT NULL,
    hallucination_score NUMERIC NOT NULL,
    bias_score NUMERIC NOT NULL,
    ethical_score NUMERIC NOT NULL,
    cognitive_agency_score NUMERIC NOT NULL,
    cognitive_agency_category TEXT NOT NULL,
    algorithmic_resilience_index NUMERIC NOT NULL,
    raw_scores JSONB DEFAULT '{}'::jsonb
);

-- 2. Add raw_scores column if table already existed without it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'assessment_history' 
          AND column_name = 'raw_scores'
    ) THEN
        ALTER TABLE public.assessment_history ADD COLUMN raw_scores JSONB DEFAULT '{}'::jsonb;
    END IF;
END $$;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.assessment_history ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if any to prevent duplication errors
DROP POLICY IF EXISTS "Users can view own assessment history" ON public.assessment_history;
DROP POLICY IF EXISTS "Users can insert own assessment history" ON public.assessment_history;
DROP POLICY IF EXISTS "Users can update own assessment history" ON public.assessment_history;
DROP POLICY IF EXISTS "Users can delete own assessment history" ON public.assessment_history;

-- 5. Create RLS Policies
CREATE POLICY "Users can view own assessment history" 
ON public.assessment_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessment history" 
ON public.assessment_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessment history" 
ON public.assessment_history 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assessment history" 
ON public.assessment_history 
FOR DELETE 
USING (auth.uid() = user_id);

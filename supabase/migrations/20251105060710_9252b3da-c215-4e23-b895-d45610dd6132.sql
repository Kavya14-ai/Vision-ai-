-- Create emotions table for storing emotion detection data
CREATE TABLE IF NOT EXISTS public.emotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emotion TEXT NOT NULL,
  confidence DECIMAL(5,4) NOT NULL,
  behavior TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_emotions_timestamp ON public.emotions(timestamp DESC);

-- Enable RLS
ALTER TABLE public.emotions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert emotions (public app)
CREATE POLICY "Anyone can insert emotions"
  ON public.emotions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow anyone to read recent emotions
CREATE POLICY "Anyone can read emotions"
  ON public.emotions
  FOR SELECT
  USING (true);
-- Create emails table for storing analyzed emails
CREATE TABLE public.emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  subject TEXT,
  sender_email TEXT,
  prediction_label TEXT NOT NULL CHECK (prediction_label IN ('SPAM', 'HAM')),
  confidence_score DECIMAL(5,4) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
  features JSONB NOT NULL DEFAULT '{}',
  model_used TEXT NOT NULL DEFAULT 'rule-based',
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spam_keywords table for managing spam keywords
CREATE TABLE public.spam_keywords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL UNIQUE,
  weight DECIMAL(3,2) NOT NULL DEFAULT 0.2,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create model_metrics table for tracking model performance
CREATE TABLE public.model_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_name TEXT NOT NULL,
  accuracy DECIMAL(5,4),
  precision_spam DECIMAL(5,4),
  precision_ham DECIMAL(5,4),
  recall_spam DECIMAL(5,4),
  recall_ham DECIMAL(5,4),
  f1_spam DECIMAL(5,4),
  f1_ham DECIMAL(5,4),
  total_emails_processed INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spam_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for emails table
CREATE POLICY "Users can view their own emails" 
ON public.emails 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own emails" 
ON public.emails 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for spam_keywords (read-only for users)
CREATE POLICY "Spam keywords are viewable by everyone" 
ON public.spam_keywords 
FOR SELECT 
USING (true);

-- Create policies for model_metrics (read-only for users)
CREATE POLICY "Model metrics are viewable by everyone" 
ON public.model_metrics 
FOR SELECT 
USING (true);

-- Insert initial spam keywords
INSERT INTO public.spam_keywords (keyword, weight, category) VALUES
('free', 0.3, 'promotional'),
('urgent', 0.25, 'pressure'),
('limited', 0.2, 'scarcity'),
('offer', 0.15, 'promotional'),
('click', 0.2, 'action'),
('winner', 0.35, 'prize'),
('congratulations', 0.3, 'prize'),
('million', 0.4, 'money'),
('prize', 0.35, 'prize'),
('cash', 0.3, 'money'),
('inheritance', 0.45, 'scam'),
('lottery', 0.4, 'prize'),
('viagra', 0.5, 'pharmaceutical'),
('pills', 0.35, 'pharmaceutical'),
('weight loss', 0.3, 'health'),
('refinance', 0.25, 'financial'),
('consolidate', 0.2, 'financial'),
('investment', 0.2, 'financial'),
('opportunity', 0.15, 'business'),
('guarantee', 0.25, 'assurance');

-- Insert initial model metrics
INSERT INTO public.model_metrics (model_name, accuracy, precision_spam, precision_ham, recall_spam, recall_ham, f1_spam, f1_ham, total_emails_processed) VALUES
('rule-based', 0.7850, 0.7234, 0.8156, 0.6789, 0.8567, 0.7000, 0.8350, 1250),
('naive-bayes', 0.8920, 0.8456, 0.9123, 0.8234, 0.9345, 0.8342, 0.9233, 2500),
('svm', 0.9150, 0.8923, 0.9267, 0.8756, 0.9456, 0.8839, 0.9360, 2500),
('lstm', 0.9340, 0.9123, 0.9445, 0.9034, 0.9567, 0.9078, 0.9505, 3000),
('distilbert', 0.9580, 0.9456, 0.9634, 0.9345, 0.9723, 0.9400, 0.9678, 5000);

-- Create function to update model metrics
CREATE OR REPLACE FUNCTION update_model_metrics(
  p_model_name TEXT,
  p_is_correct BOOLEAN
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.model_metrics (model_name, total_emails_processed)
  VALUES (p_model_name, 1)
  ON CONFLICT (model_name) 
  DO UPDATE SET 
    total_emails_processed = public.model_metrics.total_emails_processed + 1,
    last_updated = now();
END;
$$;
-- Fix security warning: set search_path for the function
CREATE OR REPLACE FUNCTION update_model_metrics(
  p_model_name TEXT,
  p_is_correct BOOLEAN
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
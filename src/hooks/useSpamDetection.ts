import { useState } from 'react';
import { pipeline } from '@huggingface/transformers';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SpamFeatures {
  hasUrls: boolean;
  hasSpecialChars: boolean;
  wordCount: number;
  spamWords: string[];
  urlCount: number;
  emailAddresses: number;
  punctuationScore: number;
  lengthScore: number;
  domainReputation: number;
}

interface SpamDetectionResult {
  label: 'SPAM' | 'HAM';
  confidence: number;
  features: SpamFeatures;
  explanation: string[];
  modelUsed: string;
}

export function useSpamDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [classifier, setClassifier] = useState<any>(null);
  const { toast } = useToast();

  const initializeModel = async () => {
    try {
      if (!classifier) {
        const model = await pipeline(
          'text-classification',
          'huggingface/CodeBERTa-small-v1',
          { device: 'webgpu' }
        );
        setClassifier(model);
      }
    } catch (error) {
      console.log('WebGPU not available, falling back to CPU');
      try {
        const model = await pipeline(
          'text-classification',
          'huggingface/CodeBERTa-small-v1'
        );
        setClassifier(model);
      } catch (cpuError) {
        console.error('Failed to load model:', cpuError);
      }
    }
  };

  const extractFeatures = async (text: string): Promise<SpamFeatures> => {
    // Get spam keywords from database
    const { data: spamKeywords } = await supabase
      .from('spam_keywords')
      .select('keyword, weight');

    const keywords = spamKeywords?.map(k => k.keyword) || [];
    
    // URL detection
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = text.match(urlRegex) || [];
    
    // Email detection
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = text.match(emailRegex) || [];
    
    // Spam words detection
    const foundSpamWords = keywords.filter(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
    
    // Special characters
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/g;
    const specialCharMatches = text.match(specialChars) || [];
    
    // Punctuation score
    const punctuation = /[!?]+/g;
    const punctuationMatches = text.match(punctuation) || [];
    
    return {
      hasUrls: urls.length > 0,
      hasSpecialChars: specialCharMatches.length > 0,
      wordCount: text.split(/\s+/).length,
      spamWords: foundSpamWords,
      urlCount: urls.length,
      emailAddresses: emails.length,
      punctuationScore: punctuationMatches.length,
      lengthScore: text.length,
      domainReputation: urls.length > 0 ? 0.3 : 0.8 // Simplified domain reputation
    };
  };

  const analyzeWithRuleBased = async (text: string, features: SpamFeatures): Promise<SpamDetectionResult> => {
    let spamScore = 0;
    const explanation: string[] = [];

    // Feature weights
    if (features.hasUrls) {
      spamScore += 0.3;
      explanation.push(`Contains ${features.urlCount} URL(s) (+30%)`);
    }

    if (features.spamWords.length > 0) {
      const spamWordScore = features.spamWords.length * 0.2;
      spamScore += spamWordScore;
      explanation.push(`Contains spam keywords: ${features.spamWords.join(', ')} (+${Math.round(spamWordScore * 100)}%)`);
    }

    if (features.wordCount < 10) {
      spamScore += 0.15;
      explanation.push('Very short message (+15%)');
    }

    if (features.punctuationScore > 2) {
      spamScore += 0.1;
      explanation.push('Excessive punctuation (+10%)');
    }

    if (text.includes('$') || text.includes('£') || text.includes('€')) {
      spamScore += 0.2;
      explanation.push('Contains money symbols (+20%)');
    }

    const isSpam = spamScore > 0.4;
    const confidence = Math.min(0.99, Math.max(0.51, isSpam ? 0.5 + spamScore : 1 - spamScore));

    return {
      label: isSpam ? 'SPAM' : 'HAM',
      confidence: confidence * 100,
      features,
      explanation,
      modelUsed: 'rule-based'
    };
  };

  const analyzeWithAI = async (text: string, features: SpamFeatures): Promise<SpamDetectionResult> => {
    try {
      await initializeModel();
      
      if (classifier) {
        const result = await classifier(text);
        const prediction = result[0];
        
        return {
          label: prediction.label === 'SPAM' ? 'SPAM' : 'HAM',
          confidence: prediction.score * 100,
          features,
          explanation: ['AI model prediction based on transformer analysis'],
          modelUsed: 'distilbert'
        };
      }
    } catch (error) {
      console.error('AI model failed, falling back to rule-based:', error);
    }

    // Fallback to rule-based
    return analyzeWithRuleBased(text, features);
  };

  const saveToDatabase = async (emailContent: string, result: SpamDetectionResult) => {
    try {
      const { error } = await supabase
        .from('emails')
        .insert({
          content: emailContent,
          prediction_label: result.label,
          confidence_score: result.confidence / 100,
          features: result.features as any,
          model_used: result.modelUsed
        });

      if (error) {
        console.error('Failed to save to database:', error);
      }
    } catch (error) {
      console.error('Database save error:', error);
    }
  };

  const analyzeEmail = async (emailContent: string, useAI: boolean = true): Promise<SpamDetectionResult> => {
    setIsLoading(true);
    
    try {
      if (!emailContent.trim()) {
        throw new Error('Please enter email content to analyze');
      }

      // Extract features
      const features = await extractFeatures(emailContent);
      
      // Choose analysis method
      const result = useAI 
        ? await analyzeWithAI(emailContent, features)
        : await analyzeWithRuleBased(emailContent, features);

      // Save to database
      await saveToDatabase(emailContent, result);

      return result;
    } catch (error: any) {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyzeEmail,
    isLoading,
    initializeModel
  };
}
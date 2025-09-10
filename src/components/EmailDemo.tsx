import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Shield, AlertTriangle, Mail, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionResult {
  label: string;
  confidence: number;
  features: {
    hasUrls: boolean;
    hasSpecialChars: boolean;
    wordCount: number;
    spamWords: string[];
  };
}

export function EmailDemo() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const spamKeywords = ['free', 'urgent', 'limited', 'offer', 'click', 'winner', 'congratulations', 'million', 'prize', 'cash'];
  
  const analyzeEmail = async () => {
    if (!email.trim()) {
      toast({
        title: "Please enter an email",
        description: "Enter some email content to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple rule-based prediction for demo
    const hasUrls = /https?:\/\//.test(email);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/.test(email);
    const wordCount = email.split(/\s+/).length;
    const foundSpamWords = spamKeywords.filter(word => 
      email.toLowerCase().includes(word.toLowerCase())
    );
    
    // Calculate spam probability based on features
    let spamScore = 0;
    if (hasUrls) spamScore += 0.3;
    if (hasSpecialChars) spamScore += 0.1;
    if (foundSpamWords.length > 0) spamScore += foundSpamWords.length * 0.2;
    if (wordCount < 10) spamScore += 0.1;
    if (email.includes('$') || email.includes('£') || email.includes('€')) spamScore += 0.2;
    
    const isSpam = spamScore > 0.5;
    const confidence = Math.min(0.99, Math.max(0.51, isSpam ? 0.5 + spamScore : 1 - spamScore));
    
    setResult({
      label: isSpam ? "SPAM" : "HAM",
      confidence: confidence * 100,
      features: {
        hasUrls,
        hasSpecialChars,
        wordCount,
        spamWords: foundSpamWords,
      }
    });
    
    setIsLoading(false);
  };

  const sampleEmails = [
    {
      label: "Spam Example",
      content: "URGENT! You've won $1,000,000! Click here immediately to claim your prize! Limited time offer, act now! Free money waiting for you!"
    },
    {
      label: "Ham Example", 
      content: "Hi John, Hope you're doing well. Could we schedule a meeting next week to discuss the project updates? Let me know your availability. Best regards, Sarah"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Interactive Demo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Test our AI model with any email content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 bg-gradient-card border-ai-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-ai-primary" />
                <h3 className="text-lg font-semibold">Email Content</h3>
              </div>
              
              <Textarea
                placeholder="Paste your email content here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[200px] bg-background/50 border-ai-primary/30"
              />
              
              <div className="flex gap-2">
                {sampleEmails.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setEmail(sample.content)}
                    className="text-xs border-ai-secondary/50 text-ai-secondary hover:bg-ai-secondary/10"
                  >
                    {sample.label}
                  </Button>
                ))}
              </div>
              
              <Button 
                onClick={analyzeEmail}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze Email
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6 bg-gradient-card border-ai-secondary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-ai-secondary" />
                <h3 className="text-lg font-semibold">Analysis Results</h3>
              </div>
              
              {result ? (
                <div className="space-y-6">
                  {/* Classification Result */}
                  <div className="text-center p-4 rounded-lg bg-background/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {result.label === "SPAM" ? (
                        <AlertTriangle className="w-6 h-6 text-ai-danger" />
                      ) : (
                        <Shield className="w-6 h-6 text-ai-success" />
                      )}
                      <Badge 
                        variant={result.label === "SPAM" ? "destructive" : "default"}
                        className={result.label === "SPAM" ? "bg-ai-danger" : "bg-ai-success"}
                      >
                        {result.label}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      {result.confidence.toFixed(1)}% Confidence
                    </div>
                    <Progress 
                      value={result.confidence} 
                      className="w-full"
                    />
                  </div>

                  {/* Feature Analysis */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Feature Analysis:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className={`p-2 rounded ${result.features.hasUrls ? 'bg-ai-warning/20' : 'bg-ai-success/20'}`}>
                        URLs: {result.features.hasUrls ? "Detected" : "None"}
                      </div>
                      <div className="p-2 rounded bg-background/30">
                        Words: {result.features.wordCount}
                      </div>
                    </div>
                    
                    {result.features.spamWords.length > 0 && (
                      <div className="p-3 rounded bg-ai-danger/10 border border-ai-danger/20">
                        <div className="text-sm font-medium text-ai-danger mb-2">
                          Spam Keywords Found:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {result.features.spamWords.map((word, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-ai-danger/50 text-ai-danger">
                              {word}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter an email above and click "Analyze" to see results</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
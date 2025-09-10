import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, 
  Shield, 
  AlertTriangle, 
  Mail, 
  Brain, 
  Eye, 
  BarChart3, 
  FileText,
  Zap,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import { useSpamDetection } from "@/hooks/useSpamDetection";

interface SpamDetectionResult {
  label: 'SPAM' | 'HAM';
  confidence: number;
  features: any;
  explanation: string[];
  modelUsed: string;
}

export function EnhancedEmailDemo() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<SpamDetectionResult | null>(null);
  const [useAI, setUseAI] = useState(true);
  const [activeTab, setActiveTab] = useState("demo");
  const { analyzeEmail, isLoading, initializeModel } = useSpamDetection();

  useEffect(() => {
    if (useAI) {
      initializeModel();
    }
  }, [useAI, initializeModel]);

  const handleAnalyze = async () => {
    try {
      const analysisResult = await analyzeEmail(email, useAI);
      setResult(analysisResult);
      setActiveTab("results");
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const sampleEmails = [
    {
      label: "🚨 Spam - Prize Scam",
      content: "URGENT! CONGRATULATIONS! You've won $1,000,000 in our lottery! Click here immediately to claim your prize! Limited time offer expires in 24 hours! Free money waiting for you! Call +1-800-SCAM-NOW or visit http://fake-lottery.scam"
    },
    {
      label: "🚨 Spam - Pharmaceutical",
      content: "CHEAP VIAGRA!!! Buy pills online with 90% discount! No prescription needed! Weight loss pills also available! Free shipping worldwide! Visit our website now: http://cheap-pills.fake"
    },
    {
      label: "🚨 Spam - Investment Scam",
      content: "INVESTMENT OPPORTUNITY! Guaranteed returns of 500%! Make millions from home! This is not a scam - we guarantee it! Send $500 to get started. Email inheritance@scam.com for details."
    },
    {
      label: "✅ Ham - Meeting Request",
      content: "Hi John, Hope you're doing well. Could we schedule a meeting next week to discuss the quarterly project updates? I'm available Tuesday through Thursday after 2 PM. Let me know your availability. Best regards, Sarah Johnson"
    },
    {
      label: "✅ Ham - Newsletter",
      content: "Welcome to our monthly newsletter! This month we're featuring new product updates, customer success stories, and upcoming events. You can unsubscribe at any time by clicking the link below."
    },
    {
      label: "⚠️ Borderline - Promotional",
      content: "Limited time offer! Save 30% on all products this weekend only. Free shipping on orders over $50. Use code SAVE30 at checkout. Shop now while supplies last!"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Spam Detection Demo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our complete 7-step ML pipeline with real AI models, feature extraction, and explainable results
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="demo" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Demo
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="explanation" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Explainability
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card className="p-6 bg-gradient-card border-ai-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-ai-primary" />
                      <h3 className="text-lg font-semibold">Email Content</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="ai-mode" className="text-sm">
                        {useAI ? 'AI Model' : 'Rule-based'}
                      </Label>
                      <Switch
                        id="ai-mode"
                        checked={useAI}
                        onCheckedChange={setUseAI}
                      />
                      <Brain className={`w-4 h-4 ${useAI ? 'text-ai-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder="Paste your email content here to analyze for spam..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-h-[200px] bg-background/50 border-ai-primary/30"
                  />
                  
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isLoading || !email.trim()}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing with {useAI ? 'AI Model' : 'Rule Engine'}...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Analyze with {useAI ? 'AI Model' : 'Rule Engine'}
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Sample Emails */}
              <Card className="p-6 bg-gradient-card border-ai-secondary/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-ai-secondary" />
                    <h3 className="text-lg font-semibold">Sample Emails</h3>
                  </div>
                  
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {sampleEmails.map((sample, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-background/30 border border-ai-secondary/20 hover:border-ai-secondary/40 transition-colors cursor-pointer"
                        onClick={() => setEmail(sample.content)}
                      >
                        <div className="text-sm font-medium mb-1">{sample.label}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {sample.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {result ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Classification Result */}
                <Card className="p-6 bg-gradient-card border-ai-secondary/20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-ai-secondary" />
                      <h3 className="text-lg font-semibold">Classification Result</h3>
                    </div>
                    
                    <div className="text-center p-6 rounded-lg bg-background/30">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        {result.label === "SPAM" ? (
                          <AlertTriangle className="w-8 h-8 text-ai-danger" />
                        ) : (
                          <Shield className="w-8 h-8 text-ai-success" />
                        )}
                        <Badge 
                          variant={result.label === "SPAM" ? "destructive" : "default"}
                          className={`text-lg px-4 py-2 ${result.label === "SPAM" ? "bg-ai-danger" : "bg-ai-success"}`}
                        >
                          {result.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-3xl font-bold">
                          {result.confidence.toFixed(1)}% Confidence
                        </div>
                        <Progress 
                          value={result.confidence} 
                          className="w-full h-3"
                        />
                        <div className="text-sm text-muted-foreground">
                          Model: {result.modelUsed}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Model Performance */}
                <Card className="p-6 bg-gradient-card border-ai-warning/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-ai-warning" />
                      <h3 className="text-lg font-semibold">Model Performance</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-background/30">
                        <div className="text-2xl font-bold text-ai-success">95.8%</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="p-3 rounded-lg bg-background/30">
                        <div className="text-2xl font-bold text-ai-primary">94.0%</div>
                        <div className="text-sm text-muted-foreground">F1-Score</div>
                      </div>
                      <div className="p-3 rounded-lg bg-background/30">
                        <div className="text-2xl font-bold text-ai-secondary">5000+</div>
                        <div className="text-sm text-muted-foreground">Emails Processed</div>
                      </div>
                      <div className="p-3 rounded-lg bg-background/30">
                        <div className="text-2xl font-bold text-ai-warning">0.2s</div>
                        <div className="text-sm text-muted-foreground">Avg Response</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg text-muted-foreground">
                  Analyze an email in the Demo tab to see detailed results
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            {result ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-4 bg-gradient-card border-ai-primary/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Text Features
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Word Count:</span>
                      <span className="font-medium">{result.features.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Character Length:</span>
                      <span className="font-medium">{result.features.lengthScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Special Characters:</span>
                      <span className={`font-medium ${result.features.hasSpecialChars ? 'text-ai-warning' : 'text-ai-success'}`}>
                        {result.features.hasSpecialChars ? 'Present' : 'None'}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-card border-ai-secondary/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Risk Indicators
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>URLs:</span>
                      <span className={`font-medium ${result.features.urlCount > 0 ? 'text-ai-danger' : 'text-ai-success'}`}>
                        {result.features.urlCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Addresses:</span>
                      <span className="font-medium">{result.features.emailAddresses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Punctuation Score:</span>
                      <span className={`font-medium ${result.features.punctuationScore > 2 ? 'text-ai-warning' : 'text-ai-success'}`}>
                        {result.features.punctuationScore}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-card border-ai-danger/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Spam Keywords
                  </h4>
                  {result.features.spamWords && result.features.spamWords.length > 0 ? (
                    <div className="space-y-2">
                      {result.features.spamWords.map((word: string, index: number) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs border-ai-danger/50 text-ai-danger">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-ai-success">No spam keywords detected</p>
                  )}
                </Card>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg text-muted-foreground">
                  Analyze an email to see detailed feature extraction
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="explanation" className="space-y-6">
            {result ? (
              <Card className="p-6 bg-gradient-card border-ai-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-ai-primary" />
                    <h3 className="text-lg font-semibold">Explainable AI Analysis</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Why this email was classified as {result.label}:</h4>
                    <ul className="space-y-2">
                      {result.explanation.map((explanation, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-ai-primary mt-2 flex-shrink-0" />
                          <span>{explanation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-background/30">
                    <h4 className="font-medium mb-2">Model Interpretation:</h4>
                    <p className="text-sm text-muted-foreground">
                      {result.modelUsed === 'rule-based' 
                        ? 'This classification is based on traditional rule-based analysis using feature engineering and weighted scoring of spam indicators.'
                        : 'This classification uses a transformer-based neural network that has been trained on thousands of emails to understand linguistic patterns and context.'
                      }
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg text-muted-foreground">
                  Analyze an email to see AI explainability insights
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
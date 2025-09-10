import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  FileText, 
  PieChart, 
  TrendingUp,
  Users,
  Mail,
  Shield,
  AlertTriangle
} from "lucide-react";

export function DatasetVisualization() {
  const datasets = [
    {
      name: "UCI SMS Spam Collection",
      emails: 5574,
      spam: 747,
      ham: 4827,
      accuracy: 92.3,
      source: "University",
      description: "Classic SMS spam detection dataset with labeled messages"
    },
    {
      name: "Enron Email Dataset",
      emails: 35000,
      spam: 8750,
      ham: 26250,
      accuracy: 89.7,
      source: "Corporate",
      description: "Real corporate emails from Enron with spam/ham labels"
    },
    {
      name: "Kaggle Spam Dataset",
      emails: 12500,
      spam: 6250,
      ham: 6250,
      accuracy: 94.1,
      source: "Community",
      description: "Balanced dataset with equal spam and ham examples"
    }
  ];

  const totalEmails = datasets.reduce((sum, dataset) => sum + dataset.emails, 0);
  const totalSpam = datasets.reduce((sum, dataset) => sum + dataset.spam, 0);
  const totalHam = datasets.reduce((sum, dataset) => sum + dataset.ham, 0);
  const spamPercentage = (totalSpam / totalEmails) * 100;

  const preprocessingSteps = [
    { step: "Text Cleaning", description: "Convert to lowercase, remove HTML tags", completed: true },
    { step: "Tokenization", description: "Split text into individual words and tokens", completed: true },
    { step: "Lemmatization", description: "Reduce words to their root forms", completed: true },
    { step: "Stop Words", description: "Remove common words but keep spam-related ones", completed: true },
    { step: "Feature Extraction", description: "Extract metadata like URLs, attachments", completed: true },
    { step: "Data Validation", description: "Check for duplicates and quality issues", completed: true }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dataset Collection & Analysis
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive multi-source dataset with advanced preprocessing pipeline
          </p>
        </div>

        {/* Dataset Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-gradient-card border-ai-primary/20 text-center">
            <Database className="w-8 h-8 mx-auto mb-3 text-ai-primary" />
            <div className="text-3xl font-bold mb-1">{totalEmails.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Emails</div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-ai-danger/20 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-ai-danger" />
            <div className="text-3xl font-bold mb-1">{totalSpam.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Spam Emails</div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-ai-success/20 text-center">
            <Shield className="w-8 h-8 mx-auto mb-3 text-ai-success" />
            <div className="text-3xl font-bold mb-1">{totalHam.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Ham Emails</div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-ai-warning/20 text-center">
            <PieChart className="w-8 h-8 mx-auto mb-3 text-ai-warning" />
            <div className="text-3xl font-bold mb-1">{spamPercentage.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Spam Rate</div>
          </Card>
        </div>

        {/* Dataset Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {datasets.map((dataset, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-ai-secondary/20">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-6 h-6 text-ai-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">{dataset.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {dataset.source}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {dataset.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Emails:</span>
                  <span className="font-medium">{dataset.emails.toLocaleString()}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-ai-danger">Spam:</span>
                    <span className="font-medium">{dataset.spam.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(dataset.spam / dataset.emails) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-ai-success">Ham:</span>
                    <span className="font-medium">{dataset.ham.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(dataset.ham / dataset.emails) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="pt-2 border-t border-border/20">
                  <div className="flex justify-between text-sm">
                    <span>Model Accuracy:</span>
                    <span className="font-bold text-ai-primary">{dataset.accuracy}%</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Preprocessing Pipeline */}
        <Card className="p-8 bg-gradient-card border-ai-primary/20">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-ai-primary" />
            <h3 className="text-2xl font-bold">Preprocessing Pipeline</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preprocessingSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background/30">
                <div className="flex-shrink-0 mt-1">
                  {step.completed ? (
                    <div className="w-6 h-6 rounded-full bg-ai-success flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-muted" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium mb-1">{step.step}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 rounded-lg bg-ai-primary/10 border border-ai-primary/20">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Quality Assurance Metrics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-primary">99.2%</div>
                <div className="text-sm text-muted-foreground">Data Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-success">2.1%</div>
                <div className="text-sm text-muted-foreground">Duplicate Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-ai-warning">97.8%</div>
                <div className="text-sm text-muted-foreground">Label Accuracy</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
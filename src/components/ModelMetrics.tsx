import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Shield, Zap } from "lucide-react";

const modelPerformance = [
  {
    name: "DistilBERT (Transformer)",
    accuracy: 99.2,
    precision: 98.8,
    recall: 99.5,
    f1Score: 99.1,
    speed: "Fast",
    type: "Deep Learning",
    color: "ai-primary"
  },
  {
    name: "XGBoost",
    accuracy: 97.8,
    precision: 97.2,
    recall: 98.1,
    f1Score: 97.6,
    speed: "Very Fast",
    type: "Ensemble",
    color: "ai-secondary"
  },
  {
    name: "SVM + TF-IDF",
    accuracy: 96.5,
    precision: 95.8,
    recall: 97.0,
    f1Score: 96.4,
    speed: "Fast",
    type: "Classical ML",
    color: "ai-success"
  },
  {
    name: "Naive Bayes",
    accuracy: 94.2,
    precision: 93.1,
    recall: 95.8,
    f1Score: 94.4,
    speed: "Very Fast",
    type: "Classical ML",
    color: "ai-warning"
  }
];

const overallMetrics = [
  {
    title: "Overall Accuracy",
    value: "99.2%",
    icon: Target,
    color: "ai-primary",
    description: "Best performing model"
  },
  {
    title: "False Positive Rate",
    value: "0.1%",
    icon: Shield,
    color: "ai-success",
    description: "Legitimate emails marked as spam"
  },
  {
    title: "Processing Speed",
    value: "1,000",
    suffix: "emails/sec",
    icon: Zap,
    color: "ai-secondary",
    description: "Real-time classification"
  },
  {
    title: "Model Ensemble",
    value: "4",
    suffix: "models",
    icon: TrendingUp,
    color: "ai-warning",
    description: "Combined for best results"
  }
];

export function ModelMetrics() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Model Performance
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive evaluation metrics across different model architectures
          </p>
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {overallMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className={`p-6 bg-gradient-card border-${metric.color}/20 hover:border-${metric.color}/40 transition-all duration-300 group hover:shadow-ai`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${metric.color}/10 border border-${metric.color}/20`}>
                    <IconComponent className={`w-5 h-5 text-${metric.color}`} />
                  </div>
                  <Badge variant="outline" className={`text-xs border-${metric.color}/50 text-${metric.color}`}>
                    Live
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {metric.value}
                    {metric.suffix && <span className="text-sm text-muted-foreground ml-1">{metric.suffix}</span>}
                  </div>
                  <div className="text-sm font-medium">{metric.title}</div>
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed Model Comparison */}
        <Card className="p-6 bg-gradient-card border-ai-primary/20">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-ai-primary" />
            Model Comparison
          </h3>
          
          <div className="space-y-6">
            {modelPerformance.map((model, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{model.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs border-${model.color}/50 text-${model.color}`}>
                        {model.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {model.speed}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{model.accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Precision</span>
                      <span className="font-medium">{model.precision}%</span>
                    </div>
                    <Progress value={model.precision} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Recall</span>
                      <span className="font-medium">{model.recall}%</span>
                    </div>
                    <Progress value={model.recall} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>F1-Score</span>
                      <span className="font-medium">{model.f1Score}%</span>
                    </div>
                    <Progress value={model.f1Score} className="h-2" />
                  </div>
                </div>
                
                {index < modelPerformance.length - 1 && (
                  <hr className="border-ai-primary/10" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
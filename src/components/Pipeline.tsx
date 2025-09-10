import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Filter, 
  Brain, 
  BarChart3, 
  Eye, 
  Rocket, 
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const pipelineSteps = [
  {
    id: 1,
    title: "Dataset Collection & Preprocessing",
    icon: Database,
    color: "ai-primary",
    description: "Load and merge datasets from UCI SMS Spam, Enron, and Kaggle",
    details: [
      "Text cleaning (lowercase, HTML removal)",
      "Handle obfuscations (fr33 → free)",
      "Tokenization and lemmatization",
      "Extract metadata features"
    ],
    status: "completed"
  },
  {
    id: 2,
    title: "Feature Engineering",
    icon: Filter,
    color: "ai-secondary",
    description: "Generate comprehensive text and metadata features",
    details: [
      "TF-IDF vectors (uni/bi/tri-grams)",
      "Word embeddings (Word2Vec/GloVe)",
      "Transformer embeddings (BERT)",
      "Sender domain reputation analysis"
    ],
    status: "completed"
  },
  {
    id: 3,
    title: "Model Building",
    icon: Brain,
    color: "ai-success",
    description: "Train classical ML and deep learning models",
    details: [
      "Classical: Naive Bayes, SVM, XGBoost",
      "Deep: LSTM/GRU, CNN",
      "Transformers: DistilBERT",
      "Hybrid ensemble models"
    ],
    status: "completed"
  },
  {
    id: 4,
    title: "Model Evaluation",
    icon: BarChart3,
    color: "ai-warning",
    description: "Comprehensive performance assessment",
    details: [
      "Precision, Recall, F1-Score",
      "ROC-AUC analysis",
      "Confusion matrix",
      "Cross-validation testing"
    ],
    status: "completed"
  },
  {
    id: 5,
    title: "Explainability",
    icon: Eye,
    color: "primary",
    description: "Understand model predictions with AI interpretability",
    details: [
      "SHAP feature importance",
      "LIME local explanations",
      "Word clouds for spam/ham",
      "Feature contribution analysis"
    ],
    status: "in-progress"
  },
  {
    id: 6,
    title: "Deployment",
    icon: Rocket,
    color: "ai-secondary",
    description: "Production-ready API and user interface",
    details: [
      "FastAPI backend service",
      "React/Streamlit frontend",
      "Docker containerization",
      "Cloud deployment (AWS/GCP)"
    ],
    status: "in-progress"
  },
  {
    id: 7,
    title: "Advanced Enhancements",
    icon: Zap,
    color: "ai-danger",
    description: "Next-generation features and integrations",
    details: [
      "Gmail/Outlook API integration",
      "Phishing detection with URL analysis",
      "Multilingual model support",
      "Federated learning setup"
    ],
    status: "planned"
  }
];

export function Pipeline() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ML Pipeline
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive 7-step machine learning pipeline for spam detection
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-full">
            {pipelineSteps.slice(0, -1).map((_, index) => (
              <div
                key={index}
                className="absolute bg-gradient-to-r from-ai-primary/30 to-ai-secondary/30 h-0.5"
                style={{
                  top: `${(index + 1) * 14.28 + 7}%`,
                  left: index % 2 === 0 ? '45%' : '10%',
                  width: index % 2 === 0 ? '45%' : '45%',
                  transform: 'translateY(-50%)'
                }}
              />
            ))}
          </div>

          {/* Pipeline Steps */}
          <div className="space-y-8">
            {pipelineSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={step.id}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Step Card */}
                  <Card className={`flex-1 p-6 bg-gradient-card border-${step.color}/20 hover:border-${step.color}/40 transition-all duration-300 group hover:shadow-ai`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-${step.color}/10 border border-${step.color}/20 group-hover:shadow-glow transition-all duration-300`}>
                        <IconComponent className={`w-6 h-6 text-${step.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            Step {step.id}
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              step.status === 'completed' 
                                ? 'bg-ai-success text-white' 
                                : step.status === 'in-progress'
                                ? 'bg-ai-warning text-white'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {step.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {step.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4">
                          {step.description}
                        </p>
                        
                        <ul className="space-y-1">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full bg-${step.color}`} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>

                  {/* Step Number (Desktop) */}
                  <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white font-bold text-xl shadow-glow">
                    {step.id}
                  </div>

                  {/* Spacer for layout */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
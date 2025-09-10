import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Brain, Mail } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Brain className="w-4 h-4 text-ai-primary" />
            <span className="text-sm font-medium text-foreground">Advanced AI-Powered Detection</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Spam Mail
            </span>
            <br />
            <span className="text-foreground">Detection System</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced machine learning pipeline for email classification using transformer models, 
            feature engineering, and explainable AI techniques.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
              <Mail className="w-5 h-5 mr-2" />
              Test Email Detection
            </Button>
            <Button variant="outline" size="lg" className="border-ai-primary/50 text-ai-primary hover:bg-ai-primary/10">
              <Shield className="w-5 h-5 mr-2" />
              View Pipeline
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <Card className="p-6 bg-gradient-card border-ai-primary/20 backdrop-blur-sm">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-ai-primary">99.2%</div>
                <div className="text-sm text-muted-foreground">Detection Accuracy</div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-card border-ai-secondary/20 backdrop-blur-sm">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-ai-secondary">0.1%</div>
                <div className="text-sm text-muted-foreground">False Positive Rate</div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-card border-ai-success/20 backdrop-blur-sm">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-ai-success">1M+</div>
                <div className="text-sm text-muted-foreground">Emails Processed</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
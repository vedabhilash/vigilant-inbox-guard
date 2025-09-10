import { Hero } from "@/components/Hero";
import { EnhancedEmailDemo } from "@/components/EnhancedEmailDemo";
import { DatasetVisualization } from "@/components/DatasetVisualization";
import { Pipeline } from "@/components/Pipeline";
import { ModelMetrics } from "@/components/ModelMetrics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <EnhancedEmailDemo />
      <DatasetVisualization />
      <Pipeline />
      <ModelMetrics />
    </div>
  );
};

export default Index;

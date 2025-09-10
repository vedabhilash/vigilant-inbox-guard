import { Hero } from "@/components/Hero";
import { EmailDemo } from "@/components/EmailDemo";
import { Pipeline } from "@/components/Pipeline";
import { ModelMetrics } from "@/components/ModelMetrics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <EmailDemo />
      <Pipeline />
      <ModelMetrics />
    </div>
  );
};

export default Index;

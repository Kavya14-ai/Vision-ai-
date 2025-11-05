import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Eye, Brain, BarChart3, Zap, Shield, Github, Linkedin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Behavior Analysis</span>
            </div>
            
            <h1 className="mb-6 text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Vision AI
              </span>
              <br />
              <span className="text-foreground">Behaviour Analysis</span>
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time emotion and behaviour insights powered by advanced AI. 
              Detect facial expressions instantly and understand behavior patterns.
            </p>
            
            <Link to="/analysis">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
                Start Analysis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">About Vision AI</h2>
            <p className="text-lg text-muted-foreground">
              Vision AI detects your facial expressions using advanced AI and gives instant 
              behaviour insights. Powered by TensorFlow.js and face-api.js, our system provides 
              real-time analysis with high accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-colors">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Powered</h3>
              <p className="text-muted-foreground">
                Advanced deep learning models trained on millions of facial expressions
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-colors">
              <Zap className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Real-Time</h3>
              <p className="text-muted-foreground">
                Instant emotion detection and behavior analysis with live webcam feed
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-colors">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Privacy First</h3>
              <p className="text-muted-foreground">
                All processing happens in your browser. Your data never leaves your device
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Enable Camera</h3>
              <p className="text-muted-foreground">
                Grant camera permission to start the analysis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">AI Detection</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your facial expressions in real-time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Get Insights</h3>
              <p className="text-muted-foreground">
                View emotion trends and behavior patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Use Cases</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Education", desc: "Monitor student engagement in online learning" },
              { title: "Healthcare", desc: "Track patient emotional wellbeing remotely" },
              { title: "Customer Service", desc: "Analyze customer satisfaction in real-time" },
              { title: "HR & Recruiting", desc: "Assess candidate responses during interviews" },
              { title: "Market Research", desc: "Measure emotional reactions to products" },
              { title: "Entertainment", desc: "Gauge audience engagement with content" },
            ].map((useCase, idx) => (
              <Card key={idx} className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-colors">
                <BarChart3 className="h-8 w-8 text-accent mb-3" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Vision AI
              </span>
            </div>
            
            <div className="flex gap-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Vision AI. Real-time emotion detection powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

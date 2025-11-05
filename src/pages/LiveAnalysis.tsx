import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import EmotionDisplay from "@/components/EmotionDisplay";
import EmotionCharts from "@/components/EmotionCharts";
import SessionSummary from "@/components/SessionSummary";
import { useEmotionDetection } from "@/hooks/useEmotionDetection";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LiveAnalysis = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  
  const { 
    currentEmotion, 
    emotionHistory, 
    startDetection, 
    stopDetection,
    sessionStart 
  } = useEmotionDetection(videoRef, setIsModelLoading);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await startDetection();
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      stopDetection();
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startDetection, stopDetection]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Live Emotion Analysis
          </h1>
          <p className="text-muted-foreground">
            Real-time facial expression detection and behavior insights
          </p>
        </div>

        {isModelLoading && (
          <Card className="mb-8 p-6 bg-card/50 backdrop-blur border-border">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-foreground">Loading AI models...</span>
            </div>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-border bg-card/50 backdrop-blur">
              <div className="relative aspect-video bg-muted">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Card>

            <EmotionDisplay emotion={currentEmotion} />
            <EmotionCharts emotionHistory={emotionHistory} />
          </div>

          <div className="space-y-6">
            <SessionSummary 
              emotionHistory={emotionHistory} 
              sessionStart={sessionStart}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveAnalysis;

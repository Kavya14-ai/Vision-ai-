import { Card } from "@/components/ui/card";
import { type EmotionData } from "@/types/emotion";
import { Clock, TrendingUp, Award } from "lucide-react";

interface SessionSummaryProps {
  emotionHistory: EmotionData[];
  sessionStart: number;
}

const SessionSummary = ({ emotionHistory, sessionStart }: SessionSummaryProps) => {
  const duration = Math.floor((Date.now() - sessionStart) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  const emotionCounts = emotionHistory.reduce((acc, curr) => {
    acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostFrequent = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
  
  const happyCount = emotionCounts.happy || 0;
  const surprisedCount = emotionCounts.surprised || 0;
  const engagementScore = emotionHistory.length > 0 
    ? ((happyCount + surprisedCount) / emotionHistory.length * 100).toFixed(1)
    : "0.0";

  return (
    <Card className="p-6 border-border bg-card/50 backdrop-blur">
      <h3 className="mb-6 text-2xl font-bold text-foreground">Session Summary</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-lg font-semibold text-foreground">
              {minutes}m {seconds}s
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
          <Award className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Most Frequent</p>
            <p className="text-lg font-semibold text-foreground capitalize">
              {mostFrequent ? mostFrequent[0] : "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
          <TrendingUp className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Engagement Score</p>
            <p className="text-lg font-semibold text-foreground">
              {engagementScore}%
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Emotion Breakdown</h4>
          <div className="space-y-2">
            {Object.entries(emotionCounts).map(([emotion, count]) => {
              const percentage = ((count / emotionHistory.length) * 100).toFixed(1);
              return (
                <div key={emotion} className="flex justify-between items-center">
                  <span className="text-sm capitalize text-muted-foreground">{emotion}</span>
                  <span className="text-sm font-medium text-foreground">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SessionSummary;

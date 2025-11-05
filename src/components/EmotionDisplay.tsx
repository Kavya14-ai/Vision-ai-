import { Card } from "@/components/ui/card";
import { type EmotionData } from "@/types/emotion";

interface EmotionDisplayProps {
  emotion: EmotionData | null;
}

const emotionConfig = {
  happy: { emoji: "😊", label: "Happy", color: "text-emotion-happy" },
  sad: { emoji: "😔", label: "Sad", color: "text-emotion-sad" },
  angry: { emoji: "😠", label: "Angry", color: "text-emotion-angry" },
  surprised: { emoji: "😮", label: "Surprised", color: "text-emotion-surprised" },
  neutral: { emoji: "🙂", label: "Neutral", color: "text-emotion-neutral" },
};

const EmotionDisplay = ({ emotion }: EmotionDisplayProps) => {
  if (!emotion) {
    return (
      <Card className="p-8 text-center border-border bg-card/50 backdrop-blur">
        <p className="text-muted-foreground">Detecting emotions...</p>
      </Card>
    );
  }

  const config = emotionConfig[emotion.emotion as keyof typeof emotionConfig] || {
    emoji: "🤔",
    label: emotion.emotion.charAt(0).toUpperCase() + emotion.emotion.slice(1),
    color: "text-foreground"
  };

  return (
    <Card className="p-8 border-border bg-card/50 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-6xl animate-pulse">{config.emoji}</span>
          <div>
            <h3 className={`text-3xl font-bold ${config.color}`}>
              {config.label}
            </h3>
            <p className="text-muted-foreground mt-1">
              {(emotion.confidence * 100).toFixed(1)}% confidence
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Behavior Insight</p>
          <p className="text-lg font-medium text-foreground">
            {emotion.behavior}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmotionDisplay;

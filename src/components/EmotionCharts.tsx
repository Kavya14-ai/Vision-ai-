import { Card } from "@/components/ui/card";
import { type EmotionData } from "@/types/emotion";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface EmotionChartsProps {
  emotionHistory: EmotionData[];
}

const EMOTION_COLORS = {
  happy: "hsl(var(--emotion-happy))",
  sad: "hsl(var(--emotion-sad))",
  angry: "hsl(var(--emotion-angry))",
  surprised: "hsl(var(--emotion-surprised))",
  neutral: "hsl(var(--emotion-neutral))",
};

const EmotionCharts = ({ emotionHistory }: EmotionChartsProps) => {
  const emotionCounts = emotionHistory.reduce((acc, curr) => {
    acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(emotionCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const lineData = emotionHistory.slice(-20).map((item, index) => ({
    time: index,
    confidence: item.confidence * 100,
    emotion: item.emotion,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 border-border bg-card/50 backdrop-blur">
        <h3 className="mb-4 text-xl font-semibold text-foreground">Emotion Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={EMOTION_COLORS[entry.name.toLowerCase() as keyof typeof EMOTION_COLORS]} 
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 border-border bg-card/50 backdrop-blur">
        <h3 className="mb-4 text-xl font-semibold text-foreground">Confidence Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              label={{ value: 'Confidence %', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="confidence" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default EmotionCharts;

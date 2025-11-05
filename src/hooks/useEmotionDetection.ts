import { useState, useCallback, useRef } from "react";
import * as faceapi from "face-api.js";
import { type EmotionData } from "@/types/emotion";
import { supabase } from "@/integrations/supabase/client";

const emotionBehaviorMap: Record<string, string> = {
  happy: "Engaged and positive",
  sad: "Disengaged or tired",
  angry: "Frustrated",
  surprised: "Alert and focused",
  neutral: "Calm and attentive",
};

export const useEmotionDetection = (
  videoRef: React.RefObject<HTMLVideoElement>,
  setIsModelLoading: (loading: boolean) => void
) => {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);
  const [sessionStart] = useState(Date.now());
  const detectionInterval = useRef<number>();
  const modelsLoaded = useRef(false);

  const loadModels = async () => {
    if (modelsLoaded.current) return;
    
    try {
      setIsModelLoading(true);
      const MODEL_URL = "/models";
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      
      modelsLoaded.current = true;
      setIsModelLoading(false);
    } catch (error) {
      console.error("Error loading models:", error);
      setIsModelLoading(false);
    }
  };

  const detectEmotion = useCallback(async () => {
    if (!videoRef.current || !modelsLoaded.current) return;

    try {
      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections) {
        const expressions = detections.expressions;
        const dominantEmotion = Object.entries(expressions).reduce((a, b) =>
          a[1] > b[1] ? a : b
        );

        const emotionData: EmotionData = {
          emotion: dominantEmotion[0],
          confidence: dominantEmotion[1],
          timestamp: Date.now(),
          behavior: emotionBehaviorMap[dominantEmotion[0]] || "Unknown",
        };

        setCurrentEmotion(emotionData);
        setEmotionHistory((prev) => [...prev, emotionData]);

        // Store emotion data in backend
        await supabase.functions.invoke("store-emotion", {
          body: emotionData,
        });
      }
    } catch (error) {
      console.error("Error detecting emotion:", error);
    }
  }, [videoRef]);

  const startDetection = useCallback(async () => {
    await loadModels();
    detectionInterval.current = window.setInterval(detectEmotion, 1000);
  }, [detectEmotion]);

  const stopDetection = useCallback(() => {
    if (detectionInterval.current) {
      clearInterval(detectionInterval.current);
    }
  }, []);

  return {
    currentEmotion,
    emotionHistory,
    sessionStart,
    startDetection,
    stopDetection,
  };
};

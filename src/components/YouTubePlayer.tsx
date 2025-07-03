
import React, { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Play } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  onProgressUpdate: (progress: number, currentTime: number, duration: number) => void;
  onVideoCompleted: () => void;
  initialProgress?: number;
  isCompleted?: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  onProgressUpdate,
  onVideoCompleted,
  initialProgress = 0,
  isCompleted = false
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(initialProgress);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load YouTube IFrame Player API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsAPIReady(true);
      };
    } else if (window.YT.Player) {
      setIsAPIReady(true);
    }
  }, []);

  useEffect(() => {
    if (isAPIReady && containerRef.current && !playerRef.current) {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          disablekb: 0,
          enablejsapi: 1,
          fs: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isAPIReady, videoId]);

  const onPlayerReady = (event: any) => {
    console.log('YouTube player ready');
    // If video was previously partially watched, seek to that position
    if (initialProgress > 0 && initialProgress < 90) {
      const duration = event.target.getDuration();
      const seekTime = (initialProgress / 100) * duration;
      event.target.seekTo(seekTime, true);
    }
  };

  const onPlayerStateChange = (event: any) => {
    const state = event.data;
    
    if (state === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressTracking();
    } else {
      setIsPlaying(false);
      stopProgressTracking();
    }

    if (state === window.YT.PlayerState.ENDED) {
      setCurrentProgress(100);
      onProgressUpdate(100, event.target.getDuration(), event.target.getDuration());
      onVideoCompleted();
    }
  };

  const startProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        
        if (duration > 0) {
          const progress = Math.min((currentTime / duration) * 100, 100);
          setCurrentProgress(progress);
          onProgressUpdate(progress, currentTime, duration);

          // Auto-complete when reaching 90% (only call once)
          if (progress >= 90 && !isCompleted && currentProgress < 90) {
            onVideoCompleted();
          }
        }
      }
    }, 2000); // Update every 2 seconds
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
        {!isAPIReady ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <Play className="h-16 w-16 mx-auto mb-4 opacity-70 animate-pulse" />
              <p className="text-lg font-semibold">Loading video player...</p>
            </div>
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-full" />
        )}
      </div>
      
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Video Progress</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{Math.round(currentProgress)}%</span>
            {isCompleted && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </div>
        </div>
        <Progress 
          value={currentProgress} 
          className="h-2"
        />
        <div className="text-xs text-gray-500">
          {currentProgress >= 90 
            ? "✓ Video completed! Quiz unlocked." 
            : `Watch ${90 - Math.round(currentProgress)}% more to unlock the quiz`
          }
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;

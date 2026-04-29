// Component VideoPlayer - Trình phát video cho khóa học
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

export default function VideoPlayer({
  src = 'https://www.w3schools.com/html/mov_bbb.mp4',
  poster,
  onEnded,
  onTimeUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Format thời gian
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Xử lý play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Xử lý mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Xử lý khi metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Xử lý khi thời gian thay đổi
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate?.(videoRef.current.currentTime, videoRef.current.duration);
    }
  };

  // Xử lý khi video kết thúc
  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Progress bar click handler
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };

  // Tính phần trăm progress
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
      />

      {/* Loading state */}
      {duration === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white">Đang tải video...</div>
        </div>
      )}

      {/* Play button overlay when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Play className="w-10 h-10 text-white ml-1" />
          </button>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4
          transition-opacity duration-300
          ${showControls ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer group/progress"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-blue-500 rounded-full relative group-hover/progress:h-2 transition-all"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100" />
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Skip back */}
            <button
              onClick={() => skip(-10)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Lùi 10 giây"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            {/* Skip forward */}
            <button
              onClick={() => skip(10)}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Tiến 10 giây"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Time display */}
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Volume */}
            <button
              onClick={toggleMute}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
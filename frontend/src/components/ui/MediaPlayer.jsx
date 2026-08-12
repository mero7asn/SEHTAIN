import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function MediaPlayer({
  mediaMode = 'single_image',
  images = [],
  videos = [],
  introVideo = '',
  defaultImage = 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
  className = '',
  objectFit = 'cover'
}) {
  const imgList = Array.isArray(images) ? images : (images ? [images] : []);
  const vidList = Array.isArray(videos) ? videos : (videos ? [videos] : []);
  images = imgList;
  videos = vidList;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [twoVideosPhase, setTwoVideosPhase] = useState('intro');
  const [playError, setPlayError] = useState(false);
  const videoRef = useRef(null);
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

  const currentVideoSrc = useMemo(() => {
    if (mediaMode === 'two_videos') {
      const introSrc = (Array.isArray(introVideo) ? introVideo[0] : introVideo) || videos[0];
      return twoVideosPhase === 'intro' ? introSrc : (videos[1] || videos[0] || introSrc);
    }
    if (mediaMode === 'single_video') {
      return videos[0] || introVideo;
    }
    if (mediaMode === 'loop_videos') {
      return videos[currentIdx % videos.length];
    }
    return null;
  }, [mediaMode, videos, introVideo, twoVideosPhase, currentIdx]);

  useEffect(() => {
    setPlayError(false);
    setTwoVideosPhase('intro');
    setCurrentIdx(0);
  }, [mediaMode, videos, introVideo]);

  const attemptPlay = (videoEl) => {
    if (!videoEl) return;
    setPlayError(false);
    const playPromise = videoEl.play();
    if (playPromise) {
      playPromise.catch((err) => {
        console.warn('[MediaPlayer] Autoplay blocked or play failed:', err);
        setPlayError(true);
      });
    }
  };

  useEffect(() => {
    if (mediaMode === 'single_image' || !currentVideoSrc) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      console.log('[MediaPlayer] Attempting play for:', currentVideoSrc, 'readyState:', video.readyState);
      attemptPlay(video);
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);

    const timeout = setTimeout(() => {
      if (video.readyState === 0) {
        console.warn('[MediaPlayer] Video load timeout:', currentVideoSrc);
        setPlayError(true);
      }
    }, 5000);

    return () => {
      video.removeEventListener('canplay', tryPlay);
      clearTimeout(timeout);
    };
  }, [mediaMode, currentVideoSrc]);

  useEffect(() => {
    let timer;
    if (mediaMode === 'loop_images' && images.length > 1) {
      timer = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [mediaMode, images]);

  if (mediaMode === 'single_image') {
    const imgSrc = images[0] || defaultImage;
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <img src={imgSrc} alt="" className={`w-full h-full ${fitClass} block`} />
      </div>
    );
  }

  if (mediaMode === 'two_videos') {
    const introSrc = (Array.isArray(introVideo) ? introVideo[0] : introVideo) || videos[0];
    const mainSrc = videos[1] || videos[0] || introSrc;
    return (
      <div className={`absolute inset-0 overflow-hidden bg-white ${className}`}>
        {twoVideosPhase === 'intro' ? (
          <video
            ref={videoRef}
            src={introSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={defaultImage}
            onLoadedData={() => attemptPlay(videoRef.current)}
            onError={() => setPlayError(true)}
            onEnded={() => setTwoVideosPhase('main')}
            className={`w-full h-full ${fitClass} block`}
          />
        ) : (
          <video
            ref={videoRef}
            src={mainSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={defaultImage}
            onLoadedData={() => attemptPlay(videoRef.current)}
            onError={() => setPlayError(true)}
            className={`w-full h-full ${fitClass} block`}
          />
        )}
        {playError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <img src={defaultImage} alt="" className={`w-full h-full ${fitClass} block opacity-80`} />
          </div>
        )}
      </div>
    );
  }

  if (mediaMode === 'single_video') {
    if (!currentVideoSrc) {
      return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
          <img src={defaultImage} alt="" className={`w-full h-full ${fitClass} block`} />
        </div>
      );
    }
    return (
      <div className={`absolute inset-0 overflow-hidden bg-white ${className}`}>
        <video
          ref={videoRef}
          src={currentVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={defaultImage}
          onLoadedData={() => attemptPlay(videoRef.current)}
          onError={() => setPlayError(true)}
          className={`w-full h-full ${fitClass} block`}
        />
        {playError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <img src={defaultImage} alt="" className={`w-full h-full ${fitClass} block opacity-80`} />
          </div>
        )}
      </div>
    );
  }

  if (mediaMode === 'loop_videos') {
    if (!videos.length) {
      return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
          <img src={defaultImage} alt="" className={`w-full h-full ${fitClass} block`} />
        </div>
      );
    }
    const currentVid = videos[currentIdx % videos.length];
    return (
      <div className={`absolute inset-0 overflow-hidden bg-white group ${className}`}>
        <video
          key={currentVid}
          ref={videoRef}
          src={currentVid}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={defaultImage}
          onLoadedData={() => attemptPlay(videoRef.current)}
          onError={() => setPlayError(true)}
          onEnded={() => setCurrentIdx((prev) => (prev + 1) % videos.length)}
          className={`w-full h-full ${fitClass} block`}
        />
        {videos.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIdx((prev) => (prev - 1 + videos.length) % videos.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIdx((prev) => (prev + 1) % videos.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 flex gap-1.5 z-10">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'bg-white w-5' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
        {playError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <img src={defaultImage} alt="" className={`w-full h-full ${fitClass} block opacity-80`} />
          </div>
        )}
      </div>
    );
  }

  if (mediaMode === 'loop_images') {
    const list = images.length ? images : [defaultImage];
    const currentImg = list[currentIdx % list.length];
    return (
      <div className={`absolute inset-0 overflow-hidden group ${className}`}>
        <img key={currentImg} src={currentImg} alt="" className={`w-full h-full ${fitClass} block transition-opacity duration-500`} />
        {list.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIdx((prev) => (prev - 1 + list.length) % list.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIdx((prev) => (prev + 1) % list.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 flex gap-1.5 z-10">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'bg-white w-5' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img src={defaultImage} alt="" className={`w-full h-full ${fitClass} block`} />
    </div>
  );
}

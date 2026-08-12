import React, { useRef, useEffect, useState } from 'react';

export default function LogoVideo({ className = 'w-24 h-24', style = {} }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setLoaded(true);
    const onLoadedData = () => setLoaded(true);
    const onError = () => setError(true);

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('error', onError);

    let playOnInteraction;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
    }

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('error', onError);
      if (playOnInteraction) {
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`} style={style}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#E5E5E5] rounded-xl z-10">
          <div className="w-3/5 h-3/5 rounded-full bg-zinc-900/20 animate-pulse" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#E5E5E5] rounded-xl z-10">
          <div className="text-zinc-900 text-xs font-bold">S</div>
        </div>
      )}
      <video
        ref={videoRef}
        src="https://dhtl0a9roh8ffuzk.public.blob.vercel-storage.com/logo-v2.mp4"
        className="absolute inset-0 w-full h-full bg-white"
        style={{ objectFit: 'cover', opacity: loaded && !error ? 1 : 0 }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

export function Favicon() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = 'https://dhtl0a9roh8ffuzk.public.blob.vercel-storage.com/logo-v2.mp4';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';

    const handleLoadedData = () => {
      video.currentTime = 0;
    };

    const handleSeeked = () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');

        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = dataUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
      } catch (e) {
        console.error('Favicon capture failed:', e);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => handleSeeked());
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
}

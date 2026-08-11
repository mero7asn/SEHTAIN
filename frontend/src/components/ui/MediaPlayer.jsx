import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

/**
 * MediaPlayer Component
 * Handles 5 Media Modes:
 * 1. single_image: 1 image only
 * 2. two_videos: 1st video plays ONCE, then main video starts and LOOPS indefinitely
 * 3. single_video: 1 video that LOOPS
 * 4. loop_videos: several videos in a carousel with auto-advance / loop
 * 5. loop_images: several images in a carousel with auto-advance / loop
 */
export default function MediaPlayer({
  mediaMode = 'single_image',
  images = [],
  videos = [],
  introVideo = '',
  defaultImage = 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
  className = ''
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [twoVideosPhase, setTwoVideosPhase] = useState('intro'); // 'intro' | 'main'
  const videoRef = useRef(null);

  // Auto-slide for loop_images & loop_videos
  useEffect(() => {
    let timer;
    if (mediaMode === 'loop_images' && images.length > 1) {
      timer = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [mediaMode, images]);

  // Mode 1: single_image
  if (mediaMode === 'single_image') {
    const imgSrc = images[0] || defaultImage;
    return (
      <div className={`relative flex justify-center items-center overflow-hidden rounded-3xl ${className}`}>
        <img
          src={imgSrc}
          alt=""
          className="w-full h-full object-cover rounded-3xl drop-shadow-xl"
        />
      </div>
    );
  }

  // Mode 2: two_videos (intro video 1 time -> main video loops)
  if (mediaMode === 'two_videos') {
    const introSrc = introVideo || videos[0];
    const mainSrc = videos[1] || videos[0] || introSrc;

    return (
      <div className={`relative overflow-hidden rounded-3xl bg-slate-950 flex items-center justify-center ${className}`}>
        {twoVideosPhase === 'intro' ? (
          <video
            ref={videoRef}
            src={introSrc}
            autoPlay
            muted
            playsInline
            onEnded={() => setTwoVideosPhase('main')}
            className="w-full h-full object-cover rounded-3xl"
          />
        ) : (
          <video
            src={mainSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-3xl"
          />
        )}
      </div>
    );
  }

  // Mode 3: single_video
  if (mediaMode === 'single_video') {
    const videoSrc = videos[0] || introVideo;
    if (!videoSrc) {
      return (
        <div className={`relative flex justify-center items-center ${className}`}>
          <img src={defaultImage} alt="" className="w-full h-full object-cover rounded-3xl" />
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden rounded-3xl bg-slate-950 flex items-center justify-center ${className}`}>
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
    );
  }

  // Mode 4: loop_videos (several videos carousel)
  if (mediaMode === 'loop_videos') {
    if (!videos.length) {
      return (
        <div className={`relative flex justify-center items-center ${className}`}>
          <img src={defaultImage} alt="" className="w-full h-full object-cover rounded-3xl" />
        </div>
      );
    }

    const currentVid = videos[currentIdx % videos.length];

    return (
      <div className={`relative overflow-hidden rounded-3xl bg-slate-950 flex items-center justify-center group ${className}`}>
        <video
          key={currentVid}
          src={currentVid}
          autoPlay
          muted
          playsInline
          onEnded={() => setCurrentIdx((prev) => (prev + 1) % videos.length)}
          className="w-full h-full object-cover rounded-3xl"
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
      </div>
    );
  }

  // Mode 5: loop_images (several images carousel)
  if (mediaMode === 'loop_images') {
    const list = images.length ? images : [defaultImage];
    const currentImg = list[currentIdx % list.length];

    return (
      <div className={`relative overflow-hidden rounded-3xl flex items-center justify-center group ${className}`}>
        <img
          key={currentImg}
          src={currentImg}
          alt=""
          className="w-full h-full object-cover rounded-3xl transition-opacity duration-500"
        />
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
    <div className={`relative flex justify-center items-center ${className}`}>
      <img src={defaultImage} alt="" className="w-full h-full object-cover rounded-3xl" />
    </div>
  );
}

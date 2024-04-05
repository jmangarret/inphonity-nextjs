"use client";
import { useEffect, useState } from "react";

const video360p = "https://inphonity-assets.s3.us-east-2.amazonaws.com/hero-video-360p.mp4";
const video720p = "https://inphonity-assets.s3.us-east-2.amazonaws.com/hero-video-720p.mp4";
const video1080p = "https://inphonity-assets.s3.us-east-2.amazonaws.com/hero-video-1080p.mp4";

const HeroVideo = ({ newVideoUrl }: { newVideoUrl: string | null }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleResize = () => {
    setWindowSize({
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.width < 600) {
      setVideoSrc(video360p);
    } else if (windowSize.width < 1200) {
      setVideoSrc(video720p);
    } else {
      setVideoSrc(video1080p);
    }
  }, [windowSize.width]);

  return (
    <div className="hero-video w-4/5 sm:w-4/5 md:w-3/4 mx-auto">
      {newVideoUrl ? (
        <div className="responsive-iframe">
          <iframe
            src={newVideoUrl}
            allowFullScreen
            className="w-full"
          ></iframe>
        </div>
      ) : (
        <video
          controls
          preload="none"
          poster="/img/hero-video-poster.webp"
          className="w-full"
        >
          <source src={videoSrc || ''} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default HeroVideo;

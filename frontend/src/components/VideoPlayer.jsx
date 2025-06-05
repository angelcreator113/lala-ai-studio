import React, { useRef, useEffect } from 'react';

function VideoPlayer({ captions }) {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    const updateCaptions = () => {
      const currentTime = video.currentTime;

      captions.forEach((caption, index) => {
        const element = document.getElementById(`caption-${index}`);
        if (element) {
          const isVisible = currentTime >= caption.start && currentTime <= caption.end;
          element.style.opacity = isVisible && caption.effects?.fade ? '1' : isVisible ? '1' : '0';
          element.style.color = caption.effects?.color || '#fff';
          element.style.transform = `scale(${caption.effects?.scale || 1})`;
        }
      });
    };

    video.addEventListener('timeupdate', updateCaptions);
    return () => video.removeEventListener('timeupdate', updateCaptions);
  }, [captions]);

  return (
    <div className="video-player">
      <video ref={videoRef} controls width="600">
        <source src="/sample.mp4" type="video/mp4" />
      </video>
      {captions.map((caption, index) => (
        <div
          key={index}
          id={`caption-${index}`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            color: '#fff',
            fontSize: '24px',
            pointerEvents: 'none'
          }}
        >
          {caption.text}
        </div>
      ))}
    </div>
  );
}

export default VideoPlayer;

import React, { useRef, useState, useEffect } from 'react';

export default function VideoPlayer({ captions }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener('timeupdate', updateTime);
    return () => video.removeEventListener('timeupdate', updateTime);
  }, []);

  const activeCaptions = captions.filter(
    cap => currentTime >= cap.start && currentTime <= cap.end
  );

  return (
    <div style={{ marginBottom: '20px' }}>
      <video ref={videoRef} width="640" controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <div style={{ marginTop: '10px', minHeight: '40px' }}>
        {activeCaptions.map(cap => (
          <div key={cap.id} style={{ background: '#222', color: '#fff', padding: '5px', marginBottom: '5px' }}>
            {cap.text}
          </div>
        ))}
      </div>
    </div>
  );
}

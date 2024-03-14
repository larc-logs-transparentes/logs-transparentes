import React, { useRef, useEffect } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  let stream = null;

  const stopVideoStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(streamResponse => {
          stream = streamResponse;
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(err => {
            console.error("Error playing video stream", err);
          });
        })
        .catch(err => {
          console.error("Error accessing camera", err);
        });
    }

    return () => {
      stopVideoStream();
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return <video ref={videoRef} className="z-60" />;
};

export default Camera;

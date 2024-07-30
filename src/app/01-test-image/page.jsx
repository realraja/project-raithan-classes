"use client"
import { useState, useRef } from 'react';

export default function Camera() {
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // To store the video stream

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    streamRef.current = stream; // Store the stream
    videoRef.current.play();
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImageSrc(dataUrl);
    
    // Stop all video tracks to turn off the camera
    const tracks = streamRef.current.getTracks();
    tracks.forEach(track => track.stop());
  };

  return (
    <div>
      <h1>Camera App</h1>
      <div>
        <video ref={videoRef} style={{ display: imageSrc ? 'none' : 'block' }} width="400" height="300"></video>
        <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="300"></canvas>
      </div>
      <div>
        <button onClick={startCamera} disabled={imageSrc !== null}>Start Camera</button>
        <button onClick={captureImage} style={{ display: imageSrc ? 'none' : 'block' }}>Capture Image</button>
        {imageSrc && (
          <>
            <h2>Captured Image:</h2>
            <img src={imageSrc} alt="Captured" />
          </>
        )}
      </div>
    </div>
  );
}

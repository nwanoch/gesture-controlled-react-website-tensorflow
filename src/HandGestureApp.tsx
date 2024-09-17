import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const HandGestureApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modelRef = useRef<handpose.HandPose | null>(null);
  const [gesture, setGesture] = useState<string>('No gesture detected');
  const [modelStatus, setModelStatus] = useState<string>('Not loaded');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelStatus('Loading...');
        
        // Ensure TensorFlow backend is initialized
        await tf.ready();
        
        // Load the handpose model
        modelRef.current = await handpose.load();
        
        setModelStatus('Loaded');
        console.log('Handpose model loaded successfully.');
      } catch (err) {
        console.error('Failed to load the model:', err);
        setError('Failed to load the hand detection model. Please try refreshing the page.');
        setModelStatus('Failed to load');
      }
    };

    loadModel();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  const startDetection = async () => {
    if (!videoRef.current || !modelRef.current || modelStatus !== 'Loaded') return;

    const detectHands = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        try {
          const predictions = await modelRef.current.estimateHands(videoRef.current);
          if (predictions.length > 0) {
            const hand = predictions[0];
            const thumbTip = hand.annotations.thumb[3];
            const indexTip = hand.annotations.indexFinger[3];
            const distance = Math.sqrt(
              Math.pow(thumbTip[0] - indexTip[0], 2) + 
              Math.pow(thumbTip[1] - indexTip[1], 2)
            );
            setGesture(distance < 50 ? 'Pinching' : 'Open hand');
          } else {
            setGesture('No hand detected');
          }
        } catch (err) {
          console.error('Error during hand detection:', err);
          setError('Error during hand detection. Please try again.');
        }
      }
      requestAnimationFrame(detectHands);
    };

    detectHands();
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          startDetection();
        };
      }
    } catch (err) {
      console.error('Error accessing the camera:', err);
      setError('Failed to access the camera. Please make sure you have given the necessary permissions.');
    }
  };

  return (
    <div>
      <button onClick={startVideo} disabled={modelStatus !== 'Loaded'}>
        {modelStatus === 'Loaded' ? 'Start Video' : 'Loading model...'}
      </button>
      <video
        ref={videoRef}
        style={{
          transform: 'scaleX(-1)',
          maxWidth: '100%',
          width: 640,
          height: 480,
        }}
      />
      <p>Model Status: {modelStatus}</p>
      <p>Detected Gesture: {gesture}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default HandGestureApp;
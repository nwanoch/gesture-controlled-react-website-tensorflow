import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const HandGestureApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modelRef = useRef<handpose.HandPose | null>(null);
  const [gesture, setGesture] = useState<string>('No gesture detected');
  const [modelStatus, setModelStatus] = useState<string>('Not loaded');
  const [error, setError] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const lastScrollTime = useRef<number>(0);
  const scrollSpeed = useRef<number>(0);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelStatus('Loading...');
        await tf.ready();
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
  }, []);

  const isPinching = (hand: handpose.AnnotatedPrediction): boolean => {
    const thumb = hand.annotations.thumb[3];
    const index = hand.annotations.indexFinger[3];
    const distance = Math.sqrt(
      Math.pow(thumb[0] - index[0], 2) +
      Math.pow(thumb[1] - index[1], 2) +
      Math.pow(thumb[2] - index[2], 2)
    );
    return distance < 40; // Adjust this threshold as needed
  };

  const isOpenPalm = (hand: handpose.AnnotatedPrediction): boolean => {
    const palmBase = hand.annotations.palmBase[0];
    const middleFinger = hand.annotations.middleFinger[3];
    const distance = Math.sqrt(
      Math.pow(palmBase[0] - middleFinger[0], 2) +
      Math.pow(palmBase[1] - middleFinger[1], 2) +
      Math.pow(palmBase[2] - middleFinger[2], 2)
    );
    return distance > 100; // Adjust this threshold as needed
  };

  const startDetection = async () => {
    if (!videoRef.current || !modelRef.current || modelStatus !== 'Loaded') return;

    const detectHands = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        try {
          const predictions = await modelRef.current.estimateHands(videoRef.current);
          if (predictions.length > 0) {
            const hand = predictions[0];
            
            if (isPinching(hand)) {
              setGesture('Pinching - Scrolling Down');
              scrollSpeed.current = 15;
            } else if (isOpenPalm(hand)) {
              setGesture('Open Palm - Scrolling Up');
              scrollSpeed.current = -15;
            } else {
              setGesture('Hand Detected - No Scroll');
              scrollSpeed.current = 0;
            }

            scrollPage(scrollSpeed.current);
          } else {
            setGesture('No hand detected');
            scrollSpeed.current = 0;
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

  const scrollPage = (speed: number) => {
    const now = Date.now();
    if (now - lastScrollTime.current > 50) {  // Limit scrolling to every 50ms
      window.scrollBy(0, speed);
      lastScrollTime.current = now;
      setIsScrolling(speed !== 0);
    }
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
          width: 320,
          height: 240,
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: 1000,
        }}
      />
      <p>Model Status: {modelStatus}</p>
      <p>Detected Gesture: {gesture}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ height: '2000px', padding: '20px' }}>
        <h1>Scroll me using hand gestures!</h1>
        <p>Show an open palm to the camera to scroll up.</p>
        <p>Pinch your thumb and index finger together to scroll down.</p>
        <p>Current scroll position: {window.pageYOffset}px</p>
        {isScrolling && <p style={{ color: 'green' }}>Scrolling...</p>}
      </div>
    </div>
  );
};

export default HandGestureApp;
import React, { useEffect, useRef, useState } from "react";
import HeroSection from "./components/HeroSection";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modelRef = useRef<handpose.HandPose | null>(null);
  const [modelStatus, setModelStatus] = useState<string>("Not loaded");

  const lastScrollTime = useRef<number>(0);
  const scrollSpeed = useRef<number>(0);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelStatus("Loading...");
        await tf.ready();
        modelRef.current = await handpose.load();
        setModelStatus("Loaded");
        console.log("Handpose model loaded successfully.");
      } catch (err) {
        console.error("Failed to load the model:", err);

        setModelStatus("Failed to load");
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
    if (!videoRef.current || !modelRef.current || modelStatus !== "Loaded")
      return;

    const detectHands = async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        try {
          const predictions = await modelRef?.current?.estimateHands(
            videoRef.current
          );
          if (!predictions) return;

          if (predictions.length > 0) {
            const hand = predictions[0];

            if (isPinching(hand)) {
              scrollSpeed.current = 15;
            } else if (isOpenPalm(hand)) {
              scrollSpeed.current = -15;
            } else {
              scrollSpeed.current = 0;
            }

            scrollPage(scrollSpeed.current);
          } else {
            scrollSpeed.current = 0;
          }
        } catch (err) {
          console.error("Error during hand detection:", err);
        }
      }
      requestAnimationFrame(detectHands);
    };

    detectHands();
  };

  const scrollPage = (speed: number) => {
    const now = Date.now();
    if (now - lastScrollTime.current > 50) {
      // Limit scrolling to every 50ms
      window.scrollBy(0, speed);
      lastScrollTime.current = now;
    }
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          startDetection();
        };
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  return (
    <div className="App">
      <div className="md:max-h-screen bg-gradient-to-b from-[#F8D696] to-[#EABF61]">
        <HeroSection startVideo={startVideo} modelStatus={modelStatus} />
      </div>
      <video
        ref={videoRef}
        style={{
          transform: "scaleX(-1)",
          maxWidth: "100%",
          width: 320,
          height: 240,
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 1000,
        }}
      />
      <div className="py-10 md:flex gap-x-10 px-10 md:px-20 justify-center   bg-gradient-to-b from-[#F8D696] to-[#EABF61]">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
      </div>
      <div className="py-10 md:flex gap-x-10 px-10 md:px-20 justify-center   bg-gradient-to-b from-[#F8D696] to-[#EABF61]">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
      </div>
      <div className="py-10 md:flex gap-x-10 px-10 md:px-20 justify-center   bg-gradient-to-b from-[#F8D696] to-[#EABF61]">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>{" "}
      </div>
    </div>
  );
};

export default App;

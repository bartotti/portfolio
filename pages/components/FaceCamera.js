import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

function FaceCamera() {
  const videoRef = useRef();
  const canvasRef = useRef();
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(currentStream => {
        videoRef.current.srcObject = currentStream;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 500);
  };

  return (
    <div className="bontainer">
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default FaceCamera;

// import React, { useEffect, useRef } from "react";
// import * as faceapi from "face-api.js";
// // import * as canvasRef from "canvas";

// function FaceCamera() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     async function loadModels() {
//       await Promise.all([
//         faceapi.nets.tinyFaceDetector.loadFromUri("models"),
//         faceapi.nets.faceLandmark68Net.loadFromUri("models"),
//       ]);
//     }

//     async function startWebcam() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     async function detectFaces() {
//       if (videoRef.current && canvasRef.current) {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         const context = canvas.getContext("2d");

//         faceapi.matchDimensions(canvas, {
//           height: video.height,
//           width: video.width,
//         });

//         setInterval(async () => {
//           const detections = await faceapi
//             .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//             .withFaceLandmarks();

//           const resizedDetections = faceapi.resizeResults(detections, {
//             height: video.videoHeight,
//             width: video.videoWidth,
//           });

//           context.clearRect(0, 0, canvas.width, canvas.height);
//           faceapi.draw.drawDetections(canvas, resizedDetections);
//           faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

//           console.log(detections);
//         }, 100);
//       }
//     }

//     loadModels();
//     startWebcam();
//     detectFaces();
//   }, []);

//   return (
//     <div className="bontainer">
//       <video ref={videoRef} autoPlay muted />
//       <canvas ref={canvasRef} />
//     </div>
//   );
// }

// export default FaceCamera;

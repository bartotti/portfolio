import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

function FaceCamera() {
  const [gameStarted, setGameStarted] = useState(false);
  const videoRef = useRef(null);
  //   const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const canvasRef = useRef();

  let score = 0;

  const sadThreshold = 0.03;
  const happyThreshold = 0.04;
  const angryThreshold = 0.03;

  useEffect(() => {
    if (gameStarted) {
      startVideo();
      loadModels();
    }
  }, [gameStarted]);

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

  const randomPicker = () => {
    const expressions = ["😄happy", "🙁sad", "😡angry"];
    const randomIndex = Math.floor(Math.random() * expressions.length);
    const randomExpression = expressions[randomIndex];
    setQuestion(randomExpression);

    console.log("random picker", randomExpression);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const faceMyDetect = () => {
    const video = document.getElementById("video");
    let streamStarted = false;
    let rating = [
      "Your getting closer",
      "Your doing okay",
      "Your doing greate",
    ];

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );

      faceapi.matchDimensions(canvasRef.current, {
        width: video.offsetWidth,
        height: video.offsetHeight,
      });

      const resized = faceapi.resizeResults(detections, {
        width: video.offsetWidth,
        height: video.offsetHeight,
      });

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        console.log("Expressions:", expressions);
        const { sad, happy, angry } = expressions;
        if (sad > sadThreshold) {
          score++;
          streamStarted = true;
          videoRef.current.srcObject.getTracks().forEach(track => {
            track.stop();
          });
          console.log("my name is score and im sad " + score);
          window.alert(score);
        }
        if (happy > happyThreshold) {
          score++;
          streamStarted = true;
          videoRef.current.srcObject.getTracks().forEach(track => {
            track.stop();
          });
          console.log("my name is score and im happy" + score);
          window.alert(score);
        }
        if (angry > angryThreshold) {
          score++;
          streamStarted = true;
          videoRef.current.srcObject.getTracks().forEach(track => {
            track.stop();
          });
          console.log("my name is score and im angry" + score);
          window.alert(score);
        }
      } else {
        console.log("No face detected");
      }
      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 2000);
  };

  return (
    <div className="container">
      <div>
        <div className="top">
          <div>
            <button onClick={handleStartGame}>Start Game</button>
            {gameStarted && (
              <video
                id="video"
                ref={videoRef}
                autoPlay
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            )}
            <div>
              <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaceCamera;

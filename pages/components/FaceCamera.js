import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { random } from "mathjs";
import NavBar from "../NavBar";

function FaceCamera() {
  const [gameStarted, setGameStarted] = useState(false);
  const videoRef = useRef(null);
  //   const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const canvasRef = useRef();
  const [sadExpression, setSadExpression] = useState("0.00%");
  const [happyExpression, setHappyExpression] = useState("0.00%");
  const [angryExpression, setAngryExpression] = useState("0.00%");
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

  const stopVideo = () => {
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    console.log("stopVideo i got called");
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

  const toPrecent = number => {
    const percentage = (number * 100).toFixed(2) + "%";
    return percentage;
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
    randomPicker();
  };

  const handlePlayAngin = () => {
    setGameStarted(true);
    randomPicker();
    startVideo();
  };

  const gameLogic = detections => {
    let streamStarted = false;
    let rating = [
      "Your getting closer",
      "Your doing okay",
      "Your doing greate",
    ];

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      // console.log("Expressions:", expressions);
      const { sad, happy, angry } = expressions;
      // console.log("Test Sad:", expressions.sad);
      // console.log("Test Happy:", expressions.happy);
      // console.log("Test angry:", expressions.angry);
      // console.log("Test Neutral:", expressions.neutral);
      // console.log("Test surprised:", expressions.surprised);
      // console.log("Test disgusted:", expressions.disgusted);
      const sadPercentage = toPrecent(expressions.sad);
      const happyPercetage = toPrecent(expressions.happy);
      const angryPercetage = toPrecent(expressions.angry);
      setSadExpression(sadPercentage);
      setHappyExpression(happyPercetage);
      setAngryExpression(angryPercetage);

      if (sad > sadThreshold) {
        score++;
        streamStarted = true;
        videoRef.current.srcObject.getTracks().forEach(track => {
          track.stop();
        });
        console.log("my name is score and im sad " + score);
        stopVideo();
      }
      if (happy > happyThreshold) {
        score++;
        streamStarted = true;
        videoRef.current.srcObject.getTracks().forEach(track => {
          track.stop();
        });
        stopVideo();
        console.log("my name is score and im happy" + score);
      }
      if (angry > angryThreshold) {
        score++;
        streamStarted = true;
        videoRef.current.srcObject.getTracks().forEach(track => {
          track.stop();
        });
        console.log("my name is score and im angry" + score);
        stopVideo();
      }
    } else {
      console.log("No face detected");
    }
  };

  const faceMyDetect = () => {
    const video = document.getElementById("video");

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
      gameLogic(detections);
      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 500);
  };

  return (
    <div className="container">
      <div className="top">
        <NavBar />
        <div>
          <h1>{`Try to make ${question} FacesExpression`}</h1>
          <button onClick={handleStartGame}>Start Game</button>
          <button onClick={handlePlayAngin}>play agin Game</button>
          {gameStarted && (
            <video
              id="video"
              ref={videoRef}
              autoPlay
              style={{ display: "block", width: "50%", height: "50%" }}
            />
          )}
          <div>
            <canvas
              ref={canvasRef}
              style={{ display: "none", width: "50%", height: "50%" }}
            />
            <p>Happy rate</p>
            <progress
              max="100"
              value={parseFloat(happyExpression)}
              aria-label={`Happy: ${happyExpression}`}
            >
              {happyExpression}
            </progress>
            <p>Angry rate</p>
            <progress
              max="100"
              value={parseFloat(angryExpression)}
              aria-label={`Angry: ${angryExpression}`}
            >
              {angryExpression}
            </progress>
            <p>Sad Rate</p>
            <progress
              max="100"
              value={parseFloat(sadExpression)}
              aria-label={`Sad: ${sadExpression}`}
            >
              {sadExpression}
            </progress>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaceCamera;

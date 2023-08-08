import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { random } from "mathjs";
import NavBar from "../NavBar";

function FaceCamera() {
  const [gameStarted, setGameStarted] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef();
  const [sadExpression, setSadExpression] = useState("0.00%");
  const [happyExpression, setHappyExpression] = useState("0.00%");
  const [angryExpression, setAngryExpression] = useState("0.00%");
  const [neutralExpression, setNeutralExpression] = useState("0.00%");
  const [surprisedExpression, setSurprisedExpression] = useState("0.00%");
  const [disgustedExpression, setDisgustedExpression] = useState("0.00%");

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
    // console.log("stopVideo i got called");
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

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleStopVideo = () => {
    stopVideo();
    setGameStarted(false)
  };

  const gameLogic = detections => {
    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const sadPercentage = toPrecent(expressions.sad);
      const happyPercetage = toPrecent(expressions.happy);
      const angryPercetage = toPrecent(expressions.angry);
      const neutralPercetage = toPrecent(expressions.neutral);
      const surprisedPercentage = toPrecent(expressions.surprised);
      const disgustedPercentage = toPrecent(expressions.disgusted);
      setSadExpression(sadPercentage);
      setHappyExpression(happyPercetage);
      setAngryExpression(angryPercetage);
      setNeutralExpression(neutralPercetage);
      setSurprisedExpression(surprisedPercentage);
      setDisgustedExpression(disgustedPercentage);
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
          <h1>Face detection</h1>
          <div>
            <button className="btn-calculator" onClick={handleStartGame}>
              Start FaceCam
            </button>
            <button className="btn-calculator" onClick={handleStopVideo}>
              Stop FaceCam
            </button>
            {gameStarted && (
              <video
                id="video"
                ref={videoRef}
                autoPlay
                style={{ display: "block", width: "50%", height: "50%" }}
              />
            )}
          </div>
          <div>
            <canvas
              ref={canvasRef}
              style={{ display: "none", width: "50%", height: "50%" }}
            />
            <p>Happy Rate</p>
            <progress
              max="100"
              value={parseFloat(happyExpression)}
              aria-label={`Happy: ${happyExpression}`}
            >
              {happyExpression}
            </progress>
            <p>Angry Rate</p>
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
            <p>Neutral Rate</p>
            <progress
              max="100"
              value={parseFloat(neutralExpression)}
              aria-label={`Sad: ${neutralExpression}`}
            >
              {neutralExpression}
            </progress>
            <p>Surprised Rate</p>
            <progress
              max="100"
              value={parseFloat(surprisedExpression)}
              aria-label={`Sad: ${surprisedExpression}`}
            >
              {surprisedExpression}
            </progress>
            <p>Disgusted Rate</p>
            <progress
              max="100"
              value={parseFloat(disgustedExpression)}
              aria-label={`Sad: ${disgustedExpression}`}
            >
              {disgustedExpression}
            </progress>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaceCamera;

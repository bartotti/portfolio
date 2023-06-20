import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestionAndAnswerAsync,
  selectQuestionAndAnswer,
} from "./api/store/interviewSlice";
import NavBar from "./NavBar";

function Interview() {
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [questionDisplay, setQuestionDisplay] = useState(false);

  const dispatch = useDispatch();
  const questionAndAnswer = useSelector(selectQuestionAndAnswer);
  useEffect(() => {
    dispatch(fetchQuestionAndAnswerAsync());
  }, [dispatch, buttonClicked, questionDisplay]);

  const shuffle = array => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  const handleClick = () => {
    const shuffledQeustions = shuffle([...questionAndAnswer]);
    const fourQuestions = shuffledQeustions.slice(0, 4);
    setRandomQuestions(fourQuestions);
    setButtonClicked(true);
  };

  const handleDisplayAllQuestion = () => {
    if (questionDisplay) {
      setQuestionDisplay(false);
    } else {
      dispatch(fetchQuestionAndAnswerAsync());
      setQuestionDisplay(true);
    }
  };

  return (
    <div className=".container-interview ">
      <NavBar />
      <header className="header-container">
        <div>
          <button onClick={handleClick} className="btn">
            Show Random Questions
          </button>
        </div>
        <div>
          <button onClick={handleDisplayAllQuestion} className="btn">
            Display All Questions
          </button>
        </div>
        {randomQuestions && randomQuestions.length > 0 ? (
          <div className="index-card-container">
            {randomQuestions.map(item => (
              <div key={item.id} className="index-card">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Click the button to generate random questions.</p>
        )}
        <hr className="horizontal-line" />
        <h1 style={{ paddingBottom: "10px" }}>Render all question: </h1>
        {questionDisplay &&
        questionAndAnswer &&
        questionAndAnswer.length > 0 ? (
          <div className="grid-container">
            {questionAndAnswer.map(item => (
              <div key={item.id} className="grid-item">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </header>
    </div>
  );
}

export default Interview;

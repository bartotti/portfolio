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
    <div>
      <NavBar />
      <button onClick={handleClick} className="btn btn-outline-primary">
        Show Random Questions
      </button>
      <button
        onClick={handleDisplayAllQuestion}
        className="btn btn-outline-primary"
      >
        Display All Questions
      </button>
      {randomQuestions && randomQuestions.length > 0 ? (
        randomQuestions.map(item => (
          <div key={item.id}>
            {item.question}, {item.answer}
          </div>
        ))
      ) : (
        <p>No matching event found</p>
      )}

      {questionDisplay && questionAndAnswer && questionAndAnswer.length > 0 ? (
        questionAndAnswer.map(item => (
          <div key={item.id}>
            {item.question}, {item.answer}
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Interview;

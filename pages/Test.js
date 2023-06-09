import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestionAndAnswerAsync,
  selectQuestionAndAnswer,
} from "./api/store/interviewSlice";

function Test() {
  const dispatch = useDispatch();
  const questionAndAnswer = useSelector(selectQuestionAndAnswer);

  useEffect(() => {
    dispatch(fetchQuestionAndAnswerAsync());
  }, [dispatch]);

  return (
    <div>
      {questionAndAnswer.map(item => (
        <div key={item.id}>
          {item.question},{item.answer}
        </div>
      ))}
    </div>
  );
}

export default Test;

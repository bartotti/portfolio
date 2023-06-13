import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordForm from "../components/PasswordForm";
import {
  createQuestionsAndAnswerAsync,
  fetchQuestionAndAnswerAsync,
  selectQuestionAndAnswer,
} from "../api/store/interviewSlice";

const ProtectedPage = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const questionAndAnswer = useSelector(selectQuestionAndAnswer);

  useEffect(() => {
    dispatch(fetchQuestionAndAnswerAsync());
  }, [dispatch]);

  const handleQuestionChange = e => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = e => {
    setAnswer(e.target.value);
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handleSubmit = async e => {
    dispatch(createQuestionsAndAnswerAsync({ question, answer, category }));
    setAnswer("");
    setQuestion("");
    setCategory("");
    e.preventDefault();
    const outPutMessage = `Q: ${question} \n A: ${answer} \n C: ${category}`;
    alert(outPutMessage);
  };
  const handlePasswordSubmit = password => {
    const correctPassword = process.env.NEXT_PUBLIC_PASSWORD;
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };
  return (
    <div>
      {!isAuthenticated ? (
        <PasswordForm onPasswordSubmit={handlePasswordSubmit} />
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Question:
            <input
              type="text"
              value={question}
              onChange={handleQuestionChange}
            />
          </label>
          <br />
          <label>
            Answer:
            <input type="text" value={answer} onChange={handleAnswerChange} />
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={handleCategoryChange}
            />
          </label>
          <br />
          <button type="submit">Create Question and Answer</button>
        </form>
      )}
    </div>
  );
};

export default ProtectedPage;

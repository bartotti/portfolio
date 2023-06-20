import React from "react";
import ProtectedPage from "./components/ProtectedPage";
import Counter from "./components/Counter";

function AddQuestion() {
  return (
    <div>
      <ProtectedPage /> <Counter />{" "}
    </div>
  );
}

export default AddQuestion;

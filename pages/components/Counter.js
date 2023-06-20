import React, { useState, useEffect } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);

  const handleIncreate = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api")
      .then(response => response.json())
      .then(data => setData(data.results));
  }, []);
  return (
    <div>
      <p>counter: {counter}</p>
      <button onClick={handleIncreate}>click me</button>
      {data.map((person, index) => (
        <div key={index}>
          {Object.entries(person).map(([key, value]) => (
            <p key={key}>
              {key}: {JSON.stringify(value)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Counter;

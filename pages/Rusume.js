import React from "react";

const Rusume = () => {
  return (
    <div>
      <h1>PDF Viewer</h1>
      <iframe
        src={`/XiaoleiJiang_ResumeJune2023.pdf`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default Rusume;

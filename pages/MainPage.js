import React, { useRef, useEffect } from "react";
import Footer from "./components/Footer";
import NavBar from "./NavBar";

const handleLinkedinClick = () => {
  window.open("https://www.linkedin.com/in/xiaoleijiangasd", "_blank");
};
const handleGithubClick = () => {
  window.open("https://github.com/bartotti", "_blank");
};

const MainPage = () => {
  const typedRef = useRef(null);

  const typeNextItem = () => {
    const items = ["Developer", "Freelancer", "Gamer"];
    let currentItem = 0;

    const updateTextContent = () => {
      if (typedRef.current) {
        typedRef.current.textContent = items[currentItem].trim();
        currentItem = (currentItem + 1) % items.length;
      }
    };

    updateTextContent();
    setInterval(updateTextContent, 2000);
  };

  useEffect(() => {
    typeNextItem();
  }, []);

  return (
    <div className="container">
      <div className="top">
        <NavBar />
        <section className="intro">
          <h1 className=".inline-h1">😄 Hi there, i'm Xiaolei</h1>
          <p id="intro-p">
            I'm a Full Stack web developer from New York, I enjoy building
            different kind of projects by using various APIs and libraries.
            <b>JavaScript</b>, <b>React.js</b>, and <b>Next.js</b> were the
            preferred languages and frameworks
          </p>
          <p>
            I'm on{" "}
            <img
              src="github.png"
              className="intro-img"
              onClick={handleGithubClick}
            />{" "}
            and{" "}
            <img
              className="intro-img"
              src="linkedin.png"
              onClick={handleLinkedinClick}
            />
            .
          </p>
        </section>
        <section>
          <div className="aboutme-section">
            <h2>Skills</h2>
            <ul>
              <span className="inline-it">
                <li class="progress-label">JavaScript</li>
                <progress max="100" value="82">
                  82%
                </progress>
              </span>
              <span className="inline-it">
                <li class="progress-label">C++</li>
                <progress max="100" value="45">
                  45%
                </progress>
              </span>
              <span className="inline-it">
                <li class="progress-label">Python</li>
                <progress max="100" value="50">
                  50%
                </progress>
              </span>
              <span className="inline-it">
                <li class="progress-label">Java</li>
                <progress max="100" value="59">
                  59%
                </progress>
              </span>
            </ul>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;

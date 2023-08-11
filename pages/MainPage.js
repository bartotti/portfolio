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
            <div>
              <h1 className="aboutme-h1-tag">Skills</h1>
            </div>
            <div className="large-container">
              <div className="inner-container">
                <div>
                  <h3 className="inner-h3-tag">Programming Language</h3>
                </div>
                <ul style={{ paddingLeft: "0px" }}>
                  <span className="inline-it">
                    <li class="progress-label">JavaScript</li>
                    <div className="inline-wrap">
                      <progress max="100" value="82">
                        82%
                      </progress>
                    </div>
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
              <div className="inner-divider"></div>
              <div className="inner-container">
                <div>
                  <h3 className="inner-h3-tag">Front End</h3>
                </div>
                <ul style={{ paddingLeft: "0px" }}>
                  <li class="inline-it-container">HTML</li>
                  <li class="inline-it-container">CSS</li>
                  <li class="inline-it-container">Redux</li>
                  <li class="inline-it-container">Next.js</li>
                </ul>
              </div>
              <div className="inner-divider"></div>
              <div className="inner-container">
                <div>
                  <h3 className="inner-h3-tag">Back End</h3>
                </div>
                <ul style={{ paddingLeft: "0px" }}>
                  <li class="inline-it-container">Node.js</li>
                  <li class="inline-it-container">Express</li>
                  <li class="inline-it-container">Sequelize</li>
                  <li class="inline-it-container">Postegres</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;

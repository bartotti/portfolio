import React, { useRef, useEffect } from "react";
import Test from "./Test";
import AddQuestion from "./AddQuestion";

const handleLinkedinClick = () => {
  window.open("https://www.linkedin.com/in/xiaoleijiangasd", "_blank");
};
const handleGithubClick = () => {
  window.open("www.google.com", "_blank");
};

const MainPage = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const items = typedRef.current.getAttribute("data-typed-items").split(",");
    let currentItem = 0;

    const typeNextItem = () => {
      typedRef.current.textContent = items[currentItem].trim();

      currentItem++;
      if (currentItem >= items.length) {
        currentItem = 0;
      }

      setTimeout(typeNextItem, 2000);
    };

    typeNextItem();
  }, []);

  return (
    <div className="container">
      <div>
        <AddQuestion />
        <Test />
        <div className="top">
          <div className="use-ref">
            <p>My name is Xiaolei Jiang and im </p>
            <span
              className="typed"
              data-typed-items="Developer, Freelancer, Gamer"
              ref={typedRef}
            >
              Dev
            </span>
          </div>
          <div className="main-screen-pic">
            <img id="myselfpic" src="my_self.png" alt="pic"></img>
            <div className="social-link">
              <img
                id="linkedinpic"
                src="linkedin.png"
                alt="pic"
                onClick={handleLinkedinClick}
              ></img>
              <img
                id="githubpic"
                src="github.png"
                alt="githubicon"
                onClick={handleGithubClick}
              ></img>
            </div>
            <h1>Software Enginer</h1>
            <p>
              I have a passion for tackling intricate, <br />
              ever-changing code challenges.
            </p>
          </div>
          <div className="about-me">
            <div className="about-me-content">
              <p id="about-me-description">About Me</p>
              <p id="about-me-p">
                I have always been passionate about PCs and technology, starting
                from a young age. I pursued a major in Computer Science during
                my college years and further honed my skills by completing
                Fullstack Academy's Grace Hopper Immersive Program. With a
                genuine enthusiasm for coding and software development, I am
                eager to contribute to the ever-evolving field of technology and
                make a meaningful impact.
              </p>
            </div>
            <div className="about-me-content">
              <p id="about-me-description">Areas of Expertise</p>
              <h5>Front End</h5>
              <ul>
                <li>Redux</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
              <h5>Back End</h5>
              <ul>
                <li>JavaScript</li>
                <li>NodesJS</li>
                <li>Express</li>
                <li>Sequelize</li>
                <li>Postegres</li>
                <li>SupaBase</li>
              </ul>
              <h5>Software and Platforms</h5>
              <ul>
                <li>Visual Studio code</li>
                <li>Git</li>
                <li>GitHub</li>
                <li>Postman</li>
              </ul>
            </div>
          </div>
          <div className="contact-section"></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

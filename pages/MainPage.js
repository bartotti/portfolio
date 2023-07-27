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
            I'm a Full Stack web developer from New York, I enjoy building all
            kinds of projects with different api/libraries. The preferred
            languages and framework are React.js and Next.js.
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
            <h2>Areas of Expertise</h2>
            <h5>Front End</h5>
            <ul>
              <li className="li-tag">Redux</li>
              <li className="li-tag">HTML</li>
              <li className="li-tag">CSS</li>
            </ul>
            <h5>Back End</h5>
            <ul>
              <li className="li-tag">JavaScript</li>
              <li className="li-tag">NodesJS</li>
              <li className="li-tag">Express</li>
              <li className="li-tag">Sequelize</li>
              <li className="li-tag">Postegres</li>
              <li className="li-tag">SupaBase</li>
            </ul>
            <h5>Software and Platforms</h5>
            <ul>
              <li className="li-tag">Visual Studio code</li>
              <li className="li-tag">Git</li>
              <li className="li-tag">GitHub</li>
              <li className="li-tag">Postman</li>
            </ul>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;

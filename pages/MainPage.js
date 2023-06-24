import React, { useRef, useEffect } from "react";
import Contact from "./components/Contact";
// import Footer from "./components/Footer";
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
    setInterval(updateTextContent, 3333);
  };

  useEffect(() => {
    typeNextItem();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="max-w-screen-lg mx-auto flex flex-col">
          <div className="text-center py-9">
            <p className="self-auto text-2xl sm:text-3xl font-bold">
              My name is Xiaolei Jiang im
            </p>
            <span
              ref={typedRef}
              className="self-auto text-2xl sm:text-3xl font-bold"
            >
              Dev
            </span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="my_self.png"
              alt="pic"
              className="mx-auto mb-4 rounded-3xl "
            />
            <div className="flex">
              <img
                id="linkedinpic"
                src="linkedin.png"
                alt="pic"
                className="w-6 h-6 mr-2 cursor-pointer"
                onClick={handleLinkedinClick}
              />
              <img
                id="githubpic"
                src="github.png"
                alt="githubicon"
                className="w-6 h-6 cursor-pointer"
                onClick={handleGithubClick}
              />
            </div>
            <h1 className="text-2xl font-bold mt-4">Software Engineer</h1>
            <p className="text-center">
              I have a passion for tackling intricate,
              <br />
              ever-changing code challenges.
            </p>
          </div>
        </div>
      </div>
      <Contact />
      {/* <Footer /> */}
    </div>
  );
};

export default MainPage;

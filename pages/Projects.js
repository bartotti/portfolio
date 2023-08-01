import React from "react";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import { useRouter } from "next/router";

function Projects() {
  const router = useRouter();

  const handleClickCalculator = () => {
    router.push("/Cal");
  };
  return (
    <div className="container">
      <div className="top">
        <NavBar />
        <div>
          <h1>Projects</h1>
          <p className="large-projects">
            Things i'm doing during my free time.
          </p>
        </div>
        <section className="section-top">
          <div className="project-view">
            <div className="img-container">
              <img src="project_cal.png" className="img-resize" />
            </div>
            <div className="project-detail-content">
              <p className="h2-like-css">Calculator</p>
              <p className="large-projects">
                Enter a numerical value, and the system will generate the tip
                amount based on the provided input, adhering to the order of
                operations.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Projects;
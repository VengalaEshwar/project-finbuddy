import React from "react";
import "./Home.css";
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import Hero from "../../components/Hero/Hero";
function Home() {
  return (
    <div className="home">
      <PageTransition>
        <Hero/>
      </PageTransition>
    </div>
  );
}

export default Home;

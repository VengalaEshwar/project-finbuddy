import React from "react";
import "./Home.css";
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import Hero from "../../components/Hero/Hero";
import FeatureCards from "../../components/FeatureCards/FeatureCards";
function Home() {
  return (
    <div className="home">
      <PageTransition>
        <Hero/>
        <FeatureCards/>
      </PageTransition>
    </div>
  );
}

export default Home;

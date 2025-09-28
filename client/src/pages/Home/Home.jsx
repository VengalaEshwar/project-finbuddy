import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Home.css";
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import Hero from "../../components/Hero/Hero";
import FeatureCards from "../../components/FeatureCards/FeatureCards";
import { UserDetailsContext } from "../../Context/UserDetails"; 
import toast from "react-hot-toast";
import Footer from "../../components/Footer/Footer";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://project-finbuddy.onrender.com";

function Home() {
  const { setUser } = useContext(UserDetailsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("finbuddy");

      if (!token) return; 

      try {
        const responsePromise = fetch(`${BASE_URL}/verifyToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        // Use toast.promise properly
        const response = await toast.promise(responsePromise, {
          loading: "Hold on...",
          success: "Welcome back!",
          error: "Something went wrong!",
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUser(data.user);
          console.log(data);
          // Refresh token if the server sends a new one
          if (data.token) {
            Cookies.set("finbuddy", data.token, { expires: 1, sameSite: "Strict" });
          }
        } else {
          console.warn("Token verification failed:", data.error);
          Cookies.remove("finbuddy");
          toast.error("Please login!");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    verifyToken();
  }, [setUser, navigate]); // Dependencies for useEffect

  return (
    <div className="home w-full">
      <PageTransition>
        <Hero />
        <FeatureCards />
        <Footer/>
      </PageTransition>
    </div>
  );
}

export default Home;

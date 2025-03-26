import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./LogIn.css";
import { UserDetailsContext } from "../../Context/UserDetails";

const BASE_URL = "http://localhost:5000";

function LogIn() {
  const {user,setUser} = useContext(UserDetailsContext);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("finbuddy");

      if (!token) {
        console.log("No token found, redirecting to login.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/verifyToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUser(data.user);

          // Refresh token if the server sends a new one
          if (data.token) {
            Cookies.set("finbuddy", data.token, { expires: 1, sameSite: "Strict" });
          }
          setUser(data.user);
          navigate("/");
        } else {
          console.warn("Token verification failed:", data.error);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };

    verifyToken();
  }, [setUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { emailOrUsername, password };

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        Cookies.set("finbuddy", data.token, { expires: 1, sameSite: "Strict" });
        setUser(data.user);
        navigate("/");
      } else {
        setEmailOrUsername("");
        setPassword("");
        alert(data.error || "Login failed! Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or Email"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">
            <span>Log In </span><span className="arrow">➜</span>
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}

export default LogIn;

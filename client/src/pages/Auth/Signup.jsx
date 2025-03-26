import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Cookies from 'js-cookie';
import {toast} from 'react-hot-toast';
//server url
const BASE_URL="http://localhost:5000";

import { UserDetailsContext } from "../../Context/UserDetails";

function SignUp() {
  const {user,setUser} = useContext(UserDetailsContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { username, email, password };

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
    
        Cookies.set("finbuddy", data.otpToken, { expires: 1, secure: true, sameSite: "Strict" });
        toast.success("Sign Up Success !");
        
      } else {
        console.log(data);
        toast.error("User Already Exist");
      }
    } catch (error) {
      setUsername("");
      setEmail("");
      setPassword("");
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")}>Log In</button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

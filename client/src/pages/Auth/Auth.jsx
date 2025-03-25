import React, { useState } from "react";
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
import { ArrowRight, LogIn, MoveRight, UserPlus } from "lucide-react";

function Auth() {
  const [isLoggin, setIsLoggin] = useState(true);

  return (
    <PageTransition>
      <div className="page-container flex items-center justify-center min-h-screen">
        <div className="auth-container w-full max-w-md p-6 bg-white rounded-lg">
          {/* Tab Switcher */}
          <div className="auth-tab w-full rounded-sm bg-finbuddy-softpurple/60 p-0.5 grid grid-cols-2">
            <span
              className={`m-0.5 p-2 flex items-center justify-center gap-2 cursor-pointer text-finbuddy-gray transition-all duration-300 ${
                isLoggin && "bg-finbuddy-lightpurple/30 rounded-sm text-finbuddy-purple"
              }`}
              onClick={() => setIsLoggin(true)}
            >
              <LogIn size={18} /> Login
            </span>
            <span
              className={`m-0.5 p-2 flex items-center justify-center gap-2 cursor-pointer text-finbuddy-gray transition-all duration-300 ${
                !isLoggin && "bg-finbuddy-lightpurple/30 rounded-sm text-finbuddy-purple"
              }`}
              onClick={() => setIsLoggin(false)}
            >
              <UserPlus size={18} /> Register
            </span>
          </div>

          {/* Form */}
          <div className="auth-form mt-8 rounded-sm border border-finbuddy-gray/50 p-5 w-full">
            <h1 className="text-2xl font-semibold text-gray-800 py-2">
              {isLoggin ? "Welcome Back!" : "Create an Account"}
            </h1>
            <p className="text-finbuddy-gray font-light">
              {isLoggin ? "Login to continue your financial journey" : "Sign up to get started"}
            </p>

            {/* Input Fields */}
            <div className="mt-4">
              <label htmlFor="email" className="block text-gray-600 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mt-1 border border-finbuddy-gray/50 rounded-sm focus:border-finbuddy-purple outline-none transition duration-200"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 mt-1 border border-finbuddy-gray/50 rounded-sm focus:border-finbuddy-purple outline-none transition duration-200"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full mt-6 flex items-center justify-center bg-finbuddy-purple text-white p-2 rounded-sm hover:bg-finbuddy-darkpurple transition duration-300 cursor-pointer">
              {isLoggin ? "Login" : "Register"} <ArrowRight className="ml-2 h-4 w-4 top-0.5 relative" />
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Auth;

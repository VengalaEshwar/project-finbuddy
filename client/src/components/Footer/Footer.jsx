import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-200 text-black p-6 mt-10 cursor-pointer">
      {/* Main container */}
      <div className="container mx-auto flex flex-wrap items-center justify-center text-center md:justify-between gap-8">
        
        {/* Personal Branding */}
        <div className="flex items-center space-x-4">
          <img
            src="/images/logo.jpg"
            alt="Project Logo"
            className="w-24 h-24 rounded-full"
        />
        <div>
            <h3 className="text-4xl font-semibold">FinVerse</h3>
            <p className="text-xl font-semibold">📚Your Personalized</p>
            <p className="text-xl font-semibold">Financial Learning Platform💰</p>
        </div>

        </div>
        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold hover:underline">Quick Links</h3>
          <ul className="list-none space-y-2">
            <li><a href="/" className="hover:text-gray-400 hover:underline">Home</a></li>
            <li><a href="/news" className="hover:text-gray-400 hover:underline">News</a></li>
            <li><a href="/simulators" className="hover:text-gray-400 hover:underline">Simulators</a></li>
            <li><a href="/books" className="hover:text-gray-400 hover:underline">Books</a></li>
            <li><a href="/learn" className="hover:text-gray-400 hover:underline">Learn</a></li>
            <li><a href="/career" className="hover:text-gray-400 hover:underline">Career</a></li>
            <li><a href="/profile" className="hover:text-gray-400 hover:underline">Profile</a></li>
          </ul>
        </div>

        {/* Contributors Section */}
        <div className="text-center">
          <h3 className="text-lg font-semibold hover:underline">Contributors</h3>
          <ul className="list-none space-y-1">
            <li className="hover:underline" ><a href="https://www.linkedin.com/in/eshwarvengala/" target="_blank">Eshwar Vengala</a></li>
            <li className="hover:underline" ><a href="https://www.linkedin.com/in/ankith-kumar-singh-0165b5267/" target="_blank">Ankith Kumar Singh</a></li>
            <li className="hover:underline" ><a href="https://www.linkedin.com/in/vamshi-yadav-gundelly-674023283/" target="_blank">Gundelly Vamshi Yadav</a></li>
            <li className="hover:underline" ><a href="https://www.linkedin.com/in/pragnithp/" target="_blank">Pyata Pragnith</a></li>
          </ul>
        </div>    

        {/* Contact & Social Media */}
        <div className="text-left">
          <h3 className="text-lg font-semibold hover:underline">Contact</h3>
         <p>Email:<a href="mailto:finverse@gmail.com" class="hover:underline">finverse@gmail.com</a></p>
          <p>Phone: +91 9063107027</p>

          <h3 className="text-lg font-semibold mt-4 hover:underline">Social Media</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-gray-400 hover:underline"><FaLinkedin size={24} /></a>
            <a href="https://github.com/VengalaEshwar/project-finbuddy/" target="_blank" className="hover:text-gray-400 hover:underline"><FaGithub size={24} /></a>
            <a href="#" className="hover:text-gray-400 hover:underline"><FaTwitter size={24} /></a>
          </div>
        </div>
      </div>

      {/* Legal Section */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        <p><b>&copy; 2025 FinVerse. All Rights Reserved.</b></p>
      </div>
    </footer>
  );
};

export default Footer;
import { FaEnvelope, FaPhone, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="bg-cyan-700 text-white text-sm py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-cyan-200" />
            <span>contact@clinic.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone className="text-cyan-200" />
            <span>+1 5589 55488 55</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-cyan-200">
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaFacebook /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
          <a href="#" className="hover:text-white"><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );
}
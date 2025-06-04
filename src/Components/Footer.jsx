import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { path: "/my-account", label: "My Account" },
    { path: "/help", label: "Help" },
    { path: "/contact-us", label: "Contact Us" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
  ];

  return (
    <footer className="bg-slate-700 text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {/* Brand Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">FoodieExpress</h4>
          <p className="text-sm">
            Delivering happiness to your doorstep. Fresh, fast, and fabulous food every day!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            {quickLinks.map(({ path, label }) => (
              <li key={label}>
                <Link to={path} className="hover:text-orange-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Copyright */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 text-lg">
            {socialLinks.map(({ icon, href }, index) => (
              <a key={index} href={href} className="hover:text-orange-400" aria-label="Social Media">
                {icon}
              </a>
            ))}
          </div>
          <p className="mt-2 text-sm">© 2025 FoodieExpress. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

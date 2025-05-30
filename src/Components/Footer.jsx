import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-700 text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        <div>
          <h4 className="text-lg font-semibold mb-2">FoodieExpress</h4>
          <p className="text-sm">Delivering happiness to your doorstep. Fresh, fast, and fabulous food every day!</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-orange-400">Account</a></li>
            <li><a href="#" className="hover:text-orange-400">Help</a></li>
            <li><a href="#" className="hover:text-orange-400">Cart</a></li>
            <li><a href="#" className="hover:text-orange-400">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-400"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-400"><FaInstagram /></a>
          </div>
          <p className="mt-2 text-sm">© 2025 FoodieExpress. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

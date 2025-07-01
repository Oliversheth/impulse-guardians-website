
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer = ({ setActiveSection }: FooterProps) => {
  const handleLinkClick = (section: string) => {
    setActiveSection(section);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="text-white py-12" style={{ backgroundColor: '#7C7C7C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/fc12e82d-c153-4ef3-92d4-c698a1ca2f55.png" 
                alt="NoImpulse Logo" 
                className="h-10 w-10 bg-white rounded-full p-1"
              />
              <div>
                <h3 className="text-2xl font-bold">NoImpulse</h3>
                <p className="text-gray-300">Financial Education for Students</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering students with essential personal finance skills through interactive 
              courses and AI-powered tools for a secure financial future.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/noimpulse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cerulean-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/noimpulse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cerulean-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/noimpulse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cerulean-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/noimpulse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cerulean-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')}
                  className="text-gray-300 hover:text-cerulean-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('courses')}
                  className="text-gray-300 hover:text-cerulean-400 transition-colors text-left"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('ai-assistant')}
                  className="text-gray-300 hover:text-cerulean-400 transition-colors text-left"
                >
                  Budget Bot
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="text-gray-300 hover:text-cerulean-400 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('legal')}
                  className="text-gray-300 hover:text-cerulean-400 transition-colors text-left"
                >
                  Legal Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cerulean-400" />
                <span className="text-gray-300">info@noimpulse.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-cerulean-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-cerulean-400 mt-1" />
                <span className="text-gray-300">
                  123 Education St.<br />
                  Learning City, LC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 NoImpulse. All rights reserved. | 
            <button 
              onClick={() => handleLinkClick('legal')}
              className="hover:text-cerulean-400 transition-colors ml-1"
            >
              Privacy Policy
            </button> | 
            <button 
              onClick={() => handleLinkClick('legal')}
              className="hover:text-cerulean-400 transition-colors ml-1"
            >
              Terms of Service
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

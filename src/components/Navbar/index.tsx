import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, LogOut, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../Logo';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 ml-10">
              <Link 
                to="/venues" 
                className={`${location.pathname === '/venues' ? 'text-teal-800' : 'text-teal-600'} hover:text-teal-800`}
              >
                Find Venues
              </Link>
              <Link 
                to="/how-it-works" 
                className={`${location.pathname === '/how-it-works' ? 'text-teal-800' : 'text-teal-600'} hover:text-teal-800`}
              >
                How it Works
              </Link>
              <Link 
                to="/contact" 
                className={`${location.pathname === '/contact' ? 'text-teal-800' : 'text-teal-600'} hover:text-teal-800`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-teal-600 hover:text-teal-800">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-teal-600 hover:text-teal-800"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-teal-600 hover:text-teal-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/venues" className="text-teal-600 hover:text-teal-800">
                Find Venues
              </Link>
              <Link to="/how-it-works" className="text-teal-600 hover:text-teal-800">
                How it Works
              </Link>
              <Link to="/contact" className="text-teal-600 hover:text-teal-800">
                Contact
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-teal-600 hover:text-teal-800">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 text-teal-600 hover:text-teal-800"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
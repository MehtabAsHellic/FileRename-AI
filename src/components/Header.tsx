import React from 'react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { Github, LogIn, LogOut, Loader2 } from 'lucide-react';

export function Header() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  const handleAuth = async () => {
    try {
      if (user) {
        await signOut();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">View on GitHub</span>
          </a>

          <button
            onClick={handleAuth}
            disabled={loading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
              ${user 
                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : user ? (
              <>
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In with Google</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
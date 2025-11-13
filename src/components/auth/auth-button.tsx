'use client';

import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { AuthModal } from './auth-modal';
import { UserMenu } from './user-menu';

export function AuthButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated, isLoading } = useAuth();
  
  console.log('AuthButton render - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="hidden md:block">
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <UserMenu />;
  }

  const openLogin = () => {
    console.log('Opening login modal, current state:', showAuthModal);
    setAuthMode('login');
    setShowAuthModal(true);
    console.log('Set showAuthModal to true');
  };

  const openRegister = () => {
    console.log('Opening register modal, current state:', showAuthModal);
    setAuthMode('register');
    setShowAuthModal(true);
    console.log('Set showAuthModal to true');
  };

  return (
    <>
      <div className="flex items-center space-x-2 relative z-50">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Sign In button clicked!');
            openLogin();
          }}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative z-50"
          style={{ pointerEvents: 'auto' }}
        >
          <LogIn className="w-4 h-4" />
          <span className="hidden md:inline">Sign In</span>
        </button>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Sign Up button clicked!');
            openRegister();
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm relative z-50"
          style={{ pointerEvents: 'auto' }}
        >
          <UserPlus className="w-4 h-4" />
          <span className="hidden md:inline">Sign Up</span>
        </button>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          console.log('Closing modal');
          setShowAuthModal(false);
        }}
        initialMode={authMode}
      />
    </>
  );
}
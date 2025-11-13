"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { RefreshCw, CheckCircle, QrCode, Star, Sparkles, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const API_URL = 'http://localhost:4000/api/v1/feedback';

interface FeedbackData {
  rating: number;
  comment: string;
  channel: 'In-Branch' | 'Digital' | 'ATM';
}

type PortalView = 'QR_CODE' | 'FORM' | 'THANK_YOU';

// Premium Rating Selector with smooth animations
interface RatingSelectorProps {
  rating: number;
  setRating: (r: number) => void;
  disabled: boolean;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({ rating, setRating, disabled }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const ratings = [
    { value: 1, emoji: '😢', label: 'Very Poor', color: 'from-red-500 to-red-600' },
    { value: 2, emoji: '😕', label: 'Poor', color: 'from-orange-500 to-orange-600' },
    { value: 3, emoji: '😐', label: 'Average', color: 'from-yellow-500 to-yellow-600' },
    { value: 4, emoji: '😊', label: 'Good', color: 'from-blue-500 to-blue-600' },
    { value: 5, emoji: '🤩', label: 'Excellent', color: 'from-green-500 to-green-600' }
  ];

  const handleRatingClick = (value: number) => {
    if (disabled) return;
    setIsAnimating(true);
    setRating(value);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentRating = hoveredRating || rating;
  const selectedRating = ratings.find(r => r.value === currentRating);

  return (
    <div className="relative">
      {/* Rating Label */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${selectedRating?.color || 'from-gray-500 to-gray-600'} text-white font-semibold text-lg shadow-lg transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
          <span className="text-2xl">{selectedRating?.emoji}</span>
          <span>{selectedRating?.label || 'Select Rating'}</span>
        </div>
      </div>

      {/* Rating Buttons */}
      <div className="flex justify-center gap-4 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50">
        {ratings.map((item) => (
          <button
            key={item.value}
            onClick={() => handleRatingClick(item.value)}
            onMouseEnter={() => !disabled && setHoveredRating(item.value)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={disabled}
            className={`relative group transition-all duration-300 transform ${
              rating >= item.value ? 'scale-110' : 'scale-100 hover:scale-125'
            } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}></div>
            
            {/* Emoji Button */}
            <div className={`relative w-16 h-16 flex items-center justify-center text-4xl rounded-full border-2 transition-all duration-300 ${
              rating >= item.value 
                ? `bg-gradient-to-r ${item.color} border-white shadow-2xl` 
                : 'bg-gray-700 border-gray-600 hover:border-gray-400'
            }`}>
              {item.emoji}
            </div>

            {/* Sparkle Effect */}
            {rating >= item.value && (
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Star Rating Display */}
      <div className="flex justify-center mt-4 gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 transition-all duration-200 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Premium QR Code Display
interface QRCodeDisplayProps {
  url: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps & { onBack: () => void }> = ({ url, onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md mx-auto">
        <div className={`bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <QrCode className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Scan QR Code
            </h2>
            <p className="text-gray-400">Access feedback form on mobile</p>
          </div>

          {/* QR Code Container */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <QRCodeSVG
                value={url}
                size={200}
                level="H"
                fgColor="#1f2937"
                bgColor="#ffffff"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-300">Active</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Open your camera and point it at the QR code
            </p>
            <button
              onClick={onBack}
              className="text-blue-400 hover:text-blue-300 text-sm underline"
            >
              Back to Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Premium Feedback Form
interface FeedbackFormProps {
  onSubmissionSuccess: () => void;
  onGoToQR: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmissionSuccess, onGoToQR }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [channel, setChannel] = useState<'In-Branch' | 'Digital' | 'ATM'>('In-Branch');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Connecting to backend:', API_URL);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: channel === 'In-Branch' ? 'WEB_FORM' : channel === 'Digital' ? 'IN_APP_SURVEY' : 'WEB_FORM',
          rating,
          comment: comment || undefined,
          source: 'Customer Portal',
          metadata: { channel: channel }
        }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error(`Failed to submit feedback: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Feedback submitted successfully:', result.data);
      onSubmissionSuccess();
    } catch (err) {
      console.error('Connection error:', err);
      setError('An error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [rating, comment, channel, onSubmissionSuccess]);

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="w-10 h-10 text-blue-400 mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-white mb-2">
            Share Your Feedback
          </h1>
          <p className="text-gray-400">Your experience matters to us</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-300 text-center backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-lg font-semibold text-white mb-4 text-center">
              How was your experience?
            </label>
            <RatingSelector rating={rating} setRating={setRating} disabled={loading} />
          </div>

          {/* Comment Section */}
          <div>
            <label htmlFor="comment" className="block font-medium text-gray-300 mb-3">
              Tell us more <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <div className="relative">
              <textarea
                id="comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value.substring(0, 500))}
                disabled={loading}
                className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm text-sm"
                placeholder="Share your thoughts..."
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {comment.length}/500
              </div>
            </div>
          </div>

          {/* Channel Selection */}
          <div>
            <label htmlFor="channel" className="block font-medium text-gray-300 mb-3">
              Which service?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'In-Branch', label: 'Branch Visit', icon: '🏦' },
                { value: 'Digital', label: 'Mobile App', icon: '📱' },
                { value: 'ATM', label: 'ATM Service', icon: '🏧' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setChannel(option.value as any)}
                  disabled={loading}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    channel === option.value
                      ? 'border-pink-500 bg-pink-500/20 text-white'
                      : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                loading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 active:scale-95 shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Feedback
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onGoToQR}
              className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-medium text-gray-300 bg-gray-800/50 border border-gray-600 hover:border-gray-500 transition-all duration-300"
            >
              <QrCode className="w-5 h-5" />
              Show QR Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Premium Thank You Component
const ThankYou: React.FC<{ onStartNew: () => void }> = ({ onStartNew }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setShowConfetti(true), 500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl animate-pulse"></div>
      
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-sm text-center max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <CheckCircle className="relative w-24 h-24 text-green-500 mx-auto animate-bounce" />
        </div>

        {/* Thank You Message */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Thank You!
        </h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-300 leading-relaxed">
            Your feedback has been successfully submitted and is incredibly valuable to us.
          </p>
          <p className="text-lg text-gray-400">
            We're committed to using your insights to enhance our services and create better experiences for all our customers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">✓</div>
            <div className="text-sm text-gray-400">Submitted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">24h</div>
            <div className="text-sm text-gray-400">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">100%</div>
            <div className="text-sm text-gray-400">Confidential</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onStartNew}
          className="inline-flex items-center gap-3 py-4 px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Submit Another Feedback
        </button>
      </div>
    </div>
  );
};

// Main Portal Component
const FeedbackPortal: React.FC = () => {
  const [view, setView] = useState<PortalView>('FORM');
  const [isLoaded, setIsLoaded] = useState(false);

  const qrCodeUrl = useMemo(() => {
    return 'http://localhost:3000/customer';
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'QR_CODE':
        return <QRCodeDisplay url={qrCodeUrl} onBack={() => setView('FORM')} />;
      case 'FORM':
        return (
          <FeedbackForm
            onSubmissionSuccess={() => setView('THANK_YOU')}
            onGoToQR={() => setView('QR_CODE')}
          />
        );
      case 'THANK_YOU':
        return <ThankYou onStartNew={() => setView('FORM')} />;
      default:
        return null;
    }
  };

  const getHeaderTitle = () => {
    switch (view) {
      case 'QR_CODE': return 'QR Code Portal';
      case 'THANK_YOU': return 'Feedback Received';
      default: return 'Customer Feedback';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{getHeaderTitle()}</h1>
                <p className="text-pink-100 text-sm">Wema Bank Customer Experience</p>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex gap-2">
              {['FORM', 'QR_CODE', 'THANK_YOU'].map((viewName, index) => (
                <div
                  key={viewName}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    view === viewName ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`relative z-10 p-6 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="pt-8">
          {renderContent()}
        </div>
      </main>

      {/* Back to Dashboard Link */}
      <div className="fixed bottom-4 left-4 z-20">
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-lg border border-gray-600/50 backdrop-blur-sm transition-all duration-300 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-8">
        <p className="text-gray-500 text-sm">
          © 2024 Wema Bank. Your feedback drives our excellence.
        </p>
      </div>
    </div>
  );
};

export default FeedbackPortal;
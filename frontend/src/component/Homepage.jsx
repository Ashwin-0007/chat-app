import React from 'react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-gray-900 animate-fade-in">
          Welcome to the Chat Application
        </h1>
        <p className="text-xl text-gray-600 animate-fade-in delay-100">
          Seamlessly connect and communicate with others in real-time.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 animate-fade-in delay-200"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Homepage;
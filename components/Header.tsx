
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-10 h-10 text-violet-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-500 text-transparent bg-clip-text">
          Celebrity Creator
        </h1>
        <SparklesIcon className="w-10 h-10 text-indigo-500" />
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Craft your perfect virtual influencer for any ad campaign. Define their persona and let AI bring them to life.
      </p>
    </header>
  );
};

export default Header;

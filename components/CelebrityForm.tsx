
import React from 'react';
import type { CelebrityProfile } from '../types';
import { BRAND_TYPES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface CelebrityFormProps {
  profile: CelebrityProfile;
  setProfile: React.Dispatch<React.SetStateAction<CelebrityProfile>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const CelebrityForm: React.FC<CelebrityFormProps> = ({ profile, setProfile, onSubmit, isLoading }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFollowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      followers: {
        ...prev.followers,
        [name]: parseInt(value, 10) || 0,
      }
    }));
  };

  const handleGenderChange = (gender: 'Male' | 'Female') => {
    setProfile(prev => ({ ...prev, gender }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
        <div className="flex gap-4">
          <button type="button" onClick={() => handleGenderChange('Female')} className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${profile.gender === 'Female' ? 'bg-violet-600 text-white shadow-lg' : 'bg-slate-700 hover:bg-slate-600'}`}>
            Female
          </button>
          <button type="button" onClick={() => handleGenderChange('Male')} className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${profile.gender === 'Male' ? 'bg-violet-600 text-white shadow-lg' : 'bg-slate-700 hover:bg-slate-600'}`}>
            Male
          </button>
        </div>
      </div>
      
      <div>
        <label htmlFor="origin" className="block text-sm font-medium text-slate-300 mb-2">Origin / Ethnicity</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={profile.origin}
          onChange={handleInputChange}
          className="w-full bg-slate-700 border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-violet-500 focus:border-violet-500 transition"
          placeholder="e.g., East Asian, Brazilian, etc."
        />
      </div>

      <div>
        <label htmlFor="brandType" className="block text-sm font-medium text-slate-300 mb-2">Brand Type</label>
        <select
          id="brandType"
          name="brandType"
          value={profile.brandType}
          onChange={handleInputChange}
          className="w-full bg-slate-700 border-slate-600 rounded-md py-2 px-3 text-white focus:ring-violet-500 focus:border-violet-500 transition"
        >
          {BRAND_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-4">
        <legend className="block text-sm font-medium text-slate-300 mb-2">Follower Count</legend>
        <div>
          <label htmlFor="instagram" className="block text-xs font-medium text-slate-400">Instagram</label>
          <input
            type="number"
            id="instagram"
            name="instagram"
            step="10000"
            min="0"
            value={profile.followers.instagram}
            onChange={handleFollowerChange}
            className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-violet-500 focus:border-violet-500 transition"
          />
        </div>
        <div>
          <label htmlFor="facebook" className="block text-xs font-medium text-slate-400">Facebook</label>
          <input
            type="number"
            id="facebook"
            name="facebook"
            step="10000"
            min="0"
            value={profile.followers.facebook}
            onChange={handleFollowerChange}
            className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-violet-500 focus:border-violet-500 transition"
          />
        </div>
        <div>
          <label htmlFor="tiktok" className="block text-xs font-medium text-slate-400">TikTok</label>
          <input
            type="number"
            id="tiktok"
            name="tiktok"
            step="10000"
            min="0"
            value={profile.followers.tiktok}
            onChange={handleFollowerChange}
            className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-violet-500 focus:border-violet-500 transition"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate Celebrity
          </>
        )}
      </button>
    </form>
  );
};

export default CelebrityForm;

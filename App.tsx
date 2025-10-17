
import React, { useState } from 'react';
import type { CelebrityProfile } from './types';
import { generateCelebrityImage } from './services/geminiService';
import Header from './components/Header';
import CelebrityForm from './components/CelebrityForm';
import ImageDisplay from './components/ImageDisplay';

const App: React.FC = () => {
  const [profile, setProfile] = useState<CelebrityProfile>({
    gender: 'Female',
    origin: 'Scandinavian',
    brandType: 'Luxury',
    followers: {
      instagram: 1500000,
      facebook: 500000,
      tiktok: 3000000,
    },
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const generatedImageUrl = await generateCelebrityImage(profile);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate image: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl ring-1 ring-white/10">
            <h2 className="text-2xl font-bold text-violet-400 mb-6">Define Your Influencer</h2>
            <CelebrityForm
              profile={profile}
              setProfile={setProfile}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl ring-1 ring-white/10 flex items-center justify-center min-h-[400px] lg:min-h-0">
            <ImageDisplay
              imageUrl={imageUrl}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
         <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Powered by Gemini. Create your ideal virtual celebrity for any campaign.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;


export interface CelebrityProfile {
  gender: 'Male' | 'Female';
  origin: string;
  brandType: string;
  followers: {
    instagram: number;
    facebook: number;
    tiktok: number;
  };
}

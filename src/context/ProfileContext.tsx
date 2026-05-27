import { createContext, useContext, useState, useEffect } from 'react';
import { load } from 'js-yaml';
import { Profile } from '../types';

const empty: Profile = {
  siteName: '', headerName: '', headerRole: [], headerDesc: '',
  about: '', linkedin: '', github: '', email: '', logoFull: '', logoShort: '',
};

const ProfileContext = createContext<Profile>(empty);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(empty);

  useEffect(() => {
    fetch('/content/profile.yaml')
      .then(r => r.text())
      .then(text => {
        const data = load(text) as any;
        setProfile({
          siteName:   data.siteName           ?? '',
          headerName: data.header?.name       ?? '',
          headerRole: data.header?.roles      ?? [],
          headerDesc: data.header?.description ?? '',
          about:      data.about              ?? '',
          linkedin:   data.contact?.linkedin  ?? '',
          github:     data.contact?.github    ?? '',
          email:      data.contact?.email     ?? '',
          logoFull:   data.logoFull           ?? '',
          logoShort:  data.logoShort          ?? '',
        });
      })
      .catch(console.error);
  }, []);

  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => useContext(ProfileContext);

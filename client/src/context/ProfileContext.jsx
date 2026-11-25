import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios.js';
import { fallbackProfile } from '../data/fallbackData.js';

const ProfileContext = createContext({ profile: fallbackProfile, loading: true });

export function ProfileProvider({ children }) {
  const isDev = import.meta.env.DEV;
  const [remoteProfile, setRemoteProfile] = useState(null);
  const [loading, setLoading] = useState(!isDev);

  useEffect(() => {
    if (isDev) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    api
      .get('/profile')
      .then(({ data }) => {
        if (active && data) setRemoteProfile(data);
      })
      .catch(() => {
        /* Keep the fallback profile if the API is unavailable. */
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isDev]);

  const profile = remoteProfile ? { ...fallbackProfile, ...remoteProfile } : fallbackProfile;

  return (
    <ProfileContext.Provider value={{ profile, loading }}>{children}</ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);

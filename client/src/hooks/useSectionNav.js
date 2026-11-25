import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scroll.js';

export default function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id) => {
      if (location.pathname !== '/') {
        navigate('/');
        window.setTimeout(() => scrollToSection(id), 120);
      } else {
        scrollToSection(id);
      }
    },
    [navigate, location.pathname]
  );
}

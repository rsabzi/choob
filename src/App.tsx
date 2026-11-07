import { useEffect, useState } from 'react';
import { WoodcraftStudioApp } from './woodcraft-studio/WoodcraftStudioApp';
import { AdminApp } from './woodcraft-studio/admin/AdminApp';
import { StudioProvider } from './woodcraft-studio/store/StoreContext';

function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash);
      if (!window.location.hash.startsWith('#/')) {
        // In-page anchor navigation keeps native smooth scrolling.
      }
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export function App() {
  const hash = useHashRoute();
  const isAdminRoute = hash.startsWith('#/admin');

  useEffect(() => {
    if (isAdminRoute) {
      window.scrollTo({ top: 0 });
      document.title = 'پنل مدیریت کارگاه اُرسی';
    }
  }, [isAdminRoute]);

  return (
    <StudioProvider>
      {isAdminRoute ? <AdminApp /> : <WoodcraftStudioApp />}
    </StudioProvider>
  );
}

export default App;

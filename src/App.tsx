import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/contexts/SidebarContext';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ImageGenerationPage from './pages/ImageGenerationPage';
import NotFoundPage from './pages/NotFoundPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <div className='dark'>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path='/support' element={<SupportPage />} />
            <Route path='/image-generation' element={<ImageGenerationPage />} />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

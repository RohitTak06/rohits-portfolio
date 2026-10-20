import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CloudSkyBackground from './components/pixel-perfect/CloudSkyBackground';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { useTheme } from './hooks/useTheme';

const FluidCubeScroll = lazy(() => import('./components/pixel-perfect/fluid-cube-scroll'));

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <>
        <CloudSkyBackground />
        <Suspense fallback={null}>
          <FluidCubeScroll />
        </Suspense>
        <div className="relative z-10 min-h-screen flex flex-col text-foreground transition-colors duration-300">
          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
          />

          <div className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    isResumeModalOpen={isResumeModalOpen}
                    setIsResumeModalOpen={setIsResumeModalOpen}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </>
    </BrowserRouter>
  );
};

export default App;

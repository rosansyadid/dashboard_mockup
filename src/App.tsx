import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import NotificationPanel from './components/layout/NotificationPanel';
import CommandPalette from './components/layout/CommandPalette';
import { useUIStore } from './store/uiStore';

export default function App() {
  const { isSidebarOpen, setCommandPaletteOpen, isDarkMode, toggleSidebar } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar />
      
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out w-full ml-0 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}
      >
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        <NotificationPanel />
        <CommandPalette />
      </AnimatePresence>
    </div>
  );
}

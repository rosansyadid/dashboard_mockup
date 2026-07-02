import React from 'react';
import { Search, Bell, Settings, Sun, Moon } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBar() {
  const { 
    setCommandPaletteOpen, 
    toggleNotificationPanel, 
    isDarkMode, 
    toggleDarkMode 
  } = useUIStore();
  
  const handleBellClick = () => {
    toggleNotificationPanel();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-4 glass bg-background/60 border-b border-border">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button 
          onClick={useUIStore.getState().toggleSidebar}
          className="md:hidden w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
        <div className="flex flex-col">
          <h2 className="text-lg md:text-2xl font-bold text-foreground">
            Welcome back, John
          </h2>
          <p className="text-[10px] md:text-sm text-muted-foreground mt-0.5">
            Here's what's happening today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Search / Command Palette Trigger */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            readOnly
            onClick={() => setCommandPaletteOpen(true)}
            className="w-48 lg:w-64 pl-9 pr-12 py-2 bg-secondary/50 border border-border rounded-full text-sm cursor-pointer hover:bg-secondary/80 hover:border-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Search anything..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
        
        {/* Mobile Search Button */}
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
        >
          <Search size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 hover:border-border transition-all relative overflow-hidden"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDarkMode ? 'dark' : 'light'}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Notification Bell */}
        <button
          onClick={handleBellClick}
          className="relative w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 hover:border-border transition-all"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-foreground hover:text-primary transition-colors" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background animate-pulse" />
        </button>
      </div>
    </header>
  );
}

import React from 'react';
import { Search, Bell, Mail, ChevronDown } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export default function TopBar() {
  const { 
    setCommandPaletteOpen, 
    toggleNotificationPanel 
  } = useUIStore();
  
  const handleBellClick = () => {
    toggleNotificationPanel();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-3 bg-card/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(15,23,42,0.02)]">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Hamburger */}
        <button 
          onClick={useUIStore.getState().toggleSidebar}
          className="md:hidden w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>

        {/* Search / Command Palette Trigger - Left Aligned */}
        <div className="relative hidden md:block w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            readOnly
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full pl-9 pr-16 py-1.5 bg-secondary rounded-lg text-sm cursor-pointer hover:bg-secondary/80 transition-all focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded bg-card px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
              <span>⌘</span> + F
            </kbd>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button 
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
        >
          <Search size={16} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          onClick={handleBellClick}
          className="relative w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" />
        </button>

        {/* Mail Icon */}
        <button
          className="relative w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Messages"
        >
          <Mail size={18} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
            AD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-foreground leading-none">Admin</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-none">Administrator</p>
          </div>
          <ChevronDown size={14} className="text-muted-foreground cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

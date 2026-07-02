import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, Users, BarChart3, Settings, FileText } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';

const commands = [
  { id: 'home', icon: LayoutDashboard, label: 'Go to Dashboard', path: '/dashboard' },
  { id: 'analytics', icon: BarChart3, label: 'View Analytics', path: '/analytics' },
  { id: 'customers', icon: Users, label: 'Manage Customers', path: '/customers' },
  { id: 'settings', icon: Settings, label: 'System Settings', path: '/settings' },
  { id: 'reports', icon: FileText, label: 'Generate Report', path: '/reports' },
];

export default function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return;

      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = filteredCommands[selectedIndex];
        if (cmd) {
          navigate(cmd.path);
          setCommandPaletteOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, filteredCommands, selectedIndex, navigate, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[100]"
        onClick={() => setCommandPaletteOpen(false)}
      />
      <div className="fixed inset-0 flex items-start justify-center pt-[15vh] z-[101] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-xl glass-panel rounded-xl shadow-2xl overflow-hidden pointer-events-auto border border-border/50"
        >
          <div className="flex items-center px-4 py-3 border-b border-border/50">
            <Search className="text-muted-foreground mr-3" size={18} />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent border-none text-foreground focus:outline-none placeholder:text-muted-foreground/70"
            />
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-secondary/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
              ESC
            </kbd>
          </div>

          <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
            {filteredCommands.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found for "{search}"
              </div>
            ) : (
              <div className="space-y-1">
                {filteredCommands.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      idx === selectedIndex ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-white/5'
                    }`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      navigate(cmd.path);
                      setCommandPaletteOpen(false);
                    }}
                  >
                    <cmd.icon size={16} className={`mr-3 ${idx === selectedIndex ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium">{cmd.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package, 
  MessageSquare, 
  CheckSquare, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  {
    section: 'Main',
    items: [
      { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics', path: '/analytics' },
      { id: 'customers', icon: Users, label: 'Customers', path: '/customers' },
      { id: 'orders', icon: ShoppingCart, label: 'Orders', path: '/orders', badge: 12 },
      { id: 'products', icon: Package, label: 'Products', path: '/products' },
    ],
  },
  {
    section: 'Management',
    items: [
      { id: 'messages', icon: MessageSquare, label: 'Messages', path: '/messages', badge: 5 },
      { id: 'tasks', icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    ],
  },
  {
    section: 'Settings',
    items: [
      { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
    ],
  },
];

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      className={cn(
        "fixed top-0 left-0 h-screen z-50 flex flex-col bg-card/85 backdrop-blur-xl transition-transform duration-300 ease-in-out shadow-[4px_0_30px_rgba(15,23,42,0.03)]",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-5 relative">
        <div className="flex items-center gap-3 w-full">
          {/* Blue Hexagon with S */}
          <div className="w-9 h-9 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary" fill="currentColor">
              <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
              <text x="50" y="65" fill="white" fontSize="48" fontWeight="bold" textAnchor="middle">S</text>
            </svg>
          </div>
          
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 whitespace-nowrap overflow-hidden"
            >
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                Stock<span className="text-primary font-extrabold">Wise</span>
              </h1>
            </motion.div>
          )}
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-card rounded-full items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 active:scale-95 transition-all z-50 shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer"
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {navItems.map((section, secIdx) => (
          <div key={section.section} className="space-y-1">
            {isSidebarOpen && (
              <h4 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider px-3 mb-2">
                {section.section}
              </h4>
            )}
            
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group relative",
                    isActive 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-muted-foreground hover:bg-slate-200/50 hover:text-foreground font-medium"
                  )}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  <item.icon size={18} className={cn("shrink-0 transition-transform group-hover:scale-105", isSidebarOpen ? "" : "mx-auto")} />
                  
                  {isSidebarOpen && (
                    <>
                      <span className="flex-1 whitespace-nowrap text-sm">{item.label}</span>
                      {item.badge && (
                        <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-200/50 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
            AD
          </div>
          {isSidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground truncate">Admin</div>
              <div className="text-[10px] text-muted-foreground truncate">Administrator</div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

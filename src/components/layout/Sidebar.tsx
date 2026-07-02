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
        "fixed top-0 left-0 h-screen z-50 flex flex-col border-r border-border/10 bg-background/95 md:bg-background transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-5 border-b border-border/20 relative">
        <div className="flex items-center gap-3 w-full">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] shrink-0"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            N
          </motion.div>
          
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 whitespace-nowrap overflow-hidden"
            >
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                NovaDash
              </h1>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider block -mt-1">
                Enterprise
              </span>
            </motion.div>
          )}
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-card border border-border rounded-full items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors z-50 shadow-sm"
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {navItems.map((section, idx) => (
          <div key={section.section} className={cn("mb-6 px-3", idx > 0 && "mt-6")}>
            {isSidebarOpen ? (
              <div className="text-[10px] font-bold uppercase tracking-[1.2px] text-muted-foreground px-3 mb-2">
                {section.section}
              </div>
            ) : (
              <div className="h-4"></div> /* Spacer for collapsed state */
            )}
            
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground font-medium"
                  )}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-md"
                        />
                      )}
                      
                      <item.icon size={20} className={cn("shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary" : "")} />
                      
                      {isSidebarOpen && (
                        <>
                          <span className="flex-1 whitespace-nowrap">{item.label}</span>
                          {item.badge && (
                            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                              {item.badge}
                            </span>
                          )}
                        </>
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
      <div className="p-4 border-t border-border/20">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md group-hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all">
            JD
          </div>
          {isSidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground truncate">John Doe</div>
              <div className="text-[11px] text-muted-foreground truncate">Administrator</div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

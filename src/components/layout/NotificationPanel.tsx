import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

// Mock data (will be replaced by store/dummy data later)
const notifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Critical Alert',
    message: 'Database CPU usage has exceeded 90%.',
    time: 'Just now',
    unread: true,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Warning',
    message: 'SSL certificate expires in 7 days.',
    time: '10 min ago',
    unread: true,
  },
  {
    id: 3,
    type: 'success',
    title: 'Deployment Success',
    message: 'Version 2.4.1 deployed successfully.',
    time: '30 min ago',
    unread: false,
  },
];

const iconMap = {
  alert: <AlertCircle className="text-destructive" size={18} />,
  warning: <AlertTriangle className="text-amber-500" size={18} />,
  success: <CheckCircle2 className="text-emerald-500" size={18} />,
  info: <Info className="text-blue-500" size={18} />,
};

export default function NotificationPanel() {
  const { isNotificationPanelOpen, setNotificationPanelOpen } = useUIStore();

  if (!isNotificationPanelOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/40 backdrop-blur-sm z-40"
        onClick={() => setNotificationPanelOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-4 right-4 md:right-8 w-[380px] max-w-[calc(100vw-2rem)] glass-panel rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              2 New
            </span>
          </div>
          <button
            onClick={() => setNotificationPanelOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar p-2">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative p-3 mb-1 rounded-lg flex gap-3 hover:bg-white/5 transition-colors cursor-pointer group ${
                notif.unread ? 'bg-primary/5' : ''
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {iconMap[notif.type as keyof typeof iconMap]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="text-sm font-medium text-foreground truncate pr-2">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-muted-foreground shrink-0 whitespace-nowrap">
                    {notif.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {notif.message}
                </p>
              </div>
              {notif.unread && (
                <div className="absolute top-1/2 -translate-y-1/2 right-3 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="p-3 border-t border-border/50 text-center bg-background/30">
          <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            Mark all as read
          </button>
        </div>
      </motion.div>
    </>
  );
}

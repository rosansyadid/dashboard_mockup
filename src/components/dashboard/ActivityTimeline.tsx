import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, UserPlus, Server, FileText, ArrowRight } from 'lucide-react';
import { activityFeed } from '../../lib/mockData';

const iconMap = {
  payment: CheckCircle2,
  alert: AlertTriangle,
  user: UserPlus,
  system: Server,
  report: FileText,
};

export default function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-panel rounded-3xl border border-border/40 p-5 md:p-6 flex flex-col h-full shadow-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Activity Log</h3>
          <p className="text-xs text-muted-foreground mt-1">Timeline of system events.</p>
        </div>
      </div>

      <div className="relative flex-1">
        {/* Vertical line connecting timeline items */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-border/50"></div>
        
        <div className="space-y-6 relative">
          {activityFeed.map((item, idx) => {
            const Icon = iconMap[item.type as keyof typeof iconMap] || FileText;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (idx * 0.1) }}
                className="flex gap-4 relative group cursor-default"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${item.bg} ${item.iconColor} shadow-sm`}>
                  <Icon size={18} />
                </div>
                
                <div className="pt-1 flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{item.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      <button className="mt-6 w-full py-2.5 rounded-lg bg-secondary/60 hover:bg-secondary text-sm font-medium transition-colors flex items-center justify-center gap-2">
        View Full Timeline
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

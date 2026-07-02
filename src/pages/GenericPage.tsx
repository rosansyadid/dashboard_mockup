import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export default function GenericPage({ title, description }: { title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
        <Construction size={40} className="text-primary" />
      </div>
      <h1 className="text-3xl font-extrabold text-foreground mb-3">{title}</h1>
      <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
        {description}
      </p>
      <button className="mt-8 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 font-medium rounded-full transition-colors border border-primary/20">
        Notify Me When Ready
      </button>
    </motion.div>
  );
}

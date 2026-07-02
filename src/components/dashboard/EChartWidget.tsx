import React, { useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart, HeatmapChart, RadarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
  RadarComponent,
  TitleComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';

echarts.use([
  LineChart, BarChart, PieChart, HeatmapChart, RadarChart,
  GridComponent, TooltipComponent, LegendComponent, VisualMapComponent, RadarComponent, TitleComponent,
  CanvasRenderer
]);

interface EChartWidgetProps {
  title: string;
  subtitle?: string;
  option: any;
  height?: number | string;
  delay?: number;
  className?: string;
  headerActions?: React.ReactNode;
}

export default function EChartWidget({ 
  title, 
  subtitle, 
  option, 
  height = 300, 
  delay = 0,
  className = "",
  headerActions
}: EChartWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-panel p-6 rounded-3xl shadow-sm relative ${className}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {headerActions ? (
          headerActions
        ) : (
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-white/5">
            <MoreHorizontal size={18} />
          </button>
        )}
      </div>

      <div style={{ height }} className="w-full relative">
        {/* Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 animate-pulse rounded-lg z-10">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          onEvents={{
            finished: () => setIsLoaded(true)
          }}
        />
      </div>
      
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-primary/20 pointer-events-none transition-all duration-500" />
    </motion.div>
  );
}

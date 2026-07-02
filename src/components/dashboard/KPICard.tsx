import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { cn } from '../layout/Sidebar';

echarts.use([LineChart, GridComponent, CanvasRenderer]);

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: number;
  trend: 'up' | 'down';
  sparklineData: number[];
  color: string;
  shadowColor: string;
  iconId: string;
  delay?: number;
}

const icons = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  conversion: Activity,
};

export default function KPICard({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  change, 
  trend, 
  sparklineData, 
  color, 
  shadowColor,
  iconId,
  delay = 0 
}: KPICardProps) {
  const Icon = icons[iconId as keyof typeof icons] || Activity;
  
  const formattedValue =
    suffix === '%'
      ? `${prefix}${value.toFixed(1)}${suffix}`
      : `${prefix}${value.toLocaleString()}${suffix}`;

  // ECharts Sparkline Option using primary brand colors
  const chartOption = {
    grid: { top: 5, bottom: 5, left: 0, right: 0 },
    xAxis: { type: 'category', show: false, data: [1, 2, 3, 4, 5, 6, 7] },
    yAxis: { type: 'value', show: false, min: 'dataMin' },
    series: [
      {
        data: sparklineData,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: trend === 'up' ? '#1a73e8' : '#ef4444',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: trend === 'up' ? 'rgba(26, 115, 232, 0.15)' : 'rgba(239, 68, 68, 0.15)' },
            { offset: 1, color: trend === 'up' ? 'rgba(26, 115, 232, 0)' : 'rgba(239, 68, 68, 0)' }
          ])
        },
        animationDuration: 2000,
        animationEasing: 'cubicOut',
      }
    ],
    tooltip: { show: false }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative p-5 md:p-6 rounded-3xl glass-panel overflow-hidden shadow-sm transition-all duration-300 bg-card"
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary", shadowColor)}>
          <Icon size={24} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
          trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
        )}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend === 'up' ? '+' : ''}{change}%
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-foreground tracking-tight">
            {formattedValue}
          </span>
        </div>
      </div>

      <div className="h-16 mt-4 -mx-2 -mb-2 relative z-10">
        <ReactEChartsCore
          echarts={echarts}
          option={chartOption}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </motion.div>
  );
}

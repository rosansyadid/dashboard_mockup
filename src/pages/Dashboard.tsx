import React from 'react';
import KPICard from '../components/dashboard/KPICard';
import EChartWidget from '../components/dashboard/EChartWidget';
import TransactionsTable from '../components/dashboard/TransactionsTable';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import { kpiData, revenueChartData, trafficData, radarData } from '../lib/mockData';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart, RadarChart } from 'echarts/charts';
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent, 
  RadarComponent, 
  TitleComponent 
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  LineChart, BarChart, PieChart, RadarChart,
  GridComponent, TooltipComponent, LegendComponent, RadarComponent, TitleComponent,
  CanvasRenderer
]);

export default function Dashboard() {
  // 1. Revenue Overview Chart (Line + Bar)
  const lineChartOption = {
    tooltip: { 
      trigger: 'axis', 
      backgroundColor: '#ffffff', 
      borderColor: '#e2e8f0', 
      borderWidth: 1,
      textStyle: { color: '#1e293b' } 
    },
    legend: { 
      data: ['Revenue', 'Expenses'], 
      top: 0, 
      right: 0, 
      textStyle: { color: '#64748b', fontSize: 11 }, 
      icon: 'circle' 
    },
    grid: { left: 10, right: 10, bottom: 20, top: 40, containLabel: true },
    xAxis: { 
      type: 'category', 
      data: revenueChartData.months, 
      axisLine: { show: false }, 
      axisTick: { show: false }, 
      axisLabel: { color: '#64748b', fontSize: 11 } 
    },
    yAxis: { 
      type: 'value', 
      splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, 
      axisLabel: { color: '#64748b', formatter: (val: number) => `$${val/1000}k`, fontSize: 11 } 
    },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        barWidth: '28%',
        data: revenueChartData.revenue,
        itemStyle: { color: '#1a73e8', borderRadius: [4, 4, 0, 0] },
        animationDuration: 2000,
      },
      {
        name: 'Expenses',
        type: 'bar',
        barWidth: '28%',
        data: revenueChartData.expenses,
        itemStyle: { color: '#ffca3a', borderRadius: [4, 4, 0, 0] },
        animationDuration: 2000,
        animationDelay: 200,
      }
    ]
  };

  // 2. Traffic Sources Donut Chart
  const donutOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1e293b' },
      formatter: ({ name, value, percent }: any) => `\u2022 ${name}<br/>${percent.toFixed(1)}% • $${value.toLocaleString()}`
    },
    legend: { show: false },
    series: [
      {
        name: 'Traffic Source',
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: trafficData,
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function () { return Math.random() * 200; }
      }
    ]
  };

  // 3. Department Allocation Radar Chart
  const radarOption = {
    tooltip: { 
      trigger: 'item', 
      backgroundColor: '#ffffff', 
      borderColor: '#e2e8f0', 
      borderWidth: 1,
      textStyle: { color: '#1e293b' } 
    },
    legend: { bottom: 0, left: 'center', textStyle: { color: '#64748b', fontSize: 10 }, icon: 'circle' },
    radar: {
      indicator: radarData.indicators,
      shape: 'circle',
      radius: '62%',
      center: ['50%', '45%'],
      splitArea: { show: false },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      splitLine: { lineStyle: { color: '#e2e8f0' } },
      axisName: { color: '#64748b', fontSize: 10 }
    },
    series: [
      {
        name: 'Budget vs Spending',
        type: 'radar',
        data: radarData.series,
        symbol: 'none',
        lineStyle: { width: 2 },
        areaStyle: { opacity: 0.12 },
        itemStyle: {
          color: (params: any) => params.dataIndex === 0 ? '#1a73e8' : '#60a5fa'
        },
        animationDuration: 2000,
      }
    ]
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-1">
      {/* Header Info */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary opacity-90">Overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Clean business insights
          </h1>
          <p className="max-w-2xl mt-2 text-sm text-muted-foreground">
            A calm, modern dashboard layout with balanced charts, cards, and tables for fast decision-making.
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <KPICard 
            key={kpi.id} 
            {...kpi} 
            iconId={kpi.id}
            delay={idx * 0.05}
          />
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EChartWidget 
            title="Revenue Overview" 
            subtitle="Comparing revenue and expenses over the year." 
            option={lineChartOption} 
            height={360}
            delay={0.15}
          />
        </div>
        <div>
          <EChartWidget 
            title="Traffic Sources" 
            subtitle="User acquisition channels." 
            option={donutOption} 
            height={360}
            delay={0.2}
          />
        </div>
      </div>

      {/* Tables and Secondary Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TransactionsTable />
        </div>
        <div className="space-y-6">
          <EChartWidget 
            title="Department Allocation" 
            subtitle="Budget vs actual spending." 
            option={radarOption} 
            height={280}
            delay={0.3}
          />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}

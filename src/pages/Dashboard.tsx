import React from 'react';
import KPICard from '../components/dashboard/KPICard';
import EChartWidget from '../components/dashboard/EChartWidget';
import TransactionsTable from '../components/dashboard/TransactionsTable';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import { kpiData, revenueChartData, trafficData, radarData, heatmapData } from '../lib/mockData';
import * as echarts from 'echarts/core';

export default function Dashboard() {
  // Chart configurations using mock data
  const lineChartOption = {
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(17,24,39,0.9)', borderColor: 'rgba(255,255,255,0.1)', textStyle: { color: '#f0f2f8' } },
    legend: { data: ['Revenue', 'Expenses'], top: 0, right: 0, textStyle: { color: '#8b95b5' }, icon: 'circle' },
    grid: { left: 10, right: 10, bottom: 20, top: 40, containLabel: true },
    xAxis: { type: 'category', data: revenueChartData.months, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#5a6380' } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } }, axisLabel: { color: '#5a6380', formatter: (val: number) => `$${val/1000}k` } },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        smooth: true,
        data: revenueChartData.revenue,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#3b82f6', borderColor: '#fff', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0)' }
          ])
        },
        animationDuration: 2000,
      },
      {
        name: 'Expenses',
        type: 'bar',
        barWidth: '20%',
        data: revenueChartData.expenses,
        itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] },
        animationDuration: 2000,
        animationDelay: 200,
      }
    ]
  };

  const donutOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17,24,39,0.9)',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      textStyle: { color: '#f0f2f8' },
      formatter: ({ name, value, percent }: any) => `\u2022 ${name}<br/>${percent.toFixed(1)}% • $${value.toLocaleString()}`
    },
    legend: { show: false },
    series: [
      {
        name: 'Traffic Source',
        type: 'pie',
        radius: ['44%', '72%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: { show: false }
        },
        labelLine: { show: false },
        data: trafficData,
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx: number) { return Math.random() * 200; }
      }
    ]
  };


  const radarOption = {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(17,24,39,0.9)', borderColor: 'rgba(255,255,255,0.1)', textStyle: { color: '#f0f2f8' } },
    legend: { bottom: 0, left: 'center', textStyle: { color: '#8b95b5' }, icon: 'circle' },
    radar: {
      indicator: radarData.indicators,
      shape: 'circle',
      radius: '60%',
      center: ['50%', '45%'],
      splitArea: { areaStyle: { color: ['rgba(59,130,246,0.05)', 'rgba(59,130,246,0.02)'] } },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisName: { color: '#8b95b5', fontSize: 10 }
    },
    series: [
      {
        name: 'Budget vs Spending',
        type: 'radar',
        data: radarData.series,
        symbol: 'none',
        lineStyle: { width: 2 },
        areaStyle: { opacity: 0.3 },
        itemStyle: {
          color: (params: any) => params.dataIndex === 0 ? '#3b82f6' : '#ec4899'
        },
        animationDuration: 2000,
      }
    ]
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary opacity-80">Overview</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Clean business insights
          </h1>
          <p className="max-w-2xl mt-3 text-sm text-muted-foreground sm:text-base">
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
            delay={idx * 0.1}
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
            height={380}
            delay={0.2}
          />
        </div>
        <div>
          <EChartWidget 
            title="Traffic Sources" 
            subtitle="User acquisition channels." 
            option={donutOption} 
            height={380}
            delay={0.3}
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
            delay={0.5}
          />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
}

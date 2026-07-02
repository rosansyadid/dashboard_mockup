import { useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { revenueChartData } from '../data';

echarts.use([BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const periods = ['Weekly', 'Monthly', 'Yearly'];

export default function RevenueChart() {
  const [activePeriod, setActivePeriod] = useState('Monthly');

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      textStyle: {
        color: '#f0f2f8',
        fontSize: 12,
        fontFamily: 'Inter',
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(59, 130, 246, 0.06)',
        },
      },
      formatter: function (params) {
        let result = `<div style="font-weight:700;margin-bottom:8px;">${params[0].name}</div>`;
        params.forEach((p) => {
          result += `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};"></span>
            <span>${p.seriesName}:</span>
            <span style="font-weight:700;">$${p.value.toLocaleString()}</span>
          </div>`;
        });
        return result;
      },
    },
    legend: {
      data: ['Revenue', 'Expenses'],
      top: 0,
      right: 0,
      textStyle: {
        color: '#8b95b5',
        fontSize: 12,
        fontFamily: 'Inter',
      },
      icon: 'roundRect',
      itemWidth: 12,
      itemHeight: 4,
      itemGap: 20,
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
      top: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: revenueChartData.months,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#5a6380',
        fontSize: 11,
        fontFamily: 'Inter',
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.04)',
          type: 'dashed',
        },
      },
      axisLabel: {
        color: '#5a6380',
        fontSize: 11,
        fontFamily: 'Inter',
        formatter: (val) => `$${(val / 1000).toFixed(0)}k`,
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: revenueChartData.revenue,
        barWidth: '35%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#8b5cf6' },
          ]),
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(59, 130, 246, 0.4)',
          },
        },
      },
      {
        name: 'Expenses',
        type: 'line',
        data: revenueChartData.expenses,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#f59e0b',
          width: 2.5,
        },
        itemStyle: {
          color: '#f59e0b',
          borderColor: '#1a1f35',
          borderWidth: 2,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(245, 158, 11, 0.15)' },
            { offset: 1, color: 'rgba(245, 158, 11, 0)' },
          ]),
        },
      },
    ],
    animationDuration: 1200,
    animationEasing: 'cubicInOut',
  };

  return (
    <div className="chart-card animate-in animate-delay-5" id="revenue-chart-card">
      <div className="chart-header">
        <div>
          <div className="chart-title">Revenue Overview</div>
          <div className="chart-subtitle">Revenue vs Expenses over time</div>
        </div>
        <div className="chart-actions">
          {periods.map((p) => (
            <button
              key={p}
              className={`chart-action-btn${activePeriod === p ? ' active' : ''}`}
              onClick={() => setActivePeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        style={{ height: 320 }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}

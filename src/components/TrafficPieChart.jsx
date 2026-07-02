import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { pieChartData } from '../data';

echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);

export default function TrafficPieChart() {
  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      textStyle: {
        color: '#f0f2f8',
        fontSize: 12,
        fontFamily: 'Inter',
      },
      formatter: (params) =>
        `<div style="font-weight:700;margin-bottom:4px;">${params.name}</div>
         <div style="display:flex;align-items:center;gap:6px;">
           <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${params.color};"></span>
           <span>$${params.value.toLocaleString()}</span>
           <span style="color:#5a6380;">(${params.percent}%)</span>
         </div>`,
    },
    legend: {
      orient: 'vertical',
      bottom: 0,
      left: 'center',
      textStyle: {
        color: '#8b95b5',
        fontSize: 11,
        fontFamily: 'Inter',
      },
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 10,
      formatter: (name) => {
        const item = pieChartData.find((d) => d.name === name);
        return `${name}  $${item ? item.value.toLocaleString() : ''}`;
      },
    },
    series: [
      {
        name: 'Traffic Source',
        type: 'pie',
        radius: ['48%', '72%'],
        center: ['50%', '38%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#1a1f35',
          borderWidth: 3,
        },
        label: {
          show: true,
          position: 'center',
          formatter: () => {
            const total = pieChartData.reduce((s, d) => s + d.value, 0);
            return `{total|$${(total / 1000).toFixed(1)}k}\n{label|Total Revenue}`;
          },
          rich: {
            total: {
              fontSize: 22,
              fontWeight: 800,
              color: '#f0f2f8',
              fontFamily: 'Inter',
              lineHeight: 30,
            },
            label: {
              fontSize: 11,
              color: '#5a6380',
              fontFamily: 'Inter',
            },
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.4)',
          },
          scaleSize: 6,
        },
        data: pieChartData.map((d) => ({
          name: d.name,
          value: d.value,
          itemStyle: { color: d.color },
        })),
      },
    ],
    animationDuration: 1500,
    animationEasing: 'cubicInOut',
  };

  return (
    <div className="chart-card animate-in animate-delay-6" id="pie-chart-card">
      <div className="chart-header">
        <div>
          <div className="chart-title">Traffic Sources</div>
          <div className="chart-subtitle">Revenue by acquisition channel</div>
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

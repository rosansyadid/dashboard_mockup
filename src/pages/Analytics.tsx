import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Target } from 'lucide-react';
import { 
  revenueByProduct, 
  revenueByRegion, 
  userAcquisitionData, 
  topPerformingProducts,
  detailedTransactions,
  analyticsMetrics
} from '../lib/mockData';


echarts.use([LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
}

const MetricCard = ({ label, value, change, trend, icon }: MetricCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#5799f7] p-5 rounded-2xl shadow-sm text-white"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs font-semibold text-white/80 mb-2">{label}</p>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
        {change !== undefined && (
          <div className="flex items-center gap-1.5 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-emerald-200" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-200" />
            )}
            <span className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-200' : 'text-red-200'}`}>
              {trend === 'up' ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
      <div className="text-xl text-white bg-white/20 p-2 rounded-xl shadow-sm">{icon}</div>
    </div>
  </motion.div>
);

const RevenueBreakdown = () => {
  const pieOption = {
    tooltip: { 
      trigger: 'item', 
      backgroundColor: '#ffffff', 
      borderColor: '#e2e8f0', 
      borderWidth: 1,
      textStyle: { color: '#1e293b' } 
    },
    legend: { 
      orient: 'vertical',
      left: 'left',
      textStyle: { color: '#64748b', fontSize: 11 },
      icon: 'circle'
    },
    series: [
      {
        name: 'Revenue by Product',
        type: 'pie',
        radius: ['45%', '72%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: revenueByProduct.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: {
              'Premium Plan': '#1a73e8',
              'Enterprise Plan': '#2563eb',
              'Starter Plan': '#60a5fa',
              'Add-ons': '#10b981'
            }[item.name] || '#1a73e8'
          }
        }))
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 shadow-sm bg-card"
    >
      <h3 className="text-lg font-bold text-foreground mb-6">Revenue by Product</h3>
      <ReactEChartsCore
        echarts={echarts}
        option={pieOption}
        style={{ height: '350px' }}
        opts={{ renderer: 'canvas' }}
      />
    </motion.div>
  );
};

const UserAcquisition = () => {
  const lineOption = {
    tooltip: { 
      trigger: 'axis', 
      backgroundColor: '#ffffff', 
      borderColor: '#e2e8f0', 
      borderWidth: 1,
      textStyle: { color: '#1e293b' } 
    },
    legend: { data: ['New Users', 'Active Users'], top: 0, textStyle: { color: '#64748b', fontSize: 11 }, icon: 'circle' },
    grid: { left: 10, right: 10, bottom: 20, top: 40, containLabel: true },
    xAxis: { type: 'category', data: userAcquisitionData.months, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#64748b', fontSize: 11 } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } }, axisLabel: { color: '#64748b', fontSize: 11 } },
    series: [
      {
        name: 'New Users',
        type: 'line',
        smooth: true,
        data: userAcquisitionData.newUsers,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#1a73e8' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(26, 115, 232, 0.18)' },
            { offset: 1, color: 'rgba(26, 115, 232, 0)' }
          ])
        }
      },
      {
        name: 'Active Users',
        type: 'line',
        smooth: true,
        data: userAcquisitionData.activeUsers,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#60a5fa' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(96, 165, 250, 0.18)' },
            { offset: 1, color: 'rgba(96, 165, 250, 0)' }
          ])
        }
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 shadow-sm bg-card"
    >
      <h3 className="text-lg font-bold text-foreground mb-6">User Acquisition Trends</h3>
      <ReactEChartsCore
        echarts={echarts}
        option={lineOption}
        style={{ height: '350px' }}
        opts={{ renderer: 'canvas' }}
      />
    </motion.div>
  );
};

const RevenueByRegion = () => {
  const barOption = {
    tooltip: { 
      trigger: 'axis', 
      backgroundColor: '#ffffff', 
      borderColor: '#e2e8f0', 
      borderWidth: 1,
      textStyle: { color: '#1e293b' } 
    },
    grid: { left: 10, right: 10, bottom: 20, top: 20, containLabel: true },
    xAxis: { 
      type: 'category', 
      data: revenueByRegion.map(r => r.name.split(' ')[0]),
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
        type: 'bar',
        data: revenueByRegion.map(r => r.revenue),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1a73e8' },
            { offset: 1, color: '#60a5fa' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        showBackground: true,
        backgroundStyle: { color: 'rgba(0,0,0,0.01)', borderRadius: [4, 4, 0, 0] }
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 shadow-sm bg-card"
    >
      <h3 className="text-lg font-bold text-foreground mb-6">Revenue by Region</h3>
      <ReactEChartsCore
        echarts={echarts}
        option={barOption}
        style={{ height: '300px' }}
        opts={{ renderer: 'canvas' }}
      />
    </motion.div>
  );
};

const TopProducts = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 shadow-sm bg-card"
    >
      <h3 className="text-lg font-bold text-foreground mb-6">Top Performing Products</h3>
      <div className="space-y-4">
        {topPerformingProducts.map((product, idx) => (
          <div key={product.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/40 hover:bg-secondary/80 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-muted-foreground">{idx + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.units} units sold</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-foreground">${product.revenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-xs mt-1 justify-end">
                {product.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                )}
                <span className={`font-bold text-[10px] ${product.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {product.trend === 'up' ? '+' : ''}{product.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const TransactionTable = () => {
  const statusColors = {
    completed: 'bg-emerald-500/10 text-emerald-600',
    processing: 'bg-blue-500/10 text-blue-600',
    pending: 'bg-amber-500/10 text-amber-600',
    failed: 'bg-red-500/10 text-red-600'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 shadow-sm bg-card"
    >
      <h3 className="text-lg font-bold text-foreground mb-6">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/40 text-muted-foreground">
            <tr>
              <th className="text-left py-3.5 px-4 text-xs font-semibold">ID</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold">Customer</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold">Product</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold">Amount</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold">Status</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {detailedTransactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-secondary/30 transition-colors">
                <td className="py-3.5 px-4 text-xs font-medium text-muted-foreground">{txn.id}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${txn.color} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                      {txn.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{txn.user}</p>
                      <p className="text-[10px] text-muted-foreground">{txn.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs text-foreground font-medium">{txn.product}</td>
                <td className="py-3.5 px-4 text-xs font-bold text-foreground">${txn.amount.toFixed(2)}</td>
                <td className="py-3.5 px-4">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${statusColors[txn.status as keyof typeof statusColors]}`}>
                    {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-muted-foreground">{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default function Analytics() {
  return (
    <div className="space-y-6 animate-in fade-in-50 p-1">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1 text-sm">Track revenue, user engagement, and performance metrics</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total Revenue"
          value={`$${analyticsMetrics.totalRevenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          icon={<DollarSign size={18} />}
        />
        <MetricCard 
          label="Monthly Recurring Revenue"
          value={`$${analyticsMetrics.monthlyRecurringRevenue.toLocaleString()}`}
          change={8.2}
          trend="up"
          icon={<TrendingUp size={18} />}
        />
        <MetricCard 
          label="Avg Revenue Per User"
          value={`$${analyticsMetrics.averageRevenuePerUser}`}
          change={5.1}
          trend="up"
          icon={<Activity size={18} />}
        />
        <MetricCard 
          label="Retention Rate"
          value={`${analyticsMetrics.retentionRate}%`}
          change={2.3}
          trend="up"
          icon={<Target size={18} />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueByRegion />
        <RevenueBreakdown />
      </div>

      {/* User Acquisition */}
      <UserAcquisition />

      {/* Top Products and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TopProducts />
        </div>
        <div className="lg:col-span-2">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}

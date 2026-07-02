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
  color: string;
}

const MetricCard = ({ label, value, change, trend, icon, color }: MetricCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-gradient-to-br ${color} p-6 rounded-xl backdrop-blur-sm`}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-white/70 mb-2">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {change !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={trend === 'up' ? 'text-emerald-400' : 'text-red-400'}>
              {trend === 'up' ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
      <div className="text-3xl opacity-20">{icon}</div>
    </div>
  </motion.div>
);

const RevenueBreakdown = () => {
  const pieOption = {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(17,24,39,0.9)', borderColor: 'rgba(255,255,255,0.1)', textStyle: { color: '#f0f2f8' } },
    legend: { 
      orient: 'vertical',
      left: 'left',
      textStyle: { color: '#8b95b5' },
      icon: 'circle'
    },
    series: [
      {
        name: 'Revenue by Product',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 12, fontWeight: 'bold' }
        },
        labelLine: { show: false },
        data: revenueByProduct.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: {
              'Premium Plan': '#3b82f6',
              'Enterprise Plan': '#8b5cf6',
              'Starter Plan': '#10b981',
              'Add-ons': '#f59e0b'
            }[item.name] || '#3b82f6'
          }
        }))
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Revenue by Product</h3>
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
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(17,24,39,0.9)', borderColor: 'rgba(255,255,255,0.1)', textStyle: { color: '#f0f2f8' } },
    legend: { data: ['New Users', 'Active Users'], top: 0, textStyle: { color: '#8b95b5' }, icon: 'circle' },
    grid: { left: 10, right: 10, bottom: 20, top: 40, containLabel: true },
    xAxis: { type: 'category', data: userAcquisitionData.months, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#5a6380' } },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } }, axisLabel: { color: '#5a6380' } },
    series: [
      {
        name: 'New Users',
        type: 'line',
        smooth: true,
        data: userAcquisitionData.newUsers,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#3b82f6' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.2)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0)' }
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
        itemStyle: { color: '#10b981' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(16, 185, 129, 0.2)' },
            { offset: 1, color: 'rgba(16, 185, 129, 0)' }
          ])
        }
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">User Acquisition Trends</h3>
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
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(17,24,39,0.9)', borderColor: 'rgba(255,255,255,0.1)', textStyle: { color: '#f0f2f8' } },
    grid: { left: 10, right: 10, bottom: 20, top: 20, containLabel: true },
    xAxis: { 
      type: 'category', 
      data: revenueByRegion.map(r => r.name.split(' ')[0]),
      axisLine: { show: false }, 
      axisTick: { show: false }, 
      axisLabel: { color: '#5a6380' } 
    },
    yAxis: { 
      type: 'value', 
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } }, 
      axisLabel: { color: '#5a6380', formatter: (val: number) => `$${val/1000}k` } 
    },
    series: [
      {
        type: 'bar',
        data: revenueByRegion.map(r => r.revenue),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#0ea5e9' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        showBackground: true,
        backgroundStyle: { color: 'rgba(255,255,255,0.05)', borderRadius: [4, 4, 0, 0] }
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Revenue by Region</h3>
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
      className="bg-card rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Top Performing Products</h3>
      <div className="space-y-4">
        {topPerformingProducts.map((product, idx) => (
          <div key={product.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-muted-foreground">{idx + 1}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.units} units sold</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">${product.revenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-xs mt-1">
                {product.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                )}
                <span className={product.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}>
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
    completed: 'bg-emerald-500/10 text-emerald-400',
    processing: 'bg-amber-500/10 text-amber-400',
    pending: 'bg-blue-500/10 text-blue-400',
    failed: 'bg-red-500/10 text-red-400'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">ID</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Customer</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Product</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {detailedTransactions.map((txn) => (
              <tr key={txn.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="py-3 px-4 text-xs font-medium text-muted-foreground">{txn.id}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${txn.color} flex items-center justify-center text-xs font-bold text-white`}>
                      {txn.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{txn.user}</p>
                      <p className="text-xs text-muted-foreground">{txn.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-xs text-foreground">{txn.product}</td>
                <td className="py-3 px-4 text-xs font-semibold text-foreground">${txn.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[txn.status as keyof typeof statusColors]}`}>
                    {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{txn.date}</td>
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
    <div className="space-y-6 animate-in fade-in-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground/70 dark:text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-2">Track revenue, user engagement, and performance metrics</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          label="Total Revenue"
          value={`$${analyticsMetrics.totalRevenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          icon={<DollarSign />}
          color="from-blue-500/20 to-indigo-500/20"
        />
        <MetricCard 
          label="Monthly Recurring Revenue"
          value={`$${analyticsMetrics.monthlyRecurringRevenue.toLocaleString()}`}
          change={8.2}
          trend="up"
          icon={<TrendingUp />}
          color="from-emerald-500/20 to-teal-500/20"
        />
        <MetricCard 
          label="Avg Revenue Per User"
          value={`$${analyticsMetrics.averageRevenuePerUser}`}
          change={5.1}
          trend="up"
          icon={<Activity />}
          color="from-purple-500/20 to-pink-500/20"
        />
        <MetricCard 
          label="Retention Rate"
          value={`${analyticsMetrics.retentionRate}%`}
          change={2.3}
          trend="up"
          icon={<Target />}
          color="from-orange-500/20 to-red-500/20"
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

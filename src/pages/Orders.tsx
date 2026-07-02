import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, TrendingDown, Truck, CreditCard } from 'lucide-react';
import { ordersData } from '../lib/mockData';

interface FilterState {
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  search: string;
}

const statusColors = {
  pending: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  processing: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  canceled: 'bg-red-500/10 text-red-400 border-red-500/20',
  returned: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const paymentStatusColors = {
  paid: 'bg-emerald-500/10 text-emerald-400',
  unpaid: 'bg-amber-500/10 text-amber-400',
  refunded: 'bg-blue-500/10 text-blue-400',
};

const paymentMethodLabels = {
  credit_card: 'Credit Card',
  cash_on_delivery: 'Cash on Delivery',
  paypal: 'PayPal',
};

const shippingStatusColors = {
  pending: 'text-gray-400',
  processing: 'text-blue-400',
  in_transit: 'text-amber-400',
  delivered: 'text-emerald-400',
  returned: 'text-purple-400',
  canceled: 'text-red-400',
};

export default function Orders() {
  const [filters, setFilters] = useState<FilterState>({ 
    status: 'all', 
    paymentStatus: 'all', 
    paymentMethod: 'all',
    search: '' 
  });

  const filteredOrders = ordersData.filter(order => {
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    const matchesPaymentStatus = filters.paymentStatus === 'all' || order.paymentStatus === filters.paymentStatus;
    const matchesPaymentMethod = filters.paymentMethod === 'all' || order.paymentMethod === filters.paymentMethod;
    const matchesSearch = order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesPaymentStatus && matchesPaymentMethod && matchesSearch;
  });

  const stats = {
    total: ordersData.length,
    delivered: ordersData.filter(o => o.status === 'delivered').length,
    pending: ordersData.filter(o => o.status === 'pending' || o.status === 'processing').length,
    canceled: ordersData.filter(o => o.status === 'canceled').length,
    totalRevenue: ordersData.reduce((sum, o) => sum + o.amount, 0),
  };

  return (
    <div className="space-y-6 animate-in fade-in-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">Track and manage all customer orders, payments, and shipping statuses</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <div className="bg-[#5799f7] rounded-2xl p-4 shadow-sm text-white">
          <p className="text-xs text-white/80 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#5799f7] rounded-2xl p-4 shadow-sm text-white">
          <p className="text-xs text-white/80 mb-1">Delivered</p>
          <p className="text-2xl font-bold text-white">{stats.delivered}</p>
        </div>
        <div className="bg-[#5799f7] rounded-2xl p-4 shadow-sm text-white">
          <p className="text-xs text-white/80 mb-1">Pending</p>
          <p className="text-2xl font-bold text-white">{stats.pending}</p>
        </div>
        <div className="bg-[#5799f7] rounded-2xl p-4 shadow-sm text-white">
          <p className="text-xs text-white/80 mb-1">Canceled</p>
          <p className="text-2xl font-bold text-white">{stats.canceled}</p>
        </div>
        <div className="bg-[#5799f7] rounded-2xl p-4 shadow-sm text-white">
          <p className="text-xs text-white/80 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders by ID or customer name..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
          <option value="returned">Returned</option>
        </select>
        <select
          value={filters.paymentStatus}
          onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}
          className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          <option value="all">All Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="refunded">Refunded</option>
        </select>
        <select
          value={filters.paymentMethod}
          onChange={(e) => setFilters({...filters, paymentMethod: e.target.value})}
          className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          <option value="all">All Payment Methods</option>
          <option value="credit_card">Credit Card</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
          <option value="paypal">PayPal</option>
        </select>
      </motion.div>

      {/* Orders Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Order ID</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Customer</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Items</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Amount</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Payment</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Method</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Shipping</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-foreground">{order.id}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${order.color} flex items-center justify-center text-xs font-bold text-white`}>
                        {order.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-foreground">{order.items}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-foreground">${order.amount.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[order.status as keyof typeof statusColors]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors]}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CreditCard className="w-4 h-4" />
                      {paymentMethodLabels[order.paymentMethod as keyof typeof paymentMethodLabels]}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Truck className={`w-4 h-4 ${shippingStatusColors[order.shippingStatus as keyof typeof shippingStatusColors]}`} />
                      <span className="text-sm text-foreground capitalize">{order.shippingStatus.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted-foreground">{order.orderDate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg">No orders found matching your filters</p>
        </motion.div>
      )}
    </div>
  );
}

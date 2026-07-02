import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Calendar, TrendingUp, Eye } from 'lucide-react';
import { customersData } from '../lib/mockData';

interface FilterState {
  status: string;
  search: string;
}

const statusColors = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inactive: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
};

export default function Customers() {
  const [filters, setFilters] = useState<FilterState>({ status: 'all', search: '' });
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null);

  const filteredCustomers = customersData.filter(customer => {
    const matchesStatus = filters.status === 'all' || customer.status === filters.status;
    const matchesSearch = customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         customer.email.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <p className="text-muted-foreground mt-2">Manage your customer relationships and view their order history</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers by name or email..."
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </motion.div>

      {/* Customer Cards */}
      <div className="space-y-4">
        {filteredCustomers.map((customer, idx) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors"
          >
            <button
              onClick={() => setExpandedCustomer(expandedCustomer === customer.id ? null : customer.id)}
              className="w-full text-left p-6 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${customer.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {customer.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[customer.status as keyof typeof statusColors]}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{customer.totalOrders}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-foreground">${customer.totalSpent.toFixed(2)}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Last Order</p>
                  <p className="text-sm font-semibold text-foreground">{customer.lastOrder}</p>
                </div>
              </div>
            </button>

            {/* Expanded Details */}
            {expandedCustomer === customer.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-border bg-secondary/30 p-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Customer Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Join Date</p>
                        <p className="text-sm font-medium text-foreground">{customer.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Average Order Value</p>
                        <p className="text-sm font-medium text-foreground">${(customer.totalSpent / customer.totalOrders).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Customer Status</p>
                        <p className="text-sm font-medium text-foreground capitalize">{customer.status}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Recent Orders
                    </h4>
                    <div className="space-y-2">
                      {customer.orders.slice(0, 5).map((orderId) => (
                        <div key={orderId} className="text-sm px-3 py-2 bg-card rounded border border-border text-foreground hover:border-primary/50 transition-colors cursor-pointer">
                          {orderId}
                        </div>
                      ))}
                      {customer.orders.length > 5 && (
                        <p className="text-xs text-muted-foreground pt-2">+{customer.orders.length - 5} more orders</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg">No customers found matching your filters</p>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
      >
        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Customers</p>
          <p className="text-3xl font-bold text-foreground">{customersData.length}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Active Customers</p>
          <p className="text-3xl font-bold text-foreground">{customersData.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-foreground">${customersData.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}</p>
        </div>
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Package, TrendingUp, AlertCircle } from 'lucide-react';
import { productsData } from '../lib/mockData';

interface FilterState {
  category: string;
  stock: string;
  search: string;
}

const categoryColors = {
  Services: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Plans: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const stockStatusColors = {
  in_stock: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  out_of_stock: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function Products() {
  const [filters, setFilters] = useState<FilterState>({ 
    category: 'all', 
    stock: 'all',
    search: '' 
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    const matchesStock = filters.stock === 'all' || product.status === filters.stock;
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         product.sku.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesStock && matchesSearch;
  });

  const stats = {
    total: productsData.length,
    inStock: productsData.filter(p => p.status === 'in_stock').length,
    outOfStock: productsData.filter(p => p.status === 'out_of_stock').length,
    totalRevenue: productsData.reduce((sum, p) => sum + (p.price * p.sold), 0),
  };

  const categories = ['all', ...new Set(productsData.map(p => p.category))];

  return (
    <div className="space-y-6 animate-in fade-in-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <p className="text-muted-foreground mt-2">Manage your product inventory and track stock levels</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Products</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">In Stock</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.inStock}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/20 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-red-400">{stats.outOfStock}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground">${(stats.totalRevenue / 1000).toFixed(1)}k</p>
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
            placeholder="Search products by name or SKU..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
        <select
          value={filters.stock}
          onChange={(e) => setFilters({...filters, stock: e.target.value})}
          className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          <option value="all">All Stock Status</option>
          <option value="in_stock">In Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </motion.div>

      {/* Grid View */}
      {filteredProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
            >
              {/* Product Header with Icon */}
              <div className="bg-secondary/50 p-6 text-center border-b border-border">
                <div className="text-5xl mb-4">{product.image}</div>
                <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-4">
                {/* SKU and Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded border ${categoryColors[product.category as keyof typeof categoryColors]}`}>
                    {product.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">{product.description}</p>

                {/* Price and Rating */}
                <div className="flex items-end justify-between py-3 border-y border-border">
                  <div>
                    <p className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">per unit</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stock Level</span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${stockStatusColors[product.status as keyof typeof stockStatusColors]}`}>
                      {product.status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  {/* Stock Bar */}
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((product.stock / 300) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{product.stock} units available</p>
                </div>

                {/* Sales and Revenue */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Units Sold</p>
                    <p className="text-xl font-bold text-foreground flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      {product.sold}
                    </p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                    <p className="text-xl font-bold text-foreground">${(product.price * product.sold / 1000).toFixed(1)}k</p>
                  </div>
                </div>

                {/* Stock Alert */}
                {product.stock < 50 && product.stock > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <p className="text-xs text-amber-400">Low stock warning</p>
                  </motion.div>
                )}

                {product.stock === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-xs text-red-400">Out of stock</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground text-lg">No products found matching your filters</p>
        </motion.div>
      )}
    </div>
  );
}

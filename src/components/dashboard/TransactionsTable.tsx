import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Filter, MoreHorizontal, Download, ExternalLink } from 'lucide-react';
import { recentTransactions } from '../../lib/mockData';

type SortField = 'user' | 'amount' | 'status' | 'date';
type SortOrder = 'asc' | 'desc';

export default function TransactionsTable() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredData = recentTransactions
    .filter(tx => tx.user.toLowerCase().includes(search.toLowerCase()) || tx.id.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-emerald-500/10 text-emerald-500';
      case 'pending': return 'bg-amber-500/10 text-amber-500';
      case 'processing': return 'bg-blue-500/10 text-blue-500';
      case 'failed': return 'bg-destructive/10 text-destructive';
      default: return 'bg-secondary text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full shadow-sm bg-card"
    >
      <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Recent Transactions</h3>
          <p className="text-xs text-muted-foreground mt-1">Manage and view your latest financial activity.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 hover:bg-secondary/80 transition-all w-full sm:w-48 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Filter size={16} />
          </button>
          <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-secondary/40 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort('user')}>
                <div className="flex items-center gap-1">User {sortField === 'user' && (sortOrder === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}</div>
              </th>
              <th className="px-6 py-4 font-semibold cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-1">Amount {sortField === 'amount' && (sortOrder === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}</div>
              </th>
              <th className="px-6 py-4 font-semibold cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1">Status {sortField === 'status' && (sortOrder === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}</div>
              </th>
              <th className="px-6 py-4 font-semibold cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1">Date {sortField === 'date' && (sortOrder === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}</div>
              </th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredData.map((tx, idx) => (
                <React.Fragment key={tx.id}>
                  <motion.tr
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setExpandedRow(expandedRow === tx.id ? null : tx.id)}
                    className="cursor-pointer group"
                  >
                    <td className={`px-6 py-4 transition-colors duration-200 ${expandedRow === tx.id ? 'bg-blue-50/70 rounded-tl-2xl' : 'group-hover:bg-slate-200/30'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${tx.color} shadow-sm`}>
                          {tx.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{tx.user}</div>
                          <div className="text-xs text-muted-foreground">{tx.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 font-bold text-foreground transition-colors duration-200 ${expandedRow === tx.id ? 'bg-blue-50/70' : 'group-hover:bg-slate-200/30'}`}>
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 transition-colors duration-200 ${expandedRow === tx.id ? 'bg-blue-50/70' : 'group-hover:bg-slate-200/30'}`}>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-muted-foreground transition-colors duration-200 ${expandedRow === tx.id ? 'bg-blue-50/70' : 'group-hover:bg-slate-200/30'}`}>
                      {tx.date}
                    </td>
                    <td className={`px-6 py-4 text-right transition-colors duration-200 ${expandedRow === tx.id ? 'bg-blue-50/70 rounded-tr-2xl' : 'group-hover:bg-slate-200/30'}`}>
                      <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-slate-200/50 transition-colors" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </motion.tr>
                  
                  {/* Expanded Row Content */}
                  <AnimatePresence initial={false}>
                    {expandedRow === tx.id && (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-transparent"
                      >
                        <td colSpan={5} className="p-0 bg-blue-50/70 rounded-bl-2xl rounded-br-2xl transition-colors duration-200">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:text-sm text-muted-foreground">
                                {/* Column 1: Transaction Info */}
                                <div className="space-y-2.5">
                                  <h4 className="font-bold text-foreground text-[10px] uppercase tracking-wider text-primary">Transaction Info</h4>
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between md:flex-col md:gap-0.5 lg:flex-row lg:justify-between">
                                      <span>Transaction ID:</span>
                                      <span className="font-mono font-semibold text-foreground select-all">{tx.id}</span>
                                    </div>
                                    <div className="flex justify-between md:flex-col md:gap-0.5 lg:flex-row lg:justify-between">
                                      <span>Created Date:</span>
                                      <span className="font-semibold text-foreground">{tx.date} at 10:14 UTC</span>
                                    </div>
                                    <div className="flex justify-between md:flex-col md:gap-0.5 lg:flex-row lg:justify-between">
                                      <span>Status:</span>
                                      <span className="flex items-center gap-1.5 font-bold capitalize">
                                        <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'completed' ? 'bg-emerald-500' : tx.status === 'failed' ? 'bg-destructive' : 'bg-amber-500'}`}></span>
                                        {tx.status}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Column 2: Payment & Security */}
                                <div className="space-y-2.5">
                                  <h4 className="font-bold text-foreground text-[10px] uppercase tracking-wider text-primary">Payment & Security</h4>
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between md:flex-col md:gap-0.5 lg:flex-row lg:justify-between">
                                      <span>Method:</span>
                                      <span className="font-semibold text-foreground flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-muted-foreground shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                                        Visa ending in 4242
                                      </span>
                                    </div>
                                    <div className="flex justify-between md:flex-col md:gap-0.5 lg:flex-row lg:justify-between">
                                      <span>IP Address:</span>
                                      <span className="font-mono font-semibold text-foreground">192.168.1.1</span>
                                    </div>
                                    <div className="flex justify-between md:flex-col md:gap-0.5 lg:flex-row lg:justify-between">
                                      <span>Location:</span>
                                      <span className="font-semibold text-foreground">Jakarta, ID</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Column 3: Actions */}
                                <div className="space-y-2.5 flex flex-col justify-between">
                                  <div>
                                    <h4 className="font-bold text-foreground text-[10px] uppercase tracking-wider text-primary">Quick Actions</h4>
                                    <p className="text-[11px] text-muted-foreground mt-1 leading-normal">Download transaction receipts or check digital audit trails.</p>
                                  </div>
                                  <div className="flex flex-row gap-2 mt-4 md:mt-0">
                                    <button className="flex-1 px-3 py-2.5 bg-primary text-white text-[11px] font-bold rounded-lg hover:bg-primary/95 transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-primary/10 cursor-pointer">
                                      <Download size={12} />
                                      Invoice
                                    </button>
                                    <button className="flex-1 px-3 py-2.5 bg-primary text-white text-[11px] font-bold rounded-lg hover:bg-primary/95 transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-primary/10 cursor-pointer">
                                      <ExternalLink size={12} />
                                      Receipt
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      <div className="p-4 text-center mt-auto">
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer">
          View all transactions
        </button>
      </div>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Filter, MoreHorizontal, Download } from 'lucide-react';
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
      case 'completed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'failed': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-secondary text-muted-foreground border-border';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel rounded-3xl border border-border/40 overflow-hidden flex flex-col h-full shadow-sm"
    >
      <div className="p-5 md:p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              className="pl-9 pr-4 py-2 bg-background/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full sm:w-48"
            />
          </div>
          <button className="p-2 bg-background/50 border border-border/50 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground">
            <Filter size={16} />
          </button>
          <button className="p-2 bg-background/50 border border-border/50 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-background/30 text-muted-foreground border-b border-border/50">
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
          <tbody className="divide-y divide-border/30">
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
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${tx.color} shadow-lg`}>
                          {tx.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{tx.user}</div>
                          <div className="text-xs text-muted-foreground">{tx.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-white/10 transition-colors" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </motion.tr>
                  
                  {/* Expanded Row Content */}
                  <AnimatePresence>
                    {expandedRow === tx.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-background/20"
                      >
                        <td colSpan={5} className="px-6 py-4">
                          <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
                            <div><strong>Transaction ID:</strong> {tx.id}</div>
                            <div><strong>Payment Method:</strong> Visa ending in 4242</div>
                            <div><strong>IP Address:</strong> 192.168.1.1</div>
                            <button className="text-primary hover:underline font-medium">View Receipt →</button>
                          </div>
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
      
      <div className="p-4 border-t border-border/50 text-center mt-auto">
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View all transactions
        </button>
      </div>
    </motion.div>
  );
}

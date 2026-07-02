import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, CheckCircle2, Clock, AlertTriangle, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { tasksData } from '../lib/mockData';

interface FilterState {
  status: string;
  priority: string;
  search: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'urgent' | 'success' | 'info';
}

export default function Tasks() {
  const [tasks, setTasks] = useState(tasksData);
  const [filters, setFilters] = useState<FilterState>({ status: 'all', priority: 'all', search: '' });
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type']) => {
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), message, type }]);
  };

  useEffect(() => {
    const now = new Date();
    const dueSoon = tasks.filter((task) => {
      const due = new Date(task.dueDate).getTime();
      const diff = due - now.getTime();
      return !task.completed && diff > 0 && diff <= 48 * 60 * 60 * 1000;
    });
    const overdue = tasks.filter((task) => !task.completed && new Date(task.dueDate).getTime() < now.getTime());

    if (overdue.length > 0) {
      addToast(`${overdue.length} overdue task${overdue.length > 1 ? 's' : ''} need immediate attention`, 'urgent');
    } else if (dueSoon.length > 0) {
      addToast(`${dueSoon.length} task${dueSoon.length > 1 ? 's' : ''} due within 48 hours`, 'info');
    }
  }, [tasks]);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.project.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.owner.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleStatusChange = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed, status: task.completed ? 'in_progress' : 'completed' } : task
      )
    );
    const toggledTask = tasks.find((task) => task.id === taskId);
    if (toggledTask) {
      addToast(
        `${toggledTask.title} marked as ${toggledTask.completed ? 'in progress' : 'completed'}.`,
        toggledTask.completed ? 'info' : 'success'
      );
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'in_progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'review':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'blocked':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-secondary text-muted-foreground border-border';
    }
  };

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-400';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400';
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400';
      default:
        return 'bg-secondary text-muted-foreground';
    }
  };

  const dueLabel = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.round((due.getTime() - now.getTime()) / (1000 * 60 * 60));
    if (diff < 0) return 'Overdue';
    if (diff <= 24) return 'Today';
    if (diff <= 48) return 'Tomorrow';
    return due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const summary = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    dueSoon: tasks.filter((task) => !task.completed && new Date(task.dueDate).getTime() - new Date().getTime() <= 48 * 60 * 60 * 1000 && new Date(task.dueDate).getTime() > new Date().getTime()).length,
    overdue: tasks.filter((task) => !task.completed && new Date(task.dueDate).getTime() < new Date().getTime()).length,
  };

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <AnimatePresence>
        <div className="fixed top-24 right-6 z-50 space-y-3">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              className={`rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl ${
                toast.type === 'urgent'
                  ? 'bg-red-500/15 border-red-500/30 text-red-400'
                  : toast.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-blue-500/15 border-blue-500/30 text-blue-400'
              }`}
            >
              <div className="flex items-center gap-3">
                {toast.type === 'urgent' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                <p className="text-sm font-medium">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary opacity-80">Tasks</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Team task board</h1>
          <p className="max-w-2xl mt-3 text-sm text-muted-foreground sm:text-base">
            Track active work, review completed items, and get deadline alerts for anything due soon.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-3xl border border-border/30 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.24em] mb-2">Total tasks</p>
          <p className="text-3xl font-bold text-foreground">{summary.total}</p>
        </div>
        <div className="glass-panel rounded-3xl border border-border/30 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.24em] mb-2">Completed</p>
          <p className="text-3xl font-bold text-emerald-400">{summary.completed}</p>
        </div>
        <div className="glass-panel rounded-3xl border border-border/30 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.24em] mb-2">Due soon</p>
          <p className="text-3xl font-bold text-amber-400">{summary.dueSoon}</p>
        </div>
        <div className="glass-panel rounded-3xl border border-border/30 p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.24em] mb-2">Overdue</p>
          <p className="text-3xl font-bold text-red-400">{summary.overdue}</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-border/30 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Task list</h2>
            <p className="text-sm text-muted-foreground mt-1">View status, assign ownership, and keep deadlines visible.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-3 bg-background/80 border border-border rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filters.status}
                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                className="px-4 py-3 bg-background/80 border border-border rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="all">All Status</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
                <option value="blocked">Blocked</option>
              </select>
              <select
                value={filters.priority}
                onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
                className="px-4 py-3 bg-background/80 border border-border rounded-2xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="all">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="bg-background/80 border-b border-border">
              <tr>
                <th className="px-5 py-4 font-semibold text-muted-foreground uppercase tracking-[0.18em]">Task</th>
                <th className="px-5 py-4 font-semibold text-muted-foreground uppercase tracking-[0.18em]">Project</th>
                <th className="px-5 py-4 font-semibold text-muted-foreground uppercase tracking-[0.18em]">Owner</th>
                <th className="px-5 py-4 font-semibold text-muted-foreground uppercase tracking-[0.18em]">Priority</th>
                <th className="px-5 py-4 font-semibold text-muted-foreground uppercase tracking-[0.18em]">Due</th>
                <th className="px-5 py-4 font-semibold text-muted-foreground uppercase tracking-[0.18em]">Status</th>
                <th className="px-5 py-4 font-semibold text-muted-foreground uppercase tracking-[0.18em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {filteredTasks.map((task, idx) => {
                const due = new Date(task.dueDate);
                const isOverdue = !task.completed && due.getTime() < new Date().getTime();
                const isDueSoon = !task.completed && due.getTime() - new Date().getTime() <= 48 * 60 * 60 * 1000 && due.getTime() > new Date().getTime();

                return (
                  <React.Fragment key={task.id}>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-background/80 transition-colors cursor-pointer"
                      onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                    >
                      <td className="px-5 py-4 align-top">
                        <div className="font-semibold text-foreground">{task.title}</div>
                        <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                      </td>
                      <td className="px-5 py-4 align-top text-foreground">{task.project}</td>
                      <td className="px-5 py-4 align-top text-foreground">{task.owner}</td>
                      <td className="px-5 py-4 align-top">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${priorityColor(task.priority)}`}>{task.priority}</span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div>{dueLabel(task.dueDate)}</div>
                            <div className="text-xs text-muted-foreground">{due.toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor(task.status)}`}>{task.status.replace('_', ' ')}</span>
                        {isOverdue && <span className="ml-2 text-xs text-red-400">● overdue</span>}
                        {isDueSoon && <span className="ml-2 text-xs text-amber-400">● due soon</span>}
                      </td>
                      <td className="px-5 py-4 align-top text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleStatusChange(task.id);
                          }}
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                            task.completed
                              ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15'
                              : 'bg-primary/10 text-primary hover:bg-primary/15'
                          }`}
                        >
                          {task.completed ? 'Reopen' : 'Complete'}
                          {task.completed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </td>
                    </motion.tr>

                    <AnimatePresence>
                      {expandedTask === task.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-background/80"
                        >
                          <td colSpan={7} className="px-5 py-4 border-t border-border/20">
                            <div className="grid gap-4 md:grid-cols-3 text-sm text-muted-foreground">
                              <div>
                                <p className="font-semibold text-foreground mb-2">Team</p>
                                <p>{task.team}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-foreground mb-2">Checklist</p>
                                <p>{task.checklist}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-foreground mb-2">Notes</p>
                                <p>{task.notes}</p>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTasks.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-amber-400" />
          <p className="text-muted-foreground text-lg">No matching tasks found. Update your filters or add a new task.</p>
        </motion.div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, Clock, CheckCircle, X, Bell } from 'lucide-react';
import { messagesData } from '../lib/mockData';

interface Toast {
  id: number;
  message: string;
  type: 'urgent' | 'success' | 'info';
}

interface Message {
  id: number;
  sender: string;
  avatar: string;
  color: string;
  role: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isUrgent: boolean;
  reason: string | null;
  attachment: string | null;
}

interface ComposeState {
  recipient: string;
  message: string;
  isUrgent: boolean;
  urgentReason: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showCompose, setShowCompose] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [compose, setCompose] = useState<ComposeState>({
    recipient: '',
    message: '',
    isUrgent: false,
    urgentReason: ''
  });

  // Auto-dismiss toasts
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = (message: string, type: 'urgent' | 'success' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const markAsRead = (messageId: number) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
    setSelectedMessage(messageId);
  };

  const sendMessage = () => {
    if (!compose.recipient.trim() || !compose.message.trim()) {
      addToast('Please fill in all required fields', 'info');
      return;
    }

    if (compose.isUrgent && !compose.urgentReason.trim()) {
      addToast('Please provide a reason for marking as urgent', 'info');
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      avatar: 'ME',
      color: 'bg-blue-600',
      role: 'Manager',
      message: compose.message,
      timestamp: new Date().toISOString(),
      isRead: false,
      isUrgent: compose.isUrgent,
      reason: compose.isUrgent ? compose.urgentReason : null,
      attachment: null
    };

    setMessages(prev => [newMessage, ...prev]);
    
    if (compose.isUrgent) {
      addToast(`🔴 URGENT MESSAGE SENT to ${compose.recipient}: ${compose.urgentReason}`, 'urgent');
    } else {
      addToast(`Message sent to ${compose.recipient}`, 'success');
    }

    setCompose({
      recipient: '',
      message: '',
      isUrgent: false,
      urgentReason: ''
    });
    setShowCompose(false);
  };

  // Sort messages: urgent unread first, then by timestamp
  const sortedMessages = [...messages].sort((a, b) => {
    if (a.isUrgent && !a.isRead && (!b.isUrgent || b.isRead)) return -1;
    if ((!a.isUrgent || a.isRead) && (b.isUrgent && !b.isRead)) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const unreadUrgentCount = messages.filter(m => m.isUrgent && !m.isRead).length;
  const unreadCount = messages.filter(m => !m.isRead).length;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-in fade-in-50">
      {/* Header with Bell Notification */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-2">Team communication and urgent notifications</p>
        </div>
        
        {/* Bell Notification */}
        {unreadUrgentCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <div className="relative p-3 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full border border-red-500/30">
              <Bell className="w-6 h-6 text-red-400" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"
              />
            </div>
            <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full text-xs font-bold text-white">
              {unreadUrgentCount}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Toast Notifications */}
      <AnimatePresence>
        <div className="fixed top-24 right-6 space-y-3 z-50">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`px-6 py-4 rounded-lg border flex items-center gap-3 max-w-md shadow-lg backdrop-blur-sm ${
                toast.type === 'urgent'
                  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                  : toast.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                  : 'bg-blue-500/20 border-blue-500/50 text-blue-400'
              }`}
            >
              {toast.type === 'urgent' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
              <span className="text-sm font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Compose Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setShowCompose(!showCompose)}
        className="w-full px-6 py-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
      >
        {showCompose ? 'Cancel' : '+ New Message'}
      </motion.button>

      {/* Compose Message Form */}
      <AnimatePresence>
        {showCompose && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-xl border border-border p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">Compose Message</h3>
            
            <input
              type="text"
              placeholder="Recipient name..."
              value={compose.recipient}
              onChange={(e) => setCompose({...compose, recipient: e.target.value})}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <textarea
              placeholder="Type your message..."
              value={compose.message}
              onChange={(e) => setCompose({...compose, message: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />

            {/* Urgent Option */}
            <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg border border-border">
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={compose.isUrgent}
                  onChange={(e) => setCompose({...compose, isUrgent: e.target.checked})}
                  className="w-5 h-5 accent-red-500"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    Mark as Urgent
                  </p>
                  <p className="text-xs text-muted-foreground">Recipient will receive urgent notification</p>
                </div>
              </label>
            </div>

            {/* Urgent Reason */}
            {compose.isUrgent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-foreground">Reason for urgency *</label>
                <textarea
                  placeholder="Explain why this message is urgent..."
                  value={compose.urgentReason}
                  onChange={(e) => setCompose({...compose, urgentReason: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </motion.div>
            )}

            {/* Send Button */}
            <button
              onClick={sendMessage}
              className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages List */}
      <div className="space-y-3">
        {sortedMessages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => markAsRead(msg.id)}
            className={`rounded-xl border transition-all cursor-pointer group ${
              msg.isRead
                ? 'bg-card border-border'
                : 'bg-secondary/50 border-primary/30 hover:border-primary/50'
            } ${msg.isUrgent && !msg.isRead ? 'ring-2 ring-red-500/30' : ''}`}
          >
            <div className="p-6 space-y-4">
              {/* Message Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full ${msg.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {msg.avatar}
                  </div>

                  {/* Sender Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-foreground">{msg.sender}</h3>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {msg.role}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center gap-3">
                  {msg.isUrgent && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-semibold text-red-400">URGENT</span>
                    </motion.div>
                  )}
                  {!msg.isRead && (
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  )}
                  {msg.isRead && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>

              {/* Message Content */}
              <p className="text-foreground">{msg.message}</p>

              {/* Urgent Reason */}
              {msg.isUrgent && msg.reason && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/10 border-l-4 border-red-500 rounded"
                >
                  <p className="text-xs font-semibold text-red-400 mb-1">URGENT REASON:</p>
                  <p className="text-sm text-foreground">{msg.reason}</p>
                </motion.div>
              )}

              {/* Attachment */}
              {msg.attachment && (
                <div className="p-3 bg-secondary rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-colors">
                  <span className="text-lg">📎</span>
                  <span className="text-sm text-foreground">{msg.attachment}</span>
                </div>
              )}
            </div>

            {/* Expanded Details */}
            {selectedMessage === msg.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-border bg-secondary/50 p-4 text-xs text-muted-foreground space-y-2"
              >
                <p><strong>Message ID:</strong> #{msg.id}</p>
                <p><strong>Full Timestamp:</strong> {new Date(msg.timestamp).toLocaleString()}</p>
                <p><strong>Status:</strong> {msg.isRead ? '✓ Read' : '◯ Unread'}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
      >
        <div className="bg-[#5799f7] rounded-2xl p-6 shadow-sm text-white">
          <p className="text-sm text-white/80 mb-2">Total Messages</p>
          <p className="text-3xl font-bold text-white">{messages.length}</p>
        </div>
        <div className="bg-[#5799f7] rounded-2xl p-6 shadow-sm text-white">
          <p className="text-sm text-white/80 mb-2">Urgent Messages</p>
          <p className="text-3xl font-bold text-white">{messages.filter(m => m.isUrgent).length}</p>
        </div>
        <div className="bg-[#5799f7] rounded-2xl p-6 shadow-sm text-white">
          <p className="text-sm text-white/80 mb-2">Unread Messages</p>
          <p className="text-3xl font-bold text-white">{unreadCount}</p>
        </div>
      </motion.div>
    </div>
  );
}

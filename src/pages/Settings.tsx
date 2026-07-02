import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, ShieldCheck, Sun, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!saveSuccess) return;
    const timer = window.setTimeout(() => setSaveSuccess(false), 2500);
    return () => window.clearTimeout(timer);
  }, [saveSuccess]);

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary opacity-80">Settings</p>
        <h1 className="text-3xl font-bold text-foreground">Workspace preferences</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Control theme, notifications, and security settings for the dashboard.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl border border-border/20 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-foreground">Theme</p>
              <p className="text-xs text-muted-foreground mt-1">Switch between light and dark mode for the dashboard.</p>
            </div>
            <div className="text-3xl text-primary">
              {isDarkMode ? <Moon /> : <Sun />}
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5"
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl border border-border/20 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground mt-1">Control alert preferences for task updates and urgent messages.</p>
            </div>
            <div className="text-3xl text-amber-500">
              <Bell />
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-4">
              <div>
                <p className="font-medium text-foreground">Enable notifications</p>
                <p className="text-xs text-muted-foreground">Receive dashboard alerts and reminders.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="h-5 w-5 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-4">
              <div>
                <p className="font-medium text-foreground">Security alerts</p>
                <p className="text-xs text-muted-foreground">Get notified for account or system security events.</p>
              </div>
              <input
                type="checkbox"
                checked={securityAlerts}
                onChange={(e) => setSecurityAlerts(e.target.checked)}
                className="h-5 w-5 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-4">
              <div>
                <p className="font-medium text-foreground">Auto updates</p>
                <p className="text-xs text-muted-foreground">Keep dashboard features and widgets current.</p>
              </div>
              <input
                type="checkbox"
                checked={autoUpdates}
                onChange={(e) => setAutoUpdates(e.target.checked)}
                className="h-5 w-5 accent-primary"
              />
            </label>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl border border-border/20 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-foreground">Security</p>
              <p className="text-xs text-muted-foreground mt-1">Review access and password settings.</p>
            </div>
            <div className="text-3xl text-emerald-500">
              <ShieldCheck />
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="rounded-2xl border border-border p-4">
              <p className="font-semibold text-foreground">Last password update</p>
              <p className="text-xs text-muted-foreground mt-1">2 months ago</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="font-semibold text-foreground">Multi-factor authentication</p>
              <p className="text-xs text-muted-foreground mt-1">Enabled for your account.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSaveSuccess(true)}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            <CheckCircle2 size={16} /> Save settings
          </button>

          {saveSuccess && (
            <p className="mt-4 text-sm text-emerald-400">Settings saved successfully.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

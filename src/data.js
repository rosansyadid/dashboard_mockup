// Dummy data for the dashboard

export const statsData = [
  {
    id: 'revenue',
    icon: '💰',
    label: 'Total Revenue',
    value: '$48,295',
    change: '+12.5%',
    trend: 'up',
  },
  {
    id: 'users',
    icon: '👥',
    label: 'Active Users',
    value: '3,842',
    change: '+8.2%',
    trend: 'up',
  },
  {
    id: 'orders',
    icon: '📦',
    label: 'Total Orders',
    value: '1,256',
    change: '-2.4%',
    trend: 'down',
  },
  {
    id: 'growth',
    icon: '🚀',
    label: 'Growth Rate',
    value: '23.6%',
    change: '+4.1%',
    trend: 'up',
  },
];

export const revenueChartData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  revenue: [4200, 5800, 4900, 7200, 6300, 8100, 7500, 9200, 8400, 10500, 9800, 12400],
  expenses: [3100, 3800, 3400, 4200, 3900, 4800, 4400, 5100, 4700, 5800, 5200, 6100],
};

export const pieChartData = [
  { name: 'Direct Sales', value: 4350, color: '#3b82f6' },
  { name: 'Affiliate', value: 2890, color: '#8b5cf6' },
  { name: 'Organic Search', value: 2100, color: '#10b981' },
  { name: 'Social Media', value: 1680, color: '#f59e0b' },
  { name: 'Email Marketing', value: 1200, color: '#ec4899' },
];

export const transactionsData = [
  {
    id: 1,
    user: { name: 'Sophia Chen', email: 'sophia@example.com', initials: 'SC', color: '#3b82f6' },
    amount: '$2,450.00',
    status: 'completed',
    date: 'Jul 1, 2026',
  },
  {
    id: 2,
    user: { name: 'Marcus Johnson', email: 'marcus@example.com', initials: 'MJ', color: '#8b5cf6' },
    amount: '$890.50',
    status: 'pending',
    date: 'Jun 30, 2026',
  },
  {
    id: 3,
    user: { name: 'Aria Patel', email: 'aria@example.com', initials: 'AP', color: '#10b981' },
    amount: '$1,200.00',
    status: 'completed',
    date: 'Jun 29, 2026',
  },
  {
    id: 4,
    user: { name: 'Liam O\'Brien', email: 'liam@example.com', initials: 'LO', color: '#f59e0b' },
    amount: '$3,100.00',
    status: 'in-progress',
    date: 'Jun 28, 2026',
  },
  {
    id: 5,
    user: { name: 'Elena Rodriguez', email: 'elena@example.com', initials: 'ER', color: '#ec4899' },
    amount: '$675.00',
    status: 'cancelled',
    date: 'Jun 27, 2026',
  },
];

export const activityData = [
  {
    id: 1,
    icon: '📊',
    color: 'blue',
    text: '<strong>Monthly report</strong> has been generated and is ready for review.',
    time: '2 minutes ago',
  },
  {
    id: 2,
    icon: '✅',
    color: 'green',
    text: '<strong>Sophia Chen</strong> completed a payment of $2,450.00',
    time: '15 minutes ago',
  },
  {
    id: 3,
    icon: '⚠️',
    color: 'orange',
    text: 'Server load reached <strong>85%</strong> — consider scaling up.',
    time: '1 hour ago',
  },
  {
    id: 4,
    icon: '🎉',
    color: 'purple',
    text: '<strong>New milestone!</strong> Active users exceeded 3,800.',
    time: '3 hours ago',
  },
  {
    id: 5,
    icon: '🔴',
    color: 'red',
    text: '<strong>API rate limit</strong> reached on endpoint /v2/analytics.',
    time: '5 hours ago',
  },
];

export const notificationsData = [
  {
    id: 1,
    type: 'alert',
    icon: '🔴',
    title: 'Critical Alert',
    body: 'Database CPU usage has exceeded 90%. Immediate attention required to prevent service degradation.',
    time: 'Just now',
    unread: true,
  },
  {
    id: 2,
    type: 'warning',
    icon: '⚠️',
    title: 'Warning',
    body: 'SSL certificate for api.novadash.io expires in 7 days. Renew soon to avoid downtime.',
    time: '10 min ago',
    unread: true,
  },
  {
    id: 3,
    type: 'success',
    icon: '✅',
    title: 'Success',
    body: 'Deployment v2.4.1 completed successfully. All health checks passing.',
    time: '30 min ago',
    unread: true,
  },
  {
    id: 4,
    type: 'info',
    icon: 'ℹ️',
    title: 'Info',
    body: 'Scheduled maintenance window: July 5, 2026 at 02:00 UTC. Expected downtime: 15 minutes.',
    time: '1 hour ago',
    unread: false,
  },
  {
    id: 5,
    type: 'alert',
    icon: '🔴',
    title: 'Alert',
    body: 'Unusual login activity detected from IP 192.168.45.12. Multiple failed attempts recorded.',
    time: '2 hours ago',
    unread: false,
  },
  {
    id: 6,
    type: 'info',
    icon: 'ℹ️',
    title: 'Info',
    body: 'New team member Marcus Johnson has been added to the Engineering workspace.',
    time: '4 hours ago',
    unread: false,
  },
];

export const sidebarNavItems = [
  {
    section: 'Main',
    items: [
      { id: 'dashboard', icon: '📊', label: 'Dashboard', active: true },
      { id: 'analytics', icon: '📈', label: 'Analytics' },
      { id: 'customers', icon: '👥', label: 'Customers' },
      { id: 'orders', icon: '🛒', label: 'Orders', badge: 12 },
      { id: 'products', icon: '📦', label: 'Products' },
    ],
  },
  {
    section: 'Management',
    items: [
      { id: 'messages', icon: '💬', label: 'Messages', badge: 5 },
      { id: 'calendar', icon: '📅', label: 'Calendar' },
      { id: 'tasks', icon: '✅', label: 'Tasks' },
      { id: 'files', icon: '📁', label: 'File Manager' },
    ],
  },
  {
    section: 'Settings',
    items: [
      { id: 'settings', icon: '⚙️', label: 'Settings' },
      { id: 'help', icon: '❓', label: 'Help Center' },
    ],
  },
];

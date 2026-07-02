export const kpiData = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: 128450,
    prefix: '$',
    change: 12.5,
    trend: 'up',
    sparklineData: [42, 45, 52, 48, 58, 62, 70],
    color: 'from-blue-600 to-sky-500',
    shadowColor: 'shadow-blue-500/20'
  },
  {
    id: 'users',
    title: 'Active Users',
    value: 24892,
    change: 8.2,
    trend: 'up',
    sparklineData: [20, 22, 21, 24, 25, 28, 30],
    color: 'from-blue-500 to-teal-400',
    shadowColor: 'shadow-blue-500/20'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: 8439,
    change: -2.4,
    trend: 'down',
    sparklineData: [85, 80, 82, 78, 75, 76, 72],
    color: 'from-amber-500 to-orange-400',
    shadowColor: 'shadow-orange-500/20'
  },
  {
    id: 'conversion',
    title: 'Conversion Rate',
    value: 4.8,
    suffix: '%',
    change: 1.1,
    trend: 'up',
    sparklineData: [3.5, 3.8, 3.9, 4.1, 4.3, 4.6, 4.8],
    color: 'from-sky-500 to-indigo-400',
    shadowColor: 'shadow-indigo-500/20'
  }
];

export const revenueChartData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  revenue: [42000, 58000, 49000, 72000, 63000, 81000, 75000, 92000, 84000, 105000, 98000, 124000],
  expenses: [31000, 38000, 34000, 42000, 39000, 48000, 44000, 51000, 47000, 58000, 52000, 61000],
};

export const trafficData = [
  { name: 'Organic Search', value: 45000, color: '#1a73e8' },
  { name: 'Direct', value: 32000, color: '#2563eb' },
  { name: 'Social Media', value: 21000, color: '#3b82f6' },
  { name: 'Referral', value: 15000, color: '#60a5fa' },
  { name: 'Email', value: 8000, color: '#93c5fd' },
];

export const radarData = {
  indicators: [
    { name: 'Sales', max: 100 },
    { name: 'Marketing', max: 100 },
    { name: 'Development', max: 100 },
    { name: 'Support', max: 100 },
    { name: 'Administration', max: 100 },
    { name: 'IT', max: 100 }
  ],
  series: [
    {
      name: 'Allocated Budget',
      value: [42, 30, 92, 35, 20, 15]
    },
    {
      name: 'Actual Spending',
      value: [50, 14, 28, 26, 42, 21]
    }
  ]
};

export const heatmapData = (() => {
  const days = ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'];
  const hours = Array.from({length: 24}, (_, i) => `${i}h`);
  const data = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 24; j++) {
      data.push([j, i, Math.floor(Math.random() * 100)]);
    }
  }
  return { days, hours, data };
})();

export const recentTransactions = [
  { id: 'TRX-9382', user: 'Emma Watson', email: 'emma@example.com', avatar: 'EW', color: 'bg-pink-500', amount: 1250.00, status: 'completed', date: '2026-07-01' },
  { id: 'TRX-9381', user: 'James Smith', email: 'james@example.com', avatar: 'JS', color: 'bg-blue-500', amount: 840.50, status: 'pending', date: '2026-07-01' },
  { id: 'TRX-9380', user: 'Olivia Davis', email: 'olivia@example.com', avatar: 'OD', color: 'bg-emerald-500', amount: 3200.00, status: 'completed', date: '2026-06-30' },
  { id: 'TRX-9379', user: 'Noah Garcia', email: 'noah@example.com', avatar: 'NG', color: 'bg-amber-500', amount: 450.00, status: 'failed', date: '2026-06-30' },
  { id: 'TRX-9378', user: 'Sophia Lee', email: 'sophia@example.com', avatar: 'SL', color: 'bg-purple-500', amount: 1850.75, status: 'completed', date: '2026-06-29' },
  { id: 'TRX-9377', user: 'Liam Wilson', email: 'liam@example.com', avatar: 'LW', color: 'bg-indigo-500', amount: 920.00, status: 'processing', date: '2026-06-29' },
  { id: 'TRX-9376', user: 'Mia Taylor', email: 'mia@example.com', avatar: 'MT', color: 'bg-rose-500', amount: 2100.00, status: 'completed', date: '2026-06-28' },
];

export const activityFeed = [
  { id: 1, type: 'payment', title: 'Payment Received', description: 'Received $3,200.00 from Olivia Davis.', time: '2 hours ago', iconColor: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 2, type: 'alert', title: 'Server Warning', description: 'CPU usage spiked to 92% on prod-cluster-01.', time: '4 hours ago', iconColor: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 3, type: 'user', title: 'New User Registration', description: 'Emma Watson joined the platform.', time: '5 hours ago', iconColor: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 4, type: 'system', title: 'System Update', description: 'Dashboard v3.0 deployed successfully.', time: '1 day ago', iconColor: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 5, type: 'report', title: 'Weekly Report', description: 'Q2 performance report is ready for download.', time: '2 days ago', iconColor: 'text-pink-500', bg: 'bg-pink-500/10' },
];

// Analytics data
export const revenueByProduct = [
  { name: 'Premium Plan', value: 45000, percentage: 35 },
  { name: 'Enterprise Plan', value: 38500, percentage: 30 },
  { name: 'Starter Plan', value: 25950, percentage: 20 },
  { name: 'Add-ons', value: 19000, percentage: 15 },
];

export const revenueByRegion = [
  { name: 'North America', revenue: 52000, users: 9200, percentage: 40 },
  { name: 'Europe', revenue: 39000, users: 6800, percentage: 30 },
  { name: 'Asia Pacific', revenue: 26000, users: 5400, percentage: 20 },
  { name: 'Rest of World', revenue: 11450, users: 3492, percentage: 10 },
];

export const userAcquisitionData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  newUsers: [1200, 1850, 1520, 2100, 2450, 2800, 3100, 3500, 3200, 3800, 4200, 4892],
  activeUsers: [8200, 9500, 10100, 11200, 12400, 13800, 15100, 16800, 18000, 19500, 21200, 24892],
  churnRate: [2.5, 2.3, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.8, 1.5, 1.4, 1.2],
};

export const topPerformingProducts = [
  { id: 1, name: 'Premium Cloud Storage', revenue: 28000, units: 450, rating: 4.9, trend: 'up', change: 12.5 },
  { id: 2, name: 'Advanced Analytics Suite', revenue: 24500, units: 380, rating: 4.8, trend: 'up', change: 8.2 },
  { id: 3, name: 'API Integration Pack', revenue: 18200, units: 290, rating: 4.7, trend: 'down', change: -2.1 },
  { id: 4, name: 'Security Pro', revenue: 15800, units: 220, rating: 4.6, trend: 'up', change: 5.4 },
  { id: 5, name: 'White Label Solution', revenue: 12950, units: 180, rating: 4.5, trend: 'up', change: 3.2 },
];

export const detailedTransactions = [
  { id: 'TRX-9400', user: 'Emma Watson', email: 'emma@example.com', avatar: 'EW', color: 'bg-pink-500', amount: 1250.00, product: 'Premium Plan', status: 'completed', date: '2026-07-01', type: 'subscription' },
  { id: 'TRX-9399', user: 'James Smith', email: 'james@example.com', avatar: 'JS', color: 'bg-blue-500', amount: 840.50, product: 'Starter Plan', status: 'completed', date: '2026-07-01', type: 'subscription' },
  { id: 'TRX-9398', user: 'Olivia Davis', email: 'olivia@example.com', avatar: 'OD', color: 'bg-emerald-500', amount: 3200.00, product: 'Enterprise Plan', status: 'completed', date: '2026-07-01', type: 'subscription' },
  { id: 'TRX-9397', user: 'Noah Garcia', email: 'noah@example.com', avatar: 'NG', color: 'bg-amber-500', amount: 450.00, product: 'Add-on: Extra Storage', status: 'completed', date: '2026-07-01', type: 'addon' },
  { id: 'TRX-9396', user: 'Sophia Lee', email: 'sophia@example.com', avatar: 'SL', color: 'bg-purple-500', amount: 1850.75, product: 'Premium Plan', status: 'completed', date: '2026-06-30', type: 'subscription' },
  { id: 'TRX-9395', user: 'Liam Wilson', email: 'liam@example.com', avatar: 'LW', color: 'bg-indigo-500', amount: 920.00, product: 'Starter Plan', status: 'processing', date: '2026-06-30', type: 'subscription' },
  { id: 'TRX-9394', user: 'Mia Taylor', email: 'mia@example.com', avatar: 'MT', color: 'bg-rose-500', amount: 2100.00, product: 'Enterprise Plan', status: 'completed', date: '2026-06-30', type: 'subscription' },
  { id: 'TRX-9393', user: 'Ava Martinez', email: 'ava@example.com', avatar: 'AM', color: 'bg-cyan-500', amount: 1500.00, product: 'Premium Plan', status: 'completed', date: '2026-06-29', type: 'subscription' },
];

export const analyticsMetrics = {
  totalRevenue: 128450,
  monthlyRecurringRevenue: 42150,
  averageRevenuePerUser: 5.15,
  customerLifetimeValue: 3850,
  churnRate: 1.2,
  retentionRate: 98.8,
  netMonthlyGrowth: 8.5,
};

// Customers Data
export const customersData = [
  { id: 1, name: 'Emma Watson', email: 'emma@example.com', avatar: 'EW', color: 'bg-pink-500', totalOrders: 5, totalSpent: 6250.00, status: 'active', joinDate: '2026-01-15', lastOrder: '2026-07-01', orders: ['ORD-001', 'ORD-005', 'ORD-012', 'ORD-018', 'ORD-025'] },
  { id: 2, name: 'James Smith', email: 'james@example.com', avatar: 'JS', color: 'bg-blue-500', totalOrders: 3, totalSpent: 2520.50, status: 'active', joinDate: '2026-02-20', lastOrder: '2026-07-01', orders: ['ORD-002', 'ORD-009', 'ORD-020'] },
  { id: 3, name: 'Olivia Davis', email: 'olivia@example.com', avatar: 'OD', color: 'bg-emerald-500', totalOrders: 8, totalSpent: 15800.00, status: 'active', joinDate: '2025-11-10', lastOrder: '2026-07-01', orders: ['ORD-003', 'ORD-008', 'ORD-015', 'ORD-021', 'ORD-026', 'ORD-031', 'ORD-035', 'ORD-042'] },
  { id: 4, name: 'Noah Garcia', email: 'noah@example.com', avatar: 'NG', color: 'bg-amber-500', totalOrders: 2, totalSpent: 950.00, status: 'inactive', joinDate: '2026-03-05', lastOrder: '2026-06-15', orders: ['ORD-004', 'ORD-011'] },
  { id: 5, name: 'Sophia Lee', email: 'sophia@example.com', avatar: 'SL', color: 'bg-purple-500', totalOrders: 6, totalSpent: 10800.50, status: 'active', joinDate: '2025-12-22', lastOrder: '2026-06-30', orders: ['ORD-006', 'ORD-013', 'ORD-019', 'ORD-024', 'ORD-029', 'ORD-038'] },
  { id: 6, name: 'Liam Wilson', email: 'liam@example.com', avatar: 'LW', color: 'bg-indigo-500', totalOrders: 4, totalSpent: 4380.00, status: 'active', joinDate: '2026-01-08', lastOrder: '2026-06-29', orders: ['ORD-007', 'ORD-014', 'ORD-022', 'ORD-033'] },
  { id: 7, name: 'Mia Taylor', email: 'mia@example.com', avatar: 'MT', color: 'bg-rose-500', totalOrders: 7, totalSpent: 12250.75, status: 'active', joinDate: '2026-02-14', lastOrder: '2026-06-28', orders: ['ORD-010', 'ORD-016', 'ORD-023', 'ORD-028', 'ORD-034', 'ORD-039', 'ORD-044'] },
  { id: 8, name: 'Ava Martinez', email: 'ava@example.com', avatar: 'AM', color: 'bg-cyan-500', totalOrders: 1, totalSpent: 1500.00, status: 'active', joinDate: '2026-06-15', lastOrder: '2026-06-29', orders: ['ORD-041'] },
];

// Orders Data
export const ordersData = [
  { id: 'ORD-001', customerName: 'Emma Watson', customerEmail: 'emma@example.com', avatar: 'EW', color: 'bg-pink-500', amount: 1250.00, items: 3, status: 'delivered', paymentMethod: 'credit_card', paymentStatus: 'paid', orderDate: '2026-07-01', deliveryDate: '2026-07-04', shippingStatus: 'delivered' },
  { id: 'ORD-002', customerName: 'James Smith', customerEmail: 'james@example.com', avatar: 'JS', color: 'bg-blue-500', amount: 840.50, items: 2, status: 'pending', paymentMethod: 'cash_on_delivery', paymentStatus: 'unpaid', orderDate: '2026-07-01', deliveryDate: null, shippingStatus: 'processing' },
  { id: 'ORD-003', customerName: 'Olivia Davis', customerEmail: 'olivia@example.com', avatar: 'OD', color: 'bg-emerald-500', amount: 3200.00, items: 5, status: 'delivered', paymentMethod: 'credit_card', paymentStatus: 'paid', orderDate: '2026-07-01', deliveryDate: '2026-07-02', shippingStatus: 'delivered' },
  { id: 'ORD-004', customerName: 'Noah Garcia', customerEmail: 'noah@example.com', avatar: 'NG', color: 'bg-amber-500', amount: 450.00, items: 1, status: 'canceled', paymentMethod: 'credit_card', paymentStatus: 'refunded', orderDate: '2026-07-01', deliveryDate: null, shippingStatus: 'canceled' },
  { id: 'ORD-005', customerName: 'Emma Watson', customerEmail: 'emma@example.com', avatar: 'EW', color: 'bg-pink-500', amount: 1850.75, items: 4, status: 'returned', paymentMethod: 'paypal', paymentStatus: 'refunded', orderDate: '2026-06-30', deliveryDate: '2026-07-01', shippingStatus: 'returned' },
  { id: 'ORD-006', customerName: 'Sophia Lee', customerEmail: 'sophia@example.com', avatar: 'SL', color: 'bg-purple-500', amount: 920.00, items: 2, status: 'delivered', paymentMethod: 'credit_card', paymentStatus: 'paid', orderDate: '2026-06-30', deliveryDate: '2026-07-02', shippingStatus: 'delivered' },
  { id: 'ORD-007', customerName: 'Liam Wilson', customerEmail: 'liam@example.com', avatar: 'LW', color: 'bg-indigo-500', amount: 2100.00, items: 3, status: 'processing', paymentMethod: 'cash_on_delivery', paymentStatus: 'unpaid', orderDate: '2026-06-29', deliveryDate: null, shippingStatus: 'in_transit' },
  { id: 'ORD-008', customerName: 'Olivia Davis', customerEmail: 'olivia@example.com', avatar: 'OD', color: 'bg-emerald-500', amount: 1650.50, items: 2, status: 'delivered', paymentMethod: 'credit_card', paymentStatus: 'paid', orderDate: '2026-06-29', deliveryDate: '2026-07-01', shippingStatus: 'delivered' },
  { id: 'ORD-009', customerName: 'James Smith', customerEmail: 'james@example.com', avatar: 'JS', color: 'bg-blue-500', amount: 920.00, items: 2, status: 'pending', paymentMethod: 'credit_card', paymentStatus: 'unpaid', orderDate: '2026-06-29', deliveryDate: null, shippingStatus: 'pending' },
  { id: 'ORD-010', customerName: 'Mia Taylor', customerEmail: 'mia@example.com', avatar: 'MT', color: 'bg-rose-500', amount: 2100.00, items: 3, status: 'delivered', paymentMethod: 'credit_card', paymentStatus: 'paid', orderDate: '2026-06-28', deliveryDate: '2026-06-30', shippingStatus: 'delivered' },
];

// Products Data
export const productsData = [
  { id: 1, name: 'Premium Cloud Storage', sku: 'SKU-001', category: 'Services', price: 99.99, stock: 150, status: 'in_stock', image: '☁️', rating: 4.9, sold: 450, description: 'Unlimited cloud storage with advanced encryption' },
  { id: 2, name: 'Advanced Analytics Suite', sku: 'SKU-002', category: 'Services', price: 199.99, stock: 85, status: 'in_stock', image: '📊', rating: 4.8, sold: 380, description: 'Real-time analytics and reporting tools' },
  { id: 3, name: 'API Integration Pack', sku: 'SKU-003', category: 'Services', price: 149.99, stock: 0, status: 'out_of_stock', image: '🔗', rating: 4.7, sold: 290, description: 'Pre-built API integrations for popular platforms' },
  { id: 4, name: 'Security Pro', sku: 'SKU-004', category: 'Services', price: 79.99, stock: 200, status: 'in_stock', image: '🔒', rating: 4.6, sold: 220, description: 'Enterprise-grade security and compliance tools' },
  { id: 5, name: 'White Label Solution', sku: 'SKU-005', category: 'Services', price: 299.99, stock: 45, status: 'in_stock', image: '🎨', rating: 4.5, sold: 180, description: 'Fully customizable branding and UI' },
  { id: 6, name: 'Customer Support Suite', sku: 'SKU-006', category: 'Services', price: 129.99, stock: 0, status: 'out_of_stock', image: '💬', rating: 4.7, sold: 310, description: 'Multi-channel support platform' },
  { id: 7, name: 'Starter Package', sku: 'SKU-007', category: 'Plans', price: 29.99, stock: 999, status: 'in_stock', image: '🚀', rating: 4.4, sold: 2100, description: 'Perfect for small teams and projects' },
  { id: 8, name: 'Professional Bundle', sku: 'SKU-008', category: 'Plans', price: 79.99, stock: 350, status: 'in_stock', image: '⭐', rating: 4.8, sold: 1250, description: 'Enhanced features for growing businesses' },
  { id: 9, name: 'Enterprise License', sku: 'SKU-009', category: 'Plans', price: 499.99, stock: 5, status: 'in_stock', image: '👑', rating: 4.9, sold: 85, description: 'Complete solution for large organizations' },
  { id: 10, name: 'Training & Onboarding', sku: 'SKU-010', category: 'Services', price: 199.99, stock: 50, status: 'in_stock', image: '🎓', rating: 4.6, sold: 120, description: 'Comprehensive training program for your team' },
];

export const tasksData = [
  {
    id: 1,
    title: 'Finalize Q3 revenue forecast',
    description: 'Review projections and update the executive summary for the board deck.',
    project: 'Finance',
    owner: 'Emma Watson',
    priority: 'High',
    status: 'in_progress',
    dueDate: '2026-07-03T17:00:00',
    completed: false,
    team: 'Finance & Strategy',
    checklist: 'Analysis, Forecast model, Presentation',
    notes: 'Need the latest bookings data before final sign-off.',
  },
  {
    id: 2,
    title: 'Deploy customer feedback widget',
    description: 'Launch the new survey widget on the customer portal.',
    project: 'Product',
    owner: 'Mike Wilson',
    priority: 'Medium',
    status: 'review',
    dueDate: '2026-07-05T12:00:00',
    completed: false,
    team: 'Product & UX',
    checklist: 'QA review, Styling, A/B test setup',
    notes: 'Wait for design approval before pushing live.',
  },
  {
    id: 3,
    title: 'Resolve open payment issue',
    description: 'Investigate the payment gateway error affecting Express Checkout.',
    project: 'Engineering',
    owner: 'Noah Garcia',
    priority: 'High',
    status: 'blocked',
    dueDate: '2026-07-02T10:00:00',
    completed: false,
    team: 'Backend',
    checklist: 'Error logs, API retry logic, Monitoring alert',
    notes: 'Partner team needs to confirm API credentials.',
  },
  {
    id: 4,
    title: 'Prepare marketing launch assets',
    description: 'Create campaign graphics and email copy for the product launch.',
    project: 'Marketing',
    owner: 'Lisa Anderson',
    priority: 'Low',
    status: 'completed',
    dueDate: '2026-06-30T16:00:00',
    completed: true,
    team: 'Marketing',
    checklist: 'Banner, Email copy, Social posts',
    notes: 'Campaign is ready for final review.',
  },
  {
    id: 5,
    title: 'Audit customer support SLA',
    description: 'Verify response times and update the SLA compliance dashboard.',
    project: 'Operations',
    owner: 'David Park',
    priority: 'Medium',
    status: 'in_progress',
    dueDate: '2026-07-04T09:00:00',
    completed: false,
    team: 'Support',
    checklist: 'Data review, SLA docs, Stakeholder sign-off',
    notes: 'Need ticket volume report from last quarter.',
  },
];

// Messages Data
export const messagesData = [
  { id: 1, sender: 'John Doe', avatar: 'JD', color: 'bg-blue-500', role: 'Lead Developer', message: 'Hey, can you review the pull request I submitted?', timestamp: '2026-07-02T10:30:00', isRead: true, isUrgent: false, reason: null, attachment: null },
  { id: 2, sender: 'Sarah Chen', avatar: 'SC', color: 'bg-purple-500', role: 'Product Manager', message: 'The Q3 roadmap is ready for discussion in the meeting tomorrow.', timestamp: '2026-07-02T09:15:00', isRead: true, isUrgent: false, reason: null, attachment: null },
  { id: 3, sender: 'Mike Wilson', avatar: 'MW', color: 'bg-amber-500', role: 'Design Lead', message: 'New design mockups for the dashboard are ready!', timestamp: '2026-07-02T08:45:00', isRead: true, isUrgent: false, reason: null, attachment: 'mockups.pdf' },
  { id: 4, sender: 'Emma Taylor', avatar: 'ET', color: 'bg-pink-500', role: 'QA Engineer', message: 'Found critical bug in production - User authentication failing for some users', timestamp: '2026-07-02T14:22:00', isRead: false, isUrgent: true, reason: 'Critical production issue - user auth down', attachment: null },
  { id: 5, sender: 'David Park', avatar: 'DP', color: 'bg-emerald-500', role: 'DevOps Engineer', message: 'Database migration completed successfully. All services are running normally.', timestamp: '2026-07-02T07:30:00', isRead: true, isUrgent: false, reason: null, attachment: null },
  { id: 6, sender: 'Lisa Anderson', avatar: 'LA', color: 'bg-rose-500', role: 'Marketing Manager', message: 'Campaign metrics for July are exceeding targets by 25%!', timestamp: '2026-07-02T11:00:00', isRead: true, isUrgent: false, reason: null, attachment: null },
  { id: 7, sender: 'Alex Thompson', avatar: 'AT', color: 'bg-indigo-500', role: 'Backend Developer', message: 'URGENT: API rate limiting needs immediate review - potential security issue discovered', timestamp: '2026-07-02T15:45:00', isRead: false, isUrgent: true, reason: 'Potential security vulnerability in API rate limiting', attachment: null },
  { id: 8, sender: 'Jennifer Lee', avatar: 'JL', color: 'bg-cyan-500', role: 'HR Manager', message: 'Team building event scheduled for next Friday at 2 PM.', timestamp: '2026-07-02T12:00:00', isRead: true, isUrgent: false, reason: null, attachment: null },
  { id: 9, sender: 'Robert Martinez', avatar: 'RM', color: 'bg-orange-500', role: 'Sales Manager', message: 'Major client deal closed! Contract signed and ready to go.', timestamp: '2026-07-02T13:15:00', isRead: true, isUrgent: false, reason: null, attachment: null },
  { id: 10, sender: 'Nina Patel', avatar: 'NP', color: 'bg-violet-500', role: 'Finance Manager', message: 'Budget approval for Q3 initiatives - action required by Friday EOD', timestamp: '2026-07-02T16:30:00', isRead: false, isUrgent: true, reason: 'Budget deadline approaching - approval needed by Friday', attachment: null },
];

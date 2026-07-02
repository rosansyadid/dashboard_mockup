import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Messages from './pages/Messages';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import GenericPage from './pages/GenericPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="messages" element={<Messages />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<GenericPage title="Reports" description="Generate custom financial and operational reports to share with stakeholders." />} />
          <Route path="*" element={<GenericPage title="Page Not Found" description="The page you are looking for doesn't exist or has been moved." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

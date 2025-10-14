// src/components/layouts/AdminLayout/AdminLayout.tsx
import React from 'react';
import { BaseLayout } from '../BaseLayout/BaseLayout';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <BaseLayout sidebar={AdminSidebar} header={AdminHeader}>
      {children}
    </BaseLayout>
  );
};
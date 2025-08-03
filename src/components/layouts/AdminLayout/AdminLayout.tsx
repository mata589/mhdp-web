// src/components/layouts/AdminLayout/AdminLayout.tsx
import React from 'react';
import { BaseLayout } from '../BaseLayout/BaseLayout';
import { AdminSidebar } from './AdminSidebar';
import { Header } from '../../common/Header/Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <BaseLayout sidebar={AdminSidebar} header={Header}>
      {children}
    </BaseLayout>
  );
};
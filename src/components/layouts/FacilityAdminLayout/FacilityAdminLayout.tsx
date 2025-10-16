// src/components/layouts/AdminLayout/FacilityAdminLayout.tsx
import React from 'react';
import { BaseLayout } from '../BaseLayout/BaseLayout';
import {FacilityAdminHeader} from './FacilityAdminHeader';
import { FacilityAdminSidebar } from './FacilityAdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const FacilityAdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <BaseLayout sidebar={FacilityAdminSidebar} header={FacilityAdminHeader}>
      {children}
    </BaseLayout>
  );
};

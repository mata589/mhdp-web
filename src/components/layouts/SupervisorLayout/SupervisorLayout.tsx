// src/components/layouts/SupervisorLayout/SupervisorLayout.tsx
import React from 'react';
import { BaseLayout } from '../BaseLayout/BaseLayout';
import { Header } from '../../common/Header/Header';
import { SupervisorSidebar } from './SupervisorSidebar/SupervisorSidebar';




interface SupervisorLayoutProps {
  children: React.ReactNode;
}

export const SupervisorLayout: React.FC<SupervisorLayoutProps> = ({ children }) => {
  return (
    <BaseLayout sidebar={SupervisorSidebar} header={Header}>
      {children}
    </BaseLayout>
  );
};

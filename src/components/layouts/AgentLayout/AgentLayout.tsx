// src/components/layouts/AgentLayout/AgentLayout.tsx
import React from 'react';

import { Header } from '../../common/Header/Header';
import { AgentSidebar } from './AgentSidebar/AgentSidebar';
import { BaseLayout } from '../BaseLayout/BaseLayout';



interface AgentLayoutProps {
  children: React.ReactNode;
}

export const AgentLayout: React.FC<AgentLayoutProps> = ({ children }) => {
  return (
    <BaseLayout sidebar={AgentSidebar} header={Header}>
      {children}
    </BaseLayout>
  );
};
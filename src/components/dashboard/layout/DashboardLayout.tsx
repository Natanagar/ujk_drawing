import React, { FC } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

interface DashboardLayoutProps {}

const DashboardContainer = styled.div`
  padding: 29px;
  min-height: calc(100vh - 10px);
  background: #efeff2;
  box-shadow: 0px 0px 12px rgba(0, 93, 226, 0.1);
`;

export const ContentWrap = styled.div`
  padding: 20px;
  background: #e2e2e5;
  box-shadow: 0px 0px 12px rgba(0, 93, 226, 0.1);
  border-radius: 8px;
  overflow-x: auto;
`;

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => (
  <DashboardContainer>
    <Navigation />
    <ContentWrap>{children}</ContentWrap>
  </DashboardContainer>
);

export default DashboardLayout;

import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as paths from '../../../router/paths';
import logo from '../../../ui/logo.png';
import { HighlightOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';

interface NavigationProps {}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: lightblue;
  min-width: 100%;
  padding: 10px;
`;

const Navigation: FC<NavigationProps> = () => (
  <StyledContainer>
    <div>
      <img src={logo} height="50px" width="80px" alt="card" />
    </div>

    <div style={{ display: 'inline-flex', padding: 10, marginLeft: '10px' }}>
      <Link to={paths.MAIN}>
        <div style={{ marginRight: '30px', marginTop: 'auto' }}>
          {' '}
          <Badge count={0}>
            {' '}
            <HighlightOutlined
              style={{ fontSize: '24px', color: '#08c' }}
            />{' '}
          </Badge>
        </div>
      </Link>

      <Badge dot>
        <Avatar
          shape="circle"
          style={{
            color: 'whitesmoke',
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Badge>
    </div>
  </StyledContainer>
);
export default Navigation;

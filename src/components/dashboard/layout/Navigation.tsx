import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as paths from '../../../router/paths';
import logo from '../../../ui/logo.png';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';

interface NavigationProps {}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: #9d9d9e;
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
            <ShoppingCartOutlined
              style={{ fontSize: '36px', color: '#08c' }}
            />{' '}
          </Badge>
        </div>
      </Link>
      <Badge dot>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </div>
  </StyledContainer>
);
export default Navigation;

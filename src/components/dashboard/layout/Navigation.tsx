import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import * as paths from '../../../router/paths';
import logo from '../../../ui/logo.png';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, notification } from 'antd';
import getUserProfil from '../../../model/common/auth/getUserProfil';

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

const Container = styled.div`
  display: inline-flex;
  padding: 10px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

const EmailContainer = styled.div`
  font-size: 18px;
  margin-right: 10px;
`;

const Navigation: FC<NavigationProps> = () => {
  const [userMail, setUserMail] = useState<string>();
  const history = useHistory();
  useEffect(() => {
    getUserProfil()
      .then((res: any) => {
        if (res.token) {
          setUserMail(res.user.email);
        }
      })
      .catch((err: any) => {
        console.log(err);
        notification.error({
          message: 'Server error',
          description: `${err || err.message || err[0].message}`,
        });
      });
  }, []);
  return (
    <StyledContainer>
      <div>
        <img src={logo} height="50px" width="80px" alt="card" />
      </div>

      <Container>
        {userMail ? <EmailContainer>{userMail}</EmailContainer> : null}
        <Link to={paths.REGISTER}>
          <Badge dot>
            <Avatar
              shape="circle"
              icon={<UserOutlined />}
              style={{
                color: 'whitesmoke',
                backgroundColor: '#87d068',
              }}
            />
          </Badge>
        </Link>
      </Container>
    </StyledContainer>
  );
};
export default Navigation;

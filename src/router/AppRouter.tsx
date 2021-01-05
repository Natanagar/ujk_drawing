import React, { FC, useState, useEffect } from 'react';
import * as paths from './paths';
import { History } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import DrawPage from '../components/drawing/DrawPage';
import RegistrationPage from '../components/auth/RegistrationPage';
import ResetPasswordPage from '../components/auth/ResetPasswordPage';
import DashboardLayout from '../components/dashboard/layout/DashboardLayout';

interface AppRouterProps {
  history: History;
}

interface RouteType {
  path: string;
  name: string;
  exact?: boolean;
  Component: any;
  Layout?: any;
}

const routes: RouteType[] = [
  {
    path: paths.AUTH,
    name: 'Auth',
    Component: AuthForm,
  },
  {
    path: paths.REGISTER,
    name: 'Registration',
    Component: RegistrationPage,
  },
  {
    path: paths.RESET_PASSWORD,
    name: 'Reset Password Page',
    Component: ResetPasswordPage,
  },
  {
    path: paths.MAIN,
    name: 'Drawing Page',
    exact: true,
    Component: DrawPage,
    Layout: DashboardLayout,
  },
];

const AppRouter: FC<AppRouterProps> = ({ history }) => (
  <Router>
    <Switch>
      {routes.map(({ path, Component, Layout, exact }) => {
        const WrappedComponent = Layout ? (
          <Layout>
            <Component history={history} />
          </Layout>
        ) : (
          <Component history={history} />
        );

        return (
          <Route
            key={path}
            exact={exact}
            path={path}
            component={() => WrappedComponent}
          />
        );
      })}
    </Switch>
  </Router>
);

export default AppRouter;

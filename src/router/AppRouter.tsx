import React, { FC } from 'react';
import * as paths from './paths';
import { History } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import DrawPage from '../components/drawing/DrawPage';
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
    path: paths.MAIN,
    name: 'Drawing Page',
    exact: true,
    Component: DrawPage,
    Layout: DashboardLayout,
  },
  {
    path: paths.AUTH,
    name: 'Auth Form',
    exact: true,
    Component: AuthForm,
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

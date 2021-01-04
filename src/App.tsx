import React from 'react';
import { ConfigProvider } from 'antd';
import AppRouter from '../src/router/AppRouter';
import { createBrowserHistory, History } from 'history';
import plPL from 'antd/lib/locale/pl_PL';

export const appHistory: History = createBrowserHistory();

const App: React.FC = () => (
  <ConfigProvider locale={plPL}>
    <AppRouter history={appHistory} />
  </ConfigProvider>
);

export default App;

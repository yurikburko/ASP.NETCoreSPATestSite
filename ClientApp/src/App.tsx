import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';
import { AuthorizeWrapper } from './components/api-authorization/AuthorizeWrapper';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <AuthorizeWrapper>
        <Layout>
            <Routes>
              {AppRoutes.map((route, index) => {
                const { element, requireAuth, ...rest } = route as any;
                return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
              })}
            </Routes>
        </Layout>
      </AuthorizeWrapper>
    );
  }
}

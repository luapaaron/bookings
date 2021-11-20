import React, { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Header = lazy(() => import('@layouts/Header'));
const Home = lazy(() => import('@containers/home'));

const ViewRootContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.bodyBgColor,
}));

const ViewRoot = () => (
  <ViewRootContainer>
    <Suspense fallback={<div />}>
      <Header />
    </Suspense>

    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  </ViewRootContainer>
);

export default ViewRoot;

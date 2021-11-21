import React, { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Scrollbars from '@layouts/Scrollbars';

const Header = lazy(() => import('@layouts/Header'));
const Home = lazy(() => import('@containers/home'));
const BookingDetails = lazy(() => import('@containers/bookingDetail'));
const Book = lazy(() => import('@containers/book'));
const Calendar = lazy(() => import('@layouts/Calendar'));

const ViewRootContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.bodyBgColor,
}));

const ViewRoot = () => (
  <ViewRootContainer>
    <Suspense fallback={<div />}>
      <Header />
    </Suspense>

    <Scrollbars autoHeight autoHeightMin='calc(100vh - 74px)' autoHeightMax='calc(100vh - 74px)' hideHorizontalScrollBar id='body-scroll'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/view/:id' element={<BookingDetails />} />
          <Route path='/book' element={<Book />} />
        </Routes>
      </Router>
    </Scrollbars>
    <Suspense fallback={<div />}>
      <Calendar />
    </Suspense>
  </ViewRootContainer>
);

export default ViewRoot;

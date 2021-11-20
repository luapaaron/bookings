import React, { lazy, Suspense } from 'react';
import styled from '@emotion/styled';

const ViewRoot = lazy(() => import('./ViewRoot'));

const AppRootContainer = styled('div')({
  height: '100%',
});

const AppRoot = () => (
  <>
    <AppRootContainer>
      <Suspense fallback={<div />}>
        <ViewRoot />
      </Suspense>
    </AppRootContainer>
  </>
);

export default AppRoot;

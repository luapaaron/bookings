import styled from '@emotion/styled';

const ViewPortLayer = styled('div')(({ theme, zIndex }) => ({
  zIndex,
  width: '100%',
  height: '100%',
  backgroundColor: theme.bodyBgColor,
}));

export default ViewPortLayer;

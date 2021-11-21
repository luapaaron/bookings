import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import Text from '@components/Text';

import mq from '@styles/mediaQueries';

import { actionFetchRooms } from '@reduxModules/rooms';

const DetailViewContainer = styled('div')(mq({
  padding: ['0 12px', '0 24px'],
  display: 'flex',
  flexDirection: 'column',
  marginTop: 30,
}));

const BookingDetail = ({
  roomList,
  actionFetchRooms,
}) => {
  useEffect(() => {
    actionFetchRooms();
  }, []);
  return (
    <DetailViewContainer>
      <Text fontSize={18} bold>Room Details</Text>
    </DetailViewContainer>
  );
};

export default connect((state) => ({
  roomList: state.rooms.list,
}), {
  actionFetchRooms,
})(BookingDetail);

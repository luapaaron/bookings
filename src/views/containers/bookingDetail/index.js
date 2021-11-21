import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Text from '@components/Text';
import Avatar from '@components/Avatar';
import Table from '@components/Table';

import mq from '@styles/mediaQueries';

import { actionFetchBooking, selectorRoomDetails, selectorRoomBookings, actionFetchBookingsByRoomId } from '@reduxModules/bookings';
import { actionFetchRooms } from '@reduxModules/rooms';

import isEmpty from '@utils/isEmpty';

const DetailViewContainer = styled('div')(mq({
  padding: ['0 12px', '0 24px'],
  display: 'flex',
  flexDirection: 'column',
  marginTop: 30,
}));

const RoomImageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});
const DefaultRoom = styled('div')(({ theme }) => ({
  width: 150,
  height: 150,
  borderRadius: '50%',
  backgroundColor: theme.profileImageDefaultBgColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const BookingDetails = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 10,
});
const DetailsGroup = styled('div')({
  'display': 'flex',
  'margin': '5px 0 3px',
  '>:first-of-type': {
    marginInlineEnd: 10,
    width: 100,
    flexShrink: 0,
  },
});

const BookingDetail = ({
  roomDetails,
  roomBookings,
  actionFetchRooms,
  actionFetchBooking,
  actionFetchBookingsByRoomId,
}) => {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    actionFetchBooking(id);
    actionFetchRooms();
  }, []);

  useEffect(() => {
    if (!isEmpty(roomDetails) && !isEmpty(roomDetails.id)) {
      actionFetchBookingsByRoomId(roomDetails.id);
    }
  }, [roomDetails]);

  const HEADERS = [
    {
      key: 'id',
      children: 'Date',
      keyProps: 'date',
      render: (data) => (
        <Text>
          {data}
        </Text>
      ),
    }, {
      key: 'id',
      children: 'Time',
      keyProps: 'time',
      render: (data) => (
        <Text>
          {data}
        </Text>
      ),
    },
    {
      key: 'id',
      children: 'Host Name',
      keyProps: 'host',
      render: (data) => (
        <Text>
          {data}
        </Text>
      ),
    },
    {
      key: 'id',
      children: 'Guests Name',
      keyProps: 'guest',
      render: (data) => (
        <Text>
          {!isEmpty(data) && data.length > 0 && data.join(', ')}
        </Text>
      ),
    },
  ];
  return (
    <DetailViewContainer>
      <Text fontSize={18} bold>Room Details</Text>
      {!isEmpty(roomDetails) ? (
        <>
          <RoomImageContainer>
            {
              !isEmpty(roomDetails) ?
                !isEmpty(roomDetails.image) ?
                  <Avatar size={150} src={roomDetails.image} /> : (
                    <DefaultRoom>
                      <Text color='#FFF'>{roomDetails.name}</Text>
                    </DefaultRoom>
                  )
                : null
            }
          </RoomImageContainer>
          <BookingDetails>
            <DetailsGroup>
              <Text bold>Room Name: </Text>
              <Text>{!isEmpty(roomDetails) ? roomDetails.name : ''}</Text>
            </DetailsGroup>
            <DetailsGroup>
              <Text bold>Floor: </Text>
              <Text>{roomDetails.floor}</Text>
            </DetailsGroup>
          </BookingDetails>
          <Table headers={HEADERS} data={roomBookings} />
        </>
      )
        : null}
    </DetailViewContainer>
  );
};

export default connect((state) => ({
  roomDetails: selectorRoomDetails(state),
  roomBookings: selectorRoomBookings(state),
}), {
  actionFetchRooms,
  actionFetchBooking,
  actionFetchBookingsByRoomId,
})(BookingDetail);

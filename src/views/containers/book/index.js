import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import TimePicker from 'react-time-picker';

import Text from '@components/Text';
import FillButton from '@components/FillButton';
import Select from '@components/Select';
import Calendar from '@components/Calendar';

import mq from '@styles/mediaQueries';

import { actionSubmitBooking } from '@reduxModules/bookings';
import { actionFetchRooms } from '@reduxModules/rooms';

import isEmpty from '@utils/isEmpty';

const BookContainer = styled('div')(mq({
  'padding': ['0 12px', '0 24px'],
  'display': 'flex',
  'flexDirection': 'column',
  'marginTop': 30,

  '.time-picker': {
    width: 200,
  },

}));

const Form = styled('div')({
  'display': 'flex',
  'flexDirection': 'row',
  'marginTop': 20,
  'flexWrap': 'wrap',

  '>*': {
    marginInlineEnd: 20,
    marginBottom: 20,
  },
});

const BookNowButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});

const Book = ({
  roomList,
  actionFetchRooms,
  actionSubmitBooking,
}) => {
  useEffect(() => {
    actionFetchRooms();
  }, []);

  const [error, setError] = useState('');

  const [room, setRoom] = useState({
    value: '',
    text: '',
  });

  const [interval, setInterval] = useState({
    value: '',
    text: '',
  });

  const roomOptions = (!isEmpty(roomList) && roomList.length > 0) ? roomList.map((room) => ({ text: room.name, value: room.id })) : [];
  const onChangeRoom = (value, text) => {
    setRoom({ value, text });
  };
  const intervalOptions = [{ text: '30 minutes', value: 30 }, { text: '1 hour', value: 60 }];
  const onChangeInterval = (value, text) => {
    setInterval({ value, text });
  };

  const [filterDate, setFilterDate] = useState(new Date());
  const [timeValue, setTimeValue] = useState('10:00');

  const submit = () => {
    if (isEmpty(interval.value) || isEmpty(room.value)) {
      setError('All Fields are Required.');
    } else {
      setError('');
      actionSubmitBooking(room.value, room.text, filterDate, timeValue, interval.value);
    }
  };

  return (
    <BookContainer>
      <Text fontSize={18} bold>Book a Room</Text>
      {!isEmpty(error) ? <Text color='#e74c3c'>{error}</Text> : null}

      <Form>
        <Select
          placeholder='Room'
          options={roomOptions}
          value={room.value}
          valueText={room.text}
          onChange={onChangeRoom}
          width={200}
        />

        <Calendar width={200} value={filterDate} onChange={setFilterDate} />
        <TimePicker
          onChange={setTimeValue}
          value={timeValue}
          className='time-picker'
          closeClock={false}
          minTime='08:00'
          maxTime='17:00'
        />

        <Select
          placeholder='Interval'
          options={intervalOptions}
          value={interval.value}
          valueText={interval.text}
          onChange={onChangeInterval}
          width={200}
        />
        <BookNowButtonContainer>
          <FillButton onClick={submit}>Book Now</FillButton>
        </BookNowButtonContainer>
      </Form>

    </BookContainer>
  );
};

export default connect((state) => ({
  roomList: state.rooms.list,
}), {
  actionFetchRooms,
  actionSubmitBooking,
})(Book);

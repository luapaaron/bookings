import React, { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Text from '@components/Text';
import Card from '@components/Card';
import Loader from '@components/Loader';
import EmptyData from '@components/EmptyData';
import Avatar from '@components/Avatar';
import Input from '@components/Input';
import SvgIcon from '@components/SvgIcon';
import Select from '@components/Select';
import Calendar from '@components/Calendar';
import FillButton from '@components/FillButton';
import IconButton from '@components/IconButton';

import mq from '@styles/mediaQueries';

import isEmpty from '@utils/isEmpty';
import dateFormat from '@utils/dateFormat';
import debounce from '@utils/debounce';

import { actionFetchBookings, actionFetchMoreBookings, selectorBookingsList, actionDeleteBooking } from '@reduxModules/bookings';
import { actionFetchRooms } from '@reduxModules/rooms';

import InfiniteLoader from '@layouts/InfiniteLoader';

import searchSVG from '@icons/svg/search.svg';
import deleteSVG from '@icons/svg/delete.svg';

const HomeContainer = styled('div')(mq({
  padding: ['0 12px', '0 24px'],
  display: 'flex',
  flexDirection: 'column',
  marginTop: 30,
}));
const HomeHeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const FilterContainer = styled('div')({
  marginTop: 20,
  display: 'flex',
  justifyContent: 'space-between',
});
const FilterGroupContainer = styled('div')({
  'display': 'flex',
  'alignItems': 'flex-end',
  'marginInlineStart': 20,

  '>*': {
    marginInlineEnd: 10,
  },
});

const BookingListContainer = styled('div')(({ noList }) => ({
  'display': noList ? 'block' : 'grid',
  'gridTemplateColumns': 'repeat(auto-fill, minmax(300px, 1fr))',
  'gridAutoRows': '1fr',
  'gridColumnGap': 25,
  'gridRowGap': 25,
  'margin': '30px 0 30px',

  '>*': {
    marginInlineEnd: '20px !important',
  },
}));

const RoomImageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});
const DefaultRoom = styled('div')(({ theme }) => ({
  width: 75,
  height: 75,
  borderRadius: '50%',
  backgroundColor: theme.profileImageDefaultBgColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const BookingDetails = styled('div')({
  display: 'flex',
  flexDirection: 'column',
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

const ViewFillButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 20,
});

const DeleteEditIcons = styled('div')({
  'display': 'flex',
  'justifyContent': 'flex-end',

  '>:first-of-type': {
    marginInlineEnd: 10,
  },
});

const Home = ({
  hasMore,
  bookingList,
  roomList,
  fetchBookingListPending,
  actionFetchBookings,
  actionFetchMoreBookings,
  actionFetchRooms,
  actionDeleteBooking,
}) => {
  useEffect(() => {
    actionFetchRooms();
  }, []);

  const [filterBy, setFilterBy] = useState({
    value: '',
    text: '',
  });

  const [sortBy, setSortBy] = useState({
    value: '',
    text: '',
  });

  const [sortByValue, setSortByValue] = useState({
    value: 'asc',
    text: 'Ascending',
  });

  const [filterDate, setFilterDate] = useState(new Date());
  const [filterByRoom, setFilterByRoom] = useState({
    value: '',
    text: '',
  });

  const [page, setPage] = useState(1);

  const [search, setSearchValue] = useState('');

  useEffect(() => {
    let filterByValue = '';

    if (filterBy.value === 'date_time' && !isEmpty(filterDate)) {
      const filterDateSet = filterDate.setHours(0, 0, 0, 0);
      filterByValue = dateFormat(filterDateSet, 'X', false);
    } else if (filterBy.value === 'room_id') {
      filterByValue = filterByRoom.value;
    }

    actionFetchBookings(search, filterBy.value, filterByValue, sortBy.value, sortByValue.value);
  }, [filterBy, sortBy, sortByValue, filterDate, filterByRoom, search]);

  const filterByOptions = [{ text: 'Date', value: 'date_time' }, { text: 'Room', value: 'room_id' }];
  const onChangeFilter = (value, text) => {
    setFilterBy({ value, text });
  };
  const filterByRoomOptions = (!isEmpty(roomList) && roomList.length > 0) ? roomList.map((room) => ({ text: room.name, value: room.id })) : [];
  const onChangeFilterByRoom = (value, text) => {
    setFilterByRoom({ value, text });
  };

  const sortByOptions = [{ text: 'Room Name', value: 'room_name' }, { text: 'Host Name', value: 'host_name' }, { text: 'Date', value: 'date_time' }];

  const onChangeSort = useCallback((value, text) => {
    setSortBy({ value, text });
  }, [filterBy, sortByValue]);

  const sortByValueOptions = [{ text: 'Ascending', value: 'asc' }, { text: 'Descending', value: 'desc' }];

  const onChangeSortValue = useCallback((value, text) => {
    setSortByValue({ value, text });
  }, [filterBy, sortBy]);

  const loadMoreBookings = useCallback(async () => {
    if (hasMore) {
      let filterByValue = '';

      if (filterBy.value === 'date_time' && !isEmpty(filterDate)) {
        const filterDateSet = filterDate.setHours(0, 0, 0, 0);
        filterByValue = dateFormat(filterDateSet, 'X', false);
      } else if (filterBy.value === 'room_id') {
        filterByValue = filterByRoom.value;
      }

      await actionFetchMoreBookings(search, filterBy.value, filterByValue, sortBy.value, sortByValue.value, page + 1);
      setPage(page + 1);
    }
  }, [filterBy, sortBy, sortByValue, hasMore, search]);

  const searchOnKeyDown = debounce((e) => {
    setSearchValue(e.target.value);
  });

  const deleteBooking = (id) => () => {
    actionDeleteBooking(id);
  };

  return (
    <InfiniteLoader
      loadMore={loadMoreBookings}
      hasMore={hasMore}
    >
      <HomeContainer>
        <HomeHeaderContainer>
          <Text fontSize={18} bold>Booking List</Text>
          <Link to='/book'><FillButton>Book a room</FillButton></Link>
        </HomeHeaderContainer>
        <FilterContainer>
          <Input maxWidth={400} placeholder='Search Room' preIcon={{ icon: <SvgIcon src={searchSVG} /> }} onKeyDown={searchOnKeyDown} />
          <FilterGroupContainer>
            <Select
              placeholder='Filter by'
              options={filterByOptions}
              value={filterBy.value}
              valueText={filterBy.text}
              onChange={onChangeFilter}
              width={200}
            />
            {
              !isEmpty(filterBy.value) ?
                filterBy.value === 'date_time' ?
                  <Calendar width={200} value={filterDate} onChange={setFilterDate} />
                  : (
                    <Select
                      placeholder='Room'
                      options={filterByRoomOptions}
                      value={filterByRoom.value}
                      valueText={filterByRoom.text}
                      onChange={onChangeFilterByRoom}
                      width={200}
                    />
                  )
                : null
            }
            <Select
              placeholder='Sort by'
              options={sortByOptions}
              value={sortBy.value}
              valueText={sortBy.text}
              onChange={onChangeSort}
              width={200}
            />
            {
              !isEmpty(sortBy.value) ? (
                <Select
                  placeholder='Order'
                  options={sortByValueOptions}
                  value={sortByValue.value}
                  valueText={sortByValue.text}
                  onChange={onChangeSortValue}
                  width={200}
                />
              )
                : null
            }
          </FilterGroupContainer>
        </FilterContainer>
        {fetchBookingListPending ? <Loader /> : (
          <BookingListContainer noList={isEmpty(bookingList)}>
            {
              (!isEmpty(bookingList) && bookingList.length > 0) ?
                bookingList.map((booking) => (
                  <Card key={booking.id} padding={20}>
                    <DeleteEditIcons>
                      <IconButton size={30} onClick={deleteBooking(booking.id)}>
                        <SvgIcon src={deleteSVG} size={24} />
                      </IconButton>
                    </DeleteEditIcons>
                    <RoomImageContainer>
                      {
                        !isEmpty(booking.roomDetails) ?
                          !isEmpty(booking.roomDetails.image) ?
                            <Avatar size={75} src={booking.roomDetails.image} /> : (
                              <DefaultRoom>
                                <Text color='#FFF'>{booking.roomDetails.name}</Text>
                              </DefaultRoom>
                            )
                          : null
                      }
                    </RoomImageContainer>
                    <BookingDetails>
                      <DetailsGroup>
                        <Text bold>Room Name: </Text>
                        <Text>{!isEmpty(booking.roomDetails) ? booking.roomDetails.name : ''}</Text>
                      </DetailsGroup>
                      <DetailsGroup>
                        <Text bold>Host Name: </Text>
                        <Text>{booking.host_name}</Text>
                      </DetailsGroup>
                      <DetailsGroup>
                        <Text bold>Guests: </Text>
                        <Text>
                          {!isEmpty(booking.guests_name) && booking.guests_name.length > 0 && booking.guests_name.join(', ')}
                        </Text>
                      </DetailsGroup>
                      <DetailsGroup>
                        <Text bold>Date: </Text>
                        <Text>{!isEmpty(booking.date_time) && dateFormat(booking.date_time)}</Text>
                      </DetailsGroup>
                      <DetailsGroup>
                        <Text bold>Time: </Text>
                        <Text>{!isEmpty(booking.date_time) && `${dateFormat(booking.date_time, 'hh:mm A')} - ${dateFormat(parseInt(booking.date_time, 10) + (booking.interval * 60), 'hh:mm A')}`}</Text>
                      </DetailsGroup>
                    </BookingDetails>
                    <ViewFillButtonContainer>
                      <Link to={`/view/${booking.id}`}><FillButton>View</FillButton></Link>
                    </ViewFillButtonContainer>
                  </Card>
                ))
                : <EmptyData text='No bookings. Book one now!' />
            }

          </BookingListContainer>
        )}

      </HomeContainer>
    </InfiniteLoader>
  );
};

export default connect((state) => ({
  fetchBookingListPending: state.bookings.fetchListPending,
  hasMore: state.bookings.hasMore,
  bookingList: selectorBookingsList(state),
  roomList: state.rooms.list,
}), {
  actionFetchBookings,
  actionFetchMoreBookings,
  actionFetchRooms,
  actionDeleteBooking,
})(Home);

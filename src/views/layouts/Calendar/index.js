import React, { useEffect, useRef, useCallback } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import SvgIcon from '@components/SvgIcon';
import Text from '@components/Text';

import dateFormat from '@utils/dateFormat';

import arrowLeftSvg from '@icons/svg/arrow-left.svg';

import { actionToggleCalendar } from '@reduxModules/common/calendar';

const CalendarContainer = styled('div')(({ top, left, theme }) => ({

  'position': 'absolute',
  top,
  left,

  'zIndex': 999,
  'backgroundColor': '#FFF',

  'width': 357,
  'height': 357,
  'padding': '25px 28px 25px 20px',
  'box-shadow': '0px 0px 5px 0px rgba(0, 0, 0, 0.23)',
  'button': {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 0,
  },

  'abbr': {
    textDecoration: 'none',
  },

  '.react-calendar': {
    '.react-calendar__navigation': {
      'position': 'relative',
      'paddingBottom': 10,
      'borderBottom': `2px solid ${theme.primaryColor}`,

      '.react-calendar__navigation__label': {
        flexGrow: '0.4 !important',
        padding: 0,
      },
      '.react-calendar__navigation__prev-button': {
        'position': 'absolute',
        'right': 46,
        'top': 4,
        '&:disabled': {
          opacity: 0.3,
          cursor: 'default',
        },
      },
      '.react-calendar__navigation__next-button': {
        position: 'absolute',
        right: 0,
        top: 1.5,
      },

    },

    '.react-calendar__viewContainer': {
      'paddingTop': 6,
      'paddingBottom': 21,
      'borderBottom': `2px solid ${theme.primaryColor}`,

      '.react-calendar__month-view__weekdays': {
        'marginBottom': 10,
        '.react-calendar__month-view__weekdays__weekday': {
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 14,
          padding: 5,
        },
      },

      '.react-calendar__month-view__days': {
        '.react-calendar__tile': {
          padding: 10,
          marginBottom: 5,
          position: 'relative',
        },

        '.react-calendar__month-view__days__day': {
          '&:disabled': {
            cursor: 'default',
          },
        },

        '.react-calendar__month-view__days__day--neighboringMonth': {
          color: '#cccccc',
          pointerEvents: 'none',
          cursor: 'default !important',
        },

        '.react-calendar__tile--now:not(.react-calendar__tile--active)': {
          '::after': {
            content: "''",
            border: `2px solid ${theme.primaryColor}`,
            display: 'inline-block',
            width: 27,
            height: 27,
            borderRadius: '50%',
            position: 'absolute',
            left: 7,
            top: 2,
          },
        },

        '.react-calendar__tile--active': {
          'color': '#FFF',
          '::before': {
            content: "''",
            backgroundColor: theme.primaryColor,
            display: 'inline-block',
            width: 27,
            height: 27,
            borderRadius: '50%',
            position: 'absolute',
            left: 9,
            top: 4,
            color: '#FFF',
            zIndex: '-1',
          },
        },
      },
    },

  },
}));

const ArrowRightIconContainer = styled('div')(({ theme }) => ({
  transform: 'rotate(180deg)',
}));

const NavigationText = styled(Text)({
  'width': '100%',
  'textAlign': 'initial',
  'position': 'relative',
  '&:after': {
    content: '"\\25be"',
    width: 20,
    height: 10,
  },
});

const CalendarLayout = ({ calendar, actionToggleCalendar: actionCallToggleCalendar }) => {
  const calendarContainerRef = useRef(null);
  const closeMenu = () => {
    actionCallToggleCalendar({
      show: false,
    });
  };

  const handleResize = useCallback(() => {
    if (calendar.show) {
      closeMenu();
    }
  }, [calendar.show]);

  const handleClickOutside = (e) => {
    if (
      calendar.show &&
      calendarContainerRef.current &&
      !calendarContainerRef.current.contains(e.target)
    ) {
      closeMenu();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside, true);
    window.addEventListener('touchstart', handleClickOutside, true);
    window.addEventListener('resize', handleResize, true);
    return () => {
      window.removeEventListener('click', handleClickOutside, true);
      window.removeEventListener('touch', handleClickOutside, true);
      window.removeEventListener('resize', handleResize, true);
    };
  }, [calendar.show]);

  const onChangeDate = async (val) => {
    if (calendar.onChange) {
      await calendar.onChange(val);
    }
    closeMenu();
  };

  if (!calendar.show) return null;

  return (
    <CalendarContainer ref={calendarContainerRef} top={calendar.top} left={calendar.left}>
      <Calendar
        onChange={onChangeDate}
        value={calendar.value}
        prevLabel={<SvgIcon src={arrowLeftSvg} width={7} height={12} />}
        nextLabel={<ArrowRightIconContainer><SvgIcon src={arrowLeftSvg} width={7} height={12} /></ArrowRightIconContainer>}
        next2Label={null}
        prev2Label={null}
        minDate={calendar?.minDate}
        maxDate={calendar?.maxDate}
        navigationLabel={({ date }) => <NavigationText bold fontSize={18}>{dateFormat(date, 'MMMM YYYY', false)}</NavigationText>}
        formatShortWeekday={(locale, date) => dateFormat(date, 'dd', false)}
      />
    </CalendarContainer>
  );
};

export default connect((state) => ({
  calendar: state.common.calendar,
}), { actionToggleCalendar })(CalendarLayout);

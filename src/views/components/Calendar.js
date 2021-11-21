import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '@components/Input';

import isEmpty from '@utils/isEmpty';
import dateFormat from '@utils/dateFormat';

import SVGCalendar from '@icons/svg/calendar.svg';

import { actionToggleCalendar } from '@reduxModules/common/calendar';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  label: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  ]),
  onChange: PropTypes.func,
};

const defaultProps = {
  value: new Date(),
  label: '',
  width: '100%',
  onChange: () => {
    // onchange function
  },
};

const CustomDatePicker = ({ value, label, width, calendar, actionToggleCalendar: actionCallToggleCalendar, minDate, maxDate, onChange, t, ...rest }) => {
  const [currentValue, onChangeValue] = useState(value);

  const changeValue = (val) => {
    onChangeValue(val);
    if (onChange) {
      onChange(val);
    }
    actionCallToggleCalendar({
      value: val,
    });
  };

  const openCalendar = (e) => {
    const elementDetails = e.target.getBoundingClientRect();
    const bodyDetails = document.getElementById('body-scroll');
    if (!isEmpty(elementDetails) && !isEmpty(bodyDetails)) {
      const data = {
        top:
          elementDetails.top +
          elementDetails.height +
          bodyDetails.scrollTop +
          1,
        left: elementDetails.left,
        show: true,
        onChange: (val) => changeValue(val),
        value: currentValue,
        minDate,
        maxDate,
      };
      actionCallToggleCalendar(data);
    }
  };

  return (
    <Input
      label='Select Date'
      suffixIcon={SVGCalendar}
      readOnly
      value={dateFormat(currentValue, 'DD/MM/YYYY', false)}
      cursor='pointer'
      onClick={openCalendar}
      width={width}
      {...rest}
    />
  );
};

CustomDatePicker.propTypes = propTypes;
CustomDatePicker.defaultProps = defaultProps;

export default connect(
  (state) => ({
    calendar: state.common.calendar,
  }),
  { actionToggleCalendar },
)(CustomDatePicker);

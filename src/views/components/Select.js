import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import isEmpty from '@utils/isEmpty';

import arrowIcon from '@icons/svg/next.svg';
import checkIcon from '@icons/svg/check.svg';
import mq from '@styles/mediaQueries';
import Text from './Text';
import SvgIcon from './SvgIcon';

const propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  optionsContainerMaxHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
const defaultProps = {
  placeholder: '',
  width: '100%',
  height: 48,
  value: '',
  optionsContainerMaxHeight: 250,
  options: [],
  onChange: () => { },
  fontSize: 16,
};
const InputFieldDisplay = styled('div')(
  ({ theme, width, fontSize, height, hasValueAndPlaceholder }) => ({
    fontSize,
    'width': 'calc(100% - 30px)',
    'marginRight': 15,
    'marginLeft': 15,
    'height': '100%',
    'transition': 'opacity .15s cubic-bezier(.4,0,.2,1)',
    'borderRadius': 4,
    'background': 'none',

    'paddingTop': (height <= 50 && !hasValueAndPlaceholder) ? 15 : 26,
    '&:focus': {
      outline: 'none',
    },
  }),
);
const InputContainer = styled('div')(
  ({ theme, hasValueAndPlaceholder, height }) => ({
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    width: '100%',
    height: hasValueAndPlaceholder ? height + 10 : height,
    border: `1px solid ${theme.inputBorderColor}`,
  }),
);
const InputLabel = styled('label')(
  ({ theme, inputFocus, inputHasValue, fontSize }) => ({
    color: 'black',
    fill: inputFocus ? theme.primaryColor : theme.inputPlaceholderColor,
    fontSize,
    lineHeight: '1.75rem',
    letterSpacing: '.009375em',
    left: 16,
    right: 'auto',
    top: inputFocus || inputHasValue ? 18 : '50%',
    position: 'absolute',
    pointerEvents: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'text',
    overflow: 'hidden',
    willChange: 'transform',
    transition:
      'transform .15s cubic-bezier(.4, 0, .2, 1), color .15s cubic-bezier(.4, 0, .2, 1)',
    transform:
      inputFocus || inputHasValue
        ? 'translateY(-50%) scale(0.75)'
        : 'translateY(-50%)',
    transformOrigin: 'left top',
  }),
);
const SelectWrapper = styled('div')(({ theme, width }) => mq({
  width,
  'position': 'relative',
  'cursor': 'pointer',

  '*': {
    cursor: 'pointer !important',
  },
  '&.error': {
    'marginBottom': '30px !important',
    '>div': {
      '>div:first-of-type': {
        borderBottomColor: theme.inputBorderError,
      },
      '>label': {
        color: theme.inputPlaceholderErrorColor,
      },
      '>span': {
        display: 'block',
      },
    },
  },
}));
const DisplayRow = styled('div')(({ theme, inputFocus }) => ({
  'display': 'flex',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'borderBottom': `1px solid ${theme.inputBorderBgColor}`,
  'height': '100%',
  '&:hover': {
    borderBottomColor: theme.inputBorderHoverBgColor,
  },
  'svg': {
    transform: inputFocus ? 'rotate(-90deg)' : 'rotate(90deg)',
  },
}));
const InputErrorMessage = styled(Text)(({ theme }) => ({
  position: 'relative',
  top: 5,
  left: 16,
  display: 'none',
  color: `${theme.inputPlaceholderErrorColor} !important`,
}));
const CategoryArrowIcon = styled(SvgIcon)({
  marginRight: 20,
  transition: 'transform 0.33s',
  flexGrow: 0,
  flexShrink: 0,
});
const OptionsContainer = styled('div')(
  ({ theme, ContainerHeight, inputFocus, maxHeight }) => ({
    'display': inputFocus ? 'flex' : 'none',
    'flexDirection': 'column',
    'position': 'absolute',
    'top': ContainerHeight + 2,
    'minWidth': '100%',
    'backgroundColor': theme.white,
    'zIndex': 999,
    'borderRadius': 4,
    'overflowY': 'auto',
    'boxShadow': `0px -1px 5px 0px ${theme.HeaderBoxShadowColor}`,
    maxHeight,
    '&:hover': {
      backgroundColor: theme.inputBorderColor,
    },
  }),
);
const Option = styled('div')(({ theme, selected }) => ({
  'minWidth': '100%',
  'minHeight': 40,
  'height': 40,
  'padding': '10px 20px',
  'alignItems': 'center',
  'cursor': selected ? 'default !important' : 'pointer',
  'backgroundColor': selected ? '#f2f2f2' : theme.white,
  'display': 'flex',
  'justifyContent': 'space-between',
  ':hover': {
    backgroundColor: '#f2f2f2',
  },
  'paddingRight': 15,
  'position': 'relative',
}));

const RightContainer = styled('div')({
  'marginInlineStart': 20,

  '>span': {
    wordWrap: 'break-word',
  },
});

const Select = ({
  width,
  height,
  placeholder,
  value,
  valueText,
  options,
  optionsContainerMaxHeight,
  onChange,
  fontSize,
  children,
  ...others
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [inputText, setInputText] = useState(valueText);
  const [inputHasValue, setinputHasValue] = useState(value !== '');
  const inputContainerRef = useRef(null);
  const inputOnChange = (e) => {
    if (e.target.value && e.target.value.trim() !== '') {
      setinputHasValue(true);
    } else {
      setinputHasValue(false);
    }
  };
  const optionOnClick = (value, text, onChange) => () => {
    setInputValue(value);
    setInputText(text);

    if (onChange) {
      onChange(value, text);
    }
  };

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
      setInputText(!isEmpty(valueText) ? valueText : '');
    }
  }, [value]);

  const onClick = () => {
    setInputFocus(false);
  };
  useEffect(() => {
    if (inputFocus) {
      window.addEventListener('click', onClick, true);
    }
    return () => {
      window.removeEventListener('click', onClick, true);
    };
  }, [inputFocus]);

  return (
    <SelectWrapper width={width} ref={inputContainerRef}>

      <InputContainer
        height={height}
        onClick={() => setInputFocus(true)}
        hasValueAndPlaceholder={!isEmpty(inputValue) && !isEmpty(placeholder)}
      >

        <input
          type='hidden'
          onChange={inputOnChange}
          value={inputValue}
          {...others}
        />
        <DisplayRow inputFocus={inputFocus}>
          <InputFieldDisplay height={height} fontSize={fontSize} hasValueAndPlaceholder={!isEmpty(inputValue) && !isEmpty(placeholder)}>
            {inputText}
          </InputFieldDisplay>
          <CategoryArrowIcon size={14} src={arrowIcon} />
        </DisplayRow>
        <InputLabel
          inputHasValue={inputHasValue}
          inputFocus={!isEmpty(inputValue) || inputFocus}
          fontSize={fontSize}
        >
          {placeholder}
          {' '}
        </InputLabel>
        <InputErrorMessage>This field is required.</InputErrorMessage>
      </InputContainer>
      <OptionsContainer
        ContainerHeight={height}
        maxHeight={optionsContainerMaxHeight}
        inputFocus={inputFocus}
      >
        {options.length > 0 && options.map((option) => (
          <Option
            key={option.value}
            selected={option.value === inputValue}
            onClick={optionOnClick(option.value, option.text, onChange)}
          >
            <Text
              bold
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              {option.text}
            </Text>
            {
              (
                option.value === inputValue && (
                  <RightContainer>
                    <SvgIcon size={14} src={checkIcon} />
                  </RightContainer>
                ))
            }
          </Option>
        ))}
      </OptionsContainer>
    </SelectWrapper>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
export default Select;

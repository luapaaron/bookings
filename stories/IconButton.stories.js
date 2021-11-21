import React from 'react';

import IconButton from '../src/views/components/IconButton';

import SvgIcon from '../src/views/components/SvgIcon';
import sampleIcon from '../src/assets/icons/svg/search.svg';

export default {
  title: 'Components/IconButton',
  component: IconButton,
};

const Template = ({ ...args }) => (<IconButton {...args}><SvgIcon src={sampleIcon} /></IconButton>);

export const Default = Template.bind({});
Default.args = {
  size: 24,
};

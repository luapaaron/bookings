import React from 'react';

import SvgIcon from '../src/views/components/SvgIcon';
import sampleIcon from '../src/assets/icons/svg/search.svg';

export default {
  title: 'Components/SvgIcon',
  component: SvgIcon,
};

const Template = ({ ...args }) => (<SvgIcon src={sampleIcon} {...args} />);

export const Default = Template.bind({});
Default.args = {
  size: 24,
};

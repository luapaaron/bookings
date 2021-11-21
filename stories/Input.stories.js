import React from 'react';

import Input from '../src/views/components/Input';
import SvgIcon from '../src/views/components/SvgIcon';

import sampleIcon from '../src/assets/icons/svg/search.svg';

export default {
  title: 'Components/Input',
  component: Input,
};

const Template = ({ ...args }) => (<Input {...args} />);

export const Default = Template.bind({});
Default.args = {
  placeholder: 'e.g. John Doe',
};

export const Label = Template.bind({});
Label.args = {
  label: 'Name',
  placeholder: 'e.g. John Doe',
};

export const PrefixIcon = Template.bind({});
PrefixIcon.args = {
  preIcon: { icon: <SvgIcon src={sampleIcon} /> },
  placeholder: 'Search',
};

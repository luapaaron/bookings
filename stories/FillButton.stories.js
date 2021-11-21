import React from 'react';

import FillButton from '../src/views/components/FillButton';

export default {
  title: 'Components/FillButton',
  component: FillButton,
};

const Template = ({ label, ...args }) => <FillButton {...args}>{label}</FillButton>;

export const Default = Template.bind({});
Default.args = {
  fontSize: 16,
  justifyContent: 'center',
  textUnderline: false,
  label: 'Submit',
};

export const Outlined = Template.bind({});
Outlined.args = {
  fontSize: 16,
  justifyContent: 'center',
  label: 'Cancel',
  textUnderline: false,
  variant: 'outlined',
};

export const Text = Template.bind({});
Text.args = {
  fontSize: 16,
  justifyContent: 'center',
  textUnderline: false,
  label: 'Learn more',
  variant: 'text',
};

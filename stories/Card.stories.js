import React from 'react';

import Card from '../src/views/components/Card';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template = ({ label, ...args }) => <Card {...args}>{label}</Card>;

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 400,
  margin: 0,
  padding: 20,
  borderRadius: 3,
  zIndex: 1,
  label: 'Submit',
  noBorder: false,
  noShadow: false,
};

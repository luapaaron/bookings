import React from 'react';

import Text from '../src/views/components/Text';

export default {
  title: 'Components/Text',
  component: Text,
};

const Template = ({ label, ...args }) => <Text {...args}>{label}</Text>;

export const Default = Template.bind({});
Default.args = {
  label: 'Sample Text',
  bold: false,
  fontSize: 14,
  lineHeight: 'normal',
  noWrap: false,
};

import React from 'react';

import Loader from '../src/views/components/Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
};

const Template = ({ ...args }) => (<Loader {...args} />);

export const Default = Template.bind({});

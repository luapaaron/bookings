import React from 'react';

import Avatar from '../src/views/components/Avatar';
import SampleImage1 from './assets/sample_profile_image_1.jpg';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

const Template = ({ ...args }) => <Avatar {...args} />;

export const Single = Template.bind({});
Single.args = {
  src: SampleImage1,
};

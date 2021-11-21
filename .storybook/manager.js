import { addons } from '@storybook/addons';
import '@storybook/addon-options/register';
import '@storybook/addon-controls/register';
import '@storybook/addon-viewport/register';
import '@storybook/addon-docs';
import 'storybook-addon-react-docgen';
import themes from './themes';

addons.setConfig({
  theme: themes,
  sFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
  enableShortcuts: true,
  isToolshown: true,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: false,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false, },
    zoom: { hidden: false, },
    eject: { hidden: false, },
    copy: { hidden: false, },
    fullscreen: { hidden: false, },
  },
});
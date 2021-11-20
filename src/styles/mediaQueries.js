import facepaint from 'facepaint';
import { MOBILE_TABLET_BREAKPOINT, DESKTOP_BREAKPOINT, LARGER_DESKTOP_BREAKPOINT } from '../constants/windowBreakpoints';

const mediaQueries = facepaint([
  `@media(min-width: ${MOBILE_TABLET_BREAKPOINT}px)`,
  `@media(min-width: ${DESKTOP_BREAKPOINT}px)`,
  `@media(min-width: ${LARGER_DESKTOP_BREAKPOINT}px)`,
]);

export default mediaQueries;

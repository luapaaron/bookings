import { rgba, darken } from 'polished';

const PRIMARY_COLOR = '#993441';
const SECONDARY_COLOR = '#ffb8b1';
const WHITE = '#FFF';
const BLACK = '#000';
const TRANSPARENT = 'transparent';

// Common
const BODY_BG_COLOR = '#FFF';
const TEXT_COLOR = '#333333';
const TEXT_COLOR_ERROR = '#F44336';

// Header
const HEADER_BOX_SHADOW_COLOR = rgba(BLACK, 0.35);

// Avatar
const PROFILE_IMAGE_DEFAULT_BG_COLOR = '#bdbdbd';

// Card
const CARD_BACKGROUND_COLOR = '#FFF';
const CARD_BOX_SHADOW_COLOR = rgba(BLACK, 0.23);
const CARD_BORDER_COLOR = '#d7d7d7';

// Input
const INPUT_TEXT_COLOR = '#20222A';
const INPUT_BG_COLOR = WHITE;
const INPUT_BG_COLOR_READONLY = '#F2F2F2';
const INPUT_ICON_BG_COLOR = '#EEE';
const INPUT_ICON_FILL = '#999999';
const INPUT_COLOR_ERROR = '#F44336';
const INPUT_BORDER_COLOR = '#D7D7D7';
const INPUT_BORDER_COLOR_HOVER = darken(0.1, INPUT_BORDER_COLOR);
const INPUT_BORDER_COLOR_ACTIVE = darken(0.2, INPUT_BORDER_COLOR);
const INPUT_BODER_COLOR_2 = '#CECECE';
const INPUT_CARET_COLOR = PRIMARY_COLOR;
const INPUT_PLACEHOLDER_COLOR = '#8D8D8D';
const INPUT_BOX_SHADOW_COLOR = '#ECECEC';
const INPUT_SMALL_HEIGHT = 40;
const INPUT_MEDIUM_HEIGHT = 48;
const INPUT_LARGE_HEIGHT = 56;

// Fill Button
const FILL_BUTTON_BG_COLOR_HOVER = '#eb131e';
const FILL_BUTTON_BG_COLOR_ACTIVE = PRIMARY_COLOR;
const FILL_BUTTON_BG_COLOR_DISABLED = '#d1d1d1';
const FILL_BUTTON_COLOR_DISABLED = '#b3b3b3';
const FILL_BUTTON_OUTLINED_BG_COLOR_ACTIVE = '#fbe6e8';

// Icon Button
const ICON_BUTTON_BG_COLOR = TRANSPARENT;
const ICON_BUTTON_HOVER_BG_COLOR = '#e5e5e5';
const ICON_BUTTON_ACTIVE_BG_COLOR = '#e0e0e0';
const ICON_BUTTON_DISABLED_BG_COLOR = TRANSPARENT;

const themes = {
  default: {
    primaryColor: PRIMARY_COLOR,
    secondaryColor: SECONDARY_COLOR,
    bodyBgColor: BODY_BG_COLOR,
    textColor: TEXT_COLOR,
    textColorError: TEXT_COLOR_ERROR,
    white: WHITE,

    HeaderBoxShadowColor: HEADER_BOX_SHADOW_COLOR,

    profileImageDefaultBgColor: PROFILE_IMAGE_DEFAULT_BG_COLOR,

    cardBackgroundColor: CARD_BACKGROUND_COLOR,
    cardShadowColor: CARD_BOX_SHADOW_COLOR,
    cardBorderColor: CARD_BORDER_COLOR,

    inputBgColor: INPUT_BG_COLOR,
    inputBgColorReadOnly: INPUT_BG_COLOR_READONLY,
    inputIconBgColor: INPUT_ICON_BG_COLOR,
    inputIconFill: INPUT_ICON_FILL,
    inputBorderColor: INPUT_BORDER_COLOR,
    inputBorderColorHover: INPUT_BORDER_COLOR_HOVER,
    inputBorderColorActive: INPUT_BORDER_COLOR_ACTIVE,
    inputBorderColorType2: INPUT_BODER_COLOR_2,
    inputColorError: INPUT_COLOR_ERROR,
    inputCaretColor: INPUT_CARET_COLOR,
    inputPlaceHolderColor: INPUT_PLACEHOLDER_COLOR,
    inputTextColor: INPUT_TEXT_COLOR,
    inputBoxShadowColor: INPUT_BOX_SHADOW_COLOR,
    inputSmallHeight: INPUT_SMALL_HEIGHT,
    inputMediumHeight: INPUT_MEDIUM_HEIGHT,
    inputLargeHeight: INPUT_LARGE_HEIGHT,

    fillBtnBgColor: PRIMARY_COLOR,
    fillBtnHoverBgColor: FILL_BUTTON_BG_COLOR_HOVER,
    fillBtnActiveBgColor: FILL_BUTTON_BG_COLOR_ACTIVE,
    fillBtnDisabledBgColor: FILL_BUTTON_BG_COLOR_DISABLED,
    fillBtnDisabledColor: FILL_BUTTON_COLOR_DISABLED,
    fillBtnOutlinedBgColorActive: FILL_BUTTON_OUTLINED_BG_COLOR_ACTIVE,
    fillBtnTextColor: WHITE,

    iconBtnIconColor: BLACK,
    iconBtnHoverIconColor: BLACK,
    iconBtnActiveIconColor: BLACK,
    iconBtnDisabledIconColor: rgba(BLACK, 0.12),
    iconBtnBGIconColor: ICON_BUTTON_BG_COLOR,
    iconBtnBGHoverIconColor: ICON_BUTTON_HOVER_BG_COLOR,
    iconBtnBGActiveIconColor: ICON_BUTTON_ACTIVE_BG_COLOR,
    iconBtnBGDisabledIconColor: ICON_BUTTON_DISABLED_BG_COLOR,
  },
};

export default themes;

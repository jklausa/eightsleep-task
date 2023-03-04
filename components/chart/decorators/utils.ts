import { Dimensions } from 'react-native';

// I don't know how to get this from the charting library when we need it, but the
// value seems pretty stable. Good enough for now.
const MagicPaddingValue = 140;

export const RENDER_WIDTH = Dimensions.get('window').width - MagicPaddingValue;

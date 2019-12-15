import Typography from 'typography';
import funstonTheme from 'typography-theme-funston';
import { textColor } from './colors';

funstonTheme.bodyColor = textColor;
const typography = new Typography(funstonTheme);

export default typography;

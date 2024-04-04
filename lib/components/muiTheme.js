import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { grey500 } from 'material-ui/styles/colors';

// TODO: I should clone it.
const theme = darkBaseTheme;

theme.palette.borderColor = grey500;

const muiTheme = getMuiTheme(darkBaseTheme);

export default muiTheme;

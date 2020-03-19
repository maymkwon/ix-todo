import PropTypes from 'prop-types';
import { withStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  '@global': {
    'html,body': {
      minHeight: '100%',
      // overflow: 'hidden',
    },
    body: {
      // minWidth: 1280,
    },
  },
});

function CustomCssBaseline() {
  return null;
}

CustomCssBaseline.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCssBaseline);

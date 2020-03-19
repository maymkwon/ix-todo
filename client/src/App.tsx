import React, { useState, useEffect } from 'react';
import Img from 'react-image';
import { Typography, Paper } from '@material-ui/core';
import VisibilitySensor from 'react-visibility-sensor';
import {
  makeStyles,
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import cn from 'classnames';
import TodoList from './components/TodoList';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#ffe812',
    },
  },
  // overrides:{}
});
// source.unsplash.com/random
// https://source.unsplash.com/random
// const CustomCssBaseline = withStyles({
//   MuiCssBaseline: {
//     body: {
//       backgroundColor: 'red',
//     },
//   },
// })(CssBaseline);
const useStyles = makeStyles({
  imageBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)',
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'transparent',
    width: '100%',
  },
  textBox: {
    backgroundColor: 'rgba(0,0,0,.26)',
    padding: '0 25px',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  greeting: {},
  clock: {
    fontWeight: 600,
  },
});

function App() {
  const classes = useStyles();
  const [time, setTime] = useState({ h: '00', m: '00' });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setTime({
        h: hours < 10 ? `0${hours}` : hours.toString(),
        m: minutes < 10 ? `0${minutes}` : minutes.toString(),
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const onChange = (isVisible: boolean) => {
    console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.imageBox}></div>

      <div className={classes.content}>
        <div className={classes.textBox}>
          <Typography
            className={cn(classes.text, classes.clock)}
            variant="h1"
            component="h2">
            {`${time.h}:${time.m}`}
          </Typography>
          <Typography
            className={cn(classes.text, classes.greeting)}
            variant="subtitle1"
            component="p">
            안녕하세요 방문자님!
          </Typography>
        </div>
        <TodoList />
      </div>
    </MuiThemeProvider>
  );
}

export default App;

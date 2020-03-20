import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import TodoList from './components/TodoList';
import CInput from './components/CInput';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomCssBaseline from './common/CustomCssBaseline';
import TodoServices from './api/TodoServices';

const useStyles = makeStyles({
  clock: {
    fontWeight: 600,
  },

  wrap: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ffe812',
    minWidth: 1280,
    '& > div': {
      flex: 1,
    },
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  leftBox: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '0 50px',
  },
  rightBox: {},
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

  useEffect(() => {
    TodoServices.getTodoList({ pageNo: 1, pageSize: 3 });
    return () => {};
  }, []);

  return (
    <>
      <CssBaseline />
      <CustomCssBaseline />
      <div className={classes.wrap}>
        <div className={cn(classes.section, classes.leftBox)}>
          <Typography
            className={cn(classes.clock)}
            variant="h1"
            component="h2"
            align="center">
            {`${time.h}:${time.m}`}
          </Typography>
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            안녕하세요 방문자님!
          </Typography>
          <CInput id="todo-text" placeHolder="뭐 하지?" />
        </div>
        <div className={cn(classes.section, classes.rightBox)}>
          {/* <Empty /> */}
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
